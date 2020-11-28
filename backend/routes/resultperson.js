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

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    var query = connection.query('select pid, name, pmajor from person where pid= ?', [req.body.user],
        function (err, db_user) {
            if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
            var query2 = connection.query(
                'select sc.snum, sc.semester, sc.grade, su.sname, su.hakjum from score as sc, subject as su where sc.pid= ? and su.snum = sc.snum and sc.semester = ?',[req.body.user, req.body.semester],
                function (err, db_score) {
                    if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                    var query3 = connection.query(
                        'select first, second from (\n' +
                        '(select sum(subject.hakjum) as first from score,subject where score.pid = ? and score.snum like "0-%-%-%" and score.snum = subject.snum and score.semester = ?) as query1,\n' +
                        '(select sum(subject.hakjum) as second from score,subject where score.pid = ? and score.snum like "0-%-%-%" and score.snum = subject.snum) as query2);\n'
                        ,[req.body.user ,req.body.recent, req.body.user ],
                        function (err, jeongong) {
                            if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                            var query4 = connection.query(
                                'select first, second from (\n' +
                                '(select sum(subject.hakjum) as first from score,subject where score.pid = ? and score.snum like "1-%-%-%" and score.snum = subject.snum and score.semester = ?) as query1,\n' +
                                '(select sum(subject.hakjum) as second from score,subject where score.pid = ? and score.snum like "1-%-%-%" and score.snum = subject.snum) as query2);\n'
                                ,[req.body.user, req.body.recent,req.body.user],
                                function (err, gyoyang) {
                                    if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                                    var query = connection.query(
                                        'select b.avg_grade * b.hakjum as avofav, b.semester ,b.avg_grade as chartav, b.hakjum from average as b where b.pid = ? group by b.semester;',[req.body.user],
                                        function (err, sungjeok) {
                                            if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                                            console.log(sungjeok);
                                            var semester = [];
                                            var chartav = [];
                                            for (var i=0; i<sungjeok.length; i++){
                                                semester.push(sungjeok[i].semester);
                                                chartav.push(sungjeok[i].chartav);
                                            }
                                            console.log(semester);
                                            console.log(chartav);
                                            var query = connection.query(
                                                'select ps.name, ps.pmajor from person as ps, average as av where ps.pid = av.pid and av.semester = ? and avg_grade >=ALL (select avg_grade from average as k where k.pmajor = av.pmajor and k.semester =?);\n', [req.body.recent,req.body.recent],
                                                function (err, janghak) {
                                                    if (err) console.log(err)
                                                    res.json({db_user, db_score, jeongong, gyoyang,sungjeok,janghak, chartav, semester});
                                                });

                                        });
                                });
                        });
                });
        });

});

module.exports = router;
