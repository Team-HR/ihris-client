<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ form_title }}</div>
        </div>
      </v-card-title>
      <!-- form start -->
      <v-card-text>
        <template>
          <v-form ref="form" lazy-validation @submit.prevent="save()">
            <v-row>
              <v-col>
                <template v-for="(input, i) in inputs">
                  <div :key="i">
                    <v-text-field
                      v-if="input.type === 'text'"
                      v-model="input.value"
                      @input="input.value = input.value.toUpperCase()"
                      filled
                      :label="input.label"
                      outlined
                      required
                    />
                    <v-select
                      v-else-if="input.type === 'select'"
                      :multiple="input.multiple"
                      :chips="input.chips"
                      outlined
                      v-model="input.value"
                      :items="input.items"
                      item-text="text"
                      item-value="value"
                      filled
                      :label="input.label"
                    />
                    <v-checkbox
                      v-else-if="
                        input.type === 'checkbox' &&
                        survey_type === 'SUBORDINATE ASSESSMENT'
                      "
                      v-model="input.value"
                      :label="input.label"
                    />
                    <!-- <h1>{{ input.name.value }}</h1> -->
                  </div>
                </template>
              </v-col>
              <v-col>
                <!--  -->
                <!-- TARGET EMPLOYEES HERE -->
                <!--  -->
              </v-col>
            </v-row>
            <v-row
              ><v-btn type="submit" color="success" class="mr-4"> Save </v-btn>
              <v-btn color="error" class="mr-4"> Cancel </v-btn></v-row
            >
          </v-form>
        </template>
      </v-card-text>
      <!-- form end -->
    </v-card>
    <!-- </v-dialog> -->
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import _ from "lodash";

export default {
  data: () => ({
    form_title: "Add New Survey",
    inputs: [
      { name: "title", type: "text", label: "Title", value: "" },
      {
        name: "type",
        type: "select",
        label: "Type",
        value: "",
        // items: ["SELF-ASSESSMENT", "PEER ASSESSMENT", "SUBORDINATE ASSESSMENT"],
        items: [
          { text: "SUPERVISOR ASSESSED", value: "SUPERVISOR ASSESSED" },
          { text: "SELF ASSESSED", value: "SELF ASSESSED" },
          { text: "PEER ASSESSED", value: "PEER ASSESSED" },
          { text: "SELF & ALL ASSESSED", value: "SELF & ALL ASSESSED" },
        ],
        // supervisor evaluates the subordinates (Supervisor Assessed)
        // everyone evaluates only themselves (Self Assessed)
        // everyone can only evaluate others except themselves (Peer Assessed)
        // everyone can evaluate others and themselves (Self & All Assessed)
      },
      {
        name: "allow_self",
        type: "checkbox",
        label: "Allow Self-assessment",
        value: false,
      },
      {
        name: "target_employees",
        type: "select",
        label: "Target Employees",
        chips: true,
        value: 0,
        multiple: true,
        items: [
          { text: "All", value: 0 },
          { text: "VALENCIA, FRANZ JOSHUA A.", value: "9999" },
        ],
      },
      {
        name: "target_departments",
        type: "select",
        label: "Target Departments",
        value: "0",
        items: [{ text: "All", value: "0" }],
      },
    ],
    // employees: [],
    departments: [],
  }),
  watch: {
    //   _inputs: {
    //     handler: function(after, before) {},
    //     deep: true
    //   }
    // survey_type: function(val) {
    //   console.log(val);
    // }
  },
  computed: {
    survey_type: function () {
      return _.find(this.inputs, { name: "type" }).value;
    },
    target_employees: function () {
      return _.find(this.inputs, { name: "target_employees" });
    },
    ...mapGetters({
      _employees: "employees/getItems",
    }),
  },
  methods: {
    get_input_values() {
      var object = this.inputs.reduce(
        (obj, item) => Object.assign(obj, { [item.name]: item.value }),
        {}
      );
      // console.log(object);
      return object;
    },

    save() {
      const inputs = this.get_input_values();
      this.axios.post("/talent-assessment/store", inputs).then((res) => {
        var data = res.data;
        console.log(data);
        // commit("SET_ITEMS", data);
        // resolve(data);
      }).catch((error)=>{
         console.log(error.response.data.errors);
      });
    },
    ...mapActions({
      initialize: "employees/initialize",
      get_select_items: "employees/get_select_items",
    }),
  },
  mounted() {
    // this.target_employees.items = this._employees;
    this.initialize().then(() => {
      // console.log(this._employees);
    });

    this.get_select_items().then((res) => {
      // console.log(res);
      this.target_employees.items = res;
    });

    // console.log();
    //   this.inputs = _.cloneDeep(this._inputs);
    //   console.log(this.inputs);
  },
};
</script>