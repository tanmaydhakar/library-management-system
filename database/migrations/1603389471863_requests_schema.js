'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequestsSchema extends Schema {
  up () {
    this.create('requests', (table) => {
      table.increments()
      table.integer('book_id').unsigned().references('id').inTable('books')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('type', 50).notNullable()
      table.string('status', 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('requests')
  }
}

module.exports = RequestsSchema
