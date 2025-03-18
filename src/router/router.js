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
const router = createRouter({
  history: createWebHistory('/'),
  routes
})
// router.beforeEach(async (to, from, next) => {
//   const token = getToken();

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // Check if the user is authenticated
//     if (!store.getters.isAuthenticated) {
//       next({ name: 'HomePage' });
//       return;
//     }

//     // Check if the token has expired
//     if (isTokenExpired(token.accessToken)) {
//       try {
//         await store.dispatch('refreshAccessToken');
//         const newToken = getToken();

//         if (isTokenExpired(newToken.refreshToken)) {
//           store.dispatch('logout');
//           next({ name: 'HomePage' });
//           return;
//         }
//       } catch (error) {
//         console.error('Error refreshing token:', error);
//         store.dispatch('logout');
//         next({ name: 'HomePage' });
//         return;
//       }
//     }

//     // Role authorization check
//     const requiredRoles = to.meta.role;
//     const userRoles = store.getters.userRole;
//     if (requiredRoles && !requiredRoles.some((role) => role.includes(userRoles))) {
//       next({ name: 'HomePage' });
//       return;
//     }
//   }

//   next();
// });

export default router
