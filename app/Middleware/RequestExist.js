"use strict";
const Request = use("App/Models/Request");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class RequestExist {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, params }, next) {
    const req = await Request.query().where("id", params.requestId).first();
    if (!req) {
      return response.status(404).json({ message: "Invalid request id" });
    } else {
      await next();
    }
  }
}

module.exports = RequestExist;
