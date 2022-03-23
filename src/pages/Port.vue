<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
  <h1>
   Port: {{port_number}}
  </h1>

      <div class="btn_port">
        <v-btn v-if="Port_state ==='ON'" color="#7CFC00" class="btn_ON" >{{ Port_state }}
        </v-btn>
        <v-btn v-else-if="Port_state ==='OFF'" color="#FFFFFF" class="btn_OFF"  >{{ Port_state }}
        </v-btn>
      </div>
      <div class="btn_port">
        <v-btn color="#7CFC00" class="btn_ON_OFF"  @click.native="dialogON = true" >ON
        </v-btn>
        <v-btn color="#FFFFFF" class="btn_ON_OFF"  @click.native="dialogOFF = true">OFF
        </v-btn>
      </div>

      <v-dialog
        v-model="dialogON"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Change port state?</v-card-title>

          <v-card-text>
            Do you want to change the port state?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialogON = false"
            >
              No
            </v-btn>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialogON = false ; Port_state = onClickBtn('OFF'); Change_port_state(port_number,Port_state)"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialogOFF"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Change port state?</v-card-title>

          <v-card-text>
            Do you want to change the port state?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialogOFF = false"
            >
              No
            </v-btn>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialogOFF = false ; Port_state = onClickBtn('ON'); Change_port_state(port_number,Port_state)"
            >
            Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>


    <v-layout row wrap>
      <v-flex v-if="get_info===true">
        <line-chart v-if="Power_checkbox===true" :data="Powervalue" :colors="['#8b47d8']" xtitle="Time" ytitle="Power [W]" :dataset="{borderWidth: 3}" title="Port Power"></line-chart>

      </v-flex>
      <v-flex v-if="get_info===true">
      <line-chart  v-if="Current_checkbox===true" :data="Currentvalue" :colors="['#8b47d8']" xtitle="Time" ytitle="Current [A]" :dataset="{borderWidth: 3}" title="Port Current"></line-chart>
      </v-flex>
      <v-flex v-if="get_info===true">
        <line-chart  v-if="Voltage_checkbox===true" :data="Voltagevalue" :colors="['#8b47d8']" xtitle="Time" ytitle="Voltage [V]" :dataset="{borderWidth: 3}" title="Port Voltage"></line-chart>
      </v-flex>
    </v-layout>
    <v-flex v-if="get_info===true">
    <column-chart  v-if="PortChange_checkbox===true":data="Port_Change" :colors="['#8b47d8']" xtitle="Time" ytitle="Power [W]" :dataset="{borderWidth: 3}" title="Port State Change"></column-chart>
    </v-flex>
      <v-layout row wrap>
      <datetime v-model="start_date">
      <v-menu
        ref="start_menu"
        v-model="start_menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="start_date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="start_date"
            label="Start date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="start_date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="start_menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.start_menu.save(start_date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      </datetime>

      <v-dialog
        ref="dialog1"
        v-model="start_time"
        :return-value.sync="start_time_value"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="start_time_value"
            label="Start time"
            prepend-icon="access_time"
            readonly
            v-on="on"
            class="shrink"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="start_time"
          v-model="start_time_value"
          full-width
          width="290px"
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="start_time = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog1.save(start_time_value)">OK</v-btn>
        </v-time-picker>
      </v-dialog>

      <datetime v-model="end_date">
      <v-menu
        ref="end_menu"
        v-model="end_menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="end_date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="end_date"
            label="End date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="end_date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="end_menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.end_menu.save(end_date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      </datetime>

      <v-dialog
        ref="dialog2"
        v-model="end_time"
        :return-value.sync="end_time_value"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="end_time_value"
            label="End time"
            prepend-icon="access_time"
            readonly
            v-on="on"
            class="shrink"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="end_time"
          v-model="end_time_value"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="end_time = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog2.save(end_time_value)">OK</v-btn>
        </v-time-picker>
      </v-dialog>

      <v-text-field
        v-model="period"
        placeholder="Period"
        class="shrink"
      ></v-text-field>

      <v-btn @click="get_port_measures(port_number,start_date,end_date,start_time_value,end_time_value,period)">Get info</v-btn>
      <v-checkbox
        v-model="Power_checkbox"
        :label="'Power'"
      ></v-checkbox>
      <v-checkbox
        v-model="Current_checkbox"
        :label="'Curent'"
      ></v-checkbox>
      <v-checkbox
        v-model="Voltage_checkbox"
        :label="'Voltage'"
      ></v-checkbox>
      <v-checkbox
        v-model="PortChange_checkbox"
        :label="'Show Change port state'"
      ></v-checkbox>
    </v-layout>
    <span>Power avg: {{Poweravg}} W</span>
    <div><span >Power min: {{Powermin}} W</span>
    </div>
    <div><span>Power max: {{Powermax}} W</span>
    </div>

  </v-container>

</template>

<script>
import {Get_port_max, Get_port_data, Get_port_change, Get_port_avg, Get_port_min, Get_port_state, Change_port_state} from "../API";


export default {

  name: "Port",
  methods: {
    async Change_port_state(port_number,Port_state){
      await Change_port_state(this.token,port_number,Port_state)
    },
    onClickBtn(label) {
      if (label === "OFF") {
        label = "ON"
        return label
      } else {
        label = "OFF"
        return label
      }
    },
    async get_port_measures(port_number, start_date, end_date,start_time,end_time,period) {
      this.get_info = true
      this.Powervalue = {}
      this.Currentvalue = {}
      this.Voltagevalue = {}
      const start_datetime= start_date+"T"+start_time.toString()+":00.000Z"
      const end_datetime = end_date+"T"+end_time.toString()+":00.000Z"
      this.Port_Measures = await Get_port_avg(port_number, start_datetime, end_datetime,period)
      console.log(this.Port_Measures)
      this.Poweravg = (this.Port_Measures["power"]+"").slice(0,5)
      this.Port_Measures = await Get_port_min(port_number, start_datetime, end_datetime,period)
      this.Powermin = (this.Port_Measures["power"]+"").slice(0,5)
      this.Port_Measures = await Get_port_max(port_number, start_datetime, end_datetime,period)
      this.Powermax = (this.Port_Measures["power"]+"").slice(0,5)

      this.Measures = await Get_port_data(port_number, start_datetime, end_datetime,period)
      this.Date_data = Object.keys(this.Measures)
      const Date_data_array = this.Date_data
      for (let i = 0; i < Object.keys(this.Measures).length; i++) {
        this.Power = this.Measures[this.Date_data[i]]
        this.Powervalue[Date_data_array[i]] = (this.Power["power"])
        this.Currentvalue[Date_data_array[i]] = (this.Power["current"])
        this.Voltagevalue[Date_data_array[i]] = (this.Power["voltage"])
      }
      this.Port_Change = await Get_port_change(port_number, start_datetime, end_datetime,period)
      console.log(this.Port_Change[0])
      for(let i = 0; i < this.Port_Change.length; i++) {
        this.Port_ChangeList = (this.Port_Change[i][0])
        console.log(this.Port_Change[i][0])
        this.Port_ChangeValueList = (this.Port_Change[i][1])
        console.log(this.Port_Change[i][1])
      }


      this.$forceUpdate()
    },
  },
    async mounted() {
      this.start_time_value =(this.date.getHours() + ":" + this.date.getMinutes())
      this.end_time_value = (this.date.getHours() + ":" + this.date.getMinutes())
      this.Port_state = await Get_port_state(this.port_number)
      this.token =  localStorage.getItem("token")
      console.log(this.token)
      if (this.Port_state === 0) {
        this.Port_state = "OFF"
      } else {
        this.Port_state = "ON"
      }
  },

    data:() =>{
      return {
        Power_checkbox : true,
        token:"",
        Current_checkbox : false,
        PortChange_checkbox : false,
        Voltage_checkbox : false,
        port_number: localStorage.getItem("port_number"),
        btn_active: localStorage.getItem("btn_active"),
        Port_state: [],
        toggle_exclusive: 0,
        dialogON: false,
        dialogOFF: false,
        start_date: new Date().toISOString().substr(0, 10),
        date : new Date(),
        end_date: new Date().toISOString().substr(0, 10),
        start_menu: false,
        end_menu: false,
        start_time:false,
        start_time_value:null,
        end_time:false,
        end_time_value:null,
        get_info: false,
        Measures: {},
        period:1,
        Port_Measures: {},
        Port_Change: {},
        Port_ChangeList: {},
        Port_ChangeValueList: {},
        Date_data: {},
        Powermin: "",
        Powermax: "",
        Poweravg: "",
        Powervalue: {},
        Currentvalue: {},
        Voltagevalue: {},
        Power: {},
      }
    }
  }

</script>

<style scoped>
.ON{
  background: #7CFC00 !important;
  opacity: 1 !important;
  min-width: 44px !important;
  display: flex !important;
  justify-content: center !important;

}
.btn_ON{
  display: flex;
  min-width: 44px;
  opacity: 1 !important;
  max-width: 44px;
  margin-left: 25px;
  pointer-events: none;
  margin-top: 8px
}
.btn_ON_OFF{
  display: flex;
  min-width: 44px;
  max-width: 44px;
  margin-left: 25px;
  margin-top: 8px
}

.btn_OFF{
  display: flex;
  min-width: 44px;
  max-width: 44px;
  margin-left: 25px;
  margin-top: 8px;
  pointer-events: none;
  background: #FFFFFF !important;
}
.shrink{
  margin-left: 10px;
}

</style>
