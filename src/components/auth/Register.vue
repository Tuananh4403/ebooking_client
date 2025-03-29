<template>
  <div class="main">
    <div class="section-box shop-template mt-60">
      <div class="container">
        <div class="row mb-100">
          <div class="col-lg-1"></div>
          <div class="col-lg-5">
            <h3>Đăng kí</h3>
            <div class="form-register mt-30 mb-30">
              <div class="form-group">
                <label class="mb-2 font-sm color-gray-700">Họ và Tên <span class="note">*</span></label>
                <input class="form-control" type="text" v-model="form.fullName" placeholder="Nguyễn Văn A"
                  @input="validateField('fullName')">
                <div v-if="errors.fullName" class="error-message">{{ errors.fullName }}</div>
              </div>
              <div class="form-group">
                <label class="mb-2 font-sm color-gray-700">Email <span class="note">*</span></label>
                <input class="form-control" type="text" v-model="form.email" placeholder="a@gmail.com"
                  @input="validateField('email')">
                <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
              </div>
              <div class="form-group">
                <label class="mb-2 font-sm color-gray-700">Số điện thoại <span class="note">*</span></label>
                <input class="form-control" type="text" v-model="form.phone" placeholder="09********"
                  @input="validateField('phone')">
                <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
              </div>
              <div class="form-group">
                <label class="mb-2 font-sm color-gray-700">Địa chỉ <span class="note">*</span></label>
                <input class="form-control" type="text" v-model="form.address"
                  placeholder="Đường A, Phường B, Thành phố C" @input="validateField('address')">
                <div v-if="errors.address" class="error-message">{{ errors.address }}</div>
              </div>
              <div class="form-group">
                <label class="mb-2 font-sm color-gray-700">Giới tính <span class="note">*</span></label>
                <select class="form-control" v-model="form.gender" @change="validateField('gender')">
                  <option value="">Chọn giới tính</option>
                  <option :value="true">Nam</option>
                  <option :value="false">Nữ</option>
                </select>
                <div v-if="errors.gender" class="error-message">{{ errors.gender }}</div>
              </div>
              <div class="form-group">
                <label class="mb-2 font-sm color-gray-700">Ngày sinh <span class="note">*</span></label>
                <input class="form-control" type="date" v-model="form.birthDate" @change="validateField('birthDate')">
                <div v-if="errors.birthDate" class="error-message">{{ errors.birthDate }}</div>
              </div>
              <div class="form-group">
                <label class="mb-2 font-sm color-gray-700">Mật khẩu <span class="note">*</span></label>
                <input class="form-control" type="password" v-model="form.password" placeholder="******************"
                  @input="validateField('password')">
                <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
              </div>
              <div class="form-group">
                <label class="mb-2 font-sm color-gray-700">Xác nhận mật khẩu <span class="note">*</span></label>
                <input class="form-control" type="password" v-model="form.confirmPassword"
                  placeholder="******************" @input="validateField('confirmPassword')">
                <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
              </div>
              <div class="form-group">
                <input class="font-md-bold btn btn-buy" type="submit" value="Đăng kí" @click="handleSubmit">
              </div>
              <div class="mt-20"><span class="font-xs color-gray-500 font-medium">Bạn đã có tài khoản?</span>
                <router-link class="font-xs color-brand-3 font-medium" to="/login">
                  Đăng nhập
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="box-login-social pt-65 pl-50">
              <h5 class="text-center">Tài khoản xã hội</h5>
              <div class="box-button-login mt-25">
                <a class="btn btn-login font-md-bold color-brand-3 mb-15">Đăng nhập với<img :src="imgs.google"
                    alt="Ecom"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgs from '../../js/images'
import { apiClient } from "@/api/axios.js";
import { toastWarning, toastSuccess } from "@/utils/toast.js";

export default {
  data() {
    return {
      imgs,
      form: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        birthDate: '',
        password: '',
        confirmPassword: ''
      },
      errors: {}
    }
  },
  methods: {
    validateField(field) {
      this.errors[field] = '';

      switch (field) {
        case 'fullName':
          if (!this.form.fullName) {
            this.errors.fullName = 'Vui lòng nhập Họ và Tên';
          }
          break;
        case 'email':
          const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|edu\.vn)$/;
          if (!this.form.email) {
            this.errors.email = 'Vui lòng nhập Email';
          } else if (!emailPattern.test(this.form.email)) {
            this.errors.email = 'Vui lòng nhập email đúng định dạng (ví dụ: a@gmail.com hoặc a@edu.vn)';
          }
          break;
        case 'phone':
          const phonePattern = /^[0-9]{10}$/;
          if (!this.form.phone) {
            this.errors.phone = 'Vui lòng nhập số điện thoại';
          } else if (!phonePattern.test(this.form.phone)) {
            this.errors.phone = 'Vui lòng nhập đủ 10 chữ số từ 0 đến 9';
          }
          break;
        case 'address':
          if (!this.form.address) {
            this.errors.address = 'Vui lòng nhập Địa chỉ';
          }
          break;
        case 'gender':
          if (!this.form.gender) {
            this.errors.gender = 'Vui lòng chọn Giới tính';
          }
          break;
        case 'birthDate':
          const today = new Date().toISOString().split('T')[0];
          if (!this.form.birthDate) {
            this.errors.birthDate = 'Vui lòng chọn Ngày sinh';
          } else if (this.form.birthDate === today) {
            this.errors.birthDate = 'Vui lòng không chọn ngày sinh là ngày hiện tại';
          } else if (this.form.birthDate > today) {
            this.errors.birthDate = 'Vui lòng không chọn ngày sinh lớn hơn ngày hiện tại';
          }
          break;
        case 'password':
          const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
          if (!this.form.password) {
            this.errors.password = 'Vui lòng nhập Mật khẩu';
          } else if (!passwordPattern.test(this.form.password)) {
            this.errors.password = 'Vui lòng nhập mật khẩu ít nhất 8 đến 16 kí tự trong đó có ít nhất 1 kí tự viết thường, 1 kí tự viết hoa, 1 chữ số và 1 kí tự đặc biệt';
          }
          break;
        case 'confirmPassword':
          if (this.form.confirmPassword !== this.form.password) {
            this.errors.confirmPassword = 'Mật khẩu xác nhận không khớp với Mật khẩu đã nhập';
          }
          break;
      }
    },
    handleSubmit() {
      var data = {}
      apiClient.post('/api/account/register?api-version=1.0', JSON.stringify({
        username: this.form.email,
        fullName: this.form.fullName,
        email: this.form.email,
        phoneNumber: this.form.phone,
        password: this.form.password,
        gender: this.form.gender,
        address: this.form.address,
        BirthDate: this.form.birthDate,
        roleName: 'Customer',
      }), {
        headers: {
          "Content-Type": "application/json",
        }
      },)
        .then(response => {
          if (response.data.statusCode == 200) {
            toastSuccess(data.message || 'Registration successful');
            const router = this.$router;
            router.push('/login');
          } else {
            toastWarning(data.message || 'An error occurred during registration');
          }
        })
    }
  }
}
</script>

<style>
h3,
label {
  color: #425A8B;
}

.note {
  color: red;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder,
input[type="date"]::placeholder {
  color: #8C9EC5;
}

select {
  color: #8C9EC5;
}

select option {
  color: #8C9EC5;
}

input[type="date"] {
  color: #8C9EC5;
}

.form-control {
  color: #8C9EC5 !important;
}

.error-message {
  color: red;
  font-style: italic;
  font-size: 12px;
}
</style>