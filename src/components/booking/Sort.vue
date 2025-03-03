<template>
    <div class="sort-options">
        <h3 class="sidebar-title">Sắp xếp</h3>
        <div class="checkbox-group">
            <label class="checkbox-label" :class="{ 'checked': nameChecked }">
                <input type="checkbox" v-model="nameChecked" @change="handleCheckboxChange('name')" />
                Tên
            </label>
            <label class="checkbox-label" :class="{ 'checked': priceChecked }">
                <input type="checkbox" v-model="priceChecked" @change="handleCheckboxChange('price')" />
                Giá
            </label>
            <label class="checkbox-label" :class="{ 'checked': ratingChecked }">
                <input type="checkbox" v-model="ratingChecked" @change="handleCheckboxChange('rating')" />
                Đánh giá
            </label>
            <label class="checkbox-label" :class="{ 'checked': statusChecked }">
                <input type="checkbox" v-model="statusChecked" @change="handleCheckboxChange('status')" />
                Trạng thái
            </label>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nameChecked: false,
            priceChecked: false,
            ratingChecked: false,
            statusChecked: false,
        };
    },
    methods: {
        handleCheckboxChange(option) {
            console.log(option, "checked:", this[`${option}Checked`]);
        },
    },
};
</script>

<style scoped>
.sort-options {
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sort-options h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #425a8b;
    margin-bottom: 15px;
    text-align: left;
}

.checkbox-group {
    display: flex;
    flex-direction: column;
}

.checkbox-label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 1rem;
    color: #6a7c92;
    cursor: pointer;
    transition: all 0.3s ease;
}

.checkbox-label input[type="checkbox"] {
    margin-right: 10px;
    accent-color: transparent;
}

.checkbox-label.checked {
    color: #fff;
    background-color: #ff7f32;
    border-radius: 5px;
}

.checkbox-label.checked input[type="checkbox"] {
    background-color: #ff7f32;
    border: 2px solid #ff7f32;
}

.checkbox-label.checked input[type="checkbox"]:checked {
    background-color: white;
}

.checkbox-label input[type="checkbox"]:checked {
    background-color: #ff7f32;
    border-color: white;
}

.sidebar-title {
    text-align: left;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 0 !important;
}
</style>