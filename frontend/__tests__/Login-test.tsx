import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "../app/Login";

const mockNavigate = jest.fn();

// Navigation mock
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

beforeEach(() => {
  mockNavigate.mockClear();
  (global as any).alert = jest.fn();
  (global as any).fetch = jest.fn();
});

// Tests for Login screen
test("shows alert if email/password missing", () => {
  const { getByText } = render(<Login />);
  fireEvent.press(getByText("Log In"));

  expect((global as any).alert).toHaveBeenCalledWith(
    "Please enter both email and password."
  );
  expect(mockNavigate).not.toHaveBeenCalled();
});

// Test valid login flow
test("navigates to Home on successful login", async () => {
  (global as any).fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true }),
  });

  // Render and perform login
  const { getByPlaceholderText, getByText } = render(<Login />);
  fireEvent.changeText(getByPlaceholderText("your@email.com"), "a@b.com");
  fireEvent.changeText(getByPlaceholderText("Enter your password"), "pw");
  fireEvent.press(getByText("Log In"));

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("Home"));
});