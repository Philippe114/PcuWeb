<template>
  <v-navigation-drawer
    v-model="toggle"
    fixed app>
    <v-toolbar :color="$root.themeColor" class="toolbar">
      <router-link :to="{ name: 'Pcu' }">
        <img class="logo" src="https://upload.wikimedia.org/wikipedia/fr/thumb/b/bf/Universit%C3%A9_Laval_logo_et_texte.svg/320px-Universit%C3%A9_Laval_logo_et_texte.svg.png?20180209212929" width="
        160px">
      </router-link>
      <router-link :to="{ name: 'Pcu' }" class="text">
        PCU
      </router-link>
    </v-toolbar>
    <v-list>


      <v-list-tile @click="changeRoute('Pcu', 2)">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]"> {{ $t('Dashboard') }}</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="changeRoute('Settings', 1)">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 1}, 'item-title' ]" >{{ $t('Settings') }}</v-list-tile-title>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    toggle: {
        type: Boolean,
        required: false,
        default: true
    }
  },

  data() {
    return {
      selectedIndex: 1
    }
  },

  methods: {
    changeRoute(routeName, selectedIndex) {
      const vm = this;

      vm.selectedIndex = selectedIndex;

      return vm.$router.push({ name: routeName });
    }
  }
}
</script>

<style>
  .toolbar {
    font-weight: bold;
    font-size: 18px;
  }

  .toolbar .text {
    padding-left: 15px;
    color: white;
    text-decoration:none;
  }

  .item-title {
    font-size: 17px;
    font-weight: 500;
  }
  .item-sub-title {
    font-size: 15px;
    font-weight: 500;
  }

  .active {
    font-weight: bold;
  }
</style>
