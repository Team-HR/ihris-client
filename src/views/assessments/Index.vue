<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Assessments</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col v-if="superior" cols="12" sm="12" md="6" class="mx-auto">
        <!-- <v-card> -->
        <template v-for="(assessment, index) in superior_assessments">
          <v-card :key="index" class="mt-2">
            <v-card-title primary-title>
              {{ assessment.title }}
            </v-card-title>
            <v-card-subtitle
              >Status:
              <span class="red--text">{{
                assessment.status
              }}</span></v-card-subtitle
            >
            <v-card-text>
              {{assessment.description}}
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success" :to="`/assessments/${assessment.id}`">
                <v-icon>mdi-menu-right-outline</v-icon>
                Start
              </v-btn>
              <!-- :to="`/assessments/personnels/${assessment.id}`" -->
              <v-btn 
                color="primary" 
                :to="`/department/offices/${superior.department_id}/supervisory/${superior.office_id}/edit/${superior.id}`"
              >
                <v-icon class="mr-1">mdi-account-group-outline</v-icon> 
                Personnels
              </v-btn>
               <!-- <v-btn
                color="primary" :to="`/assessments/report/${assessment.id}`">
                <v-icon class="mr-1">mdi-chart-box-outline</v-icon> 
                Report
              </v-btn> -->

       <!--        <v-row no-gutters dense>
                <v-col>
                  <v-btn color="success" :to="`/assessments/${assessment.id}`">
                <v-icon>mdi-menu-right-outline</v-icon>
                Start
              </v-btn>
                </v-col>
                <v-col>
                  <v-btn color="primary" :to="`/assessments/personnels/${assessment.id}`">
                <v-icon class="mr-1">mdi-account-group-outline</v-icon> 
                Personnels
              </v-btn>

                </v-col>
                <v-col>
                  <v-btn color="primary" :to="`/assessments/report/${assessment.id}`">
                <v-icon class="mr-1">mdi-chart-box-outline</v-icon> 
                Report
              </v-btn>

                </v-col>
              </v-row>
               -->
            </v-card-actions>
          </v-card>
        </template>
        <!-- </v-card> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      superior_assessments: [
        {
          id: 1,
          title: "Competency Assessment",
          description: "For office supervisors only, for assessing their subordinates' competencies strengths.",
          status: "Incomplete",
        },
      ],
      superior: null
    };
  },
  mounted() {
    this.checkIfSuperior()
  },
  watch: {},
  methods: {
    checkIfSuperior(){
      this.axios({    
        method: "get",
        url: "superior/authCheck",
      }).then(res=>{
        // console.log("authCheck: ",res.data);
        this.superior = JSON.parse(JSON.stringify(res.data));
      })
    }
  },
};
</script> 