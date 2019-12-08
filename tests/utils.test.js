import { sanitizeInput } from "../src/client/js/utils";
import * as snackBarModule from "../src/client/js/snackbar";

describe("Test the sanitizeInput Method", () => {
  //Predefine error message variable
  let errorMessage;
  beforeEach(() => {
    errorMessage = "Please fill out this field";
    const spy = jest.spyOn(snackBarModule, "snackbar");
    spy.mockReturnValue(errorMessage);
  });

  test("Sanitize Input: No input equals error string", () => {
    expect(sanitizeInput()).toBe(errorMessage);
  });

  test("Sanitize input: Text should return type text", () => {
    expect(sanitizeInput("hello")).toHaveProperty("type", "text");
    expect(sanitizeInput("How are you")).toHaveProperty("text", "How are you");
  });

  test("Sanitize input: URL should return type url", () => {
    expect(
      sanitizeInput(
        "https://techcrunch.com/2019/12/06/rocket-lab-launches-10th-electron-mission-with-successful-rocket-booster-re-entry/"
      )
    ).toHaveProperty("type", "url");
  });
});
