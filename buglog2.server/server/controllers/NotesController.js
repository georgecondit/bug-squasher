import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .put('/:id', this.edit)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const notes = await notesService.find()
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const note = await notesService.findById(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const note = await notesService.create(req.body)
      // @ts-ignore says it doesn't exist, but clearly it does. Linter?
      note.creator = req.userInfo
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const note = await notesService.edit(req.params.id, req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const note = await notesService.delete(req.params.id)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
