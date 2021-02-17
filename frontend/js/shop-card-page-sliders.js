document.addEventListener('DOMContentLoaded', () => {
    let shopCardPageMain = document.querySelector('.main--shop-card');

    if(shopCardPageMain) {
        var shopCardSlider = new Glide('#shop-card-slider', {
            type: 'carousel',
            focusAt: 'center',
            rewind: true,
            keyboard: false
        });
        
        shopCardSlider.mount()


        var shopCardGalleryCarousel = new Glide('#shop-card-gallery-carousel', {
            rewind:true,
            startAt: 0,
            perView: 4.6,
            gap: 16,
            keyboard: false,
            breakpoints: {
                1100: {
                    perView: 3.5,
                }, 
                992: {
                    perView: 3.2,
                }, 
                860: {
                    perView: 2.5,
                },
                620: {
                    perView: 2.2,
                },

                500: {
                    perView: 1.5,
                },
                425: {
                    perView: 1.2,
                },
            }
        });
        
        shopCardGalleryCarousel.mount();
        

        var shopCardCategoryCarousel = new Glide('#shop-card-categories-carousel', {
        /*  type: 'carousel', */
            rewind:true,
            startAt: 0,
            perView: 4.6,
            gap: 16,
            keyboard: false,
            breakpoints: {
                1100: {
                    perView: 3.5,
                }, 
                992: {
                    perView: 3.2,
                }, 
                860: {
                    perView: 2.5,
                },
                620: {
                    perView: 2.2,
                },

                500: {
                    perView: 1.5,
                },
                425: {
                    perView: 1.2,
                },
            }
        });
        
        shopCardCategoryCarousel.mount();

        //baguetteBox gallery
        baguetteBox.run('.shop-card__slides', {
            noScrollbars: true,
            buttons: true
        });

        baguetteBox.run('.shop-card-gallery__carousel-slides', {
            noScrollbars: true,
            buttons: true
        });
    };
});



