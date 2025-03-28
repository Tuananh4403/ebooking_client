<template>
  <div class="container-topbar">
    <div class="menu-topbar-left d-none d-xl-block">
    </div>
    <div class="info-topbar text-center d-none d-xl-block"></div>
    <div class="menu-topbar-right">
      <template v-if="isLoggedIn">
        <span class="font-xs color-brand-3 me-4">{{ fullName }}</span>
        <span class="font-xs color-brand-3 cursor-pointer" @click="logout">Đăng xuất</span>
      </template>
      <template v-else>
        <router-link class="font-xs color-brand-3" to="/login">Đăng nhập</router-link>
        <router-link class="font-xs color-brand-3 ms-4" to="/register">Đăng kí</router-link>
      </template>
    </div>
  </div>
</template>
<script>
import imgs from '../js/images'
import { getToken, getUserFullName, saveToken, saveUserId, saveUserFullName } from '@/utils/auth';
export default {
  data() {
    return {
      imgs,
      isLoggedIn: !!getToken()
    }
  },
  methods: {
    logout() {
      saveToken(null, null);
      saveUserId(null);
      saveUserFullName(null);
      this.isLoggedIn = false;
      this.fullName = '';
    }
  }
}
</script>