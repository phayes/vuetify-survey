<template>
  <div>
    <v-text-field
      outlined
      label="Title"
      class="vuetify-survey-editor-title"
      v-model="active_survey.title"
      @change="changed"
    />
    <v-textarea
      outlined
      label="Instructions"
      class="vuetify-survey-editor-instructions"
      v-model="active_survey.instructions"
      @change="changed"
    />

    <!-- Align to end -->
    <v-layout justify-end class="mb-6">
      <v-btn color="primary" class="vuetify-survey-editor-add-item" @click="add_item">Add Item</v-btn>
    </v-layout>

    <v-list subheader two-line>
      <div v-for="(item, idx) in active_survey.items" :key="idx">
        <v-divider />
        <v-list-item>
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark>{{ item_icon(item) }}</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle v-if="show_item_id" v-text="item.id"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="edit_item(idx)">
              <v-icon color="grey lighten-1">mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn icon @click="delete_item(idx)">
              <v-icon color="grey lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
      </div>
    </v-list>

    <v-dialog v-model="item_editor_dialog" max-width="1200">
      <v-card>
        <v-card-title style="padding: 0px">
          <v-toolbar grey flat>
            <v-btn icon @click="active_item = null; item_editor_dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ active_item ? active_item.title : "New Item" }}</v-toolbar-title>
          </v-toolbar>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <VuetifySurveyItemEditor
            ref="active_item_editor"
            :allow_edit_style="allow_edit_item_style"
            :allow_edit_class="allow_edit_item_class"
            :show_id="show_item_id"
            :value="active_item"
            class="mt-6"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="active_item = null; item_editor_dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="save_active_item">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VuetifySurveyItemEditor from "./VuetifySurveyItemEditor.vue";
import Vue from "vue";

export default {
  name: "VuetifySurveyEditor",
  components: { VuetifySurveyItemEditor },
  props: {
    value: {
      type: Object,
      required: true,
    },
    allow_edit_item_style: {
      type: Boolean,
      default: true,
    },
    allow_edit_item_class: {
      type: Boolean,
      default: true,
    },
    show_item_id: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      active_survey: this.value,
      active_item: null,
      active_item_idx: null,
      item_editor_dialog: false,
    };
  },
  watch: {
    value() {
      this.active_survey = this.value;
    },
  },
  methods: {
    changed() {
      this.$emit("input", this.value);
    },
    item_icon(item) {
      if (item.type == "text-field") {
        return "mdi-form-textbox";
      }
      if (item.type == "number-field") {
        return "mdi-numeric";
      }
      if (item.type == "textarea") {
        return "mdi-card-text";
      }
      if (item.type == "checkbox") {
        return "mdi-checkbox-marked";
      }
      if (item.type == "switch") {
        return "mdi-toggle-switch";
      }
      if (item.type == "checkboxes") {
        return "mdi-checkbox-multiple-marked";
      }
      if (item.type == "select") {
        return "mdi-form-dropdown";
      }
      if (item.type == "autocomplete") {
        return "mdi-text-search";
      }
      if (item.type == "rating") {
        return "mdi-star";
      }
      if (item.type == "mood") {
        return "mdi-emoticon-happy";
      }
    },
    delete_item(idx) {
      Vue.delete(this.active_survey.items, idx);
    },
    edit_item(idx) {
      // Deep clone active_item
      this.active_item_idx = idx;
      this.active_item = JSON.parse(
        JSON.stringify(this.active_survey.items[idx])
      );

      this.item_editor_dialog = true;
    },
    add_item() {
      this.active_item = {
        id: "",
        title: "",
        type: "text-field",
        props: {},
      };

      this.active_item_idx = null;
      this.item_editor_dialog = true;
    },
    save_active_item() {
      let saved_item = this.$refs["active_item_editor"].save();

      if (saved_item) {
        if (this.active_item_idx !== null) {
          Vue.set(this.active_survey.items, this.active_item_idx, saved_item);
        } else {
          this.active_survey.items.push(saved_item);
        }

        this.active_item = null;
        this.item_editor_dialog = false;
      }
    },
  },
};
</script>



