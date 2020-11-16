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


//Show/hide submenu 
for (let i = 0; i < mainMenuItems.length; i++) {
    mainMenuItems[i].addEventListener('click', (e) => {
        headBottomContent.style.height = '100vh';
        submenu.style.display = 'flex';
        mainMenuItems.forEach(item => item.classList.remove('active'));
        submenuSections.forEach(item => item.classList.remove('active'));
        mainMenuItems[i].classList.add('active');
        submenuSections[i].classList.add('active');
    })
};

//Hide submenu when click on close button 'X'
submenuCloseButton.addEventListener('click', () => {
    headBottomContent.style.height = 'auto';
    submenu.style.display = 'none';
    mainMenuItems.forEach(item => item.classList.remove('active'));
    submenuSections.forEach(item => item.classList.remove('active'));
});






