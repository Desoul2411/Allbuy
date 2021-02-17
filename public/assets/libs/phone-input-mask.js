function phoneMask(phoneInputClass) {
    var phoneInputElement = document.querySelector(phoneInputClass)
    phoneInputElement.addEventListener('keydown', function(event) {
    if( !(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
        var mask = '+375 (11) 111-11-11'; // Задаем маску
    
        if (/[0-9\+\ \-\(\)]/.test(event.key)) {
            var currentString = this.value;
            var currentLength = currentString.length;
            if (/[0-9]/.test(event.key)) {
                if (mask[currentLength] == '1') {
                    this.value = currentString + event.key;
                } else {
                    for (var i=currentLength; i<mask.length; i++) {
                    if (mask[i] == '1') {
                        this.value = currentString + event.key;
                        break;
                    }
                    currentString += mask[i];
                    }
                }
            }
        } 
    });
};