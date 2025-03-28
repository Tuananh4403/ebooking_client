<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
            <!-- Nút Close -->
            <button class="close-btn" @click="$emit('close')">&times;</button>
            
            <!-- Tiêu đề -->
            <h2 class="modal-title">Nhập số tiền cần nạp</h2>
            
            <!-- Input nhập số tiền -->
            <input type="number" v-model="amount" placeholder="Nhập số tiền" class="money-input" />
            
            <!-- Nút Nạp tiền -->
            <button class="submit-btn" @click="confirmAddMoney">Nạp tiền</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            amountRaw: null // Giá trị thực lưu số tiền
        };
    },
    computed: {
        amount: {
            get() {
                if (this.amountRaw === null) return "";
                return this.amountRaw.toLocaleString(); // Định dạng có dấu ","
            },
            set(value) {
                const numericValue = parseFloat(value.replace(/,/g, "")); // Loại bỏ dấu "," trước khi cập nhật
                this.amountRaw = isNaN(numericValue) ? null : numericValue;
            }
        }
    },
    methods: {
        confirmAddMoney() {
            if (this.amountRaw && this.amountRaw > 0) {
                alert(`Bạn đã nạp ${this.amountRaw.toLocaleString()} VND`);
                this.$emit("close");
            } else {
                alert("Vui lòng nhập số tiền hợp lệ!");
            }
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
    width: 320px; /* Tăng kích thước modal */
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
}

.modal-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left; /* Căn trái */
}

.money-input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 15px;
    text-align: left; /* Căn trái */
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
    align-self: flex-end; /* Căn phải */
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
</style>