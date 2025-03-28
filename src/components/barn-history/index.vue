<template>
  <div class="container">
    <div class="row">
      <h2>Danh sách đang lưu chuồng</h2>
      <div class="col-md-10">
        <PetsList v-if="viewMode === 'petsList'" :pets="pets"/>
      </div>
    </div>
  </div>
</template>

<script>
import PetsList from './list-pet.vue';
import {getUserId} from "@/utils/auth.js";
import {customerApiPrivate, storeApiPrivate} from "@/api/axios.js";
import {toastError, toastSuccess, toastWarning} from "@/utils/toast.js";

export default {
  components: {
    PetsList,
  },
  data() {
    return {
      viewMode: 'petsList',
      pets: [
      ],
      loading: false,
      totalCount:0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    changeView(view) {
      this.viewMode = view;
    },
    addPetHandler(newPet) {
      this.createPet(newPet);
      this.viewMode = 'petsList';
    },
    fetchPet() {
      this.loading = true;
      var userId = getUserId();
      customerApiPrivate.get(`/api/${userId}/pets?api-version=1.0`, {
        params: {
          PageNumber: this.currentPage,
          pageSize: this.pageSize,
        }
      })
          .then(response => {
            if (response.data.statusCode === 200) {
              const data = response.data.data;
              this.pets = data.data.map(pet => ({
                ...pet,
                birthday: pet.birthday ? new Date(pet.birthday).toISOString().split('T')[0] : '' // Định dạng YYYY-MM-DD
              }));
              this.totalCount = data.totalRecords;
              this.pageSize = data.pageSize;
            } else {
              console.error('Dữ liệu API không đúng định dạng:', response.data);
            }
          })
          .catch(error => {
            toastError("Không thể lấy dữ liệu, vui lòng liên hệ admin!");
            console.error(error);
          })
          .finally(() => {
            this.loading = false;
          });
    },
    createPet(newPet){
      this.isLoading = true;
      try {
        var userId = getUserId();
        const data = new FormData();
        console.log(newPet);
        data.append('name', newPet.name);
        data.append('Type', newPet.type);
        data.append('Gender', newPet.gender);
        data.append('Birthday', newPet.birthday);
        // if (this.form.image) data.append('image', this.form.image);

        customerApiPrivate.post(`/api/${userId}/pets?api-version=1.0`, data, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
            .then(response => {
              if (response.data.statusCode === 200) {
                var message = this.isEditMode ? "" : "Tạo thú nuôi thành công";
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

      } catch (error) {
        console.error('Error creating competition:', error);
        toastError('Có lỗi xảy ra, vui lòng thử lại.');
      }
    },
  },
  created() {
    this.fetchPet();
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>