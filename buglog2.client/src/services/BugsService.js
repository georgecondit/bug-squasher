import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { notesService } from './NotesService'
import { Bug } from '../Models/Bug'

class BugsService {
  async getAll() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data.map(b => new Bug(b))
    } catch (error) {
      logger.log(error)
    }
  }

  async getById(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId)
      AppState.bug = res.data
      // logger.log(res.data)
      notesService.getNotesByBugId(bugId)
    } catch (err) {
      logger.error(err)
    }
  }

  async create(bugData) {
    try {
      delete bugData.id
      const res = await api.post('api/bugs', bugData)
      AppState.bugs.push(res.data)
      return res.data._id
    } catch (error) {
      logger.error(error)
    }
  }

  async editBug(bugData) {
    try {
      const res = await api.put('api/bugs/' + bugData._id, bugData)
      this.getById(res.data._id)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteBug(id) {
    const res = window.confirm('Did you want to squash that bug?')
    if (!res) {
      return
    }
    try {
      await api.delete('/api/bugs/' + id)
      this.getById(id)
    } catch (err) {
      logger.error(err)
    }
  }

  async toggleLiveBugs(toggle) {
    if (toggle) {
      const res = await api.get('api/bugs/')
      AppState.bugs = res.data.map(b => new Bug(b))
    } else {
      AppState.bugs = AppState.bugs.filter(b => b.closed !== true)
    }
  }
}
export const bugsService = new BugsService()
