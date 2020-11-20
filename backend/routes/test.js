var express = require('express');
var router = express.Router();
let mysql = require('mysql'); //mysql 모듈을 로딩.
let connection = mysql.createConnection({
    host: '192.168.1.10', // DB가 위치한 IP 주소
    port: 3306,          // DB와 연결할 포트번호
    user: 'gajok',        // 계정이름
    password: '1234!',    // 계정 비밀번호
    database: 'crolls'    // 데이터베이스 이름
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    var query = connection.query(
        'select idx, title, ctime, url, gob from data_set where idx > 0 and idx <= 10',
        function (err, rows) {
            if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
            res.send(rows);
        });
});

module.exports = router;
