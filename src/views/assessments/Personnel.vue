<template>
  <div>
    <!-- {{$route.params.id }} -->
    <v-toolbar>
      <v-app-bar-nav-icon>
        <v-btn icon to="/assessments">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Edit Personnel</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <v-card class="mt-2">
          <v-card-title primary-title> Current </v-card-title>


          <v-text-field
            class="ma-5"
            v-model="search_current"
            append-icon="mdi-magnify"
            label="Search"
            outlined
            dense
            single-line
            hide-details
            clearable
          ></v-text-field>

          <v-data-table
            sort-by="full_name"
            dense
            :headers="headers_current"
            :items="peers"
            :search="search_current"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn small class="ma-1" @click="deleteDialog(item)">
                Remove
              </v-btn>
            </template>
            <template v-slot:[`item.is_complete`]="{ item }">
              <span v-if="item.is_complete" class="green--text">Done</span>
              <span v-else class="red--text">Incomplete</span>
            </template>
            <template v-slot:no-data>
              <!-- <v-btn small color="primary"> Reset </v-btn> -->
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <v-card class="mt-2">
          <v-card-title primary-title> Employees to Add </v-card-title>

          <!-- search field -->
          <!-- sorter (by all/department) -->

          <v-text-field
            class="ma-5"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            outlined
            dense
            single-line
            hide-details
            clearable
          ></v-text-field>

          <v-data-table
            sort-by="full_name"
            dense
            :headers="headers"
            :items="employees"
            :search="search"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn small class="ma-1" @click="addToList(item)"> Add </v-btn>
            </template>

            <!-- <template v-slot:item = "{index,item}">

    <tr>
      <td>
        <v-btn small class="ma-1" @click="addToList(index)">Add</v-btn>
      </td>
      <td>{{item.full_name}}</td>
    </tr>

</template> -->
            <template v-slot:no-data>
              <!-- <v-btn small color="primary"> Reset </v-btn> -->
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline"> Confirm removal? </v-card-title>
          <v-card-text>
            Removing this personnel will also remove his/her record for this
            questionnaire.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" text @click="dialog = false">
              Disagree
            </v-btn>
            <v-btn color="red darken-1" text @click="confirmDelete()">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
// import { delete } from 'vue/types/umd';

export default {
  data() {
    return {
      dialog: false,
      deleteNow: false,
      radioGroup: "",
      theItem: {},
      employees: [],
      peers: [],
      search: "",
      search_current: "",
      headers_current: [
        { text: "Actions", value: "actions", sortable: false, width: 100 },
        {
          text: "Name",
          // align: 'start',
          // sortable: false,
          value: "full_name",
        },
        {
          text: "Status",
          // align: 'start',
          // sortable: false,
          value: "is_complete",
        },
      ],
      headers: [
        { text: "Actions", value: "actions", sortable: false, width: 100 },
        {
          text: "Name",
          // align: 'start',
          // sortable: false,
          value: "full_name",
        },

      ],
    };
  },
  mounted() {
    this.$store.dispatch("assessment/getPeers").then((res) => {
      this.peers = JSON.parse(JSON.stringify(res));
    });

    this.axios({
      method: "get",
      url: "/superior/get_free_employees",
    }).then((res) => {
      this.employees = JSON.parse(JSON.stringify(res.data));
    });
  },
  watch: {},
  methods: {
    addToList(item) {
      // console.log('from employees index: ',item);
      // this.employees.splice(1,1)
      this.axios.post('/competency/add_peer',{
        employee_id: item.employee_id,
      })
        .then( (response) => {
         //Getting data from response
         console.log(response);
         var removeIndex = this.employees
           .map(function (el) {
             return el.employee_id;
           })
           .indexOf(item.employee_id);
         // console.log(removeIndex);
         var _item = {};
         _item = JSON.parse(JSON.stringify(response.data));
         // _item.competency_records = {};
         // _item.is_complete = 0;
         // _item.questionnaire_id = "";
         // _item.superior_id = "";
         // _item.superiors_record_id = "";
         // console.log("_item: ",_item);
         this.peers.push(_item);
         this.employees.splice(removeIndex, 1);
        })
        // .catch( function (error){
        //   // Describe error!
        // });
    },

    deleteDialog(item) {
      // console.log(item);
      this.theItem = item;
      if (item.is_complete == 1) {
        this.dialog = true;
      } else
        this.removeToList()
    },

    confirmDelete() {
      this.removeToList();
    },

    removeToList() {

      console.log(this.theItem);
      this.axios.post('competency/delete_peer',{
        employee: this.theItem
      })
        .then((response)=>{
         //Getting data from response
         console.log(response);


               this.dialog = false;
               var item = this.theItem;
               var removeIndex = this.peers
                 .map(function (el) {
                   return el.employee_id;
                 })
                 .indexOf(item.employee_id);
               var _item = {};
               _item = JSON.parse(JSON.stringify(item));
               delete _item.competency_records;
               delete _item.is_complete;
               delete _item.questionnaire_id;
               delete _item.superior_id;
               delete _item.superiors_record_id;
               // console.log(_item);
               this.employees.push(_item);
               this.peers.splice(removeIndex, 1);


        })
        .catch((error)=>{
          // Describe error!
        });
    },
  },
};
</script>
