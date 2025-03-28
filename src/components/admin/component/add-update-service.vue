<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="icon-group">
        <div class="redo-icon" @click="handleRedo">
          <font-awesome-icon :icon="['fas', 'redo-alt']" />
        </div>
        <div class="close-icon" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'times-circle']" />
        </div>
      </div>
      <h2 v-if="serviceId != null" class="form-title">Cập Nhật Dịch Vụ</h2>
      <h2 v-else class="form-title">Tạo Dịch Vụ Mới</h2>

      <form>
        <div class="form-group-row">
          <div class="form-group">
            <label for="name">Nhập tên dịch vụ:<span class="required">*</span></label>
            <input type="text" id="name" v-model="name" :disabled="isLoading" required
              placeholder="Vui lòng nhập tên dịch vụ... ">
          </div>

        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="description">Mô tả:<span class="required">*</span></label>
            <input type="text" id="description" v-model="description" :disabled="isLoading" required
              placeholder="Vui lòng nhập mô tả...">
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="description">Giá:<span class="required">*</span></label>
            <input type="text" id="description" v-model="price" :disabled="isLoading" required v-number-format
              placeholder="Vui lòng nhập giá tiền...">
          </div>
        </div>
        <div class="button-group">
          <button v-if="serviceId == null" type="submit" :disabled="isLoading" @click="submitForm">
            {{ isLoading ? 'Đang xử lý...' : 'Tạo mới' }}
          </button>
          <button v-else type="submit" :disabled="isLoading" @click="submitDataUpdate">
            {{ isLoading ? 'Đang xử lý...' : 'Cập nhật' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { storeApiPrivate } from '@/api/axios.js';
import { toastError, toastSuccess, toastWarning } from "@/utils/toast.js";
import { formatNumber } from "@/utils/format.js";

export default {
  name: 'AddUpdateService',
  props: {
    serviceId: { 
      type: String,
      default: null
    }
  },
  data() {
    return {
      name: '',
      description: '',
      price: 0,
      isEditMode: false,
      isLoading: false,
      service: null,
    };
  },
  methods: {
    fetchLocationDetails(id) {
      try {
        storeApiPrivate.get(`/api/service/${id}?api-version=1.0`)
          .then(response => {
            if (response.data.statusCode === 200) {
              this.service = response.data.data;
              this.name = this.service.name;
              this.description = this.service.description;
              this.price = this.service.price
            }
          });
      } catch (error) {
        console.error('Error fetching barn details:', error);
      }
    },
    submitForm() {
      this.isLoading = true;
      try {
        const data = {
          name: this.name,
          description: this.description,
          price: this.price.replace(/[^0-9.-]+/g, '')
        }

        storeApiPrivate.post('/api/service?api-version=1.0', data)
          .then(response => {
            if (response.data.statusCode === 200) {
              var message = this.isEditMode ? "" : "Tạo chuồng thành công";
              toastSuccess(message);
            }
          })
          .catch(error => {
            toastWarning("Lưu dữ liệu thất bại, vui lòng thử lại!")
            console.error('Error fetching barn details:', error);
          })
          .finally(() => {
            this.isLoading = true;
          });
        this.closeModal();
      } catch (error) {
        console.error('Error creating competition:', error);
      }
    },
    submitDataUpdate() {
      this.isLoading = true;
      try {
        const data = {
          name: this.name,
          description: this.description,
          price: this.price.replace(/[^0-9.-]+/g, '')

        }
        storeApiPrivate.put(`/api/service/${this.service.id}?api-version=1.0`, data, {
          headers: { "Content-Type": "application/json" },
        })
          .then(response => {
            if (response.data.statusCode === 200) {
              var message = "Cập nhật chuồng thành công";
              toastSuccess(message);
            }
          })
          .catch(error => {
            toastWarning("Lưu dữ liệu thất bại, vui lòng thử lại!")
            console.error('Error fetching barn details:', error);
          })
          .finally(() => {
            this.isLoading = true;
          });

        this.closeModal();
      } catch (error) {
        console.error('Error creating competition:', error);
      }
    },
    closeModal() {
      this.resetForm();
      this.$emit('close');
    },

    handleRedo() {
      this.resetForm();
    },

    resetForm() {
      this.name = ''
      this.description = ''

      this.barn = null
    },
  },

  created() {
    if (this.serviceId) {
      this.isEditMode = true;
      this.fetchLocationDetails(this.serviceId);
    }
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  padding: 20px;
}

.icon-group {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.redo-icon,
.close-icon {
  cursor: pointer;
  font-size: 30px;
  margin-left: 10px;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.form-group-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1 1 30%;
  margin-right: 15px;
}

.form-group:first-child {
  flex: 1 1 35%;
}

.form-group:nth-child(2) {
  flex: 1 1 35%;
}

.form-group:nth-child(3) {
  flex: 1 1 30%;
}

input[type="text"],
input[type="file"],
input[type="number"],
.vue-multiselect {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border 0.3s;
}

input[type="text"]:focus,
input[type="date"]:focus,
input[type="number"]:focus {
  border: 1px solid #007bff;
  outline: none;
}

.button-group {
  text-align: center;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.rank-grid th,
.rank-grid td {
  padding: 15px;
  text-align: center;
  border: 1px solid #ddd;
}

.rank-grid th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.rank-grid td select,
.rank-grid td input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.rank-grid button {
  background-color: #0056b3;
  border: none;
  padding: 5px 10px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}

.rank-grid button:hover {
  background-color: #0056b3;
}
</style>
