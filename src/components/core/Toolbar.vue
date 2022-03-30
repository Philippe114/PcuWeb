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


export default {
  data() {
    return {
      dialogLogin: false,
      password: "",
      token: "",
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
      this.token = await Get_token(password)
      if( this.token.status === 401 ){
        this.snackbar_false = true
        this.logged = 0
        sessionStorage.setItem("logged", this.logged)
      }else{
        this.snackbar_true = true
        this.logged = 1
        sessionStorage.setItem("token", this.token)
        sessionStorage.setItem("logged", this.logged)
        console.log(sessionStorage.getItem("logged"))
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
    this.logged = sessionStorage.getItem("logged")
    console.log(this.logged)
    this.$forceUpdate()
  }
}
</script>
<style>


</style>
