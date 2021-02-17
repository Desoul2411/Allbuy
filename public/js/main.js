document.addEventListener('DOMContentLoaded', () => {
    let headerCabinetContent = document.querySelector('.header--cabinet-content-page');

    if(headerCabinetContent) {
        let addPhoneButton = document.querySelector('.cabinet-content__add-phone-button');
        let addWorkTimeButton = document.querySelector('.cabinet-content__add-work-time-button');
        let phonesList = document.querySelector('.cabinet-content__phones-list');
        let workTimeList = document.querySelector('.cabinet-content__work-time-inputs');
        let phoneListItemHtml = `
        <li class="cabinet-content__phones-list-item">
            <input type="tel" name="place_phone" class="cabinet-content__phone-input">
            <div class="cabinet-content__phone-description">
                <label class="cabinet-content__phone-description-label">Описание:</label>
                <input type="text" name="phone_description" class="cabinet-content__phone-description-input">
            </div>
            <svg class="cabinet-content__control-button cabinet-content__control-button--delete cabinet-content__control-button--phone-delete" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L8 8M14 14L8 8M8 8L14 2L2 14" stroke="#353535" stroke-width="3"/>
            </svg>                                                
        </li>`;
        let workTimeInputsItemHtml = `
            <li class="cabinet-content__work-time-inputs-item">
                <div class="cabinet-content__work-time-input-option cabinet-content__work-time-input-option--first-day">
                    <label class="cabinet-content__input-small-label">День начала</label>
                    <select name="work_time_first_day" class="cabinet-content__input cabinet-content__input--work-time">
                        <option value="" disabled selected></option>
                        <option value="пн">пн</option>
                        <option value="вт">вт</option>
                        <option value="ср">ср</option>
                        <option value="чт">чт</option>
                        <option value="пт">пт</option>
                        <option value="сб">сб</option>
                        <option value="вс">вс</option>
                    </select>
                </div>
                <div class="cabinet-content__work-time-input-option cabinet-content__work-time-input-option--last-day">
                    <label class="cabinet-content__input-small-label">День конца</label>
                    <select type="text" name="work_time_last_day" class="cabinet-content__input cabinet-content__input--work-time">
                        <option value="" disabled selected></option>
                        <option value="пн">пн</option>
                        <option value="вт">вт</option>
                        <option value="ср">ср</option>
                        <option value="чт">чт</option>
                        <option value="пт">пт</option>
                        <option value="сб">сб</option>
                        <option value="вс">вс</option>
                    </select>
                </div>
                <div class="cabinet-content__work-time-input-option cabinet-content__work-time-input-option--opening-time">
                    <label class="cabinet-content__input-small-label">Время открытия</label>
                    <input type="text" name="work_time_opening_time" autocomplete="off" class="cabinet-content__input cabinet-content__input--work-time cabinet-content__input--opening-time">
                    <div class="cabinet-content__timepicker-widget timepicker-widget visually-hidden">
                        <span class="timepicker-widget__headline">Выберите время</span>
                        <div class="timepicker-widget__content">
                            <div class="timepicker-widget__content-item">
                                <span class="timepicker-widget__content-item-label timepicker-widget__content-item-label--time">Время</span>
                                <span class="timepicker-widget__content-item-field timepicker-widget__content-item-field--time">
                                    <span class="timepicker-widget__time-hours">00</span>:<span class="timepicker-widget__time-minutes">00</span>
                                </span>
                            </div>
                            <div class="timepicker-widget__content-item">
                                <label class="timepicker-widget__content-item-label">Часы</д>
                                <input class="timepicker-widget__content-item-field timepicker-widget__content-item-field--hours" type="range" min="0" max="23" value="00"/>
                            </div>
                            <div class="timepicker-widget__content-item">
                                <label class="timepicker-widget__content-item-label">Минуты</д>
                                <input class="timepicker-widget__content-item-field timepicker-widget__content-item-field--minutes" type="range" min="0" max="59" value="00"/>
                            </div>
                        </div>
                        <div class="timepicker-widget__buttons">
                            <button class="timepicker-widget__button timepicker-widget__button--set-time" type="button">Готово</button>
                        </div>
                    </div>
                </div>
                <div class="cabinet-content__work-time-input-option cabinet-content__input-option--24-hours">
                    <label class="cabinet-content__input-small-label">Круглосуточно
                        <input type="checkbox" name="24_hours" class="cabinet-content__checkbox cabinet-content__checkbox--work-time">
                        <span class="cabinet-content__custom-checkbox cabinet-content__custom-checkbox--24-hours"></span>
                    </label>
                </div>
                <div class="cabinet-content__work-time-input-option cabinet-content__input-option--work-time-comment">
                    <label class="cabinet-content__input-small-label">Комментарий</label>
                    <input type="text" name="work_time_comment" class="cabinet-content__input cabinet-content__input--work-time">
                </div>
                <svg class="cabinet-content__control-button cabinet-content__control-button--delete cabinet-content__control-button--work-time-delete" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L8 8M14 14L8 8M8 8L14 2L2 14" stroke="#353535" stroke-width="3"/>
                </svg>   
            </li>
        `;


        let phoneListItems = document.querySelectorAll('.cabinet-content__phones-list-item');
        let workTimeListItems = document.querySelectorAll('.cabinet-content__work-time-inputs-item');

        const addElement = (addElementButton, elementsContainer, elementHTML, elementsCollectionClass) => {
            if (addElementButton && elementsContainer && elementHTML) {
                addElementButton.addEventListener('click', () => {
                    elementsContainer.insertAdjacentHTML('beforeend', elementHTML);
                    //refresh elementsCollection after adding new element
                    elementsCollection = document.querySelectorAll(elementsCollectionClass);
                    removeElement(elementsCollection);
                    chooseOpeningTime(elementsCollection);
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

        const chooseOpeningTime = (workTimeElementsCollection) => {
            let body = document.querySelector('body');

            workTimeElementsCollection.forEach(workTimeListItem => {
                let workTimeInput = workTimeListItem.querySelector('.cabinet-content__input--opening-time');
                let setTimeButton = workTimeListItem.querySelector('.timepicker-widget__button--set-time');
                let timepickerWidget = workTimeListItem.querySelector('.timepicker-widget');

                if(workTimeInput) {
                    workTimeInput.addEventListener('click', (e) => {
                        let timeHoursField = workTimeListItem.querySelector('.timepicker-widget__time-hours');
                        let timeMinutesField = workTimeListItem.querySelector('.timepicker-widget__time-minutes');
    
                        let hoursInput = workTimeListItem.querySelector('.timepicker-widget__content-item-field--hours');
                        let minutesInput = workTimeListItem.querySelector('.timepicker-widget__content-item-field--minutes');
                        let hoursInputValue,minutesInputValue;
    
                        let currentWorkTimeInput = e.currentTarget;
    
                        timepickerWidget.classList.remove('visually-hidden');
        
                        hoursInput.addEventListener('change', (e)=> {
                            hoursInputValue = e.target.value;
                            if(hoursInputValue <= 9) {
                                timeHoursField.innerText = 0 + hoursInputValue;
                            } else {
                                timeHoursField.innerText = hoursInputValue;
                            }
                        });
        
                        minutesInput.addEventListener('change', (e)=> {
                            minutesInputValue = e.target.value;
                            if(minutesInputValue <= 9) {
                                timeMinutesField.innerText = 0 + minutesInputValue;
                            } else {
                                timeMinutesField.innerText = minutesInputValue;
                            }
                        });
        
                        setTimeButton.addEventListener('click', () => {
                            let hours = timeHoursField.textContent;
                            let minutes = timeMinutesField.textContent;
                            workTimeInput.value = `${hours}:${minutes}`;
                            timepickerWidget.classList.add('visually-hidden');
                        });
                    });
                }
                

                body.addEventListener('click',(e) => {
                    if(timepickerWidget && !timepickerWidget.classList.contains('visually-hidden')) {
                        let timepickerWidgetChildren = timepickerWidget.querySelectorAll('.timepicker-widget *');

                        for (let i = 0; i <= timepickerWidgetChildren.length - 1; i++) {
                            if(e.target === timepickerWidget || e.target === workTimeInput || e.target === timepickerWidgetChildren[i]) {
                                timepickerWidget.classList.remove('visually-hidden');
                                return false;
                            } else {
                                timepickerWidget.classList.add('visually-hidden');
                            }
                        } 
                    }
                });
            });
        };


        //Add phone number
        addElement(addPhoneButton, phonesList, phoneListItemHtml, '.cabinet-content__phones-list-item');

        //Add work time
        addElement(addWorkTimeButton, workTimeList, workTimeInputsItemHtml,'.cabinet-content__work-time-inputs-item');

        //Remove phone number
        removeElement(phoneListItems);

        //Remove work time
        removeElement(workTimeListItems);

        chooseOpeningTime(workTimeListItems);
    };
});
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
        let priceInputs = document.querySelectorAll('.cabinet-product__price-input');
        
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

        const validatePriceInputValue = (priceInput) => {
            priceInput.addEventListener('change', (e) => {
                if(isNaN(e.target.value)) {
                    e.target.value = '';
                }
                return;
            })
        };

        //validate price value entered
        priceInputs.forEach(priceInput => {
            validatePriceInputValue(priceInput)
        });

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
document.addEventListener('DOMContentLoaded', () => {
    const modalEditNews = document.querySelector('.modal-edit-news');

    if(modalEditNews) {
        let overlay = document.querySelector('.modal-overlay');
        let newsItems = document.querySelectorAll('.cabinet-news__news-item');
        let editNewsModal = document.querySelector('.modal-edit-news');
        let editNewsForm = document.querySelector('.modal-edit-news__form');
        let editModalNewsTitleField = document.querySelector('.modal-edit-news__input--news-name');
        let editPlacementDateField = document.querySelector('.modal-edit-news__input--begin-placement-date');
        let cabinetEditNewsModalCloseButton = document.querySelector('.modal-edit-news__close-button');
        let uploadImageInput = document.querySelector('.modal-edit-news__upload-image-input');
        let uploadedImage = document.querySelector('.modal-edit-news__image');
        let cutImageButton = document.querySelector('.modal-edit-news__cut-image-button');
        let addNewsButton = document.querySelector('.cabinet-news__link-button');
        let editNewsModalTitle = document.querySelector('.modal-edit-news__headline');

        const openAddNewsModal = (e) => {
            e.preventDefault();
            editNewsModal.classList.add('adding-news');
            editNewsModalTitle.textContent = "Добавить новость";
            editNewsForm.reset();
            openModal(editNewsModal,overlay);
        };

        
        addNewsButton.addEventListener('click', openAddNewsModal);
        
        const transferNewsDataToModal = (e) => {
            if (e.target.classList.contains('cabinet-news__article-name') || 
                 e.target.classList.contains('cabinet-news__button--settings-button') ||
                 e.target.classList.contains('cabinet-news__settings-button-path')) {
                if(e.target.classList.contains('cabinet-news__article-name')) {
                    e.preventDefault();
                };

                if(editNewsModal.classList.contains('adding-news')) {
                    editNewsModal.classList.remove('adding-news');
                    editNewsModalTitle.textContent = "Редактировать новость";
                };
                
                openModal(editNewsModal,overlay);

                let currentNewsTitleText = e.currentTarget.querySelector('.cabinet-news__article-name').dataset.value;
                let currentPlacementDate = e.currentTarget.querySelector('.cabinet-news__td--date').dataset.value;
                
                e.currentTarget.classList.add('currently-edited');
                
                editPlacementDateField.value = currentPlacementDate;
                if(currentNewsTitleText === 'Изменить') {
                    editModalNewsTitleField.value = ''
                } else {
                    editModalNewsTitleField.value = currentNewsTitleText;
                };
            };
        };

        const addNews = () => {
            let newsDesription = editModalNewsTitleField.value;
            let placementDate = editPlacementDateField.value;
            let newContainer = document.querySelector('.cabinet-news__news-container');

            let newsHtml = `
                <tr class="cabinet-news__news-item">
                    <td class="cabinet-news__td cabinet-news__td--active-line"></td>
                    <td class="cabinet-news__td cabinet-news__td--selected-checkbox">
                        <label class="cabinet-news__checkbox-label">
                            <input class="cabinet-news__checkbox cabinet-news__checkbox--selected-checkbox" name="selected_checkbox" type="checkbox">
                            <span class="cabinet-news__custom-checkbox"></span>
                        </label>
                    </td>
                    <td class="cabinet-news__td cabinet-news__td--status">Выключено</td>
                    <td class="cabinet-news__td cabinet-news__td--url"><a target="_blank" href="https://buydoors.dom.by//news/77993/">https://buydoors.dom.by//news/77993/</a></td>
                    <td class="cabinet-news__td cabinet-news__td--date" data-value=${placementDate}>${placementDate}</td>
                    <td class="cabinet-news__td cabinet-news__td--article-name">
                        <a class="cabinet-news__article-name" target="_blank" href="http://cmscatalog/places/editNews/id/17333/materialId/77993/" data-value=${newsDesription}>${newsDesription}</a>
                    </td>
                    <td class="cabinet-news__td cabinet-news__td--controls">
                        <svg class="cabinet-news__button cabinet-news__button--settings-button" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="cabinet-news__settings-button-path" fill-rule="evenodd" clip-rule="evenodd" d="M19.7272 8.61179L21.4141 9.25101C21.7692 9.37531 22 9.71268 22 10.0856V11.9144C22 12.2873 21.7869 12.6247 21.4318 12.749L19.745 13.3882C19.5497 14.134 19.2478 14.8442 18.8749 15.5012L19.6206 17.1525C19.7805 17.4899 19.7095 17.8806 19.4431 18.1469L18.1469 19.4431C17.8805 19.7094 17.4899 19.7805 17.1526 19.6207L15.5012 18.8749C14.8442 19.2478 14.134 19.5496 13.3882 19.745L12.749 21.4318C12.6248 21.7692 12.2874 22 11.9144 22H10.0856C9.71265 22 9.37524 21.7869 9.25098 21.4318L8.61182 19.745C7.86597 19.5496 7.15576 19.2478 6.49878 18.8749L4.84741 19.6207C4.51013 19.7805 4.11951 19.7094 3.85315 19.4431L2.55688 18.1469C2.29053 17.8806 2.21948 17.4899 2.37939 17.1525L3.12512 15.5012C2.7522 14.8442 2.45032 14.134 2.255 13.3882L0.568237 12.749C0.230835 12.6069 0 12.2873 0 11.9144V10.0856C0 9.71268 0.213135 9.37531 0.568237 9.25101L2.255 8.61179C2.45032 7.86603 2.7522 7.15578 3.12512 6.49879L2.37939 4.84746C2.21948 4.51009 2.29053 4.11945 2.55688 3.8531L3.85315 2.5569C4.11951 2.29056 4.51013 2.21953 4.84741 2.37933L6.49878 3.12511C7.15576 2.75221 7.86597 2.45036 8.61182 2.25505L9.25098 0.568207C9.39307 0.230835 9.71265 0 10.0856 0H11.8967C12.2695 0 12.6069 0.213074 12.7312 0.568207L13.3705 2.25505C14.1162 2.45036 14.8264 2.75221 15.4834 3.12511L17.1348 2.37933C17.4722 2.21953 17.8628 2.29056 18.1292 2.5569L19.4253 3.8531C19.6917 4.11945 19.7627 4.51009 19.6029 4.84746L18.8572 6.49879C19.23 7.15578 19.5319 7.86603 19.7272 8.61179ZM11 18C14.866 18 18 14.866 18 11C18 7.134 14.866 4 11 4C7.13403 4 4 7.134 4 11C4 14.866 7.13403 18 11 18Z" fill="#353535"></path>
                        </svg>
                        <svg class="cabinet-news__button cabinet-news__button--delete-button" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2L10 10M18 18L10 10M10 10L18 2L2 18" stroke="#353535" stroke-width="3"></path>
                        </svg>
                    </td>
                </tr>
            `;

            newContainer.insertAdjacentHTML('beforeend', newsHtml);
            newsItems = document.querySelectorAll('.cabinet-news__news-item');
            newsItems.forEach(newsItem => {
                newsItem.addEventListener('click',transferNewsDataToModal);
            });
            removeItem();
        };

        const setEditedNewsParams = (currentNewsDesription, currentPlacementDate) => {
            if(currentNewsDesription.value === '') {
                currentNewsDesription.textContent = '';
                currentNewsDesription.dataset.value = '';
            } else {
                currentNewsDesription.dataset.value = editModalNewsTitleField.value;
                currentNewsDesription.textContent = editModalNewsTitleField.value;
                currentPlacementDate.dataset.value = editPlacementDateField.value;
                currentPlacementDate.textContent = editPlacementDateField.value;
            }
        };

        newsItems.forEach(newsItem => {
            newsItem.addEventListener('click',transferNewsDataToModal);
        });

        const ajaxSendNewsDescription = async (formData) => {
            const fetchResp = await fetch('../mail.php', {
                method: 'POST',
                body: formData
            });
            if (!fetchResp.ok) {
                throw new Error(`Ошибка! Cтатус ошибки ${fetchResp.status}`);
            }
            return await fetchResp.text();
        };

        const closeEditNewsModal = () => {
            newsItems.forEach(newsItem => {
                newsItem.classList.remove('currently-edited');
            });
            closeModal(editNewsModal,overlay);
        };
        

        function removeItem () {
            let removeItemButtons = document.querySelectorAll('.cabinet-news__button--delete-button');

            removeItemButtons.forEach(deleteButton => {
                deleteButton.addEventListener('click', (e) => {
                    e.currentTarget.closest('.cabinet-news__news-item').remove();
                })
            });
        };

        removeItem();

        
        editNewsForm.addEventListener('submit',(event) => {
            event.preventDefault();
            
            //AJAX
            const formData = new FormData(event.currentTarget);
            ajaxSendNewsDescription(formData)
                .then((response) => {
                    cabinetEditProductForm.reset();
                    //Pass response to setEditedDescription function. Edit function before passing
                })
                .catch((err) => console.error(err));

            if(editNewsModal.classList.contains('adding-news')) {
                addNews();
            } else {
                let currentNewsDesription = document.querySelector('.currently-edited').querySelector('.cabinet-news__article-name');
                let currentPlacementDate = document.querySelector('.currently-edited').querySelector('.cabinet-news__td--date');
                setEditedNewsParams(currentNewsDesription, currentPlacementDate);
            }
            closeEditNewsModal();
        });


        //Close modal
        cabinetEditNewsModalCloseButton.addEventListener('click', ()=> closeModal(editNewsModal,overlay));

        overlay.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeEditNewsModal(editNewsModal,overlay);
            };
        });


        //Init datapicker widget
        var datepickerStartPlacementTime = new Datepicker('#begin-news-placement-date', 
            {
                time: true,
                min: (function(){
                    var date = new Date();
                    date.setDate(date.getDate());
                    return date;
                  })(),
            }
        );

        var datepickerEndPlacementTime = new Datepicker('#end-news-placement-date', 
            {
                time: true,
                min: (function(){
                    var date = new Date();
                    date.setDate(date.getDate());
                    return date;
                  })(),
            }
        );


        ///upload image
        let el = document.getElementById('image-preview');
        function uploadCroppedImage() {
            let $uploadCrop;
    
            function readFile(input) {
                 if (input.files && input.files[0]) {
                    let reader = new FileReader();
                    
                    reader.onload = function (e) {
                        el.classList.remove('visually-hidden');
                        el.classList.add('ready');

                        $uploadCrop = new Croppie(el, {
                            viewport: { width: 100, height: 100 },
                            boundary: { width: 300, height: 300 },
                            showZoomer: true,
                            enableOrientation: true,
                            enableResize: true,
                        });

                        $uploadCrop.bind({
                            url: e.target.result,
                        }).then(function(){
                            console.log(' bind complete');
                        });
                    }
                    
                    reader.readAsDataURL(input.files[0]);
                }
                else {
                    swal("Sorry - you're browser doesn't support the FileReader API");
                }
            };
    
           uploadImageInput.addEventListener('change', function () { readFile(this); });
           cutImageButton.addEventListener('click', function (ev) {
                $uploadCrop.result('blob', {
                    type: 'canvas',
                    size: 'viewport'
                }).then(function (blob) {
                    uploadedImage.src = window.URL.createObjectURL(blob);
                    window.URL.createObjectURL(blob)
                    $uploadCrop.destroy();
                    el.classList.add('visually-hidden');
                });
            });
        };

        uploadCroppedImage();
    };
});





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
function contractDescription (descriptionsToContract, contractToWhatAmount) {
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


function switchOffOnItems (switchCheckbox, itemsElemsCollectionClass, itemsCheckboxClass, stasusFieldClass) {
    let itemsElemsCollection = document.querySelectorAll(itemsElemsCollectionClass);
            
    if(itemsElemsCollection[0]) {
        itemsElemsCollection.forEach(itemElem => {
            if (switchCheckbox.checked) {
                if(itemElem.querySelector(itemsCheckboxClass).checked && !itemElem.classList.contains('active')) {
                    itemElem.classList.add('active');
                    itemElem.querySelector(stasusFieldClass).textContent = 'Включено';
                };
            } else if (!switchCheckbox.checked) {
                if(itemElem.querySelector(itemsCheckboxClass).checked && itemElem.classList.contains('active')) {
                    itemElem.classList.remove('active');
                    itemElem.querySelector(stasusFieldClass).textContent = 'Выключено';
                };
            };
        });
    };
};

document.addEventListener('DOMContentLoaded', () => {
    let header = document.querySelector('.header');

    if(!header.classList.contains('header--cabinet-content-page') && !header.classList.contains('header--cabinet-main')) {
        let body = document.querySelector('body');
        let leftMainMenuArrow = document.querySelector('.main-menu__arrow-left');
        let righttMainMenuArrow = document.querySelector('.main-menu__arrow-right');
        let mainMenuContainer = document.querySelector('.main-menu');
        let mainMenuList = document.querySelector('.main-menu__list');
        let mainMenuLinks = document.querySelectorAll('.main-menu__link');
        let burgerOpenMenuButton = document.querySelector('.header__open-menu-burger');

        let headBottomContent = document.querySelector('.header__bottom-content');
        let submenu = document.querySelector('.main-submenu__sections');
        let mainMenuItems = document.querySelectorAll('.main-menu__item');
        let submenuSections = document.querySelectorAll('.main-submenu__section');
        let submenuCloseButton = document.querySelector('.main-submenu__close-button');


        const showHideMobileMenu = () => {
            if (mainMenuContainer.classList.contains('opened')) {
                mainMenuContainer.classList.remove('opened');
                burgerOpenMenuButton.classList.remove('active');
                body.style.overflow = 'auto';
                closeSubmenu();
            } else {
                mainMenuContainer.classList.add('opened');
                burgerOpenMenuButton.classList.add('active');
                body.style.overflow = 'hidden';
            }
        };

        const showHideMenuItems = (menuColumnClass,menuListClass,menuDotsClass, itemsAmountToShow) => {
            let menuColumns = document.querySelectorAll(menuColumnClass);

            menuColumns.forEach((item) => {
                let menuItemsAmount =  item.querySelectorAll(menuListClass).length;

                if (menuItemsAmount > itemsAmountToShow){
                    let currentListItems =  item.querySelectorAll(menuListClass);
                    let showMoreItemsDots = item.querySelector(menuDotsClass);
            
                    showMoreItemsDots.style.display = 'block';
            
                    currentListItems.forEach((listItem,index) => {
                        index > itemsAmountToShow - 1 && listItem.classList.add('hidden');
                    });
            
                    showMoreItemsDots.addEventListener('click', () => {
                        currentListItems.forEach((listItem,index) => {
                            if (index > itemsAmountToShow - 1) {
                                listItem.classList.remove('hidden');
                                showMoreItemsDots.style.display = 'none';
                            };
                        });
                    });
                } else {
                    item.querySelector(menuDotsClass).style.display = 'none';
                };
            });
        };

        const closeSubmenu = () => {
            const windowInnerWidth = document.documentElement.clientWidth;
            if (windowInnerWidth >= 576) {
                body.style.overflow = 'auto';
            } 
            
            headBottomContent.classList.remove('submenu-shown');
            submenu.style.display = 'none';
            mainMenuItems.forEach(item => item.classList.remove('active'));
            submenuSections.forEach(item => item.classList.remove('active'));
        };

        const showSubmenu = () => {
            for (let i = 0; i < mainMenuItems.length; i++) {
                mainMenuItems[i].addEventListener('click', (e) => {
                    body.style.overflow = 'hidden';
                    headBottomContent.classList.add('submenu-shown');
                    submenu.style.display = 'flex';
                    mainMenuItems.forEach(item => item.classList.remove('active'));
                    submenuSections.forEach(item => item.classList.remove('active'));
                    mainMenuItems[i].classList.add('active');
                    submenuSections[i].classList.add('active');
                })
            };    
        };


        //Scroll main menu when click on arrows
        leftMainMenuArrow.addEventListener('click', () => {
            easyScroll({
                'scrollableDomEle': mainMenuList,
                'duration': 300,
                'direction': 'left',
                'easingPreset': 'easeOutQuad'
            });
            
        });

        righttMainMenuArrow.addEventListener('click', () => {
            easyScroll({
                'scrollableDomEle': mainMenuList,
                'duration': 300,
                'direction': 'right',
                'easingPreset': 'easeOutQuad'
            });
        });

        //Show/hide main submenu/footer top menu items and hide dots
        showHideMenuItems('.menu-column','.menu-column__list-item', '.menu-column__show-more-dots', 5);

        //Show/hide search modal menu items and show dots instead
        showHideMenuItems('.search-modal__search-results-group','.search-modal__results-group-list-item', '.search-modal__show-more-search-items', 3);

        //Prevent following main menu links
        mainMenuLinks.forEach( (item) => {
            item.addEventListener('click', (e) => e.preventDefault());
        });

        //Show/hide mobile menu
        burgerOpenMenuButton.addEventListener('click', showHideMobileMenu);

        //Show submenu when click on menu item
        showSubmenu();

        //Hide submenu when click on close button 'X'
        submenuCloseButton.addEventListener('click', closeSubmenu);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.main_main-page')) {
        /*** Sliders ***/
        var glide = new Glide('#promo-slider', {
            type: 'carousel',
            focusAt: 'center',
            /* autoplay: 4000, */
            rewind:true,
            peek: 50,
            breakpoints: {
                576: {
                    peek: 25
                }
            }
        
        });
        
        glide.mount()
        
        
        var popularCategoriesSlider = new Glide('#popular-categories-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 6,
            gap: 16,
            breakpoints: {
                1200: {
                    perView: 5,
                },
                992: {
                    perView: 5,
                    peek: 25
                },
                960: {
                    perView: 4,
                    peek: 25
                },
                678: {
                    perView: 3,
                    peek: 25
                },
                576: {
                    perView: 2,
                    gap: 12,
                    peek: 40
                },
                425: {
                    focusAt: 'center',
                    peek: 65,
                    perView: 1,
                }
            }
        });
        
        popularCategoriesSlider.mount();
        
        
        var salesSlider = new Glide('#sales-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 4,
            gap: 16,
            breakpoints: {
                1100: {
                    perView: 3,
                }, 
                992: {
                    perView: 3,
                    peek: 25
                }, 
                767: {
                    perView: 2,
                    peek: 25
                },
                500: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 50
                },
                425: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 25
                },
            }
        });
        
        salesSlider.mount();
        
        
        var newsSlider = new Glide('#news-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 4,
            gap: 16,
            breakpoints: {
                1100: {
                    perView: 3,
                }, 
                992: {
                    perView: 3,
                    peek: 25
                }, 
                767: {
                    perView: 2,
                    peek: 25
                },
                500: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 50
                },
                425: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 25
                },
            }
        });
        
        newsSlider.mount();
        
        
        var shopsSlider = new Glide('#shops-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 6,
            gap: 16,
            breakpoints: {
                1200: {
                    perView: 5,
                },
                992: {
                    perView: 5,
                    peek: 25
                },
                960: {
                    perView: 4,
                    peek: 25
                },
                678: {
                    perView: 3,
                    peek: 25
                },
                576: {
                    perView: 2,
                    gap: 12,
                    peek: 40
                },
            
                425: {
                    focusAt: 'center',
                    peek: 65,
                    perView: 1,
                }
            }
        });
            
        shopsSlider.mount();
        
        
        var popularProductsSlider = new Glide('#popular-products-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 4,
            gap: 16,
            breakpoints: {
                1100: {
                    perView: 3,
                }, 
                992: {
                    perView: 3,
                    peek: 25
                }, 
                767: {
                    perView: 2,
                    peek: 25
                },
                500: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 50
                },
                425: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 25
                },
            }
        });
            
        popularProductsSlider.mount();
        
        
        var bestPerformersSlider = new Glide('#best-performers-slider', {
            type: 'carousel',
            rewind:true,
            startAt: 0,
            perView: 4,
            gap: 16,
            breakpoints: {
                1100: {
                    perView: 3,
                }, 
                992: {
                    perView: 3,
                    peek: 25
                }, 
                767: {
                    perView: 2,
                    peek: 25
                },
                500: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 50
                },
                425: {
                    focusAt: 'center',
                    perView: 1,
                    peek: 25
                },
            }
        });
            
        bestPerformersSlider.mount();
    };  
});
document.addEventListener('DOMContentLoaded', () => {
    let shopCardMap = document.querySelector('.shop-card-page-map');

    if(shopCardMap) {
        var map = L.map('map', {
        }).setView([53.8540, 27.4730], 12);

        var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="copyright">Openstreetmap</a>'
        }).addTo(map);

        var orangeIcon = L.icon ({
            iconUrl: './assets/images/map-marker-icon.png'
        })

        var marker1 = L.marker([53.85328, 27.42091], {
            icon: orangeIcon
          }).bindPopup('<p>ООО Новосёлкин<br />Меньковский тракт,2</p>').addTo(map).openPopup();
    };
});




document.addEventListener('DOMContentLoaded', () => {
    let shopCardPageMain = document.querySelector('.main--shop-card');

    if(shopCardPageMain) {
        var shopCardSlider = new Glide('#shop-card-slider', {
            type: 'carousel',
            focusAt: 'center',
            rewind: true,
            keyboard: false
        });
        
        shopCardSlider.mount()


        var shopCardGalleryCarousel = new Glide('#shop-card-gallery-carousel', {
            rewind:true,
            startAt: 0,
            perView: 4.6,
            gap: 16,
            keyboard: false,
            breakpoints: {
                1100: {
                    perView: 3.5,
                }, 
                992: {
                    perView: 3.2,
                }, 
                860: {
                    perView: 2.5,
                },
                620: {
                    perView: 2.2,
                },

                500: {
                    perView: 1.5,
                },
                425: {
                    perView: 1.2,
                },
            }
        });
        
        shopCardGalleryCarousel.mount();
        

        var shopCardCategoryCarousel = new Glide('#shop-card-categories-carousel', {
        /*  type: 'carousel', */
            rewind:true,
            startAt: 0,
            perView: 4.6,
            gap: 16,
            keyboard: false,
            breakpoints: {
                1100: {
                    perView: 3.5,
                }, 
                992: {
                    perView: 3.2,
                }, 
                860: {
                    perView: 2.5,
                },
                620: {
                    perView: 2.2,
                },

                500: {
                    perView: 1.5,
                },
                425: {
                    perView: 1.2,
                },
            }
        });
        
        shopCardCategoryCarousel.mount();

        //baguetteBox gallery
        baguetteBox.run('.shop-card__slides', {
            noScrollbars: true,
            buttons: true
        });

        baguetteBox.run('.shop-card-gallery__carousel-slides', {
            noScrollbars: true,
            buttons: true
        });
    };
});




document.addEventListener('DOMContentLoaded', () => {
    let shopsPageMap = document.querySelector('.shops-page-content__map-content');

    if(shopsPageMap) {
        

        if(window.innerWidth > 700) {
            var map = L.map('map', {
            }).setView([53.8540, 27.4730], 12);
        } else {
            var map = L.map('map', {
            }).setView([53.91, 27.55], 10.5);
        }

        var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="copyright">Openstreetmap</a>'
        }).addTo(map);

        var orangeIcon = L.icon ({
            iconUrl: './assets/images/map-marker-icon.png'
        });
        
        var adressPoints = [
            [53.85328, 27.42091, "<p>ООО Новосёлкин<br/>Меньковский тракт, 2</p>"],
            [53.90623, 27.47734, "<p>ООО Новосёлкин<br/>Притыцкого, 43</p>"],
            [53.86624, 27.67048, "<p>ООО Новосёлкин<br/>Варвашени, 6</p>"],
            [53.88734, 27.43435, "<p>ООО Новосёлкин<br/>Сухаревская, 26</p>"],
            [53.86325, 27.56622, "<p>ООО Новосёлкин<br/>Якуба Коласа, 43 к.1</p>"],
        ]
        var markerList = [];

        for (var i = 0; i < adressPoints.length; i++) {
            var a = adressPoints[i];
            var title = a[2];
            var marker = L.marker(L.latLng(a[0], a[1]),{icon: orangeIcon}, { title: title });
            marker.bindPopup(title);
            markerList.push(marker);
        }

        var group = L.layerGroup(markerList)
            .addTo(map); 
    };
});



