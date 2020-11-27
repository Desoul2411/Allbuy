let loginForm = document.querySelector('.login__form');

if(loginForm) {

    const ajaxSend = (formData) => {
        fetch('../mail.php', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(formData)
        }).then(response => console.log(response))
        .catch(error => console.error(error))
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('fetch')
        let formData = new FormData(this);
        formData = Object.fromEntries(formData);  // create JSON
        ajaxSend(formData);
	    this.reset(); // reset form fields
        
    })
}
