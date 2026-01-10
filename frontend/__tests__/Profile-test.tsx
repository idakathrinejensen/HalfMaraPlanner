import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Settings from "../screens/Profile";

const mockReset = jest.fn();
const mockLogout = jest.fn();

// SafeAreaView mock
jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return { SafeAreaView: ({ children }: any) => React.createElement(View, null, children) };
});

// Navigation mock 
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ reset: mockReset }),
}));

// Appbar mock 
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View, Text } = require("react-native");
  return {
    Appbar: {
      Header: ({ children }: any) => React.createElement(View, null, children),
      Content: ({ title }: any) => React.createElement(Text, null, title),
    },
  };
});

// Mock png requires used by <Image source={require(...)} />
jest.mock("../assets/icons/profile.png", () => 1);
jest.mock("../assets/icons/calendar_purple.png", () => 1);
jest.mock("../assets/icons/trophy_purple.png", () => 1);

// AuthContext mock 
const mockUseAuth = jest.fn();
jest.mock("../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

beforeEach(() => {
  mockReset.mockClear();
  mockLogout.mockClear();
  mockUseAuth.mockReset();
});

// Valid user
test("valid user shows name/email and logout resets", () => {
  mockUseAuth.mockReturnValueOnce({
    user: { fullName: "Leo", email: "a@b.com" },
    logout: mockLogout,
  });

  const { getByText } = render(<Settings />);

  expect(getByText("Profile")).toBeTruthy();
  expect(getByText("Leo")).toBeTruthy();
  expect(getByText("a@b.com")).toBeTruthy();

  fireEvent.press(getByText("Log Out"));
  expect(mockLogout).toHaveBeenCalled();
  expect(mockReset).toHaveBeenCalledWith({ index: 0, routes: [{ name: "Login" }] });
});

// Invalid user shows
test("invalid user", () => {
  mockUseAuth.mockReturnValueOnce({ user: null, logout: mockLogout });

  const { getByText } = render(<Settings />);
  expect(getByText("Runner")).toBeTruthy();
});