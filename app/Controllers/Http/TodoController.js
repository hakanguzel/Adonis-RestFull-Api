'use strict'
const Todo = use('App/Models/Todo');
const User = use('App/Models/User');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
  //User'a Ait Todoların Gösterimi
  async all({ request, response, view }) {
    //Hangi Sayfa ve Kaç kayıt geleceğinin kontrolü
    const page = request.input('page') || 1
    let perPage = request.input('perPage') || 5
    //Eğer perPage 100'den fazla gönderilmişsse 100'e çeviriyoruz
    perPage = (perPage > 100) ? 100 : perPage;
    let todos = await User.query().with('todos').orderBy('id', 'desc').paginate(page, perPage)
    return response.json(todos)
  }


  /**
   * Show a list of all todos.
   * GET todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  //Tüm Todoların Gösterimi
  async index({ request, response, view }) {
    //Hangi Sayfa ve Kaç kayıt geleceğinin kontrolü
    const page = request.input('page') || 1
    let perPage = request.input('perPage') || 5
    //Eğer perPage 100'den fazla gönderilmişsse 100'e çeviriyoruz
    perPage = (perPage > 100) ? 100 : perPage;

    let todos = await Todo.query().orderBy('id', 'desc').paginate(page, perPage)
    return response.json(todos)
  }

  /**
   * Render a form to be used for creating a new todo.
   * GET todos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new todo.
   * POST todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const user_id = request.input('user_id')
    const title = request.input('title')
    const body = request.input('body')
    const done = request.input('done')
    const todo = new Todo()
    todo.user_id = user_id
    todo.title = title
    todo.body = body
    todo.done = done
    await todo.save()
    return response.json(todo)
  }

  /**
   * Display a single todo.
   * GET todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing todo.
   * GET todos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update todo details.
   * PUT or PATCH todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  //Todo Güncelleme
  async update({ params, request, response }) {
    const user_id = request.input('user_id')
    const title = request.input('title')
    const body = request.input('body')
    const done = request.input('done')
    let todo = await Todo.find(params.id)
    todo.user_id = user_id
    todo.title = title
    todo.body = body
    todo.done = done
    await todo.save()
    return response.json(todo)
  }

  /**
   * Delete a todo with id.
   * DELETE todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  //Todo Silme
  async destroy({ params, request, response }) {

    const todo = await Todo.find(params.id)

    await todo.delete()

    return response.json({ message: 'Todo deleted!' })
  }
}

module.exports = TodoController
