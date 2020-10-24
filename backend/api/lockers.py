from flask import Blueprint, jsonify, request
from marshmallow import ValidationError

from backend.db_interfaces.lockers import LockersDbTools
from backend.optimal_route.optimal_route import get_optimal_route
from backend.api.schemas.lockers import LockerOptimalRouteSchema


LOCKERS = Blueprint('lockers', __name__)
LOCKER_OPTIMAL_ROUTE_SCHEMA = LockerOptimalRouteSchema()


@LOCKERS.route('', methods=['GET'])
def get_lockers():
    lockers_db = LockersDbTools()
    lockers = lockers_db.get_lockers()
    return jsonify(lockers), 200


@LOCKERS.route('/route', methods=['POST'])
def get_route():
    """
    POST args:
        lockers_list: (list) name of chosen lockers
        courier_latitude: (float)
        courier_longitude: (float)
    """

    try:
        data_dict = LOCKER_OPTIMAL_ROUTE_SCHEMA.load(request.get_json())
    except ValidationError as error:
        return jsonify({'error': str(error)}), 400

    lockers_list = data_dict['lockers_list'] + ['courier']
    courier_latitude = data_dict['courier_latitude']
    courier_longitude = data_dict['courier_latitude']

    optimal_route = get_optimal_route(lockers_list, courier_latitude, courier_longitude)

    return jsonify(optimal_route), 200
