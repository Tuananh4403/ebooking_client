import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import Pet from '@/components/pet/Index.vue'
import ListRoomEmpty from '@/components/booking/Index.vue'
import ListBooking from '@/components/booking/ListBooking.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/pet',
      name: 'Pet',
      component: Pet
    },
    {
      path: '/list-room-empty',
      name: 'ListRoomEmpty',
      component: ListRoomEmpty
    },
    {
      path: '/list-booking',
      name: 'ListBooking',
      component: ListBooking
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
