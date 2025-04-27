from flask import Flask
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix
from modules.chatbot_bp import chatbot_bp

app = Flask(__name__)
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)
app.register_blueprint(chatbot_bp)

if __name__ == '__main__':
    app.run()
