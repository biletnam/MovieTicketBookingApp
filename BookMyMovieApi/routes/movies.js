var MovieApi = require('../api/MovieApi');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  MovieApi.getAllMovies(function(err, items) {
    res.render('movie/index', {title: 'Movies', movies: items})
	});
});


router.post('/create', function(req, res) {
  var movie = {};
  movie.name = req.body.name;
  movie.description = req.body.description;
  movie.image = req.body.image;
  MovieApi.saveMovie(movie, function(err, movie) {
	  res.redirect('/movie');
  });
});

router.get('/edit/:id', function(req, res) {
  MovieApi.getMovieById(req.params.id, function(err, movie) {
    res.render('movie/edit', {movie: movie});
  });

});

router.post('/edit/:id', function(req, res) {
  var updatedMovie = {};
  updatedMovie.name = req.body.name;
  updatedMovie.description = req.body.description;
  updatedMovie.image = req.body.image;
  MovieApi.updateMovieById(req.params.id, updatedMovie, function(err) {
			res.redirect('/movie');
  });
});

router.get('/delete/:id', function(req, res) {
  MovieApi.deleteMovieById(req.params.id, function(err) {
    res.redirect('/movie');
  });
});

module.exports = router;
