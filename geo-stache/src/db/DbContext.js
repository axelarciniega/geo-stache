import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { StacheSchema } from '../models/Stache.js';
import { LocationSchema } from '../models/Location.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Staches = mongoose.model('Stache', StacheSchema);
  Location = mongoose.model('location', LocationSchema);

}

export const dbContext = new DbContext()
