<template>
  <div class="booking-modal-overlay" @click.self="closeModal">
    <div class="booking-modal-content">
      <button class="close-btn" @click="closeModal">x</button>

      <h3>Đặt phòng</h3>

      <div class="modal-section">
        <label for="pet-select">Thú cưng:</label>
        <vue-multiselect v-model="selectedPet " :options="pets" :multiple="false" placeholder="Chọn thú cưng"
                         label="name" track-by="id" :searchable="true" selectLabel="" selectedLabel="" deselectLabel=""
        >
          <template #noResult>
            <span class="no-results-text">Không tìm thấy</span>
          </template>
          <template #noOptions>
            <span class="no-results-text">Không tìm thấy</span>
          </template>
        </vue-multiselect>
      </div>
      <div class="modal-section">
        <label>Tổng số ngày: {{ totalDays }} ngày</label><br />
        <label>Tiền dịch vụ mỗi ngày: {{ format(totalServicePrice) }}</label><br />
        <label><strong>Tổng tiền: {{ format(totalBill) }}</strong></label>
      </div>
      <div class="confirm-btn-container">
        <button class="confirm-btn" @click="confirmBooking">Xác nhận</button>
      </div>
    </div>
  </div>
</template>

<script>
import {toastError, toastWarning} from "@/utils/toast.js";
import {useCurrencyFormatter} from "@/utils/useNumberFormatter.js"
import {bookingApiPrivate} from "@/api/axios.js";

export default {
  props: {
    pets: {
      type: Array,
      required: true
    },
    services: {
      type: Array,
      default: () => []
    },
    checkIn: {
      type: String,
      required: true
    },
    checkOut: {
      type: String,
      required: true
    }
  },
  setup() {
    const { format } = useCurrencyFormatter('vi-VN', 'VND');
    const formatDateTime = (date) => {
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format; change to true for 12-hour format with AM/PM
      });
    };
    return { format, formatDateTime };
  },
  computed: {
    totalDays() {
      const checkIn = new Date(this.checkIn);
      const checkOut = new Date(this.checkOut);
      const timeDiff = checkOut - checkIn;
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 1;
    },
    totalServicePrice() {
      return this.services.reduce((sum, s) => sum + s.price, 0);
    },
    totalBill() {
      return this.totalServicePrice * this.totalDays;
    }
  },
  data() {
    return {
      selectedPet: "",
      walletBalance: 0
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-booking-modal');
    },
    confirmBooking() {
      if (this.selectedPet) {
        if(this.walletBalance < this.totalServicePrice) {
          toastWarning("Số dư của bạn không đủ vui lòng nạp thêm tiền!")
        }
        else{
          this.selectedPet.totalPrice = this.totalBill;
          this.$emit('submit', this.selectedPet);
          this.closeModal()
        }
      } else {
        toastWarning("Vui lòng chọn thú cưng")
      }
    },
    async loadWalletBalance() {
      try {
        const response = await bookingApiPrivate.get('/api/wallet/balance?api-version=1.0');
        if(response.status === 200) {

          if(response.data.data == null) {
            await bookingApiPrivate.post('/api/wallet?api-version=1.0');
          }
          this.walletBalance = response.data.data; // Assume response contains balance
        }
      } catch (error) {
        toastError('Failed to load wallet balance.');
        console.error(error);
      }
    },
  },
  created() {
    this.loadWalletBalance();
  }
};
</script>

<style scoped>
.booking-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.booking-modal-content {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
}

.booking-modal-content h3 {
  margin-bottom: 20px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.confirm-btn {
  background-color: #425A8B;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 10px;
}

.confirm-btn:hover {
  background-color: #7d8aa3;
}

.modal-section {
  margin-bottom: 20px;
}

.modal-section label {
  font-weight: bold;
}

.modal-section select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  margin-top: 5px;
}

.confirm-btn-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>