document.addEventListener('DOMContentLoaded', () => {
    let shopsPageMap = document.querySelector('.shops-page-content__map-content');

    if(shopsPageMap) {
        

        if(window.innerWidth > 700) {
            var map = L.map('map', {
            }).setView([53.8540, 27.4730], 12);
        } else {
            var map = L.map('map', {
            }).setView([53.91, 27.55], 10.5);
        }

        var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="copyright">Openstreetmap</a>'
        }).addTo(map);

        var orangeIcon = L.icon ({
            iconUrl: './assets/images/map-marker-icon.png'
        });
        
        var adressPoints = [
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
            .addTo(map); 
    };
});



