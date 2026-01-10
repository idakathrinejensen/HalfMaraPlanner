import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Register from "../screens/Register";

const mockReset = jest.fn();
const mockNavigate = jest.fn();
const mockLogin = jest.fn();

jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children }: any) => React.createElement(View, null, children),
  };
});

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ reset: mockReset, navigate: mockNavigate }),
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({ login: mockLogin, trainingPlan: null }),
}));

jest.mock("react-native-dropdown-picker", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockDropDownPicker() {
    return React.createElement(Text, null, "DropDownPicker");
  };
});

// When the date picker is rendered, immediately set a date so Step 3 becomes valid.
jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  return function MockDateTimePicker(props: any) {
    React.useEffect(() => {
      props.onChange?.(null, new Date("2026-02-01T00:00:00.000Z"));
    }, []);
    return React.createElement(React.Fragment, null);
  };
});

beforeEach(() => {
  mockReset.mockClear();
  mockNavigate.mockClear();
  mockLogin.mockClear();
  (global as any).alert = jest.fn();
  (global as any).fetch = jest.fn();
});

async function goToStep3(screen: any) {
  const { getByPlaceholderText, getByText } = screen;

  // Step 1
  fireEvent.changeText(getByPlaceholderText("Enter your full name"), "Sofus");
  fireEvent.changeText(getByPlaceholderText("Enter your email"), "a@b.com");
  fireEvent.changeText(getByPlaceholderText("Create a password"), "abc123");
  fireEvent.press(getByText("Continue"));

  // Step 2
  fireEvent.press(getByText("Beginner"));
  fireEvent.press(getByText("Continue"));

  await waitFor(() => expect(getByText("Training Plan")).toBeTruthy());

  // Step 3: open date picker (mock will auto-select a date)
  fireEvent.press(getByText("Select race date"));
  await waitFor(() => expect(getByText("2026-02-01")).toBeTruthy());
}

test("valid register + login resets to MainTabs", async () => {
  (global as any).fetch
    .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) }) // register
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, user: { id: "1" }, trainingPlan: {} }),
    }); // login

  const screen = render(<Register />);
  await goToStep3(screen);

  fireEvent.press(screen.getByText("Create Account"));

  await waitFor(() => expect(mockLogin).toHaveBeenCalled());
  expect(mockReset).toHaveBeenCalled();
});

test("invalid register shows alert and does not log in", async () => {
  (global as any).fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: false, message: "Email already exists" }),
  });

  const screen = render(<Register />);
  await goToStep3(screen);

  fireEvent.press(screen.getByText("Create Account"));

  await waitFor(() => expect((global as any).alert).toHaveBeenCalled());
  expect((global as any).alert).toHaveBeenCalledWith("Email already exists");
  expect(mockLogin).not.toHaveBeenCalled();
  expect(mockReset).not.toHaveBeenCalled();
});