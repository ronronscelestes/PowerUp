var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let data = {
    css : ['index', 'card']
  }
  res.render('index', data);
});

module.exports = router;
