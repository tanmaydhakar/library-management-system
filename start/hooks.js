const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
  const Validator = use("Validator");

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

    const book = await Database.table("books")
      .where("id", bookId)

      if(!book.available){
        throw "Book not available for issue";
      }
  }

  const requestExistsValidator = async (data, field, message, args, get) => {
    const requestId = get(data, field);

    const request = await Database.tible("requests")
      .where("id", requestId)

    if(!request){
      throw "Request does not exists";
    }
  }

  Validator.extend("passwordValidator", passwordValidator);
  Validator.extend("bookAvailabilityValidator", bookAvailabilityValidator);
  Validator.extend("requestExistsValidator", requestExistsValidator);
});
