import { Schema } from "mongoose";



export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    stacheId: { type: Schema.Types.ObjectId, required: true, ref: 'Stache' },
    body: { type: String, required: true },


}, { timestamps: true, toJSON: { virtuals: true } })


CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

CommentSchema.virtual('stache', {
    localField: 'stacheId',
    foreignField: 'stache',
    ref: 'Stache',
    justOne: true
})