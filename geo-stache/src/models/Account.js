import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // do NOT make required
    bio: { type: String },
    badgeCount: { type: Number, default: 0 },
    // do NOT make required
    location: {
      type: { type: String, enum: ['Point'], default: "Point" },
      coordinates: { type: [Number] }
    },
    needsTour: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

AccountSchema.index({ location: '2dsphere' });

AccountSchema.virtual('adventures', {
  ref: 'Adventure',
  localField: '_id',
  foreignField: 'adventureId',
  justOne: false,
  match: { status: 'completed' },
});


