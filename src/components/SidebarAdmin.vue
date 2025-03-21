<template>
  <div class="sidebar" :class="{ expanded: isExpanded }" @click.stop>
    <div
        v-for="item in menuItems"
        :key="item.name"
        class="menu-item"
        @click="toggleExpand(item)"
    >
      <font-awesome-icon :icon="['fas', item.icon]" class="icon"/>
      <span class="tooltip">{{ item.tooltip }}</span>

      <!-- Submenu should be outside tooltip -->
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
        {icon: 'warehouse', tooltip: 'Báo cáo', route: '/report'},
        {
          icon: 'user-plus',
          tooltip: 'Quản lí nhân sự',
          submenu: [
            {name: 'Quản lí nhân viên', route: '/admin/register-staff-admin'},
            {name: 'Quản lí ban giám khảo', route: '/admin/register-judge-admin'},
          ],
        },
        {
          icon: 'store',
          tooltip: 'Quản lí cuộc thi',
          submenu: [
            {name: 'Danh sách cuộc thi', route: '/admin/list-competition'},
            {name: 'Danh sách hạng thi đấu', route: '/admin/list-rank-competition'},
            {name: 'Danh sách giải thưởng', route: '/admin/list-reward-competition'},
          ],
        },
        {
          icon: 'wallet',
          tooltip: 'Quản lí thu chi',
          submenu: [
            {name: 'Danh sách thu chi'},
            {name: 'Lịch sử nhà tài trợ'},
            {name: 'Danh sách trao giải thưởng', route: '/admin/list-reward-admin'},
          ],
        },
        {
          icon: 'bars',
          tooltip: 'Danh sách đăng kí',
          submenu: [
            {name: 'Danh sách đăng kí cá Koi', route: '/list-koi-fish-admin'},
            {name: 'Danh sách cá Koi', route: '/admin/koi-fish-admin'},
            {name: 'Danh sách đăng kí cuộc thi', route: '/admin/list-register-competition-admin'},

          ],
        },
        {
          icon: 'map',
          tooltip: 'Quản lí điểm cuộc thi',
          submenu: [
            {name: 'Chi tiết điểm cuộc thi', route: '/admin/list-detail-score-admin'},
            {name: 'Thống kê kết quả cuộc thi', route: '/admin/list-result-competition'},
          ],
        },
        {
          icon: 'list',
          tooltip: 'Phân loại',
          submenu: [{name: 'Danh sách phân loại cá Koi', route: '/admin/separate-koi-fish'}]
        },
        {
          icon: 'pen', tooltip: 'Chấm thi', submenu: [{name: 'Chi tiết chấm thi', route: '/admin/score-detail'},
            {name: 'Lịch sử chấm thi', route: '/history-score-detail'},
            {name: 'Danh sách vòng thi', route: '/admin/list-detail-score-admin'}
          ]
        },
        {
          icon: 'calendar',
          tooltip: 'Lịch chấm thi',
          submenu: [
            {name: 'Phân công lịch chấm thi', route: '/admin/schedule-admin'},
            {name: 'Lịch chấm thi', route: '/admin/list-schedule'},
            {name: 'Check-in', route: '/admin/check-in'},
          ],
        },
        {
          icon: 'door-open',
          tooltip: 'Đăng xuất',
          name: 'Logout',
          submenu: [
            {name: 'Phân công lịch chấm thi', route: '/admin/schedule-admin'},
            {name: 'Lịch chấm thi', route: '/admin/list-schedule'},
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
  background-color: #A0937D; /* Taupe Gray */
  color: #fdfdfd;
  height: calc(100vh - 60px); /* Adjust height to fit below the header */
  transition: width 0.3s;
  position: fixed;
  left: 0;
  top: 100px; /* Push below the header */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1; /* Ensure it stays above content but below header */
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
  z-index: 10000; /* Đặt z-index cao hơn headerAdmin */
  left: calc(100% + 10px); /* Đặt tooltip sang bên phải icon */
  top: 50%; /* Đặt tooltip ở giữa của menu item */
  transform: translateY(-50%); /* Căn giữa tooltip theo chiều dọc */
  opacity: 0; /* Ẩn tooltip */
  transition: opacity 0.3s;
}

.submenu {
  position: fixed;
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
}
</style>
