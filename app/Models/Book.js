"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Book extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (bookInstance) => {
      if (!bookInstance.available && bookInstance.available != 0) {
        bookInstance.available = bookInstance.quantity;
      } else {
        const quantityDifference = bookInstance.quantity - bookInstance.$originalAttributes.quantity;
        bookInstance.available = bookInstance.available + quantityDifference;
      }
    });
  }
  requests () {
    return this.hasMany('App/Models/Request')
  }
  book () {
    return this.belongsTo('App/Models/Book')
  }
}

module.exports = Book;
