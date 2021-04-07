<template>
  <div class="mb-3">
    <h5 class="expand-collapse" @click="toggleCollapse">
      <b-icon 
        icon="chevron-down"                  
        :rotate="field.collapsed ? -90 : 0"                
      ></b-icon>
      {{ field.title }}
    </h5>
    <b-collapse :visible="!field.collapsed">
      <b-tooltip 
        :target="'form-' + category + '-icon-' + name"
        triggers="hover"
      >
        {{ field.description }}
      </b-tooltip>
      <b-icon 
        :id="'form-' + category + '-icon-' + name" 
        icon="info-circle"
      ></b-icon>
      <label :for="'form-' + category + '-input-' + name" class="ml-2">
        {{ field.label }}:
      </label>
      <b-form-input
        ref="input"
        :id="'form-' + category + '-input-' + name"
        :placeholder="field.placeholder"
        :type="field.format"
        :value="field.value"
        @input="onInput"
      ></b-form-input>
    </b-collapse>     
  </div>  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "InputField",
  props: {
    name: String,
    category: String,
    field: Object
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  methods: {
    onInput() {
      this.setFieldValue({
        field: this.field,
        value: this.$refs.input.$el.value
      });
      this.setJSON(this.data);
    },
    toggleCollapse() {
      this.setFieldCollapsed({
        field: this.field,
        collapsed: !this.field.collapsed
      });
      this.setJSON(this.data);
    },
    ...mapActions([
      'setFieldCollapsed',
      'setFieldValue',
      'setJSON'
    ])
  }
}
</script>

<style lang="scss" scoped>
.expand-collapse {
  cursor: pointer;
}

.expand-collapse * {
  transition: all 0.5s ease-in-out;  
}
</style>
