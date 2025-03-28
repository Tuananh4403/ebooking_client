<template>
    <div class="room-list">
        <div class="row">
            <div v-if="barns.length > 0" class="col-md-4" v-for="room in barns" :key="room.id">
                <div class="room-card" @click="openModal(room)">
                    <img :src="imgs.hotel" alt="Room Image" class="room-image" />


                    <div class="room-info">
                        <h3 class="room-name">{{ room.name }}</h3>
                        <p class="room-location">Vị trí: {{ room.locationResponse != null ? room.locationResponse.description : '' }}</p>
<!--                        <div class="room-rating">-->
<!--                            <span>Điểm đánh giá: {{ room.rating }} - Tổng số đánh giá: {{ room.reviewsCount }}</span>-->
<!--                        </div>-->
                        <p class="room-status">Trạng thái: {{formatBarnStatus(room.status)  }}</p>
                        <button class="book-now-btn">Đặt ngay</button>
                    </div>
                </div>
            </div>
        </div>

        <ModalDetail v-if="showModal" :selectedRoom="selectedRoom" :showModal="showModal" @close-modal="closeModal" />
    </div>
</template>

<script>
import ModalDetail from './modal/RoomDetail.vue';
import imgs from '../../js/images';
import {storeApiPrivate} from "@/api/axios.js";
import {toastError} from "@/utils/toast.js";
import {formatBarnStatus} from "@/constants/barn-status.js"


export default {
    components: {
        ModalDetail
    },
    data() {
        return {
            rooms: [
                {
                    id: 1,
                    name: "Phòng Tiêu Chuẩn",
                    oldPrice: 500000,
                    newPrice: 400000,
                    discount: 100000,
                    location: "Chuồng 1, Tầng 2, Lầu 1",
                    rating: 4.5,
                    reviewsCount: 120,
                    status: "Đang được đặt",
                    reviews: [
                        { id: 1, feedback: "Phòng tuyệt vời!", username: "User1" },
                        { id: 2, feedback: "Rất hài lòng.", username: "User2" }
                    ]
                },
                {
                    id: 2,
                    name: "Phòng VIP",
                    oldPrice: 800000,
                    newPrice: 700000,
                    discount: 100000,
                    location: "Chuồng 2, Tầng 3, Lầu 2",
                    rating: 4.8,
                    reviewsCount: 200,
                    status: "Phòng trống",
                    reviews: [
                        { id: 1, feedback: "Rất thoải mái, sẽ quay lại.", username: "User3" },
                        { id: 2, feedback: "Không gian yên tĩnh, dịch vụ tuyệt vời.", username: "User4" }
                    ]
                }
            ],
            selectedRoom: null,
            showModal: false,
            imgs,
          loading: false,
          barns: []
        };
    },
    methods: {
        openModal(room) {
            this.selectedRoom = room;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedRoom = null;
        },
      fetchBarn() {
        this.loading = true;
        storeApiPrivate.get('/api/BarnDetails?api-version=1.0', {
          params: {
            PageNumber: this.currentPage,
            pageSize: this.pageSize,
            status: 2
          }
        })
            .then(response => {
              if (response.data.statusCode === 200) {
                const data = response.data.data;
                this.barns = data.data;
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
      formatBarnStatus(status) {
          return formatBarnStatus(status);
      }
    },
  created(){
    this.fetchBarn();
  }
};
</script>

<style scoped>
.room-list {
    padding: 20px;
}

.room-card {
    border: 1px solid gray;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    transition: all 0.3s;
    position: relative;
    cursor: pointer;
}

.room-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.room-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid gray;
    border-radius: 8px 8px 0 0;
}

.price-box {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.old-price {
    font-size: 0.9rem;
    color: black;
    text-decoration: line-through;
    margin-bottom: 5px;
}

.new-price {
    font-size: 1.3rem;
    color: red;
    font-weight: bold;
    margin-bottom: 5px;
}

.discount {
    font-size: 1rem;
    color: darkgreen;
}

.room-info {
    padding: 15px;
}

.room-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.room-location {
    font-size: 0.9rem;
    color: gray;
    margin-bottom: 10px;
}

.room-rating {
    font-size: 1rem;
    margin-bottom: 10px;
}

.room-status {
    font-size: 1rem;
    color: gray;
    margin-bottom: 20px;
}

.book-now-btn {
    background-color: #ff8c00;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    width: 100%;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
}

.book-now-btn:hover {
    background-color: #ff6f00;
    animation: blink 1s infinite;
}

@keyframes blink {
    50% {
        background-color: #ffb84d;
    }
}
</style>