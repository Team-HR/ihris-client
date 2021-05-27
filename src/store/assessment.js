import Vue from "vue";

export default {
    namespaced: true,
    state() {
        return {
            peers: [],
            freeEmployees: []
        };
    },

    mutations: {
        LOAD_PEERS(state, payload) {
            // state.peers = Object.assign([], payload);
            state.peers = payload
        },
        LOAD_FREE_EMPLOYEES(state, payload) {
            state.freeEmployees = payload
        }
        // SET_EDIT(state, payload) {
        //   state.editedIndex = state.items.findIndex(i => i.id === payload.id);
        //   state.editedItem = Object.assign({}, payload);
        // },
        // GO_SAVE(state, payload) {
        //   if (state.editedIndex > -1) {
        //     Object.assign(state.items[state.editedIndex], payload);
        //   } else {
        //     state.items.push(payload);
        //   }
        // },
        // RELOAD(state) {
        //   state.editedItem = Object.assign({}, this.defaultItem);
        //   state.editedIndex = -1;
        // },
        // GET_CURRENT_DATE(state) {
        //   var today = new Date();
        //   var dd = String(today.getDate()).padStart(2, "0");
        //   var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        //   var yyyy = today.getFullYear();
        //   today = yyyy + "-" + mm + "-" + dd;
        //   state.defaultItem.date_received = today;
        //   state.editedItem.date_received = today;
        // }
    },

    actions: {
        getPeers({ commit }) {
            return new Promise((resolve, reject) => {
                Vue.axios.get("/competency/get_peers")
                    .then(res => {
                        var data = res.data;
                        // console.log(res.data);
                        commit("LOAD_PEERS", data);
                        resolve(data);
                    }, reject);
            }).catch(res => alert(res));
        },

// getEmployees not assigned to a supervisor and questionnaire
        getFreeEmployees({commit}) {
            return new Promise((resolve, reject) => {
                Vue.axios.get("/superior/get_free_employees")
                    .then(res => {  
                        var data = res.data;
                        // console.log(res.data);
                        commit("LOAD_FREE_EMPLOYEES", data);
                        resolve(data);
                    }, reject);
            }).catch(res => alert(res));
        }
        

        // setCompleted(ctx, id) {
        //   return new Promise((resolve, reject) => {
        //     Vue.axios.post("appointments/complete", { id: id }).then(res => {
        //       resolve(res);
        //     }, reject);
        //   });
        // },
        // setEditedItem({ commit }, payload) {
        //   commit("SET_EDIT", payload);
        // },
        // reload({ dispatch }) {
        //   dispatch("init");
        // },
        // doSave(ctx, payload) {
        //   // console.log(payload);
        //   return new Promise((resolve, reject) => {
        //     Vue.axios
        //       .post("appointments/store", payload)
        //       .then(res => {
        //         // dispatch("init");
        //         // console.log(res.data);
        //         resolve(res.data);
        //       })
        //       .catch(error => {
        //         // console.log(error.response.data);
        //         reject(error.response.data);
        //       });
        //   });
        // },
        // getCurrentDate({ commit }) {
        //   commit("GET_CURRENT_DATE");
        // },
        // control_search(ctx, data) {
        //   // console.log(data);
        //   // var id = data.id ? (data.id.trim() ? data.id.trim() : "null") : "null";
        //   return new Promise((resolve, reject) => {
        //     Vue.axios
        //       .post("appointments/control_search", data)
        //       .then(res => {
        //         if (res.data.data) {
        //           ctx.dispatch("setEditedItem", res.data.data);
        //         } else {
        //           var zero = Object.assign({}, ctx.state.defaultItem);
        //           zero.id = data.id;
        //           ctx.dispatch("setEditedItem", zero);
        //         }
        //         // console.log("searched data:", res.data.data);
        //         resolve(res.data.data);
        //       })
        //       .catch(error => {
        //         reject(error.response.data);
        //         // console.log("error", error.response);
        //         // console.log("error", Object.assign({}, error));
        //       });
        //   });
        // }
    },

    getters: {
        getPeers: state => {
            return state.peers;
        },      
        // getEditedIndex: state => {
        //   return state.editedIndex;
        // },
        // getEditedItem: state => {
        //   return state.editedItem;
        // }
    }
};
