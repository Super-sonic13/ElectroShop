const doCalculate = () => {
    let checkedCells = $('.check:checked');
    let totalPrice = 0;
    let cellItemsList = '';
    // 2
    for (let cell of checkedCells) {
        let parent = $(cell).parent().parent();
        totalPrice += parseFloat($(parent).find('td.price_cell').text());
        cellItemsList += $(parent).find('td.id_cell').text() + ',';
    }
    cellItemsList += totalPrice;
    // 3
    console.log(`totalPrice = ${totalPrice}`);
    console.log(`cellItemsList = ${cellItemsList}`);
    $('#total').text(`${totalPrice.toFixed(1)} грн.`);
    $('#bill-btn').attr('href', `/orders/bill/${cellItemsList}`);
}

$(document).ready(() => {
    // 1
    console.log('calc_items - start');
    doCalculate();
    // 2
    $('.check').click((event) => {
        console.log('INPUT_CHECK -> click');
        doCalculate();
    })

})