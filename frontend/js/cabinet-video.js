document.addEventListener('DOMContentLoaded', () => {
    let headerCabinetContent = document.querySelector('.header--cabinet-content-page');

    if(headerCabinetContent) {
        let videoItems = document.querySelectorAll('.cabinet-video__video-item');
        let checkAllCheckbox = document.querySelector('.cabinet-video__checkbox--check-all-checkbox');
        let videoItemsCheckboxes = document.querySelectorAll('.cabinet-video__checkbox--selected-checkbox');
        let switchCheckbox = document.querySelector('.cabinet-video__checkbox--switch_on_off_selected');
        
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

        //Switch on/off video
        if(switchCheckbox) {
            switchCheckbox.addEventListener('change', (e) => switchOffOnItems(e.target, '.cabinet-video__video-item', '.cabinet-video__checkbox--selected-checkbox', '.cabinet-video__td--status'));
        };

        // Delete news-item when click 'X' button
        deleteTableItem(videoItems, '.cabinet-video__button--delete-button');
        
        // CheckAll checkboxes when check 'check-all-checkbox' checkbox
        checkAllCheckboxes(checkAllCheckbox,videoItemsCheckboxes);
    }
});