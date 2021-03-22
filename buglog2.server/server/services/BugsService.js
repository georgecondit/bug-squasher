import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class BugsService {
  async getAll(query = {}) {
    const bugs = await dbContext.Bug.find(query).populate('creator', 'name picture email')
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bug.findById(id).populate('creator', 'name picture email')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(bugData) {
    const bug = await dbContext.Bug.create(bugData)
    return bug
  }

  async edit(id, update, userId) {
    const bug = await this.findById(id)
    if (bug.creatorId !== userId) {
      throw new BadRequest("You don't have permission to edit this.")
    }
    const bugEdit = await this.findById(id)
    logger.log(bugEdit.closed)
    if (!bugEdit.closed) {
      const closedBug = await dbContext.Bug.findOneAndUpdate({ _id: id, closed: false }, { title: update.title, description: update.description }, { new: true })
      return closedBug
    } else {
      throw new BadRequest('This bug has been closed already. Thanks!')
    }
  }

  async delete(id) {
    const closedBug = await dbContext.Bug.findOneAndUpdate({ _id: id }, { closed: true }, { new: true })
    return closedBug
  }
}

export const bugsService = new BugsService()
