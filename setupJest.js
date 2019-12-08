// Mock fetch
global.fetch = require("jest-fetch-mock");

const spyFunc = jest.fn();
// mock the global document
Object.defineProperty(global.document, "getElementById", { value: spyFunc });
spyFunc.mockReturnValue({ innerHTML: "", className: "" });
