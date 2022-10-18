import Vue from 'vue'
import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import { required, email, min, max, confirmed } from 'vee-validate/dist/rules'
import es from 'vee-validate/dist/locale/es.json'
// import { max } from "lodash";

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

// Install required rule.
extend('required', required)

// Install English localizations.
localize({
  es: {
    messages: es.messages,
  },
})

localize('es')
