import axios from 'axios';
import * as base64 from 'base-64';
import { ISongResults } from '../components/common/Types';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET as string;

const REQUEST_TIMEOUT_MS = 8000;
const MAX_SEARCH_ATTEMPTS = 8;
const RESULTS_PER_SEARCH = 50;
export const TARGET_RESULT_COUNT = 30;

export class SpotifyRequestError extends Error {
    status?: number;
    constructor(message: string, status?: number) {
        super(message);
        this.name = 'SpotifyRequestError';
        this.status = status;
    }
}

const toSpotifyError = (error: unknown, fallbackMessage: string): SpotifyRequestError => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 429) {
            return new SpotifyRequestError('Spotify is rate-limiting requests right now. Please try again in a moment.', status);
        }
        if (status === 401 || status === 403) {
            return new SpotifyRequestError('Spotify rejected our credentials for this request.', status);
        }
        if (error.code === 'ECONNABORTED') {
            return new SpotifyRequestError('Spotify took too long to respond.', status);
        }
        return new SpotifyRequestError(fallbackMessage, status);
    }
    return new SpotifyRequestError(fallbackMessage);
};

type CachedToken = { value: string; expiresAt: number };
let cachedToken: CachedToken | null = null;

const getSpotifyBearerToken = async (): Promise<string> => {
    if (cachedToken && cachedToken.expiresAt > Date.now()) {
        return cachedToken.value;
    }

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const encodedCredentials = base64.encode(`${clientId}:${clientSecret}`);
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedCredentials}`,
    };
    const data = new URLSearchParams({ grant_type: 'client_credentials' }).toString();

    try {
        const response = await axios.post(tokenUrl, data, { headers, timeout: REQUEST_TIMEOUT_MS });
        const { access_token, expires_in } = response.data;
        // Refresh a minute early so a request never races an about-to-expire token.
        cachedToken = { value: access_token, expiresAt: Date.now() + (expires_in - 60) * 1000 };
        return access_token;
    } catch (error) {
        throw toSpotifyError(error, 'Unable to authenticate with Spotify.');
    }
};

type YearRange = { startYear: number; endYear: number };

const decadeToYearRange = (decade: string): YearRange | undefined => {
    if (!decade) return undefined;
    const decadeNum = parseInt(decade, 10);
    if (isNaN(decadeNum)) return undefined;
    const startYear = decadeNum > 20 ? 1900 + decadeNum : 2000 + decadeNum;
    return { startYear, endYear: startYear + 9 };
};

// Spotify's Recommendations endpoint (which took min/max_valence and min/max_energy) was
// restricted to apps with legacy extended-quota access in Nov 2024. Search remains fully
// available, so mood matching is now done via genre + release-year search filters instead.
const searchTracksByGenre = async (
    accessToken: string,
    genre: string,
    yearRange: YearRange | undefined,
    offset: number
): Promise<ISongResults[]> => {
    const searchUrl = 'https://api.spotify.com/v1/search';
    const queryParts = [`genre:"${genre}"`];
    if (yearRange) {
        queryParts.push(`year:${yearRange.startYear}-${yearRange.endYear}`);
    }

    try {
        const response = await axios.get(searchUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
            timeout: REQUEST_TIMEOUT_MS,
            params: {
                q: queryParts.join(' '),
                type: 'track',
                market: 'US',
                limit: RESULTS_PER_SEARCH,
                offset,
            },
        });
        return response.data?.tracks?.items ?? [];
    } catch (error) {
        throw toSpotifyError(error, 'Unable to search Spotify for tracks.');
    }
};

export const filterByDecade = (tracks: ISongResults[] | undefined, decade: string): ISongResults[] => {
    if (!tracks) return [];
    const yearRange = decadeToYearRange(decade);
    if (!yearRange) return tracks;
    return tracks.filter((track) => {
        const releaseYear = parseInt(track.album?.release_date?.split('-')[0] ?? '', 10);
        return !isNaN(releaseYear) && releaseYear >= yearRange.startYear && releaseYear <= yearRange.endYear;
    });
};

// Fetches up to `targetCount` unique tracks matching the mood's genres and (optional) decade.
// Rotates through the mood's genre pool, paging further into each genre's results on repeat
// passes, and stops after MAX_SEARCH_ATTEMPTS so a sparse genre/decade combo can't loop forever.
// Individual failed attempts are tolerated (and skipped) as long as at least one succeeds;
// if every attempt fails, the last error is thrown so the caller can surface it.
export const fetchSongsForMood = async (
    genres: string[] | undefined,
    decade: string,
    targetCount: number = TARGET_RESULT_COUNT
): Promise<ISongResults[]> => {
    const accessToken = await getSpotifyBearerToken();
    const yearRange = decadeToYearRange(decade);
    const genrePool = genres && genres.length ? genres : ['pop'];

    const seenIds = new Set<string>();
    const results: ISongResults[] = [];
    let lastError: SpotifyRequestError | null = null;

    for (let attempt = 0; attempt < MAX_SEARCH_ATTEMPTS && results.length < targetCount; attempt++) {
        const genre = genrePool[attempt % genrePool.length];
        const offset = Math.min(Math.floor(attempt / genrePool.length) * RESULTS_PER_SEARCH, 950);

        try {
            const tracks = await searchTracksByGenre(accessToken, genre, yearRange, offset);
            for (const track of filterByDecade(tracks, decade)) {
                if (!seenIds.has(track.id)) {
                    seenIds.add(track.id);
                    results.push(track);
                }
            }
        } catch (error) {
            lastError = error instanceof SpotifyRequestError ? error : toSpotifyError(error, 'Unable to fetch songs.');
        }
    }

    if (results.length === 0 && lastError) {
        throw lastError;
    }

    return results;
};
