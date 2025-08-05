<template>
  <div class="content">
    <div class="title-search-container">
      <h1 class="title">DANH SÁCH LƯU TRÚ</h1>
      <button class="search-button" @click="openSearchModal">Tìm kiếm</button>
      <button class="search-button" @click="openModal">Tạo</button>
    </div>
    <vue-loading class="loading" :active="loading" :loader="'dots'" :color="'#22445d'" :can-cancel="true" :height="50"
                 :Width="50" />
    <div class="table-container">
      <div class="row">
        <div v-for="(pet, index) in barnHistory" :key="index" class="col-md-3 mb-4">
          <div class="pet-box" @click="openModal(pet)">
            <img :src="pet.image ?? imgs" alt="Pet" class="img-fluid" />
            <h5>{{ pet.name }}</h5>
            <p>Ngày sinh: {{ formatDate(pet.birthday) }}</p>
            <p>Giới tính: {{ pet.petGender }}</p>
            <p>Loài: {{ pet.petType }}</p>
          </div>
        </div>
      </div>
      <div v-if="totalCount > pageSize" class="example-one pagination-container">
        <vue-awesome-paginate :total-items="totalCount" :items-per-page="pageSize" v-model="currentPage"
                              @click="onPageChange" />
      </div>
    </div>

  </div>
  <Teleport to="body">
    <PetDetail v-if="showModal" :history-barn-id="currentPet" @close="closeModal" />
  </Teleport>
</template>

<script>

import imgs from '../../../js/images.js';
import PetDetail from './pet-detail.vue';
import {getUserId} from "@/utils/auth.js";
import {customerApiPrivate} from "@/api/axios.js";
import images from "@/js/images.js";
import {formatDate} from "@/utils/common.js";
import {toastError} from "@/utils/toast.js";
const customerServiceUrl = import.meta.env.VITE_CUSTOMER_SERVICE_URL;

export default {
  components: {
    PetDetail
  },
  data() {
    return {
      imgs,
      currentPet: {},
      showModal: false,
      pageSize: 10,
      currentPage:1,
      barnHistory: []
    }
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
    openModal(pet) {
      this.currentPet = pet.id;
      this.showModal = true;
    },
    fetchPet() {
      this.loading = true;
      var userId = getUserId();
      customerApiPrivate.get(`/api/history-barn?customerId=${userId}&api-version=1.0`, {
        params: {
          PageNumber: this.currentPage,
          pageSize: this.pageSize,
        }
      })
          .then(response => {
            if (response.data.statusCode === 200) {
              const data = response.data.data;
              console.log(data)
              this.barnHistory = data.data.map(history => ({
                ...history,
                image: history.pet.imagePath != null ? customerServiceUrl+ '/' + history.pet.imagePath : images.meo,
                customerName: history.customer.name,
                petName: history.pet.name,
                barnName: history.barnName,
                timeIn: history.timeIn != null ? formatDate(history.timeIn) : null,
                timeOut: history.timeOut != null ? formatDate(history.timeOut) : null,
                birthday: formatDate(history.pet.birthday),
                petGender: history.pet.gender ? "Đực" : "Cái",
                petType: history.pet.type == 'dog' ? "Chó" : "Mèo"
                // Định dạng YYYY-MM-DD
              }));
              this.totalCount = data.totalRecords;
              this.pageSize = data.pageSize;
              this.loading = false;
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
    closeModal() {
      this.showModal = false;
    }
  },
  created() {
    this.fetchPet();
  }
};
</script>

<style scoped>


.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 0px;
}

.col-md-3 {
  width: 24%;
  margin-bottom: 16px;
}

.pet-box {
  border: 1px solid rgb(159, 154, 154);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10%;
}

.pet-box img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.pet-box h5 {
  margin-top: 10px;
  font-size: 1.2rem;
}

.pet-box p {
  color: #777;
  margin-top: 5px;
  text-align: left;
}

.pet-box:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>