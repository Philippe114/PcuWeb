<template>
  <div>
    <v-container>
      <v-flex xs12 sm3>
        <v-btn @click="ReloadPage()" flat icon dark large color="blue">
          <v-icon>cached</v-icon>
        </v-btn>

      </v-flex>



      <v-layout row warp class="square_port" justify-center justify-space-around v-for="hostname in PcuList" :key="hostname.id" >
        <h1>{{hostname.hostname}}</h1>
        <li class="column_port"  style="list-style-type: none" v-for="item in hostname.PortList" :key="item.id" >
          <v-btn class="btn_change_page" flat @click.native="onClickPort(item.label,item.Port_State, hostname);item.dialogChangePage = true" >{{item.label}}</v-btn>
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
            <v-btn v-if="item.Port_State ==='ON'" color="#7CFC00" class="btn_ON" >{{ item.Port_State }}
            </v-btn>
            <v-btn v-else-if="item.Port_State ==='OFF'" color="#FFFFFF" class="btn_OFF"  >{{ item.Port_State }}
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
                  @click="item.dialogON = false ; item.Port_State = onClickBtn('OFF');Change_port_state1(item.label,item.Port_State,hostname);"
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
                  @click="item.dialogOFF = false ;item.Port_State = onClickBtn('ON'); Change_port_state1(item.label,item.Port_State,hostname);"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <span class="Power">Power avg: {{item.PowerAvg}} W</span>
        </li>
      </v-layout>



    </v-container>
  </div>
</template>

<script>
import {
  Get_port_avg,
  Get_port_state,
  Change_port_state,
  Get_token, Get_port_instant
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
    timer: '',
    timer2: '',
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
    Power: {},
    start_date: new Date(),
  }),
  methods: {

    async Change_port_state1(Port_number, Port_state,hostname) {
      for(let i=0; i < config.numberOfSystem; i++){
        if( hostname === this.PcuList[i]){
          let port_number = parseInt(Port_number.substr(4, 5))
          await Change_port_state(this.token[i],port_number, Port_state,hostname.hostname)
        }
      }
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
    onClickPort(Port_number, Port_state, hostname) {
      const port_number = parseInt(Port_number.substr(4,5))
      sessionStorage.setItem("port_number", port_number)
      sessionStorage.setItem("port_state", Port_state)
      sessionStorage.setItem("hostname", hostname.hostname)
      for(let i=0; i < config.numberOfSystem; i++){
        if( hostname === this.PcuList[i]){
          sessionStorage.setItem("token", this.token[i])
        }
      }
      if (Port_state === "OFF") {
        sessionStorage.setItem("btn_active", "OFF")
      } else {
        sessionStorage.setItem("btn_active", "ON")
      }
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    async ReloadPage() {
      for(let k=0; k < config.numberOfSystem; k++) {
        for (let i = 0; i < 8; i++) {
          this.PcuList[k].PortList[i].Port_State = await Get_port_state(i, this.PcuList[k].hostname)
          if (this.PcuList[k].PortList[i].Port_State === 0) {
            this.PcuList[k].PortList[i].Port_State = "OFF"
          } else {
            this.PcuList[k].PortList[i].Port_State = "ON"
          }
        }
      }
      this.$forceUpdate()
    },
    async get_port_measures() {
      for(let k=0; k < config.numberOfSystem; k++) {
        this.Port_Measures = await Get_port_instant(this.PcuList[k].hostname)
        this.PcuList[k].PortList[0].PowerAvg = this.Port_Measures.port_0.port_power
        this.PcuList[k].PortList[1].PowerAvg = this.Port_Measures.port_1.port_power
        this.PcuList[k].PortList[2].PowerAvg = this.Port_Measures.port_2.port_power
        this.PcuList[k].PortList[3].PowerAvg = this.Port_Measures.port_3.port_power
        this.PcuList[k].PortList[4].PowerAvg = this.Port_Measures.port_4.port_power
        this.PcuList[k].PortList[5].PowerAvg = this.Port_Measures.port_5.port_power
        this.PcuList[k].PortList[6].PowerAvg = this.Port_Measures.port_6.port_power
        this.PcuList[k].PortList[7].PowerAvg = this.Port_Measures.port_7.port_power

        for (let i = 0; i < 8; i++) {
          this.PcuList[k].PortList[i].PowerAvg = this.PcuList[k].PortList[i].PowerAvg.toPrecision(4)
        }
        this.$forceUpdate()
      }
    },
    get_Token(){
      for(let i=0; i < config.numberOfSystem; i++){
        let tokenStorage = "token"+i
        this.token[i] = sessionStorage.getItem(tokenStorage.toString())
        console.log(this.token[i])
      }
    },
    setup_hostname(){
      for(let k=0; k < config.numberOfSystem; k++) {
        const PortListTemp = {hostname:"",PortList:[{id:('Port 0'), label: 'Port 0', dialogON:false, dialogOFF:false, dialogChangePage:false, Port_State:'OFF', PowerAvg:0},
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
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  async mounted() {
    this.setup_hostname()
    this.get_Token()
    for(let i=0; i < config.numberOfSystem; i++){
      await this.ReloadPage()
      await this.get_port_measures()
      this.timer = setInterval(this.ReloadPage, 6000 )
      this.timer2 = setInterval(this.get_port_measures, 1000)
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
  margin-left: 20px;
}
.btn_ON{
  display: flex;
  min-width: 44px;
  opacity: 1 !important;
  max-width: 44px;
  margin-left: 10px;
  pointer-events: none;
  margin-top: 0px
}
.btn_ON_OFF{
  display: flex;
  min-width: 44px;
  max-width: 44px;
  margin-left: 15px;
  margin-top: 8px
}

.btn_OFF{
  display: flex;
  min-width: 44px;
  max-width: 44px;
  margin-left: 10px;
  margin-top: 0px;
  pointer-events: none;
  background: #FFFFFF !important;
}
.btn_change_page{
  display: flex;
  margin-left: 45px;

}
.port_state_span{

}
.column_port > .text {
  color: black;
  text-decoration:none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.square_port{
  white-space: nowrap;
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
  width: 180px;
  height: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

</style>
