"use strict";

var halls = require('../data/halldetail').halls;
var _ = require('lodash');

var currentID = 3;
var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var HallApi = {
	getAllHalls: function(callback) {
		callback(null, _clone(halls));
	},
  getHallById: function(id, callback) {
		var hall = _.find(halls, {_id: parseInt(id)});
		callback (null, _clone(hall));
	},
	getDistinctCity: function(callback) {
		var city = [];
		var i=0;
		for(i = 0; i< halls.length; i++){    
			if(city.indexOf(halls[i].city) === -1){
				city.push(halls[i].city);        
			}        
		}
		callback (null, _clone(city));
  },
  updateHallById: function(id, hall, callback) {
			var existingHallIndex = _.indexOf(halls, _.find(halls, {_id: parseInt(id)}));
			hall._id = parseInt(id);
			halls.slice(existingHallIndex, 1, hall);
			callback (null);
		
  },
	saveHall: function(hall, callback) {
		currentID = currentID + 1;
    hall._id = currentID;
    halls.push(hall);
		callback(null, _clone(hall));
	},
	deleteHallById: function(id, callback) {
		_.remove(halls, { _id: parseInt(id)});
    callback(null);
	}
};

module.exports = HallApi;
