var board = require('../models/board');

module.exports.list = function(req, res){
	board.list(function(result){
		res.render('board/list', { title: '게시물 목록', list: result});
	});
};
module.exports.form = function(req, res){
	res.render('board/write', { title: '글쓰기' });
};
module.exports.create = function(req, res){
	var data = req.body;
	board.create(data, function(result){
		res.render('board/result', { title: '작성결과', no: result});
	});
};
module.exports.show = function(req, res){
	var no = req.params.no;
	board.show(no, function(result){
		res.render('board/view', { title: '내용 조회' , board: result});
	});
};
module.exports.remove = function(req, res){
	var no = req.params.no;
	board.remove(no, function(){
		res.redirect('/board/');
  });
};