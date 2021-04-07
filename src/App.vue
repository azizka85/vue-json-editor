<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" lg="8">
        <h3>JSON Output</h3>
        <p>Below the raw JSON data</p>
        <b-form-textarea 
          ref="jsonText"
          class="json" 
          :value="json"
          @input="updateJSON"
        ></b-form-textarea>        
      </b-col>
      <b-col cols="12" lg="4">
        <h3>Editor</h3>
        <p>Below is the editor generated from the JSON data</p>
        <b-nav v-if="data">          
          <b-nav-item 
            v-for="(category, key) in data"
            :key="key"
            :active="category.active"
            @click="navigateToForm(category)"
          >
            {{ category.title }}
          </b-nav-item>                    
        </b-nav>
        <template v-if="data">
          <template v-for="(category, categoryKey) in data">
            <b-form v-if="category.active" :key="categoryKey" class="mb-3">
              <component 
                v-for="(field, fieldKey) in category.fields"
                :key="fieldKey"
                :is="field.type"
                :name="fieldKey"
                :category="categoryKey"
                :field="field"
              ></component>
              <b-dropdown 
                size="sm" 
                variant="outline-primary" 
                text="Add field"
              >
                <b-dropdown-item-button 
                  @click="addField(category, 'InputField')"
                >
                  Input field
                </b-dropdown-item-button>
                <b-dropdown-item-button 
                  @click="addField(category, 'ListField')"
                >
                  List field
                </b-dropdown-item-button>
              </b-dropdown>
            </b-form>
          </template>          
        </template>  
        <b-button 
          size="sm" 
          variant="outline-primary"
          @click="addForm"
        >
          Add form
        </b-button>                
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',  
  computed: {
    ...mapGetters([
      'json',
      'data',
      'activeForm'
    ])
  },
  mounted() {
    this.setJSON(this.data);
    this.setData(this.data);
  },
  methods: {
    addForm() {
      this.createForm(Date.now());
      this.setJSON(this.data);
    },
    addField(form, type) {
      this.createFieldInForm({
        form,
        key: Date.now(),
        type
      });
      this.setJSON(this.data);
    },
    updateJSON() {
      this.setJSON(this.$refs.jsonText.$el.value);
      this.setData(this.$refs.jsonText.$el.value);
    },
    navigateToForm(form) {
      this.setActiveForm(form);
      this.setJSON(this.data);
    },
    ...mapActions([
      'createForm',
      'createFieldInForm',
      'setActiveForm',
      'setJSON',
      'setData'
    ])
  },
  components: {
    'InputField': () => import('./components/fields/InputField'),
    'ListField': () => import('./components/fields/list/ListField')
  }
}
</script>

<style lang="scss" scoped>
.json {
  min-height: 20rem;
  height: 100%;
}
</style>
