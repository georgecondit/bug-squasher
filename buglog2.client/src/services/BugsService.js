import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { notesService } from './NotesService'
import { Bug } from '../Models/Bug'

class BugsService {
  async getAll() {
    try {
      const res = await api.get('api/bugs')
      // AppState.boards = res.data

      AppState.bugs = res.data.map(b => new Bug(b))
    } catch (error) {
      logger.log(error)
    }
  }

  async getBugsByUser(userId) {
    const bugs = []
    for (let i = 0; i < AppState.bugs.length; i++) {
      if (AppState.bugs[i].creatorId === userId) {
        bugs.push(AppState.bugs[i])
      }
    }
    return bugs
  }

  async getBugById(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId)
      AppState.bug = res.data
      logger.log(res.data)
      notesService.getNotes(bugId)
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
    } catch (err) {
      logger.error(err)
    }
  }

  async editBug(bugData) {
    try {
      await api.put('api/bugs/' + bugData._id, bugData)
    } catch (err) {
      logger.error(err)
    }
  }

  async deleteBug(bugId) {
    const res = window.confirm('Did you want to squash that bug?')
    if (!res) {
      return
    }
    try {
      await api.delete('/api/bugs/' + bugId)
      this.getAllBugs()
    } catch (err) {
      logger.error(err)
    }
  }

  getBugDate(id) {
    const bug = AppState.bugs.find(b => b.id === id)
    if (bug) {
      const bugDate = bug.createdAt
      const updatedDate = new Date(bugDate)
      const year = updatedDate.getFullYear()
      const month = (this.fixLowNumber(updatedDate.getMonth() + 1))
      const day = this.fixLowNumber(updatedDate.getDate())
      const hour = this.fixLowNumber(updatedDate.getHours())
      const minute = this.fixLowNumber(updatedDate.getMinutes())
      const newDate = `${month}-${day}-${year} ${hour}:${minute}`
      return newDate
    }

    return 0
  }

  fixLowNumber(n) {
    return (n < 10 ? '0' : '') + n
  }
}
export const bugsService = new BugsService()
