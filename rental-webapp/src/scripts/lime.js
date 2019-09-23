export function fetchLime() {

  return new Promise((resolve, reject) => {


    navigator.geolocation.getCurrentPosition(position => {

      var lat = position.coords.latitude
      var lng = position.coords.longitude

      var url = 'https://web-production.lime.bike/api/rider/v1/views/map';
      var api = "?ne_lat="+ lat +"&ne_lng="+ lng +"&sw_lat="+ lat +"&sw_lng="+ lng +"&user_latitude=" + lat + "&user_longitude=" + lng + "&zoom=60";
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/'



      var headers = new Headers({
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3Rva2VuIjoiSk9NV0VQQllMVDNSUCIsImxvZ2luX2NvdW50IjoyfQ.IADxE345FeZV9xpHziwlbubHLgvNW-eJSPDZA3Topuo',
        'Access-Control-Allow-Origin': '*',
        'X-Api-Key': 'bpEUTJEBTf74oGRWxaIcW7aeZMzDDODe1yBoSxi2'
        
      });

      var scooterList = [];
      console.log("recieving Lime");

      fetch(proxyUrl + url + api, { headers, mode: 'cors' })
        .then(res => res.json())
        .then(json => {

          var scooters = json.data.attributes.bikes;
          console.log(json);

          scooters.forEach(scooter => {
            if (scooter.attributes.status = "locked")
              scooterList.push({
                'provider': 'Lime',
                'id': parseInt(scooter.id),
                'battery': true,
                'batteryLevel': scooter.attributes.battery_level,
                'icon' : { 

                url: require('../assets/icons/Lime.png'),
                size: new google.maps.Size(100, 150),
                scaledSize: new google.maps.Size(36, 51),
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(18, 45) // anchor
              },
                'logo': 
                  require('../assets/images/lime-logo.png')
                ,
                'vehicleImg': 
                  require('../assets/images/lime.png')
                ,

                
                'lat': scooter.attributes.latitude,
                'lng': scooter.attributes.longitude,
                'color': '#69D2AA',
                'pricePerUnit': "0.20 € / Min.",
                'website': "https://www.li.me/de/startseite",
                'deeplink': 'https://limebike.app.link'
              });
          });
          resolve(scooterList);
        }).catch(function (err) {
          console.log(err);
        });

      console.log(scooterList);

    })
  })
}
