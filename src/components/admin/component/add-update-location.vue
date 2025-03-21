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

      <h2 class="form-title">TẠO MỚI CHUỒNG</h2>

      <form @submit.prevent="submitForm">
        <div class="form-group-row">
          <div class="form-group">
            <label for="name">Nhập tên chuồng:<span class="required">*</span></label>
            <input type="text" id="name" v-model="form.name" required placeholder="Vui lòng nhập tên chuồng...">
          </div>

        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="description">Mô tả:<span class="required">*</span></label>
            <input type="text" id="description" v-model="form.description" required placeholder="Vui lòng nhập mô tả...">
          </div>
          <div class="form-group">
            <label for="image">Tải lên hình ảnh:</label>
            <input type="file" id="image" @change="handleImageUpload" accept="image/*" required>
          </div>

        </div>

        <!-- Row 3: Nhân viên -->
        <div class="form-group-row">
          <div class="form-group">
            <label for="type">Loại:<span class="required">*</span></label>
            <vue-multiselect v-model="selectedType"
                             :options="types"
                             :multiple="false"
                             placeholder="Chọn loại"
                             label="name"
                             track-by="userId"
                             :searchable="true"
                             @search-change="fetchBarnType($event)"
                             @open="fetchBarnType('')">
            </vue-multiselect>
          </div>
          <div class="form-group">
            <label for="location">Vị trí:<span class="required">*</span></label>
            <vue-multiselect
                v-model="selectedLocation"
                :options="locations"
                :multiple="false"
                placeholder="Chọn vị trí"
                label="name"
                track-by="id"
                :searchable="true"
                @search-change="fetchLocation($event)"
                @open="fetchLocation('')">
            </vue-multiselect>
          </div>
          <div class="form-group">
            <label for="location">Camera:<span class="required">*</span></label>
            <vue-multiselect
                v-model="selectedCamera"
                :options="cameras"
                :multiple="false"
                placeholder="Chọn camera"
                label="name"
                track-by="id"
                :searchable="true"
                @search-change="fetchCamera($event)"
                @open="fetchCamera('')">
            </vue-multiselect>
          </div>
        </div>


        <!-- Submit Button -->
        <div class="button-group">
          <button type="submit">Tạo mới</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { axiosPrivate } from '@/api/axios.js';

export default {
  name: 'AddUpdateLocation',
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
      types: [
        {
          id: 1,
          name: "test"
        }
      ],
      locations: [],
      cameras: [], // Added ranks
      selectedType: '',
      selectedLocation: '',
      selectedCamera: '',
      rankGrid: [{ rankId: null, startDate: '', endDate: '' }],
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
      axiosPrivate.get(endpoint, { params: { pageNumber: 1, pageSize: 20, ...queryParams } })
          .then(response => {
            this[targetArray] = response.data.data.items.map(mapCallback);
          })
          .catch(error => console.error(`Error fetching ${targetArray}:`, error));
    },

    fetchCamera(searchTerm) {
      this.fetchOptions('/api/reward', 'rewards', (r) => ({
        id: r.id,
        name: r.name
      }), { Info: searchTerm });
    },

    fetchLocation(searchTerm) {
      this.fetchOptions('/api/rank', 'ranks', (r) => ({
        id: r.id,
        name: r.name,
      }), { Info: searchTerm });
    },

    fetchBarnType(searchTerm) {
      this.fetchOptions('/api/user/staffs', 'staffs', (s) => ({
        userId: s.userId,
        name: s.fullName,
      }), { Info: searchTerm });
    },

    addRankRow() {
      this.rankGrid.push({ rankId: null, startDate: '', endDate: '' });
    },

    removeRankRow(index) {
      if (this.rankGrid.length > 1) {
        this.rankGrid.splice(index, 1);
      }
    },

    async submitForm() {
      try {
        const data = new FormData();
        data.append('name', this.form.name);
        data.append('description', this.form.description);
        data.append('barnTypeId', this.selectedType.id);
        data.append('locationId', this.selectedLocation.id);
        data.append('cameraId', this.selectedCamera.id);
        if (this.form.image) data.append('image', this.form.image);
        const response = await axiosPrivate.post('/api/barn-detail', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        this.closeModal();
      } catch (error) {
        console.error('Error creating competition:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại.');
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
      this.form = { name: '', description: '', dateStart: null, dateEnd: null, time: null, RegisterFee: null, image: null };
      this.selectedStaffs = [];
      this.selectedRewards = [];
      this.rankGrid = [{ rankId: null, startDate: '', endDate: '' }];
    },
  },

  created() {
    // this.fetchRewards('');
    // this.fetchRanks('');
    // this.fetchStaffs('');
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
  font-size: 20px;
  margin-left: 10px;
  color: #007bff;
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

.rank-grid th, .rank-grid td {
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
