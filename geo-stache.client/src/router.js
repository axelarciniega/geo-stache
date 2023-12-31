import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/map',
    name: 'Nav Map',
    component: loadPage('MapPage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  // NOTE this is vue router..changed to profileId from accountId
  {
    path: '/profiles/:profileId',
    name: 'Profile',
    component: loadPage('ProfilePage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: loadPage('FAQPage'),

  },
  {
    path: '/WhyGeoStache',
    name: 'Why',
    component: loadPage('WhyGeoStachePage'),

  },

  {
    path: '/staches/:stacheId',
    name: 'Stache Details',
    component: loadPage('StacheDetailsPage'),
    // beforeEnter: authGuard
  },
  {
    path: '/mapping',
    name: 'Map',
    component: loadPage('MappingPage')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
