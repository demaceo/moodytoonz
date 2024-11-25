import axios from 'axios';
import * as base64 from 'base-64';
import { ISongResults } from '../components/common/Types';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET as string;


export const filterByDecade = (tracks: ISongResults[], decade: string): ISongResults[] => {
    if (!decade) return tracks; // If no decade is selected, return all tracks.

    const startYear =
        parseInt(decade) > 20 ? 1900 + parseInt(decade) : 2000 + parseInt(decade);
    const endYear = startYear + 9;
    return tracks.filter((track) => {
        const releaseYear = parseInt(track.album.release_date.split("-")[0]); // Extract the release year from the date.
        return releaseYear >= startYear && releaseYear <= endYear; // Check if it falls within the decade range.
    });
};

const getSpotifyBearerToken = async (clientId: string, clientSecret: string): Promise<string | null> => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    // Construct base64-encoded client credentials
    const encodedCredentials = base64.encode(`${clientId}:${clientSecret}`);
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedCredentials}`,
    };
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
    }).toString();
    try {
        // Send the POST request to get the token
        const response = await axios.post(tokenUrl, data, { headers });
        const accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error getting Spotify bearer token:', error);
        return null;
    }
}

const getRecommendations = async (
    accessToken: string,
    minValence: number,
    maxValence: number,
    minEnergy: number,
    maxEnergy: number,
    seedGenres?: string[]
): Promise<any> => {
    const recommendationsUrl = "https://api.spotify.com/v1/recommendations";
    const seedGenresQuery = seedGenres ? seedGenres.join(",") : "";
    try {
        const response = await axios.get(recommendationsUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                seed_genres: seedGenresQuery,
                limit: 99,
                market: "US",
                min_valence: minValence,
                max_valence: maxValence,
                min_energy: minEnergy,
                max_energy: maxEnergy,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return null;
    }
};

export const fetchRecommendations = async (
    minValence: number,
    maxValence: number,
    minEnergy: number,
    maxEnergy: number,
    seedGenres?: string[]
): Promise<any> => {
    try {
        const accessToken = await getSpotifyBearerToken(clientId, clientSecret); // Await token here
        if (!accessToken) {
            console.log("Failed to get access token");
            return;
        }

        const recommendations = await getRecommendations(
            accessToken,
            minValence,
            maxValence,
            minEnergy,
            maxEnergy,
            seedGenres
        );
        return recommendations.tracks;
    } catch (error) {
        console.error("Error:", error);
    }
};
