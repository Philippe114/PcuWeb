<template>
  <v-container>
  <v-layout row wrap >
  <h2 class="text_settings">Modify password :</h2>
  <v-text-field clearable class="field_input" color="black" v-model="new_password"></v-text-field>
    <v-btn @click="modify_password(new_password)" class="btn"small >Change password</v-btn> <v-spacer></v-spacer>
    </v-layout>
    <v-layout row wrap>
    <h2 class="text_settings">Modify voltage reference  :</h2>
    <v-text-field  type="number" class="field_input" clearable color="black" small v-model="new_vref"></v-text-field>
      <v-btn  class="btn" small @click="modify_reference_voltage(new_vref)">Change voltage reference</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
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
  </v-container>
</template>

<script>
import {Change_location_db, Modify_password, Modify_reference_voltage} from "../API";
import config from "../config/hostname.json";

export default {
  name: "Settings",
  async mounted() {
    for(let i=0; i < config.numberOfSystem; i++) {
      this.PcuList[i] = config.hostnameSystem[i]
      let tokenStorage = "token" + i
      this.token[i] = sessionStorage.getItem(tokenStorage.toString())
    }
    },
  methods: {
    async modify_password(password){
      for(let i=0; i < config.numberOfSystem; i++) {
        await Modify_password(password, this.token[i], this.PcuList[i])
      }
    },
    async modify_reference_voltage(reference_voltage){
      for(let i=0; i < config.numberOfSystem; i++) {
        await Modify_reference_voltage(reference_voltage, this.token[i], this.PcuList[i])
      }
    },
    async change_location_db(number) {
      for (let i = 0; i < config.numberOfSystem; i++) {
        let db_location
        if (number === 0) {
          db_location = "ram"
        } else {
          db_location = "sd"
        }
        await Change_location_db(db_location, this.token[i], this.PcuList[i])
      }
    }
  },
  data: () => ({
    token:[],
    PcuList:[

    ],
    new_password: "",
    new_vref: "",
    toggle_db:0,
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
</style>
