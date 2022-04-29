<template>
  <v-container>
    <h1 class="text_settings">Choose the system to modify :</h1>
    <v-layout>
      <v-btn-toggle class="toggle_system" mandatory v-model="toggleSystem">
      <v-btn v-for="item in PcuList" :key="item.name" @click="changeSystem(item.number)">
        {{item.name}}
      </v-btn>
      </v-btn-toggle>
    </v-layout>

  <v-layout row wrap >
  <h2 class="text_settings">Modify password :</h2>
  <v-text-field clearable class="field_input" color="black" v-model="new_password"></v-text-field>
    <v-btn @click="modifyPassword(new_password)" class="btn" small >Change password</v-btn> <v-spacer></v-spacer>
    </v-layout>
    <v-layout row wrap>
    <h2 class="text_settings">Modify voltage reference :</h2>
    <v-text-field  type="number" class="field_input" clearable color="black" small v-model="new_vref"></v-text-field>
      <v-btn  class="btn" small @click="modifyReferenceVoltage(new_vref)">Change voltage reference</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <v-snackbar
      color="#D2691E"
      v-model="snackbarVref"
    >
      Changing voltage reference to {{new_vref}}
    </v-snackbar>
    <v-layout row wrap>
      <h2 class="text_settings">Reboot specific system:</h2>
      <v-btn  class="btn" small @click="rebootRpi(reboot)">Reboot</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <v-snackbar
      color="#D2691E"
      v-model="snackbarReboot"
    >
      Rebooting {{reboot}}
    </v-snackbar>

    <v-snackbar
      color="#D2691E"
      v-model="snackbarRebootNotFound"
    >
      {{reboot}} not found
    </v-snackbar>
    <v-snackbar
      color="#D2691E"
      v-model="snackbarEmpty"
    >
      Input cannot be empty
    </v-snackbar>
      <v-layout row wrap>
    <h2 class="text_checkbox">Choose location of database :</h2>
        <v-btn-toggle class="toggle_db" mandatory v-model="toggleDb">
          <v-btn  @click="changeLocationDb(0)">
            RAM
          </v-btn>
          <v-btn @click="changeLocationDb(1)">
            SD
          </v-btn>
        </v-btn-toggle>
      </v-layout>
    <h1 class="text_settings">For all systems :</h1>
    <v-layout row wrap>
      <h2 class="text_settings">Modify logger's port :</h2>
      <v-text-field  type="number" class="field_input" clearable color="black" small v-model="new_logport"></v-text-field>
      <v-btn  class="btn" small @click="modifyLoggingPort(new_logport)">Change logger's port</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <v-snackbar
      color="#D2691E"
      v-model="snackbarLogPort"
    >
      Changing logger port to {{new_logport}}
    </v-snackbar>
    <v-layout row wrap>
      <h2 class="text_settings">Modify logger's ip :</h2>
      <v-text-field  type="number" class="field_input" clearable color="black" small v-model="new_logip"></v-text-field>
      <v-btn  class="btn" small @click="modifyLoggingIp(new_logip)">Change logger's IP address </v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <v-snackbar
      color="#D2691E"
      v-model="snackbarLogip"
    >
      Changing logger IP to {{new_logip}}
    </v-snackbar>

  </v-container>
</template>

<script>
import {
  Change_location_db,
  Modify_logging_ip,
  Modify_logging_port,
  Modify_password,
  Modify_reference_voltage, Reboot_rpi,
  Get_db_location
} from "../API";
import config from "../config/hostname.json";

export default {
  name: "Settings",
  async created(){
    for(let i=0; i < config.numberOfSystem; i++) {
      this.PcuList[i] = {"name":config.hostnameSystem[i], "number":i}
      let tokenStorage = "token" + i
      this.token[i] = localStorage.getItem(tokenStorage.toString())
    }
  },
  async mounted() {
    await this.setLocationDb()
    },
  methods: {
    async setLocationDb(){
      const location_db = await Get_db_location(this.PcuList[this.activeSystem].name)
      if(location_db["mem_type"] === "memory_type.ram"){
        this.toggleDb = 0
      }else{
        this.toggleDb = 1
      }
    },
    async modifyPassword(password){
      if(password === ""){
        this.snackbarEmpty = true
      }else{
        await Modify_password(password, this.token[this.activeSystem], this.PcuList[this.activeSystem].name)
      this.new_password=""
      }
    },
    async modifyReferenceVoltage(reference_voltage){
      if(reference_voltage === ""){
        this.snackbarEmpty = true
      }else{
        await Modify_reference_voltage(reference_voltage, this.token[this.activeSystem], this.PcuList[this.activeSystem].name)
      this.snackbarVref = true
      }
    },
    async modifyLoggingPort(logging_port){
      if(logging_port === ""){
        this.snackbarEmpty = true
      }else {
        for (let i = 0; i < config.numberOfSystem; i++) {
          await Modify_logging_port(logging_port, this.token[i], this.PcuList[i].name)
        }
        this.snackbarLogPort = true
      }
    },
    async modifyLoggingIp(logging_ip){
      if(logging_ip === ""){
        this.snackbarEmpty = true
      }else {
        for (let i = 0; i < config.numberOfSystem; i++) {
          await Modify_logging_ip(logging_ip, this.token[i], this.PcuList[i].name)
        }
        this.snackbarLogip = true
      }
    },
    async rebootRpi(){
      this.snackbarReboot = true
      await Reboot_rpi(this.token[this.activeSystem], this.PcuList[this.activeSystem].name)
    },
    async changeLocationDb(number) {
        let dbLocation
        if (number === 0) {
          dbLocation = "ram"
        } else {
          dbLocation = "sd"
        }
        await Change_location_db(dbLocation, this.token[this.activeSystem], this.PcuList[this.activeSystem].name)
    },
    async changeSystem(number) {
      this.activeSystem = number
      await this.setLocationDb()
      this.$forceUpdate()
    } ,
  },
  data: () => ({
    token:[],
    PcuList:[
    ],
    activeSystem:0,
    new_password: "",
    new_vref: "",
    new_logport: "",
    new_logip: "",
    reboot:"",
    snackbarReboot:false,
    snackbarRebootNotFound:false,
    snackbarVref:false,
    snackbarLogip:false,
    snackbarLogPort:false,
    snackbarEmpty:false,
    toggleDb:0,
    toggleSystem:0,
    SDCheckbox: false,
    RAMCheckbox: true,
  })
}
</script>

<style scoped>
.text_settings{
  margin-top: 20px;
  margin-right: 5px;
}
.text_checkbox{
  margin-top: 13px;
  margin-right: 25px;
}
.btn{
  margin-top: 20px;
  margin-right: 5px;
}
.field_input{
  width:0px;
}
.toggle_db{
  margin-top: 12px;
}
.toggle_system{
  margin-top: 33px;
}
</style>
