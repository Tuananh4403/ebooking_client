
import { createStore } from 'vuex';
import {apiClient, authApiPrivate} from '@/api/axios';
import { toastSuccess, toastError, toastWarning } from '@/utils/toast';
import { saveToken, saveUserId, saveUserName, getToken, getUserId, getUserName, saveUserRole, getUserRole, saveUserFullName } from '@/utils/auth';
import { auth, provider } from "@/utils/firebase.js"// Firebase imports
import { signInWithPopup } from 'firebase/auth';
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
    setTokens(state, token) {
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
        const response = await apiClient.post('/api/account/login?api-version=1.0', { username: email, password });
        if (response.data.statusCode === 200) {
          const { userId, fullName, email, username, role, accessToken, refreshToken } = response.data.data;
          
          const user = { userId, fullName, email, username, role };
          
          commit('setUser', user);
          commit('setRole', role);
          commit('setTokens', {
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
  
          
          saveToken(accessToken, refreshToken);
          saveUserId(userId);
          saveUserFullName(fullName);
          saveUserName(username);
          saveUserRole(role);
          toastSuccess("Đăng nhập thành công!");
        } else {
          toastWarning(response.data.message);
        }
      
    },
    async loginWithGoogle({ commit }) {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (user) {
          const token = await user.getIdToken(); // Firebase token

          // Send Firebase token to backend to verify and get user details
          const response = await apiClient.post('/api/account/firebase-login?api-version=1.0', { idToken: token });

          if (response.data.statusCode === 200) {
            const { userId, fullName, email, username, role, accessToken, refreshToken } = response.data.data;

            commit('setUser', { userId, fullName, email, username, role });
            commit('setRole', role);
            commit('setTokens', { accessToken, refreshToken });

            // Save credentials
            saveToken(accessToken, refreshToken);
            saveUserId(userId);
            saveUserFullName(fullName);
            saveUserName(username);
            saveUserRole(role);

            toastSuccess("Đăng nhập Google thành công!");
          } else {
            toastWarning(response.data.message || "Đăng nhập Google thất bại.");
          }
        }
      } catch (error) {
        toastError("Lỗi đăng nhập Google. Vui lòng thử lại.");
        console.error("Google login error:", error);
      }
    },
    logout({ commit }) {
      commit('logout');
      saveToken(null);
      saveUserId(null);
      saveUserName(null);
      saveUserRole(null);
      saveUserFullName(null);
    },
    checkAuth({ commit }) {
      const token = getToken();
      const userId = getUserId();
      const userName = getUserName();
      const role = getUserRole();
      
      if (token && userId && userName) {
        commit('setTokens', token);
        commit('setUser', { Id: userId, Username: userName, Role: role });
        commit('setRole', role);
      }
    },
    refreshAccessToken({ commit, state }) {
      try {
        apiClient.post('/api/account/refresh-token?api-version=1.0', {
          refreshToken: state.token.refreshToken
        })
        .then((response) => {
          const { accessToken, refreshToken } = response.data.data;
          commit('setTokens', {
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          saveToken( accessToken , refreshToken);
        });
      } catch (error) {
        console.error('Token refresh failed:', error);
        toastError('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
        throw error;
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.currentUser,
    userRole: state => state.role,
  },
});