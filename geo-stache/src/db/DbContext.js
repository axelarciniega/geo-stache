import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { StacheSchema } from '../models/Stache.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Staches = mongoose.model('Stache', StacheSchema)

}

export const dbContext = new DbContext()
