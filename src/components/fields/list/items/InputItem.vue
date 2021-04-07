<template>
  <b-form-input
    ref="input"
    class="space-between"
    :placeholder="item.placeholder"
    :type="item.format"
    :value="item.value"
    @input="onInput"
  ></b-form-input>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "InputItem",
  props: {
    index: Number,
    name: String,
    field: String,
    category: String,
    item: Object,
  },
  computed: {
    ...mapGetters(["data"]),
  },
  methods: {
    onInput() {
      this.setFieldValue({
        field: this.item,
        value: this.$refs.input.$el.value,
      });
      this.setJSON(this.data);
    },
    ...mapActions(["setFieldValue", "setJSON"]),
  },
};
</script>

<style lang="scss">
.space-between + .space-between {
  margin-top: 0.5rem;
}
</style>
