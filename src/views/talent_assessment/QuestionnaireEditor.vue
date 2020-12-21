<template>
  <div>
    <template v-for="(question, key) in questions">
      <v-form :key="key">
        <v-card class="pa-5 ma-5">
          <!-- question -->
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="questions[key].text"
                :label="'Question ' + (key + 1)"
              />
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="questions[key].type"
                :items="option_types"
                label="Type"
              ></v-select>
            </v-col>
          </v-row>
          <!-- answers -->
          <template v-for="(option, n) in questions[key].options">
            <v-row :key="n" no-gutters class="pa-2">
              <v-col width="20">
                <v-radio width="20" v-model="questions[key].options[n].value">
                  <template v-slot:label>
                    <v-text-field
                      class="pt-0 mt-0"
                      :label="codeToChar(n)"
                      hide-details
                      v-model="questions[key].options[n].text"
                      placeholder="..."
                    />
                  </template>
                </v-radio>
              </v-col>
              <v-col width="20">
                <v-btn icon @click="remove_option(n)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
              </v-col>
            </v-row>
          </template>
          <v-row>
            <v-col>
              <v-btn text @click="add_option(key)">Add Option</v-btn> or
              <v-btn text @click="add_others(key)">Add Others</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-form>
    </template>
    <v-card class="pa-5 mt-5" flat>
      <v-btn @click="add_question">Add Question</v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          text: "What is the",
          type: "Multiple Choice",
          options: [
            {
              text: "",
              value: false,
            },
          ],
        },
      ],
      question: {
        text: "",
        options: [
          {
            text: "",
            value: false,
          },
        ],
      },
      survey_id: 0,
      option_types: [
        "Short Answer",
        "Paragraph",
        "Multiple Choice",
        "Checkboxes",
        "Dropdown",
      ],
    };
  },
  methods: {
    add_question() {
      this.questions.push("");
    },
    add_option(key) {
      this.questions[key].options.push({
        text: "",
        value: false,
      });
      console.log(key);
    },
    add_others(key) {
      // console.log(key);
      // console.log(String.fromCharCode(65));
      // console.log("Z".charCodeAt(0));
    },
    codeToChar(n) {
      if (!n) return String.fromCharCode(65);
      return String.fromCharCode(n + 65);
    },
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.survey_id = this.$route.params.id;
  },
};
</script>

<style></style>