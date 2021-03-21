import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export default class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .post('', this.createNote)
      .delete('/:id', this.delete)
  }

  async getById(req, res, next) {
    try {
      const note = await notesService.getById(req.params.id)
      res.send(note)
    } catch (err) {
      next(err)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.bug = req.params.id
      const note = await notesService.createNote(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.delete(req.params.id, req.body.creatorId)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
