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
        v-model="snackbar_false"
      >
        Wrong password
          <v-btn
            color="white"
            flat
            x-small
            @click="snackbar_false = false"
          >
            Close
          </v-btn>
      </v-snackbar>

      <v-snackbar
        color="#D2691E"
        v-model="snackbar_true"
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
      snackbar_false:false,
      snackbar_true:false,
      logged:0,

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
    async savePassword(password) {
      for(let i=0; i < config.numberOfSystem; i++) {
        this.token[i] = await Get_token(password, this.PcuList[i])
        if (this.token[i].status === 401) {
          this.snackbar_false = true
          this.logged = 0
          localStorage.setItem("logged", this.logged)
        } else {
          this.snackbar_true = true
          this.logged = 1
          let tokenStorage = "token"+i
          localStorage.setItem(tokenStorage.toString(), this.token[i])
          localStorage.setItem("logged", this.logged)
        }
      }
    },
    setup_hostname(){
      for(let i=0; i < config.numberOfSystem; i++){
        this.PcuList[i] = config.hostnameSystem[i]
      }
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

    selectLanguage(code) {
      const vm = this;

      vm.$root.setLanguage(code);
    }
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
