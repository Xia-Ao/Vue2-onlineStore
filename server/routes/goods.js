let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../modules/goods');


mongoose.connect('mongodb://35.200.14.97:27017/store');

mongoose.connection.on('connected', () => {
  console.log('connect success');
});
mongoose.connection.on('error', () => {
  console.log('connect fail');
});
mongoose.connection.on('disconnected', () => {
  console.log('connect disconnected');
});

router.get('/', (request, res, nex) => {
  Goods.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  });
});

module.exports = router;
