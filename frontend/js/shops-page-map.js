document.addEventListener('DOMContentLoaded', () => {
    let shopsPageMap = document.querySelector('.shops-page-content__map-content');

    if(shopsPageMap) {
        var map = L.map('map', {
        }).setView([53.8540, 27.4730], 12);

        var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="copyright">Openstreetmap</a>'
        }).addTo(map);

        var orangeIcon = L.icon ({
            iconUrl: '../assets/images/map-marker-icon.png'
        })

        /* var marker1 = L.marker([53.85328, 27.42091], {
            icon: orangeIcon
          }).bindPopup('<p>ООО Новосёлкин<br />Меньковский тракт, 2</p>');

        var marker2 = L.marker([53.88734, 27.43435], {
            icon: orangeIcon
        }).bindPopup('<p>ООО Новосёлкин<br />Сухаревская, 26</p>');

        var marker3 = L.marker([53.90623, 27.47734], {
            icon: orangeIcon
        }).bindPopup('<p>ООО Новосёлкин<br />Притыцкого, 43</p>');

        var marker4 = L.marker([53.86624, 27.67048], {
            icon: orangeIcon
        }).bindPopup('<p>ООО Новосёлкин<br />Варвашени, 6</p>');

        var marker5 = L.marker([53.86624, 27.67048], {
            icon: orangeIcon
        }).bindPopup('<p>ООО Новосёлкин<br />Якуба Коласа, 43 к.1</p>');

        var marker6 = L.marker([53.86325, 27.56622], {
            icon: orangeIcon
        }).bindPopup('<p>ООО Новосёлкин<br />Якуба Коласа, 43 к.1</p>');

        var group = L.layerGroup([marker1, marker2, marker3, marker4, marker5, marker6])
            .addTo(map); */

       /*  From the array of adresses */
        /* var adressPoints = [
            [53.85328, 27.42091, "<p>ООО Новосёлкин<br/>Меньковский тракт, 2</p>"],
            [53.90623, 27.47734, "<p>ООО Новосёлкин<br/>Притыцкого, 43</p>"],
            [53.86624, 27.67048, "<p>ООО Новосёлкин<br/>Варвашени, 6</p>"],
            [53.88734, 27.43435, "<p>ООО Новосёлкин<br/>Сухаревская, 26</p>"],
            [53.86325, 27.56622, "<p>ООО Новосёлкин<br/>Якуба Коласа, 43 к.1</p>"],
        ]
        var markerList = [];

        for (var i = 0; i < adressPoints.length; i++) {
            var a = adressPoints[i];
            var title = a[2];
            var marker = L.marker(L.latLng(a[0], a[1]),{icon: orangeIcon}, { title: title });
            marker.bindPopup(title);
            markerList.push(marker);
        }

        var group = L.layerGroup(markerList)
            .addTo(map);  */





        /* Using geocoding (search by adresses) */
        var adressPoints = [
            ["улица Меньковский тракт, 2, Минск", "<p>ООО Новосёлкин<br/>Меньковский тракт, 2</p>"],
            ["улица Притыцкого, 43, Минск", "<p>ООО Новосёлкин<br/>Притыцкого, 43</p>"],
            ["улица Варвашени, 6, Минск", "<p>ООО Новосёлкин<br/>Варвашени, 6</p>"],
            ["улица Чайлытко, 16, Минск", "<p>ООО Новосёлкин<br/>Сухаревская, 26</p>"],
            ["улица Якуба Коласа, 43 к1, Минск", "<p>ООО Новосёлкин<br/>Якуба Коласа, 43 к.1</p>"],
        ];


        /* var query_addr = "улица Чайлытко, 16, Минск"; */
        // Get the provider, in this case the OpenStreetMap (OSM) provider.
        const provider = new window.GeoSearch.OpenStreetMapProvider()
        // Query for the address

        var markerList = [];
        adressPoints.forEach( adressPoint => {
            var query_promise =  provider.search({ query: adressPoint[0]});
            // Wait until we have an answer on the Promise
            query_promise.then( value => {
            /* for(i=0; i <= 1; i++){ */
                // Success!
                var x_coor = value[0].x;
                var y_coor = value[0].y;
                var label = value[0].label;
                // Create a marker for the found coordinates
                /* var marker = L.marker(L.latLng(a[0], a[1]),{icon: orangeIcon}, { title: title }); */
                var marker = L.marker(L.latLng(y_coor, x_coor), {icon: orangeIcon},{ title: label } ); // CAREFULL!!! The first position corresponds to the lat (y) and the second to the lon (x)
                // Add a popup to said marker with the address found by geosearch (not the one from the user)
                marker.bindPopup("<b>Found location</b><br>"+label).addTo(map);
                markerList.push(marker);
            /* }; */
            }, reason => {
                console.log(reason); // Error!
            } );
        });
    };


    /* How to search by address!!!  https://jsfiddle.net/odvn1eu6/ */
});



