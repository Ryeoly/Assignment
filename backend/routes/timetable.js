var express = require('express');
var router = express.Router();
let mysql = require('mysql'); //mysql 모듈을 로딩.
var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'assign.bluemango.me',
    user: 'root',
    password: '1234!',
    database: 'db_project'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'select stime from score where pid=1',
            function (err, rows) {
                console.log(rows);
                if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                res.json(rows);
            });
        connection.release();
    });
});

module.exports = router;
