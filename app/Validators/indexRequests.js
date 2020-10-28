"use strict";

class indexRequests {

  get rules() {
    return {
      userId: "userExistsValidator",
    };
  }
}

module.exports = indexRequests;
