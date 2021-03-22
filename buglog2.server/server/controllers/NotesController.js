import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export default class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getNoteById)
      .get('/:bugId/notes/:noteId', this.getAllNotesById)
      .post('', this.createNote)
      .delete('/:id', this.delete)
  }

  async getAllNotesById(req, res, next) {
    try {
      const notes = await notesService.getAll()
      return notes
    } catch (error) {
      next(error)
    }
  }

  async getNoteById(req, res, next) {
    try {
      const note = await notesService.getById(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
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
      const note = await notesService.deleteNote(req.params.id, req.body.creatorId)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
