const body = document.querySelector('body');


//Common modal window functions
function closeModal (modal,overlay) {
    enableScroll();
    body.style.overflow = 'auto';
    modal.classList.add('visually-hidden');
    overlay.classList.add('visually-hidden'); 
};


function openModal (modal,overlay) {
    disableScroll();
    body.style.overflow = 'hidden';
    modal.classList.remove('visually-hidden'); 
    overlay.classList.remove('visually-hidden');
};

function disableScroll () {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    let pagePosition = window.scrollY;
    body.style.paddingRight = paddingOffset;
    body.classList.add('disable-scroll');
    body.dataset.position = pagePosition;
    body.style.top = -pagePosition + 'px';
};

function enableScroll () {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    body.style.top = 'auto';
    body.classList.remove('disable-scroll');
    body.style.paddingRight = '0px';
    window.scroll({top: pagePosition, left: 0});
    body.removeAttribute('data-position');
};


//Cabinet functions
const contractDescription = (descriptionsToContract, contractToWhatAmount) => {
    descriptionsToContract.forEach(description => {
        let descriptionText = description.textContent;
        
        if(descriptionText.length > contractToWhatAmount) {
            let contractVal;
            contractVal = descriptionText.substr(0, contractToWhatAmount) + '...';
            description.innerText = contractVal;
        } else { 
            return false
        }
    })
};