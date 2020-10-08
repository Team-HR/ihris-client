<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <div class="headline">ADD NEW EMPLOYEE</div>
        </div>
      </v-card-title>
      <!-- form start -->
      <v-card-text>
        <template>
          <v-form ref="form" lazy-validation @submit.prevent="save(fields)">
            <template v-for="(field, i) in fields">
              <div :key="i">
                <v-text-field
                  v-if="field.type === 'text'"
                  v-model="field.value"
                  @input="field.value = field.value.toUpperCase()"
                  filled
                  :label="field.label"
                  required
                />
                <v-select
                  v-else-if="field.type === 'select'"
                  outlined
                  v-model="field.value"
                  :items="field.items"
                  filled
                  :label="field.label"
                />
              </div>
            </template>

            <v-btn type="submit" color="success" class="mr-4">
              Save
            </v-btn>
            <v-btn color="error" class="mr-4">
              Cancel
            </v-btn>
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
    fields: {}
  }),
  watch: {
    inputFields: {
      handler: function(after, before) {
        let changed = after.filter(function(p, idx) {
          return Object.keys(p).some(function(prop) {
            return p[prop] !== before[idx][prop];
          });
        });

        console.log(changed);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      reseted: "employees/getReseted",
      inputFields: "employees/getInputFields",
      employees: "employees/getItems"
    })
  },

  mounted() {
    this.fields = _.cloneDeep(this.inputFields);
  },
  methods: {
    save(fields) {
      this._save(fields);
      // this.fields = _.cloneDeep(this.inputFields);
      // this.reset();
    },
    ...mapActions({
      // reset: "employees/reset",
      _save: "employees/save"
    })
  }
};
</script>
