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

  async show({ request, response, params }) {
    const req = await Request.query()
      .with("books")
      .where("id", params.requestId)
      .first();

      return response.status(200).json({ request: req });
  }

  async issue({ request, response, params }) {
    const book = await Book.query().where("id", params.bookId).first();

    const req = new Request();
    req.book_id = book.id;
    req.type = "issue";
    req.status = "pending";
    req.user_id = req.user.id;
    req.save();

    return response.status(201).json({ request: req });
  }

  async return({ request, response, params }) {
    const book = await Book.query().where("id", params.bookId).first();

    const req = new Request();
    req.book_id = book.id;
    req.type = "return";
    req.status = "pending";
    req.user_id = req.user.id;
    req.save();

    return response.status(201).json({ request: req });
  }

  async reject({ request, response, params }) {
    const req = await Request.query().where("id", params.requestId).first();
    req.status = "rejected";
    req.save();

    return response.status(200).send({ request: req });
  }

  async accept({ request, response, params }) {
    const req = await Request.query().where("id", params.requestId).first();
    if ((req.type = "return")) {
      await Book.return(req.book_id);
    } else {
      const issue = await Book.issue(req.book_id);
      if (issue.message) {
        return response.status(422).send({ message: issue.message });
      }
    }

    req.status = "accepted";
    await req.save();

    return response.status(200).send({ request: req });
  }
}

module.exports = RequestController;
