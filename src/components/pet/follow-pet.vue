<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
            <button class="close-button" @click="closeModal">&times;</button>

            <div class="video-section">
                <video controls autoplay>
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                </video>
            </div>

            <div class="dropdown-container">
                <div class="dropdown">
                    <button class="dropdown-button" @click="toggleDropdown('petInfo')">
                        Thông tin thú cưng
                    </button>
                    <div v-if="activeDropdown === 'petInfo'" class="dropdown-content">
                        <div class="info-box">
                            <p><strong>Tên:</strong> {{ listPet.name }}</p>
                            <p><strong>Ngày sinh:</strong> {{ listPet.birthday }}</p>
                            <p><strong>Giới tính:</strong> {{ listPet.gender ? 'Đực' : 'Cái' }}</p>
                            <p><strong>Chủng loại:</strong> {{ listPet.type }}</p>
                        </div>
                    </div>
                </div>

                <div class="dropdown">
                    <button class="dropdown-button" @click="toggleDropdown('bookingInfo')">
                        Thông tin đặt phòng
                    </button>
                    <div v-if="activeDropdown === 'bookingInfo'" class="dropdown-content">
                        <div class="info-box">
                            <p><strong>Khách sạn:</strong> {{ listPet.hotelName || 'Chưa có' }}</p>
                            <p><strong>Phòng:</strong> {{ listPet.roomName || 'Chưa có' }}</p>
                            <p><strong>Thời gian thuê:</strong> {{ listPet.rentTime || 'Chưa có' }}</p>
                            <p><strong>Check-in:</strong> {{ listPet.checkinTime || 'Chưa check-in' }}</p>
                            <p><strong>Check-out:</strong> {{ listPet.checkoutTime || 'Chưa check-out' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        listPet: {
            type: Object,
            default: () => ({
                name: "Milo",
                birthday: "2020-08-15",
                gender: true,
                type: "Chó Poodle",
                hotelName: "PetHomeStay Đà Nẵng",
                roomName: "VIP 101",
                rentTime: "3 ngày",
                checkinTime: "2025-03-20 14:00",
                checkoutTime: "2025-03-23 12:00",
            }),
        },
    },
    data() {
        return {
            activeDropdown: null,
        };
    },
    methods: {
        toggleDropdown(section) {
            this.activeDropdown = this.activeDropdown === section ? null : section;
        },
        closeModal() {
            this.$emit("close");
        }
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 2000;
}

.modal-content {
    background: white;
    width: 60vw;
    max-height: 80vh;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.close-button {
    position: absolute;
    top: -3px;
    right: -8px;
    font-size: 1.5rem;
    background: none;
    border: none;
    color: #425A8B;
    cursor: pointer;
}

.close-button:hover {
    color: rgb(186, 184, 184);
}

.video-section {
    text-align: center;
    margin-bottom: 20px;
}

.video-section video {
    width: 100%;
    border-radius: 10px;
}

.dropdown-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.dropdown {
    width: 100%;
}

.dropdown-button {
    width: 100%;
    padding: 10px;
    background: #425A8B;
    color: white;
    border: none;
    cursor: pointer;
    text-align: left;
    border-radius: 5px;
    font-size: 16px;
}

.dropdown-content {
    margin-top: 5px;
    background: white;
    border-radius: 8px;
    padding: 10px;
}

.info-box {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    background: #f9f9f9;
}
</style>