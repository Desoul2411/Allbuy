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
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 4.6,
            gap: 16,
            keyboard: false,
            breakpoints: {
                1100: {
                    perView: 3,
                }, 
                992: {
                    perView: 3,
                    peek: 25
                }, 
                767: {
                    perView: 2,
                    peek: 25
                },
                500: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 50
                },
                425: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 25
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
                    perView: 3,
                }, 
                992: {
                    perView: 3,
                    peek: 25
                }, 
                767: {
                    perView: 2,
                    peek: 25
                },
                500: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 50
                },
                425: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 25
                },
            }
        });
        
        shopCardCategoryCarousel.mount();

        //baguetteBox gallery
        baguetteBox.run('.shop-card__slides', {
            noScrollbars: true
        });

        baguetteBox.run('.shop-card-gallery__carousel-slides', {
            noScrollbars: true
        });
    };
});



