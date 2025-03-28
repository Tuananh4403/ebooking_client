<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="icon-group">
        <div class="redo-icon" @click="handleRedo">
          <font-awesome-icon :icon="['fas', 'redo-alt']" />
        </div>
        <div class="close-icon" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'times-circle']" />
        </div>
      </div>
      <h2 v-if="barnId != null" class="form-title">Cập nhật chuồng</h2>
      <h2 v-else class="form-title">Tạo Chuồng Mới</h2>

      <form>
        <div class="form-group-row">
          <div class="form-group">
            <label for="name">Nhập tên chuồng:<span class="required">*</span></label>
            <input type="text" id="name" v-model="form.name" :disabled="isLoading" required
              placeholder="Vui lòng nhập tên chuồng... ">
          </div>

        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="description">Mô tả:<span class="required">*</span></label>
            <input type="text" id="description" v-model="form.description" :disabled="isLoading" required
              placeholder="Vui lòng nhập mô tả...">
          </div>
          <div class="form-group">
            <label for="image">Tải lên hình ảnh:</label>
            <input type="file" id="image" @change="handleImageUpload" :disabled="isLoading" accept="image/*">
          </div>

        </div>

        <div class="form-group-row">
          <div class="form-group">
            <label for="type">Loại:<span class="required">*</span></label>
            <vue-multiselect v-model="selectedType" :options="types" :multiple="false" placeholder="Chọn loại"
              label="name" track-by="userId" :searchable="true" selectLabel="" selectedLabel="" deselectLabel=""
              @search-change="fetchBarnType($event)" :disabled="isLoading" @open="fetchBarnType('')">

              <template #noResult>
                <span class="no-results-text">Không tìm thấy</span>
              </template>
              <template #noOptions>
                <span class="no-results-text">Không tìm thấy</span>
              </template>
            </vue-multiselect>
          </div>
          <div class="form-group">
            <label for="location">Vị trí:<span class="required">*</span></label>
            <vue-multiselect v-model="selectedLocation" :options="locations" :multiple="false" placeholder="Chọn vị trí"
              label="name" track-by="id" :searchable="true" selectLabel="" selectedLabel="" deselectLabel=""
              :disabled="isLoading" @search-change="fetchLocation($event)" @open="fetchLocation('')">
              <template #noResult>
                <span class="no-results-text">Không tìm thấy</span>
              </template>
              <template #noOptions>
                <span class="no-results-text">Không tìm thấy</span>
              </template>
            </vue-multiselect>
          </div>
          <div class="form-group">
            <label for="location">Camera:<span class="required">*</span></label>
            <vue-multiselect v-model="selectedCamera" :options="cameras" :multiple="false" placeholder="Chọn camera"
              label="name" track-by="id" :searchable="true" selectLabel="" selectedLabel="" deselectLabel=""
              :disabled="isLoading" @search-change="fetchCamera($event)" @open="fetchCamera('')">
              <template #noResult>
                <span class="no-results-text">Không tìm thấy</span>
              </template>
              <template #noOptions>
                <span class="no-results-text">Không tìm thấy</span>
              </template>
            </vue-multiselect>
          </div>
        </div>
        <div class="button-group">
          <button v-if="barnId == null" type="submit" :disabled="isLoading" @click="submitForm">
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

export default {
  name: 'AddUpdateBarn',
  props: {
    barnId: { 
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        dateStart: null,
        dateEnd: null,
        time: null,
        RegisterFee: null,
        image: null,
      },
      types: [],
      locations: [],
      cameras: [],
      selectedType: '',
      selectedLocation: '',
      selectedCamera: '',
      isEditMode: false,
      isLoading: false,
      barn: null
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file && file.size <= 5 * 1024 * 1024) {
        this.form.image = file;
      } else {
        alert('Vui lòng chọn hình ảnh có kích thước nhỏ hơn 5MB.');
      }
    },

    fetchOptions(endpoint, targetArray, mapCallback, queryParams = {}) {
      storeApiPrivate.get(endpoint + '?api-version=1.0', { params: { pageNumber: 1, pageSize: 20, ...queryParams } })
        .then(response => {
          if (response.data.data.data.length > 0) {
            this[targetArray] = response.data.data.data.map(mapCallback);
          }
        })
        .catch(error => console.error(`Error fetching ${targetArray}:`, error));
    },

    fetchCamera(searchTerm) {
      this.fetchOptions('/api/Camera', 'cameras', (r) => ({
        id: r.id,
        name: r.name
      }), { name: searchTerm });
    },

    fetchLocation(searchTerm) {
      this.fetchOptions('/api/Location', 'locations', (r) => ({
        id: r.id,
        name: r.name,
      }), { name: searchTerm });
    },

    fetchBarnType(searchTerm) {
      this.fetchOptions('/api/BarnType', 'types', (s) => ({
        id: s.id,
        name: s.name,
      }), { name: searchTerm });
    },
    fetchBarnDetails(id) {
      try {
        storeApiPrivate.get(`/api/barnDetails/${id}?api-version=1.0`)
          .then(response => {
            if (response.data.statusCode === 200) {
              this.barn = response.data.data;
              this.form.name = this.barn.name;
              this.form.description = this.barn.description;
              this.selectedType = this.barn.barnTypeResponse;
              this.selectedLocation = this.barn.locationResponse;
              this.selectedCamera = this.barn.cameraResponse;
            }
          });
      } catch (error) {
        console.error('Error fetching barn details:', error);
      }
    },
    submitForm() {
      this.isLoading = true;
      try {
        const data = new FormData();
        data.append('name', this.form.name);
        data.append('description', this.form.description);
        data.append('barnTypeId', this.selectedType.id);
        data.append('locationId', this.selectedLocation.id);
        data.append('cameraId', this.selectedCamera.id ?? "");
        if (this.form.image) data.append('image', this.form.image);

        storeApiPrivate.post('/api/barnDetails?api-version=1.0', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
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
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    },
    submitDataUpdate() {
      this.isLoading = true;
      try {
        const data = {
          name: this.form.name,
          description: this.form.description,
          barnTypeId: this.selectedType ? this.selectedType.id : '',
          locationId: this.selectedLocation ? this.selectedLocation.id : '',
          cameraId: this.selectedCamera ? this.selectedCamera.id : '',
        }

        storeApiPrivate.put(`/api/barnDetails/${this.id}?api-version=1.0`, data, {
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
      this.form = {
        name: '',
        description: '',
        dateStart: null,
        dateEnd: null,
        time: null,
        RegisterFee: null,
        image: null,
      };
      this.selectedLocation = '';
      this.selectedCamera = '';
      this.selectedType = '';
      this.types = []
      this.locations = []
      this.cameras = []
      this.barn = null
    },
  },

  created() {
    if (this.barnId) {
      this.isEditMode = true;
      this.fetchBarnDetails(this.barnId);
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

.rank-grid {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
