// import "@testing-library/jest-dom";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import Favorite from "./Favorite";
// import { fakeFavorites, testSong } from "../common/testData";

// describe("Favorite", () => {
//   const mockRemoveFavorite = jest.fn();

//   it("displays correct information in the Favorite", () => {
//     render(
//       <Favorite
//         key="123"
//         id={testSong.id}
//         artist={testSong.artist_display_name}
//         title={testSong.title}
//         releaseDate={testSong.releasedate}
//         genre={testSong.genre}
//         favoriteSongs={fakeFavorites}
//         removeFavorite={mockRemoveFavorite}
//       />
//     );
//     const removeBtn = screen.getByRole("button", { name: /remove/i });
//     const spotifyBtn = screen.getByTestId('spotify')
    
//     expect(spotifyBtn).toBeInTheDocument();
//     expect(screen.getByText("John Lennon")).toBeInTheDocument();
//     expect(screen.getByText("Real Love")).toBeInTheDocument();
//     expect(screen.getByText("1988")).toBeInTheDocument();
//     expect(screen.getByText("Pop")).toBeInTheDocument();
//     expect(removeBtn).toBeInTheDocument();
//   });

//   it("call removeFavorite() with correct params", () => {
//     const mockRemoveFavorite = jest.fn();

//     render(
//       <Favorite
//         key="123"
//         id={testSong.id}
//         artist={testSong.artist_display_name}
//         title={testSong.title}
//         releaseDate={testSong.releasedate}
//         genre={testSong.genre}
//         favoriteSongs={fakeFavorites}
//         removeFavorite={mockRemoveFavorite}
//       />
//     );

//     const removeBtn = screen.getByRole("button", { name: /remove/i });

//     userEvent.click(removeBtn);

//     expect(mockRemoveFavorite).toHaveBeenCalledWith("4448");
//   });
// });
