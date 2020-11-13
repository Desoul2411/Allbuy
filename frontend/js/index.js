let body = document.querySelector('body');
let leftMainMenuArrow = document.querySelector('.main-menu__arrow-left');
let righttMainMenuArrow = document.querySelector('.main-menu__arrow-right');
let mainMenuContainer = document.querySelector('.main-menu');
let mainMenuList = document.querySelector('.main-menu__list');
let mainMenuLinks = document.querySelectorAll('.main-menu__link');
let burgerOpenMenuButton = document.querySelector('.header__open-menu-burger');


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

//Prevent following main menu links links
mainMenuLinks.forEach( (item) => {
    item.addEventListener('click', (e) => e.preventDefault());
});

//Show/hide mobile menu
burgerOpenMenuButton.addEventListener('click', () => {
    if (mainMenuContainer.classList.contains('opened')) {
        mainMenuContainer.classList.remove('opened');
        body.style.overflow = 'auto';
    } else {
        mainMenuContainer.classList.add('opened');
        body.style.overflow = 'hidden';
    }
});





