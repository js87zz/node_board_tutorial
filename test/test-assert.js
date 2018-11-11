var assert = require('assert');
var assert = require('');

var board = {writer: '김철수', title: '제목1', content: '내용'};
var result = {writer: '김철수', title: '제목1', content: '내용'};

assert(board === board);
//assert(board === result);

// 하나라도 테스트를 동과하지 못하면 다음 테스트를 진행하지 않는다.
// 예외 처리등의 정교한 테스트 코드가 필요함.
//assert.equal(result, board);

// 객체의 속성값을 비교하고 싶은 경우는 deepEqual메소드를 이용한다.
assert.deepEqual(result, board);

// 여러개의 비동기 함수 테스트 시 마지막으로 성공한 함수를 찾기가 불편함.
setTimeout(function(){
	assert.equal(result, board);
}, 1000);

setTimeout(function(){
	assert.deepEqual(result, board);
}, 2000);

console.log('테스트 성공');