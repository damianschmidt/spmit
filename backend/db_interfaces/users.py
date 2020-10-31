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
        user_dict_copy = user_dict.copy()
        self._collection.insert_one(user_dict_copy)
        
        return user_dict

    def add_many_users(self, user_dicts_list):
        user_dicts_list_copy = user_dicts_list.copy()
        self._collection.insert(user_dicts_list_copy)

        return user_dicts_list

    def update_user(self, user_index, user_update_dict):
        user_update_dict_copy = user_update_dict.copy()
        self._collection.update_one(
            filter=user_index,
            update={'$set': user_update_dict_copy}
        )

        return user_update_dict

    def delete_user(self, user_index):
        self._collection.delete_one(filter=user_index)
