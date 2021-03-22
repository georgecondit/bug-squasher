import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async find(query = {}) {
    const notes = await dbContext.Note.find(query)
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
    // NOTE SHout out to D$ for the rawNote!
    const note = dbContext.Note.create(rawNote)
    return note
  }

  async edit(id, update) {
    const note = await this.findById(id)
    if (note.creatorId !== update.creatorId) {
      throw new BadRequest("This isn't your note, so you can't edit it. Sorry.")
    }
    return await dbContext.Note.findByIdAndUpdate(id, { body: update.body }, { new: true })
  }

  async delete(id) {
    const res = await dbContext.Note.findByIdAndDelete(id)
    return res
  }
}

export const notesService = new NotesService()
