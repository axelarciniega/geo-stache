export class Comment {
    constructor(data) {
        this.id = data.id
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.stacheId = data.stacheId
        this.body = data.body
    }
}