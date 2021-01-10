document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.main--catalog')) {
        let body = document.querySelector('body');
        let showFilterBlockButton = document.querySelector('.catalog-content__show-filter-block-button');
        let filtersBlock = document.querySelector('.catalog-aside');
        let filtersBlockOverlay = document.querySelector('.catalog-aside__mobile-overlay');
        let filtersBlockCloseButton = document.querySelector('.filters__close-filter-button');

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
        
        const showFiltersBlock = () => {
            disableScroll();
            filtersBlock.classList.add('is-shown');
            filtersBlockOverlay.classList.remove('visually-hidden');
            body.classList.add('isFiltersBlockShown');
        };

        const hideFiltersBlock = () => {
            enableScroll();
            filtersBlock.classList.remove('is-shown');
            filtersBlockOverlay.classList.add('visually-hidden');
            body.classList.remove('isFiltersBlockShown');
        };

        showFilterBlockButton.addEventListener('click', showFiltersBlock);
        filtersBlockOverlay.addEventListener('click', hideFiltersBlock);
        filtersBlockCloseButton.addEventListener('click', hideFiltersBlock);
    };
});