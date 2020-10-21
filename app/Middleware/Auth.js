"use strict";

const User = use("App/Models/User");
const Token = use("App/Models/Token");

class authenticationCheck {
  async handle({ request, response }, next) {
    const headers = request.headers();
    const token = headers["authorization"];

    if (token) {
      let tokenData = await Token.query().where("token", token).first();
      if (!tokenData) {
        return response
          .status(400)
          .json({ message: "Authorization token missing" });
      } else {
        tokenData = tokenData.toJSON();
        const user = await User.query().where("id", tokenData.user_id).first();
        user.token = token;

        request.user = user.toJSON();
        await next();
      }
    } else {
      return response.status(401).json({
        message: "Please login to access this feature",
      });
    }
  }
}

module.exports = authenticationCheck;
