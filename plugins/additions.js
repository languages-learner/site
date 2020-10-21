import Vue from 'vue'
import Ripple from 'vue-ripple-directive'
import VueParticles from 'vue-particles'
import VueTilt from 'vue-tilt.js'
import { BootstrapVueIcons } from 'bootstrap-vue'

Vue.directive('ripple', Ripple)
Vue.use(VueParticles)
Vue.use(VueTilt)
Vue.use(BootstrapVueIcons)
