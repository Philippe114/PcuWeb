// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import 'vuetify/dist/vuetify.min.css';
import 'font-awesome/css/font-awesome.css';

import Vuetify from 'vuetify';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './styles/global.css';

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';
import fullCalendar from 'vue-fullcalendar';
import { setupComponents } from './config/setup-components';

import { setupAndGetI18n } from './config/setup-i18n';

const i18n = setupAndGetI18n(Vue);

import swatches from 'vue-swatches';
import "vue-swatches/dist/vue-swatches.min.css"


Vue.use(VueChartkick, { adapter: Chart });
Vue.component('full-calendar', fullCalendar);
Vue.component('swatches', swatches);

setupComponents(Vue);

Vue.use(Vuetify);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>',
  data: {
    themeColor: '#D2691E',
    userEmail: 'admin@yopmail.com',
    userPassword: '123456'
  },

  methods: {
    setLanguage(language) {
      const vm = this;

      localStorage.setItem('language', language);

      document.documentElement.lang = language;

      vm.$i18n.locale = language;

      vm.$vuetify.lang.current = language;
    },
    async Change_port_state(Port_number, Port_state) {
      localStorage.setItem("port_number", Port_number)
      localStorage.setItem("port_state", Port_state)
      let port_state
      let port_number = parseInt(Port_number.substr(4,5))
      if(Port_state === "OFF"){
        port_state = 0
      }else{
        port_state = 1
      }
      const req = new Request(
        `http://pcu.local:5000/port_state`,
        {
          method: "PUT",
          crossDomain:true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
          }, body: JSON.stringify({
            port_id: port_number,
            port_state: port_state,
          })
        }
      )
      const res = await fetch(req)
      await res.json()
    }
  },
  async Get_port_state(Port_number) {
    localStorage.setItem("port_number", Port_number)
    let port_number = parseInt(Port_number.substr(4,5))
    const req = new Request(
      `http://pcu.local:5000/port_state`,
      {
        method: "POST",
        crossDomain:true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":"*",
        }, body: JSON.stringify({
          port_id: port_number,
        })
      }
    )
    const res = await fetch(req)
    return (await res.json()).port_state
  },
  created() {
    const vm = this;
    vm.setLanguage('en');
  },
})
