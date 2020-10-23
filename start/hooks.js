const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
  const Validator = use("Validator");
  const Database = use('Database')

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

  const bookQuantityValidator = async (data, field, message, args, get) => {
    const bookId = get(data, field);
    const requests = await Database.table("requests")
      .where("book_id", bookId)
      .where("type", "issue")
      .where("status", "issued");

      if (requests.length > data.quantity) {
        throw "Updated quantity can not be less than issued books";
      }
  }

  const bookExistsValidator = async (data, field, message, args, get) => {
    const bookId = get(data, field);
    const book = await Database.table("books")
      .where("id", bookId)

      if(!book.length){
        throw "Invalid book Id"
      }
  }

  Validator.extend("passwordValidator", passwordValidator);
  Validator.extend("bookQuantityValidator", bookQuantityValidator);
  Validator.extend("bookExistsValidator", bookExistsValidator);
});
