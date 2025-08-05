<template>
  <div class="main">
    <div class="section-box shop-template mt-60">
      <div class="container">
        <div class="row mb-100">
          <div class="col-lg-1"></div>
          <div class="col-lg-5">
            <h3>Đăng nhập</h3>
            <p class="font-md color-gray-500">Chào mừng bạn đến với A.L.O!</p>
            <div class="form-register mt-30 mb-30">
              <div class="form-group">
                <label class="mb-2 font-sm color-gray-700">Email <span class="note">*</span></label>
                <input class="form-control" type="text" v-model="form.email" placeholder="Vui lòng nhập email"
                  @input="validateField('email')">
                <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
              </div>
              <div class="form-group">
                <label class="mb-2 font-sm color-gray-700">Password <span class="note">*</span></label>
                <input class="form-control" type="password" v-model="form.password" placeholder="Vui lòng nhập password"
                  @input="validateField('password')">
                <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                </div>
                <div class="col-lg-6 text-end">
                  <div class="form-group">
                    <a class="font-xs color-gray-500 forgot-password" @click="openModalReset">Quên mật khẩu</a>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <input class="font-md-bold btn btn-buy submit" type="submit" value="Đăng nhập" @click="handleLogin">
              </div>
              <div class="mt-20"><span class="font-xs color-gray-500 font-medium">Bạn chưa có tài
                  khoản?</span><router-link class="font-xs color-brand-3 font-medium" to="/register">Đăng kí
                  ngay</router-link></div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="box-login-social pt-65 pl-50">
              <h5 class="text-center">Tài khoản xã hội</h5>
              <div class="box-button-login mt-25">
                <a class="btn btn-login font-md-bold color-brand-3 mb-15" @click="loginWithGoogle">Đăng nhập với<img :src="imgs.google"
                    alt="Ecom"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Teleport to="body">
        <ReSetPassword :showResetModal="showResetModal" @update:showResetModal="showResetModal = $event" />
        <ConfirmEmail
            :showResetModal="showConfirmEmailModal"
            :email="form.email"
            @update:showResetModal="showConfirmEmailModal = $event"
        />
        <ChangePasswordModal
            :showChangePasswordModal="showChangePasswordModal"
            :email="form.email"
            @password-change-success="handlePasswordChangeSuccess"
            @update:showChangePasswordModal="val => showChangePasswordModal = val"
        />
      </Teleport>
    </div>
  </div>
</template>

<script>
import ReSetPassword from '@/components/auth/ResetPass.vue';
import ConfirmEmail from "@/components/auth/ConfirmEmail.vue";
import { getUserRole } from '@/utils/auth';
import imgs from '../../js/images'
import router from "@/router/router.js";
import ChangePasswordModal from "@/components/auth/ChangePassword.vue";
export default {
  components: {
    ReSetPassword,
    ConfirmEmail,
    ChangePasswordModal
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {},
      showResetModal: false,
      showConfirmEmailModal: false,
      imgs,
      showChangePasswordModal: false,
      changePasswordEmail: ''
    }
  },
  methods: {
    openModalReset() {
      this.showResetModal = true;
    },
    openModalConfirmPassword() {
      return new Promise((resolve) => {
        this.showConfirmEmailModal = true;

        const handler = (result) => {
          this.$off('confirm-password-result', handler);
          this.showConfirmEmailModal = false;
          this.$router.push('/trang-chu');
          resolve(result);
        };
      });
    },
    validateField(field) {
      this.errors[field] = '';

      switch (field) {
        case 'email':
          if (!this.form.email) {
            this.errors.email = 'Vui lòng nhập email';
          }
          break;
        case 'password':
          if (!this.form.password) {
            this.errors.password = 'Vui lòng nhập mật khẩu';
          }
          break;
      }
    },
    async loginWithGoogle() {
      await this.$store.dispatch('loginWithGoogle');
      if (getUserRole() === 'Customer') {
        this.$router.push('/list-room-empty');
      }
    },
    async handleLogin() {
      try {
        var response = await this.$store.dispatch('login', {
          email: this.form.email,
          password: this.form.password,
        });
        if(response.Success === true && !response.IsConfirm) {
          const confirmed = await this.openModalConfirmPassword();
          if (!confirmed) return;
        }else if(response.Success === true && !response.IsActive) {
          this.openChangePasswordModal(this.form.email)
        }
        else {
          if (getUserRole() === 'Customer') {
            this.$router.push('/list-room-empty');
          }
          if (getUserRole() === 'Admin') {
            this.$router.push('/admin');
          }
        }

      } catch (error) {
        console.error('Login failed:', error);

      }
    },
    openChangePasswordModal(email) {
      this.changePasswordEmail = email;
      this.showChangePasswordModal = true;
    },
    handlePasswordChangeSuccess() {
      this.showChangePasswordModal = false;
      this.$router.push('/'); // hoặc reload hoặc chuyển trang tuỳ bạn
    }
  }
}
</script>

<style>
.forgot-password {
  cursor: pointer;
}

.forgot-password:hover {
  color: #8C9EC5;
}

.h3 {
  color: #425A8B;
}

.note {
  color: red;
}

.error-message {
  color: red;
  font-style: italic;
  font-size: 12px;
}
</style>