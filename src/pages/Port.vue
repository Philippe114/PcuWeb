<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
  <h1>
   {{port_number}}
  </h1>

      <div class="btn_port">
        <v-btn v-if="btn_active ==='ON' || Port_state ==='ON'" color="#7CFC00" class="btn_toggle"  @click.native="dialog = true" >{{ Port_state }}
        </v-btn>
        <v-btn v-else-if="btn_active ==='OFF' || Port_state ==='OFF'" color="#FFFFFF" class="btn_toggle"  @click.native="dialog = true">{{ Port_state }}
        </v-btn>
      </div>
      <v-dialog
        v-model="dialog"
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
              @click="dialog = false"
            >
              No
            </v-btn>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialog = false ; Port_state = onClickBtn(Port_state);$root.Change_port_state(port_number,Port_state)"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row wrap>
      <v-flex d-flex lg4 sm6 xs12>
        <line-chart :data="Powervalue" :colors="['#8b47d8']" xtitle="Time" ytitle="Power [W]" :dataset="{borderWidth: 3}" title="Port Power"></line-chart>
      </v-flex>

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
    <v-btn @click="get_port_measures(port_number,start_date,end_date)">Get info</v-btn>

    </v-layout>
    <span>Power avg: {{Poweravg}} W</span>
    <div><span >Power min: {{Powermin}} W</span>
    </div>
    <div><span>Power max: {{Powermax}} W</span>
    </div>

  </v-container>

</template>

<script>
export default {

  name: "Port",
  methods: {
    onClickBtn(label) {
      if (label === "OFF") {
        label = "ON"
        return label
      } else {
        label = "OFF"
        return label
      }
    },
    async get_port_measures(port_number,start_date,end_date){
      this.Powervalue = {}
      this.Port_Measures = await this.Get_port_avg(port_number,start_date,end_date)
      this.Poweravg = this.Port_Measures["power"]
      this.Port_Measures = await this.Get_port_min(port_number,start_date,end_date)
      this.Powermin = this.Port_Measures["power"]
      this.Port_Measures = await this.Get_port_max(port_number,start_date,end_date)
      this.Powermax = this.Port_Measures["power"]

      this.Measures = await this.Get_port_data(port_number,start_date,end_date)
      this.Date_data = Object.keys(this.Measures)
      const Date_data_array =  this.Date_data
      for (let i = 0; i < Object.keys(this.Measures).length; i++) {
        this.Power = this.Measures[this.Date_data[i]]
        this.Powervalue[Date_data_array[i]] = (this.Power["power"])
      }this.$forceUpdate()


    },
    async Get_port_state(Port_number) {
      localStorage.setItem("port_number", Port_number)
      let port_number = parseInt(Port_number.substr(4,5))
      const req = new Request(
        `http://pcu.local:5000/port_state`,
        {
          method: "POST",
          crossDomain:true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
          }, body: JSON.stringify({
            port_id: port_number,
          })
        }
      )
      const res = await fetch(req)
      return (await res.json()).port_state
    },
    async Get_port_data(Port_number,start_time,end_time) {
      localStorage.setItem("port_number", Port_number)
      let port_number = parseInt(Port_number.substr(4,5))
      var period = 1
      let start_timefull = start_time.toString()+"T10:00:00.000Z"
      let start_timetest = "2022-02-14T10:00:00.000Z"
      let end_timefull = end_time.toString()+"T12:00:00.000Z"
      const req = new Request(
        `http://pcu.local:5000/port_measures`,
        {
          method: "POST",
          crossDomain:true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
          }, body: JSON.stringify({
            port_id: port_number,
            start_time: start_timefull,
            end_time: end_timefull,
            period: period,
          })
        }
      )
      const res = await fetch(req)
      return (await res.json()).measures

    },async Get_port_avg(Port_number,start_time,end_time) {
      localStorage.setItem("port_number", Port_number)
      let port_number = parseInt(Port_number.substr(4,5))
      var period = 1
      let start_timefull = start_time.toString()+"T10:00:00.000Z"
      let start_timetest = "2022-02-14T10:00:00.000Z"
      let end_timefull = end_time.toString()+"T12:00:00.000Z"
      const req = new Request(
        `http://pcu.local:5000/port_measures`,
        {
          method: "POST",
          crossDomain:true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
          }, body: JSON.stringify({
            port_id: port_number,
            start_time: start_timefull,
            end_time: end_timefull,
            period: period,
          })
        }
      )
      const res = await fetch(req)
      return (await res.json()).avg_measure
    },
    async Get_port_min(Port_number,start_time,end_time) {
      localStorage.setItem("port_number", Port_number)
      let port_number = parseInt(Port_number.substr(4,5))
      var period = 1
      let start_timefull = start_time.toString()+"T10:00:00.000Z"
      let start_timetest = "2022-02-14T10:00:00.000Z"
      let end_timefull = end_time.toString()+"T12:00:00.000Z"
      const req = new Request(
        `http://pcu.local:5000/port_measures`,
        {
          method: "POST",
          crossDomain:true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
          }, body: JSON.stringify({
            port_id: port_number,
            start_time: start_timefull,
            end_time: end_timefull,
            period: period,
          })
        }
      )
      const res = await fetch(req)
      return (await res.json()).min_measure
    },
    async Get_port_max(Port_number,start_time,end_time) {
      localStorage.setItem("port_number", Port_number)
      let port_number = parseInt(Port_number.substr(4,5))
      var period = 1
      let start_timefull = start_time.toString()+"T10:00:00.000Z"
      let start_timetest = "2022-02-14T10:00:00.000Z"
      let end_timefull = end_time.toString()+"T12:00:00.000Z"
      const req = new Request(
        `http://pcu.local:5000/port_measures`,
        {
          method: "POST",
          crossDomain:true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
          }, body: JSON.stringify({
            port_id: port_number,
            start_time: start_timefull,
            end_time: end_timefull,
            period: period,
          })
        }
      )
      const res = await fetch(req)
      return (await res.json()).max_measure
    }

  },
  async mounted(){
    this.Port_state = await this.Get_port_state(this.port_number)
    if(this.Port_state === 0){
      this.Port_state = "OFF"
    }else{
      this.Port_state = "ON"
    }
  },

  data() {
    return {
      port_number : localStorage.getItem("port_number"),
      btn_active : localStorage.getItem("btn_active"),
      Port_state:[],
      toggle_exclusive: 0,
      dialog : false,
      start_date: new Date().toISOString().substr(0, 10),
      end_date: new Date().toISOString().substr(0, 10),
      start_menu: false,
      end_menu: false,
      Measures:{},
      Port_Measures:{},
      Date_data:{},
      Powermin: "",
      Powermax: "",
      Poweravg: "",
      Powervalue: {"2022-02-14T16:54:09.457811Z": 15.5,
    "2022-02-14T16:54:10.544732Z": 12.8,
    "2022-02-14T16:54:11.598391Z": 16.5,
    "2022-02-14T16:54:12.637982Z": 12.0,
    "2022-02-14T16:54:13.785944Z": 14.8,
    "2022-02-14T16:54:14.834159Z": 14.3,
    "2022-02-14T16:54:15.885920Z": 19.6,
    "2022-02-14T16:54:16.937721Z": 11.3,
    "2022-02-14T16:54:17.994007Z": 13.8,
    "2022-02-14T16:54:19.038807Z": 20.5,
    "2022-02-14T16:54:20.086141Z": 12.1},
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
.btn_toggle{
  display: flex;
  min-width: 44px;
  max-width: 44px;
  margin-left: 25px;
  margin-top: 8px

}
</style>
