export class Adventure {
    constructor(data) {
        this.id = data.id
        this.stacheId = data.stacheId
        this.accountId = data.accountId
        this.profileImg = data.profile.picture
        this.stache = data.stache
        this.foundDate = data.foundDate ? new Date(data.foundDate) : ''
        this.todoDate = new Date(data.todoDate)
        this.status = data.status

        this.rating = data.rating


    }
}