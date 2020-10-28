"use strict";

const Request = use("App/Models/Request");
const Book = use("App/Models/Book");

class RequestController {
  async index({ request, response, params }) {
    const query = request.get();
    let bookRequests = Request.query().with("book");

    if (query.status && query.status == "issued") {
      bookRequests.where("status", "issued");
    } else if (query.status && query.status == "pending") {
      bookRequests.where("status", "pending");
    } else if (query.status && query.status == "rejected") {
      bookRequests.where("status", "rejected");
    } else if (query.status && query.status == "returned") {
      bookRequests.where("status", "returned");
    }

    if (
      (query.userId && request.user.roles.name === "admin") ||
      query.userId == request.user.id
    ) {
      bookRequests.where("user_id", query.userId);
    } else if (!query.userId && request.user.roles.name !== "admin") {
      bookRequests.where("user_id", request.user.id);
    } else if (request.user.roles.name === "admin") {
      bookRequests.select();
    } else {
      return response
        .status(401)
        .json({ message: "You are unauthorized to access this resource" });
    }

    bookRequests = await bookRequests.fetch();

    return response.status(200).json({ requests: bookRequests });
  }

  async show({ request, response, params }) {
    const bookRequest = await Request.query()
      .with("book")
      .where("id", params.requestId)
      .first();

    if (
      bookRequest.user_id == request.user.id ||
      request.user.roles.name === "admin"
    ) {
      return response.status(200).json({ request: bookRequest });
    } else {
      return response
        .status(401)
        .json({ message: "You are unauthorized to access this resource" });
    }
  }

  async issue({ request, response, params }) {
    const book = await Book.query().where("id", params.bookId).first();

    const bookRequest = new Request();
    bookRequest.book_id = book.id;
    bookRequest.type = "issue";
    bookRequest.status = "pending";
    bookRequest.user_id = request.user.id;
    bookRequest.save();

    return response.status(201).json({ request: bookRequest });
  }

  async return({ request, response, params }) {
    const book = await Book.query().where("id", params.bookId).first();

    const bookRequest = new Request();
    bookRequest.book_id = book.id;
    bookRequest.type = "return";
    bookRequest.status = "pending";
    bookRequest.user_id = request.user.id;
    bookRequest.save();

    return response.status(201).json({ request: bookRequest });
  }

  async reject({ request, response, params }) {
    const bookRequest = await Request.query().where("id", params.requestId).first();
    bookRequest.status = "rejected";
    bookRequest.save();

    return response.status(200).send({ request: bookRequest });
  }

  async accept({ request, response, params }) {
    const bookRequest = await Request.query()
      .where("id", params.requestId)
      .first();

    if (bookRequest.type == "return") {
      bookRequest.status = "returned";
    } else {
      bookRequest.status = "issued";
    }

    await bookRequest.save();
    return response.status(200).send({ request: bookRequest });
  }
}

module.exports = RequestController;
