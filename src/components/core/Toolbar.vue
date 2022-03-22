<template>
  <v-toolbar
    dark
    app
    :color="$root.themeColor">

      <v-toolbar-side-icon @click="toggleNavigationBar"></v-toolbar-side-icon>
    <v-spacer></v-spacer>
      <v-toolbar-title>
      <v-btn  v-if="this.logged == 0" @click="dialogLogin=true" flat icon dark large color="white">Login</v-btn>
        <v-btn  v-else-if="this.logged == 1" @click="dialogLogin=true" flat icon dark large color="#7CFC00">Login</v-btn>
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
import snackbar from "../../pages/Snackbar";

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
      items: [
        {
          icon: 'account_circle',
          href: '#',
          title: 'Profile',
          click: (e) => {
          }
        },
        {
          icon: 'settings',
          href: '#',
          title: 'Settings',
          click: () => {
            const vm = this;

            vm.dialogSettings = true;
          }
        },
        {
          icon: 'exit_to_app',
          href: '#',
          title: 'Log Out',
          click: () => {
            const vm = this;

            vm.$router.push({name: 'Login'});
          }
        }
      ],
      notifications:
        [
          {
            title: 'New mail from Adam Joe',
            color: 'light-blue',
            icon: 'email',
            actionAt: '12 min ago',
            isActive: true,
            onClick: () => {
              const vm = this;

              vm.$router.push({name: 'Mailbox'});
            }
          },
          {
            title: 'Scheculed meeting',
            color: 'red',
            icon: 'calendar_today',
            actionAt: '46 min ago',
            isActive: true,
            onClick: () => {
              const vm = this;

              vm.$router.push({name: 'Calendar'});
            }
          },
          {
            title: 'New mail from Github',
            color: 'light-blue',
            icon: 'email',
            isActive: true,
            timeLabel: '2 hour ago',
            onClick: () => {
              const vm = this;

              vm.$router.push({name: 'Mailbox'});
            }
          }
        ],
      languages: [
        {name: 'English', languageCode: 'en', path: require('../../assets/flags/en.png')},
        {name: 'Turkish', languageCode: 'tr', path: require('../../assets/flags/tr.png')},
        {name: 'French', languageCode: 'fr', path: require('../../assets/flags/fr.png')},
        {name: 'German', languageCode: 'de', path: require('../../assets/flags/de.png')},
        {name: 'Japanese', languageCode: 'ja', path: require('../../assets/flags/ja.png')},
        {name: 'Simplified Chinese', languageCode: 'ch', path: require('../../assets/flags/ch.png')}
      ]
    }
  },

  computed: {
    selectedLanguageFlag() {
      const vm = this;

      switch (vm.$i18n.locale) {
        case 'en':
          return require('../../assets/flags/en.png');
        case 'tr':
          return require('../../assets/flags/tr.png');
        case 'fr':
          return require('../../assets/flags/fr.png');
        case 'de':
          return require('../../assets/flags/de.png');
        case 'ja':
          return require('../../assets/flags/ja.png');
        case 'ch':
          return require('../../assets/flags/ch.png');
      }
    }
  },
  methods: {
    async savePassword(password) {
      localStorage.setItem("password", password)
      this.token = await Get_token(this.password)
      if( this.token.status === 401 ){
        this.snackbar_false = true
        this.logged = 0
        localStorage.setItem("logged", this.logged)
      }else{
        this.snackbar_true = true
        this.logged = 1
        localStorage.setItem("logged", this.logged)
        console.log(localStorage.getItem("logged"))
      }
      this.password=""

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
    this.logged = localStorage.getItem("logged")
    console.log(this.logged)
    this.$forceUpdate()
  }
}
</script>
<style>


</style>
