# Shelly BLU Wireless Door Sensor API Integration Script
This javascript project enabled the integrate of a Shelly BLUE wireless door sensor with Viewtron IP camera NVR. This is done via the custom script feature of Shelly BLU sensors and the HTTP Post / webhook API available on Viewtron NVRs. Please note that the script can easily be modified so that it can be used to integrate any device with the Shelly window / door sensor. The device just must support an HTTP Post / webhook API.

## Project Overview and Setup Video

[![Watch the Video Demo](https://img.youtube.com/vi/X_TlsPZbfl8/maxresdefault.jpg)](https://www.youtube.com/watch?v=X_TlsPZbfl8)

Watch this video to hear an overview about the prpject and to see how to setup the Shelly BLU wireless door sensor and Viewtron IP camera NVR's virtual alarm API.

## How the Wireless Door Alarm Works

![Alt text](https://videos.cctvcamerapros.com/wp-content/files/Wireless-Door-Alarm.jpg "Wireless Door Alarm")

This is how the integration between the Shelly BLU door sensor and Viewtron NVR works.

- The Shelly wireless door sensor communicates with a Shelly BLU wireless Gateway via Bluetooth.
- The Shelly Blu Gateway (pictured in the middle, plugged into a standard power outlet) is connected via WIFI to the same network that the Viewtron NVR is on.
- The NVR is hard wired to the wireless router.
- The custom javascript code from this repository is installed on the Shelly Gateway. This code is triggered when the door sensor is opened.
- The javascript code makes an HTTP Post to trigger a virtual alarm on the NVR.
- The virtual alarm on the NVR can trigger video recording, mobile app push notification, an audio alarm, and many other alarm actions.

## Step by Step Setup Instructions

You can find step-by-step setup instructions with screenshots on this page.

https://videos.cctvcamerapros.com/v/wireless-door-sensor-alarm.html

## Viewtron IP Camera NVRs

You can find all of the Viewtron NVRs that support the virtual alarm API that work with this alarm integration script on this page.

https://www.cctvcamerapros.com/IP-Camera-NVRs-s/1472.htm

## Shelly BLU Wireless Door Sensor

You can find the Shelly BLU wireless door sensor here.

https://us.shelly.com/products/shelly-blu-door-window-white

You can find the Shelly BLU Wireless Gateway here.

https://us.shelly.com/products/shelly-blu-gateway
