import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

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
