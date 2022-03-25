<template>
  <div>
    <template v-if="!$route.meta.allowAnonymous">
      <v-app id="inspire">
        <div class="app-container">
          <toolbar @toggleNavigationBar="drawer = !drawer"/>
          <navigation :toggle="drawer"/>
          <v-content>
            <router-view/>
          </v-content>
        </div>
        <LineChart/>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
  </div>
</template>

<script>
import LineChart from './pages/chart.js'
export default {
  name: 'App',
  components:{
    LineChart
  },
  data() {
    return {
      drawer: true
    }
  }
}
</script>

<style>
  .v-btn:hover:before{
    color: transparent !important;
  }
</style>
