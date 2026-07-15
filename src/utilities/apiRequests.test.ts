import axios from "axios";
import {
  filterByDecade,
  fetchSongsForMood,
  SpotifyRequestError,
} from "./apiRequests";
import { ISongResults } from "../components/common/Types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const track = (id: string, releaseDate: string): ISongResults =>
  ({
    id,
    name: `Song ${id}`,
    artists: [{ name: "Some Artist" }],
    album: { images: [{ url: "https://example.com/img.png" }], release_date: releaseDate },
    external_urls: { spotify: `https://open.spotify.com/track/${id}` },
  } as ISongResults);

describe("filterByDecade", () => {
  it("returns an empty array when tracks is undefined", () => {
    expect(filterByDecade(undefined, "90")).toEqual([]);
  });

  it("returns tracks unchanged when no decade is selected", () => {
    const tracks = [track("1", "1999-01-01")];
    expect(filterByDecade(tracks, "")).toEqual(tracks);
  });

  it("filters to the requested decade (pre-2000 shorthand)", () => {
    const tracks = [track("1", "1999-01-01"), track("2", "2005-01-01")];
    expect(filterByDecade(tracks, "90").map((t) => t.id)).toEqual(["1"]);
  });

  it("filters to the requested decade (post-2000 shorthand)", () => {
    const tracks = [track("1", "1999-01-01"), track("2", "2015-06-01")];
    expect(filterByDecade(tracks, "10").map((t) => t.id)).toEqual(["2"]);
  });

  it("excludes tracks with a malformed release date instead of throwing", () => {
    const tracks = [track("1", ""), track("2", "1995-01-01")];
    expect(filterByDecade(tracks, "90").map((t) => t.id)).toEqual(["2"]);
  });
});

describe("fetchSongsForMood", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockToken = (expiresIn = -1) => {
    mockedAxios.post.mockResolvedValue({ data: { access_token: "test-token", expires_in: expiresIn } });
  };

  it("rotates through the genre pool, deduping results, until the target count is reached", async () => {
    mockToken();
    let callCount = 0;
    mockedAxios.get.mockImplementation(async () => {
      const genreCallIndex = callCount++;
      const items = Array.from({ length: 20 }, (_, i) => track(`${genreCallIndex}-${i}`, "2020-01-01"));
      return { data: { tracks: { items } } };
    });

    const results = await fetchSongsForMood(["pop", "rock"], "", 25);

    expect(results.length).toBeGreaterThanOrEqual(25);
    const ids = results.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);

    const queries = mockedAxios.get.mock.calls.map((call: any) => call[1].params.q);
    expect(queries[0]).toContain('genre:"pop"');
    expect(queries[1]).toContain('genre:"rock"');
  });

  it("tolerates individual failed attempts and returns whatever succeeded", async () => {
    mockToken();
    let attempt = 0;
    mockedAxios.get.mockImplementation(async () => {
      attempt++;
      if (attempt === 1) {
        throw Object.assign(new Error("simulated failure"), {
          isAxiosError: true,
          response: { status: 500 },
        });
      }
      return { data: { tracks: { items: [track("only-track", "2020-01-01")] } } };
    });
    mockedAxios.isAxiosError.mockReturnValue(true as any);

    const results = await fetchSongsForMood(["pop"], "", 1);
    expect(results.map((r) => r.id)).toEqual(["only-track"]);
  });

  it("throws a SpotifyRequestError when every search attempt fails", async () => {
    mockToken();
    mockedAxios.get.mockRejectedValue({ isAxiosError: true, response: { status: 429 } });
    mockedAxios.isAxiosError.mockReturnValue(true as any);

    await expect(fetchSongsForMood(["pop"], "", 30)).rejects.toBeInstanceOf(SpotifyRequestError);
  });

  it("propagates a token-fetch failure without calling search", async () => {
    mockedAxios.post.mockRejectedValue({ isAxiosError: true, response: { status: 401 } });
    mockedAxios.isAxiosError.mockReturnValue(true as any);

    await expect(fetchSongsForMood(["pop"], "", 30)).rejects.toBeInstanceOf(SpotifyRequestError);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it("caches the bearer token instead of re-authenticating on every search", async () => {
    mockToken(3600);
    mockedAxios.get.mockResolvedValue({
      data: { tracks: { items: Array.from({ length: 30 }, (_, i) => track(`c-${i}`, "2020-01-01")) } },
    });

    await fetchSongsForMood(["pop"], "", 30);
    await fetchSongsForMood(["pop"], "", 30);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});
