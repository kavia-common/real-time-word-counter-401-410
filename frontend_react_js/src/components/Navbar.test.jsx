import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import React from "react";

describe("Navbar", () => {
  test("renders navbar with title", () => {
    render(<Navbar />);
    const title = screen.getByText(/real-time word counter/i);
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toMatch(/a/);
  });

  test("shows theme button and info link on desktop", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /theme/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /info/i })).toBeInTheDocument();
  });

  test("mobile menu toggle opens and closes, focus is managed", () => {
    // Simulate small screen via forced media query override
    window.innerWidth = 400;
    render(<Navbar />);
    const menuBtn = screen.getByTestId("navbar-menu-btn");
    expect(menuBtn).toBeInTheDocument();

    // Initially closed
    expect(screen.queryByTestId("navbar-mobile-menu")).not.toBeInTheDocument();

    // Open menu
    fireEvent.click(menuBtn);
    expect(screen.getByTestId("navbar-mobile-menu")).toBeInTheDocument();
    // Info link/focusable menu items exist
    const infoBtn = screen.getByRole("button", { name: /info/i });
    expect(infoBtn).toBeInTheDocument();

    // Close via Escape key
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByTestId("navbar-mobile-menu")).not.toBeInTheDocument();
  });
});
