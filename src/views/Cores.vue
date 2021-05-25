<template>
  <v-row>
    <template v-for="(core, id) in cores">
      <v-col :key="id" lg="3" md="12">
        <v-card class="" max-width="400" tile>
          <v-list>
            <v-subheader>{{ core.title }}</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in core.items"
                :key="i"
                :inactive="inactive"
                :to="item.path"
              >
                <v-list-item-avatar v-if="avatar">
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-if="twoLine || threeLine"
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    item: 5,
    cores: [
      {
        title: "RSP (Recruitment, Selection and Placement)",
        items: [
          { title: "Plantilla (Permanent)", path: "/plantilla" },
          { title: "Publications", path: "" },
          { title: "Comparative Data", path: "" },
          { title: "Individual Turn Around Time", path: "" },
          { title: "System of Ranking Position", path: "" },
          { title: "Staffing Plan", path: "" },
          { title: "Turn Around", path: "" },
          { title: "Personnel Competency Encode", path: "" },
          { title: "Personnel Competency Form", path: "" },
          { title: "Personnel Competency Report", path: "" }
        ]
      },
      {
        title: "L&D (Learning and Development)",
        items: [
          { title: "Training/Seminar Invitation/Communication" },
          { title: "Training Schedule/Evaluation" },
          { title: "L&D Profile" },
          { title: "L&D Plan" },
          { title: "L&D Activities" },
          { title: "Development Needs Assessment" },
          { title: "Training Report" },
          { title: "Talent Assessment Report" }
        ]
      },
      {
        title: "SPMS (Strategic Performance Monitoring System)",
        items: [
          { title: "Performance Rating Report" },
          { title: "Coaching and Mentoring Report" },
          { title: "Feedback and Monitoring Report" },
          { title: "Turn Around Time" },
          { title: "Summary of Comments for Development Intervention" }
        ]
      },
      {
        title: "R&R (Rewards and Recognition)",
        items: [
          { title: "Personnel Recognition" },
          { title: "R&R Plan (Yearly)" },
          { title: "System Review" },
          { title: "Search for Outstanding Employees" }
        ]
      }
    ],
    disabled: false,
    dense: false,
    twoLine: false,
    threeLine: false,
    shaped: false,
    flat: false,
    subheader: false,
    inactive: false,
    subGroup: false,
    nav: false,
    avatar: false,
    rounded: false
  })
};
</script>
