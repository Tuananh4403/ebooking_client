<template>
  <div v-if="showResetModal" class="reset-password-container">
    <div class="reset-password-box">
      <h2 class="reset-password-title">Vui lòng nhập email</h2>
      <p class="reset-password-description">Nhập email của bạn để nhận mật khẩu mới.</p>
      <form @submit.prevent="handleSubmit" class="reset-password-form">
        <div class="form-group">
          <label for="email" class="form-label">Email <span class="note">*</span></label>
          <input type="email" id="email" v-model="email" class="form-control" placeholder="example@example.com"
            @input="validateEmail" />
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>

        <div class="form-group">
          <button type="submit" class="btn-submit">Gửi yêu cầu</button>
        </div>
      </form>
      <button class="btn-close" @click="closeModal"></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showResetModal: Boolean
  },
  data() {
    return {
      email: '',
      errorMessage: ''
    };
  },
  methods: {
    validateEmail() {
      this.errorMessage = '';
      const emailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.(gmail\.com|fpt\.edu\.vn))$/;
      if (!this.email) {
        this.errorMessage = 'Vui lòng nhập email';
      } else if (!emailPattern.test(this.email)) {
        this.errorMessage = 'Vui lòng nhập đúng định dạng email a@gmail.com/ a@fpt.edu.vn';
      }
    },
    handleSubmit() {
      if (!this.errorMessage && this.email) {
        alert(`Đã gửi yêu cầu đến email: ${this.email}`);
      } else {
        this.validateEmail();
        alert('Vui lòng kiểm tra lại thông tin và thử lại!');
      }
    },
    closeModal() {
      this.$emit('update:showResetModal', false);
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