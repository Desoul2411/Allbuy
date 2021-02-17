document.addEventListener('DOMContentLoaded', () => {
    let productCardMain = document.querySelector('.main--product-card');
    
    if(productCardMain) {
        let body = document.querySelector('body');
        let modalOverlay = document.querySelector('.modal-overlay');
        let overlayAskQuestionModal = document.querySelector('.modal-overlay--ask-question');
        let overlaySubmitAppModal = document.querySelector('.modal-overlay--submit-app');
        let askQuestionModal = document.querySelector('.modal-ask-question');
        let askQuestionButton = document.querySelector('.main-card-info__ask-question-button');
        let askModalCloseButton = document.querySelector('.modal-ask-question__close-button');
        let submitAppModal = document.querySelector('.modal-submit-app');
        let submitAppButtons = document.querySelectorAll('.seller-card__leave-app-link-button');
        let submitAppCloseButton = document.querySelector('.modal-submit-app__close-button');
        
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
    
    
        const setSellerParametersToModal = (currentSellerCard) => {
            let currentSellerLogoSrc = currentSellerCard.querySelector('.seller-card__seller-logo').getAttribute('src');
            let currentSellerName =  currentSellerCard.querySelector('.seller-card__seller-name').textContent;
            let currentSellerRating = currentSellerCard.querySelector('.seller-card__seller-rating-amount').textContent;
            let currentSellerPrice = currentSellerCard.querySelector('.seller-card__product-price-amount').textContent;
    
            let submitAppModalSellerLogo = submitAppModal.querySelector('.modal-submit-app__seller-logo');
            let submitAppModalSellerName = submitAppModal.querySelector('.modal-submit-app__seller-name');
            let submitAppModalSellerRating = submitAppModal.querySelector('.modal-submit-app__seller-rating-amount');
            let submitAppModalSellerPrice = submitAppModal.querySelector('.modal-submit-app__price-amount');
    
            submitAppModalSellerLogo.setAttribute('src',currentSellerLogoSrc);
            submitAppModalSellerName.textContent = currentSellerName;
            submitAppModalSellerRating.textContent = currentSellerRating;
            submitAppModalSellerPrice.textContent = currentSellerPrice;
        };
    
        overlaySubmitAppModal.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeModal(submitAppModal, overlaySubmitAppModal)
            };
        });
    
        overlayAskQuestionModal.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeModal(askQuestionModal, overlayAskQuestionModal)
            };
        });
    
        if (askQuestionButton && askModalCloseButton && askQuestionModal) {
            askQuestionButton.addEventListener('click', () => openModal(askQuestionModal, overlayAskQuestionModal));
            askModalCloseButton.addEventListener('click', () => closeModal(askQuestionModal, overlayAskQuestionModal));
        }
    
        if (submitAppButtons && submitAppCloseButton && submitAppModal) {
            submitAppButtons.forEach(submitAppButton => {
                submitAppButton.addEventListener('click', (e) => {
                    let currentSellerCard = e.target.parentElement.parentElement.parentElement;
                    openModal(submitAppModal, overlaySubmitAppModal);
                    setSellerParametersToModal(currentSellerCard);
                    
                });
            });
    
            submitAppCloseButton.addEventListener('click', () => closeModal(submitAppModal, overlaySubmitAppModal));
        };

        //phone input mask
        phoneMask('.modal-submit-app__input--phone');
        phoneMask('.modal-ask-question__input--phone');

        let navSlider = new Splide( '#nav-slider', {
            direction  : 'ttb',
            height: 420,
            perPage: 3,
            perMove: 1,
            pagination: false,
            arrows: false,
            isNavigation: true,
            focus: 'center',
            cover: true,
        }).mount();

        let mainSlider = new Splide( '#main-slider', {
            perPage: 1,
            perMove: 1,
            pagination: false,
            breakpoints: {
                767: {
                    pagination: true,
                },
            }
        });

        mainSlider.sync(navSlider).mount();
    };
});