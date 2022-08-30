from django.shortcuts import render
from django.http import JsonResponse
from .models import Item


def index(request):
    # Перегляд кошику

    return render(request, 'items/index.html', context={
        'title': 'Перегляд уподобаних товарів',
        'user_items': Item.objects.filter(user_id=request.user.id),

    })


def ajax_cart(request):
    response = dict()

    response['test'] = 'test-OK'


    # 1 - Oтримуємо значення get-параметрів із AJAX-запиту
    uid = request.GET.get('uid')
    pid = request.GET.get('pid')
    price = request.GET.get('price')

    # 2 - Oтримуємо значення get-параметрів із AJAX-запиту
    response['uid'] = f'UID: {uid}'
    response['pid'] = f'PID: {pid}'
    response['price'] = f'PRICE: {price}'

    # 3 - Зберігаємо обраний товар в БД
    Item.objects.create(
        user_id=uid,
        product_id=pid,
        status='Очікування замовлення',
    )
    response['create_mess'] = 'Товар збережений'

    # 4 -
    user_items = Item.objects.filter(user_id=uid)

    # 5 -
    amount = 0
    for item in user_items:
        amount += item.product.price

    # 6 -
    response['count'] = len(user_items)
    response['amount'] = amount

    # 7 -
    return JsonResponse(response)


def ajax_cart_display(request):

    # Oтримуємо значення get-параметрів із AJAX-запиту
    uid = request.GET.get('uid')

    user_items = Item.objects.filter(user_id=uid)

    s = 0
    for item in user_items:
        s += 1

    return JsonResponse({
        'uid_back': uid,
        'amount': s,
        'count': len(user_items)
    })


def ajax_del_item(request):
    item_id = request.GET['item_id']
    del_item = Item.objects.get(id=item_id)
    del_item.delete()
    return JsonResponse({
        'report': f'Товар із ID {item_id} буде видалений із кошика'
    })
