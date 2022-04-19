<template>
  <v-container>
    <h1 class="text_settings">Choose the system to modify :</h1>
    <v-layout>
      <v-btn-toggle class="toggle_system" mandatory v-model="toggle_system">
      <v-btn v-for="item in PcuList" :key="item.name" @click="change_system(item.number)">
        {{item.name}}
      </v-btn>
      </v-btn-toggle>
    </v-layout>

  <v-layout row wrap >
  <h2 class="text_settings">Modify password :</h2>
  <v-text-field clearable class="field_input" color="black" v-model="new_password"></v-text-field>
    <v-btn @click="modify_password(new_password)" class="btn"small >Change password</v-btn> <v-spacer></v-spacer>
    </v-layout>
    <v-layout row wrap>
    <h2 class="text_settings">Modify voltage reference :</h2>
    <v-text-field  type="number" class="field_input" clearable color="black" small v-model="new_vref"></v-text-field>
      <v-btn  class="btn" small @click="modify_reference_voltage(new_vref)">Change voltage reference</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <v-snackbar
      color="#D2691E"
      v-model="snackbar_vref"
    >
      Changing voltage reference to {{new_vref}}
    </v-snackbar>
    <v-layout row wrap>
      <h2 class="text_settings">Reboot specific system:</h2>
      <v-btn  class="btn" small @click="reboot_rpi(reboot)">Reboot</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <v-snackbar
      color="#D2691E"
      v-model="snackbar_reboot"
    >
      Rebooting {{reboot}}
    </v-snackbar>

    <v-snackbar
      color="#D2691E"
      v-model="snackbar_reboot_not_found"
    >
      {{reboot}} not found
    </v-snackbar>
    <v-snackbar
      color="#D2691E"
      v-model="snackbar_empty"
    >
      Input cannot be empty
    </v-snackbar>
      <v-layout row wrap>
    <h2 class="text_checkbox">Choose location of database :</h2>
        <v-btn-toggle class="toggle_db" mandatory v-model="toggle_db">
          <v-btn  @click="change_location_db(0)">
            RAM
          </v-btn>
          <v-btn @click="change_location_db(1)">
            SD
          </v-btn>
        </v-btn-toggle>
      </v-layout>
    <h1 class="text_settings">For all systems :</h1>
    <v-layout row wrap>
      <h2 class="text_settings">Modify logging port :</h2>
      <v-text-field  type="number" class="field_input" clearable color="black" small v-model="new_logport"></v-text-field>
      <v-btn  class="btn" small @click="modify_logging_port(new_logport)">Change logging port</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <v-snackbar
      color="#D2691E"
      v-model="snackbar_logport"
    >
      Changing logging ip to {{new_logport}}
    </v-snackbar>
    <v-layout row wrap>
      <h2 class="text_settings">Modify logging ip :</h2>
      <v-text-field  type="number" class="field_input" clearable color="black" small v-model="new_logip"></v-text-field>
      <v-btn  class="btn" small @click="modify_logging_ip(new_logip)">Change logging ip</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <v-snackbar
      color="#D2691E"
      v-model="snackbar_logip"
    >
      Changing logging ip to {{new_logip}}
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
      // this.PcuList[i] = config.hostnameSystem[i]
      let tokenStorage = "token" + i
      this.token[i] = localStorage.getItem(tokenStorage.toString())
    }
  },
  async mounted() {
    this.set_location_db()
    },
  methods: {
    async set_location_db(){
      const location_db = await Get_db_location(this.PcuList[this.activeSystem].name)
      console.log(location_db)
      if(location_db === "memory_type.ram"){
        this.toggle_db = 0
      }else{
        this.toggle_db = 1
      }
    },
    async modify_password(password){
      if(password === ""){
        this.snackbar_empty = true
      }else{
        await Modify_password(password, this.token[this.activeSystem], this.PcuList[this.activeSystem].name)
      this.new_password=""
      }
    },
    async modify_reference_voltage(reference_voltage){
      if(reference_voltage === ""){
        this.snackbar_empty = true
      }else{
        await Modify_reference_voltage(reference_voltage, this.token[this.activeSystem], this.PcuList[this.activeSystem].name)
      this.snackbar_vref = true
      }
    },
    async modify_logging_port(logging_port){
      if(logging_port === ""){
        this.snackbar_empty = true
      }else {
        for (let i = 0; i < config.numberOfSystem; i++) {
          await Modify_logging_port(logging_port, this.token[i], this.PcuList[i].name)
        }
        this.snackbar_logport = true
      }
    },
    async modify_logging_ip(logging_ip){
      if(logging_ip === ""){
        this.snackbar_empty = true
      }else {
        for (let i = 0; i < config.numberOfSystem; i++) {
          await Modify_logging_ip(logging_ip, this.token[i], this.PcuList[i].name)
        }
        this.snackbar_logip = true
      }
    },
    async reboot_rpi(){
      this.snackbar_reboot = true
      await Reboot_rpi(this.token[this.activeSystem], this.PcuList[this.activeSystem].name)
    },
    async change_location_db(number) {
        let db_location
        if (number === 0) {
          db_location = "ram"
        } else {
          db_location = "sd"
        }
        await Change_location_db(db_location, this.token[this.activeSystem], this.PcuList[this.activeSystem].name)
    },
    change_system(number){
      this.activeSystem = number
    },
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
    snackbar_reboot:false,
    snackbar_reboot_not_found:false,
    snackbar_vref:false,
    snackbar_logip:false,
    snackbar_logport:false,
    snackbar_empty:false,
    toggle_db:0,
    toggle_system:0,
    SD_checkbox: false,
    RAM_checkbox: true,
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
