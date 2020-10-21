"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");
const Hash = use("Hash");

class UserSeeder {
  async run() {
    const password = await Hash.make("Admin@123");
    await Database.table("users").insert([
      {
        username: "admin",
        email: "admin@mailinator.com",
        password: password,
        created_at: Database.fn.now(),
        updated_at: Database.fn.now(),
      },
    ]);
  }
}

module.exports = UserSeeder;
