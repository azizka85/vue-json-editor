export default {
  state: {
    data: {
      content: {
        active: true,
        title: "Content",
        fields: {
          title: {
            type: "InputField",  
            format: "text",
            title: "Title text",
            label: "Enter the title",
            description: "Leave this field blank to remove the title.",
            placeholder: "We Never Stop Smiling!",
            value: "",
            collapsed: false
          },
          actions: {
            type: "ListField",
            title: "Call to action buttons",
            label: "Edit the buttons",
            description: "CTA (call to action) is what you want your visitors to do: sign up, learn more or read an article.",
            collapsed: false,
            items: [{
              type: "GroupItem",
              items: {
                label: {
                  type: "InputItem",
                  format: "text",
                  placeholder: "Get it",
                  value: ""
                },
                route: {
                  type: "InputItem",
                  format: "text",
                  placeholder: "/sign-up",
                  value: ""                  
                }
              }
            }, {
              type: "GroupItem",
              items: {
                label: {
                  type: "InputItem",
                  placeholder: "Get it",
                  value: ""
                },
                route: {
                  type: "InputItem",
                  placeholder: "/sign-up",
                  value: ""                  
                }
              }
            }]
          }          
        }
      },
      style: {
        active: false,
        title: "Style"
      }      
    }, 
    json: "",
    activeForm: null
  },
  mutations: {
    updateJSON(state, json) {
      state.json = json;
    },
    updateData(state, data) {
      state.data = data;
    },
    updateActiveForm(state, form) {
      state.activeForm = form;
    },
    updateFormActive(_, {form, active}) {
      form.active = active;
    },
    updateFieldCollapsed(_, {field, collapsed}) {
      field.collapsed = collapsed;
    },
    updateFieldValue(_, {field, value}) {
      field.value = value;
    }
  },
  actions: {
    setJSON({commit}, json) {
      let data = null;
      
      if(typeof json === "object") {
        data = JSON.stringify(json, null, 2);
      } else {
        data = json;
      }

      commit('updateJSON', data);
    },
    setData({commit, dispatch}, json) {
      let data = null
      let activeForm = null;

      if(typeof json === "string") {
        try {
          data = JSON.parse(json);
        } catch(e) { }
      } else {
        data = json;
      }

      if(data) {
        for(let key of Object.keys(data)) {
          if(data[key].active) {
            if(activeForm) {
              data[key].active = false;
            } else {
              activeForm = data[key];
            }
          }
        }        
      }
      
      commit('updateData', data);
      dispatch('setActiveForm', activeForm);
    },
    setActiveForm({commit, dispatch, getters}, activeForm) {
      if(getters.activeForm) {
        dispatch('setFormActive', {
          form: getters.activeForm,
          active: false
        });
      }      

      commit('updateActiveForm', activeForm);
      
      if(activeForm) {
        dispatch('setFormActive', {
          form: activeForm,
          active: true
        });        
      }
    },
    setFormActive({commit}, {form, active}) {
      commit('updateFormActive', {form, active});
    },
    setFieldCollapsed({commit}, {field, collapsed}) {
      commit('updateFieldCollapsed', {field, collapsed});
    },
    setFieldValue({commit}, {field, value}) {
      commit('updateFieldValue', {field, value});
    }
  },
  getters: {
    json(state) {
      return state.json;
    },
    data(state) {
      return state.data;
    },
    activeForm(state) {
      return state.activeForm;
    }
  }
};
