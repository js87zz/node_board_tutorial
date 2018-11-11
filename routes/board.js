var express = require('express');
var router = express.Router();
var board = require('../controllers/board');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/board/');
});

/* GET home page. */
router.get('/board', function(req, res, next) {
	board.list(req, res);
});

/* GET home page. */
router.get('/board/new', function(req, res, next) {
	board.form(req, res);
});

/* POST home page. */
router.post('/board/new', function(req, res, next) {
	board.create(req, res);
});

/* GET home page. */
router.get('/board/:no', function(req, res, next) {
	board.show(req, res);
});

/* DELETE home page. */
router.delete('/board/:no', function(req, res, next) {
	board.remove(req, res);
});

module.exports = router;
