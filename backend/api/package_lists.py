from flask import Blueprint, jsonify, request
from marshmallow import ValidationError

from backend.db_interfaces.package_lists import PackageListsDbTools
from backend.api.schemas.package_lists import DeletePackageListSchema


PACKAGE_LISTS = Blueprint('package_lists', __name__)
DELETE_PACKAGE_LIST_SCHEMA = DeletePackageListSchema()


@PACKAGE_LISTS.route('', methods=['GET'])
def get_package_lists():
    package_lists_db = PackageListsDbTools()
    package_lists = package_lists_db.get_package_lists()

    package_lists_names = [package_list['name'] for package_list in package_lists]
    return jsonify(package_lists_names), 200


@PACKAGE_LISTS.route('/<package_list>', methods=['GET'])
def get_package_list(package_list):
    package_lists_db = PackageListsDbTools()
    package_lists = package_lists_db.get_package_lists()

    lockers = []
    # TODO: filter lockers names from package list
    return jsonify(lockers), 200


@PACKAGE_LISTS.route('', methods=['POST'])
def add_package_list():
    """
    POST args:
        file: (file)
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    list_file = request.files['file']
    if list_file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    return jsonify(list_file.filename), 200


    # try:
    #     data_dict = ADD_PACKAGE_LIST_SCHEMA.load(request.get_json())
    # except ValidationError as error:
    #     return jsonify({'error': str(error)}), 400

    # package_lists_db = PackageListsDbTools()
    # package_lists_db.add_user(data_dict)
    # return jsonify(data_dict), 200


@PACKAGE_LISTS.route('', methods=['DELETE'])
def delete_package_list():
    """
    DELETE args:
        name: (string)
    """
    try:
        data_dict = DELETE_PACKAGE_LIST_SCHEMA.load(request.get_json())
    except ValidationError as error:
        return jsonify({'error': str(error)}), 400

    package_lists_db = PackageListsDbTools()
    package_list_index = {'name': data_dict['name']}
    package_lists_db.delete_package_list(package_list_index)
    return jsonify(package_list_index), 200
