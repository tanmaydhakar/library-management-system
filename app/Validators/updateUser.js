"use strict";

class updateUser {
  get rules() {
    return {
      username: "min:3|max:40",
      email: "email|min:4|max:40|unique:users",
    };
  }
}

module.exports = updateUser;
