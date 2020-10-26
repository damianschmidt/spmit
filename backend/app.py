import click

from backend import create_app
from backend.db_interfaces.lockers import LockersDbTools
from backend.db_interfaces.users import UsersDbTools

app = create_app()


def init_parcel_lockers():
    click.echo('Initializing collection with parcel lockers.')
    lockers_db = LockersDbTools()

    lockers = [
        {
            'name': 'POP-WRO79',
            'district': 'srodmiescie',
            'latitude': 51.101379,
            'longitude': 17.047316,
        },
        {
            'name': 'WRO05W',
            'district': 'srodmiescie',
            'latitude': 51.098468,
            'longitude': 17.050428,
        },
        {
            'name': 'WRO41A',
            'district': 'srodmiescie',
            'latitude': 51.099093,
            'longitude': 17.047956,
        },
        {
            'name': 'WRO69M',
            'district': 'srodmiescie',
            'latitude': 51.099660,
            'longitude': 17.038807,
        },
        {
            'name': 'POP-WRO103',
            'district': 'srodmiescie',
            'latitude': 51.102094,
            'longitude': 17.035382,
        },
        {
            'name': 'WRO88M',
            'district': 'srodmiescie',
            'latitude': 51.105378,
            'longitude': 17.032421,
        },
        {
            'name': 'WRO15A',
            'district': 'srodmiescie',
            'latitude': 51.100708,
            'longitude': 17.024211,
        },
        {
            'name': 'WRO911',
            'district': 'srodmiescie',
            'latitude': 51.099940,
            'longitude': 17.024037,
        },
        {
            'name': 'WRO12L',
            'district': 'srodmiescie',
            'latitude': 51.100688,
            'longitude': 17.024201,
        },
        {
            'name': 'WRO77M',
            'district': 'srodmiescie',
            'latitude': 51.099307,
            'longitude': 17.027580,
        },
        {
            'name': 'WRO33A',
            'district': 'srodmiescie',
            'latitude': 51.096502,
            'longitude': 17.034364,
        },
        {
            'name': 'WRO06N',
            'district': 'srodmiescie',
            'latitude': 51.094811,
            'longitude': 17.028220,
        },
        {
            'name': 'WRO05N',
            'district': 'srodmiescie',
            'latitude': 51.092806,
            'longitude': 17.031572,
        },
        {
            'name': 'WRO05N',
            'district': 'srodmiescie',
            'latitude': 51.092806,
            'longitude': 17.031572,
        },
        {
            'name': 'WRO23A',
            'district': 'gaj',
            'latitude': 51.077393,
            'longitude': 17.047432,
        },
        {
            'name': 'POP-WRO59',
            'district': 'gaj',
            'latitude': 51.077471,
            'longitude': 17.047766,
        },
        {
            'name': 'WRO55M',
            'district': 'gaj',
            'latitude': 51.076369,
            'longitude': 17.042019,
        },
        {
            'name': 'WRO29N',
            'district': 'gaj',
            'latitude': 51.074849,
            'longitude': 17.033105,
        },
        {
            'name': 'WRO106M',
            'district': 'gaj',
            'latitude': 51.071471,
            'longitude': 17.033729,
        },
        {
            'name': 'WRO70M',
            'district': 'gaj',
            'latitude': 51.080323,
            'longitude': 17.068539,
        },
        {
            'name': 'WRO25N',
            'district': 'gaj',
            'latitude': 51.077764,
            'longitude': 17.069510,
        },
        {
            'name': 'WRO01M',
            'district': 'gaj',
            'latitude': 51.083168,
            'longitude': 17.058855,
        },
        {
            'name': 'WRO04M',
            'district': 'gaj',
            'latitude': 51.084697,
            'longitude': 17.046474,
        },
        {
            'name': 'WRO08L',
            'district': 'gaj',
            'latitude': 51.082311,
            'longitude': 17.046233,
        },
        {
            'name': 'WRO09N',
            'district': 'gaj',
            'latitude': 51.063198,
            'longitude': 17.032760,
        },
        {
            'name': 'WRO89M',
            'district': 'gaj',
            'latitude': 51.062164,
            'longitude': 17.082463,
        },
        {
            'name': 'WRO37A',
            'district': 'gaj',
            'latitude': 51.060709,
            'longitude': 17.079693,
        },
        {
            'name': 'WRO15N',
            'district': 'fabryczna',
            'latitude': 51.123943,
            'longitude': 16.993133,
        },
        {
            'name': 'WRO15M',
            'district': 'fabryczna',
            'latitude': 51.128601,
            'longitude': 16.989340,
        },
        {
            'name': 'WRO32N',
            'district': 'fabryczna',
            'latitude': 51.122523,
            'longitude': 16.989757,
        },
        {
            'name': 'WRO15L',
            'district': 'fabryczna',
            'latitude': 51.122006,
            'longitude': 16.985924,
        },
        {
            'name': 'WRO05M',
            'district': 'fabryczna',
            'latitude': 51.122016,
            'longitude': 16.985903,
        },
        {
            'name': 'WRO19A',
            'district': 'fabryczna',
            'latitude': 51.127314,
            'longitude': 16.980989,
        },
        {
            'name': 'WRO24N',
            'district': 'fabryczna',
            'latitude': 51.123723,
            'longitude': 16.977582,
        },
        {
            'name': 'WRO14M',
            'district': 'fabryczna',
            'latitude': 51.123683,
            'longitude': 16.977514,
        },
        {
            'name': 'WRO12A',
            'district': 'fabryczna',
            'latitude': 51.126562,
            'longitude': 16.974882,
        },
        {
            'name': 'WRO24A',
            'district': 'fabryczna',
            'latitude': 51.129574,
            'longitude': 16.965377,
        },
        {
            'name': 'POP-WRO60',
            'district': 'fabryczna',
            'latitude': 51.129626,
            'longitude': 16.962973,
        },
        {
            'name': 'WRO49M',
            'district': 'fabryczna',
            'latitude': 51.133775,
            'longitude': 16.974370,
        },
    ]

    lockers_db.add_many_lockers(lockers)


def init_users():
    click.echo('Initializing collection with users.')
    users_db = UsersDbTools()

    users = [
        {
            'username': 'admin',
            'password': 'admin_password',
            'role': 'admin',
            'district': 'None'
        },
        {
            'username': 'damianschmidt',
            'password': 'damianschmidt_password',
            'role': 'courier',
            'district': 'srodmiescie'
        },
        {
            'username': 'kamildudek',
            'password': 'kamildudek_password',
            'role': 'courier',
            'district': 'fabryczna'
        },
        {
            'username': 'aleksanderatamanczuk',
            'password': 'aleksanderatamanczuk_password',
            'role': 'courier',
            'district': 'gaj'
        },
    ]

    users_db.add_many_users(users)


@app.cli.command('init_db')
def init_db():
    click.echo('Starting database initialization.')
    init_parcel_lockers()
    init_users()
    click.echo('Database initialized.')
