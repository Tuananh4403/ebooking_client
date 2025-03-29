<template>
    <div class="content">
      <div class="title-search-container">
        <h1 class="title">DANH SÁCH NHÂN VIÊN</h1>
        <button class="search-button" @click="openSearchModal">Tìm kiếm</button>
        <button class="search-button" @click="openModal">Tạo</button>
      </div>
      <div class="table-container">
        <table class="contest-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>SĐT</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Mật khẩu</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.address }}</td>
              <td>{{ employee.phone }}</td>
              <td>{{ employee.gender }}</td>
              <td>{{ employee.birthDate }}</td>
              <td>{{ employee.password }}</td>
              <td>
                <button class="edit-button" @click="openEditModal(employee.id)">Chỉnh sửa</button>
                <button class="delete-button" @click="deleteEmployee(employee.id)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ListEmployee',
    data() {
      return {
        employees: [
          {
            id: 1,
            name: "Nguyễn Lê Chi",
            email: "nguyenlchi220602@gmail.com",
            phone: "0819790919",
            password: "Admin@123",
            address: "Đường A, TP C",
            birthDate: "08-01-2003",
            gender: "Nữ"
          }
        ]
      };
    },
    methods: {
      openModal() {
        alert("Chức năng tạo mới chưa được triển khai");
      },
      openEditModal(id) {
        alert(`Chỉnh sửa nhân viên có ID: ${id}`);
      },
      deleteEmployee(id) {
        this.employees = this.employees.filter(emp => emp.id !== id);
        alert(`Đã xóa nhân viên có ID: ${id}`);
      }
    }
  };
  </script>
  
  <style>
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
    font-size: 36px;
    font-weight: bold;
  }
  .search-button, .edit-button, .delete-button {
    background-color: #A0937D;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    margin-right: 10px;
  }
  .delete-button {
    background-color: #D9534F;
  }
  .search-button:hover, .edit-button:hover, .delete-button:hover {
    opacity: 0.8;
  }
  .table-container {
    margin-top: 20px;
  }
  .contest-table {
    width: 90%;
    margin: 0 auto;
    border-collapse: collapse;
  }
  .contest-table th, .contest-table td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  </style>
  