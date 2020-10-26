from backend.wrappers import MONGO


class UsersDbTools:
    def __init__(self, mongo_db=None):
        database = MONGO.db if mongo_db is None else mongo_db
        self._database = database
        self._collection = database['users']

    def get_users(self):
        users = self._collection.find({}, {'_id': False})
        return list(users)

    def get_user(self, user_index):
        user = self._collection.find_one(user_index, {'_id': False})
        return user

    def add_user(self, user_dict):
        self._collection.insert_one(user_dict)

    def add_many_users(self, user_dicts_list):
        self._collection.insert(user_dicts_list)

    def update_user(self, user_index, user_update_dict):
        self._collection.update_one(
            filter=user_index,
            update={'$set': user_update_dict}
        )

    def delete_user(self, user_index):
        self._collection.delete_one(filter=user_index)
