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
          .json({ message: "Invalid Authorization token" });
      } else {
        tokenData = tokenData.toJSON();
        const user = await User.query().where("id", tokenData.user_id).with("roles").first();
        user.token = token;

        request.user = user.toJSON();
        await next();
      }
    } else {
      return response.status(400).json({
        message: "Authorization token missing",
      });
    }
  }
}

module.exports = authenticationCheck;
