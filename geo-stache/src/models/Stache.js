import { Schema } from "mongoose"



export const StacheSchema = new Schema({
    creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    difficulty: {type: String, enum: [1,2,3,4,5]},
    badgeImage: {type: String, },
    coverImage: {type: String, required: true },
    tag: {type: String, required: true},
    hint: {type: String, required: true},
    // TODO uncomment this when needed
    // cord: {type: navigator.geolocation.getCurrentPosition}


}, {timestamps: true, toJSON:{virtuals: true}})


StacheSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})


// NOTE Will get to this when we need it?
// StacheSchema.virtual('badgeCount', {
//     localField: '_id',
//     foreignField: '',
//     ref: '',
//     count: true
// })