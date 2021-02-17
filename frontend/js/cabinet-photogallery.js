document.addEventListener('DOMContentLoaded', () => {
    let headerCabinetContent = document.querySelector('.header--cabinet-content-page');

    if(headerCabinetContent) {
        let photogalleryItems = document.querySelectorAll('.cabinet-photogallery__photogallery-item');
        let checkAllCheckbox = document.querySelector('.cabinet-photogallery__checkbox--check-all-checkbox');
        let photogalleryItemsCheckboxes = document.querySelectorAll('.cabinet-photogallery__checkbox--selected-checkbox');
        let switchCheckbox = document.querySelector('.cabinet-photogallery__checkbox-label--switch-on-off-selected');
        
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
                    })
                })
            };
        };


        //Switch on/off photogallery
        if(switchCheckbox) {
            switchCheckbox.addEventListener('change', (e) => switchOffOnItems(e.target, '.cabinet-photogallery__photogallery-item', '.cabinet-photogallery__checkbox--selected-checkbox', '.cabinet-photogallery__td--status'));
        };

        // Delete news-item when click 'X' button
        deleteTableItem(photogalleryItems, '.cabinet-photogallery__button--delete-button');
        
        // CheckAll checkboxes when check 'check-all-checkbox' checkbox
        checkAllCheckboxes(checkAllCheckbox,photogalleryItemsCheckboxes);
    }
});