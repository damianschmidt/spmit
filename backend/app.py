import click

from backend import create_app
from backend.db_interfaces.lockers import LockersDbTools
from backend.db_interfaces.users import UsersDbTools

app = create_app()


def init_parcel_lockers():
    click.echo('Initializing collection with parcel lockers.')
    lockers_db = LockersDbTools()

    parcel_lockers = [
        {
            'name': 'POP-WRO79',
            'latitude': 51.101379,
            'longitude': 17.047316,
        },
        {
            'name': 'WRO05W',
            'latitude': 51.098468,
            'longitude': 17.050428,
        },
        {
            'name': 'WRO41A',
            'latitude': 51.099093,
            'longitude': 17.047956,
        },
        {
            'name': 'WRO69M',
            'latitude': 51.099660,
            'longitude': 17.038807,
        },
        {
            'name': 'POP-WRO103',
            'latitude': 51.102094,
            'longitude': 17.035382,
        },
        {
            'name': 'WRO88M',
            'latitude': 51.105378,
            'longitude': 17.032421,
        },
        {
            'name': 'WRO15A',
            'latitude': 51.100708,
            'longitude': 17.024211,
        },
        {
            'name': 'WRO911',
            'latitude': 51.099940,
            'longitude': 17.024037,
        },
        {
            'name': 'WRO12L',
            'latitude': 51.100688,
            'longitude': 17.024201,
        },
        {
            'name': 'WRO77M',
            'latitude': 51.099307,
            'longitude': 17.027580,
        },
        {
            'name': 'WRO33A',
            'latitude': 51.096502,
            'longitude': 17.034364,
        },
        {
            'name': 'WRO06N',
            'latitude': 51.094811,
            'longitude': 17.028220,
        },
        {
            'name': 'WRO05N',
            'latitude': 51.092806,
            'longitude': 17.031572,
        },
    ]

    lockers_db.add_many_lockers(parcel_lockers)


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
