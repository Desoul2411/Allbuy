document.addEventListener('DOMContentLoaded', () => {

    const cabinetEditFeedbacksModal = document.querySelector('.modal-edit-feedback');

    if (cabinetEditFeedbacksModal) {
        let overlay = document.querySelector('.modal-overlay');
        let editFeedbackForm = document.querySelector('.modal-edit-feedback__form');
        let cabinetEditFeedbacktModalCloseButton = document.querySelector('.modal-edit-feedback__close-button')
        let feedbackItems = document.querySelectorAll('.cabinet-feedbacks__feedbacks-item');
        let editFeedbackModalFeedbackAuthor = document.querySelector('.modal-edit-feedback__author-name');
        let editFeedbackModalFeedbackStatus = document.querySelector('.modal-edit-feedback__select--feedback-status');
        let editFeedbackModalFeedbackText = document.querySelector('.modal-edit-feedback__feedback-text');


        const closeEditFeedbacksModal = () => {
            feedbackItems.forEach(feedbackItem => {
                feedbackItem.classList.remove('currently-edited');
            });
            closeModal(cabinetEditFeedbacksModal,overlay);
        };

        const transferFeedbackDataToModal = (event) => {
            if(event.target.classList.contains('cabinet-feedbacks__button--settings-button') || event.target.tagName === 'path') {
                openModal(cabinetEditFeedbacksModal,overlay);
                let currentFeedbackText = event.currentTarget.querySelector('.cabinet-feedbacks__td--feedback-text').dataset.value;
                let currentFeedbackAuthor = event.currentTarget.querySelector('.cabinet-feedbacks__td--author').textContent;
                let currentFeedbackStatus = event.currentTarget.querySelector('.cabinet-feedbacks__td--status').textContent;

                event.currentTarget.classList.add('currently-edited');
                editFeedbackModalFeedbackAuthor.textContent = currentFeedbackAuthor;
                editFeedbackModalFeedbackText.textContent = currentFeedbackText;

                for (let i = 0; i < editFeedbackModalFeedbackStatus.options.length; i++) {
                    if(editFeedbackModalFeedbackStatus.options[i].value === currentFeedbackStatus) {
                        editFeedbackModalFeedbackStatus.options[i].selected = 'true';
                    }
                }; 
            };
        };

        feedbackItems.forEach(feedbackItem => {
            feedbackItem.addEventListener('click', transferFeedbackDataToModal);
        });

        const ajaxSendFeedbackData = async (formData) => {
            const fetchResp = await fetch('../mail.php', {
                method: 'POST',
                body: formData
            });
            if (!fetchResp.ok) {
                throw new Error(`Ошибка! Cтатус ошибки ${fetchResp.status}`);
            }
            return await fetchResp.text();
        };

        const setEditedFeedbackActiveStatus = (currentFeedbackItem,editedFeedbackActiveStatusValue) => {
            if (editedFeedbackActiveStatusValue === 'Выключено' && currentFeedbackItem.classList.contains('active')) {
                currentFeedbackItem.classList.remove('active');
            } else if (editedFeedbackActiveStatusValue === 'Включено' && !currentFeedbackItem.classList.contains('active')) {
                currentFeedbackItem.classList.add('active');
            };
            let currentFeedbackActiveStatus = currentFeedbackItem.querySelector('.cabinet-feedbacks__td--status');
            currentFeedbackActiveStatus.textContent = editedFeedbackActiveStatusValue;
        }; 

        editFeedbackForm.addEventListener('submit',(event) => {
            event.preventDefault();
            let currentFeedbackItem = document.querySelector('.currently-edited');
            let editedFeedbackActiveStatusValue = editFeedbackModalFeedbackStatus.value;
            
            //AJAX
            const formData = new FormData(event.currentTarget);
            ajaxSendFeedbackData(formData)
                .then((response) => {
                    cabinetEditProductForm.reset();
                    //Pass response to setEditedDescription function. Edit function before passing
                })
                .catch((err) => console.error(err));

            setEditedFeedbackActiveStatus(currentFeedbackItem,editedFeedbackActiveStatusValue);
            closeEditFeedbacksModal();
        });

        cabinetEditFeedbacktModalCloseButton.addEventListener('click', closeEditFeedbacksModal);

        overlay.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeEditFeedbacksModal();
            };
        });
    };
});