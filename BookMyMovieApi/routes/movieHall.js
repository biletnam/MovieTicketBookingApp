var MovieHallApi = require('../api/MovieHallApi');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  MovieHallApi.getAllMovieHalls(function(err, moviehalls) {
    if(err)
       {
         return res.json({'success':false,'message':'Some Error'})
         
       }
       else
       {
         res.setHeader('Cache-Control','no-cache');
         response.data=moviehalls;
         res.send(response);
       }
    //res.render('moviehall/index', {title: 'Moviehalls', moviehalls: items})
	});
});

router.post('/create', function(req, res) {
  var moviehall = {};
  moviehall.movie_id = req.body.movie_id;
  moviehall.hall_id = req.body.hall_id;
  moviehall.start_date = req.body.start_date;
  moviehall.end_date = req.body.end_date;

  MovieHallApi.saveMovieHall(moviehall, function(err, moviehall) {
    if(err)
       {
         return res.json({'success':false,'message':'Some Error'})
         
       }
       else
       {
         res.setHeader('Cache-Control','no-cache');
         response.data=moviehall;
         res.send(response);
       }
	 // res.redirect('/moviehall');
  });
});

router.get('/edit/:id', function(req, res) {
  MovieHallApi.getMovieHallById(req.params.id, function(err, moviehall) {
    if(err)
       {
         return res.json({'success':false,'message':'Some Error'})
         
       }
       else
       {
         res.setHeader('Cache-Control','no-cache');
         response.data=moviehall;
         res.send(response);
       }
    //res.render('moviehall/edit', {moviehall: moviehall});
  });

});

router.post('/edit/:id', function(req, res) {
  var updatedMoviehall = {};
  updatedMoviehall.movie_id = req.body.movie_id;
  updatedMoviehall.hall_id = req.body.hall_id;
  updatedMoviehall.start_date = req.body.start_date;
  updatedMoviehall.end_date = req.body.end_date;
  MovieHallApi.updateMovieHallById(req.params.id, updatedMoviehall, function(err) {
    if(err)
       {
         return res.json({'success':false,'message':'Some Error'})
         
       }
       else
       {
         res.setHeader('Cache-Control','no-cache');
         response.data=updatedMoviehall;
         res.send(response);
       }
			//res.redirect('/moviehall');
  });
});

router.get('/delete/:id', function(req, res) {
  MovieHallApi.deleteMovieHallById(req.params.id, function(err) {
    if(err)
       {
         return res.json({'success':false,'message':'Some Error'})
         
       }
       else
       {
         res.setHeader('Cache-Control','no-cache');
         //response.data=moviehall;
         res.send(response);
       }
   // res.redirect('/moviehall');
  });
});

module.exports = router;
