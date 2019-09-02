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
                        'logo' :'https://lh3.googleusercontent.com/g8npIP3QyCPMq4SN3cTXhnlRAg6F75qVFphxrosqmca372eTjFmPavfRCJDF6aMu9SdweC4B4EnK-CzCTYKicy-6Zfpq7ABognRKmC5UBqAOJdOOPzdN3h4iN_gfIB7Yiwm76DUWheMreKsjKOn7a8dWRf778HERlZ6BcDH4Gd2F2E3XJlB9ks2-X9KaB_-i7f77mFITWstUnydCx0awWLkphsSkmOi0IH9-4wwX4UVfTXBr5zMxBHm4vtKppBL6Rk6AeZ7OtJ_GNB4YWxpA2ePBaZP-hzCAm26BUxdDBBt5FAJ0Jf55QuRA8LQQPEgYXWA9_t19U6JarWcdOkywICbdEnLApYmK89GlVDwH6TpaRoGQhvbKow9_01lYQyEIkopkaLLBKA8kkSPdsStuMuYSIc3sPsPumcVIMHSGEX7ALZl1p5_CCZv3yFF6gW-BdXssg-WofEwHWla0aTRynoOmE9a58TpmfJMA19VISun5tFKVvd_C7QwRm6EHGt89g7vRUo8OSEJzBkJw7pvM5yVR8_gx_wueRchfDkCTnl_T2RGk4eAFuA2pBSjOrdlithjBSfWjkeYgY4UopccXI5Fmax-943a61F2FlNI_kYosEWzaoDg8Lkb_bsL9sOiKMAKxiTooV9QezFN4O9APxmocNfaQF5Gb19Xt502uZ9hV1NutvVJUPQ=s100-no', 
                        'vehicleImg' : 'https://lh3.googleusercontent.com/YCKOqHnqQrDq9gydSW2dDHiasP6UcZr00gi8AOEPU6p1KTqGtnKfAlZ0aISSk8YJzYwtwtiQjYHfJqZfRfN4M8zz0EV8dv_TmYkFn0lZ-QNs2tKD54Zt3CDeKGi4w89rmdOWvz24oXNFn3bbFwe2QWzPxBR4qKnXdJZo0xTeA_qD5g4BSZ8u0_8_Ef3TG_suxNkBlPADmvBqh48U1uvkxGO8DyQLiJQH76fRE6B8xOSu3lje23QhgguJqdZxChS0PCd44UPp1deJdbyNDMOyU3hlbp4YKEq-hzU1H7MONys9KG3670n3uJHnH7YH15x4DAqbcQ_dS8jB0SlC8mH_tR6RMmUZlK5JfQzPA1PIhwqkV8nD4okBXnctJwA28FG-KYnhzBvxfi2s5Iq9uPC7WSkSwfetYnj-Up6e27TEBLCDSg19ejzkPA8XIcwxWDIhZrAFlmHgp6ZQGQMxnQ580vzuqPsPskaeV_yMSxRXDC6iGeayKxA6OVg0PisJD5qKbCVr7zs9XpZx9-bg-UcuqUkp027y5oH3AUTrA5EMMWQ1n4XXP_YJ66SzaMqY4nKVXZgE17luFLuQhXpP384qVAa8_Pe5it7OCNZdsIFUJYIyfxQCUBUEjTlZL5X-arqD3TKgF2O8x9ZX1LaCkEHHo5Bebd1WN9IEmPsqVN1cZdnxKUrP9bZzKg=w705-h581-no',
                        'lat' : geo.lat,
                        'lng' : geo.lon
                    });
                })
                resolve(mopedListe);
            });
    })
}






