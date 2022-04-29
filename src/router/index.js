import Vue from 'vue';
import Router from 'vue-router';

import Pcu from '../pages/Pcu.vue';
import Port from "../pages/Port";
import Settings from "../pages/Settings";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Settings',
      name: 'Settings',
      component: Settings,
      meta: {
        breadcrumb: [
          { name: 'settings' }
        ]
      }
    },
    {
      path: '/',
      name: 'Pcu',
      component: Pcu,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'PCU' }
        ]
      }
    },
    {
      path: '/Port',
      name: 'Port',
      component: Port,
      meta: {
        breadcrumb: [
          { name: 'pcu', href: 'Pcu' },
          { name: 'Port' }
        ]
      }
    },
  ]
});
