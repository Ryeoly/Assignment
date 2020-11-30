var express = require('express');
var router = express.Router();
let mysql = require('mysql'); //mysql 모듈을 로딩.
let connection = mysql.createConnection({
    host: 'assign.bluemango.me', // DB가 위치한 IP 주소
    // assign.bluemango.me
    port: 3306,          // DB와 연결할 포트번호
    user: 'root',        // 계정이름
    password: '1234!',    // 계정 비밀번호
    database: 'db_project'    // 데이터베이스 이름
});

/* GET home page. */
router.post('/', function(req, res, next) {
    var query = connection.query(
        'select pid, name, pmajor from person where pid= ?', [req.body.user],
        function (err, db_user) {

            var query2 = connection.query(
                'select avg_grade, pid, semester, pmajor, hakjum, count(*) over (partition by semester,pmajor) as totalcount,\n' +
                '       rank() over (partition by semester,pmajor order by avg_grade desc) as ranking, avg_grade*hakjum as avofav\n' +
                'from average where semester =?', [req.body.selected],
                function (err, db_score) {

                    console.log('db_user'+db_user);
                    console.log('db_score'+db_score);
                    res.json({db_user,db_score});

                });
        });
});

module.exports = router;
