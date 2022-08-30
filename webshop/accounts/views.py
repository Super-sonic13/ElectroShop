from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def sign_up(request):
    if request.method == "GET":
        return render(request, 'accounts/sign_up.html', context={
            'title': 'Реєстрація'
        })
    if request.method == "POST":
        login_x = request.POST.get('login')
        email_x = request.POST.get('email')
        pass1_x = request.POST.get('pass1')
        pass2_x = request.POST.get('pass2')

        color = 'gray'
        message ='default'

        if pass1_x!=pass2_x:
            color = 'red'
            message = 'Паролі не співпадають'
        elif pass1_x == '':
            color = 'red'
            message = 'Пароль пустий'
        else:
            new_user = User.objects.create_user(login_x,email_x,pass1_x)

            if new_user is None:
                color = 'red'
                message = 'Не вдалось зареєструватись'
            else:
                new_user.save()
                color = 'green'
                message = 'Реєстрацію успішно завершено'

        return render(request, 'accounts/report.html', context={
            'title': 'Звіт про реєстрацію',
            'color': color,
            'message': message
        })


def ajax_reg(request):
    login_y = request.GET.get('login')
    try:
        User.objects.get(username=login_y)
        message = 'зайнятий'
    except User.DoesNotExist:
        message = 'вільний'

    return JsonResponse({
        'message': message
    })



def sign_in(request):
    if request.method == "GET":
        return render(request, 'accounts/sign_in.html', context={
            'title': 'Вхід'
        })
    if request.user.is_authenticated:
        return render(request, 'home/index.html', context={
            'title': 'Головна'
        })
    else:
        if request.method == "POST":
            login_x = request.POST.get('login')
            password = request.POST.get('pass')
            user = authenticate(request, username=login_x, password=password)

            if user is not None:
                login(request, user)
                color = 'green'
                message = 'Вхід успішний'
            else:
                color = 'red'
                message = 'Пароль або логін введені не правильно!'


            return render(request, 'accounts/report.html', context={
                'title': 'Звіт про вхід',
                'color': color,
                'message': message
            })

def sign_out(request):
    logout(request)
    return render(request, 'accounts/sign_in.html', context={
        'title': 'Вхід'
    })


def profile(request):
    if request.user.is_authenticated:
        if request.method == "GET":
            return render(request, 'accounts/profile.html', context={
                'title': 'Профіль'
            })
        else:
            return render(request, 'accounts/sign_in.html', context={
                'title': 'Вхід'
            })