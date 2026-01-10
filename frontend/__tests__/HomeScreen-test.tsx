import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "../screens/HomeScreen";


jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children }: any) => React.createElement(View, null, children),
  };
});

jest.mock("react-native-paper", () => ({
  ActivityIndicator: () => null,
}));

const mockRequestForegroundPermissionsAsync = jest.fn();
const mockGetCurrentPositionAsync = jest.fn();

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: (...args: any[]) =>
    mockRequestForegroundPermissionsAsync(...args),
  getCurrentPositionAsync: (...args: any[]) => mockGetCurrentPositionAsync(...args),
}));

jest.mock("../scripts/weatherService", () => ({
  fetchWeatherByCoords: jest.fn(),
}));

jest.mock("../scripts/tips", () => ({
  generateTips: jest.fn(),
}));

const mockSetTrainingPlan = jest.fn();
const mockUseAuth = jest.fn();

jest.mock("../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

function makeTrainingPlan() {
  const todayIso = new Date().toISOString().split("T")[0];

  const d1 = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const d2 = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const d3 = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  // UI currently indexes upcomingWorkouts[0..2],
  // so we provide 3 upcoming workouts to avoid crashing.
  return {
    sections: [
      {
        title: "Week 1",
        data: [
          { isoDate: todayIso, date: "Today", description: "Easy Run - 5 km", time: "30 min", complete: false },
          { isoDate: d1, date: "Tomorrow", description: "Recovery - 3 km", time: "20 min", complete: false },
          { isoDate: d2, date: "In 2 days", description: "Intervals - 6 km", time: "40 min", complete: false },
          { isoDate: d3, date: "In 3 days", description: "Long Run - 8 km", time: "55 min", complete: false },
        ],
      },
    ],
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  (global as any).alert = jest.fn();
  (global as any).fetch = jest.fn();

  mockUseAuth.mockReturnValue({
    user: { id: "1", fullName: "Sofus" },
    trainingPlan: makeTrainingPlan(),
    setTrainingPlan: mockSetTrainingPlan,
  });
});

// Invalid: location permission denied shows error
test("invalid: location permission denied shows error", async () => {
  mockRequestForegroundPermissionsAsync.mockResolvedValueOnce({ status: "denied" });

  const { getByText } = render(<HomeScreen />);
  fireEvent.press(getByText("Get Pre-Run Tips"));

  await waitFor(() => {
    expect(getByText("Location permission denied")).toBeTruthy();
  });
});

// Valid: location permission granted and Mark as Complete
test("valid: Mark as Complete calls backend and updates plan", async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true }),
  });

  const { getByText } = render(<HomeScreen />);
  fireEvent.press(getByText("Mark as Complete"));

  await waitFor(() => expect(global.fetch).toHaveBeenCalled());

  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:3000/user/1/complete",
    expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
  );

  // setTrainingPlan is called with an updater function
  expect(mockSetTrainingPlan).toHaveBeenCalledWith(expect.any(Function));
});