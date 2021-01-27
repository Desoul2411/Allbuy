document.addEventListener('DOMContentLoaded', () => {
    let headerCabinetContent = document.querySelector('.header--cabinet-content-page');

    if(headerCabinetContent) {
        let cabinetMenuButton = document.querySelector('.header__cabinet-menu-button');
        let cabinetMenu = document.querySelector('.cabinet-menu--content-page');
        let cabinetMenuOverlay = document.querySelector('.cabinet-menu-overlay');
        let cabinetCloseButton = document.querySelector('.cabinet-menu__close-button');

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

        const openCabinetMenu = () => {
            disableScroll();
            body.style.overflow = 'hidden';
            cabinetMenu.classList.add('shown');
            cabinetMenuOverlay.classList.remove('visually-hidden');
            cabinetMenuButton.classList.add('visually-hidden');
        };

        const closeCabinetMenu = () => {
            enableScroll();
            body.style.overflow = 'auto';
            cabinetMenu.classList.remove('shown');
            cabinetMenuOverlay.classList.add('visually-hidden');
            cabinetMenuButton.classList.remove('visually-hidden');
        };

        cabinetMenuButton.addEventListener('click', openCabinetMenu);
        cabinetCloseButton.addEventListener('click', closeCabinetMenu);
        cabinetMenuOverlay.addEventListener('click', closeCabinetMenu);
    }
});