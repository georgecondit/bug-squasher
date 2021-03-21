import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class NotesService {
  async getNotes(bugId, creatorId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes/' + creatorId)
      AppState.notes = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async createNote(noteData) {
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
