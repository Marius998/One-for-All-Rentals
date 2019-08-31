export function fetchNextbike() {

  return new Promise((resolve, reject) => {

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
              if (place.bike == true)
                bikeList.push({
                  'provider' : 'nextbike',
                  'id' : parseInt(place.bike_numbers[0]),
                  'battery' : false,
                  'batteryLevel' : null,
                  'icon' : 'https://img.icons8.com/ultraviolet/40/000000/bicycle.png',
                  'logo' : 'https://lh3.googleusercontent.com/YmXUsCJPHTC_SBZLVfnlVXNvoq4I-2_x6FN5hPa-l1et1cKW82wzGU7K6L6sAxWrt2J4X97B7Cvk7OKVxSv_-ahAygLqTeqgQqS7rFpAAi50Ab1JFkBcxBoV_Od29Dj9aBhlQQdXuenMYTpvKkbcorZAQeDhbAvU7B5q_21iKfzzaNgenhb-1i9dn3W56EG-r5anawdg4pyzJPHXFmOMZIb0zlxMhSfGxWE2-Ws0VwvNI1so2FJPhgfyQxMFWOeY_zEUc6KrEQkCkxNq-3qDtDNT7YrFaGQH5xCX8t22Z3aUpQWyesUyXJDIH_nbVvX49NGbmJ5OrJAEcDSu5YJb6zanQBdoQUquLNehgmRs7QJnkQAScy_f1mA1VPKSZjoU8YqJRVT6QQ6ynnIwOC8QWRQ1zchGrAvbI1FVpNfnCtaZ8T2Qh9nJoTiO4UAxAhwYAJRTBDJ8fvNPP2MOJJxE_OejHlBVIN0w3kwlpmKrOUFgcvPODUbwLSdx95zuwb9fK9nC60LlMs4Yu-FhQkdNmmi9P816QtM_FI7ZdlAOdCcgrGJzyX1cebXw1icebCL0YpB1gnqO2mqByLLEgUIJ2HCk7K3i2Bo6fE22-nny7byJR3mpBttpWbB7je5VqKxEtRNPDN8b31oPTjALkxMeOXZE6u5YfBM0hWNnZ2aCyTt8cHEXPup2wQ=s100-no',
                  'vehicleImg' : 'https://lh3.googleusercontent.com/Xzh-pVnbKlHY3qs6qlrvRzcvimJyyWkanBPRlZNZ2iE5Kw75vPdeod9sqvGZ09TVNw3v1oGF9L5B8MUQw-GOTnBlPT8K5MPqrjwSOY-Vjv0rSIY4BJQzzw9OJLz1LGzIC03JLEZ_0fsv7LslulVFV9hbW3TWx3KNi8yFwJDhj5X5vAOR_ZUzgelFmXJo9eqrlYMq2dDBXHJ3GkysC9nPpYlp4nspwche_8muNQnmJNJ4mDbp6ZDJ_KjWtQeEdylq-8CvEIBBTq2yt7gLw3HbnnrAaa1n99RgtudoX2FP4ER2oyFJEKuADI_loB39UlXqJZ3aFQpY2TUouBrlZJla2EDs0iGxbNWxc81ylSJrg9IFBtwdbsSS0tELlPrH0DxQZZoj-LVfa_FmbJ1JLlbsrmHtq4CkyBFDOWm-NV13PADyZ2nZd0fxEbKSgBthrqC2KiCFaqK01spVnAO6fgSMNO_TJsFJY5fLZpWIgtxhd6UH9Qtkml-TcuwrYvpGqiu6NXb2Ku9MEAtXoqHRvyiw25IhZ3zEd0iJOC_XAWcgTFfxAPKhBdxLUFXGXZR5UPxjqB5xO0xAeKGg2_IUbH4imLTkyM_sDSggKWlUedQ-qM5y1BJhNxISDnZGVuoiL4SUzHKnp3OePexd6U2suI25Tcp1FQkWUxd-EV3fhAtjJYRrBZUZDKgQ2Q=w180-h116-no',
                  'lat' : place.lat,
                  'lng' : place.lng
                })
            });
          });
        });

        console.log(bikeList);

        resolve(bikeList);
      });


  })
}







