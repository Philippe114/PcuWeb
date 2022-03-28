<template>
  <div>
    <v-container>
      <v-flex xs12 sm3>
        <v-btn @click="ReloadPage()" flat icon dark large color="blue">
          <v-icon>cached</v-icon>
        </v-btn>

      </v-flex>



      <v-layout row warp class="square_port" justify-center justify-space-around >
        <li class="column_port"  style="list-style-type: none" v-for="item in PortList" :key="item.id" >

          <v-btn class="btn_change_page" flat @click.native="onClickPort(item.label,item.Port_state);item.dialogChangePage = true" >{{item.label}}</v-btn>
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
            <v-btn v-if="item.Port_state ==='ON'" color="#7CFC00" class="btn_ON" >{{ item.Port_state }}
            </v-btn>
            <v-btn v-else-if="item.Port_state ==='OFF'" color="#FFFFFF" class="btn_OFF"  >{{ item.Port_state }}
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
                  @click="item.dialogON = false ; item.Port_state = onClickBtn('OFF');Change_port_state1(item.label,item.Port_state);ReloadPage()"
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
                  @click="item.dialogOFF = false ;item.Port_state = onClickBtn('ON'); Change_port_state1(item.label,item.Port_state);ReloadPage()"
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

export default {
  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
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
    token:"",
    Powervalue: {
    },
    Power: {},
    start_date: new Date(),
  }),
  methods: {

    async Change_port_state1(Port_number, Port_state) {
      let port_number = parseInt(Port_number.substr(4, 5))
      await Change_port_state(this.token,port_number, Port_state)

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
    onClickPort(Port_number, Port_state) {
      const port_number = parseInt(Port_number.substr(4,5))
      localStorage.setItem("port_number", port_number)
      localStorage.setItem("port_state", Port_state)
      if (Port_state === "OFF") {
        localStorage.setItem("btn_active", "OFF")
      } else {
        localStorage.setItem("btn_active", "ON")
      }
    }, cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    async ReloadPage() {
      for (let i = 0; i < 8; i++) {
        this.PortList[i].Port_state = await Get_port_state(i)
        console.log(this.PortList[i].Port_state )
        if (this.PortList[i].Port_state === 0) {
          this.PortList[i].Port_state = "OFF"
        } else {
          this.PortList[i].Port_state = "ON"
        }
      }
      this.$forceUpdate()
    },
    async get_port_measures() {
      this.Port_Measures = await Get_port_instant()
      this.PortList[0].PowerAvg = this.Port_Measures.port_0.port_current * this.Port_Measures.port_0.port_voltage
      this.PortList[1].PowerAvg = this.Port_Measures.port_1.port_current * this.Port_Measures.port_1.port_voltage
      this.PortList[2].PowerAvg = this.Port_Measures.port_2.port_current * this.Port_Measures.port_2.port_voltage
      this.PortList[3].PowerAvg = this.Port_Measures.port_3.port_current * this.Port_Measures.port_3.port_voltage
      this.PortList[4].PowerAvg = this.Port_Measures.port_4.port_current * this.Port_Measures.port_4.port_voltage
      this.PortList[5].PowerAvg = this.Port_Measures.port_5.port_current * this.Port_Measures.port_5.port_voltage
      this.PortList[6].PowerAvg = this.Port_Measures.port_6.port_current * this.Port_Measures.port_6.port_voltage
      this.PortList[7].PowerAvg = this.Port_Measures.port_7.port_current * this.Port_Measures.port_7.port_voltage


      //const start_datetime = (start_date.getFullYear() +"-"+ (start_date.getMonth()+1) +"-"+ start_date.getDate()+"T" +
        //(start_date.getHours()-3) + ":" + start_date.getMinutes() + ":00.000Z").toString()
      //const end_datetime = (start_date.getFullYear() +"-"+ (start_date.getMonth()+1) +"-"+ start_date.getDate()+"T"+
        //start_date.getHours() + ":" + start_date.getMinutes() + ":00.000Z").toString()

      for (let i = 0; i < 8; i++) {
        //Ancienne méthode
        //this.Port_Measures = await Get_port_avg(i, start_datetime, end_datetime,1)
        //this.PortList[i].PowerAvg = this.Port_Measures["power"]+ ""
        //this.PortList[i].PowerAvg = this.PortList[i].PowerAvg.slice(0,5)
        //this.PortList[0].PowerAvg = this.Port_Measures.port_0.port_current * this.Port_Measures.port_0.port_voltage
        //console.log( this.PortList[i].PowerAvg)
        this.PortList[i].PowerAvg = this.PortList[i].PowerAvg.toPrecision(4)
      }this.$forceUpdate()
    },
    async get_Token(){
      this.token = localStorage.getItem("token")
      console.log(this.token)
    }
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  async mounted() {
    await this.get_Token()
    this.timer = setInterval(this.ReloadPage, 600)
    await this.get_port_measures()
    this.timer2 = setInterval(this.get_port_measures, 1000)
    await this.ReloadPage()
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
