export function fetchRhingo() {
  return new Promise((resolve, reject) => {
    const api =
      "https://rheinenergie.frontend.fleetbird.eu//api/prod/v1.06/cars";

    var proxyUrl = "https://cors-anywhere.herokuapp.com/";

    var mopedListe = [];

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((geo) => {
          mopedListe.push({
            provider: "Rhingo",
            id: geo.titel,
            battery: true,
            batteryLevel: geo.fuelLevel,
            icon: {
              url: require("../assets/icons/Rhingo.png"),
              size: new google.maps.Size(100, 150),
              scaledSize: new google.maps.Size(36, 51),
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(18, 45), // anchor
            },
            logo: require("../assets/images/rhingo-logo.png"),
            vehicleImg: require("../assets/images/rhingo.png"),
            lat: geo.lat,
            lng: geo.lon,
            color: "#E30614",
            pricePerUnit: "0.23 € / Min.",
            website: "https://www.rhingo.de",
            deeplink:
              "https://play.google.com/store/apps/details?id=com.rhingo.app",
          });
        });
        resolve(mopedListe);
      });
  });
}
