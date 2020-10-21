from flask import Flask
from flask_cors import CORS

from backend.config import Config
from backend.wrappers import MONGO


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    if app.debug:
        CORS(app)

    MONGO.init_app(app)

    from backend.api.basic import BASIC
    from backend.api.here_api import HERE_API
    from backend.api.lockers import LOCKERS

    app.register_blueprint(BASIC, url_prefix='/api/1')
    app.register_blueprint(HERE_API, url_prefix='/api/1/here_api')
    app.register_blueprint(LOCKERS, url_prefix='/api/1/lockers')

    return app
