import requests

API_KEY = 'TrzIhW3IXGeeKyyfrmLr9K1eMnLcqJE1rz5H3oYtHRU'


def get_place_info(latitude, longitude):
    url = 'https://revgeocode.search.hereapi.com/v1/revgeocode'
    params = {
        'apikey': API_KEY,
        'at': f'{latitude},{longitude}'
    }
    r = requests.get(url=url, params=params)
    data = r.json()
    return data


def get_route(a_latitude, a_longitude, b_latitude, b_longitude):
    url = 'https://route.ls.hereapi.com/routing/7.2/calculateroute.json'
    params = {
        'apikey': API_KEY,
        'waypoint0': f'geo!{a_latitude},{a_longitude}',
        'waypoint1': f'geo!{b_latitude},{b_longitude}',
        'mode': 'fastest;car;traffic:enabled'
    }
    r = requests.get(url=url, params=params)
    data = r.json()
    return data
