const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
  const Validator = use("Validator");
  const Database = use("Database");

  const passwordValidator = async (data, field, message, args, get) => {
    const value = get(data, field);

    if (!value.match(/(?=.*[a-z])/)) {
      throw "Password should contain atleast one small letter";
    } else if (!value.match(/(?=.*[A-Z])/)) {
      throw "Password should contain atleast one capital letter";
    } else if (!value.match(/[-+_!@#$%^&*.,?]/)) {
      throw "Password should contain atleast one special character";
    }
  };

  const bookAvailabilityValidator = async (data, field, message, args, get) => {
    const bookId = get(data, field);

    const book = await Database.table("books").where("id", bookId).first();

    if (!book.available) {
      throw "Book not available for issue";
    }
  };

  const requestExistsValidator = async (data, field, message, args, get) => {
    const requestId = get(data, field);

    const request = await Database.table("requests")
      .where("id", requestId)
      .first();

    if (!request) {
      throw "Request does not exists";
    }
  };

  const bookQuantityValidator = async (data, field, message, args, get) => {
    const bookId = get(data, field);
    const requests = await Database.table("requests")
      .where("book_id", bookId)
      .where("type", "issue")
      .where("status", "issued");

    if (requests.length > data.quantity) {
      throw "Updated quantity can not be less than issued books";
    }
  };

  const bookExistsValidator = async (data, field, message, args, get) => {
    const bookId = get(data, field);
    const book = await Database.table("books").where("id", bookId);

    if (!book.length) {
      throw "Invalid book Id";
    }
  };

  const bookIssueAvailabilityValidator = async (data, field, message, args, get) => {
    const requestId = get(data, field);

    const request = await Database.table("requests")
      .where("id", requestId)
      .first();

    if (request.status != "pending") {
      throw "Request has already been acknowledged";
    }

    if (request.type != "issue") {
      return;
    }

    const book = await Database.table("books")
      .where("id", request.book_id)
      .first();

    if (!book.available - 1 >= 0) {
      throw "Book not available for issue";
    }
  };

  const userExistsValidator = async (data, field, message, args, get) => {
    const userId = get(data, field);
    if (!userId) {
      return;
    }

    const user = await Database.table("users").where("id", userId).first();

    if (!user) {
      throw "Invalid userId";
    }
  };

  Validator.extend("passwordValidator", passwordValidator);
  Validator.extend("bookAvailabilityValidator", bookAvailabilityValidator);
  Validator.extend("requestExistsValidator", requestExistsValidator);
  Validator.extend("bookQuantityValidator", bookQuantityValidator);
  Validator.extend("bookExistsValidator", bookExistsValidator);
  Validator.extend("bookIssueAvailabilityValidator",bookIssueAvailabilityValidator);
  Validator.extend("userExistsValidator", userExistsValidator);
});
