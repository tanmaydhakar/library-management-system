'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {
    user () {
        this.hasOne('App/Models/UserRole')
    }
}

module.exports = Role
