var express = require('express');
var router = express.Router();
let mysql = require('mysql'); //mysql 모듈을 로딩.
var path = require('path');

let connection = mysql.createPool({
    host: 'assign.bluemango.me', // DB가 위치한 IP 주소
    port: 3306,          // DB와 연결할 포트번호
    user: 'root',        // 계정이름
    password: '1234!',    // 계정 비밀번호
    database: 'helper'    // 데이터베이스 이름
});
//////////////////////   페이지 생성 공지사항 정보  /////////////////////////////
router.post('/', function (req, res, next) {
    console.log(req.body.index);
    var query = connection.query(
        'select * from notice where idx=?',[req.body.index],
        function (err, rows) {
            if(err) console.log(err);
            var query = connection.query(
                'update notice set hit = hit+1 where idx=?',[req.body.index],
                function (err, increase_hit) {
                    if(err) console.log(err);
                    console.log(rows);
                    res.json(rows);
                });
        });
});

//////////////////////   댓글 보기   ///////////////////////////////
router.post('/lookup', function (req, res, next) {
    var query = connection.query(
        'select comment, reply.pid, reply.date, person.name from notice, reply, person where notice.idx = reply.n_idx and notice.idx = ? and reply.pid = person.pid order by seq;',
        req.body.index,
        function (err, rows) {
            if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
            console.log(rows);
            res.json(rows);
        });
});

////////////////////// 댓글 올리기 /////////////////////////////
router.post('/input', function (req, res, next) {

    var query = connection.query(
        'insert into reply (n_idx, comment, pid) VALUES (?, ?, ?)',[req.body.index,req.body.comment,req.body.pid],
        function (err, dummy) {
            if (err) console.log(err)

            var query = connection.query(
                'select person.name ,reply.comment ,reply.date from person,reply where reply.date = (select MAX(date) from reply) and reply.pid = person.pid and reply.n_idx = ?',
                req.body.index,
                function (err, rows) {
                    if(err) console.log(err);
                    console.log(rows);
                    res.json(rows);
                });
        });

});
module.exports = router;
