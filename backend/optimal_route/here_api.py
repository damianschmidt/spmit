import requests

URL = 'https://revgeocode.search.hereapi.com/v1/revgeocode'
API_KEY = 'TrzIhW3IXGeeKyyfrmLr9K1eMnLcqJE1rz5H3oYtHRU'
PARAMS = {'apikey': API_KEY, 'at': '51.092806,17.031572'}


def here_api_test():
    r = requests.get(url=URL, params=PARAMS)
    data = r.json()
    return data
