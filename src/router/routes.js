const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue')
      },
      {
        path: 'favoritos',
        name: 'favorites',
        component: () => import('@/pages/FavoritesPage.vue')
      },
      {
        path: 'categorias',
        name: 'categories',
        component: () => import('@/pages/CategoriesPage.vue')
      },
      {
        path: 'sobre',
        name: 'about',
        component: () => import('@/pages/AboutPage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue')
  }
]

export default routes
