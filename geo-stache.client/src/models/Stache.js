export class Stache {
    constructor(data) {
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.stacheName = data.stacheName
        this.difficulty = data.difficulty
        this.description = data.description
        this.coverImg = data.coverImg
        this.badgeImage = data.badgeImage || this.coverImg
        this.hint = data.hint
        this.badgeCount = data.badgeCount


        // NOTE not sure at this point what we need for location
        this.location = data.location
        this.lat = data.location.coordinates[0]
        this.lng = data.location.coordinates[1]
    }
}