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
router.post('/', function (req, res, next) {
    var a=1;
    var query = connection.query(
        'select p1.name, p1.pid from friend as f1, person as p1\n' +
        'where f1.student_a = ? and f1.accept= 1 and f1.student_b = p1.pid\n' +
        'union select p2.name, p2.pid from friend as f2, person as p2\n' +
        'where f2.student_b = ? and f2.accept= 1 and f2.student_a = p2.pid;', [req.body.user, req.body.user],
        function (err, friend_list) {
            console.log(friend_list);
            if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.

            var query = connection.query(
                'select fr.student_a as friend_pid, pr.name\n' +
                'from person as pr, friend as fr\n' +
                'where fr.student_b = ? and accept = 0 and fr.student_a = pr.pid;', [req.body.user],
                function (err, apply_list) {
                    if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.

                    var query2 = connection.query(
                        'select sub.* from score as sc, subject as sub where sc.pid = ? and sc.snum=sub.snum and sc.semester=?',[req.body.user,req.body.semes],
                        function (err, rows2) {
                            if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                            var query2 = connection.query(
                                'select * from score, notice, subject where score.snum = notice.snum and score.pid = ? and score.snum = subject.snum order by date DESC limit 6', [req.body.user],
                                function (err, notice) {
                                    if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                                    console.log(notice);
                                    res.json({apply_list, friend_list, rows2, notice});
                                });
                        });

                });
        });
});

router.post('/add_friend', function(req, res, next) {
    var result=[];
    if(req.body.user === req.body.friend){          //자기 자신 친구로 넣은 경우
        result.push('same');
        res.json({result});
        return 0;
    }
    var query = connection.query(
        'select accept from friend as f1 where (f1.student_a=? and f1.student_b=?) \n' +
        '                              or (f1.student_a=? and f1.student_b=?);', [req.body.user,req.body.friend,req.body.friend,req.body.user],
        function (err, exist_friend) {
            if (err) console.log(err)
            if(exist_friend.length !==0 ){
                console.log(exist_friend);
                console.log(exist_friend[0].accept);
                if(exist_friend[0].accept === 0) {
                    result.push('already_apply');
                    res.json({result});
                    return 0;
                }
                else{
                    result.push('already');          //이미 친구상태인 경우
                    res.json({result});
                    return 0;
                }
            }
            var query2 = connection.query(
                'insert into friend (student_a, student_b) value (?, ?)', [req.body.user,req.body.friend],
                function (err, add_friend) {
                    if (err){
                        console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                        result.push('error');
                        res.json({result});
                        return 0;
                    }
                    result.push('success');
                    res.json({result});
                    console.log(result);
                });
        });

});

router.post('/accept', function(req, res, next) {
    var query = connection.query(
        'update friend set accept = 1 where student_a = ? and student_b = ? and accept = 0', [req.body.friend_pid,req.body.user],
        function (err, friend_list) {
            var result=[];
            if (err) {
                console.log(err);
                result.push('error');
                res.json({result});
                return 0;
            }
            result.push('successs');
            res.json({result});

        });
});

router.post('/reject', function(req, res, next) {
    var query = connection.query(
        'delete from friend where student_a = ? and student_b = ? and accept = 0', [req.body.friend_pid, req.body.user],
        function (err, friend_list) {
            if (err) console.log(err)
        });
});

router.post('/calltable', function (req, res, next) {
    var query = connection.query(
        'select sub.* from score as sc, subject as sub where sc.pid = ? and sc.snum=sub.snum and sub.semester=?', [req.body.friend_pid, req.body.semes],
        function (err, friend_table) {
            if (err) console.log(err)
            res.json(friend_table)
        });
});
module.exports = router;
