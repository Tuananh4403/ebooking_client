<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <button @click="$emit('close')" class="close-btn">✖</button>
            <h2>Nhập mã check-in</h2>
            <input type="text" v-model="checkinCode" class="input-code" placeholder="Nhập mã..." />
            <div class="checkin-btn-container">
                <button @click="fetchOrder" class="btn-fetch">Check-in</button>
            </div>


            <div v-if="order" class="order-container">
                <div class="order-header">
                    <div>Khách hàng</div>
<!--                    <div>Mã đơn hàng</div>-->
                    <div>Check-in</div>
                    <div>Check-out</div>
                    <div>Tên phòng</div>
                    <div>Tên thú cưng</div>

                </div>
                <div class="order-content">
                    <div>Nguyễn Lê Chi</div>
<!--                    <div>{{ order.id }}</div>-->
                    <div>{{formatDate(order.checkInDate)}}</div>
                    <div>{{ formatDate(order.checkOutDate) }}</div>
                    <div>{{ order.barnName }}</div>
                    <div>{{ order.petName }}</div>
                </div>
                <button @click="confirmCheckin" class="btn-checkin">Xác nhận Check-in</button>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import {bookingApiPrivate} from "@/api/axios.js";
import {toastWarning} from "@/utils/toast.js";
export default {
    data() {
        return {
            checkinCode: "",
            order: null,
            fakeOrder: {
                orderId: "FAKE123",
                customerName: "Khách Hàng Mẫu",
                checkinTime: "2025-03-28 14:00",
                checkoutTime: "2025-03-30 12:00",
                roomNumber: "999",
                petName: "Destiny"
            }
        };
    },
    methods: {
      formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
        fetchOrder() {
            bookingApiPrivate.get(`/api/booking/${this.checkinCode}?api-version=1.0`)
                .then(response => {
                  if (response.data.statusCode === 200) {
                    var data = response.data.data;
                    console.log(data)
                    this.order =data;
                  }
                })
                .catch(error => {
                  toastWarning("Lưu dữ liệu thất bại, vui lòng thử lại!")
                  console.error('Error fetching barn details:', error);
                })
                .finally(() => {
                  this.isLoading = true;
                });
          },
        confirmCheckin() {
            Swal.fire("Thành công", "Check-in thành công!", "success");
            this.checkinCode = "";
            this.$emit("close");
        },
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 15px;
    border-radius: 10px;
    width: 50%;
    text-align: center;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #888;
    transition: color 0.3s;
}

.close-btn:hover {
    color: #000;
}

.input-code {
    width: 100%;
    padding: 6px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn-fetch {
    background: #f1c40f;
    color: white;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 4px;
    width: 20%;
}

.btn-checkin {
    background: #f1c40f;
    color: white;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 4px;
    width: auto;
    min-width: 120px;
}

.checkin-btn-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}


.order-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    margin-top: 10px;
    text-align: center;
}

.order-header,
.order-content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    padding: 8px;
    text-align: center;
}

.order-header {
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding: 8px;
}

.order-content {
    padding: 8px;
}
</style>