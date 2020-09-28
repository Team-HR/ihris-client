import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import drawer from "./drawer";
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
    SET_APP_LOADING(state) {
      state.app_loading = true;
    },
    SET_APP_LOADING_DONE(state) {
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
      commit("SET_APP_LOADING");
    },
    setAppLoadingDone({ commit }) {
      commit("SET_APP_LOADING_DONE");
    }
  },
  getters: {
    getLoadingState(state) {
      return state.app_loading;
    }
  },
  strict: debug
});
