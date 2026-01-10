import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Register from "../app/Register";

const mockNavigate = jest.fn();

// Navigation mock
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

// Prevent native-module crashes in Jest
jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children }: any) => React.createElement(View, null, children),
  };
});

// Mock DropDownPicker
jest.mock("react-native-dropdown-picker", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockDropDownPicker() {
    return React.createElement(Text, null, "DropDownPicker");
  };
});

// Mock DateTimePicker
jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  return function MockDateTimePicker() {
    return React.createElement(React.Fragment, null);
  };
});

// Clear mocks before each test
beforeEach(() => {
  mockNavigate.mockClear();
});

// Tests for Register screen
test("starts on Step 1", () => {
  const { getByText } = render(<Register />);
  expect(getByText("Create Account")).toBeTruthy();
});

// Test Step 1 to Step 2 transition
test("Step 1 -> Step 2 when valid", () => {
  const { getByPlaceholderText, getByText } = render(<Register />);

  fireEvent.changeText(getByPlaceholderText("Enter your full name"), "Sofus");
  fireEvent.changeText(getByPlaceholderText("Enter your email"), "a@b.com");
  fireEvent.changeText(getByPlaceholderText("Create a password"), "abc123");

  fireEvent.press(getByText("Continue"));
  expect(getByText("Experience Level")).toBeTruthy();
});

// Test Step 2 to Step 3 transition
test("Step 2 -> Step 3", () => {
  const { getByPlaceholderText, getByText } = render(<Register />);

  // Step 1 -> Step 2
  fireEvent.changeText(getByPlaceholderText("Enter your full name"), "Sofus");
  fireEvent.changeText(getByPlaceholderText("Enter your email"), "a@b.com");
  fireEvent.changeText(getByPlaceholderText("Create a password"), "abc123");
  fireEvent.press(getByText("Continue"));

  // Step 2 -> Step 3
  fireEvent.press(getByText("Beginner"));
  fireEvent.press(getByText("Continue"));

  // Verify Step 3
  expect(getByText("Training Plan")).toBeTruthy();
});