<template>
  <div class="container-topbar">
    <div class="menu-topbar-left d-none d-xl-block">
    </div>
    <div class="info-topbar text-center d-none d-xl-block"></div>
    <div class="menu-topbar-right">
      <router-link class="font-xs color-brand-3" to="/login">Đăng nhập</router-link>
      <router-link class="font-xs color-brand-3 ms-4" to="/register">Đăng kí</router-link>
    </div>
  </div>
</template>
<script>
import imgs from '../js/images'
export default {
  data(){
    return {
      imgs
    }
  }
}
</script>