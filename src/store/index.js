import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.js";
import drawer from "./drawer.js";
import appointment from "./appointment";
import plantilla_jocontracts from "./plantilla_jocontracts";
import payroll from "./payroll";
import tlb from "./tlb";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    app_loading: false
  },
  mutations: {
    SET_APP_IS_LOADING(state) {
      // console.log("LOADING!!!!....");
      state.app_loading = true;
    },
    SET_APP_DONE_LOADING(state) {
      state.app_loading = false;
    }
  },
  modules: {
    auth,
    drawer,
    appointment,
    plantilla_jocontracts,
    payroll,
    tlb
  },
  actions: {
    setAppLoading({ commit }) {
      commit("SET_APP_IS_LOADING");
    },
    setAppDoneLoading({ commit }) {
      commit("SET_APP_DONE_LOADING");
    }
  },
  getters: {
    getLoadingState(state) {
      return state.app_loading;
    }
  },
  strict: debug
});
