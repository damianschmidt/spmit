from marshmallow import Schema, fields, EXCLUDE


class DeletePackageListSchema(Schema):
    name = fields.String(required=True)

    class Meta:
        unknown = EXCLUDE
