# api.py
from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
import requests

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'freelancer' 
app.config['MONGO_URI'] = 'mongodb://db:27017/freelancer'

mongo = PyMongo(app)



if __name__ == '__main__':
	app.run(host='0.0.0.0' , debug=True)

