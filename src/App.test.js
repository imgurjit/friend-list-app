import App from "./App";
import { shallow } from "enzyme";

const setUp = (props = {}) => {
  const component = shallow(<App />);
  return component;
};

describe("App Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test("renders", () => {
    expect(component.exists()).toBe(true);
  });
});
