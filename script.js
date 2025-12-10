// This script is used to integrate a Shelly BLU wireless door sensor
// with a Viewtron IP camera NVR. The script monitors the open / closed state of
// the door sensor, and when the state changes to open, the script sends an
// HTTP Post to the a virtual alarm webhook endpoint on the NVR.
// The script can easily be modified to integrate the Shelly door sensor with any device
// by modifying the XML and webhooke endpoint URL.
// 
// This project requires a Shelly BLU door sensor, Shelly BLU Gateway. 
// https://us.shelly.com/products/shelly-blu-door-window-white
// https://us.shelly.com/products/shelly-blu-gateway
//
// We used a Viewtron IP camera NVR for our integration.
// https://www.viewtron.com/nvr
//
// The script is uploaded to the Shelly BLU Gateway via the mobile app or web browser interface.
// This script was written by Mike Haldas, co-founder at CCTV Camera Pros. It can be used and modified as needed.
// mike@cctvcamerapros.net

//=============== CONFIGURATION VARIABLES ===============
const SENSOR_MAC     = "7g:a6:b5:8s:83:f1";  // Change this to the MAC address of your door sensor
const USERNAME       = "admin"; // NVR username
const PASSWORD       = "temp"; // NVR password
const NVR_IP         = "192.168.0.101"; // NVR local IP address
const NVR_PORT       = "80"; // NVR HTTP port
const NVR_ALARM_PORT = "9"; // if the NVR has 8 physical alarm ports, virtual alarm port 1 will actually be 9

// This is the XML that is sent to Viewtron NVRs. ONLY edit this if you are integrating with a non-Viewtron device
const XML = '<?xml version="1.0" encoding="utf-8" ?>' +
'<config version="2.0.0" xmlns="http://www.Sample.ipc.com/ver10">' +
'  <action>' +
'    <status>true</status>' +
'  </action>' +
'</config>';

let lastState = 0;  // 0=closed, 1=open (NEW: state tracking)
let lastPacketId = -1;  // dedupe

print("DOOR SENSOR SCRIPT STARTED");
BLE.Scanner.Start({active: true, duration_ms: BLE.Scanner.INFINITE_SCAN});

BLE.Scanner.Subscribe(function(event, result) {
  if (event !== BLE.Scanner.SCAN_RESULT) return;
  if (!result.service_data || !result.service_data.fcd2) return;
  if (result.addr !== SENSOR_MAC) return;

  let payload = result.service_data.fcd2;
  if (lastPacketId === payload.at(2)) return;  // skip duplicates
  lastPacketId = payload.at(2);

  // ——— PARSE BTHOME (official door/window format) ———
  let i = 1;  // skip header byte
  let battery = 0, contact = 0;  // full parser

  while (i < payload.length) {
    let obj_id = payload.at(i++);
    if (obj_id === 0x01) { battery = payload.at(i); i++; }  // battery %
    else if (obj_id === 0x2D) { contact = payload.at(i); i++; }  // window state (0=closed, 1=open)
    else { i++; }  // skip other fields (illuminance, etc.)
  }

  // ——— ONLY SEND POST to Viewtron NVR on "OPEN" CHANGE ———
  if (contact === 1 && lastState !== 1) {
    lastState = 1;
    print("Door Sensor Opened!");
    
    // This is the HTTP Post endpoint of the Viewtron NVR. Only modofy this if you are using this script to communicate
    // with a device other than a Viewtron NVR.
    Shelly.call("HTTP.POST", {
      url: "http://" + USERNAME + ":" + PASSWORD + "@" + NVR_IP + ":" + NVR_PORT + "/TriggerVirtualAlarm/" + NVR_ALARM_PORT,
      body: XML
    }, function(res, err) {
      print(err ? "ERROR → " + err : "Sending HTTP Post to NVR. HTTP Status: " + res.code);
    });
  } else if (contact === 0) {
    lastState = 0;
    print("Door Sensor Closed.");
  }
});
