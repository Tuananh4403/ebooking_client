<template>
    <div class="room-list-horizontal">
        <div class="room-card" v-for="room in rooms" :key="room.id" @click="openModal(room)">
            <img :src="imgs.hotel" alt="Room Image" class="room-image" />
            <div class="room-info">
                <h3 class="room-name">{{ room.name }}</h3>
                <p class="room-location">Khách hàng: {{ room.customer }}</p>
                <p class="room-location">Thú cưng: {{ room.pet }}</p>
                <p class="room-status">Ngày đặt phòng: {{ room.date }}</p>
                <p class="room-status">Trạng thái xét duyệt: {{ room.status }}</p>
                <button class="book-now-btn">Hủy phòng</button>
            </div>
        </div>

        <ModalDetail v-if="showModal" :selectedRoom="selectedRoom" :showModal="showModal" @close-modal="closeModal" />
    </div>
</template>

<script>
import ModalDetail from './modal/RoomDetail.vue';
import imgs from '../../js/images';

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
                    status: "Chưa duyệt",
                    customer: "Nguyễn Lê Chi",
                    pet: "Destiny",
                    date: "03/03/2025",
                },
                {
                    id: 2,
                    name: "Phòng VIP",
                    status: 'Đã duyệt',
                    customer: "Phạm Trần Anh Tuấn",
                    pet: "Dorry",
                    date: "03/03/2025",
                }
            ],
            selectedRoom: null,
            showModal: false,
            imgs
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
        }
    }
};
</script>

<style scoped>
.room-list-horizontal {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.room-card {
    display: flex;
    border: 1px solid gray;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
}

.room-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.room-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px 0 0 8px;
}

.room-info {
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
}

.room-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.room-location {
    font-size: 1rem;
    color: gray;
    margin-bottom: 10px;
}

.room-rating {
    font-size: 1rem;
    margin-bottom: 10px;
    color: gray;
}

.room-status {
    font-size: 1rem;
    color: gray;
    margin-bottom: 10px;
}

.price-box {
    margin-top: 20px;
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

.book-now-btn {
    background-color: #ff8c00;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    width: 100%;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
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