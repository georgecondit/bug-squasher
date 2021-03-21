import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async fing(query = {}) {
    const notes = await dbContext.Note.find(query)
    return notes
  }

  async getById(id) {
    const note = await dbContext.Note.findById(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async createNote(noteData) {
    const note = dbContext.Note.create(noteData)
    return note
  }

  async deleteNote(noteId, creatorId) {
    if (creatorId === dbContext.Note.findById(noteId).creatorId) {
      const note = await dbContext.Note.findByIdAndDelete(noteId)
      return note
    } else {
      throw new BadRequest('Sorry, you did not create this notes.')
    }
  }
}

export const notesService = new NotesService()
