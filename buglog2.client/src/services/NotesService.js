import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Note } from '../Models/Note'

class NotesService {
  // async getNotes() {
  //   try {
  //     const res = await api.get('api/notes')
  //     AppState.notes = res.data
  //   } catch (err) {
  //     logger.error(err)
  //   }
  // }

  async getNotesByBugId(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data.map(n => new Note(n))
    } catch (error) {
      logger.error(error)
    }
  }

  async createNote(noteData) {
    try {
      delete noteData.id
      const res = await api.post('api/notes', noteData)
      AppState.notes.push(res.data)
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }

  async delete(note) {
    const res = window.confirm('Are you sure you want to delete your note?')
    if (!res) {
      return
    }
    try {
      await api.delete('/api/notes/' + note.id)
      AppState.notes.splice(AppState.notes.indexOf(note), 1)
    } catch (err) {
      logger.error(err)
    }
  }
}
export const notesService = new NotesService()
