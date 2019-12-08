import { snackbar } from "../src/client/js/snackbar";

describe("Test the snackbar", () => {
  test("Snackbar: Should return a default message when no arguments are passed", () => {
    const defaultText = "Processing...";
    const item = snackbar();
    expect(item.innerHTML).toBe(defaultText);
  });

  test("Snackbar: Should have text passed as innerHTML", () => {
    const text = "Please Hold On";
    const item = snackbar(text);
    expect(item.innerHTML).toBe(text);
  });
});
