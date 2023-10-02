import { Schema } from "mongoose"



export const StacheSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    stacheName: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: [1, 2, 3, 4, 5] },
    badgeImage: { type: String, },
    coverImage: { type: String, },
    // Team decided tags will be feature rich stage
    // tag: { type: String, required: true },
    hint: { type: String, required: true },
    //found goes on the badge schema
    // found: { type: Boolean, required: true, default: false },
    location: {
        type: { type: String, enum: ['Point'], required: true, default: "Point" },
        coordinates: { type: [Number], required: true }
    },



    // NOTE uncomment this when needed
    // cord: {type: navigator.geolocation.getCurrentPosition}

}, { timestamps: true, toJSON: { virtuals: true } }
);

StacheSchema.index({ location: '2dsphere' });


StacheSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

StacheSchema.virtual('foundCount', {
    localField: '_id',
    foreignField: 'found',
    ref: 'Adventure',
    count: true
})
StacheSchema.virtual('todoCount', {
    localField: '_id',
    foreignField: 'found',
    ref: 'Adventure',
    count: true
})




// StacheSchema.virtual('location', {
//     localField: 'locationId',
//     foreignField: '_id',
//     ref: 'Location',
//     justOne: true
// }
// )
