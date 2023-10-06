export class Adventure {
    constructor(data) {
        this.id = data.id
        this.stacheId = data.stacheId
        this.accountId = data.accountId
        this.profile = data.profile
        this.profileImg = data.profile.picture
        this.stache = data.stache
        this.foundDate = data.foundDate ? new Date(data.foundDate) : ''
        this.todoDate = new Date(data.todoDate)
        this.status = data.status

        this.rating = data.rating
        if (this.foundDate instanceof Date) {
            const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
            this.foundDate = this.foundDate.toLocaleDateString('en-US', options);
        } else {
            this.foundDate = '';
        }
    }
}
