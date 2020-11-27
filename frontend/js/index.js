
if (document.querySelector('.main_main-page')) {

let body = document.querySelector('body');
let leftMainMenuArrow = document.querySelector('.main-menu__arrow-left');
let righttMainMenuArrow = document.querySelector('.main-menu__arrow-right');
let mainMenuContainer = document.querySelector('.main-menu');
let mainMenuList = document.querySelector('.main-menu__list');
let mainMenuLinks = document.querySelectorAll('.main-menu__link');
let burgerOpenMenuButton = document.querySelector('.header__open-menu-burger');

let headBottomContent = document.querySelector('.header__bottom-content');
let submenu = document.querySelector('.main-submenu__sections');
let mainMenuItems = document.querySelectorAll('.main-menu__item');
let submenuSections = document.querySelectorAll('.main-submenu__section');
let submenuCloseButton = document.querySelector('.main-submenu__close-button');

let searchMobileIcon = document.querySelector('.header__search-mobile-icon');
let clearSearchResultsButton = document.querySelector('.search-modal__clear-button');
let searchResaultsContainer = document.querySelector('.search-modal__search-results-groups');
let searchModalCloseButton = document.querySelector('.search-modal__back-arrow-button');
let searchModal = document.querySelector('.search-modal');
let searchModalOverlay = document.querySelector('.search-modal-overlay');
let headerSearchField = document.querySelector('.header__search-input');
let modalSearchField = document.querySelector('.search-modal__search-input');

const showHideMobileMenu = () => {
    if (mainMenuContainer.classList.contains('opened')) {
        mainMenuContainer.classList.remove('opened');
        burgerOpenMenuButton.classList.remove('active');
        body.style.overflow = 'auto';
        closeSubmenu();
    } else {
        mainMenuContainer.classList.add('opened');
        burgerOpenMenuButton.classList.add('active');
        body.style.overflow = 'hidden';
    }
};

const showHideMenuItems = (menuColumnClass,menuListClass,menuDotsClass, itemsAmountToShow) => {
    let menuColumns = document.querySelectorAll(menuColumnClass);

    menuColumns.forEach((item) => {
        let menuItemsAmount =  item.querySelectorAll(menuListClass).length;

        if (menuItemsAmount > itemsAmountToShow){
            let currentListItems =  item.querySelectorAll(menuListClass);
            let showMoreItemsDots = item.querySelector(menuDotsClass);
    
            showMoreItemsDots.style.display = 'block';
    
            currentListItems.forEach((listItem,index) => {
                index > itemsAmountToShow - 1 && listItem.classList.add('hidden');
            });
    
           showMoreItemsDots.addEventListener('click', () => {
                currentListItems.forEach((listItem,index) => {
                    if (index > itemsAmountToShow - 1) {
                        listItem.classList.remove('hidden');
                        showMoreItemsDots.style.display = 'none';
                    };
                });
           });
        } else {
            item.querySelector(menuDotsClass).style.display = 'none';
        };
    });
};

const closeSubmenu = () => {
    const windowInnerWidth = document.documentElement.clientWidth;
    if (windowInnerWidth >= 576) {
        body.style.overflow = 'auto';
    } 
    
    headBottomContent.classList.remove('submenu-shown');
    submenu.style.display = 'none';
    mainMenuItems.forEach(item => item.classList.remove('active'));
    submenuSections.forEach(item => item.classList.remove('active'));
};

const showSubmenu = () => {
    for (let i = 0; i < mainMenuItems.length; i++) {
        mainMenuItems[i].addEventListener('click', (e) => {
            body.style.overflow = 'hidden';
            headBottomContent.classList.add('submenu-shown');
            submenu.style.display = 'flex';
            mainMenuItems.forEach(item => item.classList.remove('active'));
            submenuSections.forEach(item => item.classList.remove('active'));
            mainMenuItems[i].classList.add('active');
            submenuSections[i].classList.add('active');
        })
    };    
};

const clearSearchResults = () => {
    searchResaultsContainer.innerHTML = '';
};

const disableScroll = () => {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    let pagePosition = window.scrollY;
    body.style.paddingRight = paddingOffset;
    body.classList.add('disable-scroll');
    body.dataset.position = pagePosition;
    body.style.top = -pagePosition + 'px';
};
  
const enableScroll  = () => {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    body.style.top = 'auto';
    body.classList.remove('disable-scroll');
    body.style.paddingRight = '0px';
    window.scroll({top: pagePosition, left: 0});
    body.removeAttribute('data-position');
};

const closeModal = (modal,overlay) => {
    enableScroll();
    body.style.overflow = 'auto';
    modal.classList.add('visually-hidden');
    overlay.classList.add('visually-hidden'); 
};

const openModal = (modal,overlay) => {
    disableScroll();
    body.style.overflow = 'hidden';
    modal.classList.remove('visually-hidden'); 
    overlay.classList.remove('visually-hidden');
};


//Scroll main menu when click on arrows
leftMainMenuArrow.addEventListener('click', () => {
    easyScroll({
        'scrollableDomEle': mainMenuList,
        'duration': 400,
        'direction': 'left',
        'easingPreset': 'linear'
      });
    
});

righttMainMenuArrow.addEventListener('click', () => {
    easyScroll({
        'scrollableDomEle': mainMenuList,
        'duration': 400,
        'direction': 'right',
        'easingPreset': 'linear'
    });
});

//Show/hide main submenu/footer top menu items and hide dots
showHideMenuItems('.menu-column','.menu-column__list-item', '.menu-column__show-more-dots', 5);

//Show/hide search modal menu items and show dots instead
showHideMenuItems('.search-modal__search-results-group','.search-modal__results-group-list-item', '.search-modal__show-more-search-items', 3);

//Prevent following main menu links
mainMenuLinks.forEach( (item) => {
    item.addEventListener('click', (e) => e.preventDefault());
});

//Show/hide mobile menu
burgerOpenMenuButton.addEventListener('click', showHideMobileMenu);

//Show submenu when click on menu item
showSubmenu();

//Hide submenu when click on close button 'X'
submenuCloseButton.addEventListener('click', closeSubmenu);


/*** Search modal component ***/
//Open search modal
headerSearchField.addEventListener('click', () => {
    openModal(searchModal,searchModalOverlay);
    setInterval(() => {
        modalSearchField.focus()
    },100);
});

searchMobileIcon.addEventListener('click', () => {
    openModal(searchModal,searchModalOverlay);
    setInterval(() => {
        modalSearchField.focus()
    },100);
});

//Close search modal
searchModalCloseButton.addEventListener('click',() => closeModal(searchModal,searchModalOverlay));

//Close search modal when click on overlay
searchModalOverlay.addEventListener('click',() => closeModal(searchModal,searchModalOverlay));

//Clear search results
clearSearchResultsButton.addEventListener('click', clearSearchResults);


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
}





