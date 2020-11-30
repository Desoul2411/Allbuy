document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.main_main-page')) {
        /*** Sliders ***/
        var glide = new Glide('#promo-slider', {
            type: 'carousel',
            focusAt: 'center',
            rewind:true,
            peek: 50,
            breakpoints: {
                576: {
                    peek: 25
                }
            }
        
        });
        
        glide.mount()
        
        
        var popularCategoriesSlider = new Glide('#popular-categories-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 6,
            gap: 16,
            breakpoints: {
                1200: {
                    perView: 5,
                },
                992: {
                    perView: 5,
                    peek: 25
                },
                960: {
                    perView: 4,
                    peek: 25
                },
                678: {
                    perView: 3,
                    peek: 25
                },
                576: {
                    perView: 2,
                    gap: 12,
                    peek: 40
                },
        
                425: {
                    focusAt: 'center',
                    peek: 65,
                    perView: 1,
                }
            }
        });
        
        popularCategoriesSlider.mount();
        
        
        var salesSlider = new Glide('#sales-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 4,
            gap: 16,
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
        
        salesSlider.mount();
        
        
        var newsSlider = new Glide('#news-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 4,
            gap: 16,
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
        
        newsSlider.mount();
        
        
        var shopsSlider = new Glide('#shops-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 6,
            gap: 16,
            breakpoints: {
                1200: {
                    perView: 5,
                },
                992: {
                    perView: 5,
                    peek: 25
                },
                960: {
                    perView: 4,
                    peek: 25
                },
                678: {
                    perView: 3,
                    peek: 25
                },
                576: {
                    perView: 2,
                    gap: 12,
                    peek: 40
                },
            
                425: {
                    focusAt: 'center',
                    peek: 65,
                    perView: 1,
                }
            }
        });
            
        shopsSlider.mount();
        
        
        var popularProductsSlider = new Glide('#popular-products-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 4,
            gap: 16,
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
            
        popularProductsSlider.mount();
        
        
        var bestPerformersSlider = new Glide('#best-performers-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 4,
            gap: 16,
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
            
        bestPerformersSlider.mount();
    };  
});