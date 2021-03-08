let express = require('express');
let router = express.Router();

/* GET profile page. */
router.get('/', function(req, res, next) {
  let data = {
    css : ['profile']
  }
  res.render('profile/profile', data);
});

module.exports = router;
