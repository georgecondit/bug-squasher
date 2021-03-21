import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class BugsService {
  async getAll(query = {}) {
    const bugs = await dbContext.Bug.find(query)
    logger.log(bugs)
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

  async deleteBug(bugId, userId) {
    const closedBug = await dbContext.Bug.findOneAndUpdate({ id: bugId, userInfo: userId, closed: true })
    if (!closedBug) {
      throw new BadRequest('The creator needs to close this.')
    }

    return closedBug
  }
}

export const bugsService = new BugsService()
