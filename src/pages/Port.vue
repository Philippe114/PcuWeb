<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>

        <v-btn class="button_back" :to="{ name: 'Pcu' }" flat icon dark large color="black">
          <v-icon>arrow_back</v-icon>
        </v-btn>


  <h1>
   Port: {{port_number}}
  </h1>
      <h1 class="state">
        Port State:
      </h1>
      <div class="btn_port">
        <v-btn v-if="Port_state ==='ON'" color="#7CFC00" class="btn_ON" >{{ Port_state }}
        </v-btn>
        <v-btn v-else-if="Port_state ==='OFF'" color="#FFFFFF" class="btn_OFF" >{{ Port_state }}
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
              @click="dialogON = false ; Change_port_state(port_number,'ON')"
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
              @click="dialogOFF = false ; Change_port_state(port_number,'OFF')"
            >
            Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>



      <v-flex >
        <line-chart v-if="Power_checkbox===true" :data="PowervalueChart" :colors="['#8b47d8']" xtitle="Time" ytitle="Power [W]" :dataset="{borderWidth: 3}"  :min="0" title="Port Power" ></line-chart>
      </v-flex>

      <v-flex   row wrap v-if="get_info===true">
        <line-chart  v-if="Voltage_checkbox===true" :data="VoltagevalueChart" :colors="['#8b47d8']" xtitle="Time" ytitle="Voltage [V]" :dataset="{borderWidth: 3}" :min="0"title="Port Voltage"></line-chart>
      </v-flex>

      <v-flex  row wrap v-if="get_info===true">
        <line-chart  v-if="Current_checkbox===true" :data="CurrentvalueChart" :colors="['#8b47d8']" xtitle="Time" ytitle="Current [A]" :dataset="{borderWidth: 3}" :min="0" title="Port Current"></line-chart>
      </v-flex>


    <v-flex v-if="get_info===true">
    <line-chart  v-if="PortChange_checkbox===true" :data="Port_ChangeChart" :colors="['#8b47d8']" xtitle="Time" ytitle="Power [W]" :dataset="{borderWidth: 3,showLine:false}" title="Port State Change"></line-chart>
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
        <v-btn @click="get_port_measures_last_5min(port_number,1)">Last 5 min</v-btn>
        <v-btn @click="get_port_measures_last_hour(port_number,30)">Last hour</v-btn>
        <v-btn @click="get_port_measures_last_day(port_number,600)">Last Day</v-btn>
      </v-layout>

    <v-layout row wrap>
      <v-checkbox
        v-model="Power_checkbox"
        :label="'Power'"
      ></v-checkbox>
      <v-checkbox
        v-model="Current_checkbox"
        :label="'Current'"
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
    async Change_port_state(port_number,Port_state){
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
    reset_data_graph(){
      this.Powervalue = {}
      this.PowervalueChart = {}
      this.Currentvalue = {}
      this.Voltagevalue = {}
      this.CurrentvalueChart = {}
      this.VoltagevalueChart = {}
      this.Port_ChangeChart = {}
    },
    async get_port_measures(port_number, start_date, end_date,start_time,end_time,period) {
      this.get_info = true
      this.reset_data_graph()
      const start_datetime= start_date+"T"+start_time.toString()+":00.000Z"
      const end_datetime = end_date+"T"+end_time.toString()+":00.000Z"
      this.Port_Measures = await Get_port_data_avgMinMax(port_number, start_datetime, end_datetime,period,this.hostname)
      this.Poweravg = (this.Port_Measures["avg_measure"]["power"]+"").slice(0,5)
      this.Powermin = (this.Port_Measures["min_measure"]["power"]+"").slice(0,5)
      this.Powermax = (this.Port_Measures["max_measure"]["power"]+"").slice(0,5)

      this.Measures = this.Port_Measures["measures"]
      this.Date_data = Object.keys(this.Measures)
      const Date_data_array = this.Date_data
      let Date_data_array_update = {}
      for (let i = 0; i < Object.keys(this.Measures).length; i++) {

        this.Power = this.Measures[this.Date_data[i]]

        this.Powervalue[Date_data_array[i]] = (this.Power["power"])
        this.Currentvalue[Date_data_array[i]] = (this.Power["current"])
        this.Voltagevalue[Date_data_array[i]] = (this.Power["voltage"])
        Date_data_array_update[i] = Date_data_array[i].replace("T",":")
        Date_data_array_update[i] = Date_data_array_update[i].replace("Z","")
        this.PowervalueChart[Date_data_array_update[i]] = this.Powervalue[Date_data_array[i]]
        this.CurrentvalueChart[Date_data_array_update[i]] = this.Currentvalue[Date_data_array[i]]
        this.VoltagevalueChart[Date_data_array_update[i]] = this.Voltagevalue[Date_data_array[i]]

        if( i === (Object.keys(this.Measures).length-1)){
          this.Port_ChangeChart[Date_data_array_update[i]] = null
        }

      }
      this.Port_Change = this.Port_Measures["port_states"]
      for(let i = 0; i < this.Port_Change.length; i++) {
        this.Port_ChangeList = (this.Port_Change[i][0])
        this.Port_ChangeList =  this.Port_ChangeList.replace("T",":")
        this.Port_ChangeList =  this.Port_ChangeList.replace("Z","")
        this.Port_ChangeValueList = (this.Port_Change[i][1])
        this.Port_ChangeChart[this.Port_ChangeList] = this.Port_ChangeValueList
      }


      this.$forceUpdate()
    },
    async get_port_measures_last_hour(port_number,period) {
      this.period = period
      this.start_date_last_hour = new Date()
      this.get_info = true
      this.reset_data_graph()
      const end_datetime = (this.start_date_last_hour.getFullYear() +"-"+ (this.start_date_last_hour.getMonth()+1) +"-"+ this.start_date_last_hour.getDate()+"T"+
        this.start_date_last_hour.getHours() + ":" + this.start_date_last_hour.getMinutes() +":" +this.start_date_last_hour.getSeconds() + ".000Z").toString()

      this.start_date_last_hour.setHours((this.start_date_last_hour.getHours()-1))
      const start_datetime = (this.start_date_last_hour.getFullYear() +"-"+ (this.start_date_last_hour.getMonth()+1) +"-"+ this.start_date_last_hour.getDate()+"T" +
        (this.start_date_last_hour.getHours()) + ":" + this.start_date_last_hour.getMinutes() + ":" +this.start_date_last_hour.getSeconds() + ".000Z").toString()


      this.Port_Measures = await Get_port_data_avgMinMax(port_number, start_datetime, end_datetime,period,this.hostname)
      this.Poweravg = (this.Port_Measures["avg_measure"]["power"]+"").slice(0,5)
      this.Powermin = (this.Port_Measures["min_measure"]["power"]+"").slice(0,5)
      this.Powermax = (this.Port_Measures["max_measure"]["power"]+"").slice(0,5)

      this.Measures = this.Port_Measures["measures"]
      this.Date_data = Object.keys(this.Measures)
      let Date_data_array = this.Date_data
      let Date_data_array_update = {}
      for (let i = 0; i < Object.keys(this.Measures).length; i++) {

        this.Power = this.Measures[this.Date_data[i]]

        this.Powervalue[Date_data_array[i]] = (this.Power["power"])
        this.Currentvalue[Date_data_array[i]] = (this.Power["current"])
        this.Voltagevalue[Date_data_array[i]] = (this.Power["voltage"])
        Date_data_array_update[i] = Date_data_array[i].replace("T",":")
        Date_data_array_update[i] = Date_data_array_update[i].replace("Z","")
        this.PowervalueChart[Date_data_array_update[i]] = this.Powervalue[Date_data_array[i]]
        this.CurrentvalueChart[Date_data_array_update[i]] = this.Currentvalue[Date_data_array[i]]
        this.VoltagevalueChart[Date_data_array_update[i]] = this.Voltagevalue[Date_data_array[i]]
        if( i === (Object.keys(this.Measures).length-1)){
          this.Port_ChangeChart[Date_data_array_update[i]] = null
        }
      }

      this.Port_Change = this.Port_Measures["port_states"]
      for(let i = 0; i < this.Port_Change.length; i++) {
        this.Port_ChangeList = (this.Port_Change[i][0])
        this.Port_ChangeList =  this.Port_ChangeList.replace("T",":")
        this.Port_ChangeList =  this.Port_ChangeList.replace("Z","")
        this.Port_ChangeValueList = (this.Port_Change[i][1])
        this.Port_ChangeChart[this.Port_ChangeList] = this.Port_ChangeValueList
      }


      this.$forceUpdate()
    },
    async get_port_measures_last_5min(port_number,period) {
      this.period = period
      this.start_date_last_hour = new Date()
      this.get_info = true
      this.reset_data_graph()
      const end_datetime = (this.start_date_last_hour.getFullYear() +"-"+ (this.start_date_last_hour.getMonth()+1) +"-"+ this.start_date_last_hour.getDate()+"T"+
        this.start_date_last_hour.getHours() + ":" + this.start_date_last_hour.getMinutes() +":" +this.start_date_last_hour.getSeconds() + ".000Z").toString()
      this.start_date_last_hour.setMinutes((this.start_date_last_hour.getMinutes()-5))

      const start_datetime = (this.start_date_last_hour.getFullYear() +"-"+ (this.start_date_last_hour.getMonth()+1) +"-"+ this.start_date_last_hour.getDate()+"T" +
        (this.start_date_last_hour.getHours()) + ":" + (this.start_date_last_hour.getMinutes()) + ":" +this.start_date_last_hour.getSeconds() + ".000Z").toString()
      this.Port_Measures = await Get_port_data_avgMinMax(port_number, start_datetime, end_datetime,period,this.hostname)
      this.Poweravg = (this.Port_Measures["avg_measure"]["power"]+"").slice(0,5)
      this.Powermin = (this.Port_Measures["min_measure"]["power"]+"").slice(0,5)
      this.Powermax = (this.Port_Measures["max_measure"]["power"]+"").slice(0,5)

      this.Measures = this.Port_Measures["measures"]
      this.Date_data = Object.keys(this.Measures)
      let Date_data_array = this.Date_data
      let Date_data_array_update = {}
      for (let i = 0; i < Object.keys(this.Measures).length; i++) {
        this.Power = this.Measures[this.Date_data[i]]
        this.Powervalue[Date_data_array[i]] = (this.Power["power"])
        this.Currentvalue[Date_data_array[i]] = (this.Power["current"])
        this.Voltagevalue[Date_data_array[i]] = (this.Power["voltage"])
        Date_data_array_update[i] = Date_data_array[i].replace("T",":")
        Date_data_array_update[i] = Date_data_array_update[i].replace("Z","")
        this.PowervalueChart[Date_data_array_update[i]] = this.Powervalue[Date_data_array[i]]
        this.CurrentvalueChart[Date_data_array_update[i]] = this.Currentvalue[Date_data_array[i]]
        this.VoltagevalueChart[Date_data_array_update[i]] = this.Voltagevalue[Date_data_array[i]]
        if( i === (Object.keys(this.Measures).length-1)){
          this.Port_ChangeChart[Date_data_array_update[i]] = null
        }

      }
      this.Port_Change = this.Port_Measures["port_states"]
      for(let i = 0; i < this.Port_Change.length; i++) {
        this.Port_ChangeList = (this.Port_Change[i][0])
        this.Port_ChangeList =  this.Port_ChangeList.replace("T",":")
        this.Port_ChangeList =  this.Port_ChangeList.replace("Z","")
        this.Port_ChangeValueList = (this.Port_Change[i][1])
        this.Port_ChangeChart[this.Port_ChangeList] = this.Port_ChangeValueList
      }


      this.$forceUpdate()
    },
    async get_port_measures_last_day(port_number,period) {
      this.period = period
      this.start_date_last_hour = new Date()
      this.get_info = true
      this.reset_data_graph()
      const end_datetime = (this.start_date_last_hour.getFullYear() +"-"+ (this.start_date_last_hour.getMonth()+1) +"-"+ this.start_date_last_hour.getDate()+"T"+
        this.start_date_last_hour.getHours() + ":" + this.start_date_last_hour.getMinutes() +":" +this.start_date_last_hour.getSeconds() + ".000Z").toString()
      this.start_date_last_hour.setDate((this.start_date_last_hour.getDate()-1))
      const start_datetime = (this.start_date_last_hour.getFullYear() +"-"+ (this.start_date_last_hour.getMonth()+1) +"-"+ (this.start_date_last_hour.getDate())+"T" +
        (this.start_date_last_hour.getHours()) + ":" + (this.start_date_last_hour.getMinutes()) + ":" +this.start_date_last_hour.getSeconds() + ".000Z").toString()

      this.Port_Measures = await Get_port_data_avgMinMax(port_number, start_datetime, end_datetime,period,this.hostname)
      this.Poweravg = (this.Port_Measures["avg_measure"]["power"]+"").slice(0,5)
      this.Powermin = (this.Port_Measures["min_measure"]["power"]+"").slice(0,5)
      this.Powermax = (this.Port_Measures["max_measure"]["power"]+"").slice(0,5)

      this.Measures = this.Port_Measures["measures"]
      this.Date_data = Object.keys(this.Measures)
      let Date_data_array = this.Date_data
      let Date_data_array_update = {}
      for (let i = 0; i < Object.keys(this.Measures).length; i++) {

        this.Power = this.Measures[this.Date_data[i]]

        this.Powervalue[Date_data_array[i]] = (this.Power["power"])
        this.Currentvalue[Date_data_array[i]] = (this.Power["current"])
        this.Voltagevalue[Date_data_array[i]] = (this.Power["voltage"])
        Date_data_array_update[i] = Date_data_array[i].replace("T",":")
        Date_data_array_update[i] = Date_data_array_update[i].replace("Z","")
        this.PowervalueChart[Date_data_array_update[i]] = this.Powervalue[Date_data_array[i]]
        this.CurrentvalueChart[Date_data_array_update[i]] = this.Currentvalue[Date_data_array[i]]
        this.VoltagevalueChart[Date_data_array_update[i]] = this.Voltagevalue[Date_data_array[i]]

        if( i === (Object.keys(this.Measures).length-1)){
          this.Port_ChangeChart[Date_data_array_update[i]] = null
        }
      }
      this.Port_Change = this.Port_Measures["port_states"]
      for(let i = 0; i < this.Port_Change.length; i++) {
        this.Port_ChangeList = (this.Port_Change[i][0])
        this.Port_ChangeList =  this.Port_ChangeList.replace("T",":")
        this.Port_ChangeList =  this.Port_ChangeList.replace("Z","")
        this.Port_ChangeValueList = (this.Port_Change[i][1])
        this.Port_ChangeChart[this.Port_ChangeList] = this.Port_ChangeValueList
      }
      this.$forceUpdate()
    },
    async ReloadPage() {
      const port_State = await Get_port_state(this.port_number, this.hostname)
      if(port_State === 1){
         this.Port_state = "ON"
      }else{
         this.Port_state = "OFF"
      }
      this.$forceUpdate()

    },
    setup_hostname(){
      for(let k=0; k < config.numberOfSystem; k++) {
        this.PcuList[k].hostname = config.hostnameSystem[k]
      }
    },
  },
    beforeDestroy() {
      clearInterval(this.timer)
    },

    async mounted() {
      this.start_time_value =(this.date.getHours() + ":" + this.date.getMinutes())
      this.end_time_value = (this.date.getHours() + ":" + this.date.getMinutes())
      this.Port_state = await Get_port_state(this.port_number,this.hostname)
      //this.setup_hostname()
      //console.log(this.PcuList)
      //for(let i=0; i < config.numberOfSystem; i++){
        //if( this.hostname === this.PcuList[i].hostname){
        //  localStorage.setItem("token", this.token[i])
       // }
       // }
      this.token =  localStorage.getItem("token")
      console.log(this.token)
      if (this.Port_state === 0) {
        this.Port_state = "OFF"
      } else {
        this.Port_state = "ON"
      }
      await this.ReloadPage()
      this.timer = setInterval(this.ReloadPage, 1000)
  },

    data:() =>{
      return {
        TEST:[{name:"test1", data:{'1':8,'2':6}}, {name:"test2", data:{'1':5,'2':10}
        }],
        PcuList:[],
        hostname: localStorage.getItem("hostname"),
        Power_checkbox : true,
        token:"",
        start_date_last_hour: new Date(),
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
        Port_ChangeChart: {},
        Port_ChangeList: {},
        Port_ChangeValueList: {},
        Date_data: {},
        timer:"",
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
