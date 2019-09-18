export function fetchFordbike() {

    console.log("funktion wird aufgerufen!!!")

    return new Promise((resolve, reject) => {

        var header = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 988f911d787a1258c831869edaff6f57',
            }
        }

        dbBike = "https://api.deutschebahn.com/flinkster-api-ng/v1/areas?lat=50.941278&lon=6.958281&providernetwork=2"

        var list = [];
        console.log("fetchingFordBike");

        fetch(dbBike, header)
            .then(res => res.json())
            .then(data => {

                var gebiet1 = data.items[1].geometry.position.coordinates[0]
                var gebiet2 = data.items[2].geometry.position.coordinates[0]

                gebiet1.forEach(bike => {

                    bikeList.push({
                        'provider': 'Fordbike',
                        'id': false,
                        'battery': false,
                        'batteryLevel': null,
                        'icon': "https://img.icons8.com/dusk/64/000000/vagina.png",
                        'logo': "https://img.icons8.com/dusk/64/000000/vagina.png",
                        'vehicleImg': "https://img.icons8.com/dusk/64/000000/vagina.png",
                        'lat': bike[0],
                        'lng': bike[1],
                        'color' : '#3D8999', 
                        'pricePerUnit' : "1 € / 30 Min.",
                        'website' : "https://www.fordpass-bike.de/de",
                        'deeplink' : 'nextbike://'
                    })

                });

                console.log(list);

                resolve(list);


            }).catch(function() {
                console.log("SCHEISE");
              });

              


    })
}








