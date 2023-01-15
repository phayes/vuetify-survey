<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Vuetify Survey</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/phayes/vuetify-survey" target="_blank" text>
        <span class="mr-2">Documentation</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-layout>
        <v-flex xs6>
          
          <v-sheet elevation="6" class="pa-6 ma-6">
            <h3 class="mb-6">Survey Editor <span style="font-family: Courier,monispace">&lt;VuetifySurveyEditor&gt;</span></h3>
            <VuetifySurveyEditor v-model="survey_def" />
          </v-sheet>

          <v-sheet elevation="6" class="pa-6 ma-6">
            <h3>Survey Definition</h3>
            <v-textarea
              dense
              v-model="survey_def_json"
              rows="10"
              style="font-size: 0.8rem; font-family: Courier, monospace;"
            />
          </v-sheet>
        </v-flex>
        <v-flex xs6>
          <v-sheet elevation="6" class="pa-6 ma-6">
            <h3 class="mb-6">Survey Viewer <span style="font-family: Courier,monispace">&lt;VuetifySurvey&gt;</span></h3>
            <VuetifySurvey :survey="survey_def" v-model="survey_data" />
          </v-sheet>

          <v-sheet elevation="6" class="pa-6 ma-6">
            <h3>Survey Data</h3>
            <v-textarea
              dense
              v-model="survey_data_json"
              rows="10"
              style="font-size: 0.8rem; font-family: Courier, monospace;"
            />
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
import VuetifySurvey from "./VuetifySurvey";
import VuetifySurveyEditor from "./VuetifySurveyEditor";

export default {
  name: "App",

  components: {
    VuetifySurvey,
    VuetifySurveyEditor,
  },

  data: () => ({
    survey_data: {},
    survey_def: {
      title: "",
      items: []
    },
  }),
  computed: {
    survey_data_json() {
      return JSON.stringify(this.survey_data, null, 2);
    },
    survey_def_json: {
      get() {
        return JSON.stringify(this.survey_def, null, 2);
      },
      set(value) {
        this.survey_def = JSON.parse(value);
      },
    },
  },
};
</script>
