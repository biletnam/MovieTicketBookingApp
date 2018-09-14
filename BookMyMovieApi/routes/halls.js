var express = require('express');
var router = express.Router();
var HallApi=require('../api/hallapi');


let response={
  status:200,
  data:[],
  message:null,
  success:true
}

/* GET halls listing. */
router.get('/', function(req, res, next) {
    HallApi.getAllHalls(function(err, halls) {
       if(err)
       {
         return res.json({'success':false,'message':'Some Error'})
         
       }
       else
       {
         res.setHeader('Cache-Control','no-cache');
         response.data=halls;
         res.send(response);
       }
        });
});
router.get('/edit/:id', function(req, res) {
  HallApi.getHallById(req.params.id, function(err, hall) {
    if(err)
     {
       return res.json({'success':false,'message':'Some Error'})
     }
     else
     {
       res.setHeader('Cache-Control','no-cache');
       response.data=hall;
       res.json(response);
     }
  });

});

router.get('/city', function(req, res, next) {
  HallApi.getDistinctCity(function(err, city) {
      if(err)
      {
        document.write("error");
        return res.json({'success':false,'message':'Some Error'})
      }
      else
      {
        res.setHeader('Cache-Control','no-cache');
        response.data=city;
        res.json(response);
      }
      });
});



router.put('/create', function(req, res) {
    var hall = {};
    hall.city = req.body.city;
    hall.hall_name = req.body.hall_name;
    hall.screen = req.body.screen;
    hall.no_of_seats = req.body.no_of_seats;
  
    HallApi.saveHall(hall, function(err, hall) {
      if(err)
      {
        return res.json({'success':false,'message':'Some Error'})
      }
      else
      {
        res.setHeader('Cache-Control','no-cache');
        response.data=hall;
        res.json(response);
      }
    });
  });
  
 
  
  router.post('/edit/:id', function(req, res) {
    var updatedHallDetail = {};
    updatedHallDetail.city = req.body.city;
    updatedHallDetail.hall_name = req.body.hall_name;
    updatedHallDetail.screen = req.body.screen;
    updatedHallDetail.no_of_seats = req.body.no_of_seats;
    HallApi.updateHallById(req.params.id, updatedHallDetail, function(err) {
      if(err)
      {
        return res.json({'success':false,'message':'Some Error'})
      }
      else
      {
        res.setHeader('Cache-Control','no-cache');
        response.data=updatedHallDetail;
        res.json(response);
      }
    });
  });
  
  router.delete('/delete/:id', function(req, res) {
    HallApi.deleteHallById(req.params.id, function(err) {
      if(err)
      {
        return res.json({'success':false,'message':'Some Error'})
      }
      else
      {
        res.setHeader('Cache-Control','no-cache');
        //response.data=halls;
        res.json(response);
      }
    });
  });

module.exports = router;