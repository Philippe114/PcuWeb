// Core Components
import Toolbar from '../components/core/Toolbar.vue';
import Navigation from '../components/core/NavigationDrawer.vue';


function setupComponents(Vue){
  Vue.component('toolbar', Toolbar);
  Vue.component('navigation', Navigation);
}


export {
  setupComponents
}
