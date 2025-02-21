import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    // {
    //   path: '/customer',
    //   meta: { requiresAuth: true, role: ['Customer'] },
    //   children: [
    //     {
    //       path: 'updatePet',
    //       name: 'updatePet',
    //       component: UpdatePet
    //     },
    //   ]
    // },
  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.isAuthenticated) {
//       next({ name: 'Login' }); 
//     } else {
//       const userRoles = store.getters.roles;
//       const requiredRoles = to.meta.roles;
//       if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
//         next({ name: 'Home' }); 
//       } else {
//         next();
//       }
//     }
//   } else {
//     next();
//   }
// });
export default router
