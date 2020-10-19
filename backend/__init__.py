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

    app.register_blueprint(BASIC, url_prefix='/api/1')

    return app
