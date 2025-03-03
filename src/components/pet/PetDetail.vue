<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <button class="close-btn" @click="closeModal">&times;</button>

            <h3 class="modal-title">Thông tin thú cưng</h3>
            <img :src="imgs.meo" alt="Pet" class="img-fluid pet-image" />

            <div class="modal-body">
                <div class="form-group">
                    <label>Tên:</label>
                    <input v-model="pet.name" type="text" />
                </div>
                <div class="form-group">
                    <label>Tuổi:</label>
                    <input v-model="pet.age" type="number" />
                </div>
                <div class="form-group">
                    <label>Giới tính:</label>
                    <input v-model="pet.gender" type="text" />
                </div>
                <div class="form-group">
                    <label>Giống loài:</label>
                    <input v-model="pet.kind" type="text" />
                </div>
                <div class="button-group">
                    <button @click="updatePet" class="btn btn-primary">Cập nhật</button>
                    <button @click="deletePet" class="btn btn-danger">Xóa</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import imgs from '../../js/images';
export default {
    props: ['pet'],
    data() {
        return {
            imgs,
        };
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        updatePet() {
            console.log("Cập nhật thú cưng", this.pet);
        },
        deletePet() {
            console.log("Xóa thú cưng", this.pet);
            this.$emit("close");
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 60%;
    max-width: 500px;
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.modal-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.modal-body {
    text-align: left;
    flex-grow: 1;
    overflow-y: scroll;
}

.modal-body::-webkit-scrollbar {
    display: none;
}

.pet-image {
    width: 100%;
    max-width: 150px;
    height: auto;
    border-radius: 50%;
    margin: 0 auto 20px;
    display: block;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: none;
    border-bottom: 2px solid #ddd;
    background-color: white;
}

.form-group input:focus {
    outline: none;
    border-bottom: 1px solid #0b3e76;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    opacity: 0.8;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    background: none;
    border: none;
    color: #425A8B;
    cursor: pointer;
}

.close-btn:hover {
    color: rgb(186, 184, 184);
}

.button-group button {
    flex: 1;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

.button-group .btn-primary {
    background-color: #425A8B;
    color: white;
    border: none;
}

.button-group .btn-primary:hover {
    background-color: rgb(186, 184, 184);
}

.button-group .btn-danger {
    background-color: #6f030e;
    color: white;
    border: none;
}

.button-group .btn-danger:hover {
    background-color: rgb(186, 184, 184);
}
</style>