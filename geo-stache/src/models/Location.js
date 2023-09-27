import { Schema } from "mongoose";

export const LocationSchema = new Schema({
    name: { type: String, default: '' },

    location: {
        type: { type: String, enum: ['Point'], required: true, default: "Point" },
        coordinates: { type: [Number], required: true }
    },
    // creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" }




}, { timestamps: true, toJSON: { virtuals: true } })

LocationSchema.virtual('creator', {
    localField: "creatorId"
})



