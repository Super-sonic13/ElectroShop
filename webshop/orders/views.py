from django.shortcuts import render
from django.core.mail import send_mail
from .models import Item


def bill(request, sel_list:str):
    if request.method == 'GET':
        sel_list_str_array = sel_list.split(',')
        sel_list_num_array = [int(x) for x in sel_list_str_array[:-1]]
        total_price = int(sel_list_str_array[-1])
        final_list = []
        #
        # Створюємо моделі Покупки (Purchase) та Замовлення (Order)
        for item_id in sel_list_num_array:
            item = Item.objects.get(id=item_id)
            final_list.append({
                'product_name': item.product.name,
                'category_name': item.product.category.name,
                'product_price': item.product.price,
                'product_photo': item.product.picture,
            })
        #
        return render(request, 'orders/bill.html', {
            'title': 'Оформлення замовлення',
            'total_price': total_price,
            'final_list': final_list,
            'init_list': sel_list,
        })


def confirm(request, init_list: str):
    if request.method == 'GET':
        return render(request, 'orders/confirm.html', {
            'title': 'Оформлення замовлення',
            'init_list': init_list,
        })
    elif request.method == 'POST':
        email = request.POST['email']

        sel_list_str_array = init_list.split(',')
        sel_list_num_array = [int(x) for x in sel_list_str_array[:-1]]
        total_price = int(sel_list_str_array[-1])
        info_list = []

        for item_id in sel_list_num_array:
            item = Item.objects.get(id=item_id)
            info_list.append({
                'product_name': item.product.name,
                'category_name': item.product.category.name,
                'product_price': item.product.price,
            })

        subject = 'Повідомлення про замовлення на сайті Webshop'
        body = '''
            <h1>Повідомлення про замовлення</h1>
            <hr />
            <h2 style="color: purple">Ви підтвердили замовлення</h2>
            <h3>
            <ol>
        '''
        #
        for info in info_list:
            body+=f'''
                <li>{info.get('product_name')} / {info.get('category_name')} - {info.get('product_price')} грн.</li>
            '''

        body += f'''
            </ol>
            </h3> 
            <hr /> 
            <h2>Загальна сума для сплати: <span style="color: red">{total_price}</span>
        '''
        success = send_mail(subject, '', 'Webshop', [email], fail_silently=False)
        if success:
            return render(request, 'orders/thanks.html', {
                'title': 'Подяка за замовлення',
                'email': email,
            })
        else:
            return render(request, 'orders/failed.html', {
                'title': 'Помилка поштового відправлення',
            })