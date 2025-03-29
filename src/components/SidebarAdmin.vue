<template>
  <div class="sidebar" :class="{ expanded: isExpanded }" @click.stop>
    <div v-for="item in menuItems" :key="item.name" class="menu-item" @click="toggleExpand(item)">
      <font-awesome-icon :icon="['fas', item.icon]" class="icon" />
      <span class="tooltip">{{ item.tooltip }}</span>

      <div v-if="isExpanded && activeItem === item && item.submenu" class="submenu">
        <router-link v-for="subItem in item.submenu" :key="subItem.name" :to="subItem.route" class="submenu-item">
          {{ subItem.name }}
        </router-link>
      </div>
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
        { icon: 'warehouse', 
          tooltip: 'Báo cáo', 
          submenu: [
            { name: 'Báo cáo thống kê', route: '/admin/report' },
          ],
        },
        {
          icon: 'user-plus',
          tooltip: 'Quản lí nhân sự',
          submenu: [
            { name: 'Quản lí nhân viên', route: '/admin/danh-sach-nhan-vien' },
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
          ],
        },
        {
          icon: 'door-open',
          tooltip: 'Đăng xuất',
          name: 'Logout',
          submenu: [
            { name: 'Phân công lịch chấm thi', route: '/admin/schedule-admin' },
            { name: 'Lịch chấm thi', route: '/admin/list-schedule' },
          ],
        },
      ],
    };
  },
  methods: {
    toggleExpand(item) {
      if (item.name == "Logout") this.logout();
      if (this.activeItem === item) {
        this.isExpanded = false;
        this.activeItem = null;
      } else {
        this.isExpanded = true;
        this.activeItem = item;
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isExpanded = false;
        this.activeItem = null;
      }
    },
    logout() {
      try {
        this.$store.dispatch('logout')
        this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
.sidebar {
  width: 60px;
  background-color: #A0937D;
  color: #fdfdfd;
  height: calc(100vh - 60px);
  transition: width 0.3s;
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
}

.menu-item {
  position: relative;
  margin: 20px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.icon {
  font-size: 24px;
  margin-left: 10px;
}

.tooltip {
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: left;
  white-space: nowrap;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 10000;
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.submenu {
  position: fixed;
  top: 0;
  left: 25%;
  width: 200px;
  padding: 10px;
  display: flex;
  align-items: start;
  flex-direction: column;
  opacity: 1;
  transform: translateX(-10px);
  transition: opacity 0.3s, transform 0.3s;
  z-index: 1000;
}

.menu-item:hover .submenu {
  opacity: 1;
  visibility: visible;
  width: 200px;
  transform: translateX(0);
}

.submenu-item {
  position: relative;
  display: flex;
  align-items: center;
  color: #592b29;
  cursor: pointer;
  margin: 5px 0;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
  border-radius: 5px;
}
.submenu-item:hover {
  background-color: #5a3d2b; 
  color: white; 
  transform: translateX(5px); 
}
</style>
