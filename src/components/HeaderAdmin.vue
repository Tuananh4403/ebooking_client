<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-light">
    <div class="container-fluid">
      <div class="navbar-brand d-flex align-items-center col-3">
        <img :src="logo" alt="Logo" class="logo-img" />
        <span class="brand-text">Pet Homestay</span>
      </div>
      <div class="col-5"></div>
      <div class="col-2 d-flex align-items-center justify-content-center">
        <a class="nav-link" href="/admin">Trang chủ</a>
      </div>
      <div class="col-2 d-flex align-items-center justify-content-end">
        <i class="fas fa-user user-icon"></i>
        <span class="user-name ms-2">{{ fullName }}</span>
        <i class="fas fa-list ms-2" @click="toggleMenu"></i>
      </div>
    </div>
  </nav>

  <div v-if="showMenu" class="modal" @click="toggleMenu">
    <div class="modal-content" @click.stop>
      <span class="close" @click="toggleMenu">×</span>
      <p>Full Name: {{ fullName }}</p>
      <p>Total Money in Wallet: {{ totalMoney }}</p>
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
.navbar {
  padding: 5px;
  background-color: #fcf7e8 !important;
}

.logo-img {
  height: 80px;
}

.brand-text {
  font-size: 1.5rem;
  color: #5c4244;
}

.nav-link {
  font-size: 1.5rem;
}

.user-icon,
.fa-list {
  font-size: 1.5rem;
  cursor: pointer;
}

.user-name {
  font-size: 1.5rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: rgb(161, 158, 158);
  padding: 2rem;
  border-radius: 5px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
