import React from "react";
import { render, screen } from "@testing-library/react";
import ResultsView from "./ResultsView";
import { ISongResults } from "../common/Types";

const baseSong = (overrides: Partial<ISongResults> = {}): ISongResults =>
  ({
    id: "1",
    name: "Track One",
    artists: [{ name: "Artist One" }],
    album: { images: [{ url: "https://example.com/a.png" }], release_date: "2020-01-01" },
    external_urls: { spotify: "https://open.spotify.com/track/1" },
    ...overrides,
  } as ISongResults);

describe("ResultsView", () => {
  it("de-dupes songs with the same id before rendering", () => {
    const songs = [
      baseSong({ id: "1" }),
      baseSong({ id: "1" }),
      baseSong({ id: "2", name: "Track Two" }),
    ];
    render(
      <ResultsView
        songResults={songs}
        favoriteSongs={[]}
        addFavorite={jest.fn()}
        moodName="Happy"
      />
    );
    expect(screen.getAllByText(/Track One/i)).toHaveLength(1);
    expect(screen.getByText(/Track Two/i)).toBeInTheDocument();
  });

  it("renders without crashing when a track is missing artist/image data", () => {
    const incomplete = {
      id: "3",
      name: "Mystery Track",
      album: { images: [], release_date: "2020-01-01" },
      external_urls: { spotify: "" },
    } as unknown as ISongResults;

    render(
      <ResultsView
        songResults={[incomplete]}
        favoriteSongs={[]}
        addFavorite={jest.fn()}
        moodName="Chill"
      />
    );
    expect(screen.getByText(/Unknown Artist/i)).toBeInTheDocument();
  });
});
