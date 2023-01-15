<template>
  <div>
    <h2 v-if="survey.title">{{ survey.title }}</h2>

    <!-- preserve whitepace and newlines -->
    <p v-if="survey.instructions" style="white-space: pre">{{ survey.instructions }}</p>

    <template v-for="(item, index) in survey.items">
      <div v-if="item_visible(item)" :key="index" :class="item.class" :style="item.style">
        <h3 v-if="item.title">{{ item.title }}</h3>

        <p v-if="item.instructions" style="white-space: pre">{{ item.instructions }}</p>

        <v-checkbox
          v-if="item.type === 'checkbox'"
          v-model="active_data[item.id]"
          :class="'vuetify-survey-item vuetify-survey-item-checkbox ' + item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-checkbox>
        <div
          v-if="item.type === 'checkboxes'"
          :class="'vuetify-survey-item vuetify-survey-item-checkboxes ' + item.class"
          :style="item.style"
        >
          <v-checkbox
            v-for="(checkbox_item, checkbox_item_idx) in item.items"
            :key="checkbox_item_idx"
            :label="checkbox_item.text"
            :value="checkbox_item.value"
            :class="checkbox_item.class"
            :style="checkbox_item.style"
            v-model="active_data[item.id]"
            v-bind="translate_props(item.props)"
          ></v-checkbox>
        </div>
        <v-select
          v-if="item.type === 'select'"
          v-model="active_data[item.id]"
          :class="'vuetify-survey-item vuetify-survey-item-select ' + item.class"
          :style="item.style"
          :items="item.items"
          v-bind="translate_props(item.props)"
        ></v-select>
        <v-text-field
          v-if="item.type === 'text-field'"
          v-model="active_data[item.id]"
          :class="'vuetify-survey-item vuetify-survey-item-text-field ' + item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-text-field>
        <v-text-field
          v-if="item.type === 'number-field'"
          type="number"
          :min="item.min"
          :max="item.max"
          :step="item.step ? item.step : 'any'"
          v-model="active_data[item.id]"
          :class="'vuetify-survey-item vuetify-survey-item-number-field ' + item.class"
          :style="item.style"
          :size="number_field_size(item)"
          v-bind="translate_props(item.props)"
        ></v-text-field>
        <v-textarea
          v-if="item.type === 'textarea'"
          v-model="active_data[item.id]"
          :class="'vuetify-survey-item vuetify-survey-item-textarea ' + item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-textarea>
        <v-slider v-if="item.type === 'slider'" v-model="active_data[item.id]" v-bind="item.props"></v-slider>
        <v-range-slider
          v-if="item.type === 'range-slider'"
          v-model="active_data[item.id]"
          :class="'vuetify-survey-item vuetify-survey-item-range-slider ' + item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-range-slider>
        <v-switch
          v-if="item.type === 'switch'"
          v-model="active_data[item.id]"
          :class="'vuetify-survey-item vuetify-survey-item-switch ' + item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-switch>
        <v-rating
          v-if="item.type === 'rating'"
          v-model="active_data[item.id]"
          :class="'vuetify-survey-item vuetify-survey-item-rating ' + item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-rating>
        <v-rating
          v-if="item.type === 'mood'"
          v-model="active_data[item.id]"
          :class="'vuetify-survey-item vuetify-survey-item-mood ' + item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        >
          <template v-slot:item="props">
            <v-icon
              v-if="props.index == 0"
              :color="props.color || 'primary'"
              @click="props.click"
              :size="props.size || 32"
            >{{ props.isFilled || props.isHovered ? 'mdi-emoticon-sad' : 'mdi-emoticon-sad-outline' }}</v-icon>
            <v-icon
              v-if="props.index == 1"
              :color="props.color || 'primary'"
              @click="props.click"
              :size="props.size || 32"
            >{{ props.isFilled || props.isHovered ? 'mdi-emoticon-confused' : 'mdi-emoticon-confused-outline' }}</v-icon>
            <v-icon
              v-if="props.index == 2"
              :color="props.color || 'primary'"
              @click="props.click"
              :size="props.size || 32"
            >{{ props.isFilled || props.isHovered ? 'mdi-emoticon-neutral' : 'mdi-emoticon-neutral-outline' }}</v-icon>
            <v-icon
              v-if="props.index == 3"
              :color="props.color || 'primary'"
              @click="props.click"
              :size="props.size || 32"
            >{{ props.isFilled || props.isHovered ? 'mdi-emoticon-happy' : 'mdi-emoticon-happy-outline' }}</v-icon>
            <v-icon
              v-if="props.index == 4"
              :color="props.color || 'primary'"
              @click="props.click"
              :size="props.size || 32"
            >{{ props.isFilled || props.isHovered ? 'mdi-emoticon' : 'mdi-emoticon-outline' }}</v-icon>
          </template>
        </v-rating>

        <v-menu
          v-if="item.type == 'date'"
          :ref="'item_' + item.id"
          v-model="item_menus[item.id]"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          :class="'vuetify-survey-item vuetify-survey-item-date ' + item.class"
          :style="item.style"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="active_data[item.id]"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="active_data[item.id]" @input="item_menus[item.id] = false"></v-date-picker>
        </v-menu>

        <v-menu
          v-if="item.type == 'birthday'"
          :ref="'item_' + item.id"
          v-model="item_menus[item.id]"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          :class="'vuetify-survey-item vuetify-survey-item-birthday ' + item.class"
          :style="item.style"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="active_data[item.id]"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="active_data[item.id]"
            :active-picker.sync="item_date_pickers[item.id]"
            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
            min="1900-01-01"
            v-bind="translate_props(item.props)"
            @change="close_menu(item.id)"
          ></v-date-picker>
        </v-menu>
      </div>
    </template>
  </div>
</template>

<script>
// eslint-disable-next-line
import Interpreter from "./interpreter.js";
import * as acorn from "acorn";
import Vue from "vue";

export default {
  name: "VuetifySurvey",
  components: {},
  props: {
    survey: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    let default_data = this.get_default_data();

    let data = {
      item_menus: {},
      item_date_pickers: {},
      active_data: this.value
        ? Object.assign(default_data, this.value)
        : default_data,
    };

    return data;
  },
  watch: {
    survey: {
      handler: function (survey) {
        let default_data;

        survey.items.forEach((item) => {
          let item_id = item.id
          if (!(item_id in this.active_data)) {
            if (!default_data) default_data = this.get_default_data();
            Vue.set(this.active_data, item_id, default_data[item_id]);
          }
        });
      },
      deep: true,
    },
    active_data: {
      handler: function (newVal) {
        this.$emit("input", newVal);
      },
      deep: true,
    },
    item_menus: {
      handler: function () {
        for (let key in this.item_menus) {
          if (this.item_menus[key]) {
            setTimeout(() => Vue.set(this.item_date_pickers, key, "YEAR"));
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    get_default_data() {
      let default_data = {};
      this.survey.items.forEach((item) => {
        if (item.default_value) {
          default_data[item.id] = item.default_value;
        } else {
          if (item.type === "checkboxes") {
            default_data[item.id] = [];
          } else if (item.type === "checkbox" || item.type === "switch") {
            default_data[item.id] = null;
          } else if (item.type == "textarea" || item.type == "text-field") {
            default_data[item.id] = null;
          } else if (item.type == "rating") {
            default_data[item.id] = null;
          } else if (item.type == "mood") {
            default_data[item.id] = null;
          }
        }
      });

      return default_data;
    },
    item_visible(item) {
      if (item.visible === true) {
        return true;
      }
      if (item.visible === false) {
        return false;
      }
      if (typeof item.visible === "string") {
        let parsed_code = acorn.parse(item.visible, {
          ecmaVersion: 2020,
        });

        let interpreter = new Interpreter(parsed_code, (int, glb) => {
          // For each key => value in data, set it in the global scope
          for (let key in this.active_data) {
            let value = int.nativeToPseudo(this.active_data[key]);
            int.setProperty(glb, key, value);
          }
        });

        interpreter.run();

        let result = interpreter.value;

        if (typeof result === "object") {
          if (
            result.class == "Array" &&
            result.properties &&
            result.properties.length == 0
          ) {
            return false;
          }
          return true;
        }

        return result;
      }
      return true;
    },
    translate_props(props) {
      // Translate all snake_case keys to kebab-case keys in the passed object
      let new_props = {};
      for (let key in props) {
        new_props[key.replace(/_/g, "-")] = props[key];
      }
      return new_props;
    },
    number_field_size(item) {
      if (!item.integer_only) {
        return 20;
      }
      if (
        item.min &&
        typeof item.min == "number" &&
        item.max &&
        typeof item.max == "number"
      ) {
        return (
          Math.max(Math.abs(item.min), Math.abs(item.max)).toString().length + 2
        );
      }
      if (item.min && typeof item.min == "number") {
        return Math.abs(item.min).toString().length + 2;
      }
      if (item.max && typeof item.max == "number") {
        return Math.abs(item.max).toString().length + 2;
      }
      return 20;
    },
    close_menu(item_id) {
      Vue.set(this.item_menus, item_id, false);
    },
  },
};
</script>



