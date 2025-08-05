<template>
  <div class="container">
    <div class="row">
      <h2>Danh sách đang lưu chuồng</h2>
      <div class="col-md-10">
        <PetsList v-if="viewMode === 'petsList'" :pets="barnHistory"/>
      </div>
    </div>
  </div>
</template>

<script>
import PetsList from './list-pet.vue';
import {getUserId} from "@/utils/auth.js";
import {customerApiPrivate, storeApiPrivate} from "@/api/axios.js";
import {toastError, toastSuccess, toastWarning} from "@/utils/toast.js";
import {formatDate} from "@/utils/common.js";
import images from "@/js/images.js";
const customerServiceUrl = import.meta.env.VITE_CUSTOMER_SERVICE_URL;

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
      barnHistory: []
    };
  },
  setup() {
    const formatDateTime = (date) => {
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format; change to true for 12-hour format with AM/PM
      });
    };
    return { formatDateTime };
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
      customerApiPrivate.get(`/api/history-barn?customerId=${userId}&api-version=1.0`, {
        params: {
          PageNumber: this.currentPage,
          pageSize: this.pageSize,
        }
      })
          .then(response => {
            if (response.data.statusCode === 200) {
              const data = response.data.data;
              console.log(data)
              this.barnHistory = data.data.map(history => ({
                ...history,
                image: history.pet.imagePath != null ? customerServiceUrl+ '/' + history.pet.imagePath : images.meo,
                customerName: history.customer.name,
                petName: history.pet.name,
                barnName: history.barnName,
                timeIn: history.timeIn != null ? formatDate(history.timeIn) : null,
                timeOut: history.timeOut != null ? formatDate(history.timeOut) : null,
                birthday: formatDate(history.pet.birthday),
                petGender: history.pet.gender ? "Đực" : "Cái",
                petType: history.pet.type == 'dog' ? "Chó" : "Mèo"
                // Định dạng YYYY-MM-DD
              }));
              console.log(this.barnHistory)
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