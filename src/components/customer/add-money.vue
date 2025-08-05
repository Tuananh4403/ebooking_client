<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <!-- Nút Close -->
            <button class="close-btn" @click="$emit('close')">&times;</button>
            <h3>Quét mã Qr để thanh toán</h3>
          <div class="alert-callout success">
            Vui lòng mở ứng dụng ngân hàng và quét mã QR để thanh toán.
          </div>
            <img :src="imageUrl" alt="QR Code for Payment" />
            <!-- Tiêu đề -->
            <!-- Nút Nạp tiền -->
            <button class="submit-btn" @click="confirmAddMoney">Xác nhận</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['imageUrl'],
    emits: ['submit-funds'],
    data() {
        return {
            amountRaw: null 
        };
    },
    computed: {
        amount: {
            get() {
                if (this.amountRaw === null) return "";
                return this.amountRaw.toLocaleString(); 
            },
            set(value) {
                const numericValue = parseFloat(value.replace(/,/g, "")); 
                this.amountRaw = isNaN(numericValue) ? null : numericValue;
            }
        }
    },
    methods: {
        confirmAddMoney() {
          this.$emit("submit-funds");
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
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 320px;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
}

.modal-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
    /* Căn trái */
}

.money-input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 15px;
    text-align: left;
}

.submit-btn {
    background: #425A8B;
    color: white;
    border: none;
    padding: 8px 20px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.3s;
    width: auto;
    align-self: flex-end;
}


.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    background: none;
    border: none;
    color: #425A8B;
    cursor: pointer;
}

.close-btn:hover {
    color: gray;
}

.submit-btn:hover {
    opacity: 0.8;
}
.alert-callout {
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
}

.alert-callout.success {
  background-color: #fff8e1;
  border: 1px solid #a6f3c3;
  color: #8a6d00;
}

.alert-callout.error {
  background-color: #ffe6e6;
  border: 1px solid #f3a6a6;
  color: #9f2f2f;
}
</style>