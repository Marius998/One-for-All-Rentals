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
              'icon' : { 
                url: require('../assets/icons/Tier.png'),
                size: new google.maps.Size(100, 150),
                scaledSize: new google.maps.Size(36, 51),
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(18, 45) // anchor
              },
              'logo' : 'https://lh3.googleusercontent.com/FRm5mDsAk822-3Zmi-NmG_shq0jyiaqgh81gNEjsoy7nrC6ZmevioEtWSqN4Ca8Vqnpp8XhOcJmp9mp7Z66AUpLP6lWAr-4m2Si8hQHmmCzTcfGl_be61n5iWdzNjdHjGbgjryrgnyOYwK3IRLhlOmE4wdAKq0bu4gvDMuzcw_QHiZwCEFWHyALS07tUTQQ6oQUzXy3bAFPwjoGPscoDZKqD7ej7KViMJqBy0CqdlkQKZp-5KJtBR_Y8KOXO8I4brj3jbfIBp2PHjnUsdvEeVMMkOpJaP8576Ceahiatr6-jIlvRfRNfrKUuav3WlzlPkMmhk0GcWQFkul0AoatC48sGC6idSmFvtpVnUMUPnj_8xlSQWD3ZVXnGysbjOviqZP3edNc30df7F4guU-mZYEeJW4HTJ7G47S9bASbUN9Qii23ZOEYlvgizrBn7XLuxImX0ozV5hbea7pABAehxdcArixaUqfp0hYQr5D5PI3WOJmzDVuJIc6HJ1EfmqZ4T-0q5W8omQMYgoADlSvp9xMuyA2mAWb1S8V8jAYsay0blPQTNDZ9E_-F9WO6ad0DC7aK7caG5Ue_ilrYpM9n1tAKO6knxarXK07sy8fvn4kfShQrLllEAOObudFJe_rVUBY9LGHDQlD9FoU8a9c_Iuvk9JkZRXMmBxGf7Ae51Ejj6CNYVFEvEeg=s492-no', 
              'vehicleImg' : 'https://lh3.googleusercontent.com/pIqWwk66A0zV6ibbFNCpI4bsrsuPnPYFOo2cQa-FEK4PE0BUF5Q5SNkxjxss5bp0rqdIg7M9Hq3fE3QcQaJoV1GUyezaTQgjlVBDVr80fSoiVjj5OURHVeYwyaBYUvXh_bMk7n7g63532xeLqNKjHX2Yr5K_B2Vu7_ngxfO54fll8kIWVA22RovKAycd7sJcUWklBSJHHJcEsogJqR3Hj35Rs5EKGMwY2gvllAWhsczudvuiRmsTB3KTFeDMcETxx3w9_S6Bb9RnHP-gGX1TFu8fLYPf-299T9_AYZDqd_BetXqnaguK55afE0F3zRj6dezMSFN8I9UAsMctUnOzJ3unmsmzMHQkfSpTJzsT9k1k7itCOJ1gck_5TfCuzxWpaaEXHmGHuAN5Z8-Z9P0l2M04oguodmM-5PNlLKaHfU0KK57m6ASCIc8Mh9fnLDsxXk9QW7KEgevZQnkLKiA0W2z1Grvhjd6C5fiN4J4vluONo3GfxQUg5dsGV5CUVrpmlQgkKGzrF-0IsQWQ7cPxMAb7enkm7sqbYEtG1E0tUDNDXSyvTQlpnzTQKt7YVbsqA-vc8H5tEhuQpEg86DuffeS-VCIykVsQ7XrptoIkrxReNdaTTVNE2N31piIWs8CMCRcVjgPd9l85yQlrBqbhC5B55sU3Nl3cnUPAjOoZ7y7LwQmFC9JhlA=w1280-h1253-no',
              'lat' : scooter.lat,
              'lng' : scooter.lng,
              'color' : '#69D2AA',
              'pricePerUnit' : "0.15 € / Min.", 
              'website' :"https://www.tier.app/de/",
              'deeplink' : 'https://tier.page.link/?link=https://tier.app/invite/03C33CB1C9B2427F80014F891D3B7C4A&apn=com.tier.app&amv=200153&isi=1436140272&ibi=app.tier.sharing&cid=8600704630730626032&_osl=https://tier.page.link/SJuWr&_icp=1'
            });
        });
        resolve(scooterList);
      }).catch(function() {
        console.log("errorTierFetch");
      });

    console.log(scooterList);

  })
}
  