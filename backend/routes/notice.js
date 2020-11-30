var express = require('express');
var router = express.Router();
let mysql = require('mysql'); //mysql 모듈을 로딩.
let connection = mysql.createConnection({
    host: 'assign.bluemango.me', // DB가 위치한 IP 주소
    port: 3306,          // DB와 연결할 포트번호
    user: 'root',        // 계정이름
    password: '1234!',    // 계정 비밀번호
    database: 'db_project'    // 데이터베이스 이름
});

/* GET users listing. */
router.post('/', function (req, res, next) {
    var query = connection.query(
        'select * from notice where snum = ? order by idx DESC',[req.body.snum],
        function (err, notice_list) {
            if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
            var query2 = connection.query(
                'select person.name, person.tel, person.addr, person.email, person.birth from person,subject where subject.snum=? and subject.pid=person.pid',
                [req.body.snum],
                function (err, prof_inform) {
                    if (err) console.log(err)
                    var query2 = connection.query(
                        'select subject.* from score,subject where subject.snum=score.snum and score.pid=? and score.semester=?',
                        [req.body.user, req.body.semester],
                        function (err, subject_list) {
                            if (err) console.log(err)
                            res.json({notice_list,prof_inform,subject_list});
                        });
                });
        });
});
router.post('/search', function (req, res, next) {

    var query = connection.query(
        'select * from notice where snum = ? and title like ?',[req.body.snum, ('%'+req.body.Title+'%')],
        function (err, rows) {
            if(err) console.log(err)
            res.json(rows);
        });
});

module.exports = router;
