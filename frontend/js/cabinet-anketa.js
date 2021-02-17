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