'use strict'

const Todo = use('App/Models/Todo');
const User = use('App/Models/User');
class TodoController {
  //User'a Ait Todoların Gösterimi
  async all({ request, response, view }) {
    //Hangi Sayfa ve Kaç kayıt geleceğinin kontrolü
    const page = request.input('page') || 1
    let perPage = request.input('perPage') || 5
    //Eğer perPage 100'den fazla gönderilmişsse 100'e çeviriyoruz
    perPage = (perPage > 100 ) ? 100 : perPage;
    let todos = await User.query().with('todos').orderBy('id', 'desc').paginate(page,perPage)
    return response.json(todos)
  }
  //Tüm Todoların Gösterimi
  async index({ request, response, view }) {
    //Hangi Sayfa ve Kaç kayıt geleceğinin kontrolü
    const page = request.input('page') || 1
    let perPage = request.input('perPage') || 5
    //Eğer perPage 100'den fazla gönderilmişsse 100'e çeviriyoruz
    perPage = (perPage > 100 ) ? 100 : perPage;

    let todos = await Todo.query().orderBy('id', 'desc').paginate(page,perPage)
    return response.json(todos)
  }
  //Todo Ekleme
  async save({ request, response }) {

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
  //Todo Silme
  async destroy({ params, request, response }) {
    await Todo.find(params.id).delete()
    return response.json({ message: 'Todo deleted!' })
  }
}

module.exports = TodoController
