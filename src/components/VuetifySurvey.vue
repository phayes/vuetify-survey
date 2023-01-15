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
          :class="item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-checkbox>
        <div v-if="item.type === 'checkboxes'" :class="item.class" :style="item.style">
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
        <v-autocomplete
          v-if="item.type === 'autocomplete'"
          v-model="active_data[item.id]"
          :class="item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-autocomplete>
        <v-select
          v-if="item.type === 'select'"
          v-model="active_data[item.id]"
          :class="item.class"
          :style="item.style"
          :items="item.items"
          v-bind="translate_props(item.props)"
        ></v-select>
        <v-text-field
          v-if="item.type === 'text-field'"
          v-model="active_data[item.id]"
          :class="item.class"
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
          :class="item.class"
          :style="item.style"
          :size="number_field_size(item)"
          v-bind="translate_props(item.props)"
        ></v-text-field>
        <v-textarea
          v-if="item.type === 'textarea'"
          v-model="active_data[item.id]"
          :class="item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-textarea>
        <v-slider v-if="item.type === 'slider'" v-model="active_data[item.id]" v-bind="item.props"></v-slider>
        <v-range-slider
          v-if="item.type === 'range-slider'"
          v-model="active_data[item.id]"
          :class="item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-range-slider>
        <v-switch
          v-if="item.type === 'switch'"
          v-model="active_data[item.id]"
          :class="item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-switch>
        <v-rating
          v-if="item.type === 'rating'"
          v-model="active_data[item.id]"
          :class="item.class"
          :style="item.style"
          v-bind="translate_props(item.props)"
        ></v-rating>
        <v-rating
          v-if="item.type === 'mood'"
          v-model="active_data[item.id]"
          :class="item.class"
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
      </div>
    </template>
  </div>
</template>

<script>
// eslint-disable-next-line
import Interpreter from "../interpreter.js";
import * as acorn from "acorn";

export default {
  name: "VuetifySurvey",
  components: {},
  props: {
    survey: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    let default_data = {};
    this.survey.items.forEach((item) => {
      if (item.type === "checkboxes") {
        default_data[item.id] = [];
      } else if (item.type === "checkbox") {
        default_data[item.id] = false;
      } else if (item.type == "textarea" || item.type == "text-field") {
        default_data[item.id] = "";
      } else if (item.type == "rating") {
        default_data[item.id] = 0;
      } else if (item.type == "mood") {
        default_data[item.id] = 0;
      }
    });

    return {
      active_data: this.data
        ? Object.extend(default_data, this.data)
        : default_data,
    };
  },
  methods: {
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
          if (result.class == "Array" && result.properties && result.properties.length == 0) {
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
  },
};
</script>



