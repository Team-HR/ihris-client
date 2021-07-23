

<template>

<div>
    <!-- {{$route.params.id }} -->
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Competency Assessment</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-btn
        text
        color="primary"
        to="/assessments"
      >
        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-row v-if="state == 0">
        <v-col cols="12" sm="12" md="6" class="mx-auto">
            <v-card class="elevation-0">
                <v-card-text class="text-center">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    Loading...
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row v-else-if="state == 1">
        <v-col cols="12" sm="12" md="6" class="mx-auto">
            <v-card>
                <v-card-text>
        <span @click="dialog = true">
          <v-btn class="mr-2" icon color="primary" dark dense>
            <v-icon dense>mdi-pencil</v-icon>
          </v-btn>
          <span class="primary--text">{{ peers[subjectIndex].full_name }}</span>
        </span>

        </v-card-text>
        </v-card>
            <!-- fullscreen -->
            <!-- hide-overlay -->
            <v-dialog v-model="dialog" width="500" transition="dialog-bottom-transition">
                <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" >
              Change
            </v-btn>
          </template> -->
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Pick Personnel to Assess</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <!-- <v-btn
              dark
              text
              @click="dialog = false"
            >
              Save
            </v-btn> -->
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-radio-group v-model="radioGroup" class="ml-5">
                        <v-radio v-for="(peer, n) in peers" :key="n" :value="n">
                            <template v-slot:label>
                                <div>
                                    {{ n + 1 }}.
                                    <span :class="isComplete(n) ? 'green--text' : 'grey--text'" class="pr-2">{{ peer.full_name }}</span
                    >
                    <v-icon v-if="isComplete(n)" color="success"
                      >mdi-check</v-icon
                    >
                    <v-icon v-else color="red">mdi-cancel</v-icon>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>

            <v-card-actions>
              <v-btn color="primary" class="ml-5" @click="dialog = !dialog"
                >Continue</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-stepper v-model="e1" class="elevation-0">
          <v-stepper-items>
            <v-stepper-content
              v-for="(item, i) in competencies"
              :key="`${i}`"
              :step="i + 1"
            >
              <h3>
                {{ i + 1 }}
                <span style="font-size: 10px; color: grey">of 24</span>.) {{ item.title }}
                                    </h3>
                                    <p style="font-size: 14px">
                                        <i>{{ item.description }}</i>
                                    </p>

                                    <v-simple-table dense>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-left">Level</th>
                                                    <th class="text-left">
                                                        Proficiency/ Mastery Level Behavioral Indicators
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(level, k) in item.levels" :key="k">
                                                    <td style="white-space: nowrap">
                                                        <!-- :value="k + 1" -->
                                                        <v-checkbox :disabled="peers[subjectIndex].is_complete?true:false" v-model="
                            peers[subjectIndex].competency_records[i]
                              .questionnaire_option_id
                          " :value="level.questionnaire_option_id" :label="`Level ${k + 1}`" />
                                                    </td>
                                                    <td>{{ level.proficiency }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                    <!-- </v-card> -->
                                    <!-- <v-card-actions> -->
                                    <div class="mt-2">
                                        <v-btn v-if="i + 1 !== 1" color="primary" @click="backStep(i + 1)" class="mr-5">
                                            Back
                                        </v-btn>

                                        <v-btn v-if="e1 != 24" color="primary" @click="nextStep(i + 1)">
                                            Continue
                                        </v-btn>
<!-- <div v-if="peers[subjectIndex].is_complete==1"> -->
                                        <v-btn :disabled="saving||peers[subjectIndex].is_complete?true:false" v-else color="success" @click="assessNext()">
                                            Submit
                                        </v-btn>
<!-- </div> -->
                                    </div>
                                    <!-- <v-btn color="primary" @click="logMe()" text> log </v-btn> -->
                                    <!-- <v-spacer></v-spacer> -->
                                    <!-- </v-card-actions> -->
                                    <!-- end of card form -->

                                    <!-- <v-btn text>
            Cancel
          </v-btn> -->
                                    </v-stepper-content>
                                    </v-stepper-items>
                                    </v-stepper>
        </v-col>
    </v-row>
    <v-row v-else-if="state == 2">
        <v-col cols="12" sm="12" md="6" class="mx-auto">
            <v-card>
                <v-card-text>
                    <h1>No List Found! Please add personnels to the poll.</h1>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-snackbar v-model="snackbarErrorToContinue" centered color="red" timeout="2000">
        <v-icon>mdi-alert-decagram-outline</v-icon> Please select level to continue!
    </v-snackbar>
    </div>

</template>

<script>

// import { mapGetters } from "vuex";
export default {
    //   computed: mapGetters({ testing: "getTesting" }),

    data() {
            return {
                saving: false,
                snackbarErrorToContinue: false,
                dialog: true,
                radioGroup: 0,
                subjectIndex: 0,
                state: 0,
                peers: [],
                e1: 1,
                steps: 24,
                competencies: [],
            };
        },
        mounted() {
            this.getPeers();
        },
        watch: {
            dialog: function(val) {
                if (!val) {
                    this.subjectIndex = this.radioGroup;
                    this.e1 = 1;
                }
            },
        },
        methods: {
            getQuestionnaire() {
                    this.axios
                        .get("/competency/get_questionnaire")
                        .then((res) => {
                            this.competencies = Object.assign([], res.data);
                            // console.log(this.competencies);
                        })
                        .then(() => {
                            // this.$store.dispatch("setAppLoadingDone");
                            // this.state = 1;
                            this.$nextTick(() => {
                                // this.overlay = false
                                this.state = 1;
                            });
                        });
                },
                getPeers() {
                    this.state = 0;
                    // this.axios
                    //   .get("/competency/peers")
                    //   .then((res) => {
                    //     console.log(res.data);
                    //     this.peers = Object.assign([], res.data);

                    //     if (this.peers.length == 0) {
                    //       this.state = 2;
                    //     }
                    //     console.log(res.data);
                    //   })
                    //   .then(() => {
                    //     // this.$store.dispatch("setAppLoadingDone");
                    //     this.getQuestionnaire();
                    //   });

                    this.$store
                        .dispatch("assessment/getPeers")
                        .then((res) => {
                            // console.log(res)
                            // this.peers = res
                            // this.peers = Object.assign([], res);
                            // this.peers = res.slice()
                            this.peers = JSON.parse(JSON.stringify(res));

                            if (this.peers.length == 0) {
                                this.state = 2;
                            }
                        })
                        .then(() => {
                            // this.$store.dispatch("setAppLoadingDone");
                            this.getQuestionnaire();
                        });
                },
                isComplete(i) {
                    return this.peers[i].is_complete == 1 ? true : false;
                },
                logMe() {
                    // console.log("save: ", this.peers[this.subjectIndex]);
                    // console.log("subjectIndex: ", this.subjectIndex);
                },
                nextStep(n) {
                    // console.log(this.peers[this.subjectIndex].data[n]?true:false);
                    // console.log();
                    if (this.peers[this.subjectIndex].competency_records[n - 1].questionnaire_option_id) {
                        if (n === this.steps) {
                            this.e1 = 1;
                        } else {
                            this.e1 = n + 1;
                        }
                    } else {
                        this.snackbarErrorToContinue = true;
                    }
                },
                backStep(n) {
                    if (n === 1) {
                        this.e1 = 1;
                    } else {
                        this.e1 = n - 1;
                    }
                },
                assessNext() {
                    this.saving = true
                    if(this.peers[this.subjectIndex].competency_records[23].questionnaire_option_id != null)
                    {
                        this.axios
                            .post("/competency/store", this.peers[this.subjectIndex])
                            .then((res) => {
                                this.saving = false
                                this.getPeers();
                                this.dialog = true;
                            })
                            .catch((err) => {
                                // console.error(err);
                            });
                        if (this.peers.length != this.subjectIndex + 1) {
                            this.radioGroup = this.subjectIndex + 1;
                        }
                    } else 
                    {
                        this.snackbarErrorToContinue = true;
                        this.saving = false
                    }
                    
                },
        },
};

</script>
