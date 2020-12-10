import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { act } from "react-dom/test-utils"
import OrderList from "./OrderList"
import { ToastProvider } from "react-toast-notifications"
import { render } from "@testing-library/react"

import { StateProvider } from "../../StateProvider"
import reducer, { initialState } from "../../reducers"

describe("Order List Component", () => {
  it("renders the component", () => {
    act(() => {
      render(
        <StateProvider initialState={initialState} reducer={reducer}>
          <ToastProvider>
            <Router>
              <OrderList />
            </Router>
          </ToastProvider>
        </StateProvider>
      )
    })
  })
})
