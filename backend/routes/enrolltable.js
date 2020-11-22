var express = require('express');
var router = express.Router();
let mysql = require('mysql'); //mysql 모듈을 로딩.
let connection = mysql.createConnection({
    host: '192.168.1.10', // DB가 위치한 IP 주소
    // assign.bluemango.me
    port: 3306,          // DB와 연결할 포트번호
    user: 'gajok',        // 계정이름
    password: '1234!',    // 계정 비밀번호
    database: 'crolls'    // 데이터베이스 이름
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    var query = connection.query(
        'select * from subject',
        function (err, rows) {
            console.log(rows);
            if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
            res.json(rows);
        });
});

module.exports = router;
