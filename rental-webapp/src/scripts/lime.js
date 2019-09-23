export function fetchLime() {

  return new Promise((resolve, reject) => {

    navigator.geolocation.getCurrentPosition(position => {

      var lat = position.coords.latitude
      var lng = position.coords.longitude

      var cityID = "COLOGNE";
      var url = 'https://web-production.lime.bike/api/rider/v1/views/map';
      var api = "?ne_lat=52&ne_lng=7.4&sw_lat=50&sw_lng=6.2&user_latitude=" + lat + "&user_longitude=" + lng + "&zoom=160";
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
                'icon': json.data.attributes.icons[0].attributes.url,
                'logo': 'https://lh3.googleusercontent.com/iLn5nb6rai-f0GspwuWhO22yM8ZESKuERCRYD4hzBWoijYhN0VsCa8MImZxMHjgTyVtlUkzFHK0FyaTHnxprZm6c3DJI28MGupulZfZwWrXkgjeA0MndunoTYbDFVHNtB7nQRzdCgIJNN8p8jIiPCbvQQkKHxgWrQXNsOu5tEoOgVOBfV2HXph-cUAI-u5JHnXxn1eDaG2CwwTOgG8GQKGLgfUoKnN0qwA7OPhAvyPdGAOGvfQHIRZGJpiEWg1dgDI9b2TeYKblUrG1ksQBt96dE1BZItXhkbbIwpbisjfb_3Xm_JUyEp6TGu6nBPxYF5M7yhcpfwiKFnQJevHTv_uwL6qdogCuf18qENA8cPGz9e4t_-ECKOl9zzfDUxrN8B9KQv9ef-vxhTNe5V7-wM-V6GQgtsP4w6srPK--wCiTykXfDqGKbjBSTf4Vr54zERxpb8fRYC-De6SAfOc8iKqwhPl1A5R25JtaKqmj9AjQ3i_5TTHpoCy0p3sQvkepOtfpKRINw99j-44OMa4EQTWo3UyB6QHGmnpjV0jFsmveX_mQfXkluofPcLmIxygkmzablhrxUvCxRgc4-EFyuLN6LaO9Jd7VsewwysLJ2ZMzKibgbin6th_EjPsbPQakyIAzkxpy-XCNc98ESIQ_4jwOFbcCTRlH12KS9ZYa7fW3RJTXlH4rVzQ=s452-no',
                'vehicleImg': 'https://lh3.googleusercontent.com/5d2bIdVfIXw__CZCH7-g9vrhZDaRq_XN9cNu3Wc4xhgKXofP2Joxoo3LTaFSnexZ8n05OHEmTa9t5v9P4w=w328-h315-no',
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
