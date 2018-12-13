import React from "react"
import renderer from "react-test-renderer"
import Artifacts from "../pages/artifacts"
import { data } from "./artifacts.test.json"

jest.mock("components/Layout", () => "div")

describe("artifacts", () =>
  it("renders", () => {
    renderer.create(<Artifacts data={data} />)
  }))
