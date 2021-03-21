
export class Note {
  constructor(data) {
    this.id = data.id || data._id
    this.body = data.body || 'Did you mean to leave your note empty'
    this.creator = data.creator
    this.creatorId = data.creatorId || ''
    this.date = data.date
  }
}
