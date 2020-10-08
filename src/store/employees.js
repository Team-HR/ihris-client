import Vue from "vue";
import _ from "lodash";

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      fields: {
        gender: {
          type: "select",
          label: "Gender",
          value: "",
          items: ["FEMALE", "MALE"]
        },
        first_name: { type: "text", label: "First Name", value: "" },
        middle_name: { type: "text", label: "Middle Name", value: "" },
        last_name: { type: "text", label: "Last Name", value: "" },
        ext_name: { type: "text", label: "Name Extension", value: "" }
      }
    };
  },

  mutations: {
    SET_ITEMS(state, payload) {
      state.items = payload;
    },
    ADD_ITEM(state, payload) {
      state.items.push(payload);
    },
    RESET_EDIT(state) {
      // clear values _.forEach won't throw errors if arr is not an array...
      _.forEach(state.fields, obj => {
        // _.set won't throw errors if obj is not an object. With more complex objects, if a portion of the path doesn't exist, _.set creates it
        _.set(obj, "value", "");
      });
      // console.log(state.fields);
    }
  },

  actions: {
    initialize({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.axios.get("/employees").then(res => {
          var data = res.data;
          commit("SET_ITEMS", data);
          resolve(data);
        }, reject);
      }).catch(res => alert(res));
    },

    save({ commit }, payload) {
      // console.log(payload);
      const new_employee = _.mapValues(payload, "value");
      const data = _.cloneDeep(new_employee); //Object.assign({}, payload);
      data.full_name =
        data.last_name + ", " + data.first_name + " " + data.middle_name;
      data.id = _.random(2, 200);

      commit("ADD_ITEM", data);
      commit("RESET_EDIT");
    }

    // reset({ commit }) {
    //   commit("RESET_EDIT");
    // }
  },

  getters: {
    getItems: state => {
      return state.items;
    },
    // getEditedItem: state => {
    //   return state.editedItem;
    // },
    getInputFields: state => {
      return state.fields;
    }
  }
};
