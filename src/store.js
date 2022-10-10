import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "-1",
    userName: "",
    AESKey: "",
    AESIv: ""
  },
  getters: {
    getUserId: state => state.userId,
    getUserName: state => state.userName,
    getAESKey: state => state.AESKey,
    getAESIv: state => state.AESIv
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setAESKey(state, AESKey) {
      state.AESKey = AESKey;
    },
    setAESIv(state, AESIv) {
      state.AESIv = AESIv;
    }
  },
  actions: {},
  modules: {}
});
