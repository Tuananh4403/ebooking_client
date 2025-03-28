<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <button class="close-btn" @click="closeModal">&times;</button>

            <h3 class="modal-title">Thông tin thú cưng</h3>
            <div class="image-container">
                <img :src="imgs.meo" alt="Pet" class="img-fluid pet-image" />
                <button class="plus-btn" @click="openVideoModal">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </button>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label>Tên:</label>
                    <input v-model="pet.name" type="text" />
                    <p v-if="errors.name" class="text-danger text-italic">{{ errors.name }}</p>
                </div>
                <div class="form-group">
                    <label for="petAge">Ngày sinh <span class="note">*</span></label>
                    <input type="date" id="petAge" v-model="pet.birthday" class="form-control" required />
                    <p v-if="errors.birthday" class="text-danger text-italic">{{ errors.birthday }}</p>
                </div>
                <div class="form-group">
                    <label for="petGender">Giới tính <span class="note">*</span></label>
                    <select id="petGender" v-model="pet.gender" class="form-control" required>
                        <option value="">Chọn giới tính</option>
                        <option value="true">Đực</option>
                        <option value="false">Cái</option>
                    </select>
                    <p v-if="errors.gender" class="text-danger text-italic">{{ errors.gender }}</p>
                </div>
                <div class="form-group">
                    <label for="petKind">Giống loài <span class="note">*</span></label>
                    <select id="petKind" v-model="pet.type" class="form-control" required>
                        <option value="">Chọn Giống</option>
                        <option value="dog">Chó</option>
                        <option value=" cat"> Mèo</option>
                    </select>
                    <p v-if="errors.type" class="text-danger text-italic">{{ errors.type }}</p>
                </div>
                <div class="button-group">
                    <button @click="updatePet" class="btn btn-primary">Cập nhật</button>
                    <button @click="deletePet" class="btn btn-danger">Xóa</button>
                </div>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <FollowPet v-if="showFollowPet" @close="showFollowPet = false" />
    </Teleport>
</template>

<script>
import imgs from '../../js/images';
import FollowPet from './follow-pet.vue';
export default {
    props: ['pet'],
    components: {
        FollowPet
    },
    data() {
        return {
            imgs,
            showFollowPet: false,
            errors: {
                name: '',
                birthday: '',
                gender: '',
                type: ''
            },
        };
    },
    computed: {
    },
    methods: {
        validateForm() {
            this.errors = {};

            let isValid = true;

            if (!this.pet.name) {
                this.errors.name = 'Vui lòng không để trống tên thú cưng';
                isValid = false;
            }
            if (!this.pet.birthday) {
                this.errors.birthday = 'Vui lòng chọn ngày sinh';
                isValid = false;
            } else if (new Date(this.pet.birthday) > new Date()) {
                this.errors.birthday = 'Vui lòng chọn ngày sinh bé hơn ngày hiện tại';
                isValid = false;
            }
            if (!this.pet.gender) {
                this.errors.gender = 'Vui lòng chọn giới tính';
                isValid = false;
            }
            if (!this.pet.type) {
                this.errors.type = 'Vui lòng không để trống giống loài';
                isValid = false;
            }

            return isValid;
        },
        closeModal() {
            this.$emit("close");
        },
        updatePet() {
            if (this.validateForm()) {

            }
        },
        deletePet() {
            console.log("Xóa thú cưng", this.pet);
            this.$emit("close");
        },
        openVideoModal() {
            this.showFollowPet = true;
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

.image-container {
    position: relative;
    display: inline-block;
}

.plus-btn {
    position: absolute;
    top: 2px;
    right: 36%;
    background: none;
    border: none;
    color: #425A8B;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.plus-btn:hover {
    color: black;
}

.pet-image {
    width: 100%;
    max-width: 150px;
    height: auto;
    border-radius: 50%;
    display: block;
}
</style>