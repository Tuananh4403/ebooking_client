<template>
  <div class="room-list-horizontal">
    <div class="room-card" v-for="room in rooms" :key="room.id" >
      <img :src="imgs.hotel" alt="Room Image" class="room-image"/>
      <div class="room-info">
        <h3 class="room-name">{{ room.barnName }}</h3>
        <p class="room-location">Khách hàng: {{ room.customerName }}</p>
        <p class="room-location">Thú cưng: {{ room.petName }}</p>
        <p class="room-status">Ngày đặt phòng: {{ formatDate(room.checkInDate) }}</p>
        <p class="room-status">Trạng thái xét duyệt: {{ formatBookingStatus(room.status) }}</p>
        <button class="book-now-btn">Hủy phòng</button>
      </div>
    </div>
    <div v-if="totalCount > pageSize" class="example-one pagination-container">
      <vue-awesome-paginate
          :total-items="totalCount"
          :items-per-page="pageSize"
          v-model="currentPage"
          @click="onPageChange"
      />
    </div>
<!--    <ModalDetail v-if="showModal" :selectedRoom="selectedRoom" :showModal="showModal" @close-modal="closeModal" />-->

  </div>
</template>

<script>
import ModalDetail from './modal/RoomDetail.vue';
import imgs from '../../js/images';
import {bookingApiPrivate} from "@/api/axios.js";
import {toastSuccess, toastWarning} from "@/utils/toast.js";
import {getUserId} from "@/utils/auth.js";
import {formatBookingStatus} from "@/constants/booking-status.js";

export default {
  components: {
    ModalDetail
  },
  data() {
    return {
      rooms: [],
      selectedRoom: null,
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      imgs
    };
  },
  methods: {
    // openModal(room) {
    //     this.selectedRoom = room;
    //     this.showModal = true;
    // },
    // closeModal() {
    //     this.showModal = false;
    //     this.selectedRoom = null;
    // },
     formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    onPageChange(page) {
      this.currentPage = page;
      this.fetchBooking(); // Fetch data for the new page
    },
    formatBookingStatus(status) {
      return formatBookingStatus(status);
    },
    fetchBooking() {
      var userId = getUserId()
      bookingApiPrivate.get(`/api/booking?api-version=1.0&customerId=${userId}`,
          {
            params: {
              PageNumber: this.currentPage,
              pageSize: this.pageSize,
            }
          })
          .then(response => {
            if (response.data.statusCode === 200) {
              var data = response.data.data;
              this.rooms =data.data;
              this.totalCount = data.totalRecords;
              this.pageSize = data.pageSize;
            }
          })
          .catch(error => {
            toastWarning("Lưu dữ liệu thất bại, vui lòng thử lại!")
            console.error('Error fetching barn details:', error);
          })
          .finally(() => {
            this.isLoading = true;
          });
    }
  },
  created() {
    this.fetchBooking();
  }
};
</script>

<style scoped>
.room-list-horizontal {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.room-card {
  display: flex;
  border: 1px solid gray;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.room-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.room-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 0 0 8px;
}

.room-info {
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;
}

.room-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.room-location {
  font-size: 1rem;
  color: gray;
  margin-bottom: 10px;
}

.room-rating {
  font-size: 1rem;
  margin-bottom: 10px;
  color: gray;
}

.room-status {
  font-size: 1rem;
  color: gray;
  margin-bottom: 10px;
}

.price-box {
  margin-top: 20px;
}

.old-price {
  font-size: 0.9rem;
  color: black;
  text-decoration: line-through;
  margin-bottom: 5px;
}

.new-price {
  font-size: 1.3rem;
  color: red;
  font-weight: bold;
  margin-bottom: 5px;
}

.discount {
  font-size: 1rem;
  color: darkgreen;
}

.book-now-btn {
  background-color: #ff8c00;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.book-now-btn:hover {
  background-color: #ff6f00;
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    background-color: #ffb84d;
  }
}
</style>