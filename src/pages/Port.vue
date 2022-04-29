<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>

        <v-btn class="button_back" :to="{ name: 'Pcu' }" flat icon dark large color="black">
          <v-icon>arrow_back</v-icon>
        </v-btn>


  <h1>
    Port: {{ portNumber }}
  </h1>
      <h1 class="state">
        Port State:
      </h1>
      <div class="btn_port">
        <v-btn v-if="PortState ==='ON'" color="#7CFC00" class="btn_ON" >{{ PortState }}
        </v-btn>
        <v-btn v-else-if="PortState ==='OFF'" color="#FFFFFF" class="btn_OFF" >{{ PortState }}
        </v-btn>
      </div>
      <h1 class="state">
        Change Port State:
      </h1>
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
              @click="dialogON = false ; ChangePortState(portNumber,'ON')"
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
              @click="dialogOFF = false ; ChangePortState(portNumber,'OFF')"
            >
            Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>



      <v-flex >
        <line-chart v-if="PowerCheckbox===true" :data="PowervalueChart" :colors="['#8b47d8']" xtitle="Time" ytitle="Power [W]" :dataset="{borderWidth: 3}" :min="0" title="Port Power" ></line-chart>
      </v-flex>

      <v-flex   row wrap v-if="getInfo===true">
        <line-chart v-if="VoltageCheckbox===true" :data="VoltagevalueChart" :colors="['#8b47d8']" xtitle="Time" ytitle="Voltage [V]" :dataset="{borderWidth: 3}" :min="0" title="Port Voltage"></line-chart>
      </v-flex>

      <v-flex  row wrap v-if="getInfo===true">
        <line-chart v-if="CurrentCheckbox===true" :data="CurrentvalueChart" :colors="['#8b47d8']" xtitle="Time" ytitle="Current [A]" :dataset="{borderWidth: 3}" :min="0" title="Port Current"></line-chart>
      </v-flex>


    <v-flex v-if="getInfo===true">
    <line-chart v-if="PortChangeCheckbox===true" :data="PortChangeChart" :colors="['#8b47d8']" xtitle="Time" ytitle="Power [W]" :dataset="{borderWidth: 3,showLine:false}" title="Port State Change"></line-chart>
    </v-flex>

      <v-layout row wrap>
      <datetime v-model="startDate">
      <v-menu
        ref="start_menu"
        v-model="startMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="startDate"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startDate"
            label="Start date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="startDate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="startMenu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.start_menu.save(startDate)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      </datetime>

      <v-dialog
        ref="dialog1"
        v-model="startTime"
        :return-value.sync="startTimeValue"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startTimeValue"
            label="Start time"
            prepend-icon="access_time"
            readonly
            v-on="on"
            class="shrink"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="startTime"
          v-model="startTimeValue"
          full-width
          width="290px"
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="startTime = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog1.save(startTimeValue)">OK</v-btn>
        </v-time-picker>
      </v-dialog>

      <datetime v-model="endDate">
      <v-menu
        ref="end_menu"
        v-model="endMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="endDate"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="endDate"
            label="End date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="endDate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="endMenu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.end_menu.save(endDate)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      </datetime>

      <v-dialog
        ref="dialog2"
        v-model="endTime"
        :return-value.sync="endTimeValue"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="endTimeValue"
            label="End time"
            prepend-icon="access_time"
            readonly
            v-on="on"
            class="shrink"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="endTime"
          v-model="endTimeValue"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="endTime = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog2.save(endTimeValue)">OK</v-btn>
        </v-time-picker>
      </v-dialog>

      <v-text-field
        v-model="period"
        placeholder="Period"
        class="shrink"
      ></v-text-field>

      <v-btn @click="getPortMeasures(portNumber,startDate,endDate,startTimeValue,endTimeValue,period)">Get info</v-btn>
        <v-btn @click="getPortMeasuresLast5min(portNumber,1)">Last 5 min</v-btn>
        <v-btn @click="getPortMeasuresLastHour(portNumber,30)">Last hour</v-btn>
        <v-btn @click="getPortMeasuresLastDay(portNumber,600)">Last Day</v-btn>
      </v-layout>

    <v-layout row wrap>
      <v-checkbox
        v-model="PowerCheckbox"
        :label="'Power'"
      ></v-checkbox>
      <v-checkbox
        v-model="CurrentCheckbox"
        :label="'Current'"
      ></v-checkbox>
      <v-checkbox
        v-model="VoltageCheckbox"
        :label="'Voltage'"
      ></v-checkbox>
      <v-checkbox
        v-model="PortChangeCheckbox"
        :label="'Show Change port state'"
      ></v-checkbox>
    </v-layout>
    <span>Avg power: {{Poweravg}} W</span>
    <div><span >Min power: {{Powermin}} W</span>
    </div>
    <div><span>Max power: {{Powermax}} W</span>
    </div>

  </v-container>

</template>

<script>
import {
  Get_port_max,
  Get_port_data,
  Get_port_change,
  Get_port_avg,
  Get_port_min,
  Get_port_state,
  Change_port_state,
  Get_port_data_avgMinMax
} from "../API";
import config from "../config/hostname.json";


export default {

  name: "Port",
  methods: {
    async ChangePortState(port_number, Port_state){
      await Change_port_state(this.token,port_number,Port_state,this.hostname)
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
    resetDataGraph(){
      this.Powervalue = {}
      this.PowervalueChart = {}
      this.Currentvalue = {}
      this.Voltagevalue = {}
      this.CurrentvalueChart = {}
      this.VoltagevalueChart = {}
      this.PortChangeChart = {}
    },
    async getPortMeasures(port_number, start_date, end_date, start_time, end_time, period) {
      this.getInfo = true
      this.resetDataGraph()
      const start_datetime= start_date+"T"+start_time.toString()+":00.000Z"
      const end_datetime = end_date+"T"+end_time.toString()+":00.000Z"
      this.PortMeasures = await Get_port_data_avgMinMax(port_number, start_datetime, end_datetime,period,this.hostname)
      this.Poweravg = (this.PortMeasures["avg_measure"]["power"]+"").slice(0,5)
      this.Powermin = (this.PortMeasures["min_measure"]["power"]+"").slice(0,5)
      this.Powermax = (this.PortMeasures["max_measure"]["power"]+"").slice(0,5)

      this.Measures = this.PortMeasures["measures"]
      this.DateData = Object.keys(this.Measures)
      const Date_data_array = this.DateData
      let Date_data_array_update = {}
      for (let i = 0; i < Object.keys(this.Measures).length; i++) {

        this.Power = this.Measures[this.DateData[i]]

        this.Powervalue[Date_data_array[i]] = (this.Power["power"])
        this.Currentvalue[Date_data_array[i]] = (this.Power["current"])
        this.Voltagevalue[Date_data_array[i]] = (this.Power["voltage"])
        Date_data_array_update[i] = Date_data_array[i].replace("T",":")
        Date_data_array_update[i] = Date_data_array_update[i].replace("Z","")
        this.PowervalueChart[Date_data_array_update[i]] = this.Powervalue[Date_data_array[i]]
        this.CurrentvalueChart[Date_data_array_update[i]] = this.Currentvalue[Date_data_array[i]]
        this.VoltagevalueChart[Date_data_array_update[i]] = this.Voltagevalue[Date_data_array[i]]

        if( i === (Object.keys(this.Measures).length-1)){
          this.PortChangeChart[Date_data_array_update[i]] = null
        }

      }
      this.PortChange = this.PortMeasures["port_states"]
      for(let i = 0; i < this.PortChange.length; i++) {
        this.PortChangeList = (this.PortChange[i][0])
        this.PortChangeList =  this.PortChangeList.replace("T",":")
        this.PortChangeList =  this.PortChangeList.replace("Z","")
        this.PortChangeValueList = (this.PortChange[i][1])
        this.PortChangeChart[this.PortChangeList] = this.PortChangeValueList
      }


      this.$forceUpdate()
    },
    async getPortMeasuresLastHour(port_number, period) {
      this.period = period
      this.startDateLastHour = new Date()
      this.getInfo = true
      this.resetDataGraph()
      const end_datetime = (this.startDateLastHour.getFullYear() +"-"+ (this.startDateLastHour.getMonth()+1) +"-"+ this.startDateLastHour.getDate()+"T"+
        this.startDateLastHour.getHours() + ":" + this.startDateLastHour.getMinutes() +":" +this.startDateLastHour.getSeconds() + ".000Z").toString()

      this.startDateLastHour.setHours((this.startDateLastHour.getHours()-1))
      const start_datetime = (this.startDateLastHour.getFullYear() +"-"+ (this.startDateLastHour.getMonth()+1) +"-"+ this.startDateLastHour.getDate()+"T" +
        (this.startDateLastHour.getHours()) + ":" + this.startDateLastHour.getMinutes() + ":" +this.startDateLastHour.getSeconds() + ".000Z").toString()


      this.PortMeasures = await Get_port_data_avgMinMax(port_number, start_datetime, end_datetime,period,this.hostname)
      this.Poweravg = (this.PortMeasures["avg_measure"]["power"]+"").slice(0,5)
      this.Powermin = (this.PortMeasures["min_measure"]["power"]+"").slice(0,5)
      this.Powermax = (this.PortMeasures["max_measure"]["power"]+"").slice(0,5)

      this.Measures = this.PortMeasures["measures"]
      this.DateData = Object.keys(this.Measures)
      let Date_data_array = this.DateData
      let Date_data_array_update = {}
      for (let i = 0; i < Object.keys(this.Measures).length; i++) {

        this.Power = this.Measures[this.DateData[i]]

        this.Powervalue[Date_data_array[i]] = (this.Power["power"])
        this.Currentvalue[Date_data_array[i]] = (this.Power["current"])
        this.Voltagevalue[Date_data_array[i]] = (this.Power["voltage"])
        Date_data_array_update[i] = Date_data_array[i].replace("T",":")
        Date_data_array_update[i] = Date_data_array_update[i].replace("Z","")
        this.PowervalueChart[Date_data_array_update[i]] = this.Powervalue[Date_data_array[i]]
        this.CurrentvalueChart[Date_data_array_update[i]] = this.Currentvalue[Date_data_array[i]]
        this.VoltagevalueChart[Date_data_array_update[i]] = this.Voltagevalue[Date_data_array[i]]
        if( i === (Object.keys(this.Measures).length-1)){
          this.PortChangeChart[Date_data_array_update[i]] = null
        }
      }

      this.PortChange = this.PortMeasures["port_states"]
      for(let i = 0; i < this.PortChange.length; i++) {
        this.PortChangeList = (this.PortChange[i][0])
        this.PortChangeList =  this.PortChangeList.replace("T",":")
        this.PortChangeList =  this.PortChangeList.replace("Z","")
        this.PortChangeValueList = (this.PortChange[i][1])
        this.PortChangeChart[this.PortChangeList] = this.PortChangeValueList
      }


      this.$forceUpdate()
    },
    async getPortMeasuresLast5min(port_number, period) {
      this.period = period
      this.startDateLastHour = new Date()
      this.getInfo = true
      this.resetDataGraph()
      const end_datetime = (this.startDateLastHour.getFullYear() +"-"+ (this.startDateLastHour.getMonth()+1) +"-"+ this.startDateLastHour.getDate()+"T"+
        this.startDateLastHour.getHours() + ":" + this.startDateLastHour.getMinutes() +":" +this.startDateLastHour.getSeconds() + ".000Z").toString()
      this.startDateLastHour.setMinutes((this.startDateLastHour.getMinutes()-5))

      const start_datetime = (this.startDateLastHour.getFullYear() +"-"+ (this.startDateLastHour.getMonth()+1) +"-"+ this.startDateLastHour.getDate()+"T" +
        (this.startDateLastHour.getHours()) + ":" + (this.startDateLastHour.getMinutes()) + ":" +this.startDateLastHour.getSeconds() + ".000Z").toString()
      this.PortMeasures = await Get_port_data_avgMinMax(port_number, start_datetime, end_datetime,period,this.hostname)
      this.Poweravg = (this.PortMeasures["avg_measure"]["power"]+"").slice(0,5)
      this.Powermin = (this.PortMeasures["min_measure"]["power"]+"").slice(0,5)
      this.Powermax = (this.PortMeasures["max_measure"]["power"]+"").slice(0,5)

      this.Measures = this.PortMeasures["measures"]
      this.DateData = Object.keys(this.Measures)
      let Date_data_array = this.DateData
      let Date_data_array_update = {}
      for (let i = 0; i < Object.keys(this.Measures).length; i++) {
        this.Power = this.Measures[this.DateData[i]]
        this.Powervalue[Date_data_array[i]] = (this.Power["power"])
        this.Currentvalue[Date_data_array[i]] = (this.Power["current"])
        this.Voltagevalue[Date_data_array[i]] = (this.Power["voltage"])
        Date_data_array_update[i] = Date_data_array[i].replace("T",":")
        Date_data_array_update[i] = Date_data_array_update[i].replace("Z","")
        this.PowervalueChart[Date_data_array_update[i]] = this.Powervalue[Date_data_array[i]]
        this.CurrentvalueChart[Date_data_array_update[i]] = this.Currentvalue[Date_data_array[i]]
        this.VoltagevalueChart[Date_data_array_update[i]] = this.Voltagevalue[Date_data_array[i]]
        if( i === (Object.keys(this.Measures).length-1)){
          this.PortChangeChart[Date_data_array_update[i]] = null
        }

      }
      this.PortChange = this.PortMeasures["port_states"]
      for(let i = 0; i < this.PortChange.length; i++) {
        this.PortChangeList = (this.PortChange[i][0])
        this.PortChangeList =  this.PortChangeList.replace("T",":")
        this.PortChangeList =  this.PortChangeList.replace("Z","")
        this.PortChangeValueList = (this.PortChange[i][1])
        this.PortChangeChart[this.PortChangeList] = this.PortChangeValueList
      }


      this.$forceUpdate()
    },
    async getPortMeasuresLastDay(port_number, period) {
      this.period = period
      this.startDateLastHour = new Date()
      this.getInfo = true
      this.resetDataGraph()
      const end_datetime = (this.startDateLastHour.getFullYear() +"-"+ (this.startDateLastHour.getMonth()+1) +"-"+ this.startDateLastHour.getDate()+"T"+
        this.startDateLastHour.getHours() + ":" + this.startDateLastHour.getMinutes() +":" +this.startDateLastHour.getSeconds() + ".000Z").toString()
      this.startDateLastHour.setDate((this.startDateLastHour.getDate()-1))
      const start_datetime = (this.startDateLastHour.getFullYear() +"-"+ (this.startDateLastHour.getMonth()+1) +"-"+ (this.startDateLastHour.getDate())+"T" +
        (this.startDateLastHour.getHours()) + ":" + (this.startDateLastHour.getMinutes()) + ":" +this.startDateLastHour.getSeconds() + ".000Z").toString()

      this.PortMeasures = await Get_port_data_avgMinMax(port_number, start_datetime, end_datetime,period,this.hostname)
      this.Poweravg = (this.PortMeasures["avg_measure"]["power"]+"").slice(0,5)
      this.Powermin = (this.PortMeasures["min_measure"]["power"]+"").slice(0,5)
      this.Powermax = (this.PortMeasures["max_measure"]["power"]+"").slice(0,5)

      this.Measures = this.PortMeasures["measures"]
      this.DateData = Object.keys(this.Measures)
      let Date_data_array = this.DateData
      let Date_data_array_update = {}
      for (let i = 0; i < Object.keys(this.Measures).length; i++) {

        this.Power = this.Measures[this.DateData[i]]

        this.Powervalue[Date_data_array[i]] = (this.Power["power"])
        this.Currentvalue[Date_data_array[i]] = (this.Power["current"])
        this.Voltagevalue[Date_data_array[i]] = (this.Power["voltage"])
        Date_data_array_update[i] = Date_data_array[i].replace("T",":")
        Date_data_array_update[i] = Date_data_array_update[i].replace("Z","")
        this.PowervalueChart[Date_data_array_update[i]] = this.Powervalue[Date_data_array[i]]
        this.CurrentvalueChart[Date_data_array_update[i]] = this.Currentvalue[Date_data_array[i]]
        this.VoltagevalueChart[Date_data_array_update[i]] = this.Voltagevalue[Date_data_array[i]]

        if( i === (Object.keys(this.Measures).length-1)){
          this.PortChangeChart[Date_data_array_update[i]] = null
        }
      }
      this.PortChange = this.PortMeasures["port_states"]
      for(let i = 0; i < this.PortChange.length; i++) {
        this.PortChangeList = (this.PortChange[i][0])
        this.PortChangeList =  this.PortChangeList.replace("T",":")
        this.PortChangeList =  this.PortChangeList.replace("Z","")
        this.PortChangeValueList = (this.PortChange[i][1])
        this.PortChangeChart[this.PortChangeList] = this.PortChangeValueList
      }
      this.$forceUpdate()
    },
    async reloadPage() {
      const port_State = await Get_port_state(this.portNumber, this.hostname)
      if(port_State === 1){
         this.PortState = "ON"
      }else{
         this.PortState = "OFF"
      }
      this.$forceUpdate()

    },
    setupHostname(){
      for(let k=0; k < config.numberOfSystem; k++) {
        this.PcuList[k].hostname = config.hostnameSystem[k]
      }
    },
    getToken(){
        let tokenStorage = "token"+localStorage.getItem("systemActive")
        this.token = localStorage.getItem(tokenStorage.toString())
    },
  },
    beforeDestroy() {
      clearInterval(this.timerReloadPage)
    },
  beforeUpdate() {
    this.getToken()
  },

    async mounted() {
      this.startTimeValue =(this.date.getHours() + ":" + this.date.getMinutes())
      this.endTimeValue = (this.date.getHours() + ":" + this.date.getMinutes())
      this.PortState = await Get_port_state(this.portNumber,this.hostname)
      this.token =  localStorage.getItem("token")
      if (this.PortState === 0) {
        this.PortState = "OFF"
      } else {
        this.PortState = "ON"
      }
      await this.reloadPage()
      this.timerReloadPage = setInterval(this.reloadPage, 1000)
  },

    data:() =>{
      return {
        PcuList:[],
        hostname: localStorage.getItem("hostname"),
        PowerCheckbox : true,
        token:"",
        startDateLastHour: new Date(),
        CurrentCheckbox : false,
        PortChangeCheckbox : false,
        VoltageCheckbox : false,
        portNumber: localStorage.getItem("port_number"),
        btnActive: localStorage.getItem("btn_active"),
        PortState: [],
        toggleExclusive: 0,
        dialogON: false,
        dialogOFF: false,
        startDate: new Date().toISOString().substr(0, 10),
        date : new Date(),
        endDate: new Date().toISOString().substr(0, 10),
        startMenu: false,
        endMenu: false,
        startTime:false,
        startTimeValue:null,
        endTime:false,
        endTimeValue:null,
        getInfo: false,
        Measures: {},
        period:1,
        PortMeasures: {},
        PortChange: {},
        PortChangeChart: {},
        PortChangeList: {},
        PortChangeValueList: {},
        DateData: {},
        timerReloadPage:"",
        Powermin: "",
        Powermax: "",
        Poweravg: "",
        Powervalue: {},
        PowervalueChart: {},
        Currentvalue: {},
        CurrentvalueChart: {},
        Voltagevalue: {},
        VoltagevalueChart: {},
        Power: {},
      }
    }
  }

</script>

<style scoped>
.btn_ON{
  display: flex;
  min-width: 44px;
  opacity: 1 !important;
  max-width: 44px;
  margin-left: 25px;
  pointer-events: none;
  margin-top: 3px
}
.btn_ON_OFF{
  display: flex;
  min-width: 44px;
  max-width: 44px;
  margin-left: 25px;
  margin-top: 3px
}

.btn_OFF{
  display: flex;
  min-width: 44px;
  max-width: 44px;
  margin-left: 25px;
  margin-top: 3px;
  pointer-events: none;
  background: #FFFFFF !important;
}
.shrink{
  margin-left: 10px;
}
.state{
  margin-left: 10px;
}
.button_back{
  margin-top: 0 ;
}

</style>
