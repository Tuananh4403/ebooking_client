import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import Pet from '@/components/pet/Index.vue'
import ListRoomEmpty from '@/components/booking/Index.vue'
import ListBooking from '@/components/booking/ListBooking.vue'
import AdminPage from "@/pages/AdminPage.vue";
import dashboard from "@/components/admin/dashboard.vue";
import listBarn from "@/components/admin/component/list-barn.vue";
import listLocation from "@/components/admin/component/list-location.vue";
import listCamera from "@/components/admin/component/list-camera.vue";
import ListService from "@/components/admin/component/list-service.vue";
import ListBookingOrder from "@/components/admin/component/list-booking-order.vue"
import HistoryTransaction from "@/components/customer/history-page.vue"
const route = [
  {
    path: "/",
    component: HomePage,
    meta: { role: "customer" },
    children: [
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
      {
        path: '/history-transaction',
        name: 'HistoryTransaction',
        component: HistoryTransaction
      },
    ],
  },
  {
    path: "/admin",
    component: AdminPage,
    // meta: { role: "admin" },
    children: [
      {
        path: "danh-sach-chuong",
        component: listBarn,
      },
      {
        path: "danh-sach-vi-tri",
        component: listLocation,
      },
      {
        path: "danh-sach-camera",
        component: listCamera,
      },
      {
        path: "danh-sach-dich-vu",
        component: ListService,
      },
      {
        path: "danh-sach-don-hang",
        component: ListBookingOrder,
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: route
})
// const router = createRouter({
//   history: createWebHistory('/'),
//   routes
// })
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
