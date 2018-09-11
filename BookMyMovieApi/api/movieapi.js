"use strict";

var movies = require('../data/moviedetail').movies;
var _ = require('lodash');

var currentID = 3;
var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var MovieApi = {
	getAllMovies: function(callback) {
		callback(null, _clone(movies));
	},
  getMovieById: function(id, callback) {
		var movie = _.find(movies, {_id: parseInt(id)});
		callback (null, _clone(movie));
  },
  updateMovieById: function(id, movie, callback) {
			var existingMovieIndex = _.indexOf(movies, _.find(movies, {_id: parseInt(id)}));
			movie._id = parseInt(id);
			movie.splice(existingMovieIndex, 1, movie);
			callback (null);
  },
	saveMovie: function(movie, callback) {
		currentID = currentID + 1;
    movie._id = currentID;
    movies.push(movie);
		callback(null, _clone(movie));
	},
	deleteMovieById: function(id, callback) {
		_.remove(movies, { _id: parseInt(id)});
    callback(null);
	}
};

module.exports = MovieApi;
