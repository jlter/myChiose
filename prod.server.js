var express = require('express');
var config = require('./config/index');
var port = process.env.POST ||config.build.process;

var app = express();

var router = express.Router();

router.get('/',function (req,res,next) {
  req.url = '/index.html';
  next()
});

app.use(router);

var appData = require('./data.json');
var seller = appData.seller;
var goods  = appData.goods;
var rating = appData.ratings;

var apiRoutes = express.Router();
apiRoutes.get('/seller',function (req,res) {
  res.json({
    errno:0,
    data:seller
  })
});
apiRoutes.get('/goods',function(req,res){
  res.json({
    errno:0,
    data:goods
  })
});
apiRoutes.get('/rating',function(req,res){
  res.json({
    errno:0,
    data:rating
  })
});
app.use('/api', apiRoutes);
