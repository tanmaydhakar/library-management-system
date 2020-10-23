"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Book extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (bookInstance) => {
      if (!bookInstance.available) {
        bookInstance.quantity = bookInstance.available;
      } else {
        const quantityDifference = bookInstance.quantity - bookInstance.$originalAttributes.quantity;
        bookInstance.available = bookInstance.available + quantityDifference;
      }
    });
  }
}

module.exports = Book;
