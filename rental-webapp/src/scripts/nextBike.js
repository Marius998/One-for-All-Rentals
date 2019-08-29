export function fetchNextbike () {  

    return new Promise( (resolve,reject) => {

      var cityID = 14;
      var api = "https://api.nextbike.net/maps/nextbike-live.json?city=" + cityID;
  
  
     var bikeList = [];  
     console.log("fethcing");
  
  
       fetch(api)
       .then(res => res.json())
       .then(json => {
         json.countries.forEach(country => {
           country.cities.forEach(city => {
             city.places.forEach(place => {
               if (place.bike == true) bikeList.push([place.lat, place.lng]);
             });
           });
         });    
         
         resolve(bikeList); 
         });
  
         
    })
    }

     




  
