export const Get_token = async function(password) {
  //let port_number = parseInt(Port_number.substr(4,5))
  const req = new Request(
    `http://pcu.local:5000/login/${password}`,
    {
      method: "GET",
      crossDomain:true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
      },
    }
  )
  const res = await fetch(req)
  if (res.status === 200) {
    return (await res.json()).token
  } else {
    return res;
  }
}

export const Get_port_max = async function(token,Port_number,start_datetime,end_datetime,period) {
  localStorage.setItem("port_number", Port_number)
  //let port_number = parseInt(Port_number.substr(4,5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://pcu.local:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
    {
      method: "GET",
      crossDomain:true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
        Authorization:token,
      },
    }
  )
  const res = await fetch(req)
  return (await res.json()).max_measure
}

export const Get_port_min = async function(token,Port_number,start_datetime,end_datetime,period) {
  localStorage.setItem("port_number", Port_number)
  //let port_number = parseInt(Port_number.substr(4,5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://pcu.local:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
    {
      method: "GET",
      crossDomain:true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
        Authorization :token,
      }
    }
  )
  const res = await fetch(req)
  return (await res.json()).min_measure
}

export const Get_port_data = async function (token,Port_number,start_datetime,end_datetime,period) {
  localStorage.setItem("port_number", Port_number)
  //let port_number = parseInt(Port_number.substr(4,5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://pcu.local:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
    {
      method: "GET",
      crossDomain:true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
        Authorization :token,
      },
    }
  )
  const res = await fetch(req)
  return (await res.json()).measures
  }

export const Get_port_avg = async function (token,Port_number,start_datetime,end_datetime,period) {
  localStorage.setItem("port_number", Port_number)
 // let port_number = parseInt(Port_number.substr(4, 5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://pcu.local:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
    {
      method: "GET",
      crossDomain: true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization :token,
      }
    }
  )
  const res = await fetch(req)
  return (await res.json()).avg_measure
}

export const Get_port_change = async function(token,Port_number,start_datetime,end_datetime,period) {
  localStorage.setItem("port_number", Port_number)
  //let port_number = parseInt(Port_number.substr(4,5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://pcu.local:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
    {
      method: "GET",
      crossDomain:true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
        Authorization :token,
      },
    }
  )
  const res = await fetch(req)
  return (await res.json()).port_states
}


export const Get_port_state = async function (token,Port_number) {
  localStorage.setItem("port_number", Port_number)
  let port_number
  if(Port_number.length > 1){
    port_number = parseInt(Port_number.substr(4,5))
  }else
  {
    port_number = Port_number
  }
  const req = new Request(
    `http://pcu.local:5000/port/${port_number}/state`,
    {
      method: "GET",
      crossDomain: true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization :token,
      },
    }
  )
  const res = await fetch(req)
  return (await res.json()).port_state
}

export const Change_port_state =  async function(token,Port_number, Port_state) {
  localStorage.setItem("port_number", Port_number)
  localStorage.setItem("port_state", Port_state)

  let port_state
 // let port_number = parseInt(Port_number.substr(4,5))
  if(Port_state === "OFF"){
    port_state = 0
  }else{
    port_state = 1
  }
  const req = new Request(
    `http://pcu.local:5000/port/state`,
    {
      method: "PUT",
      crossDomain:true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
        Authorization :token,
      }, body: JSON.stringify({
        port_id: Port_number,
        port_state: port_state,
      })
    }
  )
  const res = await fetch(req)
  await res.json()
}

