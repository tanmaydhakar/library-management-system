"use strict";

const User = use("App/Models/User");
const Role = use("App/Models/Role");
const Token = use("App/Models/Token");

class authenticationCheck {
  async handle({ request, response }, next) {
    const headers = request.headers();
    const token = headers["authorization"];

    if (token) {
      let tokenData = await Token.query().where("token", token).first();
      if (!tokenData) {
        return response
          .status(401)
          .json({ message: "Invalid Authorization token" });
      } else {
        tokenData = tokenData.toJSON();
        let user = await User.query().where("id", tokenData.user_id).with("roles").first();
        user = user.toJSON();
        let role = await Role.query().where("id", user.roles.role_id).first();
        role = role.toJSON();

        user.roles = role;
        user.token = token;

        request.user = user;
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
