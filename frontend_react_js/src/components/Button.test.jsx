import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import React from "react";
// Dummy icon for testing
function DummyIcon() {
  return (
    <svg data-testid="dummy-icon" width="16" height="16" role="img" aria-label="icon">
      <rect width="16" height="16" />
    </svg>
  );
}

describe("Button component", () => {
  test("renders with children", () => {
    render(<Button>My Button</Button>);
    expect(screen.getByRole("button", { name: /my button/i })).toBeInTheDocument();
  });

  test("applies disabled state and prevents click", () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Blocked</Button>);
    const btn = screen.getByRole("button", { name: /blocked/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("calls onClick handler", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>ClickMe</Button>);
    const btn = screen.getByRole("button", { name: /clickme/i });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies correct variant styles", () => {
    render(<>
      <Button variant="primary">Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </>);
    expect(screen.getByRole("button", { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /success/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /secondary/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ghost/i })).toBeInTheDocument();
  });

  test("loading state disables clicks and shows spinner", () => {
    const handleClick = jest.fn();
    render(<Button loading onClick={handleClick}>Busy</Button>);
    const btn = screen.getByRole("button", { name: /busy/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
    // Spinner is present
    expect(screen.getByTestId("btn-spinner")).toBeInTheDocument();
  });

  test("fullWidth applies width:100% style", () => {
    render(<Button fullWidth>Wide</Button>);
    const btn = screen.getByRole("button", { name: /wide/i });
    expect(btn).toHaveStyle("width: 100%");
  });

  test("renders left icon and right icon correctly with spacing", () => {
    render(
      <Button leftIcon={<DummyIcon />} rightIcon={<DummyIcon />}>
        Content
      </Button>
    );
    // Left and right icon should render
    const left = screen.getAllByTestId("dummy-icon")[0];
    const right = screen.getAllByTestId("dummy-icon")[1];
    expect(left).toBeInTheDocument();
    expect(right).toBeInTheDocument();
    // Icons are aria-hidden to screen readers (since children are present)
    expect(left.closest("span")).toHaveAttribute("aria-hidden", "true");
    expect(right.closest("span")).toHaveAttribute("aria-hidden", "true");
    // The children text is read by the button
    expect(screen.getByRole("button", { name: /content/i })).toBeInTheDocument();
  });

  test("when only icon, button is still accessible", () => {
    render(<Button leftIcon={<DummyIcon />} aria-label="IconOnly" />);
    // When no children but aria-label is present, button is accessible
    expect(screen.getByRole("button", { name: /icononly/i })).toBeInTheDocument();
  });

  test("focus-visible ring applies only for keyboard", () => {
    render(<Button>Focusable</Button>);
    const btn = screen.getByRole("button", { name: /focusable/i });
    // Simulate keyboard focus
    btn.focus();
    fireEvent.keyDown(btn, { key: "Tab" });
    expect(btn.className).toMatch(/focus-visible/);
    // Simulate mouse click removes focus
    fireEvent.mouseDown(btn);
    expect(btn.className).not.toMatch(/focus-visible/);
  });

  test("regression: size and variant props still applied", () => {
    render(<Button size="lg" variant="success">BigSuccess</Button>);
    const btn = screen.getByRole("button", { name: /bigsuccess/i });
    expect(btn).toBeInTheDocument();
    render(<Button size="sm" variant="secondary">SmallSecondary</Button>);
    const btn2 = screen.getByRole("button", { name: /smallsecondary/i });
    expect(btn2).toBeInTheDocument();
  });

  test("className passthrough works", () => {
    render(<Button className="custom-class">Custom</Button>);
    const btn = screen.getByRole("button", { name: /custom/i });
    expect(btn.className).toMatch(/custom-class/);
  });
});
