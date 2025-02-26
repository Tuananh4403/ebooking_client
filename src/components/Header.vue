<template>
  <div class="topbar">
    <TopBar />
  </div>
  <div class="header sticky-bar">
    <div class="container">
      <div class="main-header">
        <div class="header-left">
          <div class="header-logo"><a class="d-flex" href="index.html"><img alt="Ecom"
                :src="imgs.logo"></a></div>
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
                <li class="has-children"><router-link class="active" to="/">Trang chủ</router-link>
                </li>
                <li class="has-children"><router-link to="shop-grid.html">Đặt lịch</router-link>
                  <ul class="sub-menu two-col">
                    <li><router-link to="shop-grid.html">Danh sách phòng còn trống</router-link></li>
                    <li><router-link to="shop-grid-2.html">Phòng đã đặt</router-link></li>
                  </ul>
                </li>
                <li class="has-children"><router-link to="shop-vendor-list.html">Thanh toán</router-link>
                  <ul class="sub-menu">
                    <li><router-link to="shop-vendor-list.html">Lịch sử giao dịch</router-link></li>
                  </ul>
                </li>
                <li class="has-children"><router-link to="#">Thú cưng</router-link>
                  <ul class="sub-menu">
                    <li><router-link to="page-about-us.html">Thú cưng của bạn</router-link></li>
                    <li><router-link to="page-contact.html">Theo dõi thú cưng</router-link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="burger-icon burger-icon-white"><span class="burger-icon-top"></span><span
                class="burger-icon-mid"></span><span class="burger-icon-bottom"></span></div>
          </div>
          <div class="header-shop">
            <div class="d-inline-block box-dropdown-cart">
              <!-- <span
                class="font-lg icon-list icon-account">
              </span> -->
              <font-awesome-icon :icon="['fas', 'user']" />
              <div class="dropdown-account">
                <ul>
                  <li><router-link to="page-account.html">Tài khoản của tôi</router-link></li>
                  <li><router-link to="page-account.html">Cài đặt tài khoản</router-link></li>
                  <li><router-link to="page-login.html">Đăng xuất</router-link></li>
                </ul>
              </div>
            </div><a class="font-lg icon-list icon-wishlist" to="shop-wishlist.html"><span
                class="number-item font-xs">5</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from './TopBar.vue';
import imgs from '../js/images'
export default {
  components: {
    TopBar
  },
  data(){
    return {
      imgs
    }
  } 
}
</script>
<style scoped>
.main-menu {
  margin-bottom: 0 !important; 
}
</style>