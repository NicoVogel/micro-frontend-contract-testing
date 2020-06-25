import { equal } from "assert";
import { Foo } from "../src/index";

describe("foo", () => {
  it("bar", () => {
    equal(new Foo().bar, 1);
  });
});
