from flask import Blueprint, jsonify


BASIC = Blueprint('basic', __name__)


@BASIC.route('/', methods=['GET'])
def index():
    return jsonify('hello API!'), 200
