import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

from backend.db_interfaces.lockers import LockersDbTools


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
        'mode': 'fastest;car;traffic:enabled',
        'language': 'pl-pl',
    }
    r = requests.get(url=url, params=params)
    data = r.json()
    return data


def download_data(index, locker_a, locker_b):
    a_latitude, a_longitude = locker_a[0], locker_a[1]
    b_latitude, b_longitude = locker_b[0], locker_b[1]
    route_data = get_route(a_latitude, a_longitude, b_latitude, b_longitude)
    maneuvers = route_data['response']['route'][0]['leg'][0]['maneuver']
    instructions = [data['instruction'] for data in maneuvers]
    return index, instructions


def get_directions(path, courier_latitude, courier_longitude):
    lockers_db = LockersDbTools()
    lockers = lockers_db.get_lockers()

    lockers_dicts = {locker['name']: [locker['latitude'], locker['longitude']]
                     for locker in lockers}
    lockers_dicts['courier'] = [courier_latitude, courier_longitude]

    directions = [None] * (len(path) - 1)
    threads = []
    with ThreadPoolExecutor(max_workers=20) as executor:
        for i in range(len(path) - 1):
            locker_a = lockers_dicts[path[i]]
            locker_b = lockers_dicts[path[i+1]]
            threads.append(executor.submit(download_data, i, locker_a, locker_b))

        for task in as_completed(threads):
            result = task.result()
            directions[result[0]] = result[1]
            
    return directions
