document.addEventListener('DOMContentLoaded', () => {
    let header = document.querySelector('.header');

    if(!header.classList.contains('header--cabinet-content-page') && !header.classList.contains('header--cabinet-main')) {
        let body = document.querySelector('body');
        let searchMobileIcon = document.querySelector('.header__search-mobile-icon');
        let clearSearchResultsButton = document.querySelector('.search-modal__clear-button');
        let searchResaultsContainer = document.querySelector('.search-modal__search-results-groups');
        let searchModalCloseButton = document.querySelector('.search-modal__back-arrow-button');
        let searchModal = document.querySelector('.search-modal');
        let searchModalOverlay = document.querySelector('.search-modal-overlay');
        let headerSearchField = document.querySelector('.header__search-input');
        let modalSearchField = document.querySelector('.search-modal__search-input');

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

        const clearSearchResults = () => {
            searchResaultsContainer.innerHTML = '';
        };

        //Close search modal
        searchModalCloseButton.addEventListener('click',() => closeModal(searchModal,searchModalOverlay));

        //Close search modal when click on overlay
        searchModalOverlay.addEventListener('click',() => closeModal(searchModal,searchModalOverlay));

        //Clear search results
        clearSearchResultsButton.addEventListener('click', clearSearchResults);
    }
});