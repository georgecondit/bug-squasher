import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAll() {
    const bugs = await dbContext.Bug.find({})
    return bugs
  }

  async getById(id) {
    const bug = await dbContext.Bug.findById(id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(bugData) {
    const bug = await dbContext.Bug.create(bugData)
    return bug
  }
}

export const bugsService = new BugsService()
