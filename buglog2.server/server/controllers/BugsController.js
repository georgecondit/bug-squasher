import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { BadRequest } from '../utils/Errors'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .get('/:bugId/notes', this.getNotesByBugId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const bugs = await bugsService.getAll()
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const bug = await bugsService.create(req.body)
      // @ts-ignore
      bug.creator = req.userInfo
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const notes = await notesService.find({ bug: req.params.bugId })
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const bug = await bugsService.findById(req.params.id)
      return res.send(bug)
    } catch (err) {
      next(err)
    }
  }

  async edit(req, res, next) {
    try {
      delete req.body.closed
      const closedBug = await bugsService.findById(req.params.id)
      if (closedBug.closed) {
        throw new BadRequest('Bug Closed, no edititing allowed. Sorry!')
      }
      const bug = await bugsService.edit(req.params.id, req.body, req.userInfo.id)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const bug = await bugsService.delete(req.params.id)

      res.send(bug)
      throw new BadRequest("You aren't the owner.")
    } catch (err) {
      next(err)
    }
  }
}
