export class Stache {
    constructor(data) {
        this.id = data.id
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.stacheName = data.stacheName
        this.difficulty = data.difficulty
        this.description = data.description
        this.coverImg = data.coverImg
        this.badgeImage = data.badgeImage || this.coverImg
        this.hint = data.hint
        this.badgeCount = data.badgeCount
        this.lat = data.location.coordinates ? data.location.coordinates[0] : null
        this.lng = data.location.coordinates ? data.location.coordinates[1] : null
        // NOTE this is used by (browser Navigator and is the intersection of the lat and lng. Location is a keyword, do not use by itself as a name.)
        this.stacheLocation= data.location
    }
}