import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Settings from "../app/Settings";

// mocks
jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children }: any) => React.createElement(View, null, children),
  };
});

// Navigation mock
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

// Mock Appbar from react-native-paper
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

beforeEach(() => {
  mockNavigate.mockClear();
});

// Tests for Settings screen
test("renders the Settings title", () => {
  const { getByText } = render(<Settings />);
  expect(getByText("Settings")).toBeTruthy();
});

// Test logout navigation
test("logs out to Login", () => {
  const { getByText } = render(<Settings />);
  fireEvent.press(getByText("Log Out"));
  expect(mockNavigate).toHaveBeenCalledWith("Login");
});