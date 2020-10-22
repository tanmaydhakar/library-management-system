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

  Validator.extend("passwordValidator", passwordValidator);
});
