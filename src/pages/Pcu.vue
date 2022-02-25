<template>
  <div>
    <v-container>
      <v-flex xs12 sm3>
        <v-btn flat icon dark large color="blue">
          <v-icon>cached</v-icon>
        </v-btn>
      </v-flex>

      <v-layout row warp class="square_port" justify-center justify-space-around >
        <v-col class="column_port">

          <v-btn class="btn_change_page" flat @click.native="onClickPort(Port0,Port_state[0]);dialogChangePage0 = true" > Port: 0</v-btn>
          <v-dialog
            v-model="dialogChangePage0"
            max-width="290"
          >
          <v-card>
            <v-card-title class="headline">Change page?</v-card-title>

            <v-card-text>
              Do you want to go to the page of port 0?
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                flat="flat"
                @click="dialogChangePage0 = false"
              >
                No
              </v-btn>

              <v-btn
                color="green darken-1"
                flat="flat"
                :to="{ name: 'Port' } "
                @click="dialogChangePage0 = false"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
          </v-dialog>

          <div class="btn_port" >
              <v-btn v-if="Port_state[0]==='ON'" color="#7CFC00" class="btn_toggle"  @click="dialog0 = true">{{ Port_state[0] }}
              </v-btn>
            <v-btn v-else class="btn_toggle" @click="dialog0 = true">{{ Port_state[0] }}
            </v-btn>
          </div>

          <v-dialog
            v-model="dialog0"
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
                  flat
                  @click="dialog0 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialog0 = false ; Port_state[0] = onClickBtn(Port_state[0]); $root.Change_port_state(Port0,Port_state[0])"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>

        <v-col class="column_port">
          <v-btn class="btn_change_page" flat @click.native="onClickPort(Port1,Port_state[1]);dialogChangePage1 = true" > Port: 1</v-btn>
          <v-dialog
            v-model="dialogChangePage1"
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">Change page?</v-card-title>

              <v-card-text>
                Do you want to go to the page of port 1?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialogChangePage1 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  :to="{ name: 'Port' } "
                  @click="dialogChangePage1 = false"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <div class="btn_port">
              <v-btn v-if="Port_state[1]==='ON'" color="#7CFC00" class="btn_toggle"  @click.native="dialog1 = true">{{ Port_state[1] }}
              </v-btn>
              <v-btn v-else class="btn_toggle"  @click.native="dialog1 = true">{{ Port_state[1] }}
              </v-btn>
            </div>
            <v-dialog
              v-model="dialog1"
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
                    flat
                    @click="dialog1 = false"
                  >
                    No
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    flat
                    @click="dialog1 = false ; Port_state[1] = onClickBtn(Port_state[1]); $root.Change_port_state(Port1,Port_state[1])"
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-col>

        <v-col class="column_port">
          <v-btn class="btn_change_page" flat @click.native="onClickPort(Port2,Port_state[2]);dialogChangePage2 = true" > Port: 2</v-btn>
          <v-dialog
            v-model="dialogChangePage2"
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">Change page?</v-card-title>

              <v-card-text>
                Do you want to go to the page of port 2?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialogChangePage2 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  :to="{ name: 'Port' } "
                  @click="dialogChangePage2 = false"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="btn_port">
            <v-btn v-if="Port_state[2]==='ON'" color="#7CFC00" class="btn_toggle"  @click.native="dialog2 = true">{{ Port_state[2] }}
            </v-btn>
            <v-btn v-else class="btn_toggle"  @click.native="dialog2 = true">{{ Port_state[2] }}
            </v-btn>
          </div>
          <v-dialog
            v-model="dialog2"
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
                  flat
                  @click="dialog2 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialog2 = false ; Port_state[2] = onClickBtn(Port_state[2]); $root.Change_port_state(Port2,Port_state[2])"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col class="column_port">
          <v-btn class="btn_change_page" flat @click.native="onClickPort(Port3,Port_state[3]);dialogChangePage3 = true" > Port: 3</v-btn>
          <v-dialog
            v-model="dialogChangePage3"
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">Change page?</v-card-title>

              <v-card-text>
                Do you want to go to the page of port 3?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialogChangePage3 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  :to="{ name: 'Port' } "
                  @click="dialogChangePage3 = false"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="btn_port">
            <v-btn v-if="Port_state[3]==='ON'" color="#7CFC00" class="btn_toggle"  @click.native="dialog3 = true">{{ Port_state[3] }}
            </v-btn>
            <v-btn v-else class="btn_toggle"  @click.native="dialog3 = true">{{ Port_state[3] }}
            </v-btn>
          </div>
          <v-dialog
            v-model="dialog3"
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
                  flat
                  @click="dialog3 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialog3 = false ; Port_state[3] = onClickBtn(Port_state[3]), $root.Change_port_state(Port3,Port_state[3])"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-layout>

      <v-layout row warp class="square_port" justify-center justify-space-around>
        <v-col class="column_port">
          <v-btn class="btn_change_page" flat @click.native="onClickPort(Port4,Port_state[4]);dialogChangePage4 = true" > Port: 4</v-btn>
          <v-dialog
            v-model="dialogChangePage4"
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">Change page?</v-card-title>

              <v-card-text>
                Do you want to go to the page of port 4?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialogChangePage4 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  :to="{ name: 'Port' } "
                  @click="dialogChangePage4 = false"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="btn_port">
            <v-btn v-if="Port_state[4]==='ON'" color="#7CFC00" class="btn_toggle"  @click.native="dialog4 = true">{{ Port_state[4] }}
            </v-btn>
            <v-btn v-else class="btn_toggle"  @click.native="dialog4 = true">{{ Port_state[4] }}
            </v-btn>
          </div>
          <v-dialog
            v-model="dialog4"
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
                  flat
                  @click="dialog4 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialog4 = false ; Port_state[4] = onClickBtn(Port_state[4]), $root.Change_port_state(Port4,Port_state[4])"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col class="column_port">
          <v-btn class="btn_change_page" flat @click.native="onClickPort(Port5,Port_state[5]);dialogChangePage5 = true" > Port: 5</v-btn>
          <v-dialog
            v-model="dialogChangePage5"
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">Change page?</v-card-title>

              <v-card-text>
                Do you want to go to the page of port 5?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialogChangePage5 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  :to="{ name: 'Port' } "
                  @click="dialogChangePage5 = false"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="btn_port">
            <v-btn v-if="Port_state[5]==='ON'" color="#7CFC00" class="btn_toggle"  @click.native="dialog5 = true">{{ Port_state[5] }}
            </v-btn>
            <v-btn v-else class="btn_toggle"  @click.native="dialog5 = true">{{ Port_state[5] }}
            </v-btn>
          </div>
          <v-dialog
            v-model="dialog5"
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
                  flat
                  @click="dialog5 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialog5 = false ; Port_state[5] = onClickBtn(Port_state[5]); $root.Change_port_state(Port5,Port_state[5])"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col class="column_port">
          <v-btn class="btn_change_page" flat @click.native="onClickPort(Port6,Port_state[6]);dialogChangePage6 = true" > Port: 6</v-btn>
          <v-dialog
            v-model="dialogChangePage6"
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">Change page?</v-card-title>

              <v-card-text>
                Do you want to go to the page of port 6?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialogChangePage6 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  :to="{ name: 'Port' } "
                  @click="dialogChangePage6 = false"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="btn_port">
            <v-btn v-if="Port_state[6]==='ON'" color="#7CFC00" class="btn_toggle"  @click.native="dialog6 = true">{{ Port_state[6] }}
            </v-btn>
            <v-btn v-else class="btn_toggle"  @click.native="dialog6 = true">{{ Port_state[6] }}
            </v-btn>
          </div>
          <v-dialog
            v-model="dialog6"
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
                  flat
                  @click="dialog6 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialog6 = false ; Port_state[6] = onClickBtn(Port_state[6]); $root.Change_port_state(Port6,Port_state[6])"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col class="column_port">
          <v-btn class="btn_change_page" flat @click.native="onClickPort(Port7,Port_state[7]);dialogChangePage7 = true" > Port: 7</v-btn>
          <v-dialog
            v-model="dialogChangePage7"
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">Change page?</v-card-title>

              <v-card-text>
                Do you want to go to the page of port 7?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialogChangePage7 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  :to="{ name: 'Port' } "
                  @click="dialogChangePage7 = false"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="btn_port">
            <v-btn v-if="Port_state[7]==='ON'" color="#7CFC00" class="btn_toggle"  @click.native="dialog7 = true">{{ Port_state[7] }}
            </v-btn>
            <v-btn v-else class="btn_toggle"  @click.native="dialog7 = true">{{ Port_state[7] }}
            </v-btn>
          </div>
          <v-dialog
            v-model="dialog7"
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
                  flat
                  @click="dialog7 = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat
                  @click="dialog7 = false ; Port_state[7] = onClickBtn(Port_state[7]); $root.Change_port_state(Port7,Port_state[7])"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
    ],
    dialog0: false,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    dialog5: false,
    dialog6: false,
    dialog7: false,
    dialogChangePage0: false,
    dialogChangePage1: false,
    dialogChangePage2: false,
    dialogChangePage3: false,
    dialogChangePage4: false,
    dialogChangePage5: false,
    dialogChangePage6: false,
    dialogChangePage7: false,
    Port_state : [],
    Port0: "Port 0",
    Port1: "Port 1",
    Port2: "Port 2",
    Port3: "Port 3",
    Port4: "Port 4",
    Port5: "Port 5",
    Port6: "Port 6",
    Port7: "Port 7"
  }),
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
    onClickPort(Port_number, Port_state) {
      localStorage.setItem("port_number", Port_number)
      localStorage.setItem("port_state", Port_state)
      console.log(Port_number)
      if (Port_state === "OFF") {
        localStorage.setItem("btn_active", "OFF")
      } else {
        localStorage.setItem("btn_active", "ON")
      }
    },async Get_port_state(Port_number) {
      localStorage.setItem("port_number", Port_number)
      const req = new Request(
        `http://pcu.local:5000/port_state`,
        {
          method: "POST",
          crossDomain:true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
          }, body: JSON.stringify({
            port_id: Port_number,
          })
        }
      )
      const res = await fetch(req)
      return (await res.json()).port_state
    },
  },
  async mounted() {
    for (let i = 0; i < 8; i++) {
      this.Port_state[i] = await this.Get_port_state(i)
      console.log(this.Port_state[i])
      if (this.Port_state[i] === 0) {
        this.Port_state[i] = "OFF"
      } else {
        this.Port_state[i] = "ON"
      }
    }this.$forceUpdate()
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
  min-width: 44px;
  max-width: 44px;
  margin-left: 53px;
}
.btn_change_page{
  display: flex;
  margin-left: 30px;

}
.column_port > .text {
  color: black;
  text-decoration:none;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.square_port{
  margin-bottom: 10px;
}

.column_port{
  margin: 10px;
  background-color: #D2691E;
  width: 150px;
  height: 100px;
  align-content: center;
  border-radius: 10px;
}

</style>
