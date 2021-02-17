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




