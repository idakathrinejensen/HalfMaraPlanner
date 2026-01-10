import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "../app/HomeScreen";

// mocks

jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children }: any) => React.createElement(View, null, children),
  };
});

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

jest.mock("react-native-paper", () => ({
  ActivityIndicator: () => null,
}));

// Expo Location mock
const mockRequestForegroundPermissionsAsync = jest.fn();

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: (...args: any[]) =>
    mockRequestForegroundPermissionsAsync(...args),
  getCurrentPositionAsync: jest.fn(),
}));

// HomeScreen imports these; we don't test their logic here
jest.mock("../scripts/weatherService", () => ({
  fetchWeatherByCoords: jest.fn(),
}));
jest.mock("../scripts/tips", () => ({
  generateTips: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

// Tests for HomeScreen
test("renders the main UI", () => {
  const { getByText } = render(<HomeScreen />);

  expect(getByText("Training Progress")).toBeTruthy();
  expect(getByText("Today's Workout")).toBeTruthy();
  expect(getByText("Get Pre-Run Tips")).toBeTruthy();
  expect(getByText("Mark as Complete")).toBeTruthy();
});

// Test location permission flow
test("shows error if location permission is denied", async () => {
  mockRequestForegroundPermissionsAsync.mockResolvedValueOnce({ status: "denied" });

  const { getByText } = render(<HomeScreen />);
  fireEvent.press(getByText("Get Pre-Run Tips"));

  await waitFor(() => {
    expect(getByText("Location permission denied")).toBeTruthy();
  });
});

// Test marking workout as complete
test("marks workout as complete", () => {
  const { getByText } = render(<HomeScreen />);
  fireEvent.press(getByText("Mark as Complete"));

  expect(getByText("✓ Completed")).toBeTruthy();
});