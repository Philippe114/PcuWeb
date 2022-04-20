<template>
  <div>
    <v-container>

      <v-container  v-for="hostname in PcuList" :key="hostname.id">
        <h1>{{hostname.hostname}}</h1>
      <v-layout row warp class="square_port" justify-center justify-space-around >
        <li class="column_port"  style="list-style-type: none" v-for="item in hostname.PortList" :key="item.id" >
          <v-btn class="btn_change_page" flat @click.native="onClickPort(item.label,item.Port_State, hostname.hostname)"  :to="{ name: 'Port' }"  >{{item.label}}</v-btn>
          <v-dialog
            v-model="item.dialogChangePage"
            max-width="290"
          >
          <v-card>
            <v-card-title class="headline">Change page?</v-card-title>

            <v-card-text>
              Do you want to go to the page of {{item.label}}?
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                flat="flat"
                @click="item.dialogChangePage = false"
              >
                No
              </v-btn>

              <v-btn
                color="green darken-1"
                flat="flat"
                :to="{ name: 'Port' } "
                @click="item.dialogChangePage = false"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
          </v-dialog>

          <div class="btn_toggle">
            <Span class="port_state_span" >Port State:</Span>
            <v-btn v-if="item.Port_State ==='ON'" color="#7CFC00" class="btn_ON" flat>{{ item.Port_State }}
            </v-btn>
            <v-btn v-else-if="item.Port_State ==='OFF'" color="#000000" class="btn_OFF" flat >{{ item.Port_State }}
            </v-btn>
          </div>
          <div class="btn_toggle">
            <v-btn color="#7CFC00" class="btn_ON_OFF"  @click.native="item.dialogON = true" >ON
            </v-btn>
            <v-btn color="#FFFFFF" class="btn_ON_OFF"  @click.native="item.dialogOFF = true">OFF
            </v-btn>
          </div>

          <v-dialog
            v-model="item.dialogON"
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
                  @click="item.dialogON = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat="flat"
                  @click="item.dialogON = false ;Change_port_state1(item.label,'ON',hostname.hostname);"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="item.dialogOFF"
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
                  @click="item.dialogOFF = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat="flat"
                  @click="item.dialogOFF = false ; Change_port_state1(item.label,'OFF',hostname.hostname);"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <span class="Power">Power avg: {{item.PowerAvg}} W</span>
        </li>

        <v-snackbar
          color="#D2691E"
          v-model="snackbar_notconnected"
        >
          Not connected
        </v-snackbar>

      </v-layout>
<!--        <line-chart  :data="PowervalueChart8[hostname.hostname_number]" :colors="['#8b47d8','#800000', '#000080', '#008000','#FF0000', '#000000', '#FFD700','#D2691E']" xtitle="Time" ytitle="Power [W]" :dataset="{borderWidth: 1}"  :min="0" title="Ports Power" ></line-chart>-->
      </v-container>


    </v-container>
  </div>
</template>

<script>
import {
  Get_port_avg,
  Get_port_state,
  Change_port_state,
  Get_token, Get_port_instant, Get_port_min, Get_port_max, Get_port_data, Get_port_change
} from "../API";
const config = require('../../src/config/hostname.json');


export default {
  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
    ],
    PcuList:[

    ],
    PortList:[
      {id:('Port 0'), label: 'Port 0', dialogON:false, dialogOFF:false, dialogChangePage:false, Port_State:'OFF', PowerAvg:0},
      {id:('Port 1'), label: 'Port 1', dialogON:false, dialogOFF:false,dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
      {id:('Port 2'), label: 'Port 2', dialogON:false, dialogOFF:false,dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
      {id:('Port 3'), label: 'Port 3', dialogON:false, dialogOFF:false,dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
      {id:('Port 4'), label: 'Port 4', dialogON:false, dialogOFF:false,dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
      {id:('Port 5'), label: 'Port 5', dialogON:false, dialogOFF:false,dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
      {id:('Port 6'), label: 'Port 6', dialogON:false, dialogOFF:false, dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
      {id:('Port 7'), label: 'Port 7', dialogON:false, dialogOFF:false, dialogChangePage:false, Port_State:'OFF',PowerAvg:0}
    ],
    snackbar_notconnected:false,
    timer: '',
    timer2: '',
    timer8Ports: '',
    timerGetToken:'',
    Measures: {},
    Port_Measures: {},
    Date_data: {},
    Powermin: "",
    Powermax: "",
    Poweravg: "",
    password:"",
    token:[],
    Powervalue: {
    },
    PowervalueChart:{},
    PowervalueChart8:[[{name:"Port 0", data:{}}, {name:"Port 1", data:{}}, {name:"Port 2", data:{}}, {name:"Port 3", data:{}},
      {name:"Port 4", data:{}},{name:"Port 5", data:{}},{name:"Port 6", data:{}}, {name:"Port 7", data:{}}], [{name:"Port 0", data:{}}, {name:"Port 1", data:{}}, {name:"Port 2", data:{}}, {name:"Port 3", data:{}},
      {name:"Port 4", data:{}},{name:"Port 5", data:{}},{name:"Port 6", data:{}}, {name:"Port 7", data:{}}],
    ],
    Power: {},
    start_date: new Date(),
  }),
  methods: {

    //Function to change the port state. Need the token from login to work.
    async Change_port_state1(Port_number, Port_state, hostname) {
      console.log(hostname)
      for(let i=0; i < config.numberOfSystem; i++){
        if(hostname === this.PcuList[i].hostname){
          let port_number = parseInt(Port_number.substr(4, 5))
          await Change_port_state(this.token[i],port_number, Port_state,hostname)
        }
      }
    },

    //Function to store data for Port.vue
    onClickPort(Port_number, Port_state, hostname) {
      const port_number = parseInt(Port_number.substr(4,5))
      localStorage.setItem("port_number", port_number)
      localStorage.setItem("port_state", Port_state)
      localStorage.setItem("hostname", hostname)
      for(let i=0; i < config.numberOfSystem; i++){
        if( hostname === this.PcuList[i].hostname){
          localStorage.setItem("token", this.token[i])
          localStorage.setItem("systemActive", i.toString())
        }
      }
      if (Port_state === "OFF") {
        localStorage.setItem("btn_active", "OFF")
      } else {
        localStorage.setItem("btn_active", "ON")
      }
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    async ReloadPage(k) {
      for (let i = 0; i < 8; i++) {
        this.PcuList[k].PortList[i].Port_State = await Get_port_state(i, this.PcuList[k].hostname)
        if (this.PcuList[k].PortList[i].Port_State === 0) {
          this.PcuList[k].PortList[i].Port_State = "OFF"
        } else {
          this.PcuList[k].PortList[i].Port_State = "ON"
        }
      }

    this.$forceUpdate()
    },

    async get_port_measures(hostname_number) {
      this.Port_Measures = await Get_port_instant(this.PcuList[hostname_number].hostname)
      this.PcuList[hostname_number].PortList[0].PowerAvg = this.Port_Measures.port_0.port_power
      this.PcuList[hostname_number].PortList[1].PowerAvg = this.Port_Measures.port_1.port_power
      this.PcuList[hostname_number].PortList[2].PowerAvg = this.Port_Measures.port_2.port_power
      this.PcuList[hostname_number].PortList[3].PowerAvg = this.Port_Measures.port_3.port_power
      this.PcuList[hostname_number].PortList[4].PowerAvg = this.Port_Measures.port_4.port_power
      this.PcuList[hostname_number].PortList[5].PowerAvg = this.Port_Measures.port_5.port_power
      this.PcuList[hostname_number].PortList[6].PowerAvg = this.Port_Measures.port_6.port_power
      this.PcuList[hostname_number].PortList[7].PowerAvg = this.Port_Measures.port_7.port_power

      for (let i = 0; i < 8; i++) {
        this.PcuList[hostname_number].PortList[i].PowerAvg = this.PcuList[hostname_number].PortList[i].PowerAvg.toPrecision(4)
      }
      this.$forceUpdate()
    },
    reset_data_graph(){
      this.Powervalue = {}
      this.PowervalueChart = {}
    },
    async get_port_measures_last_hour(hostname_number) {
      this.start_date_last_hour = new Date()
      this.get_info = true
      this.reset_data_graph()
      const end_datetime = (this.start_date_last_hour.getFullYear() + "-" + (this.start_date_last_hour.getMonth() + 1) + "-" + this.start_date_last_hour.getDate() + "T" +
        this.start_date_last_hour.getHours() + ":" + this.start_date_last_hour.getMinutes() + ":" + this.start_date_last_hour.getSeconds() + ".000Z").toString()

      this.start_date_last_hour.setHours((this.start_date_last_hour.getHours() - 1))
      const start_datetime = (this.start_date_last_hour.getFullYear() + "-" + (this.start_date_last_hour.getMonth() + 1) + "-" + this.start_date_last_hour.getDate() + "T" +
        (this.start_date_last_hour.getHours()) + ":" + this.start_date_last_hour.getMinutes() + ":" + this.start_date_last_hour.getSeconds() + ".000Z").toString()

      for (let k = 0; k < 8; k++) {
        this.Measures = {}
        this.PowervalueChart = {}
        this.Measures = await Get_port_data(k, start_datetime, end_datetime, 300, this.PcuList[hostname_number].hostname)
        this.Date_data = Object.keys(this.Measures)
        let Date_data_array = this.Date_data
        let Date_data_array_update = {}
        this.Power = {}
        for (let i = 0; i < Object.keys(this.Measures).length; i++) {
          this.Power = this.Measures[this.Date_data[i]]
          this.Powervalue[Date_data_array[i]] = (this.Power["power"])
          Date_data_array_update[i] = Date_data_array[i].replace("T", ":")
          Date_data_array_update[i] = Date_data_array_update[i].replace("Z", "")
          this.PowervalueChart[Date_data_array_update[i]] = this.Powervalue[Date_data_array[i]]
        }
        this.PowervalueChart8[hostname_number][k].data = this.PowervalueChart
      }
    this.$forceUpdate()
    },
    //Get the token for the api
    get_Token(){
      for(let i=0; i < config.numberOfSystem; i++){
        let tokenStorage = "token"+i
        this.token[i] = localStorage.getItem(tokenStorage.toString())
        //if(this.token[0] === null){
          //this.snackbar_notconnected = true
          //this.timerGetToken = setTimeout(this.get_Token, 2000)
        //}else{
        //}
      }
    },
    //For multiple system
    setup_hostname(){
      for(let k=0; k < config.numberOfSystem; k++) {
        const PortListTemp = {hostname:"", hostname_number:k,PortList:[{id:('Port 0'), label: 'Port 0', dialogON:false, dialogOFF:false, dialogChangePage:false, Port_State:'OFF', PowerAvg:0},
            {id:('Port 1'), label: 'Port 1', dialogON:false, dialogOFF:false,dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
            {id:('Port 2'), label: 'Port 2', dialogON:false, dialogOFF:false,dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
            {id:('Port 3'), label: 'Port 3', dialogON:false, dialogOFF:false,dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
            {id:('Port 4'), label: 'Port 4', dialogON:false, dialogOFF:false,dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
            {id:('Port 5'), label: 'Port 5', dialogON:false, dialogOFF:false,dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
            {id:('Port 6'), label: 'Port 6', dialogON:false, dialogOFF:false, dialogChangePage:false, Port_State:'OFF',PowerAvg:0},
            {id:('Port 7'), label: 'Port 7', dialogON:false, dialogOFF:false, dialogChangePage:false, Port_State:'OFF',PowerAvg:0}]}
        this.PcuList.push(PortListTemp)
        this.PcuList[k].hostname = config.hostnameSystem[k]
      }
    },
  },
  beforeUpdate() {
    this.get_Token()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.timer2)
    clearInterval(this.timer8Ports)
    this.cancelAutoUpdate();
  },
  async mounted() {
    await this.setup_hostname()
    this.get_Token()
    for(let i=0; i < config.numberOfSystem; i++){
      await this.ReloadPage(i)
      await this.get_port_measures(i)
      // await this.get_port_measures_last_hour(i)
      this.timer = setInterval(this.ReloadPage, 6000,i)
      this.timer2 = setInterval(this.get_port_measures, 1000,i)
      // this.timer8Ports = setInterval(this.get_port_measures_last_hour, 60000,i)
    }
    this.$forceUpdate()
  },
}

</script>

<style>
.ON{
  background: #7CFC00 !important;
  opacity: 1 !important;
  min-width: 44px !important;
  display: flex !important;
  justify-content: center !important;

}
.btn_toggle{
  display: flex;
  width: 10px ;
  margin-left:15%;
}
.btn_ON{
  display: flex;
  min-width: 44px;
  opacity: 1 !important;
  max-width: 44px;
  margin-left:100%;
  pointer-events: none;
  margin-top: -3px;
}
.btn_ON_OFF{
  display: flex;
  min-width: 30px;
  max-width: 30px;
  margin-left:200%;
  margin-top: 8px
}

.btn_OFF{
  display: flex;
  min-width: 30px;
  max-width: 30px;
  margin-left:100%;
  margin-top: -3px;
  pointer-events: none;
}
.btn_change_page{
  display: flex;


}
.port_state_span{
  margin-top: 5px;
}
.column_port > .text {
  color: black;
  text-decoration:none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-left:10%;
}
.square_port{
  white-space: nowrap;
  display: flex;
  flex-wrap: wrap;
}
.Power{
  color: black;
  text-decoration:none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.column_port{
  margin: 10px;
  background-color: #D2691E;
  min-width: 160px;
  min-height: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

</style>
