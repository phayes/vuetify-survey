<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <VuetifySurvey :survey="survey_data" />
    </v-main>
  </v-app>
</template>

<script>
import VuetifySurvey from "./components/VuetifySurvey";

export default {
  name: "App",

  components: {
    VuetifySurvey,
  },

  data: () => ({
    survey_data: {
      title: "Survey 1",
      items: [
        {
          id: "question_1",
          type: "checkbox",
          title: "Some Title",
          instructions: "Some instructions",
          props: {
            label: "I'm a checkbox!",
          },
        },
        {
          id: "question_2",
          type: "checkboxes",
          title: "Some other title",
          items: [
            { value: "one", label: "One" },
            { value: "two", label: "Two" },
            { value: "three", label: "Three" },
          ],
          props: {
            title: "Checkboxes!",
          },
        },
        {
          id: "question_3",
          type: "text-field",
          props: {
            label: "Text field!",
          },
        },
      ],
    },
  }),
};
</script>
