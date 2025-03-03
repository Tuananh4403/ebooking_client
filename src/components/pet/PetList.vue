<template>
    <div class="row">
        <div v-for="(pet, index) in pets" :key="index" class="col-md-3 mb-4">
            <div class="pet-box" @click="openModal(pet)">
                <img :src="imgs.meo" alt="Pet" class="img-fluid" />
                <h5>{{ pet.name }}</h5>
                <p>Tuổi: {{ pet.age }}</p>
                <p>Giới tính: {{ pet.gender }}</p>
                <p>Giống loài: {{ pet.kind }}</p>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <PetDetail v-if="showModal" :pet="currentPet" @close="closeModal" />
    </Teleport>
</template>

<script>

import imgs from '../../js/images';
import PetDetail from './PetDetail.vue';
export default {
    props: ['pets'],
    components: {
        PetDetail
    },
    data() {
        return {
            imgs,
            currentPet: {},
            showModal: false
        }
    },
    methods: {
        openModal(pet) {
            this.currentPet = { ...pet };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        }
    }
};
</script>

<style scoped>
.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.col-md-3 {
    width: 24%;
    margin-bottom: 16px;
}

.pet-box {
    border: 1px solid rgb(159, 154, 154);
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    box-sizing: border-box;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 10%;
}

.pet-box img {
    width: 100%;
    height: auto;
    border-radius: 5px;
}

.pet-box h5 {
    margin-top: 10px;
    font-size: 1.2rem;
}

.pet-box p {
    color: #777;
    margin-top: 5px;
    text-align: left;
}

.pet-box:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>