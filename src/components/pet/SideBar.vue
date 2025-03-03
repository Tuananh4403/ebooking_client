<template>
    <div class="list-group">
        <button class="list-group-item list-group-item-action" :class="{ 'active': isSelected === 'petsList' }"
            @click="showPets">
            <font-awesome-icon :icon="['fas', 'paw']" />
            Thú cưng của tôi
        </button>
        <button class="list-group-item list-group-item-action" :class="{ 'active': isSelected === 'addPetForm' }"
            @click="addPet">
            <font-awesome-icon :icon="['fas', 'plus']" />
            Thêm thú cưng
        </button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isSelected: ''
        };
    },
    methods: {
        showPets() {
            this.isSelected = 'petsList';
            this.$emit('change-view', 'petsList');
        },
        addPet() {
            this.isSelected = 'addPetForm';
            this.$emit('change-view', 'addPetForm');
        }
    }
};
</script>
<style scoped>
.list-group {
    width: 200px;
    margin-top: 6%;
}

.list-group-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    margin-bottom: 5px;
    font-size: 16px;
    color: #425A8B;
    background-color: white;
    transition: all 0.3s ease;
}

.list-group-item i {
    margin-right: 10px;
}

.list-group-item:hover {
    cursor: pointer;
    background-color: #E3ECF9;
}

.list-group-item.active {
    background-color: #425A8B;
    color: white;
}

.list-group-item.active i {
    color: white;
}

.list-group-item:not(.active):hover {
    background-color: #f2f2f2;
}
</style>