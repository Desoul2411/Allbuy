document.addEventListener('DOMContentLoaded', () => {
    let shopCardMap = document.querySelector('.shop-card-page-map');

    if(shopCardMap) {
        var map = L.map('map', {
        }).setView([53.8540, 27.4730], 12);

        var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="copyright">Openstreetmap</a>'
        }).addTo(map);

        var orangeIcon = L.icon ({
            iconUrl: '../assets/images/map-marker-icon.png'
        })

        var marker1 = L.marker([53.85328, 27.42091], {
            icon: orangeIcon
            
          }).bindPopup('<p>ООО Новосёлкин<br />Меньковский тракт,2</p>').addTo(map).openPopup();
    };
});



