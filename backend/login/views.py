from django.http import HttpResponse, HttpResponseBadRequest

from .models import Account, Session
import json
import random as rand
from util.message import loginMessage, signupMessage


# Create your views here.
def login(request):
    if request.method == 'POST':
        try:
            if 'username' in request.POST and 'password' in request.POST:
                account = Account.objects.get(username=request.POST['username'])
                if account.password == request.POST['password']:
                    session = Session.objects.get_or_create(account=account)[0]
                    sessionID = ''.join([str(rand.randint(0,9)) for i in range(256)])
                    while Session.objects.filter(sessionID=sessionID):
                        sessionID = ''.join([str(rand.randint(0,9)) for i in range(256)])
                    session.sessionID = sessionID
                    session.save()
                    return HttpResponse(loginMessage(True, True, session.sessionID, account.nickname))
                else:
                    return HttpResponse(loginMessage(isPasswordCorrect=False))
        except Account.DoesNotExist:
            return HttpResponse(loginMessage(isUserFound=False))

    return HttpResponseBadRequest('Invalid API operation')


def signup(request):
    if request.method == 'POST':
        if 'username' in request.POST and 'password' in request.POST and 'nickname' in request.POST and request.POST['username'] and request.POST['password']:
            accountSet = Account.objects.filter(username=request.POST['username'])
            if accountSet:
                return HttpResponse(signupMessage(isDuplicateUsername=True))
            else:
                Account(username=request.POST['username'], password=request.POST['password'], nickname=request.POST['nickname']).save()
                return HttpResponse(signupMessage(isSignup=True))
    return HttpResponseBadRequest('Invalid API operation')
