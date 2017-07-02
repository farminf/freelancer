var axiosAPI = require('./axiosAPI');

var helpers = { 
	getProjects: function(){
		return axiosAPI.get('/projects')
				.catch(function (err) {console.warn('Error in call getProjects: ', err)})
	},
  getItems: function(){
		return axiosAPI.get('/items')
				.catch(function (err) {console.warn('Error in call getItems: ', err)})
	},
	getByTime: function(from_ts , to_ts){
		return axiosAPI.get('/items?start='+ from_ts + '&end=' + to_ts )
				.catch(function (err) {console.warn('Error in call getByTime: ', err)})
	},
  getByProject: function(project_name){
		return axiosAPI.get('/items?project='+ project_name )
				.catch(function (err) {console.warn('Error in call getByProject: ', err)})
	},
  postProject:function(project_name){
		return axiosAPI.post('/projects' , {"name":project_name})
				.catch(function (err) {console.warn('Error in call postProject: ', err)})
	},
  postItem:function(project_name, start, end ){
		return axiosAPI.post('/items' , {"project":project_name, "start":start, "end":end})
				.catch(function (err) {console.warn('Error in call postItem: ', err)})
	}
}

module.exports = helpers;