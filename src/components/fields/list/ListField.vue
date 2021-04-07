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
      <component
        v-for="(item, index) in field.items"
        :key="index"
        :is="item.type"
        :index="index"
        :field="name"
        :category="category"
        :item="item"
      ></component> 
      <b-dropdown 
      size="sm" 
      variant="outline-primary" 
      text="Add item"
      >
        <b-dropdown-item-button 
        @click="addItem('InputItem')"
      >
        Input item
      </b-dropdown-item-button>
      <b-dropdown-item-button
        @click="addItem('GroupItem')"
      >
        Group item
      </b-dropdown-item-button>
      </b-dropdown>    
    </b-collapse>     
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ListField",
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
    addItem(type) {
      this.createItemInList({
        list: this.field,
        type
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
      'createItemInList',
      'setFieldCollapsed',
      'setJSON'
    ])  
  },
  components: {
    "GroupItem": () => import('./items/GroupItem'),
    "InputItem": () => import('./items/InputItem')
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
