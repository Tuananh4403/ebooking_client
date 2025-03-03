<template>
    <div class="filter-sidebar">
        <h3 class="filter-title">Bộ lọc</h3>

        <div class="filter-section">
            <label>Giá phòng</label>
            <div class="filter-price-range">
                <input type="number" class="form-control" placeholder="Thấp nhất" v-model="priceRange.min" />
                <span class="price-separator">-</span>
                <input type="number" class="form-control" placeholder="Cao nhất" v-model="priceRange.max" />
            </div>
        </div>

        <div class="filter-section">
            <label>Đánh giá</label>
            <div class="filter-checkboxes">
                <label v-for="option in ratingOptions" :key="option">
                    <input type="checkbox" :value="option" v-model="selectedRatings" class="form-checkbox" />
                    {{ option }}
                </label>
            </div>
        </div>

        <div class="filter-section">
            <label>Trạng thái</label>
            <div class="filter-checkboxes">
                <label v-for="option in statusOptions" :key="option">
                    <input type="checkbox" :value="option" v-model="selectedStatuses" class="form-checkbox" />
                    {{ option }}
                </label>
            </div>
        </div>

        <button class="btn-apply" @click="applyFilters">Áp dụng</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            priceRange: {
                min: '',
                max: ''
            },
            ratingOptions: [
                'Nhiều lượt đánh giá nhất',
                'Ít lượt đánh giá nhất',
                'Đánh giá 1 sao',
                'Đánh giá 2 sao',
                'Đánh giá 3 sao',
                'Đánh giá 4 sao',
                'Đánh giá 5 sao',
                'Tất cả'
            ],
            statusOptions: ['Phòng trống', 'Phòng đang sử dụng', 'Phòng đã từng đặt', 'Tất cả'],
            selectedRatings: [],
            selectedStatuses: []
        };
    },
    methods: {
        applyFilters() {
            console.log({
                priceRange: this.priceRange,
                selectedRatings: this.selectedRatings,
                selectedStatuses: this.selectedStatuses
            });
        }
    }
};
</script>

<style scoped>
.filter-sidebar {
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filter-title {
    text-align: left;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 0 !important;
}

.filter-section {
    margin-bottom: 30px;
}

.filter-section-title {
    font-size: 1.2rem;
    font-weight: normal;
    margin-bottom: 10px;
}

.filter-price-range {
    display: flex;
    align-items: center;
    gap: 10px;
}

.filter-price-range input {
    width: 45%;
    padding: 8px;
    border-radius: 10px;
    border: 1px solid #ccc;
}

.price-separator {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.filter-checkboxes label {
    display: block;
    margin: 8px 0;
    color: #7184a9;
}

.filter-checkboxes label:hover {
    color: #425A8B;
}

.filter-checkboxes input[type="checkbox"] {
    margin-right: 10px;
    transform: scale(1.2);
    accent-color: #ff8c00;
}

.form-checkbox {
    margin-right: 10px;
    transform: scale(1.2);
}

.form-checkbox:checked {
    background-color: #ff8c00;
    border-color: #ff8c00;
}

.form-checkbox:checked+span {
    color: #fff;
}

.btn-apply {
    background-color: #425A8B;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
    border: none;
    margin-top: 20px;
    font-size: 1rem;
}

.btn-apply:hover {
    opacity: 0.8;
}

.form-control {
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 8px;
}

.form-control:focus {
    border-color: #425A8B;
    outline: none;
}

button:hover {
    background-color: #1e3d58;
}

label {
    margin-bottom: 10px;
}

.filter-checkboxes input[type="checkbox"]:checked {
    background-color: #ff8c00;
    border-color: #ff8c00;
}

.filter-checkboxes input[type="checkbox"]:checked+span {
    color: #425A8B;
}

.form-checkbox:checked+span {
    color: #425A8B;
}
</style>