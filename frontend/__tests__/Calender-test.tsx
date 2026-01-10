import React from "react";
import { render } from "@testing-library/react-native";
import Calender from "../screens/Calender";


jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children }: any) => React.createElement(View, null, children),
  };
});

// Appbar mock (so "Training Calendar" title is actually rendered)
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

// Mock the icon imports used by getIcon()
jest.mock("../assets/icons/green.png", () => 1);
jest.mock("../assets/icons/grey.png", () => 1);
jest.mock("../assets/icons/orange.png", () => 1);
jest.mock("../assets/icons/purple.png", () => 1);

// Mock AuthContext 
const mockUseAuth = jest.fn();
jest.mock("../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

beforeEach(() => {
  mockUseAuth.mockReset();
});

// Valid training plan with one completed workout
test("valid: shows week + workout and ✓ Completed", () => {
  mockUseAuth.mockReturnValueOnce({
    trainingPlan: {
      sections: [
        {
          title: "Week 1",
          data: [
            {
              date: "Today",
              isoDate: "2026-01-10",
              description: "Easy Run - 5 km",
              time: "30 min",
              complete: true,
              image: "green.png",
            },
          ],
        },
      ],
    },
  });

  const { getByText } = render(<Calender />);
  expect(getByText("Training Calendar")).toBeTruthy();
  expect(getByText("Week 1")).toBeTruthy();
  expect(getByText("Easy Run - 5 km")).toBeTruthy();
  expect(getByText("✓ Completed")).toBeTruthy();
});

// Invalid: no training plan
test("invalid: no training plan shows only header", () => {
  mockUseAuth.mockReturnValueOnce({ trainingPlan: null });

  const { getByText, queryByText } = render(<Calender />);
  expect(getByText("Training Calendar")).toBeTruthy();
  expect(queryByText("Week 1")).toBeNull();
});