from flask import Blueprint, jsonify, request
from marshmallow import ValidationError

from backend.db_interfaces.users import UsersDbTools
from backend.api.schemas.users import AddUserSchema, UpdateUserSchema, DeleteUserSchema, LoginUserSchema


USERS = Blueprint('users', __name__)
ADD_USER_SCHEMA = AddUserSchema()
UPDATE_USER_SCHEMA = UpdateUserSchema()
DELETE_USER_SCHEMA = DeleteUserSchema()
LOGIN_USER_SCHEMA = LoginUserSchema()


@USERS.route('', methods=['GET'])
def get_users():
    users_db = UsersDbTools()
    users = users_db.get_users()

    filtered_users = []
    for user in users:
        del user['password']
        if user['username'] != 'admin':
            filtered_users.append(user)
    return jsonify(filtered_users), 200


@USERS.route('', methods=['POST'])
def add_user():
    """
    POST args:
        username: (string)
        password: (string)
        role: (string) admin or courier
        district: (string)
    """
    try:
        data_dict = ADD_USER_SCHEMA.load(request.get_json())
    except ValidationError as error:
        return jsonify({'error': str(error)}), 400

    users_db = UsersDbTools()
    users_db.add_user(data_dict)
    return jsonify(data_dict), 200


@USERS.route('', methods=['PUT'])
def update_user():
    """
    PUT args:
        username: (string)
        update_dict: (dict)
    """
    try:
        data_dict = UPDATE_USER_SCHEMA.load(request.get_json())
    except ValidationError as error:
        return jsonify({'error': str(error)}), 400

    users_db = UsersDbTools()
    user_index = {'username': data_dict['username']}
    users_db.update_user(user_index, data_dict['update_dict'])
    return jsonify(data_dict), 200


@USERS.route('', methods=['DELETE'])
def delete_user():
    """
    DELETE args:
        username: (string)
    """
    try:
        data_dict = DELETE_USER_SCHEMA.load(request.get_json())
    except ValidationError as error:
        return jsonify({'error': str(error)}), 400

    users_db = UsersDbTools()
    user_index = {'username': data_dict['username']}
    users_db.delete_user(user_index)
    return jsonify(user_index), 200


@USERS.route('/login', methods=['POST'])
def login():
    """
    POST args:
        username: (string)
        password: (string)
    """
    try:
        data_dict = LOGIN_USER_SCHEMA.load(request.get_json())
    except ValidationError as error:
        return jsonify({'error': str(error)}), 400

    users_db = UsersDbTools()
    user_index = {'username': data_dict['username']}
    user = users_db.get_user(user_index)
    if not user:
        return jsonify(False), 200

    result = True if user['password'] == data_dict['password'] else False
    return jsonify(result), 200
