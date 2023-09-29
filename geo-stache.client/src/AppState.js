import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {Stache []} */
  staches: [],

  /**@type {Stache} */
  activeStache: [],

  /**@type {Stache[]} */
  myBadges: [],


  /**@type {Stache[]} */
  activeStacheBadgess: [],

  /**@type {Comment[]} */
  comments: [],

  /**@type {Comment} */
  activeComment: null,

  /**type @type {Comment[]} */
  activeStacheComments: [],




})
