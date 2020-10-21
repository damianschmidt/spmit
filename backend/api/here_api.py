from flask import Blueprint, jsonify
from backend.optimal_route.here_api import get_place_info, get_route


HERE_API = Blueprint('here_api', __name__)


@HERE_API.route('/<float:latitude>/<float:longitude>', methods=['GET'])
def place_info(latitude, longitude):
    place_data = get_place_info(latitude, longitude)
    return jsonify(place_data), 200


@HERE_API.route('/<float:a_latitude>/<float:a_longitude>/<float:b_latitude>/<float:b_longitude>')
def route_info(a_latitude, a_longitude, b_latitude, b_longitude):
    route_data = get_route(a_latitude, a_longitude, b_latitude, b_longitude)
    return jsonify(route_data), 200
