from marshmallow import Schema, fields, EXCLUDE


class HereApiDirectionsSchema(Schema):
    path = fields.List(fields.String(), required=True)
    courier_latitude = fields.Float(required=True)
    courier_longitude = fields.Float(required=True)

    class Meta:
        unknown = EXCLUDE
