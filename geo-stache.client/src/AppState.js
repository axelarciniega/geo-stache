import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},



  // using the more specific annotation can help catch type - related errors and provide better code documentation.

  // PROFILES
  // NOTE due to the inheritance in the Profile/Account model are using .Account in this JSDoc annotation because there may be an instance when we want to be able to access to the Account level, and not just the properties defined on the Profile.
  /** @type {import('./models/Account.js').Account} */
  profile: {},

  /**@type {Profile[]} */
  activeProfile: [],


  // STACHES
  /**@type {Stache []} */
  staches: [],

  map: null,

  /**@type {Stache} */
  activeStache: {},

    /**@type {Stache[]} */
  myStaches: [],

  // ADVENTURES / aka Badges
  /**@type {import('./models/Adventure.js').Adventure[]} */
  adventures: [],

  /**@type {Adventure[]} */
  myAdventures: [],

  /**@type {Adventure[]} */
  activeStacheAdventures: [],

    /**@type {Stache[]} */
  activeProfileStaches: [],

  /**@type {Adventure[]} */
  activeProfileAdventures: [],


  // COMMENTS
  // NOTE uncomment if needed
  /**@type {Comment[]} */
  comments: [],

  /**type @type {Comment[]} */
  stacheComments: [],




})
