document.addEventListener('DOMContentLoaded', () => {
    let productCardMain = document.querySelector('.main--product-card');
    
    if(productCardMain) {
        //baguetteBox gallery
        baguetteBox.run('.main-card-gallery__images-list', {
            noScrollbars: true,
            buttons: true
        });
    };
});