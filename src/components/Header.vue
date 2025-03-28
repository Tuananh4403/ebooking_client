<template>
  <div class="topbar">
    <TopBar />
  </div>
  <div class="header sticky-bar">
    <div class="container">
      <div class="main-header">
        <div class="header-left">
          <div class="header-logo"></div>
          <div class="header-search">
            <div class="box-header-search">
              <form class="form-search" method="post" action="#">
                <div class="box-keysearch">
                  <input class="form-control font-xs" type="text" value="" placeholder="Tìm kiếm">
                </div>
              </form>
            </div>
          </div>
          <div class="header-nav">
            <div class="nav-main-menu d-none d-xl-block">
              <ul class="main-menu">
                <li class="has-children"><router-link class="active" to="/trang-chu">Trang chủ</router-link>
                </li>
                <li class="has-children"><router-link to="shop-grid.html">Đặt lịch</router-link>
                  <ul class="sub-menu two-col">
                    <li><router-link to="/list-room-empty">Danh sách phòng còn trống</router-link></li>
                    <li><router-link to="/list-booking">Phòng đã đặt</router-link></li>
                  </ul>
                </li>
                <li class="has-children"><router-link to="#">Thú cưng</router-link>
                  <ul class="sub-menu">
                    <li><router-link to="/pet">Thú cưng của tôi</router-link></li>
                  </ul>
                </li>
                <li class="has-children"><router-link to="shop-vendor-list.html">Thanh toán</router-link>
                  <ul class="sub-menu">
                    <li><router-link to="/history-transaction">Lịch sử giao dịch</router-link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="burger-icon burger-icon-white"><span class="burger-icon-top"></span><span
                class="burger-icon-mid"></span><span class="burger-icon-bottom"></span></div>
          </div>
          <div class="header-shop">
            <div class="d-inline-block box-dropdown-cart" @click="toggleDropdown">
              <font-awesome-icon :icon="['fas', 'user']" />
              {{ fullName }}
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
import TopBar from './TopBar.vue';
import { getUserFullName } from '@/utils/auth';
export default {
  components: {
    TopBar
  },
  data() {
    return {
      fullName: getUserFullName(),
      isDropdownVisible: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
  }
}
</script>
<style scoped>
.main-menu {
  margin-bottom: 0 !important;
}
</style>