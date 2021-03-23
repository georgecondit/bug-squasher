export class Bug {
  constructor(data) {
    this.id = data.id || data._id
    this.title = data.title || 'Bug'
    this.description = data.description
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt || ''
    this.closedDate = data.closedDate
    this.closed = data.closed
    this.updatedAt = data.updatedAt
  }
}
