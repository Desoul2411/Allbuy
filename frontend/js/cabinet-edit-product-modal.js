document.addEventListener('DOMContentLoaded', () => {

    const cabinetEditProductModal = document.querySelector('.modal-edit-product-description');

    if (cabinetEditProductModal) {
        let overlay = document.querySelector('.modal-overlay');
        let cabinetEditProductForm = document.querySelector('.modal-edit-product-description__form');
        let cabinetEditProductModal = document.querySelector('.modal-edit-product-description');
        let cabinetProductDescriptions = document.querySelectorAll('.cabinet-product__item-description-text');
        let cabinetEditProductModalCloseButton = document.querySelector('.modal-ask-question__close-button');
        let modalTextField = document.querySelector('.modal-edit-product-description__text-field');
        

        contractDescription(cabinetProductDescriptions,60);

        const closeEditProductModal = () => {
            cabinetProductDescriptions.forEach(descriptionItem => {
                descriptionItem.classList.remove('currently-edited');
            });
            closeModal(cabinetEditProductModal,overlay);
            contractDescription(cabinetProductDescriptions,60);
        }

        const ajaxSendNewProductDescription = async (formData) => {
            const fetchResp = await fetch('../mail.php', {
                method: 'POST',
                body: formData
            });
            if (!fetchResp.ok) {
                throw new Error(`Ошибка! Cтатус ошибки ${fetchResp.status}`);
            }
            return await fetchResp.text();
        };

        const setEditedDescription = (currentDesription) => {
            if(modalTextField.value === '') {
                currentDesription.textContent = 'Изменить';
                currentDesription.dataset.value = '';
            } else {
                currentDesription.dataset.value = modalTextField.value;
                currentDesription.textContent = modalTextField.value;
                contractDescription(cabinetProductDescriptions);
            }
        };

        cabinetProductDescriptions.forEach(descriptionItem => {
            descriptionItem.addEventListener('click', (event)=> {
                openModal(cabinetEditProductModal,overlay);

                let currentDescriptionText = event.target.dataset.value;
                event.target.classList.add('currently-edited');
                
                if(currentDescriptionText === 'Изменить') {
                    modalTextField.value = ''
                } else {
                    modalTextField.value = currentDescriptionText;
                }
            });
        });

        cabinetEditProductForm.addEventListener('submit',(event) => {
            event.preventDefault();
            let currentDesription = document.querySelector('.currently-edited');
            
            //AJAX
            const formData = new FormData(event.currentTarget);
            ajaxSendNewProductDescription(formData)
                .then((response) => {
                    cabinetEditProductForm.reset();
                    //Pass response to setEditedDescription function. Edit function before passing
                })
                .catch((err) => console.error(err));

            setEditedDescription(currentDesription);
            closeEditProductModal();
        });

        cabinetEditProductModalCloseButton.addEventListener('click', closeEditProductModal);

        overlay.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeEditProductModal();
            };
        });
    };
});