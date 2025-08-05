<template>
  <div
      class="sidebar"
      :class="{ expanded: isExpanded }"
      @click.stop
  >
    <div
        v-for="item in menuItems"
        :key="item.tooltip"
        class="menu-item"
        @click="toggleExpand(item)"
    >
      <font-awesome-icon :icon="['fas', item.icon]" class="icon" />
      <span class="tooltip" v-if="!isExpanded">{{ item.tooltip }}</span>

      <transition name="fade-slide">
        <div
            v-if="isExpanded && activeItem === item && item.submenu"
            class="submenu"
        >
          <router-link
              v-for="subItem in item.submenu"
              :key="subItem.name"
              :to="subItem.route"
              class="submenu-item"
          >
            {{ subItem.name }}
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
      activeItem: null,
      menuItems: [
        { icon: 'warehouse', tooltip: 'Báo cáo', route: '/admin/dashboard' },
        {
          icon: 'user-plus',
          tooltip: 'Quản lí nhân sự',
          submenu: [
            { name: 'Quản lí nhân viên', route: '/admin/register-staff-admin' },
          ],
        },
        {
          icon: 'store',
          tooltip: 'Quản lí chuồng',
          submenu: [
            { name: 'Danh sách chuồng', route: '/admin/danh-sach-chuong' },
            { name: 'Danh sách vị trí', route: '/admin/danh-sach-vi-tri' },
            { name: 'Danh sách camera', route: '/admin/danh-sach-camera' },
            { name: 'Danh sách loại chuồng', route: '/admin/danh-sach-loai-chuong' },
          ],
        },
        {
          icon: 'bars',
          tooltip: 'Danh sách đơn hàng',
          submenu: [
            { name: 'Danh sách đơn hàng', route: '/admin/danh-sach-don-hang' },
            { name: 'Danh sách lưu trú', route: '/admin/danh-sach-luu-tru' },
            { name: 'Danh sách nạp tiền chờ sác nhận', route: '/admin/transaction-await' },
            { name: 'Danh sách giao dịch', route: '/admin/list-transaction' },
          ],
        },
        {
          icon: 'door-open',
          tooltip: 'Đăng xuất',
          name: 'Logout',
        },
      ],
    };
  },
  methods: {
    toggleExpand(item) {
      if (item.name === "Logout") {
        return this.logout();
      }
      if (item.submenu && item.submenu.length > 0) {
        this.isExpanded = !this.isExpanded || this.activeItem !== item;
        this.activeItem = item;
      } else if (item.route) {
        this.$router.push(item.route);
      }
    },
    logout() {
      try {
        this.$store.dispatch("logout");
        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isExpanded = false;
        this.activeItem = null;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed; /* change from sticky */
  top: 60px;
  left: 0;
  height: 100vh;
  width: 60px;
  background-color: #4b3f2f;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  transition: width 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.15);
}


.sidebar.expanded {
  width: 300px;
}

.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.menu-item:hover {
  background-color: #5a4a39;
}

.icon {
  font-size: 20px;
  margin-right: 10px;
}

.tooltip {
  background: #222;
  color: #fff;
  padding: 4px 10px;
  border-radius: 4px;
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 14px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
}

.menu-item:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.submenu {
  margin-left: 35px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.submenu-item {
  color: #fff;
  padding: 6px 10px;
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: background 0.2s, padding-left 0.2s;
}

.submenu-item:hover {
  background-color: #6c584c;
  padding-left: 15px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
