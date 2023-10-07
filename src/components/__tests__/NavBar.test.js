import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../context/CurrentUserContext";

test("renders NavBar element", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signInLink = screen.getByRole("link", { name: "Log in" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to the user name for a logged in user", async () => {
    render(
      <Router>
        <CurrentUserProvider>
          <NavBar />
        </CurrentUserProvider>
      </Router>
    );
  
    const userNick = await screen.findByText("admin"); 
    expect(userNick).toBeInTheDocument();
  });

  test("renders login / signup buttons on logout", async () => {
    render(
      <Router>
        <CurrentUserProvider>
          <NavBar />
        </CurrentUserProvider>
      </Router>
    );
  
    const signOutLink = await screen.findByRole('link', {name: 'Sign out'});
    fireEvent.click(signOutLink);

    const loginLink = await screen.findByText("Log in");
    const signupLink = await screen.findByText("Try it out for free!");

    expect(loginLink).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
  });
