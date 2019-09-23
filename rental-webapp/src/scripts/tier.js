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

    fetch(proxyUrl + api, { headers })
      .then(res => res.json())
      .then(json => {
        json.data.forEach(scooter => {
          if (scooter.isRentable == true)
            scooterList.push({
              'provider': 'Tier',
              'id': parseInt(scooter.id),
              'battery': true,
              'batteryLevel': scooter.batteryLevel,
              'icon': {
                url: require('../assets/icons/Tier.png'),
                size: new google.maps.Size(100, 150),
                scaledSize: new google.maps.Size(36, 51),
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(18, 45) // anchor
              },
              'logo':
                require('../assets/images/tier-logo.png')
              ,
              'vehicleImg':
                require('../assets/images/tier.png')
              ,
              'lat': scooter.lat,
              'lng': scooter.lng,
              'color': '#69D2AA',
              'pricePerUnit': "0.15 € / Min.",
              'website': "https://www.tier.app/de/",
              'deeplink': 'https://tier.page.link/?link=https://tier.app/invite/03C33CB1C9B2427F80014F891D3B7C4A&apn=com.tier.app&amv=200153&isi=1436140272&ibi=app.tier.sharing&cid=8600704630730626032&_osl=https://tier.page.link/SJuWr&_icp=1'
            });
        });
        resolve(scooterList);
      }).catch(function () {
        console.log("errorTierFetch");
      });

    console.log(scooterList);

  })
}
