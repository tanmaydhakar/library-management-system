"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Role = use("App/Models/Role");

class IsAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    const user = request.user;

    if (user.roles.name != "admin") {
      return response.status(403).json({ message: "Forbidden" });
    } else {
      await next();
    }
  }
}

module.exports = IsAdmin;
