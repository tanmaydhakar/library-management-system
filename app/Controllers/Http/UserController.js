"use strict";
const User = use("App/Models/User");
const crypto = require("crypto");
const Hash = use("Hash");

class UserController {
  async register({ request, response }) {
    const { username, email, password } = request.post();

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await Hash.make(password);

    await user.save();

    response.status(201).json({ user: user });
  }

  async login({ request, response }) {
    const { username, password } = request.post();
    const user = await User.query().where("username", username).first();
    if (!user) {
      return response.status(404).json({ message: "user not found" });
    } else {
      const passwordCheck = await Hash.verify(password, user.password);
      if (!passwordCheck) {
        return response.status(401).json({ message: "Invalid Password" });
      } else {
        const token = crypto.randomBytes(64).toString("hex");
        user.token = token;
        user.save();

        return response.status(200).json({ user: user });
      }
    }
  }

  async logout({ request, response }) {
    const user = await User.query().where("id", request.user.id).first();
    user.token = null;
    user.save();

    return response.status(200).send({ status: "Successfully loggedout" });
  }

  async update({ request, response, params }) {
    const user = await User.query().where("id", params.userId).first();
    const body = request.post();
    user.username = body.username;
    user.email = body.email;
    user.save();

    return response.status(200).json({ user: user });
  }
}

module.exports = UserController;
