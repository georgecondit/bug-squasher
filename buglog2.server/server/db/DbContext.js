import mongoose from 'mongoose'
import BugSchema from '../models/Bug'
import NoteSchema from '../models/Note'
import AccountSchema from '../models/Account'

class DbContext {
  Bug = mongoose.model('Bug', BugSchema);
  Note = mongoose.model('Note', NoteSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
