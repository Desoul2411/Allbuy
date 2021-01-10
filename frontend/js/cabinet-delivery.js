document.addEventListener('DOMContentLoaded', () => {
    let headerCabinetContent = document.querySelector('.header--cabinet-content-page');

    if(headerCabinetContent) {
        let addDeliveryOptionButton = document.querySelector('.cabinet-delivery__add-delivery-option-button');
        let deliveryOptionList = document.querySelector('.cabinet-delivery');
        let deliveryOptionHtml = `
        <div class="cabinet-delivery__cabinet-delivery-option">
            <div class="cabinet-delivery__input-option">
                <label class="cabinet-content__input-small-label">Зона</label>
                <input type="text" name="delivery_zone" class="cabinet-delivery__input" disabled="">
            </div>
            <div class="cabinet-delivery__input-option">
                <label class="cabinet-content__input-small-label">Категории</label>
                <input type="text" name="delivery_category" class="cabinet-delivery__input" disabled=""> 
            </div>
            <div class="cabinet-delivery__input-option">
                <label class="cabinet-content__input-small-label">Описание</label>
                <input type="text" name="delivery_description" class="cabinet-delivery__input" disabled="">
            </div>
            <div class="cabinet-delivery__delivery-option-controls">
                <svg class="cabinet-content__control-button cabinet-content__control-button--delivery-edit" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7272 8.61179L21.4141 9.25101C21.7692 9.37531 22 9.71268 22 10.0856V11.9144C22 12.2873 21.7869 12.6247 21.4318 12.749L19.745 13.3882C19.5497 14.134 19.2478 14.8442 18.8749 15.5012L19.6206 17.1525C19.7805 17.4899 19.7095 17.8806 19.4431 18.1469L18.1469 19.4431C17.8805 19.7094 17.4899 19.7805 17.1526 19.6207L15.5012 18.8749C14.8442 19.2478 14.134 19.5496 13.3882 19.745L12.749 21.4318C12.6248 21.7692 12.2874 22 11.9144 22H10.0856C9.71265 22 9.37524 21.7869 9.25098 21.4318L8.61182 19.745C7.86597 19.5496 7.15576 19.2478 6.49878 18.8749L4.84741 19.6207C4.51013 19.7805 4.11951 19.7094 3.85315 19.4431L2.55688 18.1469C2.29053 17.8806 2.21948 17.4899 2.37939 17.1525L3.12512 15.5012C2.7522 14.8442 2.45032 14.134 2.255 13.3882L0.568237 12.749C0.230835 12.6069 0 12.2873 0 11.9144V10.0856C0 9.71268 0.213135 9.37531 0.568237 9.25101L2.255 8.61179C2.45032 7.86603 2.7522 7.15578 3.12512 6.49879L2.37939 4.84746C2.21948 4.51009 2.29053 4.11945 2.55688 3.8531L3.85315 2.5569C4.11951 2.29056 4.51013 2.21953 4.84741 2.37933L6.49878 3.12511C7.15576 2.75221 7.86597 2.45036 8.61182 2.25505L9.25098 0.568207C9.39307 0.230835 9.71265 0 10.0856 0H11.8967C12.2695 0 12.6069 0.213074 12.7312 0.568207L13.3705 2.25505C14.1162 2.45036 14.8264 2.75221 15.4834 3.12511L17.1348 2.37933C17.4722 2.21953 17.8628 2.29056 18.1292 2.5569L19.4253 3.8531C19.6917 4.11945 19.7627 4.51009 19.6029 4.84746L18.8572 6.49879C19.23 7.15578 19.5319 7.86603 19.7272 8.61179ZM11 18C14.866 18 18 14.866 18 11C18 7.134 14.866 4 11 4C7.13403 4 4 7.134 4 11C4 14.866 7.13403 18 11 18Z" fill="#353535"></path>
                </svg>                                            
                <svg class="cabinet-content__control-button cabinet-content__control-button--delete" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L10 10M18 18L10 10M10 10L18 2L2 18" stroke="#353535" stroke-width="3"></path>
                </svg>                                            
            </div>
        </div>`;


        let deliveryOptions = document.querySelectorAll('.cabinet-delivery__cabinet-delivery-option');

        const addElement = (addElementButton, elementsContainer, elementHTML, elementsCollectionClass) => {
            if (addElementButton && elementsContainer && elementHTML) {
                addElementButton.addEventListener('click', () => {
                    elementsContainer.insertAdjacentHTML('beforeend', elementHTML);
                    //refresh elementsCollection after adding new element
                    elementsCollection = document.querySelectorAll(elementsCollectionClass);
                    removeElement(elementsCollection);
                });
            };
        };

        const removeElement = (elementsCollection) => {
            elementsCollection.forEach(element =>  {
                element.addEventListener('click', (e) => {
                    let deleteButton = element.querySelector('.cabinet-content__control-button--delete');
                    if(e.target === deleteButton || e.target === deleteButton.children[0]) {
                        e.currentTarget.remove();
                    }
                })
            });
        };

        //Add phone number
        addElement(addDeliveryOptionButton, deliveryOptionList, deliveryOptionHtml, '.cabinet-delivery__cabinet-delivery-option');

        //Remove phone number
        removeElement(deliveryOptions);
    };
});