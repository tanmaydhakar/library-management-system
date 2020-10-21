"use strict";

class login {
  get rules() {
    return {
      username: "required|min:3|max:40",
      password: "required|min:3|max:40",
    };
  }
}

module.exports = login;
