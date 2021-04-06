<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" lg="8">
        <h3>Schema</h3>
        <p>Below the JSON Schema for Editor</p>
        <b-form-textarea rows="10" class="mb-3" v-model="jsonSchema"></b-form-textarea>        
        <h3>JSON Output</h3>
        <p>Below the raw JSON data</p>
        <b-form-textarea rows="10" class="mb-3" v-model="jsonData"></b-form-textarea>        
      </b-col>
      <b-col cols="12" lg="4">
        <h3>Editor</h3>
        <p>Below is the editor generated from the JSON Schema and JSON data</p>
        <b-nav v-if="schema && schema.length > 0">
          <b-nav-item 
            v-for="(category, index) in schema"
            :key="index"
            :active="category.active"
          >
            {{ category.title }}
          </b-nav-item>
        </b-nav>  
        <template v-for="(category, index) in schema">
          <b-form 
            v-if="category.active && category.properties"
            :key="index"
          >
            <template v-for="(property, key) in category.properties">
              <div :key="key">
                <h5>{{ property.title }}</h5>
                <b-tooltip 
                  :target="'form-' + index + '-icon-' + key"
                  triggers="hover"
                >
                  {{ property.description }}
                </b-tooltip>                
                <b-icon :id="'form-' + index + '-icon-' + key" icon="info-circle"></b-icon>                
                <label :for="'form-' + index + '-input-' + key" class="ml-2">{{ property.label }}</label>
                <b-form-input
                  :id="'form-' + index + '-input-' + key"
                  :placeholder="property.placeholder"
                ></b-form-input>                
              </div>              
            </template>            
          </b-form>             
        </template>   
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    data: null,
    schema: null,
    jsonData: '',
    jsonSchema: `[{
      "title": "Content",
      "active": true,
      "properties": {
        "title": {
          "title": "Title text",
          "label": "Enter the title",
          "description": "Leave this field blank to remove the title.",
          "placeholder": "Enter title"
        }        
      }
    }, {
      "title": "Style",
      "active": false
    }]`
  }),
  watch: {
    jsonData(json) {
      this.data = this.parseJSON(json);       
    },
    jsonSchema(json) {
      this.schema = this.parseJSON(json);  
    },
    data(obj) {
      this.jsonData = JSON.stringify(obj);
    },
    schema(obj) {
      this.jsonSchema = JSON.stringify(obj);
    }
  },
  mounted() {
    this.data = this.parseJSON(this.jsonData);  
    this.schema = this.parseJSON(this.jsonSchema);  
  },
  methods: {
    parseJSON(json) {
      try {
        return JSON.parse(json);
      } catch(e) { }    
      
      return null;
    }
  }
}
</script>

<style lang="scss">
</style>
