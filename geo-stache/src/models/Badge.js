import { Schema } from "mongoose"



export const BadgeSchema = new Schema({
stacheId: {type: Schema.Types.ObjectId, required: true, ref: 'Stache'},
accountId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
foundDate: {type: Date, required: true},
status: {type: String, enum: ['started','completed']},
rating: {type: String, enum: [1,2,3,4,5]}
}, {timestamps:true, toJSON: {virtuals:true}})


BadgeSchema.virtual('stache', {
    localField: 'stacheId',
    foreignField: '_id',
    ref: 'Stache',
    justOne:true
})


BadgeSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})