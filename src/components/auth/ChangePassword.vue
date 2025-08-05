<template>
  <div v-if="showChangePasswordModal" class="reset-password-container">
    <div class="reset-password-box">
      <h2 class="reset-password-title">Đổi mật khẩu</h2>
      <form @submit.prevent="handlePasswordChange" class="reset-password-form">
        <div class="form-group">
          <label for="oldPassword" class="form-label">Mật khẩu cũ <span class="note">*</span></label>
          <input
              type="password"
              id="oldPassword"
              v-model="oldPassword"
              class="form-control"
              placeholder="Nhập mật khẩu cũ"
          />
        </div>

        <div class="form-group">
          <label for="newPassword" class="form-label">Mật khẩu mới <span class="note">*</span></label>
          <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              class="form-control"
              placeholder="Nhập mật khẩu mới"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword" class="form-label">Xác nhận mật khẩu <span class="note">*</span></label>
          <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="form-control"
              placeholder="Nhập lại mật khẩu mới"
          />
        </div>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <div class="form-group">
          <button type="submit" class="btn-submit">Đổi mật khẩu</button>
        </div>
      </form>
      <button class="btn-close" @click="closeModal">×</button>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/api/axios.js";

export default {
  props: {
    email: String,
    showChangePasswordModal: Boolean
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMessage: ""
    };
  },
  methods: {
    handlePasswordChange() {
      this.errorMessage = "";

      if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
        this.errorMessage = "Vui lòng nhập đầy đủ thông tin.";
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Mật khẩu mới và xác nhận không khớp.";
        return;
      }

      apiClient.post("/api/account/change-password?api-version=1.0", {
        email: this.email,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })
          .then((response) => {
            if (response.data?.data?.succeeded) {
              alert("Đổi mật khẩu thành công!");
              this.$emit("password-change-success", true);
              this.closeModal();
            } else {
              this.errorMessage = response.data?.data?.message || "Đổi mật khẩu thất bại.";
            }
          })
          .catch(() => {
            this.errorMessage = "Có lỗi xảy ra. Vui lòng thử lại.";
          });
    },
    closeModal() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.errorMessage = "";
      this.$emit("update:showChangePasswordModal", false);
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
  background-color: white;
  color: #425A8B;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  width: 30px;
  height: 30px;
}

.btn-close:hover {
  background-color: #8C9EC5;
  color: white;
}

.error-message {
  color: red;
  font-style: italic;
  font-size: 12px;
}

input::placeholder {
  color: #8C9EC5;
}
</style>
