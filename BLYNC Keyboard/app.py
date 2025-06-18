from flask import Flask
from routes.main import main_routes
import config

app = Flask(__name__)
app.config.from_object(config.Config)

app.register_blueprint(main_routes)

if __name__ == "__main__":
    app.run(host=app.config["HOST"], port=app.config["PORT"], debug=app.config["DEBUG"])
