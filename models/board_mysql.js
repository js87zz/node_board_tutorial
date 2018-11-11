var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: '70.12.112.160',
	user: 'node',
	password: 'node',
	database: 'board'
});

var sql = {
		list: 'SELECT _id, title, writer, view, regdate FROM board ORDER BY _id DESC',
		show: 'SELECT * FROM board WHERE _id=?',
		incView: 'UPDATE board SET view=view+1 WHERE _id=?',
		decView: 'UPDATE board SET view=view-1 WHERE _id=?',
		create: 'INSERT INTO board SET writer=?, title=?, content=?, regdate=?',
		remove: 'DELETE FROM board WHERE _id=?'
};
// mysql 결과 역시 obj요소의 배열로 리턴된다
module.exports = {
	// 게시물 목록 조회
	list: function(cb){
		pool.query(sql.list, function(err, result){
			cb(result);
		});
	},
	// 게시물 상세 조회
	show: function(no, cb){
		pool.query(sql.show, [no], function(err, result){
			pool.query(sql.incView, [no]);
			cb(result[0]);
		});
	},
	// 게시물 등록
	create: function(board, cb){
		board.regdate = require('date-format').asString('yyyy-MM-dd hh:mm', new Date());
		//board.view = 0;
		var data = [board.writer, board.title, board.content, board.regdate];
		pool.query(sql.create, data, function(err, result){
			cb(result.insertId);
		});
	},
	// 게시물 삭제
	remove: function(no, cb){
		pool.query(sql.remove, [no], cb);
	}
};














