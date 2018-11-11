var assert = require('assert');
var mongoBoard = require('../models/board');

var board = {writer: '김철수', title: '제목1', content: '내용'};
var result = {writer: '김철수', title: '제목1', content: '내용'};

// test suite
describe('#suite-1 동기 방식 테스트', function(){
	// unit test
	it('#1 board === board', function(){
		assert(board === board);
	});
	it.skip('#2 board === result', function(){
		assert(board === result);
	});
	it('#3 equal(result, board)', function(){
		assert.equal(result, result);
	});
	it('#4 deepEqual(result, board)', function(){
		assert.deepEqual(result, board);
	});
});

//describe.skip('#suite-2 비동기 방식 테스트', function(){
describe('#suite-2 비동기 방식 테스트', function(){
	// suite내에 모든 단위 테스트에 적용(테스트 수행시간제한 default는 2초다.)
	this.timeout(3000);
	it('#1 board === result', function(done){
		setTimeout(function(){
			assert(board === result);
			done();
		}, 2000);
	});
	it('#2 deepEqual(result, board)', function(done){
		//this.timeout(500);
		setTimeout(function(){
			assert.deepEqual(result, board);
			done();
		}, 1000);
	});
});

//describe.only('#suite-3 다른 suite 제외', function(){
describe('#suite-3 다른 suite 제외', function(){
	it('#1 deepEqual(result, board)', function(){
		assert.deepEqual(result, board);
	});
});

describe('#suite-4 게시판 기능 테스트', function(){
	var boardList;
	var newNo;
	// 테스트 전 사전 작업
	before(function(done){
		mongoBoard.list(function(list){
			boardList = list;
			done();
		});
		
	});
	it('#1 등록', function(done){
		mongoBoard.create(board, function(no){
			newNo = no;
			assert.equal(no, boardList[0]._id+1);
			done();
		});
	});
	it('#2 조회', function(done){
		mongoBoard.show(newNo, function(nResult){
			assert.deepEqual(nResult, board);
			done();
		});
	});
	it('#3 삭제', function(done){
		mongoBoard.remove(newNo, function(){
			done();
		});
	});
	it('#4 삭제완료 및 목록조회', function(done){
		mongoBoard.list(function(list){
			assert.deepEqual(list, boardList);
			done();
		});
	});
});

// 터미널 명령어
// mocha ./test/test-mocha

//setTimeout(function(){
//	assert.equal(result, board);
//}, 1000);
//
//setTimeout(function(){
//	assert.deepEqual(result, board);
//}, 2000);

console.log('테스트 성공');