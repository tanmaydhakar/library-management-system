"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Book extends Model {}

Book.return = async function (bookId) {
  const book = await Book.query().where("id", bookId).first();
  book.available = book.available + 1;
  await book.save();

  return book;
};

Book.issue = async function (bookId) {
  const book = await Book.query().where("id", bookId).first();
  if (book.available - 1 >= 0) {
    book.available = book.available - 1;
    await book.save();

    return book;
  } else {
    return { message: "Book not available for issue" };
  }
};

module.exports = Book;
