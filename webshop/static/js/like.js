$(document).ready(() => {

    console.log('jQuery-OK');

    $('.products').on('click', '.add-to-wishlist', (event) => {
        console.log('add-to-wishlist-OK');

        let productId = $(event.target).prev().val();
        let productName = $(event.target).parent().prev().find('h3').text();
        let productPrice = $(event.target).parent().prev().find('h4').text();

        productPrice = parseFloat(productPrice);

        let oldLikeCount = parseInt($('#wish-count').text());
        let newLikeCount = oldLikeCount + 1;
        $('#wish-count').text(newLikeCount);
        console.log('productId: ' + productId);
        console.log('productName: ' + productName);
        console.log('productPrice: ' + productPrice);

    });

});