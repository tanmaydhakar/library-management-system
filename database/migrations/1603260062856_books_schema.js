"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BooksSchema extends Schema {
  up() {
    this.create("books", (table) => {
      table.increments();
      table.string("title", "1080").notNullable().unique();
      table.integer("quantity").notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("books");
  }
}

module.exports = BooksSchema;
