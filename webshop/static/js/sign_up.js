function example(){
    // 1 - Вікно повідомлень:
    alert('Базове вікно повідомлень');

    // 2 - Вікно повідомлень:
    console.log('Базове вікно повідомлень');

    // 3 - Вікно повідомлень:
    let client = prompt('Базове вікно повідомлень');
    console.log('Базове вікно повідомлень');

    // 4 - Вікно повідомлень:
    let choice = confirm('Базове вікно повідомлень');
    if (choice == true){
        window.location('https://www.ukr.net')
    }else{
        console.log('Ну і не треба');
    };
}

$(document).ready(() => {

    console.log('jQuery -> OK');

    let result1 = false;    // валідація логіну
    let result2 = false;    // валідація емейлу
    let result3 = false;    // валідація паролю
    let result4 = false;    // валідація паролю2

    // 1 - валідація логіну:
    // ---------------------
    $('#login').blur(() => {
        console.log('#login-blur -> OK');
        let loginX = $('#login').val();
        console.log('loginX ->' + loginX);

        let loginRe = /^[a-zA-Z][a-zA-Z0-9_\-\.]{5,15}$/;
        if (loginRe.test(loginX)){
            // Перевірка зайнятасті
            $.ajax({
                url: '/accounts/ajax_reg',
                data: 'login=' + loginX,
                success: (result) => {
                    console.log('AJAX -> OK');
                    console.log(result.message);
                    if(result.message === 'зайнятий'){
                        $('#login_err').text('Логін зайнятий');
                        result = false;
                    }else{
                        $('#login_err').text('');
                        result = false;
                    }
                }
            })
        }else{
            if(){

            }else{

            }
        }
    })


    // 2 - валідація 1 паролю:
    // ---------------------
    $('#login').blur(() => {
        console.log('#pass1-blur -> OK');
        let loginX = $('#pass1').val();
        console.log('pass1X ->' + loginX);

        let loginRe = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z][a-zA-Z0-9_\-\.]{8,15}$/;
        if (loginRe.test(loginX)){
            $('#pass1_err').text('');
            result1 = true;
        }else{
            $('#pass1_err').text('');
            result2 = true;
        }
    })


    // 3 - валідація 2 паролю:
    // ---------------------
    $('#login').blur(() => {
        console.log('#pass1-blur -> OK');
        let loginX = $('#pass1').val();
        console.log('pass1X ->' + loginX);
        if (loginRe.test(loginX)){
            $('#pass2_err').text('');
            result1 = true;
        }else{
            $('#pass2_err').text('Паролі не співпадають');
            result2 = true;
        }
    })


    // 4 - валідація Емейл:
    // ---------------------

    result4 = true
    $('#email').click(() => {
        console.log('#email -> OK');
        let email = $('#email').val();
        console.log('email ->' + email);
        if (result1 && result2 && result3 && result4){
            $('#email').attr('onsubmit', 'return true');
            result1 = true;
            // Перевірка зайнятасті
            $.ajax({
                url: '/accounts/ajax_reg',
                data: 'email=' + email,
                success: (result) => {
                    console.log('AJAX -> OK');
                    console.log(result.message);
                    if(result.message === 'зайнятий'){
                        $('#email_err').text('Логін зайнятий');
                        result = false;
                    }else{
                        $('#email_err').text('');
                        result = false;
                    }
                }
            })
        }else{
            $('#email').attr('onsubmit', 'return false');
            alert('Форма містить');
        }
    })

})