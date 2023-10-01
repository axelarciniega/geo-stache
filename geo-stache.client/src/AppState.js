import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},


  // PROFILES
  /** @type {import('./models/Account.js').Profile} */
  profile: {},

  /**@type {Profile[]} */
  activeProfile: [],


  // STACHES
  /**@type {Stache []} */
  staches: [],

  /**@type {Stache[]} */
  activeStache: [],


  // ADVENTURES / aka Badges
  /**@type {Adventure []} */
  adventures: [],

  /**@type {Adventure[]} */
  myAdventures: [],

  /**@type {Adventure[]} */
  activeStacheAdventures: [],

  /**@type {Adventure[]} */
  activeProfileAdventures: [],


  // COMMENTS
  // NOTE uncomment if needed
  /**@type {Comment[]} */
  comments: [],

  /**type @type {Comment[]} */
  stacheComments: [],




})
