"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Book = use("App/Models/Book");

class Request extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (requestInstance) => {
      if (
        requestInstance.$originalAttributes.status == "pending" &&
        requestInstance.status == "issued"
      ) {
        const book = await Book.query()
          .where("id", requestInstance.book_id)
          .first();
        book.available = book.available - 1;
        await book.save();
      } else if (
        requestInstance.$originalAttributes.status == "pending" &&
        requestInstance.status == "returned"
      ) {
        const book = await Book.query()
          .where("id", requestInstance.book_id)
          .first();
        book.available = book.available + 1;
        await book.save();
      }
    });
  }
  book() {
    return this.belongsTo("App/Models/Book");
  }
}

module.exports = Request;
