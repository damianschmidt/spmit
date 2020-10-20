from marshmallow import Schema, fields, EXCLUDE


class PackageListSchema(Schema):
    name = fields.String(required=True)
    value = fields.Integer(required=True)


class LockerOptimalRouteSchema(Schema):
    packages_list = fields.List(
        fields.Nested(PackageListSchema), required=True)
    courier_latitude = fields.Float(required=True)
    courier_longitude = fields.Float(required=True)

    class Meta:
        unknown = EXCLUDE
