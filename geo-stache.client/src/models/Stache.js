export class Stache {
    constructor(data) {
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.stacheName = data.stacheName
        this.description = data.description
        this.coverImg = data.coverImg
        this.badgeImage = data.badgeImage || this.coverImg
        this.location = data.location
        this.hint = data.hint
        this.latitude = data.latitude
        this.longitude = data.longitude
        this.badgeCount = data.badgeCount
    }
}