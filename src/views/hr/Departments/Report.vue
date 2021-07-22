<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Report</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>

      <v-btn text color="primary" to="/departments">
        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <v-card>
        <!-- content here start -->
        <v-card-text>
            <ol>
                <li v-for="item in items" :key=item.id>
                    <b class="blue--text">{{item.department}}</b>  (department_id: {{item.id}})
                    <ol>
                        <li v-for="office in item.offices" :key="office.id">
                            <b>{{office.office}}</b>  (office_id: {{office.id}})
                            <ol>
                                <li v-for="superior in office.superiors" :key="superior.id">
                                    <span class="orange--text">{{superior.full_name}}</span> (superior_id: {{superior.id}}, employee_id: {{superior.employee_id}})
                                    <ol>
                                        <li v-for="subordinate in superior.subordinates" :key="subordinate.id">
                                            <span :class="subordinate.is_complete?'green--text':''">{{subordinate.full_name}}</span> (superiors_record_id: {{subordinate.id}}, employee_id: {{subordinate.employee_id}})
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                    </ol>

                </li>
            </ol>
        </v-card-text>
        <!-- content here end -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
        items: []
    };
  },
  mounted() {
      this.axios.get("/department/get_department_tree").then((res)=>{
        //   console.log(res.data);
          this.items = JSON.parse(JSON.stringify(res.data))
      })
  },
  computed: {},
  watch: {},
  methods: {
   
  },
}
</script> 