document.addEventListener('DOMContentLoaded', () => {
    let cabinetPaymentMethodsForm = document.querySelector('.cabinet-content__payment-methods-form');

    if(cabinetPaymentMethodsForm) {
        let paymentMethodCheckboxes = cabinetPaymentMethodsForm.querySelectorAll('.cabinet-content__checkbox');
        let paymentMethodDescriptions = document.querySelectorAll('.cabinet-content__option-description');

        const showDescriptionAccordeon = (checkboxes, descriptions) => {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].addEventListener('change', ()=> {
                    if(checkboxes[i].checked) {
                        let descriptionHeight = descriptions[i].querySelector('.cabinet-content__option-description-wrapper').clientHeight;
                        descriptions[i].style.height = descriptionHeight + 'px';
                    } else {
                        descriptions[i].style.height = 0;
                    }
                });
            };
        };

        showDescriptionAccordeon(paymentMethodCheckboxes,paymentMethodDescriptions);
    };
});