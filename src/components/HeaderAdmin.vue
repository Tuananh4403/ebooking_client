<template>
  <nav class="navbar sticky-top shadow-sm custom-navbar">
    <div class="container-fluid px-4 d-flex justify-content-between align-items-center">
      <!-- Brand -->
      <div class="d-flex align-items-center gap-3">
        <img :src="logo" alt="Logo" class="logo-img" />
        <span class="brand-text">Pet Homestay</span>
      </div>

      <!-- Page Title -->
      <div class="page-title d-none d-md-block">Trang chủ</div>

      <!-- User Info -->
      <div class="d-flex align-items-center gap-3">
        <i class="fas fa-user-circle fs-4 text-white"></i>
        <span class="fw-medium " style="color: #4b3f2f">{{ fullName }}</span>
        <i class="fas fa-ellipsis-v fs-5 text-white cursor-pointer" @click="toggleMenu"></i>
      </div>
    </div>
  </nav>

  <div v-if="showMenu" class="modal" @click="toggleMenu">
    <div class="modal-content" @click.stop>
      <span class="close" @click="toggleMenu">×</span>
      <p><strong>Full Name:</strong> {{ fullName }}</p>
      <p><strong>Total Money in Wallet:</strong> {{ totalMoney }}</p>
    </div>
  </div>
</template>

<script>
import logo from '../../public/assets/imgs/logo.png'
import { getUserFullName } from '@/utils/auth';

export default {
  name: 'NavigationBar',
  data() {
    return {
      logo,
      showMenu: false,
      fullName: getUserFullName(),
      totalMoney: '1000 VND'
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style scoped>
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0; /* align with sidebar */
  right: 0;
  height: 60px;
  background-color: #fcebd5;
  color: #4b3f2f;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1050;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}


.logo-img {
  height: 50px;
}

.brand-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: #4b3f2f;
}

.page-title {
  font-size: 1.3rem;
  color: #4b3f2f;
  font-weight: 500;
}

.cursor-pointer {
  cursor: pointer;
}

/* Modal styling */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1060;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #4b3f2f;
  padding: 2rem;
  border-radius: 0.5rem;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
