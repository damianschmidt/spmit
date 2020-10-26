from flask import Blueprint, jsonify, request
from marshmallow import ValidationError

from backend.optimal_route.here_api import get_place_info, get_route, get_directions
from backend.api.schemas.here_api import HereApiDirectionsSchema


HERE_API = Blueprint('here_api', __name__)
HERE_API_DIRECTIONS_SCHEMA = HereApiDirectionsSchema()


@HERE_API.route('/<float:latitude>/<float:longitude>', methods=['GET'])
def place_info(latitude, longitude):
    place_data = get_place_info(latitude, longitude)
    return jsonify(place_data), 200


@HERE_API.route('/<float:a_latitude>/<float:a_longitude>/<float:b_latitude>/<float:b_longitude>', methods=['GET'])
def route_info(a_latitude, a_longitude, b_latitude, b_longitude):
    route_data = get_route(a_latitude, a_longitude, b_latitude, b_longitude)
    return jsonify(route_data), 200


@HERE_API.route('/directions', methods=['POST'])
def direction():
    """
    POST args:
        path: (list)
        courier_latitude: (float)
        courier_longitude: (float)
    """

    try:
        data_dict = HERE_API_DIRECTIONS_SCHEMA.load(request.get_json())
    except ValidationError as error:
        return jsonify({'error': str(error)}), 400

    path = data_dict['path']
    courier_latitude = data_dict['courier_latitude']
    courier_longitude = data_dict['courier_latitude']
    directions = get_directions(path, courier_latitude, courier_longitude)

    return jsonify(directions), 200
