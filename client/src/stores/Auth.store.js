import { defineStore } from "pinia";
import {
  login,
  signup,
  getAllUsers,
  removeUser,
  getAllAlgos,
  forgetPassword,
  resetPassword,
} from "src/services/api/auth.service";

const useFinancialMarket = defineStore("authStore", {
  state: () => ({
    user: {},
    users: [],
    allAlgos: [],
    resetPasswordToken: "",
  }),
  getters: {},
  actions: {
    async login({ username, password }) {
      const {
        access_token,
        username: email,
        role,
      } = await login({
        username,
        password,
      });
      this.user.role = role;
      this.user.email = username;
      sessionStorage.setItem("access_token", access_token);
      return { email };
    },
    async signup({ username, password, confirmation }) {
      const {
        access_token,
        username: email,
        role,
      } = await signup({
        username,
        password,
        confirmation,
      });
      this.user.email = email;
      this.user.role = role;
      sessionStorage.setItem("access_token", access_token);
    },
    async getAllUsers() {
      const users = await getAllUsers();
      this.users = users;
      return users;
    },
    async removeUser(username) {
      await removeUser(username);
      this.users = this.users.filter((user) => user.username != username);
    },
    async getAllAlgos() {
      this.allAlgos = await getAllAlgos();
      return this.allAlgos;
    },

    async forgetPassword(username) {
      const { access_token } = await forgetPassword(username);
      this.resetPasswordToken = access_token;
    },

    resetPassword(password, tmpPassword) {
      return resetPassword(password, tmpPassword, this.resetPasswordToken);
    },
  },
  persist: true,
});

export default useFinancialMarket;
