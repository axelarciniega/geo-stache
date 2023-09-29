import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    bio: { type: String, required: true },
    badgeCount: [{ type: String, unique: true }],
    location: {
      type: { type: String, enum: ['Point'], required: true, default: "Point" },
      coordinates: { type: [Number], required: true }
    },

  },
  { timestamps: true, toJSON: { virtuals: true } }
);

AccountSchema.index({ location: '2dsphere' });


