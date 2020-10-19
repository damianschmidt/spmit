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
        self._collection.insert_one(locker_dict)

    def add_many_lockers(self, locker_dicts_list):
        self._collection.insert(locker_dicts_list)
