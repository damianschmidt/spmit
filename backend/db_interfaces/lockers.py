from backend.wrappers import MONGO


class LockersDbTools:
    def __init__(self, mongo_db=None):
        database = MONGO.db if mongo_db is None else mongo_db
        self._database = database
        self._collection = database['lockers']

    def get_lockers(self):
        lockers = self._collection.find({}, {'_id': False})
        return list(lockers)

    def add_locker(self, locker_dict):
        locker_dict_copy = locker_dict.copy()
        self._collection.insert_one(locker_dict_copy)

        return locker_dict

    def add_many_lockers(self, locker_dicts_list):
        locker_dicts_list_copy = locker_dicts_list.copy()
        self._collection.insert(locker_dicts_list_copy)

        return locker_dicts_list
