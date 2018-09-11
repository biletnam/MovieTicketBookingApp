"use strict";

var moviehalls = require('../data/halldetail').moviehalls;
var _ = require('lodash');

var currentID = 3;
var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var MovieHallApi = {
	getAllMovieHalls: function(callback) {
		callback(null, _clone(moviehalls));
	},
  getMovieHallById: function(id, callback) {
		var moviehall = _.find(moviehalls, {_id: parseInt(id)});
		callback (null, _clone(moviehall));
  },
  updateMovieHallById: function(id, moviehall, callback) {
			var existingMovieHallIndex = _.indexOf(moviehalls, _.find(moviehalls, {_id: parseInt(id)}));
			moviehall._id = parseInt(id);
			moviehall.splice(existingMovieHallIndex, 1, moviehall);
			callback (null);
  },
	saveMovieHall: function(moviehall, callback) {
		currentID = currentID + 1;
    moviehall._id = currentID;
    moviehalls.push(moviehall);
		callback(null, _clone(moviehall));
	},
	deleteMovieHallById: function(id, callback) {
		_.remove(moviehalls, { _id: parseInt(id)});
    callback(null);
	}
};

module.exports = MovieHallApi;
