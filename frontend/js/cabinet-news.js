document.addEventListener('DOMContentLoaded', () => {
    let headerCabinetContent = document.querySelector('.header--cabinet-content-page');

    if(headerCabinetContent) {
        let newsItems = document.querySelectorAll('.cabinet-news__news-item');
        let checkAllCheckbox = document.querySelector('.cabinet-news__checkbox--check-all-checkbox');
        let productNewsCheckboxes = document.querySelectorAll('.cabinet-news__checkbox--selected-checkbox');
        let switchCheckbox = document.querySelector('.cabinet-news__checkbox--switch_on_off_selected');
        
        const deleteTableItem = (elemnetsToDelete, deleteButtonClass) => {
            elemnetsToDelete.forEach(element => {
                element.addEventListener('click', (e) => {
                    let deleteElementButton = element.querySelector(deleteButtonClass);
                    if (e.target === deleteElementButton || e.target === deleteElementButton.children[0]) {
                        element.remove();
                    }
                });
            });
        };
        
        const checkAllCheckboxes = (checkAllCheckboxElement, checkboxesToCheckElements) => {
            if(checkAllCheckboxElement) {
                checkAllCheckboxElement.addEventListener('change', (e) => {
                    checkboxesToCheckElements.forEach(checkboxesToCheckElement => {
                        if(e.target.checked) {
                            checkboxesToCheckElement.checked = true;
                        } else {
                            checkboxesToCheckElement.checked = false;
                        }
                    });
                });
            };
        };

        //Switch on/off news
        if(switchCheckbox) {
            switchCheckbox.addEventListener('change', (e) => switchOffOnItems(e.target, '.cabinet-news__news-item', '.cabinet-news__checkbox--selected-checkbox', '.cabinet-news__td--status'));
        }
        
        // Delete news-item when click 'X' button
        deleteTableItem(newsItems, '.cabinet-news__button--delete-button');
        
        // CheckAll checkboxes when check 'check-all-checkbox' checkbox
        checkAllCheckboxes(checkAllCheckbox,productNewsCheckboxes);
    }
});