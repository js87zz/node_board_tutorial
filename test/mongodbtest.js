// 현재 DB 삭제
db.runCommand({dropDatabase: 1});

// 등록할 게시물
var b1 = {
		_id: 1,
		title: '첫번째 게시물',
		writer: '김철수',
		content: '첫번째 게시물 입니다.',
		view: 0,
		regdate: '04.08 12:34'
};
var b2 = {
		_id: 2,
		title: '두번째 게시물',
		writer: '이영희',
		content: '두번째 게시물 입니다.',
		view: 0,
		regdate: '04.09 12:54'
};

// 게시물 등록(collection.insert(document))
db.board.insert(b1);
db.board.insert(b2);

// 게시물 목록 조회
// collection.find({검색조건}, {출력속성})).sort({정렬옵션}).limit(개수)
db.board.find({_id: 2});
db.board.find({_id: 2, writer: '김철수'});
db.board.find({_id: 2}, {writer: 1, title: 1, _id: 0});
db.board.find({}, {writer: 1, title: 1, _id: 0});
db.board.find().sort({_id: - 1}).limit(1);

// 모든 게시물을 _id의 내림차순으로 조회
// (출력 컬럼은 번호, 제목, 글쓴이, 조회수, 작성일)
db.board.find({}, { content: 0}).sort({_id: -1});

// 게시물 상세 조회
db.board.findOne({_id: 2}, {writer: 1, title: 1, content: 1});

// 게시물 수정(collection.update({검색조건}, {수정할문서}))
db.board.update({_id: 2}, {title: '수정한 제목'});
db.board.update({_id: 1}, {'$set': {title: '수정한 제목2'}});
// 지정한 필드의 값을 1증가시킨다.
db.board.update({_id: 1}, {'$inc': {view: 1}});

// 게시물 상세 조회 및 업데이트(update와 동작은 같으나 찾은 문서를 리턴해준다)
var b3 = db.board.findOneAndUpdate({_id: 2}, {'$inc': {view: 1}});

// 게시물 삭제
db.board.remove({_id: 1});

// sequence용 데이터 추가
db.seq.insert({seq: 1});

// sequence 조회
var seq = db.seq.findOneAndUpdate({}, {'$inc': {seq: 1}});
seq;

// 데이터베이스 변경
//use board

// board DB 초기화
use board;
db.runCommand({dropDatabase: 1});
db.board.insert([b1, b2]);
db.seq.insert({seq: 3});




// routers/board.js
router.get('/board'
	, function(req, res, next) {
  board.list(req, res);
});

// controllers/board.js
module.exports.list = function(req, res){
	board.list(function(result){
		res.render('board/list'
			, { title: '게시물 목록', list: result });
	});
};

// models/board.js
list: function(cb){
	db.board.find({}, {content: 0}).sort({_id: -1})
		.toArray(function(err, result){cb(result);});
}







