<template>
    <div class="payment-container">
        <div class="header">
            <font-awesome-icon :icon="['fas', 'wallet']" class="wallet-icon" @click="openModal" />
            <span class="total-amount">{{ totalAmount.toLocaleString() }} VND</span>
        </div>

        <h2 class="page-title">Danh sách lịch sử giao dịch</h2>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã giao dịch</th>
                        <th>Thời gian</th>
                        <th>Phương thức</th>
                        <th>Loại giao dịch</th>
                        <th>Trạng thái giao dịch</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaction, index) in transactions" :key="transaction.id"
                        :class="{ 'failed-transaction': transaction.status === 'Thất bại' }">
                        <td>{{ index + 1 }}</td>
                        <td>{{ transaction.id }}</td>
                        <td>{{ transaction.time }}</td>
                        <td>{{ transaction.method }}</td>
                        <td>{{ transaction.type }}</td>
                        <td>{{ transaction.status }}</td>
                        <td>{{ transaction.amount.toLocaleString() }} VND</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <Teleport to="body">
        <AddMoney v-if="isOpenModal" @close="closeModal" />
    </Teleport>
</template>

<script>
import AddMoney from "./add-money.vue"
export default {
    components: {
        AddMoney,
    },
    data() {
        return {
            totalAmount: 5000000,
            isOpenModal: false,
            transactions: [
                { id: 'TXN001', time: '2025-03-27 10:30', method: 'Momo', type: 'Nạp tiền', status: 'Thành công', amount: 200000 },
                { id: 'TXN002', time: '2025-03-27 11:00', method: 'Bank', type: 'Rút tiền', status: 'Thất bại', amount: 150000 },
                { id: 'TXN003', time: '2025-03-28 09:15', method: 'ZaloPay', type: 'Thanh toán', status: 'Thành công', amount: 500000 },
                { id: 'TXN004', time: '2025-03-28 14:00', method: 'Bank', type: 'Nạp tiền', status: 'Thất bại', amount: 300000 },
                { id: 'TXN005', time: '2025-03-29 08:45', method: 'VNPay', type: 'Thanh toán', status: 'Thành công', amount: 700000 },
            ]
        };
    },
    methods: {
        openModal() {
            this.isOpenModal = true;
        },
        closeModal() {
            this.isOpenModal = false;
        }
    }
};
</script>

<style scoped>
.payment-container {
    padding: 20px;
}

.header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.wallet-icon {
    font-size: 24px;
    color: #425A8B;
}

.total-amount {
    font-size: 20px;
    font-weight: bold;
    color: #28a745;
}

.page-title {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin: 20px 0;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

th,
td {
    border: 1px solid #ddd;
    padding: 10px;
}

th {
    background-color: #f0f0f0;
    font-weight: bold;
    font-size: 16px;
}

.failed-transaction {
    background-color: #ffcccc;
}
</style>
