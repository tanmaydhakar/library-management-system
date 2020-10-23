'use strict'

class createBook {
  get rules () {
    return {
      title: "required|unique:books|string",
      quantity: "required|integer",
    }
  }
}

module.exports = createBook
