<template>
    <div class="sidebar">
        <h3 class="sidebar-title">Tìm kiếm</h3>
        <div class="sidebar-form">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Nhập phòng" v-model="searchRoom" />
            </div>

            <div class="form-row">
                <div class="col-md-6">
                    <label>Ngày đặt</label>
                    <div class="form-group">
                        <input type="date" class="form-control" placeholder="Chọn ngày đến" v-model="arrivalDate" />
                    </div>
                </div>

                <div class="col-md-6">
                    <label>Ngày về</label>
                    <div class="form-group left">
                        <input type="date" class="form-control" placeholder="Chọn ngày về" v-model="departureDate" />
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Loại phòng</label>
                <select class="form-control" v-model="roomType">
                    <option value="" disabled selected>Chọn loại phòng</option>
                    <option value="standard">Phòng tiêu chuẩn</option>
                    <option value="vip">Phòng VIP</option>
                </select>
            </div>

            <div class="form-group">
                <label>Số lượng thú cưng</label>
                <input type="number" class="form-control" placeholder="Nhập số lượng thú cưng" v-model="numPets" />
            </div>

            <button class="btn btn-primary btn-block" @click="searchRooms">
                Tìm kiếm
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchRoom: '',
            arrivalDate: '',
            departureDate: '',
            roomType: '',
            numPets: 0,
        };
    },
    methods: {
        searchRooms() {
            console.log({
                searchRoom: this.searchRoom,
                arrivalDate: this.arrivalDate,
                departureDate: this.departureDate,
                roomType: this.roomType,
                numPets: this.numPets,
            });
        },
    },
};
</script>

<style scoped>
.sidebar {
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
    text-align: left;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 0 !important;
}

.sidebar-form .form-group {
    margin-bottom: 12px;
}

.form-row {
    display: flex;
    gap: 4%;
}

.form-control {
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 10px;
}

.form-control:focus {
    border-color: #425a8b;
    outline: none;
}

button {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    font-size: 1rem;
}

button.btn-primary {
    background-color: #425a8b;
    color: white;
    border: none;
}

button.btn-primary:hover {
    background-color: #334e6f;
}

button:hover {
    opacity: 0.8;
}

.form-control::placeholder {
    color: #aaa;
}

select.form-control {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

select.form-control option {
    font-size: 1rem;
}

.form-row .form-group {
    margin-right: 10px;
}

label {
    margin-bottom: 10px;
}
</style>