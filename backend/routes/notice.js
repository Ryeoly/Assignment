var express = require('express');
var router = express.Router();
let mysql = require('mysql'); //mysql 모듈을 로딩.
var pool = mysql.createPool({
    connectionLimit: 5,
    host     : 'assign.bluemango.me',
    user     : 'root',
    password : '1234!',
    database : 'db_project'
});

/* GET users listing. */
router.post('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'select * from notice where snum = ? order by idx DESC', [req.body.snum],
            function (err, notice_list) {
                if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                connection.query(
                    'select person.name, person.tel, person.addr, person.email, person.birth from person,subject where subject.snum=? and subject.pid=person.pid',
                    [req.body.snum],
                    function (err, prof_inform) {
                        if (err) console.log(err)
                        connection.query(
                            'select subject.* from score,subject where subject.snum=score.snum and score.pid=? and score.semester=?',
                            [req.body.user, req.body.semester],
                            function (err, subject_list) {
                                if (err) console.log(err)
                                res.json({notice_list, prof_inform, subject_list});
                            });
                    });
            });
        connection.release();
    });
});
router.post('/search', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'select * from notice where snum = ? and title like ?', [req.body.snum, ('%' + req.body.Title + '%')],
            function (err, rows) {
                if (err) console.log(err)
                res.json(rows);
            });
        connection.release();
    });
});

module.exports = router;
