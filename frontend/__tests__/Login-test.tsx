import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "../screens/Login";

const mockReset = jest.fn();
const mockLogin = jest.fn();

jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children }: any) => React.createElement(View, null, children),
  };
});

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ reset: mockReset, navigate: jest.fn() }),
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

beforeEach(() => {
  mockReset.mockClear();
  mockLogin.mockClear();
  (global as any).alert = jest.fn();
  (global as any).fetch = jest.fn();
});

test("logs in successfully", async () => {
  (global as any).fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true, user: { id: "1" }, trainingPlan: {} }),
  });

  const { getByPlaceholderText, getByText } = render(<Login />);
  fireEvent.changeText(getByPlaceholderText("your@email.com"), "a@b.com");
  fireEvent.changeText(getByPlaceholderText("Enter your password"), "pw123");
  fireEvent.press(getByText("Log In"));

  await waitFor(() => expect(mockLogin).toHaveBeenCalled());
  expect(mockReset).toHaveBeenCalled();
});

test("shows error for non-existing/invalid login", async () => {
  (global as any).fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: false, message: "User not found" }),
  });

  const { getByPlaceholderText, getByText } = render(<Login />);
  fireEvent.changeText(getByPlaceholderText("your@email.com"), "no@user.com");
  fireEvent.changeText(getByPlaceholderText("Enter your password"), "wrongpw" );
  fireEvent.press(getByText("Log In"));

  await waitFor(() => expect((global as any).alert).toHaveBeenCalled());
  expect((global as any).alert).toHaveBeenCalledWith("User not found");
  expect(mockLogin).not.toHaveBeenCalled();
  expect(mockReset).not.toHaveBeenCalled();
});