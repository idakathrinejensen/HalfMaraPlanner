import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Calender from "../app/Calender";

// Mocks

jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children }: any) => React.createElement(View, null, children),
  };
});

// Navigation mock
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
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

// Mock CheckBox from react-native-elements
jest.mock("react-native-elements", () => {
  const React = require("react");
  const { Pressable, Text } = require("react-native");
  return {
    CheckBox: ({ checked, onPress }: any) =>
      React.createElement(
        Pressable,
        { testID: "checkbox", accessibilityRole: "button", onPress },
        React.createElement(Text, null, checked ? "checked" : "unchecked")
      ),
  };
});

beforeEach(() => {
  (global as any).fetch = jest.fn();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  (console.error as unknown as jest.Mock).mockRestore?.();
});

test("renders the header", () => {
  const { getByText } = render(<Calender />);
  expect(getByText("Training Calendar")).toBeTruthy();
});

// Tests for fetching and displaying plan items
test("loads and shows plan items", async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => [
      {
        title: "Week 1",
        data: [
          {
            date: "2026-02-01",
            description: "Easy run",
            time: "30 min",
            image: "green.png",
          },
        ],
      },
    ],
  });

  const { getByText } = render(<Calender />);

  await waitFor(() => expect(getByText("Week 1")).toBeTruthy());
  expect(getByText("Easy run")).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test("toggles checkbox", async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => [
      {
        title: "Week 1",
        data: [
          {
            date: "2026-02-01",
            description: "Easy run",
            time: "30 min",
            image: "green.png",
          },
        ],
      },
    ],
  });

  const { getByText, getByTestId } = render(<Calender />);
  await waitFor(() => expect(getByText("Week 1")).toBeTruthy());

  expect(getByText("unchecked")).toBeTruthy();
  fireEvent.press(getByTestId("checkbox"));
  expect(getByText("checked")).toBeTruthy();
});