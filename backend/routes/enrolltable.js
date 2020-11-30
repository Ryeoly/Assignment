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

var pool = mysql.createPool({
    connectionLimit: 5,
    host     : 'assign.bluemango.me',
    user     : 'root',
    password : '1234!',
    database : 'db_project'
});

router.get('/hotdeal', function (req, res, next)  {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT snum, sname, remainder FROM subject WHERE remainder<=3", function(err, results) {
                if (err) {
                    return res.json({success: false});
                }
                else return res.json({success: true, subject: results});
            })
        connection.release();
    });
});


/* GET users listing. */
router.post('/', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'select *, person.name as p_name from subject, person where subject.pid = person.pid',
            function (err, rows) {
                console.log(rows);
                if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                connection.query(
                    'select cart.*, p.name as p_name\n' +
                    'from (select sub.* from subject as sub, score as sc where sub.snum = sc.snum and sc.pid = ? and sc.semester= ?) as cart, person as p\n' +
                    'where cart.pid = p.pid;\n', [req.body.pid, req.body.semes],
                    function (err2, rows2) {
                        console.log(rows2);
                        if (err2) console.log(err2)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                        res.json({rows, rows2});
                    });
            });
        connection.release();
    });
});

router.post('/detail', function(req, res, next) {
    var type = req.body.type;
    var majorr = req.body.major;
    var number = req.body.number;
    if(type.length === 0){
        type = '%';
    }
    if(majorr.length === 0){
        majorr = '%';
    }
    if(number.length === 0){
        number = '%';
    }
    if(type === '2'){
        type = '%';
    }
    const result = type+'-'+number+'-'+majorr+'%';
    pool.getConnection(function (err, connection) {
        connection.query(
            'select * from subject where snum like ?', result,
            function (err, search_result) {
                console.log(search_result);
                if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                res.json(search_result);
            });
        connection.release();
    });
});
module.exports = router;

router.post('/cart', function(req, res, next) {
    var snum = req.body.cartlist.snum;
    pool.getConnection(function (err, connection) {
        connection.query(
            'insert into score (pid, snum, semester) values (?, ? , ?)', [req.body.pid, snum, req.body.semes],
            function (err, rows) {
                console.log(rows);
                if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
            });
        connection.query(
            'update subject set remainder = remainder - 1 where snum = ?', snum,
            function (err2, rows2) {
                console.log(rows2);
                if (err2) console.log(err2)        // 만약 에러값이 존재한다면 로그에 표시합니다.
            });
        connection.release();
    });
});

router.post('/delcart', function(req, res, next) {
    var item = req.body.delitem;
    var semes = '21-1';
    pool.getConnection(function (err, connection) {

        connection.query(
            'delete from score where snum = ? and semester=? and pid=?', [item, semes, req.body.pid],
            function (err, rows) {
                console.log(rows);
                if (err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                connection.query(
                    'update subject set remainder = remainder+1 where snum = ?', item,
                    function (err3, rows3) {
                        console.log(rows3);
                        if (err3) console.log(err3)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                        connection.query(
                            'select *, person.name as p_name from subject, person where subject.pid = person.pid',
                            function (err2, rows2) {
                                console.log(rows2);
                                if (err2) console.log(err2)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                                connection.query(
                                    'select cart.*, p.name as p_name\n' +
                                    'from (select sub.* from subject as sub, score as sc where sub.snum = sc.snum and sc.pid = ? and sc.semester= ?) as cart, person as p\n' +
                                    'where cart.pid = p.pid;\n', [req.body.pid, semes],
                                    function (err2, result2) {
                                        console.log(result2);
                                        if (err2) console.log(err2)        // 만약 에러값이 존재한다면 로그에 표시합니다.
                                        res.json({rows2, result2});
                                    });
                            });
                    });
            });
        connection.release();
    });

});