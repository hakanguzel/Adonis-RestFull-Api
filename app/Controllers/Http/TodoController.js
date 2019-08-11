'use strict'

const Todo = use('App/Models/Todo');
const User = use('App/Models/User');

class TodoController {
  async all({ request, response, view }) {
    let todos = await User.query().with('todos').fetch()
    return response.json(todos)
  }
  async index({ request, response, view }) {
    let todos = await Todo.query().fetch()
    return response.json(todos)
  }
  async create({ request, response, view }) {
  }

  async store({ request, response }) {

    const title = request.input('title')
    const body = request.input('body')
    const done = request.input('done')

    const todo = new Todo()
    todo.title = title
    todo.body = body
    todo.done = done

    await todo.save()
    return response.json(todo)
  }
  async show({ params, request, response, view }) {
  }
  async edit({ params, request, response, view }) {
  }
  async update({ params, request, response }) {
    todo.title = title
    todo.body = body
    todo.done = done

    let todo = await Todo.find(params.id)

    todo.title = title
    todo.body = body
    todo.done = done
    await todo.save()
    return response.json(todo)
  }
  async destroy({ params, request, response }) {
    await Todo.find(params.id).delete()
    return response.json({ message: 'Todo deleted!' })
  }
}

module.exports = TodoController
