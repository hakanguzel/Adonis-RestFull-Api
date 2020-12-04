'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodosSchema extends Schema {
  up() {
    this.create('todos', (table) => {
      table.increments()
      table.integer('user_id', 11).unsigned().references('id').inTable('users')
      table.string('title')
      table.string('body')
      table.boolean('done')
      table.timestamps()
    })
  }

  down() {
    this.drop('todos')
  }
}

module.exports = TodosSchema
