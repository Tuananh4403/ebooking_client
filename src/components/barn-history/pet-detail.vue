<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">&times;</button>

      <div class="video-section">
        <video controls autoplay>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        </video>
      </div>

      <div class="dropdown-container">
        <div class="dropdown">
          <button class="dropdown-button" @click="toggleDropdown('petInfo')">
            Thông tin thú cưng
          </button>
          <div v-if="activeDropdown === 'petInfo'" class="dropdown-content">
            <div class="info-box">
              <p><strong>Tên:</strong> {{ petInfo.petName }}</p>
              <p><strong>Ngày sinh:</strong> {{ petInfo.birthday }}</p>
              <p><strong>Giới tính:</strong> {{ petInfo.petGender ? 'Đực' : 'Cái' }}</p>
              <p><strong>Chủng loại:</strong> {{ petInfo.petType }}</p>
            </div>
          </div>
        </div>

        <div class="dropdown">
          <button class="dropdown-button" @click="toggleDropdown('bookingInfo')">
            Thông tin đặt phòng
          </button>
          <div v-if="activeDropdown === 'bookingInfo'" class="dropdown-content">
            <div class="info-box">
<!--              <p><strong>Khách sạn:</strong> {{ petInfo.hotelName || 'Chưa có' }}</p>-->
              <p><strong>Phòng:</strong> {{ petInfo.barnName || 'Chưa có' }}</p>
              <p><strong>Thời gian thuê:</strong> {{ petInfo.timeRent + " ngày"  || 'Chưa có' }}</p>
              <p><strong>Check-in:</strong> {{ petInfo.timeIn || 'Chưa check-in' }}</p>
              <p><strong>Check-out:</strong> {{ petInfo.timeOut || 'Chưa check-out' }}</p>
            </div>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropdown-button" @click="toggleDropdown('dailyPetStatus')">
            Thông tin cập nhật hàng ngày
          </button>
          <div v-if="activeDropdown === 'dailyPetStatus'" class="dropdown-content">
            <div class="info-box">
              <h4 class="daily-status-title">Lịch sử cập nhật</h4>

              <div v-if="dailyPetStatus?.length">
                <div
                    v-for="(status, index) in dailyPetStatus"
                    :key="index"
                    class="status-card"
                >
                  <div class="status-date"><strong>Ngày: </strong> {{ formatDate(status.date) }}</div>
                  <div class="status-detail">
                    <strong>Tình trạng: </strong> {{ status.healthStatus || 'Không có' }}
                  </div>
                  <div class="status-detail">
                    <strong>Hành vi: </strong> {{ status.behavior || 'Không có' }}
                  </div>
                  <div class="status-detail">
                    <strong>Ghi chú: </strong> {{ status.notes || 'Không có' }}
                  </div>
                </div>
              </div>

              <div v-else class="text-muted empty-status">
                <i>Chưa có cập nhật nào.</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {customerApiPrivate} from "@/api/axios.js";

export default {
  props: {
    petInfo: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      activeDropdown: null,
      dailyPetStatus: [],
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
    toggleDropdown(section) {
      this.activeDropdown = this.activeDropdown === section ? null : section;
    },
    closeModal() {
      this.$emit("close");
    }
  },
  created() {
    customerApiPrivate.get(`/api/history-barn/${this.petInfo.id}?api-version=1.0`)
        .then((response) => {
          if (response.data.statusCode === 200) {
              this.dailyPetStatus = response.data.data.dailyStatuses;
            console.log(this.dailyPetStatus);

          }
        })
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 2000;
}

.modal-content {
  background: white;
  width: 60vw;
  max-height: 80vh;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.close-button {
  position: absolute;
  top: -3px;
  right: -8px;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #425A8B;
  cursor: pointer;
}

.close-button:hover {
  color: rgb(186, 184, 184);
}

.video-section {
  text-align: center;
  margin-bottom: 20px;
}

.video-section video {
  width: 100%;
  border-radius: 10px;
}

.dropdown-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dropdown {
  width: 100%;
}

.dropdown-button {
  width: 100%;
  padding: 10px;
  background: #425A8B;
  color: white;
  border: none;
  cursor: pointer;
  text-align: left;
  border-radius: 5px;
  font-size: 16px;
}

.dropdown-content {
  margin-top: 5px;
  background: white;
  border-radius: 8px;
  padding: 10px;
}

.info-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #f9f9f9;
}
.daily-status-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #22445d;
}

.status-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-left: 4px solid #4caf50;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.status-date {
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.status-detail {
  color: #555;
  font-size: 14px;
  margin-bottom: 4px;
}

.text-muted.empty-status {
  color: #888;
  text-align: center;
  padding: 12px;
}

</style>