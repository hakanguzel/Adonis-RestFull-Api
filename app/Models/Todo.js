'use strict'

const Model = use('Model')

class Todo extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Todo
