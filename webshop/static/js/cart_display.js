$(document).ready(() => {

    console.log('jQuery/AllDisplay-OK');

    const userId = $('#user_id').val();
    console.log('AllUserID - ' + userId);

            $.ajax({
                url: '/items/ajax_cart_display',
                data: `uid=${userId}`,
                success: (result) => {
                    console.log('AJAX-ALL - OK');
                    //
                    console.log('uid_back - OK' + result.uid_back);
                    console.log('Count: ' + result.count);
                    console.log('Amount: ' + result.amount);
                    //
                    $('#cart-count').text(result.count);
                    $('#cart-summary').find('h5').text(result.amount + ' товарів обрано');
                    $('.cart-summary').find('h4').text('Вартість: ' + result.amount + ' грн.');
                }
            })

});