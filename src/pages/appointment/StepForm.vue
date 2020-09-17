<template>
  <v-stepper v-model="step">
    <v-stepper-header class="pa-0 ma-0">
      <v-stepper-step :complete="step > 1" step="1">Receive</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 2" step="2">Form</v-stepper-step>
      <v-divider></v-divider>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="pa-1 elevation-0">
          <v-subheader class="pa-0 ma-0">Tracking Information</v-subheader>
          <v-form @submit.prevent="search_add" ref="control_number_form">
            <v-text-field
              autofocus
              label="Control Number"
              placeholder="e.g. 123456"
              outlined
              :readonly="is_control_searching"
              :loading="is_control_searching"
              v-model="control_number"
              :error-messages="errors.id"
            ></v-text-field>
            <!-- :rules="[v => !!v || 'Control number is required']" -->
            <v-btn
              class="mt-2"
              color="primary"
              type="submit"
              text
              :loading="is_control_searching"
              :disabled="is_control_searching"
            >
              Add/Search
              <template v-slot:loader>
                <span>Searching...</span>
              </template>
            </v-btn>
          </v-form>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mb-12 elevation-0" color="grey lighten-1">
          <v-form dense @submit.prevent="save">
            <v-card class="elevation-0">
              <v-card-text class="pa-0">
                <v-alert
                  v-if="editedItem.is_complete === 0"
                  dense
                  text
                  :type="editedItemIndex === -1 ? 'info' : 'warning'"
                  :icon="
                    editedItemIndex === -1
                      ? 'mdi-shape-square-rounded-plus'
                      : 'mdi-file-clock-outline'
                  "
                >
                  Control Number: {{ editedItem.id }}
                </v-alert>
                <v-alert
                  v-else
                  dense
                  text
                  type="success"
                  icon="mdi-book-check-outline"
                >
                  Control Number: {{ editedItem.id }}
                </v-alert>
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="12" class="pa-1">
                    <v-text-field
                      autofocus
                      outlined
                      dense
                      v-model="editedItem.name"
                      label="Employee"
                      placeholder="e.g. Juan Dela Cruz"
                      class="pa-1"
                      :error-messages="errors.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="pa-1">
                    <v-text-field
                      outlined
                      dense
                      v-model="editedItem.position"
                      label="Position"
                      placeholder="e.g. Administrative Assisstant I"
                      class="pa-1"
                      :error-messages="errors.position"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="pa-1">
                    <v-text-field
                      outlined
                      dense
                      v-model="editedItem.date_of_effectivity"
                      label="Date of Effectivity"
                      placeholder="Date of Effectivity"
                      type="date"
                      class="pa-1"
                      :error-messages="errors.date_of_effectivity"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="pa-1 right">
                    <v-switch
                      v-model="editedItem.needs_revision"
                      color="orange"
                      label="Needs Revision"
                    ></v-switch>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="12" class="pa-1">
                    <div :hidden="editedItem.needs_revision == '0'">
                      <v-textarea
                        outlined
                        v-model="editedItem.remarks"
                        label="Remarks"
                        placeholder="..."
                        rows="2"
                        hide-details
                      ></v-textarea>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="
                    editedItem.is_complete === 0 &&
                      $auth.check(['sys_admin', 'appointments'])
                  "
                  color="yellow darken-1"
                  text
                  @click="complete(editedItem.id)"
                  >Complete</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="reset">Cancel</v-btn>
                <v-btn type="submit" color="blue darken-1" text>Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      control_number: null,
      editedItem: {
        id: "",
        name: "",
        position: "",
        date_of_effectivity: "",
        needs_revision: false,
        remarks: "",
        date_received: "",
        date_forwarded: "",
        date_completed: "",
        hrs_processed: ""
      },
      errors: {},
      step: 1,
      is_control_searching: false
    };
  },
  watch: {
    editedItem_vuex: function(editedItem) {
      this.editedItem = Object.assign({}, editedItem);
    },
    editedItemIndex: function(editedItemIndex) {
      if (editedItemIndex !== -1) {
        this.step = 2;
      }
    }
  },
  computed: {
    ...mapGetters({
      editedItem_vuex: "appointment/getEditedItem",
      editedItemIndex: "appointment/getEditedIndex"
    })
  },
  methods: {
    search_add() {
      if (!this.is_control_searching) {
        this.is_control_searching = true;
        this.control_search({
          id: this.control_number
        })
          .then(() => {
            this.step = 2;
          })
          .catch(res => {
            this.errors = Object.assign({}, res.errors);
          })
          .then(() => {
            this.is_control_searching = false;
          });
      }
    },
    reset() {
      this.reload().then(() => {
        this.control_number = null;
        this.errors = Object.assign({}, {});
        this.step = 1;
      });
    },
    save() {
      this.doSave(this.editedItem)
        .then(() => {
          this.reset();
        })
        .catch(res => {
          this.errors = Object.assign({}, res.errors);
        });
    },
    complete(id) {
      // console.log(id);
      this.setCompleted(id);
      this.reset();
    },
    ...mapActions({
      control_search: "appointment/control_search",
      doSave: "appointment/doSave",
      reload: "appointment/reload",
      setCompleted: "appointment/setCompleted"
    })
  }
};
</script>
