import express from "express";
var index = express.Router();

/* GET home page. */
index.get('/test', function(req, res, next) {
  res.render('index', { title: 'Star Wars Api' });
});

export default index;
