import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'
class NotesService {
  async find(query = {}) {
    const notes = await dbContext.Note.find(query).populate('creator', 'name picture email')
    return notes
  }

  async findById(id) {
    const note = await dbContext.Note.findById(id).populate('creator', 'name picture email')
    if (!note) {
      throw new BadRequest('Not a valid Id')
    }
    return note
  }

  async create(rawNote) {
    const note = dbContext.Note.create(rawNote)
    logger.log(note)
    return note
  }

  async edit(id, update) {
    const note = await this.findById(id)
    if (note.creatorId !== update.creatorId) {
      throw new BadRequest("This isn't your note, so you can't edit it. Sorry.")
    }
    return await dbContext.Note.findByIdAndUpdate(id, { body: update.body }, { new: true })
  }

  async delete(id, creatorId) {
    const res = await dbContext.Note.findOneAndDelete({ _id: id, creatorId: creatorId })
    return res
  }
}

export const notesService = new NotesService()
