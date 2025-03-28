<template>
    <div>
        <header class="header">
            <div class="header-background">
                <img :src="imgs.hotelBackground" alt="Header Background">
            </div>
            <div class="content-wrapper">
                <div class="info-box" v-for="(info, index) in headerInfo" :key="index">
                    <h2>{{ info.title }}</h2>
                    <p>{{ info.description }}</p>
                </div>
            </div>
        </header>

        <section class="top-rooms">
            <h1 class="title">Top các phòng được thuê nhiều nhất</h1>
            <div class="rooms-container">
                <div v-for="room in topRooms" :key="room.id" class="room-box">
                    <span class="discount-label" v-if="room.discount">Giảm {{ room.discount }}%</span>
                    <div class="room-image">
                        <img :src="imgs.room" :alt="room.name">
                    </div>
                    <div class="room-info">
                        <h2>{{ room.name }}</h2>
                        <p>Giá: {{ room.price }} / ngày</p>
                        <p>Trạng thái: <span :class="getStatusClass(room.status)">{{ room.status }}</span></p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import imgs from "../../js/images";

export default {
    data() {
        return {
            imgs,
            headerInfo: [
                { title: "Chăm sóc thú cưng", description: "Đầy đủ đồ chơi giải trí cho thú cưng" },
                { title: "Khách sạn hàng đầu", description: "Có camera xem thú cưng bất kì lúc nào" },
                { title: "Thức ăn", description: "Thức ăn đảm bảo vệ sinh" }
            ],
            topRooms: [
                { id: 1, name: "Phòng VIP 1", price: "500.000 VND", status: "Còn trống", img: imgs.room1, discount: 20 },
                { id: 2, name: "Phòng Deluxe", price: "400.000 VND", status: "Đã đặt", img: imgs.room2 },
                { id: 3, name: "Phòng Standard", price: "300.000 VND", status: "Còn trống", img: imgs.room3 }
            ],
        };
    },
    methods: {
        getStatusClass(status) {
            return status === "Còn trống" ? "status-available" : "status-booked";
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    width: 100%;
    height: 250px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.header-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.header-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
}

.header-background::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.content-wrapper {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 1200px;
    position: relative;
    z-index: 1;
    margin-bottom: 10px;
}

.info-box {
    background: rgba(200, 200, 200, 0.8);
    padding: 15px;
    text-align: center;
    border-radius: 10px;
    width: 30%;
}

.info-box h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}

.info-box p {
    font-size: 14px;
    margin: 0;
}

.title {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
}

.rooms-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
}

.room-box {
    position: relative;
    display: flex;
    width: 100%;
    max-width: 500px;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}

.room-box:hover {
    transform: translateY(-5px);
}

.discount-label {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    font-size: 14px;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 12px;
}

.room-image {
    width: 50%;
    height: 150px;
    overflow: hidden;
}

.room-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.room-info {
    width: 50%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.room-info h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}

.room-info p {
    font-size: 16px;
    margin: 5px 0;
}

.status-available {
    color: green;
    font-weight: bold;
}

.status-booked {
    color: red;
    font-weight: bold;
}

.services-container {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.service-box {
    width: 30%;
    text-align: center;
}

.service-box img {
    width: 100px;
    height: 100px;
}

.reviews-container {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.review-box {
    width: 40%;
    text-align: center;
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
}

.footer {
    text-align: center;
    padding: 20px;
    background: #333;
    color: white;
}
</style>
