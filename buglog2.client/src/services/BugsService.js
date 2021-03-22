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
      logger.log(res.data)
      notesService.getNotesByBugId(bugId)
    } catch (err) {
      logger.error(err)
    }
  }

  // async getCreator(bug) {
  //   try {
  //     const res = await api.get('api/bugs/' + bug.id)
  //     bug.creator = res.data.creator.name
  //   } catch (error) {
  //     logger.error(error)
  //   }
  // }

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
      await api.put('api/bugs/' + bugData._id, bugData)
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

  getBugDate(id) {
    const bug = AppState.bugs.find(b => b.id === id)
    if (bug) {
      const date = bug.createdAt
      const updatedDate = new Date(date)
      const year = updatedDate.getFullYear()
      const month = (this.fixLowNumber(updatedDate.getMonth() + 1))
      const day = this.fixLowNumber(updatedDate.getDate())
      const hour = this.fixLowNumber(updatedDate.getHours())
      const minute = this.fixLowNumber(updatedDate.getMinutes())
      const newDate = `${hour}:${minute} ${day}-${month}-${year}`
      return newDate
    }

    return 0
  }

  fixLowNumber(n) {
    return (n < 10 ? '0' : '') + n
  }
}
export const bugsService = new BugsService()
