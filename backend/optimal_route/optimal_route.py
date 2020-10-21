from itertools import combinations

from backend.db_interfaces.lockers import LockersDbTools
from backend.optimal_route.here_api import get_route


def get_optimal_route(lockers_list, courier_latitude, courier_longitude):
    pair_route_time = get_pairs_route_times(lockers_list)

    return pair_route_time


def get_pairs_route_times(package_lockers):
    lockers_db = LockersDbTools()
    lockers = lockers_db.get_lockers()

    lockers_dicts = {locker['name']: [locker['latitude'], locker['longitude']]
                     for locker in lockers}

    lockers_combinations = list(combinations(package_lockers, 2))

    # TODO should be multi-threaded to make it faster
    pair_route_time = {f'{pair[0]}_{pair[1]}': get_route_time(lockers_dicts[pair[0]], lockers_dicts[pair[1]])
                       for pair in lockers_combinations}

    return pair_route_time


def get_route_time(a_coords, b_coords):
    route_data = get_route(a_coords[0], a_coords[1], b_coords[0], b_coords[1])
    return route_data['response']['route'][0]['summary']['trafficTime']
