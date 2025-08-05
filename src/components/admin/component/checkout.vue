<template>
  <div class="modal-backdrop" @click.self="closeCheckoutModal">
    <div class="modal-box">
      <h3 class="modal-title">Xác nhận trả phòng</h3>
      <div class="modal-content">
        <p><strong>🐾 Thú cưng:</strong> {{ selectedPet.petName }}</p>
        <p><strong>🏠 Chuồng:</strong> {{ selectedPet.barnName }}</p>
        <p><strong>📅 Check-in:</strong> {{ formatDate(selectedPet.checkInDate) }}</p>
        <p><strong>📅 Check-out:</strong> {{ formatDate(today) }}</p>
        <p><strong>⏱️ Số ngày lưu trú:</strong> {{ timeRent }} ngày</p>

        <label for="note"><strong>📝 Ghi chú (nếu có):</strong></label>
        <textarea id="note" v-model="checkoutNote" placeholder="Nhập ghi chú..."></textarea>
      </div>

      <div class="modal-actions">
        <button class="btn cancel" @click="closeCheckoutModal">Huỷ</button>
        <button class="btn confirm" @click="confirmCheckout">Xác nhận</button>
      </div>
    </div>
  </div>
</template>

<script>
import {toastError, toastSuccess} from "@/utils/toast.js";
import {bookingApiPrivate} from "@/api/axios.js";
import {getUserId} from "@/utils/auth.js";

export default
{
  emits: ['close'],
  props: {
    order: {
      type: Object,
    }
  },
  data() {
    return {
      showCheckoutModal: false,
      selectedPet: {},
      checkoutNote: '',
      today: new Date()
    };
  },
  computed: {
    timeRent() {
      if (!this.selectedPet.timeIn) return 0;
      const timeIn = new Date(this.selectedPet.timeIn);
      const diff = this.today.getTime() - timeIn.getTime();
      return Math.ceil(diff / (1000 * 3600 * 24)); // Tính số ngày
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    },
    closeCheckoutModal() {
      this.$emit('close');
    },
    fetchBookingDetail(bookingId){
      bookingApiPrivate.get(`/api/booking/${this.order.id}?api-version=1.0`)
          .then(response => {
              var data = response.data;
              console.log(data);
              if(data.statusCode == 200){
                this.selectedPet = data.data;
                console.log(this.selectedPet);
              }
          })
    },
    async confirmCheckout() {
      try {
        var userId = getUserId();
        const res = await bookingApiPrivate.post(`/api/booking/checkout?api-version=1.0`,
        {
          "bookingId": this.order.id,
          "staffName": userId
        }
        );
        if (res.data.statusCode === 200) {
          toastSuccess("Trả phòng thành công!");
          this.fetchPet(); // Load lại danh sách
        } else {
          toastError("Không thể trả phòng.");
        }
      } catch (e) {
        console.error(e);
        toastError("Lỗi khi trả phòng.");
      } finally {
        this.closeCheckoutModal();
      }
    }
  },
created() {
  this.fetchBookingDetail(this.order.id);
}
}
</script>



<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-box {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

.modal-title {
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
}

.modal-content p {
  margin: 8px 0;
}

textarea {
  width: 100%;
  min-height: 70px;
  margin-top: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn.cancel {
  background: #ccc;
  color: #333;
}

.btn.confirm {
  background: #22445d;
  color: #fff;
}

</style>