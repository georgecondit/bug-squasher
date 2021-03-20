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

  async edit(bugId, creatorId, bugData) {
    if (!dbContext.Bug.findById(bugId).closed) {
      const bug = await dbContext.Bug.findOneAndUpdate({ _id: bugId, creatorId: creatorId }, bugData, { new: true })
      return bug
    } else {
      throw new BadRequest('Sorry, you cannot do thit if you are not the creator')
    }
  }
}

export const bugsService = new BugsService()
