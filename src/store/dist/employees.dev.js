"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  namespaced: true,
  state: function state() {
    return {
      items: [],
      fields: {
        gender: {
          type: "select",
          label: "Gender",
          value: "",
          items: ["FEMALE", "MALE"]
        },
        first_name: {
          type: "text",
          label: "First Name",
          value: ""
        },
        middle_name: {
          type: "text",
          label: "Middle Name",
          value: ""
        },
        last_name: {
          type: "text",
          label: "Last Name",
          value: ""
        },
        ext_name: {
          type: "text",
          label: "Name Extension",
          value: ""
        }
      }
    };
  },
  mutations: {
    SET_ITEMS: function SET_ITEMS(state, payload) {
      state.items = payload;
    },
    ADD_ITEM: function ADD_ITEM(state, payload) {
      state.items.push(payload);
    },
    RESET_EDIT: function RESET_EDIT(state) {
      // clear values _.forEach won't throw errors if arr is not an array...
      _lodash["default"].forEach(state.fields, function (obj) {
        // _.set won't throw errors if obj is not an object. With more complex objects, if a portion of the path doesn't exist, _.set creates it
        _lodash["default"].set(obj, "value", "");
      }); // console.log(state.fields);

    }
  },
  actions: {
    initialize: function initialize(_ref) {
      var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        _vue["default"].axios.get("/employees").then(function (res) {
          var data = res.data;
          commit("SET_ITEMS", data);
          resolve(data);
        }, reject);
      })["catch"](function (res) {
        return alert(res);
      });
    },
    save: function save(_ref2, payload) {
      var commit = _ref2.commit;

      // console.log(payload);
      var new_employee = _lodash["default"].mapValues(payload, "value");

      var data = _lodash["default"].cloneDeep(new_employee); //Object.assign({}, payload);


      data.full_name = data.last_name + ", " + data.first_name + " " + data.middle_name;
      data.id = _lodash["default"].random(2, 200);
      commit("ADD_ITEM", data);
      commit("RESET_EDIT");
    } // reset({ commit }) {
    //   commit("RESET_EDIT");
    // }

  },
  getters: {
    getItems: function getItems(state) {
      return state.items;
    },
    // getEditedItem: state => {
    //   return state.editedItem;
    // },
    getInputFields: function getInputFields(state) {
      return state.fields;
    }
  }
};
exports["default"] = _default;