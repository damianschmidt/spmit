from marshmallow import Schema, fields, EXCLUDE


class AddUserSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)
    role = fields.String(required=True)
    district = fields.String(required=True)

    class Meta:
        unknown = EXCLUDE


class DeleteUserSchema(Schema):
    username = fields.String(required=True)

    class Meta:
        unknown = EXCLUDE


class UpdateUserSchema(Schema):
    username = fields.String(required=True)
    update_dict = fields.Nested(AddUserSchema, required=True)

    class Meta:
        unknown = EXCLUDE


class LoginUserSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)

    class Meta:
        unknown = EXCLUDE
