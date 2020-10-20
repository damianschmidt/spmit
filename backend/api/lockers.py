from flask import Blueprint, jsonify, request
from marshmallow import ValidationError

from backend.db_interfaces.lockers import LockersDbTools
from backend.optimal_route.optimal_route import get_optimal_route
from backend.optimal_route.here_api import here_api_test
from backend.api.schemas.lockers import LockerOptimalRouteSchema


LOCKERS = Blueprint('lockers', __name__)
LOCKER_OPTIMAL_ROUTE_SCHEMA = LockerOptimalRouteSchema()


@LOCKERS.route('', methods=['GET'])
def get_lockers():
    lockers_db = LockersDbTools()
    lockers = lockers_db.get_lockers()
    return jsonify(lockers), 200


@LOCKERS.route('/route', methods=['GET'])
def get_route():
    """
    GET args:
        packages_list: (list) name of lockers with number of packs
        courier_latitude: (number)
        courier_longitude: (number)
    """

    try:
        data_dict = LOCKER_OPTIMAL_ROUTE_SCHEMA.load(request.get_json())
    except ValidationError as error:
        return jsonify({'error': str(error)}), 400

    packages_list = data_dict['packages_list']
    courier_latitude = data_dict['courier_latitude']
    courier_longitude = data_dict['courier_latitude']

    optimal_route = get_optimal_route(
        packages_list, courier_latitude, courier_longitude)

    return jsonify(optimal_route), 200


@LOCKERS.route('/here_api', methods=['GET'])
def get_here_api_test():
    here_api_data = here_api_test()
    return jsonify(here_api_data), 200