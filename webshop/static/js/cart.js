$(document).ready(() => {

    console.log('jQuery-OK');

    $('.products').on('click', '.add-to-cart-btn', (event) => {
        console.log('addToCart-btn-OK');

        const userId = $('#user_id').val();
        console.log('User-ID: ' + userId)
        //*
        if (userId == 'None'){
            alert('Для використання кошика Ви повинні авторизуватись');
            window.location = '/accounts/sign_in'
        }else{
            let productId = $(event.target).prev().val();
            let productName = $(event.target).parent().prev().find('h3').text();
            let productPrice = $(event.target).parent().prev().find('h4').text();

            console.log('productId: ' + productId);
            console.log('productName: ' + productName);
            console.log('productPrice: ' + productPrice);

            //Відправка Ajax-запиту до БД
            $.ajax({
                url: '/items/ajax_cart',
                data: `uid=${userId}&pid=${productId}&price=${productPrice}`,
                success: (result) => {
                    console.log('AJAX Work OK');
                    console.log(result.test);
                    //
                    console.log(result.uid);
                    console.log(result.pid);
                    console.log(result.price);
                    console.log(result.create_mess);
                    //
                    $('#cart-count').text(result.count);
                    $('#cart-summary').find('h5').text(result.amount + ' товарів обрано');
                    $('.cart-summary').find('h4').text('Вартість: ' + result.amount + ' грн.');
                }
            })
        }
        /*
        let oldCartCount = parseInt($('#cart-count').text());
        let newCartCount = oldCartCount + 1;
        $('#cart-count').text(newCartCount);
        $('.cart-summary').find('h5').text(newCartCount + ' Товарів обрано');

        let oldCartPrice = $('.cart-summary').find('h4').text().split(':')[1];
        oldCartPrice = parseFloat(oldCartPrice);
        let newCartPrice = oldCartPrice + productPrice;
        $('.cart-summary').find('h4').text('Вартість: ' + newCartPrice + ' грн.');
    */
    });
});