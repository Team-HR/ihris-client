import Vue from "vue";

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        date1: "",
        date2: "",
        description: "",
        needs_revision: false,
        remarks: "",
        date_received: "",
        date_forwarded: "",
        date_completed: "",
        hrs_processed: ""
      },
      defaultItem: {
        id: "",
        date1: "",
        date2: "",
        description: "",
        needs_revision: false,
        remarks: "",
        date_received: "",
        date_forwarded: "",
        date_completed: "",
        hrs_processed: ""
      }
    };
  },

  mutations: {
    INIT_LOAD(state, payload) {
      state.items = payload;
    },
    SET_EDIT(state, payload) {
      state.editedIndex = state.items.findIndex(i => i.id === payload.id);
      state.editedItem = Object.assign({}, payload);
    },
    GO_SAVE(state, payload) {
      if (state.editedIndex > -1) {
        Object.assign(state.items[state.editedIndex], payload);
      } else {
        state.items.push(payload);
      }
    },
    RELOAD(state) {
      state.editedItem = Object.assign({}, this.defaultItem);
      state.editedIndex = -1;
    },
    GET_CURRENT_DATE(state) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      state.defaultItem.date_received = today;
      state.editedItem.date_received = today;
    }
  },

  actions: {
    init({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.axios.get("/plantilla_jocontracts/index").then(res => {
          var data = res.data.data;
          commit("RELOAD");
          commit("INIT_LOAD", data);
          resolve(data);
        }, reject);
      }).catch(res => alert(res));
    },
    setCompleted(ctx, id) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post("plantilla_jocontracts/complete", { id: id })
          .then(res => {
            resolve(res);
          }, reject);
      });
    },
    setEditedItem({ commit }, payload) {
      commit("SET_EDIT", payload);
    },
    reload({ dispatch }) {
      dispatch("init");
    },
    doSave(ctx, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post("plantilla_jocontracts/store", payload)
          .then(res => {
            resolve(res.data);
          })
          .catch(error => {
            reject(error.response.data);
          });
      });
    },
    getCurrentDate({ commit }) {
      commit("GET_CURRENT_DATE");
    },
    control_search(ctx, data) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post("plantilla_jocontracts/control_search", data)
          .then(res => {
            if (res.data.data) {
              ctx.dispatch("setEditedItem", res.data.data);
            } else {
              var zero = Object.assign({}, ctx.state.defaultItem);
              zero.id = data.id;
              ctx.dispatch("setEditedItem", zero);
            }
            resolve(res.data.data);
          })
          .catch(error => {
            reject(error.response.data);
          });
      });
    }
  },

  getters: {
    getItems: state => {
      return state.items;
    },
    getEditedIndex: state => {
      return state.editedIndex;
    },
    getEditedItem: state => {
      return state.editedItem;
    }
  }
};
