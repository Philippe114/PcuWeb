export const Get_token = async function(password,hostname) {
  //let port_number = parseInt(Port_number.substr(4,5))
  const req = new Request(
    `http://${hostname}:5000/login/${password}`,
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
export const Modify_password = async function(password,token,hostname) {
  const req = new Request(
    `http://${hostname}:5000/config/password/${password}`,
    {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    }
  )
  const res = await fetch(req)
  return (await res.json())
}
export const Modify_reference_voltage = async function(reference_voltage,token,hostname) {
  console.log(reference_voltage)
  const req = new Request(
    `http://${hostname}:5000/config/reference_voltage/${reference_voltage}`,
    {
      method: "PUT",
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
  console.log(res)
  return (await res.json())
}

export const Change_location_db = async function(mem_type,token,hostname) {
console.log(mem_type)
  const req = new Request(
  `http://${hostname}:5000/config/memory_type/${mem_type}`,
{
  method: "PUT",
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
  return (await res.json())
}

export const Modify_logging_port = async function(logging_port,token,hostname) {
  console.log(logging_port)
  const req = new Request(
    `http://${hostname}:5000/config/log_port/${logging_port}`,
    {
      method: "PUT",
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
  console.log(res)
  return (await res.json())
}
export const Modify_logging_ip = async function(logging_ip,token,hostname) {
  console.log(logging_ip)
  const req = new Request(
    `http://${hostname}:5000/config/log_ip/${logging_ip}`,
    {
      method: "PUT",
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
  console.log(res)
  return (await res.json())
}
export const Reboot_rpi = async function(token,hostname) {
  const req = new Request(
    `http://${hostname}:5000/config/reboot`,
    {
      method: "PUT",
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
  console.log(res)
  return (await res.json())
}


export const Get_port_max = async function(Port_number,start_datetime,end_datetime,period,hostname) {
  sessionStorage.setItem("port_number", Port_number)
  //let port_number = parseInt(Port_number.substr(4,5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://${hostname}:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
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
  return (await res.json()).max_measure
}

export const Get_port_min = async function(Port_number,start_datetime,end_datetime,period,hostname) {
  sessionStorage.setItem("port_number", Port_number)
  //let port_number = parseInt(Port_number.substr(4,5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://${hostname}:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
    {
      method: "GET",
      crossDomain:true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
      }
    }
  )
  const res = await fetch(req)
  return (await res.json()).min_measure
}

export const Get_port_data = async function (Port_number,start_datetime,end_datetime,period,hostname) {
  sessionStorage.setItem("port_number", Port_number)
  //let port_number = parseInt(Port_number.substr(4,5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://${hostname}:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
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
  return (await res.json()).measures
  }

export const Get_port_data_avgMinMax = async function (Port_number,start_datetime,end_datetime,period,hostname) {
  sessionStorage.setItem("port_number", Port_number)
  //let port_number = parseInt(Port_number.substr(4,5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://${hostname}:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
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
  return (await res.json())
}

export const Get_port_avg = async function (Port_number,start_datetime,end_datetime,period,hostname) {
  sessionStorage.setItem("port_number", Port_number)
 // let port_number = parseInt(Port_number.substr(4, 5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://${hostname}:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
    {
      method: "GET",
      crossDomain: true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    }
  )
  const res = await fetch(req)
  return (await res.json()).avg_measure
}

export const Get_port_change = async function(Port_number,start_datetime,end_datetime,period,hostname) {
  sessionStorage.setItem("port_number", Port_number)
  //let port_number = parseInt(Port_number.substr(4,5))
  let start_timefull = start_datetime.toString()
  let end_timefull = end_datetime.toString()
  const req = new Request(
    `http://${hostname}:5000/record/port/${Port_number}/start_time/${start_timefull}/end_time/${end_timefull}/period/${period}`,
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
  return (await res.json()).port_states
}


export const Get_port_state = async function (Port_number,hostname) {
  let port_number
  if(Port_number.length > 1){
    port_number = parseInt(Port_number.substr(4,5))
  }else
  {
    port_number = Port_number
  }
  const req = new Request(
    `http://${hostname}:5000/port/${port_number}/state`,
    {
      method: "GET",
      crossDomain: true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
  const res = await fetch(req)
  return (await res.json()).port_state
}

export const Change_port_state =  async function(token,Port_number, Port_state,hostname) {
  sessionStorage.setItem("port_number", Port_number)
  sessionStorage.setItem("port_state", Port_state)

  let port_state
 // let port_number = parseInt(Port_number.substr(4,5))
  if(Port_state === "OFF"){
    port_state = 0
  }else{
    port_state = 1
  }
  const req = new Request(
    `http://${hostname}:5000/port/state`,
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

export const Get_port_instant = async function (hostname) {
  const req = new Request(
    `http://${hostname}:5000/record/instant`,
    {
      method: "GET",
      crossDomain: true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
  const res = await fetch(req)
  return (await res.json())
}
export const Get_db_location = async function (hostname) {
  const req = new Request(
    `http://${hostname}:5000/config/memory_type`,
    {
      method: "GET",
      crossDomain: true,
      headers: {
        "Origin": "http://localhost:8080",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
  const res = await fetch(req)
  return (await res.json())
}

