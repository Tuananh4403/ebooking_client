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
                    <h4>Ưu đãi hôm nay</h4>
                    <div class="price-info">
                        <div class="discount">Giảm {{ selectedRoom.discount }} đ</div>
                    </div>
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
                    <ul>
                        <li>Miễn phí thức ăn 2 bữa/1 ngày</li>
                        <li>Đưa đón miễn phí bán kính 7km</li>
                        <li>Lễ tân 24 giờ</li>
                        <li>Tặng 1 lần spa miễn phí khi lưu trú trên 5 ngày</li>
                    </ul>
                </div>

                <div class="modal-section">
                    <h4>Bài đánh giá</h4>
                    <p>Điểm đánh giá trung bình: {{ selectedRoom.rating }} - Tổng số nhận xét: {{
                        selectedRoom.reviewsCount }}</p>
                    <div class="reviews">
                        <div v-for="review in selectedRoom.reviews" :key="review.id" class="review-box">
                            <p>{{ review.feedback }}</p>
                            <span>- {{ review.username }}</span>
                        </div>
                    </div>
                </div>

                <div class="modal-section">
                    <h4>Mô tả phòng</h4>
                    <p>Bàn lễ tân luôn hoạt động 24 giờ và sẵn sàng đưa rước miễn phí trong bán kính 7km, vì vậy quý
                        khách có thể liên lạc với khách sạn để được hỗ trợ tốt nhất. Với sự tiện lợi khi có thể quan sát
                        "boss yêu" từ xa bất kỳ lúc nào mang đến cảm giác an tâm cho các "sen" đi công tác xa.</p>
                </div>

                <div class="modal-section">
                    <h4>Một số thông tin</h4>
                    <ul>
                        <li>Thời gian nhận phòng: 14:00</li>
                        <li>Thời gian trả phòng: 12:00</li>
                        <li>Đưa rước: miễn phí bán kính dưới 7km</li>
                        <li>Phí đưa đón quá bán kính quy định: 20.000 đ/km</li>
                        <li>Quy định phòng: Số lượng thú cưng tối đa 1 phòng: 2</li>
                    </ul>
                </div>

                <div class="modal-section">
                    <h4>Giá phòng hôm nay</h4>
                    <div class="price-info">
                        <div class="old-price">{{ selectedRoom.oldPrice }} đ</div>
                        <div class="new-price">{{ selectedRoom.newPrice }} đ</div>
                        <button class="book-now-btn" @click="openBookingModal">Đặt ngay</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <BookingModal v-if="showBookingModal" :pets="pets" @close-booking-modal="closeBookingModal" />
    </Teleport>
</template>

<script>
import imgs from '../../../js/images';
import BookingModal from './Booking.vue'
export default {
    components: {
        BookingModal
    },
    data() {
        return {
            imgs,
            showBookingModal: false,
            pets: [
                { id: 1, name: "Chó Poodle" },
                { id: 2, name: "Mèo Maine Coon" },
                { id: 3, name: "Chó Labrador" }
            ],
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
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        openBookingModal() {
            this.showBookingModal = true;
        },
        closeBookingModal() {
            this.showBookingModal = false;
        }
    }
};
</script>

<style scoped>
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
</style>