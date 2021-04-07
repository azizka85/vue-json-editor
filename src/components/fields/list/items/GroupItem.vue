<template>
  <div class="bg-light p-3 mb-3">
    <component
      v-for="(child, key) in item.items"
      :index="index"
      :key="key"
      :is="child.type"
      :name="key"
      :field="field"
      :category="category"
      :item="child"
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
  </div>  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "GroupItem",
  props: {
    index: Number,
    field: String,
    category: String,
    item: Object
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  methods: {
    addItem(type) {
      this.createItemInGroup({
        groupItem: this.item,
        key: Date.now(),
        type
      });
      this.setJSON(this.data);
    },
    ...mapActions([
      'createItemInGroup',
      'setJSON'
    ])
  },
  components: {
    "InputItem": () => import('./InputItem')
  }
}
</script>
