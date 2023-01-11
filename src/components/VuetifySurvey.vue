<template>
  <div>
    <h2 v-if="survey.title">{{ survey.title }}</h2>

    <div
      v-for="(item, index) in survey.items"
      :key="index"
      :class="item.class"
      :style="item.style"
    >
      <h3 v-if="item.title">{{ item.title }}</h3>

      <p v-if="item.instructions">{{ item.instructions }}</p>

      <v-checkbox
        v-if="item.type === 'checkbox'"
        v-model="active_data[item.id]"
        :class="item.class"
        :style="item.style"
        v-bind="item.props"
      ></v-checkbox>
      <div v-if="item.type === 'checkboxes'" :class="item.class" :style="item.style">
        <v-checkbox
          v-for="(checkbox_item, checkbox_item_idx) in item.items"
          :key="checkbox_item_idx"
          :label="checkbox_item.label"
          :value="checkbox_item.value"
          :class="checkbox_item.class"
          :style="checkbox_item.style"
          v-model="active_data[item.id]"
          v-bind="item.props"
        ></v-checkbox>
      </div>
      <v-autocomplete
        v-if="item.type === 'autocomplete'"
        v-model="active_data[item.id]"
        :class="item.class"
        :style="item.style"
        v-bind="item.props"
      ></v-autocomplete>
      <v-select
        v-if="item.type === 'select'"
        v-model="active_data[item.id]"
        :class="item.class"
        :style="item.style"
        v-bind="item.props"
      ></v-select>
      <v-text-field
        v-if="item.type === 'text-field'"
        v-model="active_data[item.id]"
        :class="item.class"
        :style="item.style"
        v-bind="item.props"
      ></v-text-field>
      <v-textarea
        v-if="item.type === 'textarea'"
        v-model="active_data[item.id]"
        :class="item.class"
        :style="item.style"
        v-bind="item.props"
      ></v-textarea>
      <v-slider v-if="item.type === 'slider'" v-model="active_data[item.id]" v-bind="item.props"></v-slider>
      <v-range-slider
        v-if="item.type === 'range-slider'"
        v-model="active_data[item.id]"
        :class="item.class"
        :style="item.style"
        v-bind="item.props"
      ></v-range-slider>
      <v-switch
        v-if="item.type === 'switch'"
        v-model="active_data[item.id]"
        :class="item.class"
        :style="item.style"
        v-bind="item.props"
      ></v-switch>
      <v-rating
        v-if="item.type === 'rating'"
        v-model="active_data[item.id]"
        :class="item.class"
        :style="item.style"
        v-bind="item.props"
      ></v-rating>
    </div>
  </div>
</template>

<script>
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
      }
    });

    return {
      active_data: this.data
        ? Object.extend(default_data, this.data)
        : default_data,
    };
  },
};
</script>



