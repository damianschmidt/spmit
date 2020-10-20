from backend.db_interfaces.lockers import LockersDbTools


def get_optimal_route(packages_dict, courier_latitude, courier_longitude):
    lockers_db = LockersDbTools()
    lockers = lockers_db.get_lockers()

    lockers_order = [locker['name'] for locker in lockers]

    return lockers_order
