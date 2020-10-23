'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Request extends Model {
  book () {
    return this.hasOne('App/Models/Book')
  }
}

module.exports = Request
