<template>
  <v-autocomplete
    v-model="local_value"
    outlined
    :items="mdi_icons"
    :label="label"
    item-text="name"
    item-value="name"
    :prepend-inner-icon="local_value"
  >
    <template v-slot:item="data">
      <v-list-item-avatar>
        <v-icon>{{ data.item.name }} </v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-html="data.item.name.substring(4)"></v-list-item-title>
        <v-list-item-subtitle>
            <span v-for="(alias, alias_idx) in data.item.aliases" :key="alias_idx">
                {{ alias}} &nbsp;
            </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import mdi_icons from "./mdi_icons";

export default {
  name: "IconSelect",
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: "Select Icon",
    },
  },
  data() {
    return {
        local_value: this.value,
        mdi_icons: mdi_icons
    }
  },
  watch: {
    local_value: function (newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>



