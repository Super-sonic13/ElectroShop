$(document).ready(() => {

    console.log('DEL-item-OK');

    $('.del-btn').click((event) => {
        let itemId = $(event.target).prev().val();
        $.ajax({
            url: '/items/ajax_del_item',
            data: 'item_id='+ itemId,
            success: (result) => {
                alert(result.report);
                window.location = '/items';
            }
        })
    })

});