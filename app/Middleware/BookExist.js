"use strict";
const Book = use("App/Models/Book");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class BookExist {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, params }, next) {
    const book = await Book.query().where("id", params.bookId).first();
    if (!book) {
      return response.status(404).json({ message: "Invalid book id" });
    } else {
      await next();
    }
  }
}

module.exports = BookExist;
