jest.mock("fs");
const makeVisualizer = require(".");

it("returns a config object", () => {
  expect(typeof makeVisualizer()).toBe("object");
});
