export function fetchFordbike() {

    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(position => {

            var lat = position.coords.latitude
            var lng = position.coords.longitude


            console.log("fetchingFordBike");

            var header = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer 988f911d787a1258c831869edaff6f57',
                }
            }

            let dbBike = "https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=" + lat + "&lon=" + lng + "&radius=10000&limit=100&providernetwork=2"

            var list = [];

            fetch(dbBike, header)
                .then(res => res.json())
                .then(data => {

                    data.items.forEach(bike => {

                        list.push({
                            'provider': 'Fordbike',
                            'id': false,
                            'battery': false,
                            'batteryLevel': null,
                            'icon': { 
                                url: require('../assets/icons/Fordbike.png'),
                                size: new google.maps.Size(100, 150),
                                scaledSize: new google.maps.Size(36, 51),
                                origin: new google.maps.Point(0, 0), // origin
                                anchor: new google.maps.Point(18, 45) // anchor
                            },
                            'logo': "https://lh3.googleusercontent.com/qFEZN-tkIl3LREYN2DgDcdHDBhUBjcKXpexBsQUG6M695BWpjsysQM_icPCBRdMZMJ81XdM1tMVOpHWs8kUkIPlezpGIVzrPgxk-IWv8lRG68064ZEoO3OpYSM4Vd4Iuv2T_vuGbOurkg3q2g1wjSfs_BfG-wdAo4Q8_9mdsowmZBcMFlF-x5nx8_nJzXsO8nH1eucgGuKygpYUSZ1V05F-DaqKA9G2tRt2dQkU5U6y0A4KcxPUdzoFqxTEJCJjnazUgYdBJcSAuJmLDneuVeIn3iEfzm2iILQxWZ_16BOfELn6QtfqeoVdGSQRnIGy2m79S2dZdUwvh7vnCTqfX1oHty_rUOg08ZudR-yeQR-ibxYP8qtdAascw_mm4u2MRqahLSqofMRW4uQcnRTT_w-eQZkHSQlZm3sYtiPwvrAm0LaJQg2B9LFyo48g169UJ_ylNyVrxHT_Ym38R_ZPLVqkLY05P4KLjQY9qByVvE0Nkj8ltBV23eWZlEDKZSxHJg_7DjUo7mI5PEfBkmPWrgemF_m-0lQzu081JnDrjnbBxaI_WsWNqiBO5JEzFou_aHLj6jC4et65KPhxZCKIDfUz7iFORE6mJfYSThvJcaxBtBtW1HyH1PFRxZhgqdsetFlpv_qxBGPJLpbHSXtz8Lh-_OL-6Dyx6QhHUQgFC_AlHpxcSgGuqnQ=w510-h507-no",
                            'vehicleImg': "https://lh3.googleusercontent.com/-2IDvBYdlMjjFKKdXI-tiNbUA_tUmtjD0Wj0P1CLk1cKQCil9ZnlQjm8UI-rldElzcQEM-WJwo8oq7bRHyUn0l2NYG4Q6reNMUD6Y8FoTlxkrOkSXVNY2UkuvJ8Dr4xTbuv11WrJA4N3hv49j4yCUh1OEfPR8MRKrKeNDvekOwUMUwMGGc766uFdsRA4UDImKPKV1ObcXHwYmLzuPDiZ5GU6f70VO0HP8793u17gVhfyUS2PttV4ipt-oFc0f0u0uhyCt0XwwvQ6mYGi9K8T9-z-1SpvBMEHvAxeDFBlTQjoWJqGVK5OPGs0l7tn3U3moIGwRoHObr52SFHJ_8IS8IV_8Uc7Krdz9b93cJmUjqNZFZXvRaW_i0lR4MTiDY9bgXmNNa9fYnSVBtYWor8Q7Bld5DKuwkY55tYioilcNK8_PjOrHAcRDqxY3912EkOlGGH_XVT3TZD8N3ptzK2UpuUHhviZ5oFZFyxbPJwWUCgLwia5ZpDCRyP9C_CNepWKIO3awoly1x49UCvQlESSE1uq-6mQ9iCR8kzIuSbMbx0xCqoT3-Gpf4Va2fj5b0mLHtY83fq3zHBcKNlbAnTzQzKmYMPRNtzY9kFasZq5nUUyo478dEpt8xVTUO3TbofBsX_jNkoX5bXAa_RLkbpL0msT0cM-LRQLLFNREVFlG2F5taMC_I7Hnw=w1092-h880-no",
                            'lat': bike.position.coordinates[1],
                            'lng': bike.position.coordinates[0],
                            'color': '#3D8999',
                            'pricePerUnit': "1 € / 30 Min.",
                            'website': "https://www.fordpass-bike.de/de",
                            'deeplink': 'callabike://search'
                        })

                    });


                    console.log(list);
                    console.log(list.length)

                    resolve(list);

                })




        })

    })
}





