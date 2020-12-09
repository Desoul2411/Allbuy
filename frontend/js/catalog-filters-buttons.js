document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.main--catalog')) {
        let resetFilterButton = document.querySelector('.filters__reset-button');
        let filterButtonCheckboxes = document.querySelectorAll('.filter-button__input');
        let catalogContentFilterButtonInputs = document.querySelector('.catalog-content__filter-buttons').querySelectorAll('.filter-button__input');
        let filtersBlockFilterButtonTextNodes = document.querySelector('.filters').querySelectorAll('.filter-button__text');

        synchronizeCheckedFilterButtons = (e) => {
            let currentFilterButtonName = e.currentTarget.nextElementSibling.textContent;
            filtersBlockFilterButtonTextNodes.forEach(filterBlockButtonTextNode => {
                if (currentFilterButtonName === filterBlockButtonTextNode.textContent && !filterBlockButtonTextNode.previousElementSibling.checked) {
                    filterBlockButtonTextNode.previousElementSibling.checked = true;
                } else if (currentFilterButtonName === filterBlockButtonTextNode.textContent && filterBlockButtonTextNode.previousElementSibling.checked) {
                    filterBlockButtonTextNode.previousElementSibling.checked = false
                }
            });
        };

        const toggleHiddenFilterButtons = (menuColumnClass,menuListClass,menuDotsClass,showHiddenItemsArrowClass, itemsAmountToShow) => {
            let menuColumns = document.querySelectorAll(menuColumnClass);

            menuColumns.forEach((item) => {
                let menuItemsAmount =  item.querySelectorAll(menuListClass).length;

                if (menuItemsAmount > itemsAmountToShow){
                    let currentListItems =  item.querySelectorAll(menuListClass);
                    let showMoreItemsDots = item.querySelector(menuDotsClass);
                    let showHiddenItemsArrow = item.querySelector(showHiddenItemsArrowClass);
            
                    showMoreItemsDots.style.display = 'flex';
            
                    currentListItems.forEach((listItem,index) => {
                        index > itemsAmountToShow - 1 && listItem.classList.add('hidden');
                    });
            
                    showMoreItemsDots.addEventListener('click', () => {
                        currentListItems.forEach((listItem,index) => {
                            if (index > itemsAmountToShow - 1) {
                                listItem.classList.remove('hidden');
                                showMoreItemsDots.style.display = 'none';

                                if(showHiddenItemsArrow) {
                                    showHiddenItemsArrow.style.display = 'flex';
                                }
                            };
                        });
                    });

                    if(showHiddenItemsArrow) {
                        showHiddenItemsArrow.addEventListener('click', () => {
                            currentListItems.forEach((listItem,index) => {
                                index > itemsAmountToShow - 1 && listItem.classList.add('hidden');
                                showHiddenItemsArrow.style.display = 'none';
                                showMoreItemsDots.style.display = 'flex';
                            });
                        });
                    };
                    
                } else {
                    item.querySelector(menuDotsClass).style.display = 'none';
                };
            });
        };

        const resetFilters = () => {
            filterButtonCheckboxes.forEach(item => item.checked = false);
        };

        catalogContentFilterButtonInputs.forEach(item => {
            item.addEventListener('change', synchronizeCheckedFilterButtons);
        });
        
        //reset filter
        resetFilterButton.addEventListener('click', resetFilters);

        toggleHiddenFilterButtons('.filters__filter-buttons', '.filter-button', '.filters__show-more-dots', '.filters__hide-arrow', 6);
        toggleHiddenFilterButtons('.catalog-content__filter-buttons', '.filter-button', '.catalog-content__show-more-dots', '.filters__hide-arrow', 6);
    };
});