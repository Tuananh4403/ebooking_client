<template>
    <div class="content ">
        <div class="title-search-container">
            <h1 class="title">DANH SÁCH ĐƠN HÀNG KHÁCH HÀNG</h1>
        </div>
        <vue-loading class="loading" :active="loading" :loader="'dots'" :color="'#22445d'" :can-cancel="true"
            :height="50" :Width="50" />
        <div class="table-container">
            <table class="contest-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Trạng thái đơn hàng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in orders" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ order.name }}</td>
                        <td>{{ order.description ?? '' }}</td>
                        <td>{{ order.status }}</td>
                        <td>
                            <button class="edit-button" @click="openModal">Checkin</button>
                            <button class="delete-button" @click="checkOut(camera.id)">Checkout</button>
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
    </div>
</template>


<script>
import Checkin from "@/components/admin/component/checkin.vue";
import { storeApiPrivate } from '@/api/axios.js';
import { toastError, toastWarning } from "@/utils/toast.js";

export default {
    name: "ListBarn",
    components: {
        Checkin,
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
        };
    },
    methods: {
        fetchOrders() {
            this.loading = true;
            setTimeout(() => {
                this.orders = [
                    {
                        id: 1,
                        name: "DH001",
                        description: "Nguyễn Văn A",
                        status: "Đang xử lý",
                        createdTime: "2025-03-28T10:00:00Z",
                    },
                    {
                        id: 2,
                        name: "DH002",
                        description: "Trần Thị B",
                        status: "Hoàn thành",
                        createdTime: "2025-03-27T15:30:00Z",
                    },
                    {
                        id: 3,
                        name: "DH003",
                        description: "Lê Văn C",
                        status: "Đã hủy",
                        createdTime: "2025-03-26T12:45:00Z",
                    },
                ];
                this.totalCount = this.orders.length;
                this.loading = false;
            }, 1000);
        },
        onPageChange(page) {
            this.currentPage = page;
            this.fetchOrders();
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
    },
    mounted() {
        this.fetchOrders();
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
    /* Nhích xuống theo phần trăm */
    background-color: #A0937D;
    color: white;
    border: none;
    padding: 0.5% 3%;
    /* Tăng nhẹ padding để tạo sự thoải mái */
    border-radius: 10px;
    cursor: pointer;
    font-size: 100%;
    /* Tăng kích thước font để dễ đọc hơn */
    line-height: 1.5;
    /* Tăng line-height để tạo không gian hơn */
    transition: background-color 0.3s;
    margin-right: 50px;
}

.edit-button {
    margin-top: 2%;
    /* Nhích xuống theo phần trăm */
    background-color: #A0937D;
    color: white;
    border: none;
    padding: 0.5% 3%;
    /* Tăng nhẹ padding để tạo sự thoải mái */
    border-radius: 10px;
    cursor: pointer;
    font-size: 100%;
    line-height: 1.5;
    /* Tăng line-height để tạo không gian hơn */
    transition: background-color 0.3s;
    margin-right: 20px;
}

.delete-button {
    margin-top: 2%;
    /* Align with edit button */
    background-color: #D9534F;
    /* Bootstrap Red */
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