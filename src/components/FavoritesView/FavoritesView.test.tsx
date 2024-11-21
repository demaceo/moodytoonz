// import "@testing-library/jest-dom";
// import { render, screen } from "@testing-library/react";
// import FavoritesView from "./FavoritesView";
// import { fakeSearchResults } from "../common/testData";
// import { MemoryRouter } from "react-router-dom";

// describe("FavoritesView", () => {
//   const mockRemoveFavorite = jest.fn();

//   it("Should render Favorite View header", () => {
//     render(
//       <MemoryRouter>
//         <FavoritesView
//           favoriteSongs={fakeSearchResults}
//           removeFavorite={mockRemoveFavorite}
//         />
//       </MemoryRouter>
//     );
//     const favoritesTitle = screen.getByRole("heading", {
//       name: /favorites view/i,
//     });

//     expect(favoritesTitle).toBeInTheDocument();
//   });

//   it("Should render Favorite component", () => {
//     render(
//       <MemoryRouter>
//         <FavoritesView
//           favoriteSongs={fakeSearchResults}
//           removeFavorite={mockRemoveFavorite}
//         />
//       </MemoryRouter>
//     );

//     expect(screen.getByText("John Lennon")).toBeInTheDocument();
//     expect(screen.getByText("Real Love")).toBeInTheDocument();
//     expect(screen.getAllByText("1988")[0]).toBeInTheDocument();
//     expect(screen.getAllByText("Pop")[0]).toBeInTheDocument();
//   });
// });
