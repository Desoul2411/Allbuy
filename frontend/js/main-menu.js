document.addEventListener('DOMContentLoaded', () => {
    let header = document.querySelector('.header');

    if(!header.classList.contains('header--cabinet-content-page') && !header.classList.contains('header--cabinet-main')) {
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


        //Scroll main menu when click on arrows
        leftMainMenuArrow.addEventListener('click', () => {
            easyScroll({
                'scrollableDomEle': mainMenuList,
                'duration': 300,
                'direction': 'left',
                'easingPreset': 'easeOutQuad'
            });
            
        });

        righttMainMenuArrow.addEventListener('click', () => {
            easyScroll({
                'scrollableDomEle': mainMenuList,
                'duration': 300,
                'direction': 'right',
                'easingPreset': 'easeOutQuad'
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
    }
});