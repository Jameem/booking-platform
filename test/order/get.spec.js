const expect = require("chai").expect
const request = require("supertest")

const app = require("../../app.js")

describe("GET /orders", () => {
  it("Okay, Getting orders works", (done) => {
    request(app)
      .get("/api/orders")
      .then((res) => {
        const body = res.body
        expect(body).to.contain.property("success").equal(true)
        done()
      })
      .catch((error) => done(error))
  })
})
