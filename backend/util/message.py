import json


class message:
    def __init__(self):
        self.message = dict()

    def __str__(self):
        return json.dumps(self.message)


class loginMessage(message):
    def __init__(self, isPasswordCorrect=None, isUserFound=None, sessionID=None, nickname=None):
        super().__init__()
        self.message['isLogin'] = True if isPasswordCorrect and isUserFound else False
        self.message['isPasswordCorrect'] = isPasswordCorrect
        self.message['isUserFound'] = isUserFound
        self.message['sessionID'] = sessionID
        self.message['nickname'] = nickname

class signupMessage(message):
    def __init__(self, isSignup=False, isDuplicateUsername=None):
        super().__init__()
        self.message['isSignup'] = isSignup
        self.message['isDuplicateUsername'] = isDuplicateUsername

class homeMessage(message):
    def __init__(self, avatar, nickname, level, coin, height, weight, BMI):
        super().__init__()
        self.message['avatar'] = avatar
        self.message['nickname'] = nickname
        self.message['level'] = level
        self.message['coin'] = coin
        self.message['height'] = height
        self.message['weight'] = weight
        self.message['BMI'] = BMI