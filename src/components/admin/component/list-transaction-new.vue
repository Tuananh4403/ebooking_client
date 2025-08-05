<template>
    <div class="content ">
        <div class="title-search-container">
            <h1 class="title">DANH SÁCH NẠP TIỀN CHỜ XÁC NHẬN</h1>
        </div>
        <vue-loading class="loading" :active="loading" :loader="'dots'" :color="'#22445d'" :can-cancel="true"
            :height="50" :Width="50" />
        <div class="table-container">
            <table class="contest-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã thanh toán</th>
                      <th>Số tiền giao dịch</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in orders" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ order.id }}</td>
                      <td>{{ format(order.amount) }}</td>
                        <td>{{ formatType(order.status).name ?? '' }}</td>
                      <td>{{ formatDate(order.date) }}</td>

                          <td>
                            <button v-if="order.status==3" class="edit-button"  @click="confirmPayment(order.id)">Xác nhận</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="totalCount > pageSize" class="example-one pagination-container">
                <vue-awesome-paginate :total-items="totalCount" :items-per-page="pageSize" v-model="currentPage"
                    @click="onPageChange" />
            </div>
        </div>

        <Checkin v-if="showModal" @close="closeModal" />
        <Checkout v-if="showModalCheckout" @close="closeModalCheckout" :order="selectedOrder" />

    </div>
</template>


<script>
import Checkin from "@/components/admin/component/checkin.vue";
import Checkout from "@/components/admin/component/checkout.vue";
import {bookingApiPrivate, storeApiPrivate} from '@/api/axios.js';
import { toastError, toastWarning } from "@/utils/toast.js";
import {getUserId, getUserRole} from "@/utils/auth.js";
import {formatBookingStatus} from "@/constants/booking-status.js";
import { TRANSACTION_STATUS } from '@/constants/global';
import Swal from 'sweetalert2';
import {useCurrencyFormatter} from "@/utils/useNumberFormatter.js";

export default {
    name: "ListTransactionAwait",

    components: {
        Checkin,
      Checkout,
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
    data() {
        return {
            showModal: false,
            showSearchModal: false,
            orders: [],
            selectedCompetitionId: null,
            isCreating: false,
            currentPage: 1,
            pageSize: 10,
            totalCount: 0,
            loading: false,
            userRole: '',
            showModalCheckout: false,
            selectedOrder: null,
          transactionType: TRANSACTION_STATUS,
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
      formatBookingStatus(status) {
        return formatBookingStatus(status);
      },

      fetchBooking() {

          bookingApiPrivate.get(`/api/wallet/transaction-await?api-version=1.0`,
              {
                params: {
                  PageNumber: this.currentPage,
                  pageSize: this.pageSize,
                }
              })
              .then(response => {
                if (response.data.statusCode === 200) {
                  var data = response.data.data;
                  console.log(data)
                  this.orders =data.data;
                  this.totalCount = data.totalRecords;
                  this.pageSize = data.pageSize;
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

        onPageChange(page) {
            this.currentPage = page;
            this.fetchBooking();
        },
        openModal() {
            this.showModal = true;
        },
        openEditModal(barnId) {
            this.isCreating = false;
            this.selectedCompetitionId = barnId;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },

      confirmPayment(order) {
        console.log(order);
        const queryParams = {
          transactionId: order,
          status: 1
        };
        Swal.fire({
          title: 'Xác nhận thanh toán?',
          text: 'Bạn có chắc chắn muốn xác nhận thanh toán đã hoàn tất?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#8B0000',
          cancelButtonColor: '#aaa',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy',
        }).then((result) => {
          if (result.isConfirmed) {
            // Người dùng đã xác nhận, tiến hành gọi API
            bookingApiPrivate
                .post('/api/VNPay/validate?api-version=1.0', queryParams)
                .then((response) => {
                  var data = response.data;
                  this.loading = false;
                  console.log(data);
                    if (data.statusCode ==200) {
                    Swal.fire({
                      title: 'Bạn đã xác nhận giao dịch thành công',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 2000, // Tự đóng sau 2 giây
                      didClose: () => {
                        this.fetchBooking(); // Gọi hàm reload dữ liệu
                        // hoặc: window.location.reload();
                      }
                    });
                  } else {
                    Swal.fire({
                      title: 'Quá trình thanh toán thất bại',
                      text: 'Vui lòng liên hệ admin để biết chi tiết.',
                      icon: 'error',
                      showConfirmButton: false,
                      timer: 2500,
                      didClose: () => {
                        this.fetchBooking(); // Gọi lại hoặc làm gì đó sau khi thất bại
                      }
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error while validating payment:", error);
                  this.responseCode = '99';
                  this.loading = false;

                  Swal.fire({
                    title: 'Quá trình thanh toán thất bại',
                    text: 'Vui lòng liên hệ admin để biết chi tiết.',
                    icon: 'error',
                    showConfirmButton: false,
                    html: `<button onclick="window.location.href='/history-transaction?type=1'" class="swal2-confirm swal2-styled" style="background-color: #8B0000; color: white; border-radius: 50px; padding: 10px 20px; font-size: 16px;">Vào ví ngay</button>`,
                  });
                });
          }
        });
      },
      closeModalCheckout() {
        this.showModalCheckout = false;
      },
      formatType(type) {
        return this.transactionType[type];
      },
    },
    mounted() {
        this.userRole = getUserRole();
        this.fetchBooking();
    },
};
</script>


<style>
.main-container {
    display: flex;
}

.sidebar.expanded+.header-content-container {
    margin-left: 200px;
}

.content {
    min-height: 60vh;
}

.title-search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.title {
    margin-left: 85px;
    margin-top: 40px;
    margin-right: 50px;
    font-size: 36px;
    font-weight: bold;
}

.search-button {
    margin-top: 2%;
    background-color: #A0937D;
    color: white;
    border: none;
    padding: 0.5% 3%;
    border-radius: 10px;
    cursor: pointer;
    font-size: 100%;
    line-height: 1.5;
    transition: background-color 0.3s;
    margin-right: 50px;
}

.edit-button {
    margin-top: 2%;
    background-color: #A0937D;
    color: white;
    border: none;
    padding: 0.5% 3%;
    border-radius: 10px;
    cursor: pointer;
    font-size: 100%;
    line-height: 1.5;
    transition: background-color 0.3s;
    margin-right: 20px;
}

.delete-button {
    margin-top: 2%;
    background-color: #D9534F;
    color: white;
    border: none;
    padding: 0.5% 3%;
    border-radius: 10px;
    cursor: pointer;
    font-size: 100%;
    line-height: 1.5;
    transition: background-color 0.3s ease-in-out;
    margin-right: 20px;
}

.search-button:hover {
    background-color: gray;
}

.table-container {
    margin-top: 20px;
    border-radius: 5px;
    overflow: hidden;
}

.contest-table {
    width: 90%;
    margin: 0 auto;
    border-collapse: separate;
    border-spacing: 0px;
}

.contest-table th {
    font-weight: bold;
    text-align: center;
    border-bottom: 2px solid #ddd;
    border-top: none;
    border-left: none;
    border-right: none;
}

.contest-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    border-top: none;
    border-left: none;
    border-right: none;
    text-align: center;
}

.contest-table thead {
    background-color: #b2b4b6;
    color: #333;
}

.contest-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.contest-table tbody tr:hover {
    background-color: #f1f1f1;
}

.contest-table tbody ul {
    padding-left: 15px;
    text-align: center;
    list-style-type: square;
    list-style: none;
}


.example-one .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    column-gap: 10px;

}

.example-one .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.example-one .paginate-buttons:hover {
    background-color: #d8d8d8;
}

.example-one .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.example-one .active-page:hover {
    background-color: #2988c8;
}

.example-one .back-button:active,
.example-one .next-button:active {
    background-color: #c4c4c4;
}
</style>