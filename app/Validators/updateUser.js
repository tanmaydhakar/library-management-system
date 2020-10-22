"use strict";

class updateUser {
  get rules() {
    return {
      username: "required|min:3|max:40|unique:users",
      email: "required|email|min:4|max:40|unique:users",
    };
  }
}

module.exports = updateUser;
