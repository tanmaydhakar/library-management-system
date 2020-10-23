"use strict";

class updateBook {

  get data () {
    const requestBody = this.ctx.request.all()
    const bookId = this.ctx.params.bookId

   return Object.assign({}, requestBody, { bookId })
  }

  get rules() {
    return {
      title: "required|unique:books|string",
      quantity: "required|integer",
      bookId: "bookExistsValidator|bookQuantityValidator",
    };
  }
}

module.exports = updateBook;
