import Vue from "vue";
import _ from "lodash";

export default {
  namespaced: true,
  state() {
    return {
      select_items: [],
    };
  },

  mutations: {
    SET_SELECT_ITEMS(state, payload) {
      state.select_items = payload;
    },
  },

  actions: {
    get_select_items({ commit }) {
        return new Promise((resolve, reject) => {
        Vue.axios.get("/departments/select_items").then(res => {
          var data = res.data;
          commit("SET_SELECT_ITEMS", data);
          resolve(data);
        }, reject);
      }).catch(res => console.log(res.response.message));
    },
  },

  getters: {
    getSelectItems: state => {
      return state.select_items;
    },
  }
};
