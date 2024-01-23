import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { StacheSchema } from '../models/Stache.js';
import { LocationSchema } from '../models/Location.js';
import { CommentSchema } from '../models/Comment.js';
import { AdventureSchema } from '../models/Adventure.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Staches = mongoose.model('Stache', StacheSchema);
  Comments = mongoose.model('Comment', CommentSchema);
  Location = mongoose.model('location', LocationSchema);

  Adventures = mongoose.model('Adventure', AdventureSchema)

}

export const dbContext = new DbContext()
