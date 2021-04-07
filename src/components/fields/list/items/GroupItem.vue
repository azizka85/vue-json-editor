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
    <b-button size="sm" variant="outline-primary">Add item</b-button>
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
