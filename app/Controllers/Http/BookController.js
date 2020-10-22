"use strict";

const Book = use("App/Models/Book");

class BookController {
  async index({ request, response, params }) {
    const query = request.get();
    let books = Book.query();

    if (query.sort && query.sort == "updated") {
      books.orderBy("updated_at", "desc");
    } else if (query.sort && query.sort == "title") {
      books.orderBy("title", "asc");
    } else {
      books.select();
    }
    books = await books.fetch();
    return response.status(200).json({ books: books });
  }

  async show({ request, response, params }) {
    const book = await Book.query().where("id", params.bookId).first();

    if (!book) {
      return response.status(404).json({ message: "Invalid book id" });
    } else {
      return response.status(200).json({ book: book });
    }
  }

  async update({ request, response, params }) {
    const book = await Book.query().where("id", params.bookId).first();
    if (!book) {
      return response.status(404).json({ message: "Invalid book id" });
    } else {
      const body = request.post();
      const quantityDifference = body.quantity - book.quantity;

      book.title = body.title;
      book.available = book.available + quantityDifference;
      book.quantity = body.quantity;
      await book.save();

      return response.status(200).json({ book: book });
    }
  }

  async create({ request, response }) {
    const { title, quantity } = request.post();

    const book = new Book();
    book.title = title;
    book.quantity = quantity;
    book.available = quantity;
    await book.save();

    return response.status(201).json({ book: book });
  }
}

module.exports = BookController;
