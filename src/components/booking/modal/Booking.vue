<template>
    <div class="booking-modal-overlay" @click.self="closeModal">
        <div class="booking-modal-content">
            <button class="close-btn" @click="closeModal">x</button>

            <h3>Đặt phòng</h3>

            <div class="modal-section">
                <label for="pet-select">Thú cưng:</label>
                <select v-model="selectedPet" id="pet-select" required>
                    <option disabled value="">Vui lòng chọn thú cưng của bạn</option>
                    <option v-for="pet in pets" :key="pet.id" :value="pet">{{ pet.name }}</option>
                </select>
            </div>

            <div class="confirm-btn-container">
                <button class="confirm-btn" @click="confirmBooking">Xác nhận</button>
            </div>
        </div>
    </div>
</template>

<script>
import {toastWarning} from "@/utils/toast.js";

export default {
    props: {
        pets: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedPet: ""
        };
    },
    methods: {
        closeModal() {
            this.$emit('close-booking-modal');
        },
        confirmBooking() {
            if (this.selectedPet) {
              console.log(this.selectedPet);
              this.$emit('submit', this.selectedPet);
              this.closeModal()
            } else {
                toastWarning("Vui lòng chọn thú cưng")
            }
        }
    }
};
</script>

<style scoped>
.booking-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
}

.booking-modal-content {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
}

.booking-modal-content h3 {
    margin-bottom: 20px;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.confirm-btn {
    background-color: #425A8B;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 10px;
}

.confirm-btn:hover {
    background-color: #7d8aa3;
}

.modal-section {
    margin-bottom: 20px;
}

.modal-section label {
    font-weight: bold;
}

.modal-section select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    margin-top: 5px;
}

.confirm-btn-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>