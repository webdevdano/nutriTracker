import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    // Reset DOM and localStorage before each test
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("renders a toggle button after mounting", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("button has an accessible aria-label", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Toggle theme");
  });

  it("starts in light mode by default (no stored preference)", () => {
    render(<ThemeToggle />);
    // In light mode the button is present; dark class should NOT be on <html>
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("reads dark mode from localStorage on mount", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("clicking the button adds the dark class when in light mode", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    act(() => { fireEvent.click(button); });
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("clicking the button removes the dark class when already in dark mode", () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    act(() => { fireEvent.click(button); });
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("double-click returns to the original theme", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    act(() => { fireEvent.click(button); }); // → dark
    act(() => { fireEvent.click(button); }); // → light
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
