import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Note } from '../Models/Note'

class NotesService {
  async getAllNotes() {
    try {
      const res = await api.get('api/notes')
      AppState.notes = res.data.map(l => new Note(l))
    } catch (error) {
      logger.log(error)
    }
  }

  async getActiveNotes(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async create(noteData) {
    try {
      const res = await api.post('api/notes', noteData)
      AppState.notes.push(res.data)
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }

  async delete(noteId) {
    const res = window.confirm('Are you sure you want to delete your note?')
    if (!res) {
      return
    }
    try {
      const bug = AppState.bug
      await api.delete('/api/notes/' + noteId)
      this.getNotes(bug._id)
    } catch (err) {
      logger.error(err)
    }
  }
}
export const notesService = new NotesService()
