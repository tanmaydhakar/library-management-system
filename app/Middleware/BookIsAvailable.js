"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Book = use("App/Models/Book");

class BookIsAvailable {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, params }, next) {
    const book = await Book.query().where("id", params.bookId).first();
    if (!book.available) {
      return response
        .status(404)
        .json({ message: "Book not available for issue" });
    } else {
      await next();
    }
  }
}

module.exports = BookIsAvailable;
