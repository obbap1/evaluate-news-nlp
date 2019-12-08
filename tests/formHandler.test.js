import { handleSubmit } from "../src/client/js/formHandler";
import * as sanitizeInputModule from "../src/client/js/utils";

describe("Test the handleSubmit method", () => {
  // mock the event
  const event = { preventDefault: () => {} };

  let defaultMessage = "I am happy to see you";

  beforeEach(() => {
    // mock the sanitize input module
    const spy = jest.spyOn(sanitizeInputModule, "sanitizeInput");
    spy.mockReturnValue(defaultMessage);
    jest.spyOn(event, "preventDefault");
    fetch.resetMocks();
  });

  test("Form Handler: Should return a response after calling the API", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        response: {
          text: defaultMessage,
          language: "en",
          categories: [
            {
              confidence: "0.7",
              code: "0113232323",
              label: "Arts and Religion"
            }
          ]
        }
      })
    );

    expect(handleSubmit(event)).resolves.toHaveProperty("response");
  });
});
