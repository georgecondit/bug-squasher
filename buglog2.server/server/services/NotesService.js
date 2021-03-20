import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotebyBug(query) {
    const notes = await dbContext.Note.findById(query)
    return notes
  }

  async createNote(noteData) {
    const note = dbContext.Note.create(noteData)
    return note
  }

  async delete(noteId, creatorId) {
    if (creatorId === dbContext.Note.findById(noteId).creatorId) {
      const note = await dbContext.Note.findByIdAndDelete(noteId)
      return note
    } else {
      throw new BadRequest('Sorry, you did not create this notes.')
    }
  }
}

export const notesService = new NotesService()
