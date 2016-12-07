'use strict'
var wia = require('wia')('Your device secret key');
// collection of cities
var cities = [{"city":"Dublin","lat":53.349805,"lng":-6.260310},
             {"city":"London","lat":51.5013673,"lng":-0.1440787},
             {"city":"Paris","lat":48.8922431,"lng":2.2380753},
             {"city":"Toronto","lat":43.6426731,"lng":-79.3928402}];

// Using the MQTT stream
wia.stream.on('connect', function() {
 console.log('Stream connected!');

 // randomly choosing city location to publish
 var random = Math.floor(Math.random() * 4);
 var randomcity = cities[random];

 var diff = 0.00005;

 // setting the interval at which to publish location i.e. every second
 setInterval(function() {
   // function to publish location data
   wia.locations.publish(
       {
         "latitude": randomcity.lat + diff,
         "longitude": randomcity.lng + diff,
         "altitude": 2
       },
       function(err, published) {
           if (err) console.log(err);
           if (published) console.log("Location published.");
       }
   );

   diff += 0.0005;
 }, 3500);
});

wia.stream.connect();
