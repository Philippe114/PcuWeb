<template>
  <v-toolbar
    dark
    app
    :color="$root.themeColor">

      <v-toolbar-side-icon @click="toggleNavigationBar"></v-toolbar-side-icon>
    <v-spacer></v-spacer>
      <v-toolbar-title>
      <v-btn  @click="dialogLogin=true" flat icon dark large color="white">Login</v-btn>
      <v-dialog
        v-model="dialogLogin"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Login</v-card-title>

          <v-checkbox
            v-model="loginAll"
            :label="'Login all systems'"
          ></v-checkbox>

          <v-layout v-if="loginAll === false">
            <v-btn-toggle class="flex-wrap" mandatory v-model="toggle_system">
              <v-btn v-for="item in PcuList" :key="item.name" @click="change_system(item.number)">
                {{item.name}}
              </v-btn>
            </v-btn-toggle>
          </v-layout>

          <v-card-text>
           Enter Password:
          <v-text-field small v-model="password">Password</v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialogLogin = false"
            >
              No
            </v-btn>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialogLogin = false; savePassword(password)"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar
        color="#D2691E"
        v-model="snackbarFalse"
      >
        Wrong password
          <v-btn
            color="white"
            flat
            x-small
            @click="snackbarFalse = false"
          >
            Close
          </v-btn>
      </v-snackbar>

      <v-snackbar
        color="#D2691E"
        v-model="snackbarTrue"
        :timeout=2000
      >
        Connected
      </v-snackbar>

    </v-toolbar-title>
  </v-toolbar>
</template>
<script>

import {Get_token} from "../../API";
import config from "../../config/hostname.json";


export default {
  data() {
    return {
      dialogLogin: false,
      password: "",
      token: [],
      PcuList:[],
      snackbarFalse:false,
      snackbarTrue:false,
      logged:0,
      toggle_system:0,
      activeSystem:0,
      loginAll:false,

      rating: null,
      dialog: false,
      dialogSettings: false,
      switchEmailNotification: true,
      showPassword: null,
      showPasswordConfirm: null,
      userEmail: null,
      passwordConfirm: null,
      error: false,
      showResult: false,
      result: '',
    }
  },

  computed: {
  },
  methods: {
    async savePasswordAll(password) {
      for(let i=0; i < config.numberOfSystem; i++) {
        this.token[i] = await Get_token(password, this.PcuList[i].name)
        if (this.token[i].status === 401) {
          this.snackbarFalse = true
          this.logged = 0
          localStorage.setItem("logged", this.logged)
        } else {
          this.snackbarTrue = true
          this.logged = 1
          let tokenStorage = "token"+i
          localStorage.setItem(tokenStorage.toString(), this.token[i])
          localStorage.setItem("logged", this.logged)
        }
      }
    },
    async savePassword(password) {
      if(this.loginAll === true){
        await this.savePasswordAll(password)
      }
      else{

      this.token[this.activeSystem] = await Get_token(password, this.PcuList[this.activeSystem].name)
      if (this.token[this.activeSystem].status === 401) {
        this.snackbarFalse = true
        this.logged = 0
        localStorage.setItem("logged", this.logged)
      } else {
        this.snackbarTrue = true
        this.logged = 1
        let tokenStorage = "token"+this.activeSystem
        localStorage.setItem(tokenStorage.toString(), this.token[this.activeSystem])
        localStorage.setItem("logged", this.logged)
      }
      }
    },
    setup_hostname(){
      for(let i=0; i < config.numberOfSystem; i++){
        this.PcuList[i] = {"name":config.hostnameSystem[i], "number":i}
      }
      },
    change_system(number){
      this.activeSystem = number
    },
    toggleNavigationBar() {
      const vm = this;

      vm.$emit('toggleNavigationBar');
    },

    setUpSettings() {
      const vm = this;

      if (vm.userEmail === null || vm.password === null || vm.passwordConfirm === null) {

        vm.result = "Email and Password can't be null.";
        vm.showResult = true;

        return;
      }

      if (vm.password !== vm.passwordConfirm) {

        vm.error = true;
        vm.result = "Passwords does not match the confirm password.";
        vm.showResult = true;

        return;
      }

      vm.$root.userEmail = vm.userEmail;
      vm.$root.userPassword = vm.password;

      vm.result = "Email and password changed succesfully.";
      vm.showResult = true;

      vm.dialogSettings = false;
    },
  },
  async mounted() {
    this.setup_hostname()
    this.logged = localStorage.getItem("logged")
    this.$forceUpdate()
  }
}
</script>
<style>


</style>
