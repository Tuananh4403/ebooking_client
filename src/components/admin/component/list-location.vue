<template>
  <div class="content ">
    <div class="title-search-container">
      <h1 class="title">DANH SÁCH VỊ TRÍ</h1>
      <button class="search-button" @click="openSearchModal">Tìm kiếm</button>
      <button class="search-button" @click="openModal">Tạo</button>
    </div>
    <vue-loading class="loading" :active="loading" :loader="'dots'" :color="'#22445d'" :can-cancel="true" :height="50"
      :Width="50" />
    <div class="table-container">
      <table class="contest-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Ngày tạo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(location, index) in locations" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ location.name }}</td>
            <td>{{ location.description ?? '' }}</td>
            <td>{{ location.createdTime != null ? formatDate(location.createdTime) : '' }}</td>
            <td>
              <button class="edit-button" @click="openEditModal(location.id)">Chỉnh sửa</button>
              <button class="delete-button" @click="openEditModal(location.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="totalCount > pageSize" class="example-one pagination-container">
        <vue-awesome-paginate :total-items="totalCount" :items-per-page="pageSize" v-model="currentPage"
          @click="onPageChange" />
      </div>
    </div>

    <AddUpdateLocation v-if="showModal" :location-id="isCreating ? null : selectedCompetitionId" @close="closeModal" />
  </div>
</template>


<script>
import AddUpdateLocation from "@/components/admin/component/add-update-location.vue";
import { storeApiPrivate } from '@/api/axios.js';
import { toastError, toastWarning } from "@/utils/toast.js";

export default {
  name: 'ListBarn',
  components: {
    AddUpdateLocation,
  },
  data() {
    return {
      showModal: false,
      showSearchModal: false,
      locations: [],
      selectedCompetitionId: null,
      isCreating: false,
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      loading: false
    };
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    fetchLocation() {
      this.loading = true;
      storeApiPrivate.get('/api/location?api-version=1.0', {
        params: {
          PageNumber: this.currentPage,
          pageSize: this.pageSize,
        }
      })
        .then(response => {
          if (response.data.statusCode === 200) {
            const data = response.data.data;
            this.locations = data.data;
            this.totalCount = data.totalRecords;
            this.pageSize = data.pageSize;
          } else {
            console.error('Dữ liệu API không đúng định dạng:', response.data);
          }
        })
        .catch(error => {
          toastError("Không thể lấy dữ liệu, vui lòng liên hệ admin!");
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onPageChange(page) {
      this.currentPage = page;
      this.fetchLocation(); 
    },
    openModal() {
      this.isCreating = true; 
      this.selectedCompetitionId = null; 
      this.showModal = true;
    },
    openEditModal(barnId) {
      this.isCreating = false; 
      this.selectedCompetitionId = barnId;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedCompetitionId = null;
      this.isCreating = false;
      this.fetchLocation();

    },
    openSearchModal() {
      this.showSearchModal = true;
    },
    closeSearchModal() {
      this.showSearchModal = false;
    },
    handleSearch(searchCriteria) {
      console.log('Tiêu chí tìm kiếm:', searchCriteria);
    },
  },
  mounted() {
    this.fetchLocation();
  },
};
</script>


<style>
.main-container {
  display: flex;
}

.sidebar.expanded+.header-content-container {
  margin-left: 200px;
}

.content {
  min-height: 60vh;
}

.title-search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  margin-left: 85px;
  margin-top: 40px;
  margin-right: 50px;
  font-size: 36px;
  font-weight: bold;
}

.search-button {
  margin-top: 2%;
  background-color: #A0937D;
  color: white;
  border: none;
  padding: 0.5% 3%;
  border-radius: 10px;
  cursor: pointer;
  font-size: 100%;
  line-height: 1.5;
  transition: background-color 0.3s;
  margin-right: 50px;
}

.edit-button {
  margin-top: 2%;
  background-color: #A0937D;
  color: white;
  border: none;
  padding: 0.5% 3%;
  border-radius: 10px;
  cursor: pointer;
  font-size: 100%;
  line-height: 1.5;
  transition: background-color 0.3s;
  margin-right: 20px;
}

.delete-button {
  margin-top: 2%;
  background-color: #D9534F;
  color: white;
  border: none;
  padding: 0.5% 3%;
  border-radius: 10px;
  cursor: pointer;
  font-size: 100%;
  line-height: 1.5;
  transition: background-color 0.3s ease-in-out;
  margin-right: 20px;
}

.search-button:hover {
  background-color: gray;
}

.table-container {
  margin-top: 20px;
  border-radius: 5px;
  overflow: hidden;
}

.contest-table {
  width: 90%;
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 0px;
}

.contest-table th {
  padding: 12px 15px;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #ddd;
  border-top: none;
  border-left: none;
  border-right: none;
}

.contest-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  border-top: none;
  border-left: none;
  border-right: none;
  text-align: center;
}

.contest-table thead {
  background-color: #b2b4b6;
  color: #333;
}

.contest-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.contest-table tbody tr:hover {
  background-color: #f1f1f1;
}

.contest-table tbody ul {
  padding-left: 15px;
  text-align: center;
  list-style-type: square;
  list-style: none;
}


.example-one .pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  column-gap: 10px;

}

.example-one .paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.example-one .paginate-buttons:hover {
  background-color: #d8d8d8;
}

.example-one .active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.example-one .active-page:hover {
  background-color: #2988c8;
}

.example-one .back-button:active,
.example-one .next-button:active {
  background-color: #c4c4c4;
}
</style>
