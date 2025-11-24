from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/products")
def products():
    data = [
        {"id": 1, "name": "iPhone 15", "price": 3999},
        {"id": 2, "name": "PS5", "price": 2199},
        {"id": 3, "name": "AirPods Pro", "price": 899}
    ]
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
