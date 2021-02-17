document.addEventListener('DOMContentLoaded', () => {
    let headerCabinetContent = document.querySelector('.header--cabinet-content-page');
    

    if(headerCabinetContent) {
        let productCards = document.querySelectorAll('.cabinet-product');
        let checkAllCheckbox = document.querySelector('.cabinet-edit-goods__check-all-checkbox');
        let productCardsCheckboxes = document.querySelectorAll('.cabinet-product__checkbox--check-checkbox');
        let changeStockSelect = document.querySelector('.cabinet-edit-goods__table-controls-select--change-stock');
        let changeCurrencySelect = document.querySelector('.cabinet-edit-goods__table-controls-select--change-currency');
        let cabinetProductDescriptions = document.querySelectorAll('.cabinet-product__item-description-text');
        let retailPriceInputs = document.querySelectorAll('.cabinet-product__price-input--retail-price');
        

        const switchOnOffProduct = (currentInputValue, productCardsLooped) => {
            if(currentInputValue) {
                productCardsLooped.classList.add('active');
            } else {
                productCardsLooped.classList.remove('active');
            };
        };

        const activateDisactivateProduct = (productCards, retailPriceInputs) => {
            for(let i = 0; i < productCards.length; i++) {
                let retailPriceInputValue = +retailPriceInputs[i].value;
                switchOnOffProduct(retailPriceInputValue, productCards[i]);
    
                retailPriceInputs[i].addEventListener('change', (e)=> {
                    let editedInputValue = +e.target.value;
                    switchOnOffProduct(editedInputValue, productCards[i]);
                });
            };
        };
        
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

        const changeCardParameters = (event) => {
            let currentProductCards = document.querySelectorAll('.cabinet-product');
            let selectCurrentValue = event.currentTarget.value;
            currentProductCards.forEach(productCard => {
                let checkCheckbox =  productCard.querySelector('.cabinet-product__checkbox--check-checkbox');
                if (checkCheckbox.checked) {
                    let selectName = event.currentTarget.getAttribute('name');
                    switch(selectName) {
                        case 'change_stock': changeStockStatus(productCard, selectCurrentValue);
                            break;
                        case 'change_currency': changeCurrencyStatus(productCard, selectCurrentValue);
                            break;
                    };
                };
            });
        }

         const changeStockStatus = (productCard, selectCurrentValue) => {
            let inStockCheckbox = productCard.querySelector('.cabinet-product__checkbox--in-stock-checkbox');
            if ((selectCurrentValue) === 'В наличии') {
                inStockCheckbox.checked = true;
            } else {
                inStockCheckbox.checked = false;
            }
        };
 
        const changeCurrencyStatus = (productCard, selectCurrentValue) => {
            switch (selectCurrentValue) {
                case 'USD':
                    productCard.querySelector('input[value="USD"]').checked = true;
                    break;
                case 'EUR':
                    productCard.querySelector('input[value="EUR"]').checked = true;
                    break;
                case 'BYN':
                    productCard.querySelector('input[value="BYN"]').checked = true;
                    break;
            };
        };


        //Switch on/off (active/not active) product
        activateDisactivateProduct(productCards, retailPriceInputs);

        //Contract description
        contractDescription(cabinetProductDescriptions,60);

        // Delete product card when click 'X' button
        deleteTableItem(productCards, '.cabinet-product__button--delete-button');
        
        // CheckAll checkboxes when check 'check-all-checkbox' checkbox
        checkAllCheckboxes(checkAllCheckbox,productCardsCheckboxes);

        // Сhange the parameters of the selected cards
        if (changeStockSelect && changeCurrencySelect) {
            changeStockSelect.addEventListener('change', changeCardParameters);
            changeCurrencySelect.addEventListener('change', changeCardParameters);
        };
    };
});