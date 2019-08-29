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
                    mopedListe.push(geo.lat, geo.lon)

                })
                resolve(mopedListe);
            });
    })
}






