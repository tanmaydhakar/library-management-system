"use strict";

const Request = use("App/Models/Request");

class UpdateBookQuantityValidator {
  async handle({ request, response, params }, next) {
    let requests = await Request.query()
      .where("book_id", params.bookId)
      .fetch();
    requests = requests.toJSON();
    if (requests.length > request.body.quantity) {
      return response
        .status(400)
        .json({ message: "Updated quantity can not be less than issued books" });
    } else {
      await next();
    }
  }
}

module.exports = UpdateBookQuantityValidator;
