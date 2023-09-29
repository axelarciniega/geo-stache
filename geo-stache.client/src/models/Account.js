export class Account {

  // Update the Account Model in the server
  // Look at Network using Inheritance for a Profile in the front-end

  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // this.badgeCount = data.badgeCount
    // this.stacheToDo = data.stacheToDo
    this.location = data.location
    // this.lat = data.location.coordinates[0]
    // this.lng = data.location.coordinates[1]
  }
}
