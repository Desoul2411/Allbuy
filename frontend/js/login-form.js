document.addEventListener('DOMContentLoaded', () => {
    let loginForm = document.querySelector('.login__form');

    if(loginForm) {
        const ajaxSend = async (formData) => {
            const fetchResp = await fetch('../mail.php', {
                method: 'POST',
                body: formData
            });
            if (!fetchResp.ok) {
                throw new Error(`Ошибка! Cтатус ошибки ${fetchResp.status}`);
            }
            return await fetchResp.text();
        };
        
        
        
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
        
            ajaxSend(formData)
                .then((response) => {
                    loginForm.reset(); // очищаем поля формы 
                })
                .catch((err) => console.error(err))
        });
    };
});



