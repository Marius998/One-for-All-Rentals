export function fetchLime() {

  return new Promise((resolve, reject) => {
  
    var cityID = "COLOGNE";
    var url = 'https://web-production.lime.bike/api/rider/v1/views/map';
    var api = "?ne_lat=52.6&ne_lng=13.5&sw_lat=52.4&sw_lng=13.3&user_latitude=52.5311&user_longitude=13.3849&zoom=16";
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'


    

    var headers = new Headers({ 
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3Rva2VuIjoiSk9NV0VQQllMVDNSUCIsImxvZ2luX2NvdW50IjoyfQ.IADxE345FeZV9xpHziwlbubHLgvNW-eJSPDZA3Topuo',
      'Access-Control-Allow-Origin': '*',
      'X-Api-Key': 'bpEUTJEBTf74oGRWxaIcW7aeZMzDDODe1yBoSxi2'
    });

    var scooterList = [];
    console.log("recieving Lime");

    fetch(proxyUrl + url + api, {headers,mode: 'cors'})
      .then(res => res.json())
      .then(json => {

        var scooters = json.data.attributes.bikes;
        console.log(json);

        scooters.forEach(scooter => {    
          if(scooter.attributes.status = "locked")     
            scooterList.push({
              'provider' : 'Lime',
              'id' : parseInt(scooter.id),
              'battery' : true,
              'batteryLevel' : scooter.attributes.battery_level,
              'icon' : json.data.attributes.icons[0].attributes.url,
              'logo' : 'https://lh3.googleusercontent.com/FRm5mDsAk822-3Zmi-NmG_shq0jyiaqgh81gNEjsoy7nrC6ZmevioEtWSqN4Ca8Vqnpp8XhOcJmp9mp7Z66AUpLP6lWAr-4m2Si8hQHmmCzTcfGl_be61n5iWdzNjdHjGbgjryrgnyOYwK3IRLhlOmE4wdAKq0bu4gvDMuzcw_QHiZwCEFWHyALS07tUTQQ6oQUzXy3bAFPwjoGPscoDZKqD7ej7KViMJqBy0CqdlkQKZp-5KJtBR_Y8KOXO8I4brj3jbfIBp2PHjnUsdvEeVMMkOpJaP8576Ceahiatr6-jIlvRfRNfrKUuav3WlzlPkMmhk0GcWQFkul0AoatC48sGC6idSmFvtpVnUMUPnj_8xlSQWD3ZVXnGysbjOviqZP3edNc30df7F4guU-mZYEeJW4HTJ7G47S9bASbUN9Qii23ZOEYlvgizrBn7XLuxImX0ozV5hbea7pABAehxdcArixaUqfp0hYQr5D5PI3WOJmzDVuJIc6HJ1EfmqZ4T-0q5W8omQMYgoADlSvp9xMuyA2mAWb1S8V8jAYsay0blPQTNDZ9E_-F9WO6ad0DC7aK7caG5Ue_ilrYpM9n1tAKO6knxarXK07sy8fvn4kfShQrLllEAOObudFJe_rVUBY9LGHDQlD9FoU8a9c_Iuvk9JkZRXMmBxGf7Ae51Ejj6CNYVFEvEeg=s492-no', 
              'vehicleImg' : 'https://lh3.googleusercontent.com/pIqWwk66A0zV6ibbFNCpI4bsrsuPnPYFOo2cQa-FEK4PE0BUF5Q5SNkxjxss5bp0rqdIg7M9Hq3fE3QcQaJoV1GUyezaTQgjlVBDVr80fSoiVjj5OURHVeYwyaBYUvXh_bMk7n7g63532xeLqNKjHX2Yr5K_B2Vu7_ngxfO54fll8kIWVA22RovKAycd7sJcUWklBSJHHJcEsogJqR3Hj35Rs5EKGMwY2gvllAWhsczudvuiRmsTB3KTFeDMcETxx3w9_S6Bb9RnHP-gGX1TFu8fLYPf-299T9_AYZDqd_BetXqnaguK55afE0F3zRj6dezMSFN8I9UAsMctUnOzJ3unmsmzMHQkfSpTJzsT9k1k7itCOJ1gck_5TfCuzxWpaaEXHmGHuAN5Z8-Z9P0l2M04oguodmM-5PNlLKaHfU0KK57m6ASCIc8Mh9fnLDsxXk9QW7KEgevZQnkLKiA0W2z1Grvhjd6C5fiN4J4vluONo3GfxQUg5dsGV5CUVrpmlQgkKGzrF-0IsQWQ7cPxMAb7enkm7sqbYEtG1E0tUDNDXSyvTQlpnzTQKt7YVbsqA-vc8H5tEhuQpEg86DuffeS-VCIykVsQ7XrptoIkrxReNdaTTVNE2N31piIWs8CMCRcVjgPd9l85yQlrBqbhC5B55sU3Nl3cnUPAjOoZ7y7LwQmFC9JhlA=w1280-h1253-no',
              'lat' : scooter.attributes.latttude,
              'lng' : scooter.attributes.longitude,
              'color' : '#69D2AA',
              'pricePerUnit' : "0.20 € / Min. + 1€ Entsperren", 
              'website' :"https://www.li.me/de/startseite",
              'deeplink' : 'https://limebike.app.link'
            });
        });
        resolve(scooterList);
      }).catch(function() {
        console.log("errorTierFetch");
      });

    console.log(scooterList);

  })
}
