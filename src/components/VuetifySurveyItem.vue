<template>
  <div>
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
      :class="'vuetify-survey-item ' + item.class"
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
</template>