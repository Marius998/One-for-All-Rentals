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
                  'provider' : 'Nextbike',
                  'id' : parseInt(place.bike_numbers[0]),
                  'battery' : false,
                  'batteryLevel' : null,
                  'icon' : 'https://img.icons8.com/ultraviolet/40/000000/bicycle.png',
                  'logo' : 'https://lh3.googleusercontent.com/YmXUsCJPHTC_SBZLVfnlVXNvoq4I-2_x6FN5hPa-l1et1cKW82wzGU7K6L6sAxWrt2J4X97B7Cvk7OKVxSv_-ahAygLqTeqgQqS7rFpAAi50Ab1JFkBcxBoV_Od29Dj9aBhlQQdXuenMYTpvKkbcorZAQeDhbAvU7B5q_21iKfzzaNgenhb-1i9dn3W56EG-r5anawdg4pyzJPHXFmOMZIb0zlxMhSfGxWE2-Ws0VwvNI1so2FJPhgfyQxMFWOeY_zEUc6KrEQkCkxNq-3qDtDNT7YrFaGQH5xCX8t22Z3aUpQWyesUyXJDIH_nbVvX49NGbmJ5OrJAEcDSu5YJb6zanQBdoQUquLNehgmRs7QJnkQAScy_f1mA1VPKSZjoU8YqJRVT6QQ6ynnIwOC8QWRQ1zchGrAvbI1FVpNfnCtaZ8T2Qh9nJoTiO4UAxAhwYAJRTBDJ8fvNPP2MOJJxE_OejHlBVIN0w3kwlpmKrOUFgcvPODUbwLSdx95zuwb9fK9nC60LlMs4Yu-FhQkdNmmi9P816QtM_FI7ZdlAOdCcgrGJzyX1cebXw1icebCL0YpB1gnqO2mqByLLEgUIJ2HCk7K3i2Bo6fE22-nny7byJR3mpBttpWbB7je5VqKxEtRNPDN8b31oPTjALkxMeOXZE6u5YfBM0hWNnZ2aCyTt8cHEXPup2wQ=s100-no',
                  'vehicleImg' : 'https://lh3.googleusercontent.com/s2kHd4YvwnnIG-scJcp8gmVJzRmMRB_bSkAiUfAlphtSJVnx2TdJRZoyLMq3QS7r7M4vGjn1kDETXFdio4IF05Di8bngwjVf7Ss_JF1O-d7FdScQd8w2fosyoIIpDGmvrFROVxdBSte0Ai_UztTIYhJx7dPcWOW-ZcUhm2GkmJ60Up237ngjmHxAVErM0gHTVjsvtdumFgJeBy1BYJnqTm96q0m9xGSCZ2NM1zQ5KaY9eMBWif6WlnpNpIhkLZxoyZD0uJ-ZoaKcIn3xhKg9VKALiRZ5p6ohbf5XUQyOhOYnY0th7mztJwclEMpgHOvrK8NstZIukDlDlsRyK_XP9Tu8QP_OzYclHSQywWqI1eaZhzvHWlHrxrucxoufWA5YwxMUoReHPs0npn_BYS8M3GLx3HVekqPS2beii16afz6-u7VnN87VRSatchXU7rRxmvMl8Xa7zbagO0lZZR20Xk6tKJestMt8DLySAvB-dVAxvjZ0JDw9BdzGQZckN_1fEscCLly2KQN4rrvVZe8hrdtr07mJZ4WTZUIrXa_1TI7H4EUimRVaFKWUFM5IBzM8rAtAdJoXZw-Nc0bhpQKtG5QbiWGWwFqorE0uEU1s-XqCqINpuIep3kscZ3RnFf1IoyfFxVuNOWiqtr3JfDYuVJjrgLkN9U5Fp138dSdF_73s6uH-5RcbiA=w1190-h770-no',
                  'lat' : place.lat,
                  'lng' : place.lng, 
                  'color' : '#194A97', 
                  'pricePerUnit' : "1 € / 30 Min.",
                  'website' : "https://www.kvb-rad.de/de/koeln/",
                  'deeplink' : 'nextbike://'
                })
            });
          });
        });

        console.log(bikeList);

        resolve(bikeList);
      });


  })
}







