export function fetchNextbike() {

  return new Promise((resolve, reject) => {

    var cityID = 14;
    var api = "https://api.nextbike.net/maps/nextbike-live.json?city=" + cityID;


    var bikeList = [];
    console.log("fethcing");



    fetch(api)
      .then(res => res.json())
      .then(json => {
        json.countries.forEach(country => {
          country.cities.forEach(city => {
            city.places.forEach(place => {
              if (place.bike == true)
                bikeList.push({
                  'provider': 'Nextbike',
                  'id': parseInt(place.bike_numbers[0]),
                  'battery': false,
                  'batteryLevel': null,
                  'icon': {
                    url: require('../assets/icons/NextBike.png'),
                    size: new google.maps.Size(100, 150),
                    scaledSize: new google.maps.Size(36, 51),
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(18, 45) // anchor
                  },
                  'logo':
                    require('../assets/images/nextbike-logo.png')
                  ,
                  'vehicleImg':
                    require('../assets/images/nextbike.png')
                  ,
                  'lat': place.lat,
                  'lng': place.lng,
                  'color': '#194A97',
                  'pricePerUnit': "1 € / 30 Min.",
                  'website': "https://www.kvb-rad.de/de/koeln/",
                  'deeplink': 'nextbike://'
                })
            });
          });
        });

        console.log(bikeList);

        resolve(bikeList);
      });


  })
}







