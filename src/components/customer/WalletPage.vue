<template>
  <div>
    <div class="content">
      <h2>Ví tiền của bạn</h2>

<!-- Wallet Balance Info -->
<div class="wallet-info">
  <p>Tổng tiền hiện tại: {{ format(walletBalance) }} VND</p>
</div>

<!-- Add Funds Section -->
<div class="actions">
  <div class="add-funds">
    <h3>Số tiền nạp vào</h3>
    <input
    type="text"
        v-model="addAmount"
        v-number-format="{ separator: ',', precision: 2 }" 
        placeholder="Nhập số tiền VNĐ"
      />
    <button class="search-btn" @click="addFunds">Nạp tiền</button>
  </div>
</div>
    <div class="wallet-history">
    <h1>Lịch sử nạp tiền</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <table v-if="transactions.length">
        <thead>
          <tr>
            <th>Thời gian tạo</th>
            <th>mã giao dịch</th>
            <th>Số tiền</th>
            <th>Loại</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.date + transaction.amount">
            <td>{{ formatDateTime(transaction.date) }}</td>
            <td>{{ transaction.id }}</td>
            <td>{{ format(transaction.amount) }}</td>
            <td>{{ formatType(transaction.type).name }}</td>
            <td>{{ formatStatus(transaction.status).name }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Bạn chưa có lịch sử nạp tiền nào</p>

      <!-- Pagination Component -->
        <vue-awesome-paginate
          :total-items="totalCount"
          :items-per-page="pageSize"
          v-model="currentPage"
          @click="onPageChange"
        />
    </div>
  </div>
  <!-- </div> -->
      

      <!-- Transaction History Section -->

    </div>
  </div>
  <Teleport to="body">
  <add-money v-if="showQrModal" :image-url="this.qrImageUrl" @submit-funds="submitFunds()" @close="showQrModal=false"></add-money>
  </Teleport>
</template>

<script>
import { bookingApiPrivate} from '@/api/axios';  // Assuming apiClient is set up for API requests
import { useCurrencyFormatter } from '@/utils/useNumberFormatter';
import { TRANSACTION_STATUS } from '@/constants/global';
import { TRANSACTION_TYPE } from '@/constants/global';
import {toastError, toastSuccess} from "@/utils/toast.js";
import addMoney from "@/components/customer/add-money.vue";

export default {
  name: 'WalletPage',
  components: {
    addMoney,
  },
  data() {
    return {
      walletBalance: 0, // Initially 0, will load from API
      addAmount: '',
      transferAmount: 0,
      recipient: '',
      transactions: [],
      loading: true,
      currentPage: 1,
      pageSize: 20, // Default items per page (match backend's pageSize)
      totalCount: 0,
      type: 0,
      status: TRANSACTION_STATUS,
      transactionType: TRANSACTION_TYPE,
      qrImageUrl:'',
      showQrModal: false,
      transactionId: ''
    }
  },
  created() {
    this.type = this.$route.query.type ?? null
    this.loadWalletBalance();
    this.fetchTransactions();
  },
  setup() {
    const { format } = useCurrencyFormatter('vi-VN', 'VND');
    const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format; change to true for 12-hour format with AM/PM
        });
    };
    return { format, formatDateTime };
  },
  computed: {
    // Computed property to format the amount for display
    formattedAmount() {
      const number = parseFloat(this.addAmount.replace(/[^0-9.-]+/g, '')); // Remove non-numeric characters
      if (!isNaN(number)) {
        return number.toLocaleString() + ' đ'; // Format with commas and append 'đ'
      }
      return '';
    }
  },
  methods: {
    async loadWalletBalance() {
      try {
        const response = await bookingApiPrivate.get('/api/wallet/balance?api-version=1.0');
        if(response.status === 200) {
          if(response.data.data == null) {
            await bookingApiPrivate.post('/api/wallet?api-version=1.0');
          }
          this.walletBalance = response.data.data; // Assume response contains balance
        }
      } catch (error) {
        toastError('Failed to load wallet balance.');
        console.error(error);
      }
    },
    updateAmount(event) {
      const rawValue = event.target.value.replace(/[^0-9.-]+/g, ''); // Remove non-numeric characters
      this.addAmount = rawValue;
    },
    async fetchTransactions() {
      this.loading = true;
      try {
        let url = `/api/wallet/history?api-version=1.0&pageNumber=${this.currentPage}&pageSize=${this.pageSize}`;

        if (this.type !== null && this.type !== undefined) {
          url += `&type=${this.type}`;
        }
        const response = await bookingApiPrivate.get(url);
        const data = response.data.data;
        this.transactions = data.data;
        this.totalCount = data.totalRecords;
        this.pageSize = data.pageSize;
      } catch (error) {
        console.error("Error fetching wallet history:", error);
      } finally {
        console.log("tet");
        this.loading = false;
      }
    },
    async onPageChange(page) {
      this.currentPage = page;
      await this.fetchTransactions(); // Fetch data for the new page
    },
    async addFunds() {
      var amount = parseFloat(this.addAmount.replace(/[^0-9.-]+/g, ''));
      if (amount > 0) {// Clean and parse as number
        try {
          await bookingApiPrivate.post('/api/vnpay/create-payment?api-version=1.0', {
            amount: amount
          }).then((response) => {
            this.qrImageUrl = response.data.data.paymentUrl
            this.transactionId = response.data.data.transactionId
            this.showQrModal = true;
          })
              .catch((error) => {
                console.error("Error while validating payment:", error);
                this.responseCode = '99'; // Handle error case
                this.loading = false;
              });
          // alert('Funds added successfully!');
        } catch (error) {
          // alert('Failed to add funds.');
          console.error(error);
        }
      }
      else {
        // alert('Please enter a valid amount to add.');
      }
    },
    async submitFunds() {
      this.showQrModal = false;
        try {
          await bookingApiPrivate.post('/api/VNPay/validate?api-version=1.0', {
            TransactionId: this.transactionId
          }).then((response) => {
            this.addAmount = '';
            toastSuccess("Nạp tiền thành công vui lòng đợi xác nhân!")
            this.loading = false;
          })
              .catch((error) => {
                console.error("Error while validating payment:", error);
                this.responseCode = '99'; // Handle error case
                this.loading = false;
              });
          // alert('Funds added successfully!');
        } catch (error) {
          // alert('Failed to add funds.');
          console.error(error);
        }
    },
    formatStatus(status) {
    return this.status[status];
    },
    formatType(type) {
    return this.transactionType[type];
    },
    async transferFunds() {
      if (this.transferAmount > 0 && this.recipient) {
        if (this.transferAmount <= this.walletBalance) {
          try {
            const response = await bookingApiPrivate.post('/api/wallet/transfer?api-version=1.0', {
              amount: this.transferAmount,
              recipient: this.recipient
            });
            this.walletBalance -= parseFloat(this.transferAmount); // Update local balance
            this.transactions.push({
              id: response.data.transactionId, // Assume response contains transactionId
              type: 'Transfer Funds',
              amount: this.transferAmount,
              date: new Date(),
              recipient: this.recipient
            });
            this.transferAmount = 0;
            this.recipient = '';
            alert('Funds transferred successfully!');
          } catch (error) {
            alert('Failed to transfer funds.');
            console.error(error);
          }
        } else {
          alert('Insufficient funds for this transfer.');
        }
      } else {
        alert('Please fill out all fields correctly.');
      }
    }
  }
}
</script>

<style scoped>
.content {
    min-height: 60vh;
    padding: 40px;
    background: linear-gradient(135deg, #f2f6f9 0%, #e8f1f9 100%); /* Gradient background */
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* Bóng đổ mềm */
    margin: 20px auto;
    width: 80%; 
    display: flex;
    flex-direction: column;
    align-items: center; /* Căn giữa nội dung trong content */
}

h2 {
    font-weight: bold;
    font-size: 42px;
    color: #333;
    margin-bottom: 30px;
    text-align: center; /* Canh giữa tiêu đề */
}

.wallet-info {
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    padding: 20px;
    margin-bottom: 40px;
    text-align: center;
    border: 1px solid #ebebeb; /* Đường viền nhẹ */
}

.wallet-info p {
    font-size: 22px; /* Tăng size chữ */
    font-weight: 600;
    color: #4CAF50; /* Màu xanh lá để tạo sự tươi sáng */
}

.actions {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
}

.add-funds {
    background-color: #ffffff;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    width: 150%;
    text-align: center;
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.add-funds:hover {
    transform: scale(1.05); /* Hiệu ứng khi hover */
}

input[type="number"], input[type="text"] {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    font-size: 18px;
    color: #333;
    border-radius: 10px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
}

input[type="number"]:focus, input[type="text"]:focus {
    border-color: #3498db;
    outline: none;
}

button {
    background-color: #8B0000;
    color: white;
    font-size: 16px;
    padding: 12px 30px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
    background-color: #A52A2A;
    transform: translateY(-2px); /* Nhấc nút lên khi hover */
}

.wallet-history {
    margin-top: 40px;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.wallet-history h1 {
    font-size: 42px; /* Tăng kích thước font */
    font-weight: 700; /* In đậm */
    color: #333;
    text-align: center;
}

.wallet-history table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    border-radius: 12px;
    overflow: hidden;
}

.wallet-history th, .wallet-history td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #f4f4f4;
}

.wallet-history th {
    background-color: #f4f4f4;
    font-weight: bold;
    color: #333;
}

.wallet-history tr {
    transition: background-color 0.3s ease;
}

.wallet-history tr:hover {
    background-color: #f9f9f9;
}

.wallet-history td {
    font-size: 16px;
    color: #555;
}

.wallet-history p {
    font-size: 18px;
    font-weight: 600;
    color: #f39c12;
    text-align: center;
}

/* Pagination Styles */
.pagination-container {
    display: flex !important;
    justify-content: center; /* Center horizontally */
    align-items: center;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .actions {
        flex-direction: column;
    }

    .add-funds {
        width: 100%;
        margin-bottom: 20px;
    }

    .wallet-history {
        padding: 15px;
    }

    .wallet-history h1 {
        font-size: 24px;
    }

    .wallet-history table th, .wallet-history table td {
        font-size: 14px;
    }
}

</style>
<style>
.pagination-container {
    display: flex !important;
    justify-content: center; /* Center horizontally */
    align-items: center;
    column-gap: 10px;
  }

  .paginate-buttons {
    height: 40px;

    width: 40px;

    border-radius: 20px;

    cursor: pointer;

    background-color: rgb(242, 242, 242);

    border: 1px solid rgb(217, 217, 217);

    color: black;
  }

  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }

  .active-page {
    background-color: #3498db;

    border: 1px solid #3498db;

    color: white;
  }

  .active-page:hover {
    background-color: #2988c8;
  }
  </style>

