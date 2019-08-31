export function fetchRhingo() {

    return new Promise((resolve, reject) => {

        var api = "https://rheinenergie.frontend.fleetbird.eu//api/prod/v1.06/cars"
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/'

        var mopedListe = [];
        console.log("fetching");

        fetch(proxyUrl + api)
            .then(response => response.json())
            .then(data => {

                data.forEach(geo => {
                    mopedListe.push({
                        'provider' : 'Rhingo',
                        'id' : geo.titel,
                        'battery' : true,
                        'batteryLevel' : geo.fuelLevel,
                        'icon' : 'https://img.icons8.com/officel/46/000000/scooter.png',
                        'lat' : geo.lat,
                        'lng' : geo.lon
                    });
                })
                resolve(mopedListe);
            });
    })
}






