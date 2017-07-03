# api.py
from flask import Flask
from flask import jsonify
from flask import request

from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import requests
import os

app = Flask(__name__)
CORS(app)

#app.config['MONGO_DBNAME'] = 'freelancer' 
#app.config['MONGO_URI'] = 'mongodb://0.0.0.0:27017/freelancer'
client = MongoClient(
    os.environ['DB_PORT_27017_TCP_ADDR'],
    27017)
mongo = client.freelancer

#mongo = PyMongo(app)

@app.route('/api/projects', methods=['GET'])
def get_all_projects():
	projects_data = mongo.db.projects
	output = []
	for s in projects_data.find():
		output.append({'name' : s['name']})
	return jsonify({'result' : output})

@app.route('/api/items', methods=['GET'])
def get_all_items():
	items_data = mongo.db.items
	output = []
	if(request.args.get("start") and request.args.get("end")):
		req_start = request.args.get("start")
		req_end = request.args.get("end")
		for s in items_data.find({'start': {'$gte': req_start},'end':{'$lt':req_end}}):
			output.append({'project' : s['project'], 'start' : s['start'], 'end' : s['end']})
	elif(request.args.get("project")):
		req_project = request.args.get("project")
		for s in items_data.find({'project': req_project}):
			output.append({'project' : s['project'], 'start' : s['start'], 'end' : s['end']})
	else:
		for s in items_data.find():
			output.append({'id':str(s['_id']),'project' : s['project'], 'start' : s['start'], 'end' : s['end']})
	return jsonify({'result' : output})

@app.route('/api/projects', methods=['POST'])
def add_project():
	data = mongo.db.projects
	name = request.json['name']
	data_id = data.insert({'name': name})
	new_data = data.find_one({'_id': data_id })
	output = {'name' : new_data['name']}
	return jsonify({'result' : output})

@app.route('/api/items', methods=['POST'])
def add_item():
	data = mongo.db.items
	project = request.json['project']
	start = request.json['start']
	end = request.json['end']
	data_id = data.insert({'project': project, 'start': start, 'end': end})
	new_data = data.find_one({'_id': data_id })
	output = {'project' : new_data['project']}
	return jsonify({'result' : output})

@app.route('/api/projects', methods=['DELETE'])
def delete_project():DB_PORT_27017_TCP_ADDR
	data = mongo.db.projects
	project = request.args.get("project")
	deleted_count = data.delete_many({})
	return jsonify({'result' : 'success'})

@app.route('/api/items', methods=['DELETE'])
def delete_item():
	data = mongo.db.items
	id = request.args.get("id")
	deleted_count = data.delete_many({"_id" : str(id)})
	return jsonify({'result' : 'success'})




if __name__ == '__main__':
	app.run(host='0.0.0.0' , debug=True)

