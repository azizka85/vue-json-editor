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
      <b-dropdown-item>Input item</b-dropdown-item>
      <b-dropdown-item>Group item</b-dropdown-item>
    </b-dropdown>
  </div>  
</template>

<script>
export default {
  name: "GroupItem",
  props: {
    index: Number,
    field: String,
    category: String,
    item: Object
  },
  components: {
    "InputItem": () => import('./InputItem')
  }
}
</script>
