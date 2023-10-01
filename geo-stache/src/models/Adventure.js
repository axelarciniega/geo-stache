import { Schema } from "mongoose"



export const AdventureSchema = new Schema({
    stacheId: { type: Schema.Types.ObjectId, required: true, ref: 'Stache' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    foundDate: { type: Date, required: true },
    todoDate: { type: Date, required: true },
    status: { type: String, enum: ['todo', 'completed'], required: true },
    rating: { type: String, enum: [1, 2, 3, 4, 5] },
    badgeImage: { type: String }

}, { timestamps: true, toJSON: { virtuals: true } })


AdventureSchema.virtual('stache', {
    localField: 'stacheId',
    foreignField: '_id',
    ref: 'Stache',
    justOne: true
})


AdventureSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})
