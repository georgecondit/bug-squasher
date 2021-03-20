
export class Note {
  constructor(data) {
    this.id = data.id || data._id
    this.description = data.description
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.date = data.date
  }
}
