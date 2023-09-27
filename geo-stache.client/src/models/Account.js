export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.badgeCount = data.badgeCount
  }
}
