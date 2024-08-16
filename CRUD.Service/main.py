from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

data_list = ["Logu","Gowtham","Kavi","Kishore","KRP"]

@app.route('/add', methods=['POST'])
def add_data():
    print("add_data")
    new_data = request.json
    print("after",new_data)
    if new_data:
        data_list.append(new_data['name'].capitalize())
        return jsonify({"message": "Data added successfully"}), 201
    else:
        return jsonify({"error": "No data provided"}), 400

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(data_list),201

if __name__ == '__main__':
    app.run(debug=True)
