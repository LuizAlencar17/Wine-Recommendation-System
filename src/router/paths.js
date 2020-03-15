/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/',
    name: 'All The Products',
    view: 'Products'
  },
  {
    path: '/Login',
    name: 'Login',
    view: 'Login'
  },
  {
    path: '/CollaborativerRecommendations',
    name: 'Collaborativer Recommendations',
    view: 'CollaborativerRecommendations'
  },
  {
    path: '/ContentRecommendations',
    name: 'Content Recommendations',
    view: 'ContentRecommendations'
  },
]
