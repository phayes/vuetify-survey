<template>
  <div v-if="active_item && active_item != {}">
    <v-layout justify-space-between>
      <v-flex xs8>
        <v-text-field
          label="Title"
          class="vuetify-survey-editor-item-title"
          outlined
          v-model="active_item.title"
        />
      </v-flex>

      <v-flex xs3>
        <v-select
          label="Type"
          class="vuetify-survey-editor-item-type"
          :items="type_items"
          outlined
          v-model="active_item.type"
          :prepend-inner-icon="item_icon(active_item.type)"
        >
          <template v-slot:item="{ item }">
            <v-list-item-avatar>
              <v-icon>{{ item_icon(item.value) }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-select>
      </v-flex>
    </v-layout>

    <p
      v-if="show_id && !id_changed"
      @click="id_changed = true"
      style="min-height: 22px; margin-left: 5px; margin-top:-10px"
    >
      id:
      <span style="font-family: Courier, monospace;">{{ active_item.id }}</span>
    </p>

    <v-text-field
      v-if="show_id && id_changed"
      label="Identifier"
      dense
      outlined
      class="vuetify-survey-editor-item-id"
      style="font-family: Courier, monospace;"
      v-model="active_item.id"
      @change="id_changed = true"
    />

    <!-- Select components for select, checkboxes, and radio-group -->
    <v-sheet
      v-if="active_item.type == 'select' || active_item.type == 'checkboxes' || active_item.type == 'radio-group'"
      elevation="1"
      class="pa-6 mb-6"
    >
      <div class="text-h6 mb-4" style="font-weight: 400">Options</div>
      <v-layout
        v-for="(option, option_idx) in active_item.items"
        :key="option_idx"
        justify-space-between
        class="mb-n3"
      >
        <v-flex xs4>
          <v-text-field
            outlined
            dense
            label="Text"
            v-model="active_item.items[option_idx].text"
            @change="maybe_suggest_item_value(option_idx)"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-text-field outlined dense label="Value" v-model="active_item.items[option_idx].value"></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-text-field
            v-if="allow_edit_class"
            outlined
            dense
            label="Class"
            v-model="active_item.items[option_idx].class"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-text-field
            v-if="allow_edit_style"
            outlined
            dense
            label="Style"
            v-model="active_item.items[option_idx].style"
          ></v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-btn v-if="active_item.items.length > 2" icon @click="delete_option_item(option_idx)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-btn
        class="mt-3"
        color="primary"
        small
        @click="active_item.items.push({'value': '', 'text': ''})"
      >Add Option</v-btn>
    </v-sheet>

    <!-- Label component for checkbox and switch -->
    <v-text-field
      v-if="active_item && active_item.props && (active_item.type == 'checkbox' || active_item.type == 'switch')"
      label="Label"
      outlined
      v-model="active_item.props.label"
      @change="label_changed = true"
    />

    <!-- Number options -->
    <v-layout
      v-if="active_item && active_item.props && active_item.type == 'number-field'"
      justify-space-between
    >
      <v-flex xs2>
        <v-switch label="Integers Only" v-model="active_item.integer_only" />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          label="Mininum"
          type="number"
          :step="active_item.step ? active_item.step : 'any'"
          outlined
          v-model="active_item.min"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          label="Maximum"
          type="number"
          :step="active_item.step ? active_item.step : 'any'"
          outlined
          v-model="active_item.max"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          label="Step"
          type="number"
          outlined
          :step="active_item.integer_only ? 1 : 'any'"
          v-model="active_item.step"
        />
      </v-flex>
    </v-layout>

    <!-- Text Options -->
    <v-layout
      v-if="active_item && active_item.props && active_item.type == 'text-field' || active_item.type == 'textarea'"
      justify-space-between
    >
      <v-flex xs3>
        <v-text-field
          label="Maximum Length"
          type="number"
          step="1"
          min="1"
          dense
          outlined
          v-model="active_item.maxlength"
        />
      </v-flex>
      <v-flex xs3></v-flex>
      <v-flex xs3></v-flex>
    </v-layout>

    <!-- Rating options -->
    <v-layout
      v-if="active_item && active_item.props && active_item.type == 'rating'"
      justify-space-between
    >
      <v-flex xs2>
        <v-text-field
          label="Length"
          type="number"
          :step="1"
          outlined
          v-model="active_item.props.length"
        />
      </v-flex>

      <v-flex xs2>
        <v-text-field
          label="Size"
          type="number"
          :step="1"
          outlined
          v-model="active_item.props.size"
        />
      </v-flex>

      <v-flex xs2>
        <v-select
          outlined
          label="Icon"
          :items="rating_icons"
          v-model="active_item.rating_icon"
          :prepend-inner-icon="active_item.rating_icon"
        >
          <template v-slot:item="{ item }">
            <v-list-item-avatar>
              <v-icon>{{ item.value }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-select>
      </v-flex>
    </v-layout>

    <!-- Mood options -->
    <v-layout
      v-if="active_item && active_item.props && active_item.type == 'mood'"
      justify-space-between
    >
      <v-flex xs2>
        <v-text-field
          label="Size"
          type="number"
          :step="1"
          outlined
          v-model="active_item.props.size"
        />
      </v-flex>
    </v-layout>

    <v-expansion-panels v-model="style_panel">
      <v-expansion-panel>
        <v-expansion-panel-header>Instructions</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-textarea
            label="Instructions"
            class="vuetify-survey-editor-item-instructions"
            outlined
            v-model="active_item.instructions"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Default Value</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox
            v-if="active_item.type === 'checkbox'"
            v-model="active_item.default_value"
            :label="active_item.props.label || active_item.title"
          ></v-checkbox>
          <div v-if="active_item.type === 'checkboxes'">
            <v-checkbox
              v-for="(checkbox_item, checkbox_item_idx) in active_item.items"
              :key="checkbox_item_idx"
              :label="checkbox_item.text"
              :value="checkbox_item.value"
              v-model="active_item.default_value"
            ></v-checkbox>
          </div>
          <v-select
            v-if="active_item.type === 'select'"
            outlined
            v-model="active_item.default_value"
            :items="active_item.items"
          ></v-select>
          <v-text-field
            v-if="active_item.type === 'text-field'"
            outlined
            v-model="active_item.default_value"
          ></v-text-field>
          <v-text-field
            v-if="active_item.type === 'number-field'"
            type="number"
            outlined
            :min="active_item.min"
            :max="active_item.max"
            :step="active_item.step ? item.step : 'any'"
            v-model="active_item.default_value"
          ></v-text-field>
          <v-textarea v-if="active_item.type === 'textarea'" v-model="active_item.default_value"></v-textarea>
          <v-slider
            v-if="active_item.type === 'slider'"
            v-model="active_item.default_value"
            :min="active_item.min"
            :max="active_item.max"
            :step="active_item.step ? item.step : 'any'"
          ></v-slider>
          <v-range-slider
            v-if="active_item.type === 'range-slider'"
            v-model="active_item.default_value"
            :min="active_item.min"
            :max="active_item.max"
            :step="active_item.step ? item.step : 'any'"
          ></v-range-slider>
          <v-switch
            v-if="active_item.type === 'switch'"
            v-model="active_item.default_value"
            :label="active_item.props.label || active_item.title"
          ></v-switch>
          <v-rating
            v-if="active_item.type === 'rating'"
            :length="active_item.props.length"
            v-model="active_item.default_value"
          ></v-rating>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Properties</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox v-model="active_item.props.readonly" label="Readonly" />
          <v-checkbox
            v-if="active_item.type === 'text-field' || active_item.type === 'number-field' || active_item.type === 'textarea' || active_item.type === 'select'"
            v-model="active_item.props.outlined"
            label="Outlined"
            persistent-hint
          />
          <v-checkbox
            v-if="active_item.type === 'text-field' || active_item.type === 'number-field' || active_item.type === 'checkbox' || active_item.type === 'checkboxes' || active_item.type === 'select' || active_item.type === 'radio-group'"
            v-model="active_item.props.dense"
            label="Dense: Reduce the field height"
          />
          <v-checkbox
            v-if="active_item.maxlength"
            v-model="active_item.props.counter"
            label="Counter: Use a counter to inform a user of the character limit."
          />
          <v-checkbox
            v-if="active_item.type === 'text-field' || active_item.type === 'number-field' || active_item.type === 'textarea'"
            v-model="active_item.props.clearable"
            label="Clearable: Provides a clearing icon when the field is not empty."
          />
          <v-text-field
            v-if="active_item.type === 'text-field' || active_item.type === 'number-field' || active_item.type === 'textarea' || active_item.type === 'select'"
            v-model="active_item.props.hint"
            label="Hint"
            outlined
            hint="The hint property adds the provided string beneath the text field. Use 'Persistent Hint' to keep the hint visible when the text field is not focused."
          />
          <v-checkbox
            v-if="active_item.props.hint"
            v-model="active_item.props.persistent_hint"
            label="Persistent Hint: Keep the hint visible when the text field is not focused"
          />
          <v-text-field
            v-if="active_item.type === 'text-field' || active_item.type === 'number-field' || active_item.type === 'select'"
            v-model="active_item.props.prefix"
            label="Prefix"
            outlined
            hint="Prepend inline non-modifiable text next to the text field."
          />
          <v-text-field
            v-if="active_item.type === 'text-field' || active_item.type === 'number-field' || active_item.type === 'select'"
            v-model="active_item.props.suffix"
            label="Suffix"
            outlined
            hint="Append inline non-modifiable text next to the text field."
          />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!--
      <v-expansion-panel>
        <v-expansion-panel-header>Validation</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox v-model="active_item.required" label="Required" />
          <v-text-field
            v-if="active_item.type === 'text-field' || active_item.type === 'number-field' || active_item.type === 'textarea'"
            label="Regex"
            outlined
            dense
            hint="Enter a regular expression to validate the input"
            v-model="active_item.regex"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
      
      -->
      
      <v-expansion-panel v-if="allow_edit_class || allow_edit_style || allow_edit_visible">
        <v-expansion-panel-header>Visibility and CSS</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-if="allow_edit_visible"
            v-model="active_item.visible"
            outlined
            dense
            label="Visibility"
            class="vuetify-survey-editor-item-visible"
            hint="To make this item conditionally visible, enter a javascript expression that evaluates to true or false.  For example, if you want to show this item only if the user's age is greater than 18, enter: 'age > 18'.  You can use any of the item's values in the expression.  For example, if you want to show this item only if the user's age is greater than the value of question_1, enter: 'question_1 &amp;&amp; age > question_1'."
          />
          <v-text-field
            v-if="allow_edit_class"
            v-model="active_item.class"
            outlined
            dense
            label="Class"
            class="vuetify-survey-editor-item-class"
          />
          <v-text-field
            v-if="allow_edit_style"
            v-model="active_item.style"
            outlined
            dense
            label="Style"
            class="vuetify-survey-editor-item-style"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "VuetifySurveyItemEditor",
  components: {},
  props: {
    value: {
      type: Object,
    },
    allow_edit_style: {
      type: Boolean,
      default: true,
    },
    allow_edit_class: {
      type: Boolean,
      default: true,
    },
    allow_edit_visible: {
      type: Boolean,
      default: true,
    },
    show_id: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      active_item: JSON.parse(JSON.stringify(this.value)),
      id_changed: false,
      style_panel: false,
      label_changed: false,
      type_items: [
        { text: "Text Field", value: "text-field" },
        { text: "Number Field", value: "number-field" },
        { text: "Textarea", value: "textarea" },
        { text: "Checkbox", value: "checkbox" },
        { text: "Switch", value: "switch" },
        { text: "Checkboxes", value: "checkboxes" },
        { text: "Select", value: "select" },
        { text: "Radio Buttons", value: "radio-group" },
        { text: "Date", value: "date" },
        { text: "Birthday", value: "birthday" },
        { text: "Rating", value: "rating" },
        { text: "Mood", value: "mood" },
      ],
      rating_icons: [
        { text: "Star", value: "mdi-star" },
        { text: "Heart", value: "mdi-cards-heart" },
        { text: "Happy Face", value: "mdi-emoticon-happy" },
      ],
    };
  },
  watch: {
    value() {
      this.active_item = JSON.parse(JSON.stringify(this.value));

      if (this.active_item && !this.active_item.props) {
        Vue.set(this.active_item, "props", {});
      }
    },
    active_item: {
      handler() {
        if (!this.active_item || this.active_item == {}) {
          return;
        }
        if (!this.id_changed && !this.value.id) {
          this.active_item.id = this.suggested_id;
        }
        if (
          this.active_item.type == "checkboxes" ||
          this.active_item.type == "select" || 
          this.active_item.type == "radio-group"
        ) {
          if (!this.active_item.items) {
            Vue.set(this.active_item, "items", [
              { value: "", text: "" },
              { value: "", text: "" },
            ]);
          }
          if (!this.active_item.default_value) {
            Vue.set(this.active_item, "default_value", []);
          }
        } else {
          delete this.active_item.items;
        }

        if (
          this.active_item.type == "switch" ||
          this.active_item.type == "checkbox"
        ) {
          if (!this.active_item.props) {
            Vue.set(this.active_item, "props", {});
          }
          if (
            this.active_item.title &&
            !this.active_item.props.label &&
            !this.label_changed
          ) {
            Vue.set(this.active_item.props, "label", this.active_item.title);
          }
        }

        if (this.active_item.type == "number-field") {
          if (this.active_item.integer_only) {
            if (this.active_item.max) {
              Vue.set(
                this.active_item,
                "max",
                Math.round(this.active_item.max)
              );
            }
            if (this.active_item.min) {
              Vue.set(
                this.active_item,
                "min",
                Math.round(this.active_item.min)
              );
            }
            if (this.active_item.step) {
              Vue.set(
                this.active_item,
                "step",
                Math.round(this.active_item.step)
              );
            } else {
              Vue.set(this.active_item, "step", 1);
            }
          }
        } else {
          delete this.active_item.integer_only;
          delete this.active_item.min;
          delete this.active_item.max;
          delete this.active_item.step;
        }

        if (this.active_item.type == "rating") {
          if (!this.active_item.props) {
            Vue.set(this.active_item, "props", {});
          }
          if (!this.active_item.props.length) {
            Vue.set(this.active_item.props, "length", 5);
            Vue.set(this.active_item.props, "hover", true);
          }
          if (!this.active_item.props.size) {
            Vue.set(this.active_item.props, "size", 32);
          }
          if (!this.active_item.rating_icon) {
            Vue.set(this.active_item, "rating_icon", "mdi-star");
          }
        }

        if (this.active_item.type == "mood") {
          if (!this.active_item.props) {
            Vue.set(this.active_item, "props", {});
          }
          if (!this.active_item.props.size) {
            Vue.set(this.active_item.props, "size", 32);
            Vue.set(this.active_item.props, "hover", true);
          }
        }
      },
      deep: true,
    },
  },
  computed: {
    suggested_id() {
      return this.suggest_id(this.active_item.title);
    },
  },
  methods: {
    reset() {
      this.id_changed = false;
      this.style_panel = false;
      this.label_changed = false;
    },
    maybe_suggest_item_value(idx) {
      if (!this.active_item.items[idx].value) {
        Vue.set(
          this.active_item.items[idx],
          "value",
          this.suggest_id(this.active_item.items[idx].text)
        );
      }
    },
    suggest_id(label) {
      return label
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/ +/g, "_");
    },
    save() {
      // TODO: Check for errors

      // Validate
      if (this.active_item.type == "number-field") {
        if (typeof this.active_item.min == "string") {
          if (this.active_item.integer_only) {
            this.active_item.min = parseInt(this.active_item.min);
          } else {
            this.active_item.min = parseFloat(this.active_item.min);
          }
        }
        if (typeof this.active_item.max == "string") {
          if (this.active_item.integer_only) {
            this.active_item.max = parseInt(this.active_item.max);
          } else {
            this.active_item.max = parseFloat(this.active_item.max);
          }
        }
        if (typeof this.active_item.step == "string") {
          if (this.active_item.integer_only) {
            this.active_item.step = parseInt(this.active_item.step);
          } else {
            this.active_item.step = parseFloat(this.active_item.step);
          }
        }
      }

      this.reset();
      // return deep clone of active_item
      return JSON.parse(JSON.stringify(this.active_item));
    },
    delete_option_item(idx) {
      Vue.delete(this.active_item.items, idx);
    },
    item_icon(item_type) {
      if (item_type == "text-field") {
        return "mdi-form-textbox";
      }
      if (item_type == "number-field") {
        return "mdi-numeric";
      }
      if (item_type == "textarea") {
        return "mdi-card-text";
      }
      if (item_type == "checkbox") {
        return "mdi-checkbox-marked";
      }
      if (item_type == "switch") {
        return "mdi-toggle-switch";
      }
      if (item_type == "checkboxes") {
        return "mdi-checkbox-multiple-marked";
      }
      if (item_type == "select") {
        return "mdi-form-dropdown";
      }
      if (item_type == "radio-group") {
        return "mdi-radiobox-marked";
      }
      if (item_type == "autocomplete") {
        return "mdi-text-search";
      }
      if (item_type == "rating") {
        return "mdi-star";
      }
      if (item_type == "mood") {
        return "mdi-emoticon-happy";
      }
      if (item_type == "birthday") {
        return "mdi-calendar-account";
      }
      if (item_type == "date") {
        return "mdi-calendar";
      }
    },
  },
};
</script>