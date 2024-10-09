import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Result from "./Result";
import {fakeFavorites, testSong, testDuplicateSong} from '../common/testData'

describe("Result", () => {

  it("renders information and elements correctly in the Result", () => {
    const mockAddFavorite = jest.fn();

    render(
      <Result
        key="123"
        id={testSong.id}
        artist={testSong.artist_display_name}
        title={testSong.title}
        releaseDate={testSong.releasedate}
        genre={testSong.genre}
        favoriteSongs={fakeFavorites}
        addFavorite={mockAddFavorite}
      />
    );
    const favButton = screen.getByRole('button', { name: /⭐/i })
    const spotifyBtn = screen.getByTestId('spotify')

    expect(screen.getByText("John Lennon")).toBeInTheDocument();
    expect(screen.getByText("Real Love")).toBeInTheDocument();
    expect(screen.getByText("1988")).toBeInTheDocument();
    expect(screen.getByText("Pop")).toBeInTheDocument();
    expect(favButton).toBeInTheDocument();
    expect(spotifyBtn).toBeInTheDocument();
  });

  it("call addFavorite() with correct params", () => {
    const mockAddFavorite = jest.fn();
    render(
      <Result
        key="123"
        id={testSong.id}
        artist={testSong.artist_display_name}
        title={testSong.title}
        releaseDate={testSong.releasedate}
        genre={testSong.genre}
        favoriteSongs={fakeFavorites}
        addFavorite={mockAddFavorite}
      />
    );
    const favButton = screen.getByRole('button', { name: /⭐/i })
    userEvent.click(favButton);
    expect(mockAddFavorite).toHaveBeenCalledWith("4448");
  });
  
  it("should not add duplicate songs to favorites", () => {
    const mockAddFavorite = jest.fn();
    render(
      <Result
      key="123"
      id={testDuplicateSong.id}
      artist={testDuplicateSong.artist_display_name}
      title={testDuplicateSong.title}
      releaseDate={testDuplicateSong.releasedate}
      genre={testDuplicateSong.genre}
      favoriteSongs={fakeFavorites}
      addFavorite={mockAddFavorite}
      />
      );
      
      const favButton = screen.getByRole('button', { name: /⭐/i })
      userEvent.click(favButton);
      expect(mockAddFavorite).not.toHaveBeenCalledWith();
    });
    
  });
