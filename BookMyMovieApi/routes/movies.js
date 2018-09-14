var MovieApi = require('../api/MovieApi');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  MovieApi.getAllMovies(function(err, movies) {
    if(err)
    {
      return res.json({'success':false,'message':'Some Error'})
      
    }
    else
    {
      res.setHeader('Cache-Control','no-cache');
      response.data=movies;
      res.send(response);
    }
    //res.render('movie/index', {title: 'Movies', movies: items})
	});
});


router.post('/create', function(req, res) {
  var movie = {};
  movie.name = req.body.name;
  movie.description = req.body.description;
  movie.image = req.body.image;
  MovieApi.saveMovie(movie, function(err, movie) {
    if(err)
       {
         return res.json({'success':false,'message':'Some Error'})
         
       }
       else
       {
         res.setHeader('Cache-Control','no-cache');
         response.data=movie;
         res.send(response);
       }
    //res.redirect('/movie');
  });
});

router.get('/edit/:id', function(req, res) {
  MovieApi.getMovieById(req.params.id, function(err, movie) {
    if(err)
       {
         return res.json({'success':false,'message':'Some Error'})
         
       }
       else
       {
         res.setHeader('Cache-Control','no-cache');
         response.data=movie;
         res.send(response);
       }
   // res.render('movie/edit', {movie: movie});
  });

});

router.post('/edit/:id', function(req, res) {
  var updatedMovie = {};
  updatedMovie.name = req.body.name;
  updatedMovie.description = req.body.description;
  updatedMovie.image = req.body.image;
  MovieApi.updateMovieById(req.params.id, updatedMovie, function(err) {
    if(err)
       {
         return res.json({'success':false,'message':'Some Error'})
         
       }
       else
       {
         res.setHeader('Cache-Control','no-cache');
         response.data=updatedMovie;
         res.send(response);
       }
			//res.redirect('/movie');
  });
});

router.get('/delete/:id', function(req, res) {
  MovieApi.deleteMovieById(req.params.id, function(err) {
    if(err)
       {
         return res.json({'success':false,'message':'Some Error'})
         
       }
       else
       {
         res.setHeader('Cache-Control','no-cache');
         res.send(response);
       }
   // res.redirect('/movie');
  });
});

module.exports = router;
