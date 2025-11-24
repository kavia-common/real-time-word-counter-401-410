import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('displays correct counts as user types', () => {
  render(<App />);
  const textarea = screen.getByLabelText(/text input/i);
  fireEvent.change(textarea, { target: { value: 'Hello world!' } });
  expect(screen.getByText(/2/)).toBeInTheDocument(); // 2 words
  expect(screen.getByText(/12/)).toBeInTheDocument(); // 12 chars incl. space/punct
  expect(screen.getByText(/11/)).toBeInTheDocument(); // 11 chars no space
});

test('shows copy status after clicking Copy', () => {
  render(<App />);
  const textarea = screen.getByLabelText(/text input/i);
  fireEvent.change(textarea, { target: { value: 'copy me!' } });
  const copyBtn = screen.getByRole("button", { name: /copy/i });
  fireEvent.click(copyBtn);
  expect(screen.getByText(/Copied!|Copy failed/i)).toBeInTheDocument();
});
