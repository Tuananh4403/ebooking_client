<template>
    <div class="pet-form">
        <h3 class="form-title">Thêm thú cưng</h3>

        <div class="row">

            <div class="col-md-3 image-upload-container">
                <div class="form-group">
                    <label for="petImage" class="form-label">Ảnh thú cưng</label>
                    <input type="file" id="petImage" class="form-control" @change="handleImageUpload"
                        accept="image/*" />
                </div>
                <div class="form-group image-preview">
                    <div v-if="petImage">
                        <img :src="petImage" alt="Pet Image" class="img-fluid rounded-square" />
                    </div>
                </div>
            </div>

            <div class="col-md-9">
                <div class="form-group">
                    <label for="petName">Tên thú cưng <span class="note">*</span></label>
                    <input type="text" id="petName" v-model="newPet.name" class="form-control"
                        placeholder="Vui lòng nhập tên thú cưng" required />
                    <p v-if="errors.name" class="text-danger text-italic">{{ errors.name }}</p>
                </div>

                <div class="form-group">
                    <label for="petAge">Ngày  sinh <span class="note">*</span></label>
                    <input type="date" id="petAge" v-model="newPet.birthday" class="form-control" required />
                    <p v-if="errors.birthday" class="text-danger text-italic">{{ errors.birthday }}</p>
                </div>

                <div class="form-group">
                    <label for="petGender">Giới tính <span class="note">*</span></label>
                    <select id="petGender" v-model="newPet.gender" class="form-control" required>
                        <option value="">Chọn giới tính</option>
                        <option value="true">Đực</option>
                        <option value="false">Cái</option>
                    </select>
                    <p v-if="errors.gender" class="text-danger text-italic">{{ errors.gender }}</p>
                </div>

                <div class="form-group">
                  <label for="petKind">Giống loài <span class="note">*</span></label>
                  <select id="petKind" v-model="newPet.type" class="form-control" required>
                    <option value="">Chọn Giống</option>
                      <option value="dog">Chó</option>
                    <option value=" cat"> Mèo</option>
                  </select>
                    <p v-if="errors.type" class="text-danger text-italic">{{ errors.type }}</p>
                </div>

                <button @click="addPetHandler" class="btn btn-primary">Thêm mới</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newPet: {
                name: '',
              birthday: '',
                gender: '',
                type: '',
                image: ''
            },
            petImage: '',
            errors: {
                name: '',
              birthday: '',
                gender: '',
                type: ''
            }
        };
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.petImage = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },
        validateForm() {
            this.errors = {};

            let isValid = true;

            if (!this.newPet.name) {
                this.errors.name = 'Vui lòng không để trống tên thú cưng';
                isValid = false;
            }
            if (!this.newPet.birthday) {
                this.errors.birthday = 'Vui lòng chọn ngày sinh';
                isValid = false;
            } else if (new Date(this.newPet.age) > new Date()) {
                this.errors.age = 'Vui lòng chọn ngày sinh bé hơn ngày hiện tại';
                isValid = false;
            }
            if (!this.newPet.gender) {
                this.errors.gender = 'Vui lòng chọn giới tính';
                isValid = false;
            }
            if (!this.newPet.type) {
                this.errors.type = 'Vui lòng không để trống giống loài';
                isValid = false;
            }

            return isValid;
        },
        addPetHandler() {
            if (this.validateForm()) {
                this.$emit('addPet', this.newPet);
                this.newPet = { name: '', birthday: '', gender: '', type: '', image: '' };
                this.petImage = '';
            }
        }
    }
};
</script>

<style scoped>
.pet-form {
    width: 100%;
    padding: 20px;
}

.form-title {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: none;
    border-bottom: 2px solid #ddd;
    background-color: white;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-bottom: 1px solid #0b3e76;
}

.note {
    color: red;
    font-size: 1.2rem;
}

.image-upload-container {
    border: 1px solid #c5c5c5;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 346px;
    text-align: center;
}

.choose-file-label {
    margin-top: 20px;
}

.choose-file-btn {
    display: inline-block;
    padding: 8px 15px;
    background-color: #f8f9fa;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
}

.choose-file-btn:hover {
    background-color: #e2e6ea;
}

.image-preview {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    width: auto;
    margin: 20px auto 0;
    display: block;
}

button:hover {
    opacity: 0.8;
}

button.btn-primary {
    background-color: #425A8B;
    color: white;
    border: none;
}

button.btn-primary:hover {
    background-color: rgb(186, 184, 184);
}

.text-danger {
    font-style: italic;
    font-size: 0.75rem !important;
}
</style>