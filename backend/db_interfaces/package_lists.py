from backend.wrappers import MONGO


class PackageListsDbTools:
    def __init__(self, mongo_db=None):
        database = MONGO.db if mongo_db is None else mongo_db
        self._database = database
        self._collection = database['package_lists']

    def get_package_lists(self):
        package_lists = self._collection.find({}, {'_id': False})
        return list(package_lists)

    def get_package_list(self, package_list_index):
        package_list = self._collection.find_one(package_list_index, {'_id': False})
        return package_list

    def add_package_list(self, package_list_dict):
        package_list_dict_copy = package_list_dict.copy()
        self._collection.insert_one(package_list_dict_copy)
        
        return package_list_dict

    def delete_package_list(self, package_list_index):
        self._collection.delete_one(filter=package_list_index)
