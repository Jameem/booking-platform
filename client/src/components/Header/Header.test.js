import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { act } from "react-dom/test-utils"
import Header from "./Header"
import { ToastProvider } from "react-toast-notifications"
import { render } from "@testing-library/react"

import { StateProvider } from "../../StateProvider"
import reducer, { initialState } from "../../reducers"

describe("Header Component", () => {
  it("renders the component", async () => {
    await act(async () => {
      render(
        <StateProvider initialState={initialState} reducer={reducer}>
          <Router>
            <Header />
          </Router>
        </StateProvider>
      )
    })
  })
})
