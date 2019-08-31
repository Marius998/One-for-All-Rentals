export function fetchTier() {

  return new Promise((resolve, reject) => {
  
    var cityID = "COLOGNE";
    var api = "https://platform.tier-services.io/vehicle?zoneId=" + cityID;
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    var headers = new Headers({ 
      'X-Api-Key': 'bpEUTJEBTf74oGRWxaIcW7aeZMzDDODe1yBoSxi2'
    });

    var scooterList = [];
    console.log("recievingTier");

    fetch(proxyUrl + api, {headers})
      .then(res => res.json())
      .then(json => {
        json.data.forEach(scooter => {
          if (scooter.isRentable == true)
            scooterList.push({
              'provider' : 'Tier',
              'id' : parseInt(scooter.id),
              'battery' : true,
              'batteryLevel' : scooter.batteryLevel,
              'icon' : 'https://img.icons8.com/doodle/48/000000/kick-scooter.png',
              'lat' : scooter.lat,
              'lng' : scooter.lng
            });
        });
        resolve(scooterList);
      }).catch(function() {
        console.log("errorTierFetch");
      });

    console.log(scooterList);

  })
}
  