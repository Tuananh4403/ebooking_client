<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <div class="modal-header">
                <img :src="imgs.hotel" alt="Room Image" class="modal-room-image" />
                <button class="close-btn" @click="closeModal">x</button>
            </div>

            <div class="modal-body">
                <h3>{{ selectedRoom.name }}</h3>

                <div class="modal-section">
<!--                    <h4>Ưu đãi hôm nay</h4>-->
<!--                    <div class="price-info">-->
<!--                        <div class="discount">Giảm {{ selectedRoom.discount }} đ</div>-->
<!--                    </div>-->
                </div>

                <div class="modal-section">
                    <h4>Điểm nổi bật</h4>
                    <ul>
                        <li>Hủy miễn phí khi chưa duyệt</li>
                        <li>Camera riêng xem trực tiếp mọi lúc</li>
                        <li>Tiện nghi đầy đủ: nhà vệ sinh tách biệt phòng ngủ, khay ăn, đệm lót</li>
                    </ul>
                </div>

              <div class="modal-section">
                <h4>Dịch vụ</h4>
                <vue-multiselect
                    v-model="selectedServices"
                    :options="listService"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    label="description"
                    track-by="id"
                    placeholder="Chọn dịch vụ"
                >
                  <template v-slot:option="{ option }">
                    <div class="service-option">
                      <span>{{ option.description }}</span>

                    </div>
                  </template>
                </vue-multiselect>
              </div>

                <div class="modal-section">
                    <h4>Bài đánh giá</h4>
                    <p>Điểm đánh giá trung bình: {{ selectedRoom.rating }} - Tổng số nhận xét: {{
                        selectedRoom.reviewsCount }}</p>
                    <div class="reviews">
                        <div v-for="review in listFeedBack" :key="review.id" class="review-box">
                            <p>{{ review.Content }}</p>
                            <span>- {{ review.CustomerName }}</span>
                        </div>
                    </div>
                </div>

                <div class="modal-section">
                    <h4>Mô tả phòng</h4>
                    <p>{{selectedRoom.description}}</p>
                </div>
              <div class="modal-section row">
                <div class="col-6" >
                  <label>Ngày nhận:</label>
                  <vue-date-picker v-model="checkIn" :min-date="new Date()" :enable-time-picker="false"/>
                </div>
                <div class="col-6" >
                  <label>Ngày trả:</label>
                  <vue-date-picker v-model="checkOut" :min-date="checkIn" :enable-time-picker="false"/>
                </div>
              </div>
                <div class="modal-section">
                    <div class="price-info">
                        <button class="book-now-btn" @click="openBookingModal()">Đặt ngay</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <Teleport to="body">
        <BookingModal v-if="showBookingModal" :pets="pets" @close-booking-modal="closeBookingModal" @submit="submit" />
    </Teleport>
</template>

<script>
import imgs from '../../../js/images';
import BookingModal from './Booking.vue'
import {bookingApiPrivate, customerApiPrivate, storeApiPrivate} from "@/api/axios.js";
import {toastError, toastSuccess, toastWarning} from "@/utils/toast.js";
import {getUserId} from "@/utils/auth.js";
export default {
    components: {
        BookingModal
    },
    data() {
        return {
            imgs,
            showBookingModal: false,
            pets: [],
          listService:[],
          listFeedBack:[],
          pageSize:5,
          currentPage: 1,
          checkIn: '',
          checkOut: '',
          selectedServices: []
        }
    },
    props: {
        selectedRoom: {
            type: Object,
            required: true
        },
        showModal: {
            type: Boolean,
            required: true
        }
    },
    computed: {
      selectedServiceIds() {
        return this.selectedServices.map(service => ({
          serviceId: service.id,
          quantity: 1
        }));
      }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        openBookingModal() {
              this.fetchPet();
            this.showBookingModal = true;
        },
        closeBookingModal() {
            this.showBookingModal = false;
        },
      fetchServices() {
        this.loading = true;
        storeApiPrivate.get('/api/Service?api-version=1.0', {
          params: {
            PageNumber: this.currentPage,
            pageSize: this.pageSize,
          }
        })
            .then(response => {
              if (response.data.statusCode === 200) {
                const data = response.data.data;
                this.listService = data.data;
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
      fetchFeedBack() {
        this.loading = true;
        bookingApiPrivate.get('/api/feedback?api-version=1.0', {
          params: {
            barnId: this.selectedRoom.barnId,
            PageNumber: this.currentPage,
            pageSize: this.pageSize,
          }
        })
            .then(response => {
              if (response.data.statusCode === 200) {
                const data = response.data.data;
                this.listFeedBack = data.data;
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
      fetchPet(){
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
                this.pets = data.data;
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
      submit(selectedPet){
        var data = {
          petId: selectedPet.id,
          petName: selectedPet.name,
          checkinDate: this.checkIn,
          checkoutDate: this.checkOut,
          customerId: getUserId(),
          BarnId: this.selectedRoom.barnId,
          BarnName: this.selectedRoom.name,
          BookingDetailRequest: this.selectedServiceIds
        }
        bookingApiPrivate.post(`/api/booking?api-version=1.0`, data)
            .then(response => {
              if (response.data.statusCode === 200) {
                var message = this.isEditMode ? "" : "Bạn đã đặt phòng thành công vui lòng kiểm tra email để xác nhận";
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
      }
    },
  created() {
      this.fetchServices();
      this.fetchFeedBack();
  }
};
</script>

<style scoped>
@import "vue-multiselect/dist/vue-multiselect.css";
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 70%;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.modal-header {
    position: relative;
}

.modal-room-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    color: #425A8B;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.3s ease, background-color 0.3s ease;
}

.close-btn:hover {
    color: #A0B2C2;
    background-color: rgba(0, 0, 0, 0.1);
}

.modal-body {
    padding: 20px;
}

.modal-section {
    margin-bottom: 20px;
}

.modal-section h4 {
    font-size: 1.2rem;
    font-weight: bold;
    color: #425A8B;
    margin-bottom: 10px;
}

.modal-section li,
.modal-section p {
    color: #6A7C92;
}

.price-info .old-price,
.price-info .new-price,
.price-info .discount {
    margin-bottom: 5px;
}

.price-info .discount {
    color: red;
    font-size: 1.4rem;
    font-weight: bold;
    animation: blink 1s infinite;
}

.reviews .review-box {
    background-color: white;
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.reviews .review-box p {
    color: #6A7C92;
}

.reviews .review-box span {
    font-size: 0.9rem;
    color: #425A8B;
    display: block;
    margin-top: 5px;
}

.price-info .new-price {
    font-size: 2rem;
    color: red;
    font-weight: bold;
    margin-top: 10px;
}

@keyframes blink {
    50% {
        opacity: 0.5;
    }
}

.price-info .old-price {
    font-size: 1.2rem;
    color: #888;
    text-decoration: line-through;
    position: relative;
}

.price-info .book-now-btn {
    background-color: orange;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
    transition: background-color 0.3s ease;
}

.price-info .book-now-btn:hover {
    background-color: #f77b00;
}
.service-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.quantity-input {
  width: 50px;
  margin-left: 10px;
}
</style>