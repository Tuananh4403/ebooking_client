<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-box">
  <div class="modal-content">
    <h2 class="form-title">Cập nhật trạng thái hàng ngày</h2>

    <form @submit.prevent="submitStatus" class="form-container">
      <div class="form-group">
        <label for="date">Ngày</label>
        <input type="date" id="date" v-model="dailyStatus.date" required />
      </div>

      <div class="form-group">
        <label for="health">Tình trạng sức khỏe</label>
        <input type="text" id="health" v-model="dailyStatus.healthStatus" placeholder="Ví dụ: Khỏe mạnh, mệt mỏi..." />
      </div>

      <div class="form-group">
        <label for="behavior">Hành vi</label>
        <input type="text" id="behavior" v-model="dailyStatus.behavior" placeholder="Ví dụ: Nghịch ngợm, ngoan ngoãn..." />
      </div>

      <div class="form-group">
        <label for="notes">Ghi chú</label>
        <textarea id="notes" v-model="dailyStatus.notes" rows="4" placeholder="Thêm ghi chú nếu cần..."></textarea>
      </div>

      <div class="button-group">
        <button type="submit" class="btn primary">💾 Lưu</button>
        <button type="button" class="btn secondary" @click="$emit('close')">❌ Hủy</button>
      </div>
    </form>
  </div>
    </div>
  </div>
</template>

<script>
import { customerApiPrivate } from '@/api/axios.js';
import { toastError, toastWarning } from "@/utils/toast.js";
import Swal from "sweetalert2";

export default {
  props: ['historyBarnId'],
  data() {
    return {
      dailyStatus: {
        date: new Date().toISOString().split('T')[0],
        healthStatus: '',
        behavior: '',
        notes: '',
        // historyBarnId: this.pet?.historyBarnId ?? null,
      }
    };
  },
  methods: {

    async submitStatus() {
      Swal.fire({
        title: "Đang cập nhật trạng thái...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        console.log(this.historyBarnId);
        const response = await customerApiPrivate.post(`/api/pets/${this.historyBarnId}/status`, this.dailyStatus);

        if (response.data.statusCode === 200) {
          this.$emit('close');
          Swal.fire("Thành công!", "Cập nhật trạng thái thành công.", "success").then(() => {
             // Close modal
          });
        } else {
          Swal.fire("Thất bại", "Không thể cập nhật trạng thái.", "error");
        }
      } catch (error) {
        console.error("Error updating pet status:", error);
        Swal.fire("Lỗi", "Đã xảy ra lỗi khi cập nhật.", "error");
      }
    }
  },
  created() {
    console.log('Component mounted.');
    console.log(this.historyBarnId);

  }
};
</script>

<style scoped>
.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  margin: auto;
}

.form-title {
  text-align: center;
  color: #22445d;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
  color: #444;
}

input[type="text"],
input[type="date"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  transition: border 0.3s;
  font-size: 14px;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
}

.modal-box {
  background: white;
  padding: 24px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
input:focus,
textarea:focus {
  border-color: #22445d;
  outline: none;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
}

.btn {
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: 0.3s;
}

.btn.primary {
  background-color: #22445d;
  color: white;
}

.btn.primary:hover {
  background-color: #1a3447;
}

.btn.secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn.secondary:hover {
  background-color: #ccc;
}
</style>
