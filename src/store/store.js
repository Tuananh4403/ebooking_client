
import { createStore } from 'vuex';
import { apiClient } from '@/api/axios';
import { toastSuccess, toastError, toastWarning } from '@/utils/toast';
import { saveToken, saveUserId, saveUserName, getToken, getUserId, getUserName, saveUserRole, getUserRole} from '@/utils/auth';

export default createStore({
  state: {
    currentUser: null,
    token: null,
    role: null
  },
  mutations: {
    setUser(state, user) {
      state.currentUser = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setRole(state, role) {
      state.role = role;
    },
    logout(state) {
      state.currentUser = null;
      state.token = null;
      state.role = null;
      saveToken(null);
      saveUserId(null);
      saveUserName(null);
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await apiClient.post('/api/auth/authenticate', { username: email, password });
        console.log(response);
        if (response.data.success) {
          const { id, fullName, email, username, role, token } = response.data.data;
          const user = { id, fullName, email, username , role};
          commit('setUser', user);
          commit('setToken', token);
          saveToken(token);
          console.log(getToken());
          saveUserId(id);
          saveUserName(username);
          saveUserRole(role);
          toastSuccess("Đăng nhập thành công!");
        } else {
          toastWarning(response.data.message);
        }
      } catch (error) {
        toastError('Đăng nhập thất bại');
        console.log(error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('logout');
      saveToken(null);
      saveUserId(null);
      saveUserName(null);
      saveUserRole(null);
    },
    checkAuth({ commit }) {
      const token = getToken();
      const userId = getUserId();
      const userName = getUserName();
      const role = getUserRole();
      if (token && userId && userName) {
        commit('setToken', token);
        commit('setUser', { Id: userId, Username: userName, Role: role });
        commit('setRole', role);
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.currentUser,
    userRole: state => state.role,
  },
});
