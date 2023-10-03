// ✅ DONE: Update the Account Model in the server as needed
// ✅ DONE: create TODO Model for stache list? Like the Tickets Model
// ✅ DONE: create profile model and move over added properties.
// Look at Network using Inheritance for a Profile in the front-end
// NOTE USER LOGGED IN, PROFILE IS EVERYONE ELSE. KEEP LOCATION PRIVATE.
// NOTE ENSURE YOU HAVE BOTH ACCOUNT PAGE AND PROFILE PAGE. KEEP THEM ENCAPSULATED AND SEPARATE. WILL NEED ABILITY TO EDIT BOTH.
// NOTE Inheritance/Polymorphism: The model is is started in the Profile and the Account extends it. Account inherits from the Profile.

export class Profile{
  constructor(data) {
    this.profileId = data.profileId
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.badgeCount = data.badgeCount ? data.badgeCount: null
    this.todoCount = data.todoCount ? data.todoCount : null
  }
}


export class Account extends Profile {
  constructor(data) {
    super(data)
    this.email = data.email
    this.location = data.location
    // NOTE keep null check. reference stache schema
    // this.lat = data.location.coordinates ? data.location.coordinates[0] : null
    // this.lng = data.location.coordinates ? data.location.coordinates[1] : null
  }
}

