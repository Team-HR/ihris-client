<template>
  <v-container fluid>
    <v-row>
      <v-col md="3" xs="12"> <step-form></step-form></v-col>
      <v-col md="9" xs="12">
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>TLB</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item="{ item, index }">
            <tr
              :class="{
                'teal lighten-5': editedIndex === index ? true : false
              }"
            >
              <td align="center">
                <v-icon @click="editItem(item)" class="mr-2">
                  mdi-file-document-edit-outline
                </v-icon>
              </td>
              <td>
                {{ item.id }}
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ formattedDate(item.date_received) }}</td>
              <td>
                <div v-if="item.date_forwarded">
                  {{ formattedDate(item.date_forwarded) }}
                </div>
                <div v-else>
                  Not Forwarded
                </div>
              </td>
              <td>
                <div v-if="item.date_completed">
                  {{ formattedDate(item.date_completed) }}
                </div>
                <span v-else class="orange--text">
                  <v-icon color="orange">mdi-file-clock-outline</v-icon>
                  Pending...
                </span>
              </td>
              <td align="center">
                {{ item.turn_around_time ? item.turn_around_time : "--" }}
              </td>
            </tr>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import StepForm from "./StepForm";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    StepForm
  },
  data: () => ({
    headers: [
      { text: "Actions", align: "center", value: "actions", sortable: false },
      {
        text: "Control #",
        align: "start",
        value: "id"
      },
      { text: "Name", value: "name" },
      { text: "Description", value: "description" },
      { text: "Date Recieved", value: "date_received" },
      { text: "Date Forwarded", value: "date_forwarded" },
      { text: "Date Completed", value: "date_completed", align: "center" },
      {
        text: "No. of Hours Processed",
        align: "center",
        value: "turn_around_time"
      }
    ]
  }),
  computed: {
    ...mapGetters({
      items: "tlb/getItems",
      editedIndex: "tlb/getEditedIndex"
    })
  },
  created() {
    this.initialize();
  },
  methods: {
    newItem() {
      this.editItem({});
    },
    editItem(item) {
      this.setEditedItem(item);
    },
    close() {
      this.reload();
    },
    formattedDate(date) {
      return date && moment(date).format("MMM/DD/YY");
    },
    ...mapActions({
      initialize: "tlb/init",
      setEditedItem: "tlb/setEditedItem",
      reload: "tlb/reload"
    })
  }
};
</script>
