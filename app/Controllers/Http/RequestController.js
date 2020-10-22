"use strict";

const Request = use("App/Models/Request");
const Book = use("App/Models/Book");

class RequestController {
  async index({ request, response, params }) {
    const query = request.get();
    const requests = Request.query().with("books");

    if (query.status && query.status == "accepted") {
      requests.where("status", "accepted");
    } else if (query.status && query.status == "rejected") {
      requests.where("status", "rejected");
    } else {
      requests.select();
    }

    requests = await requests.fetch();

    return response.status(200).json({ requests: requests });
  }

  async show({ requests, response, params }) {
    const request = await Request.query().where("id", params.requestId).first();

    if (!request) {
      return response.status(404).send({ message: "Invalid request id" });
    } else {
      return response.status(200).json(request);
    }
  }

  async issue({ request, response, params }) {
    const book = await Book.query().where("id", params.bookId).first();
    if (book.available) {
      book.available = book.available - 1;
      await book.save();

      const request = new Request();
      request.book_id = book.id;
      request.type = "issue";
      request.status = "pending";
      request.user_id = request.user.id;
      request.save();

      return response.status(201).json({ request: request });
    } else {
      return response
        .status(404)
        .send({ message: "Book not available for issue" });
    }
  }

  async return({ request, response, params }) {
    const book = await Book.query().where("id", params.bookId).first();

    const request = new Request();
    request.book_id = book.id;
    request.type = "return";
    request.status = "pending";
    request.user_id = request.user.id;
    request.save();

    return response.status(201).json({ request: request });
  }

  async update({ request, response, params }) {
    const { status } = request.post();

    const request = await Request.query().where("id", params.requestId).first();

    if (!request) {
      return response.status(404).send({ message: "Invalid requestId" });
    }

    if (status == "rejected") {
      request.status = "rejected";
      request.save();

      return response.status(200).send({ request: request });
    } else if (status == "accepted") {
      const book = await Book.query().where("id", request.book_id).first();
      if ((request.type = "issue")) {
        book.available = book.available - 1;
        await book.save();
      } else {
        book.available = book.available + 1;
        await book.save();
      }
      request.status = "accepted";
      await request.save();
      return response.status(200).json({ request: request });
    } else {
      return response.status(400).send({ message: "Invalid status" });
    }
  }

  async;
}

module.exports = RequestController;
