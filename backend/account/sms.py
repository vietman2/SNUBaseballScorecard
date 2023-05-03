import requests

def send_verification_code(phone_number, verification_code):
    url = 'https://apis.aligo.in/send/'

    params = {
        'key': 'q1qjxqjxqjxqjxqjx',
        'user_id': 'snu_baseball_scorecard',
        'sender': '01012345678',
        'receiver': phone_number,
        'msg': f'인증번호는 [{verification_code}]입니다.',
    }

    response = requests.post(url, params=params)
    if response.status_code == 200:
        return True
    else:
        return False