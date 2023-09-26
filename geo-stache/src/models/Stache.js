import { Schema } from "mongoose"



export const StacheSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
    difficulty: {type: String, enum: [1,2,3,4,5]},
    badgeImage: {type: String, },
    coverImage: {type: String, required: true },
    tag: {type: String, required: true},
    hint: {type: String, required: true},
    cord: {type: navigator}


}, {timestamps: true, toJSON:{virtuals: true}})


StacheSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})


// NOTE Will get to this when we need it?
// StacheSchema.virtual('badeCount', {
//     localField: '_id',
//     foreignField: '',
//     ref: '',
//     count: true
// })