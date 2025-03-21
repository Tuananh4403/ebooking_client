<template>
  <div class="admin-layout">
    <!-- Header at the top -->
    <HeaderAdmin />

    <!-- Sidebar and Main Content Below -->
    <div class="content-container">
      <SideBarAdmin class="sidebar" /> <!-- Sidebar below header -->
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAdmin from '@/components/HeaderAdmin.vue';
import SideBarAdmin from '@/components/SidebarAdmin.vue';

export default {
  components: {
    HeaderAdmin,
    SideBarAdmin
  }
}
</script>

<style scoped>
/* Full page layout */
.admin-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Sidebar and content should be in a row below the header */
.content-container {
  display: flex;
  flex: 1;
}


/* Expanding sidebar effect */
.sidebar.expanded {
  width: 250px;
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
  transition: opacity 0.3s, transform 0.3s;
}

/* Main content styling */
.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow: auto;
}
</style>
