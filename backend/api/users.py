from flask import Blueprint, jsonify

from backend.db_interfaces.users import UsersDbTools


USERS = Blueprint('users', __name__)


@USERS.route('', methods=['GET'])
def get_users():
    users_db = UsersDbTools()
    users = users_db.get_users()
    return jsonify(users), 200
