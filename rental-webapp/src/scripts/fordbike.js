export function fetchFordbike() {

    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(position => {

            var lat = position.coords.latitude
            var lng = position.coords.longitude


            console.log("fetchingFordBike");

            var header = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer 988f911d787a1258c831869edaff6f57',
                }
            }

            let dbBike = "https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=" + lat + "&lon=" + lng + "&radius=10000&limit=100&providernetwork=2"

            var list = [];

            fetch(dbBike, header)
                .then(res => res.json())
                .then(data => {

                    data.items.forEach(bike => {

                        list.push({
                            'provider': 'Fordbike',
                            'id': false,
                            'battery': false,
                            'batteryLevel': null,
                            'icon': {
                                url: require('../assets/icons/Fordbike.png'),
                                size: new google.maps.Size(100, 150),
                                scaledSize: new google.maps.Size(36, 51),
                                origin: new google.maps.Point(0, 0), // origin
                                anchor: new google.maps.Point(18, 45) // anchor
                            },
                            'logo':
                                require('../assets/images/fordbike-logo.png')
                            ,
                            'vehicleImg':
                                require('../assets/images/fordbike.png')
                            ,
                            'lat': bike.position.coordinates[1],
                            'lng': bike.position.coordinates[0],
                            'color': '#3D8999',
                            'pricePerUnit': "1 € / 30 Min.",
                            'website': "https://www.fordpass-bike.de/de",
                            'deeplink': 'callabike://search'
                        })

                    });


                    console.log(list);
                    console.log(list.length)

                    resolve(list);

                })




        })

    })
}





