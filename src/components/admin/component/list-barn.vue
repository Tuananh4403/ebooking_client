<template>
  <div>
        <div class="content">
          <div class="title-search-container">
            <h1 class="title">DANH SÁCH CHUỒNG</h1>
            <button class="search-button" @click="openSearchModal">Tìm kiếm</button>
            <button class="search-button" @click="openModal">Tạo</button>

<!--            <font-awesome-icon class="add-button" :icon="['fas', 'plus']" @click="openModal" />-->
          </div>

          <!-- Modal tìm kiếm -->
          <SearchModal 
            v-if="showSearchModal" 
            @close="closeSearchModal" 
            @search="handleSearch" 
          />
          <vue-loading class="loading" :active="loading" :loader="'dots'" :color="'#22445d'" :can-cancel="true"
                   :height="50"
                   :Width="50"/>
          <div class="table-container">
            <table class="contest-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Loại</th>
                  <th>Vị trí</th>
                  <th>Camera</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="competition in competitions" :key="competition.id">
                  <td>{{ competition.name }}</td>
                  <td>{{ competition.description }}</td>
                  <td>{{ formatDate(competition.dateStart) }} - {{ formatDate(competition.dateEnd) }}</td>
                  <td>{{ competition.statusDescription }}</td>
                  <td>
                    <strong>Hạng thi đấu:</strong>
                    <ul>
                      <li v-for="rank in competition.ranks" :key="rank.id">{{ rank.name }}</li>
                    </ul>
                  </td>
                  <td>
                    <font-awesome-icon class="edit-button" :icon="['fas', 'edit']" @click="openEditModal(competition.id)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <vue-awesome-paginate
              :total-items="totalCount"
              :items-per-page="pageSize"
              v-model="currentPage"
              @click="onPageChange"
          />
          <!-- Modal tạo cuộc thi -->
          <AddUpdateBarn
            v-if="showModal && isCreating" 
            @close="closeModal" 
          />

          <!-- Modal chỉnh sửa cuộc thi -->
<!--          <UpdateCompetition -->
<!--            v-if="showModal && !isCreating" -->
<!--            :competitionId="selectedCompetitionId" -->
<!--            @close="closeModal" -->
<!--            @update-success="fetchCompetitions"-->
<!--          />-->
        </div>
      </div>
</template>


<script>
import AddUpdateBarn from '@/components/admin/component/add-update-barn.vue';
import { axiosPrivate } from '@/api/axios.js';
import {toastError, toastWarning} from "@/utils/toast.js";

export default {
  name: 'ListBarn',
  components: {
    AddUpdateBarn,
    // UpdateCompetition,
    // SearchModal,
  },
  data() {
    return {
      showModal: false, // Dùng chung cho cả hai modal
      showSearchModal: false, // Hiển thị modal tìm kiếm
      competitions: [], // Danh sách cuộc thi
      selectedCompetitionId: null, // ID cuộc thi cần chỉnh sửa
      isCreating: false, // Phân biệt giữa tạo mới và chỉnh sửa
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
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    /**
     * Lấy danh sách cuộc thi từ API và sắp xếp theo ngày bắt đầu.
     */
    fetchBarn() {
      this.loading = true;
      axiosPrivate.get('/api/competition', {
        params: {
          pageNumber: 1,
          pageSize: 20,
          status: 1,
        }
      })
          .then(response => {
            if (response.data?.data?.items) {
              this.competitions = response.data.data.items.sort((a, b) => {
                const dateA = new Date(a.dateStart);
                const dateB = new Date(b.dateStart);
                if (dateA.getTime() === dateB.getTime()) {
                  return new Date(b.dateEnd) - new Date(a.dateEnd);
                }
                return dateB - dateA;
              });
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
    async onPageChange(page) {
      this.currentPage = page;
      await this.fetchBarn(); // Fetch data for the new page
    },

    openModal() {
      this.isCreating = true; // Đặt trạng thái tạo mới
      this.showModal = true;
    },
    openEditModal(competitionId) {
      this.isCreating = false; // Đặt trạng thái chỉnh sửa
      this.selectedCompetitionId = competitionId;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedCompetitionId = null;
      this.isCreating = false;
    },
    openSearchModal() {
      this.showSearchModal = true;
    },
    closeSearchModal() {
      this.showSearchModal = false;
    },
    handleSearch(searchCriteria) {
      // Logic tìm kiếm dựa trên searchCriteria
      console.log('Tiêu chí tìm kiếm:', searchCriteria);
    },
  },
  mounted() {
    // Gọi API lấy danh sách cuộc thi khi component được mount
    this.fetchBarn();
  },
};
</script>


<style scoped>
.main-container {
  display: flex;
}

.header-content-container {
  flex-grow: 1;
  margin-left: 60px; 
  transition: margin-left 0.3s;
}

.sidebar.expanded + .header-content-container {
  margin-left: 200px; 
}

.content {
  min-height: 60vh;
  padding: 20px;
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
  margin-top: 2%; /* Nhích xuống theo phần trăm */
  background-color: #A0937D;
  color: white;
  border: none;
  padding: 0.5% 3%; /* Tăng nhẹ padding để tạo sự thoải mái */
  border-radius: 10px;
  cursor: pointer;
  font-size: 120%; /* Tăng kích thước font để dễ đọc hơn */
  line-height: 1.5; /* Tăng line-height để tạo không gian hơn */
  transition: background-color 0.3s;
  margin-right: 50px;
  width: 12%; /* Giữ chiều rộng hợp lý */
}

.search-button:hover {
  background-color: gray; 
}


.add-button {
  margin-top: 25px;
  border: none;
  border-radius: 5px;
  font-size: 50px; 
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
</style>
