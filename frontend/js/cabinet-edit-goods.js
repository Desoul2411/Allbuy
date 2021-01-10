document.addEventListener('DOMContentLoaded', () => {
    let headerCabinetContent = document.querySelector('.header--cabinet-content-page');

    if(headerCabinetContent) {
        let productCards = document.querySelectorAll('.cabinet-product');
        let checkAllCheckbox = document.querySelector('.cabinet-edit-goods__check-all-checkbox');
        let productCardsCheckboxes = document.querySelectorAll('.cabinet-product__checkbox--check-checkbox');
        
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

        // Delete product card when click 'X' button
        deleteTableItem(productCards, '.cabinet-product__button--delete-button');
        
        // CheckAll checkboxes when check 'heck-all-checkbox' checkbox
        checkAllCheckboxes(checkAllCheckbox,productCardsCheckboxes);
    }
});