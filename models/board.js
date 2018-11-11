var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://localhost:27017/board', function(err, boardDB){
	db = boardDB;
	db.board = db.collection('board');
	db.seq = db.collection('seq');
});

module.exports = {
		list: function(cb){
			db.board.find({}, {content: 0}).sort({_id: -1})
			.toArray(function(err, result){cb(result);});
		},
		show: function(no, cb){
			// find결과, update결과 2가지의 결과가 있다.
			// find결과는 .value로 꺼낼 수 있다.
			db.board.findOneAndUpdate({_id: parseInt(no, 10)}
				, {'$inc': {view: 1}}, function(err, result){
					cb(result.value);
				});
		},
		create: function(board, cb){
			board.view = 0;
			board.regdate = require('date-format').asString('yyyy-MM-dd hh mm', new Date());
			db.seq.findOneAndUpdate({}, {'$inc': {seq: 1}}, function(err, result){
				console.log("seq", result);
				board._id = result.value.seq;
				db.board.insert(board, function(){
					cb(board._id);
				});
			});
		},
		remove: function(no, cb){
			db.board.remove({_id: parseInt(no)}, function(err, result){
				db.seq.findOneAndUpdate({}, {'$inc': {seq: -1}}, cb);
			});
		}
};
