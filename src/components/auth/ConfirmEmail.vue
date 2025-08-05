<template>
  <div v-if="showResetModal" class="reset-password-container">
    <div class="reset-password-box">
      <h2 class="reset-password-title">Nhập mã xác nhận</h2>
      <p class="reset-password-description">Chúng tôi đã gửi mã xác nhận đến email <strong>{{ email }}</strong>. Vui lòng kiểm tra và nhập mã bên dưới.</p>
      <form @submit.prevent="handleCodeSubmit" class="reset-password-form">
        <div class="form-group">
          <label for="code" class="form-label">Mã xác nhận <span class="note">*</span></label>
          <input
              type="text"
              id="code"
              v-model="code"
              class="form-control"
              placeholder="Nhập mã xác nhận"
          />
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>

        <div class="form-group">
          <button type="submit" class="btn-submit">Xác nhận</button>
        </div>
      </form>
      <button class="btn-close" @click="closeModal">×</button>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/api/axios.js";
import {getUserEmail} from "@/utils/auth.js";

export default {
  props: {
    showResetModal: Boolean,
    email: String,
  },
  data() {
    return {
      code: "",
      errorMessage: ""
    };
  },
  methods: {
    handleCodeSubmit() {
      this.errorMessage = "";

      if (!this.code.trim()) {
        this.errorMessage = "Vui lòng nhập mã xác nhận.";
        return;
      }

      apiClient.post('/api/account/confirm-email?api-version=1.0', {
        email: this.email, // Sử dụng this.email, không phải biến toàn cục `email`
        oldPassword: this.code
      })
          .then((response) => {
            console.log(response.data.data);
            if (response.data.data.succeeded === true) {
              alert("Xác nhận thành công!");

              // Optional: Gọi emit nếu cần xử lý tiếp ở component cha
              this.$emit("confirm-password-result", true);

              this.closeModal();
            } else {
              this.errorMessage = "Mã không đúng hoặc đã hết hạn.";
            }
          })
          .catch(() => {
            this.errorMessage = "Có lỗi xảy ra. Vui lòng thử lại.";
          });
    },
    closeModal() {
      this.code = "";
      this.errorMessage = "";
      this.$emit("update:showResetModal", false);
    }
  }
};
</script>

<style scoped>
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.reset-password-box {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position: relative;
}

.reset-password-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.reset-password-description {
  font-size: 14px;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.note {
  color: red;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #425A8B;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #8C9EC5;
}

.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10px;
  height: 10px;
  background-color: white;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
}

.btn-close:hover {
  background-color: #8C9EC5;
}

.error-message {
  color: red;
  font-style: italic;
  font-size: 12px;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder,
input[type="date"]::placeholder {
  color: #8C9EC5;
}
</style>
