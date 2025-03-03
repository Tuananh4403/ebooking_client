<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <Sidebar @change-view="changeView" />
            </div>
            <div class="col-md-10">
                <PetsList v-if="viewMode === 'petsList'" :pets="pets" />
                <AddPetForm v-if="viewMode === 'addPetForm'" @add-pet="addPetHandler" />
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './SideBar.vue';
import PetsList from './PetList.vue';
import AddPetForm from './CreatePet.vue';

export default {
    components: {
        Sidebar,
        PetsList,
        AddPetForm
    },
    data() {
        return {
            viewMode: 'petsList',
            pets: [
                { name: 'Milo', age: '2', gender: 'Đực', kind: 'Chó' },
                { name: 'Destiny', age: '3', gender: 'Đực', kind: 'Mèo' },
                { name: 'Dorry', age: '1', gender: 'Đực', kind: 'Mèo' },
                { name: 'Tôm', age: '5', gender: 'Đực', kind: 'Chó' },
                { name: 'Mén', age: '4', gender: 'Cái', kind: 'Chó' },
            ]
        };
    },
    methods: {
        changeView(view) {
            this.viewMode = view;
        },
        addPetHandler(newPet) {
            this.pets.push(newPet);
            this.viewMode = 'petsList';
        }
    }
};
</script>

<style scoped>
.container {
    margin-top: 20px;
}
</style>