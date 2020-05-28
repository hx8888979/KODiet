from django.http import HttpResponse
from pathlib import Path

from django.shortcuts import render

from util.message import homeMessage
from .models import AccountInfo, Account
from login.models import Session
from django.core.exceptions import ValidationError


# Create your views here.
def home(request):
    if request.method == 'POST':
        try:
            if 'sessionID' in request.POST:
                session = Session.objects.get(sessionID=request.POST['sessionID'])
                accountinfo, isCreated = AccountInfo.objects.get_or_create(account=session.account)
                if isCreated:
                    accountinfo.save()
                return HttpResponse(
                    homeMessage(str(accountinfo.avatar), accountinfo.account.nickname, accountinfo.level,
                                accountinfo.coin, accountinfo.height, accountinfo.weight, accountinfo.BMI))
        except Session.DoesNotExist:
            return HttpResponse('Session invalid')

    return HttpResponse('Invalid API operation')


def updateAvatar(request):
    if request.method == 'POST':
        try:
            if 'sessionID' in request.POST:
                session = Session.objects.get(sessionID=request.POST['sessionID'])
                if 'avatar' in request.FILES:
                    accountinfo = AccountInfo.objects.get(account=session.account)
                    uploadedFile = request.FILES['avatar']
                    uploadedFile.name = str(accountinfo.account.id) + Path(uploadedFile.name).suffix
                    accountinfo.avatar = uploadedFile
                    accountinfo.clean_fields()
                    accountinfo.save()
                    return HttpResponse('{"isAvatarUpdated": true}')
        except Session.DoesNotExist:
            return HttpResponse('Session invalid')
        except AccountInfo.DoesNotExist:
            return HttpResponse('Has no accountInfo')
        except ValidationError as e:
            return HttpResponse('{{"isAvatarUpdated": false, "message": {error}}}'.format(error=e))
    return HttpResponse('Invalid API operation')


def updateInfo(request):
    if request.method == 'POST':
        try:
            if 'sessionID' in request.POST:
                session = Session.objects.get(sessionID=request.POST['sessionID'])
                accountinfo = AccountInfo.objects.get(account=session.account)
                if 'nickname' in request.POST:
                    account = Account.objects.get(id=session.account.id)
                    account.nickname = request.POST['nickname']
                    account.save()
                if 'height' in request.POST:
                    accountinfo.height = int(request.POST['height'])
                    accountinfo.BMI = round(accountinfo.weight / (accountinfo.height ** 2) * 10000)
                if 'weight' in request.POST:
                    accountinfo.weight = int(request.POST['weight'])
                    accountinfo.BMI = round(accountinfo.weight / (accountinfo.height ** 2) * 10000)
                accountinfo.save()
                return HttpResponse('{"isInfoUpdated": true}')
        except Session.DoesNotExist:
            return HttpResponse('Session invalid')
        except AccountInfo.DoesNotExist:
            return HttpResponse('Has no accountInfo')
    return HttpResponse('Invalid API operation')


def dietTable(request):
    breakfast_time, lunch_time, dinner_time = '8:00am', '11:30am', '6:00pm'
    data = {
        'meals': [
            {'id': 0, 'src': 'breakfast/0.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 1, 'src': 'lunch/0.jpg', 'title': 'Lunch',
             'content': 'One type Fruit only (Avoid Dates,Grapes,Mangoes,Bananas)', 'time': lunch_time},
            {'id': 2, 'src': 'dinner/0.jpg', 'title': 'Dinner',
             'content': 'Grilled Meat without Fat (Avoid Lamb)', 'time': dinner_time},
            {'id': 3, 'src': 'breakfast/1.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 4, 'src': 'lunch/1.jpg', 'title': 'Lunch',
             'content': 'Chicken (Bolled/Grilled,no Skin) Tomatoes, 1Orange/GrapeFruit', 'time': lunch_time},
            {'id': 5, 'src': 'dinner/1.jpg', 'title': 'Dinner',
             'content': '2 Boiled Eggs, 1BrownToast, 1Orange/Grape Fruit, Green Salad', 'time': dinner_time},
            {'id': 6, 'src': 'breakfast/2.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 7, 'src': 'lunch/2.jpg', 'title': 'Lunch',
             'content': 'White Cheese (skimmed) (e.g. Cottage, IToast, Tomatoes', 'time': lunch_time},
            {'id': 8, 'src': 'dinner/2.jpg', 'title': 'Dinner',
             'content': 'Grilled Meat without Fat (Avoid Lamb)', 'time': dinner_time},
            {'id': 9, 'src': 'breakfast/3.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 10, 'src': 'lunch/3.jpg', 'title': 'Lunch',
             'content': 'One type Fruit only (Avoid Dates,Grapes,Mangoes,Bananas)', 'time': lunch_time},
            {'id': 11, 'src': 'dinner/3.jpg', 'title': 'Dinner',
             'content': 'Grilled Meat, Green Salad', 'time': dinner_time},
            {'id': 12, 'src': 'breakfast/4.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 13, 'src': 'lunch/4.jpg', 'title': 'Lunch',
             'content': '2 Boiled Eggs, Boiled Vegetables', 'time': lunch_time},
            {'id': 14, 'src': 'dinner/4.jpg', 'title': 'Dinner',
             'content': 'Fish (Boiled or Grilled), Green Salad, 1Orange Grape Fruit', 'time': dinner_time},
            {'id': 15, 'src': 'breakfast/5.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 16, 'src': 'lunch/5.jpg', 'title': 'Lunch',
             'content': 'One type Fruit only (Avoid Dates, Grapes, N Mangoes, Bananas)', 'time': lunch_time},
            {'id': 17, 'src': 'dinner/5.jpg', 'title': 'Dinner',
             'content': 'Grilled Meat, Green Salad', 'time': dinner_time},
            {'id': 18, 'src': 'breakfast/6.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 19, 'src': 'lunch/6.jpg', 'title': 'Lunch',
             'content': 'Chicken (as Before), Boiled Vegetables, Tomatoes, 1O range/GrapeFruit', 'time': lunch_time},
            {'id': 20, 'src': 'dinner/6.jpg', 'title': 'Dinner',
             'content': 'Boiled Vegetables', 'time': dinner_time},
            {'id': 21, 'src': 'breakfast/0.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 22, 'src': 'lunch/0.jpg', 'title': 'Lunch', 'content': 'Two Boiled Eggs, Green Salad',
             'time': lunch_time},
            {'id': 23, 'src': 'dinner/0.jpg', 'title': 'Dinner', 'content': 'Two Boiled Eggs, 1 Orange / Grape Fruit ',
             'time': dinner_time},
            {'id': 24, 'src': 'breakfast/1.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 25, 'src': 'lunch/1.jpg', 'title': 'Lunch', 'content': 'Grilled Meat. Green Salad ',
             'time': lunch_time},
            {'id': 26, 'src': 'dinner/1.jpg', 'title': 'Dinner', 'content': '2 Boiled Eggs, 1 Orange / Grape Fruit ',
             'time': dinner_time},
            {'id': 27, 'src': 'breakfast/2.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 28, 'src': 'lunch/2.jpg', 'title': 'Lunch', 'content': 'Grilled Meat, Cucumber ',
             'time': lunch_time},
            {'id': 29, 'src': 'dinner/2.jpg', 'title': 'Dinner', 'content': '2 Boiled Eggs, Boiled Vegetables ',
             'time': dinner_time},
            {'id': 30, 'src': 'breakfast/3.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 31, 'src': 'lunch/3.jpg', 'title': 'Lunch',
             'content': '2 Boiled Eggs, White Cheese (skimmed), Boiled Vegetables ', 'time': lunch_time},
            {'id': 32, 'src': 'dinner/3.jpg', 'title': 'Dinner',
             'content': '2 Boiled Eggs, Tomatoes, Boiled Vegetables ', 'time': dinner_time},
            {'id': 33, 'src': 'breakfast/4.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 34, 'src': 'lunch/4.jpg', 'title': 'Lunch', 'content': 'Fish or Shrimp (boiled - Grilled)',
             'time': lunch_time},
            {'id': 35, 'src': 'dinner/4.jpg', 'title': 'Dinner', 'content': '2 Boiled Eggs, Boiled Vegetables',
             'time': dinner_time},
            {'id': 36, 'src': 'breakfast/5.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 37, 'src': 'lunch/5.jpg', 'title': 'Lunch',
             'content': 'Grilled Meat. Tomatoes, 1 Orange / Grape Fruit ', 'time': lunch_time},
            {'id': 38, 'src': 'dinner/5.jpg', 'title': 'Dinner',
             'content': 'Mix of Fruits (Avoid Dates, Grapes,Mangoes,Bananas) ', 'time': dinner_time},
            {'id': 39, 'src': 'breakfast/6.jpg', 'title': 'Breakfast',
             'content': 'Half Grape Fruit Half Orange, with 1 or 2 Boiled eggs', 'time': breakfast_time},
            {'id': 40, 'src': 'lunch/6.jpg', 'title': 'Lunch',
             'content': 'Chicken(Bld/Grl,noSkin), Boiled Vegetables, Tomatoes,1Orange/GrapeFruit ',
             'time': lunch_time},
            {'id': 41, 'src': 'dinner/6.jpg', 'title': 'Dinner',
             'content': 'Chicken(Bld/Grl,noSkin), Boiled Vegetables, Tomatoes,1Orange/GrapeFruit', 'time': dinner_time},
            {'id': 42, 'src': 'breakfast/0.jpg', 'title': 'Breakfast',
             'content': 'All Day-Mix of Fruits avoid Dates,Mangoes,Grape, Bananas) ', 'time': breakfast_time},
            {'id': 43, 'src': 'lunch/0.jpg', 'title': 'Lunch',
             'content': 'All Day-Mix of Fruits avoid Dates,Mangoes,Grape, Bananas) ', 'time': lunch_time},
            {'id': 44, 'src': 'dinner/0.jpg', 'title': 'Dinner',
             'content': 'All Day-Mix of Fruits avoid Dates,Mangoes,Grape, Bananas) ', 'time': dinner_time},
            {'id': 45, 'src': 'breakfast/1.jpg', 'title': 'Breakfast',
             'content': 'All Day Mixture of Boilled Vegetables (except Potato), Salads ', 'time': breakfast_time},
            {'id': 46, 'src': 'lunch/1.jpg', 'title': 'Lunch',
             'content': 'All Day Mixture of Boilled Vegetables (except Potato), Salads ', 'time': lunch_time},
            {'id': 47, 'src': 'dinner/1.jpg', 'title': 'Dinner',
             'content': 'All Day Mixture of Boilled Vegetables (except Potato), Salads ', 'time': dinner_time},
            {'id': 48, 'src': 'breakfast/2.jpg', 'title': 'Breakfast',
             'content': 'All Day Mix of Fruits & Mix of Boiled Vegetables (exceptions as before), Salads ',
             'time': breakfast_time},
            {'id': 49, 'src': 'lunch/2.jpg', 'title': 'Lunch',
             'content': 'All Day Mix of Fruits & Mix of Boiled Vegetables (exceptions as before), Salads ',
             'time': lunch_time},
            {'id': 50, 'src': 'dinner/2.jpg', 'title': 'Dinner',
             'content': 'All Day Mix of Fruits & Mix of Boiled Vegetables (exceptions as before), Salads ',
             'time': dinner_time},
            {'id': 51, 'src': 'breakfast/3.jpg', 'title': 'Breakfast',
             'content': 'All Day Fish or Shrimp (Boiled or Grilled), Salads ', 'time': breakfast_time},
            {'id': 52, 'src': 'lunch/3.jpg', 'title': 'Lunch',
             'content': 'All Day Fish or Shrimp (Boiled or Grilled), Salads ', 'time': lunch_time},
            {'id': 53, 'src': 'dinner/3.jpg', 'title': 'Dinner',
             'content': 'All Day Fish or Shrimp (Boiled or Grilled), Salads ', 'time': dinner_time},
            {'id': 54, 'src': 'breakfast/4.jpg', 'title': 'Breakfast',
             'content': 'All day - Grilled Meat or Grilled Chicken, Boiled Vegetables ', 'time': breakfast_time},
            {'id': 55, 'src': 'lunch/4.jpg', 'title': 'Lunch',
             'content': 'All day - Grilled Meat or Grilled Chicken, Boiled Vegetables ', 'time': lunch_time},
            {'id': 56, 'src': 'dinner/4.jpg', 'title': 'Dinner',
             'content': 'All day - Grilled Meat or Grilled Chicken, Boiled Vegetables ', 'time': dinner_time},
            {'id': 57, 'src': 'breakfast/5.jpg', 'title': 'Breakfast',
             'content': 'One Type of Fruit (avoid Dates, Mangoes, Grapes, Bananas) ', 'time': breakfast_time},
            {'id': 58, 'src': 'lunch/5.jpg', 'title': 'Lunch',
             'content': 'One Type of Fruit (avoid Dates, Mangoes, Grapes, Bananas) ', 'time': lunch_time},
            {'id': 59, 'src': 'dinner/5.jpg', 'title': 'Dinner',
             'content': 'One Type of Fruit (avoid Dates, Mangoes, Grapes, Bananas) ', 'time': dinner_time},
            {'id': 60, 'src': 'breakfast/6.jpg', 'title': 'Breakfast',
             'content': 'One Type of Fruit (avoid Dates, Mangoes, Grapes, Bananas)', 'time': breakfast_time},
            {'id': 61, 'src': 'lunch/6.jpg', 'title': 'Lunch',
             'content': 'One Type of Fruit (avoid Dates, Mangoes, Grapes, Bananas)', 'time': lunch_time},
            {'id': 62, 'src': 'dinner/6.jpg', 'title': 'Dinner',
             'content': 'One Type of Fruit (avoid Dates, Mangoes, Grapes, Bananas)', 'time': dinner_time},
            {'id': 63, 'src': 'breakfast/0.jpg', 'title': 'Breakfast',
             'content': 'Boiled/Grilled-Meat/Chicken250g 3Tomatoes,4Cucumbers 1 Brown Toast. 1Orange Grapefruit 1 Box washed Tuna (w/out Oil) ',
             'time': breakfast_time},
            {'id': 64, 'src': 'lunch/0.jpg', 'title': 'Lunch',
             'content': 'Boiled/Grilled-Meat/Chicken250g 3Tomatoes,4Cucumbers 1 Brown Toast. 1Orange Grapefruit 1 Box washed Tuna (w/out Oil) ',
             'time': lunch_time},
            {'id': 65, 'src': 'dinner/0.jpg', 'title': 'Dinner',
             'content': 'Boiled/Grilled-Meat/Chicken250g 3Tomatoes,4Cucumbers 1 Brown Toast. 1Orange Grapefruit 1 Box washed Tuna (w/out Oil) ',
             'time': dinner_time},
            {'id': 66, 'src': 'breakfast/1.jpg', 'title': 'Breakfast',
             'content': 'Boiled/Grilled-Meat200g 3Tomatoes,4Cucumbers 1 Brown Toast. 1Orange/Grapefruit/Apple',
             'time': breakfast_time},
            {'id': 67, 'src': 'lunch/1.jpg', 'title': 'Lunch',
             'content': 'Boiled/Grilled-Meat200g 3Tomatoes,4Cucumbers 1 Brown Toast. 1Orange/Grapefruit/Apple',
             'time': lunch_time},
            {'id': 68, 'src': 'dinner/1.jpg', 'title': 'Dinner',
             'content': 'Boiled/Grilled-Meat200g 3Tomatoes,4Cucumbers 1 Brown Toast. 1Orange/Grapefruit/Apple',
             'time': dinner_time},
            {'id': 69, 'src': 'breakfast/2.jpg', 'title': 'Breakfast',
             'content': '1SpoonCottageCheese,2Tomatoes 2Cucmbers, 1ServeBoiled Vegetable, 1 Brown Toast, 1Orange / Grapefruit, 1 Box washed Tuna (w/out Oil) ',
             'time': breakfast_time},
            {'id': 70, 'src': 'lunch/2.jpg', 'title': 'Lunch',
             'content': '1SpoonCottageCheese,2Tomatoes 2Cucmbers, 1ServeBoiled Vegetable, 1 Brown Toast, 1Orange / Grapefruit, 1 Box washed Tuna (w/out Oil) ',
             'time': lunch_time},
            {'id': 71, 'src': 'dinner/2.jpg', 'title': 'Dinner',
             'content': '1SpoonCottageCheese,2Tomatoes 2Cucmbers, 1ServeBoiled Vegetable, 1 Brown Toast, 1Orange / Grapefruit, 1 Box washed Tuna (w/out Oil) ',
             'time': dinner_time},
            {'id': 72, 'src': 'breakfast/3.jpg', 'title': 'Breakfast',
             'content': 'Chicken(boiled/grilled)-250g 3Tomatoes,4Cucumbers, 1 Brown Toast, 1 Orange/1 Apple/ 1Grape Fruit',
             'time': breakfast_time},
            {'id': 73, 'src': 'lunch/3.jpg', 'title': 'Lunch',
             'content': 'Chicken(boiled/grilled)-250g 3Tomatoes,4Cucumbers, 1 Brown Toast, 1 Orange/1 Apple/ 1Grape Fruit',
             'time': lunch_time},
            {'id': 74, 'src': 'dinner/3.jpg', 'title': 'Dinner',
             'content': 'Chicken(boiled/grilled)-250g 3Tomatoes,4Cucumbers, 1 Brown Toast, 1 Orange/1 Apple/ 1Grape Fruit',
             'time': dinner_time},
            {'id': 75, 'src': 'breakfast/4.jpg', 'title': 'Breakfast',
             'content': 'Chicken(boiled/grilled)-250g 3Tomatoes,4Cucumbers 2Boiled Eggs, 1Orange/Grape Fruit/Lettuce ',
             'time': breakfast_time},
            {'id': 76, 'src': 'lunch/4.jpg', 'title': 'Lunch',
             'content': 'Chicken(boiled/grilled)-250g 3Tomatoes,4Cucumbers 2Boiled Eggs, 1Orange/Grape Fruit/Lettuce ',
             'time': lunch_time},
            {'id': 77, 'src': 'dinner/4.jpg', 'title': 'Dinner',
             'content': 'Chicken(boiled/grilled)-250g 3Tomatoes,4Cucumbers 2Boiled Eggs, 1Orange/Grape Fruit/Lettuce ',
             'time': dinner_time},
            {'id': 78, 'src': 'breakfast/5.jpg', 'title': 'Breakfast',
             'content': '2 pcs White Chicken Breast, 2SpoonsCottageCheese,1 Brown Toast, 2Tomatoes,2Cucumbers, 1Orange/Grape Fruit,1Yoghurt',
             'time': breakfast_time},
            {'id': 79, 'src': 'lunch/5.jpg', 'title': 'Lunch',
             'content': '2 pcs White Chicken Breast, 2SpoonsCottageCheese,1 Brown Toast, 2Tomatoes,2Cucumbers, 1Orange/Grape Fruit,1Yoghurt',
             'time': lunch_time},
            {'id': 80, 'src': 'dinner/5.jpg', 'title': 'Dinner',
             'content': '2 pcs White Chicken Breast, 2SpoonsCottageCheese,1 Brown Toast, 2Tomatoes,2Cucumbers, 1Orange/Grape Fruit,1Yoghurt',
             'time': dinner_time},
            {'id': 81, 'src': 'breakfast/6.jpg', 'title': 'Breakfast',
             'content': '1 Box washed Tuna(no Oil),1 SpoonsCottageCheese,1 Brown Toast, 2 Tomatoes, 1 serverBoiled vegetables, 1 Orange/Grape Fruit',
             'time': breakfast_time},
            {'id': 82, 'src': 'lunch/6.jpg', 'title': 'Lunch',
             'content': '1 Box washed Tuna(no Oil),1 SpoonsCottageCheese,1 Brown Toast, 2 Tomatoes, 1 serverBoiled vegetables, 1 Orange/Grape Fruit',
             'time': lunch_time},
            {'id': 83, 'src': 'dinner/6.jpg', 'title': 'Dinner',
             'content': '1 Box washed Tuna(no Oil),1 SpoonsCottageCheese,1 Brown Toast, 2 Tomatoes, 1 serverBoiled vegetables, 1 Orange/Grape Fruit',
             'time': dinner_time},
        ]
    }
    return render(request, 'DietTable.html', data)
