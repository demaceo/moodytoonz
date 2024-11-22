// import { render, screen, waitFor } from "@testing-library/react";
// import App from "./App";
// import "@testing-library/jest-dom";
// import { fetchRecommendations } from "../../utilities/apiRequests";
// import { MemoryRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";
// import { fakeAPIResults } from "../common/testData";
// jest.mock("../../utilities/apiRequests", () => ({
//   fetchRecommendations: jest.fn(),
// }));

// describe("App", () => {
//   beforeEach(() => {
//     const mockedGetTracksByMoodAPI =
//       fetchRecommendations as jest.MockedFunction<typeof fetchRecommendations>;
//     mockedGetTracksByMoodAPI.mockResolvedValue(fakeAPIResults);
//     localStorage.setItem("favorites", JSON.stringify(fakeAPIResults));
//   });

//   it("should have a home page", () => {
//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const navHome = screen.getByRole("link", { name: /home/i });
//     const navFav = screen.getByRole("link", { name: /favorites/i });
//     const heading = screen.getByRole("heading", { name: /moodytunes/i });
//     const prompt = screen.getByRole("heading", {
//       name: /generate a list of songs that fit your mood\./i,
//     });

//     expect(prompt).toBeInTheDocument();
//     expect(heading).toBeInTheDocument();
//     expect(navHome).toBeInTheDocument();
//     expect(navFav).toBeInTheDocument();
//   });

//   it("Should have a FavoritesView page with Favorite components", () => {
//     render(
//       <MemoryRouter initialEntries={["/favorites"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const favHeading = screen.getByRole("link", { name: /favorites/i });

//     expect(favHeading).toBeInTheDocument();
//   });

//   it("Should navigate home when clicking 'home' ", () => {
//     render(
//       <MemoryRouter initialEntries={["/favorites"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const navHome = screen.getByRole("link", { name: /home/i });
//     userEvent.click(navHome);

//     const prompt = screen.getByRole("heading", {
//       name: /generate a list of songs that fit your mood\./i,
//     });
//     expect(prompt).toBeInTheDocument();
//   });

//   it("Should navigate to favorites when clicking 'Go To Favorites' ", () => {
//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const navFav = screen.getByRole("link", { name: /favorites/i });
//     userEvent.click(navFav);

//     const favHeading = screen.getByRole("heading", { name: /favorites view/i });
//     expect(favHeading).toBeInTheDocument();
//   });

//   it("Should load results after picking a mood and year and submitting' ", async () => {
//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const mood6 = screen.getByText("Angry");
//     const the90s = screen.getByText("1990s");
//     const submitButton = screen.getByRole("button", { name: /get songs/i });

//     userEvent.click(mood6);
//     userEvent.click(the90s);
//     userEvent.click(submitButton);

//     const moodHeader = await screen.findByRole("heading", {
//       name: /"angry" song results:/i,
//     });
//     const songTitle1 = screen.getByRole("heading", {
//       name: /what kind of love are you on/i,
//     });
//     const songTitle2 = screen.getByRole("heading", { name: /hot legs/i });
//     const songTitle3 = screen.getByRole("heading", { name: /trash/i });
//     const songTitle4 = screen.getByRole("heading", { name: /very ape/i });

//     expect(moodHeader).toBeInTheDocument();
//     expect(songTitle1).toBeInTheDocument();
//     expect(songTitle2).toBeInTheDocument();
//     expect(songTitle3).toBeInTheDocument();
//     expect(songTitle4).toBeInTheDocument();
//   });

//   it("Should add to favorites after clicking favorite icon", async () => {
//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const mood6 = screen.getByText("Angry");
//     const the90s = screen.getByText("1990s");
//     const submitButton = screen.getByRole("button", { name: /get songs/i });

//     userEvent.click(mood6);
//     userEvent.click(the90s);
//     userEvent.click(submitButton);

//     const moodHeader = await screen.findByRole("heading", {
//       name: /"angry" song results:/i,
//     });
//     const favButton = screen.getAllByRole("button", { name: /⭐/i });

//     userEvent.click(favButton[0]);
//     expect(moodHeader).toBeInTheDocument();

//     const navFav = screen.getByRole("link", { name: /favorites/i });
//     userEvent.click(navFav);

//     const favHeading = screen.getByRole("heading", { name: /favorites view/i });
//     const songTitle1 = screen.getByRole("heading", {
//       name: /what kind of love are you on/i,
//     });
//     expect(favHeading).toBeInTheDocument();
//     expect(songTitle1).toBeInTheDocument();
//   });

//   it("Should remove favorite after clicking remove on Favorite component", () => {
//     render(
//       <MemoryRouter initialEntries={["/favorites"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const songTitle1 = screen.getByRole("heading", {
//       name: /what kind of love are you on/i,
//     });
//     expect(songTitle1).toBeInTheDocument();

//     const removeBtn = screen.getAllByRole("button", { name: /remove/i });
//     userEvent.click(removeBtn[0]);
//     expect(songTitle1).not.toBeInTheDocument();
//   });

//   it("Should open new window w/clicking spotify icon on Favorite component", () => {
//     global.open = jest.fn();

//     render(
//       <MemoryRouter initialEntries={["/favorites"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const songTitle1 = screen.getByRole("heading", {
//       name: /what kind of love are you on/i,
//     });
//     const spotifyBtn = screen.getAllByTestId("spotify");

//     expect(songTitle1).toBeInTheDocument();
//     expect(spotifyBtn[0]).toBeInTheDocument();

//     userEvent.click(spotifyBtn[0]);
//     expect(global.open).toHaveBeenCalled();
//   });

//   it("Should open new window w/clicking spotify icon on Result component", async () => {
//     global.open = jest.fn();

//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const mood6 = screen.getByText("Angry");
//     const the90s = screen.getByText("1990s");
//     const submitButton = screen.getByRole("button", { name: /get songs/i });
//     userEvent.click(mood6);
//     userEvent.click(the90s);
//     userEvent.click(submitButton);

//     const spotifyBtn = await screen.findAllByTestId("spotify");
//     expect(spotifyBtn[0]).toBeInTheDocument();

//     userEvent.click(spotifyBtn[0]);
//     expect(global.open).toHaveBeenCalled();
//   });
// });
