document.addEventListener('DOMContentLoaded', () => {
    let headerCabinetContent = document.querySelector('.header--cabinet-content-page');

    if(headerCabinetContent) {
        let paginationPages = document.querySelectorAll('.cabinet-pagination__page');
        let firstPaginationPage = document.querySelector('.cabinet-pagination__page--first-page');
        let lastPaginationPage = document.querySelector('.cabinet-pagination__page--last-page');

        /* paginationPages.forEach(page => {
            let pageNumber = page.textContent;
        }) */
        
/*         let lastVsisvlePageNumber = +paginationPages[paginationPages.length - 1].textContent;
        if (lastVsisvlePageNumber > 8) {
            firstPaginationPage.classList.remove('hidden');
        }
        
        if(!lastPaginationPage.nextElementSibling) {

        } */
    }
});