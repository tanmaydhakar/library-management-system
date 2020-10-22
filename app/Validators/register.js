"use strict";

class register {
  get rules() {
    return {
      username: "required|min:3|max:40|unique:users",
      email: "required|email|min:4|max:40|unique:users",
      password: "required|min:8|max:40|passwordValidator",
    };
  }
}

module.exports = register;
