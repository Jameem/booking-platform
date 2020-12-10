const expect = require("chai").expect
const request = require("supertest")

const app = require("../../app.js")

describe("POST /orders", () => {
  let payload = {
    title: "Unit Testing Order X1004",
    bookingDate: 1579804200,
    city: "Berlin",
    country: "Germany",
    street: "Wriezener Str. 12",
    zip: "13055",
    email: "jameem@construyo.de",
    name: "Jameem",
    phone: "985875854",
  }

  it("Okay, creating an order works", (done) => {
    request(app)
      .post("/api/orders")
      .send(payload)
      .then((res) => {
        const body = res.body
        expect(body).to.contain.property("success").equal(true)
        done()
      })
      .catch((error) => done(error))
  })

  it("Fails, order requries a title", (done) => {
    request(app)
      .post("/api/orders")
      .send({ bookingDate: 1579804200, email: "jameem@construyo.de" })
      .then((res) => {
        const body = res.body
        expect(body).to.contain.property("success").equal(false)
        expect(body).to.contain.property("errors")
        done()
      })
      .catch((error) => done(error))
  })

  it("Fails, order requries a booking date", (done) => {
    request(app)
      .post("/api/orders")
      .send({ title: "Unit Testing", email: "jameem@construyo.de" })
      .then((res) => {
        const body = res.body
        expect(body).to.contain.property("success").equal(false)
        expect(body).to.contain.property("errors")
        done()
      })
      .catch((error) => done(error))
  })

  it("Fails, order requries an email", (done) => {
    request(app)
      .post("/api/orders")
      .send({ title: "Unit Testing", bookingDate: 1579804200 })
      .then((res) => {
        const body = res.body
        expect(body).to.contain.property("success").equal(false)
        expect(body).to.contain.property("errors")
        done()
      })
      .catch((error) => done(error))
  })
})
