var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
    connectionLimit: 5,
    host     : '223.194.43.120',
    user     : 'root',
    password : '1234!',
    database : 'helper'
});

/* GET users listing. */
router.post('/login', function(req, res, next) {
    pool.getConnection(function (err, connection) {
       connection.query("SELECT COUNT(pid) AS isSuccess FROM person WHERE pid = ? AND pwd = ? LIMIT 0, 1", [req.body.pid, req.body.pwd], function(err, results) {
           if (err) throw err;
           else {
               if (results[0].isSuccess === 1) res.json({isSuccess: true});
               else res.json({isSuccess: false});
           }
       })
    });
});

router.post('/pid', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT COUNT(pid) AS isSuccess FROM person WHERE pid = ? LIMIT 0, 1", [req.body.pid], function(err, results) {
            if (err) throw err;
            else {
                if (results[0].isSuccess === 1) res.json({isSuccess: true});
                else res.json({isSuccess: false});
            }
        })
    });
});

router.post('/join-pid', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT CASE\n" +
            "           WHEN MAX(pnum) is null THEN CONCAT(?, CONCAT(?, '001'))\n" +
            "           ELSE CONCAT(pyear, CONCAT(pmajor, LPAD(MAX(pnum) + 1, 3, '0')))\n" +
            "           END AS next\n" +
            "FROM person\n" +
            "WHERE pyear = ? AND pmajor = ?;", [req.body.p_year, req.body.p_major, req.body.p_year, req.body.p_major], function(err, results) {
            console.log(results[0].next);
            if (err) throw err;
            else return res.json({next: results[0].next});
        })
    });
});

router.post('/join', function(req, res, next) {
    console.log(req.body);
    pool.getConnection(function (err, connection) {
        connection.query("INSERT INTO person (pnum, pyear, pmajor, pwd, name, tel, addr, birth, email, admin) SELECT CASE WHEN MAX(pnum) is NULL THEN 1 ELSE MAX(pnum)+1 END, ?,?,?,?,?, ?,?,?,0 FROM person WHERE pyear=? and pmajor=?",
            [req.body.ID.p_year, req.body.ID.p_major, req.body.PW, req.body.Name, req.body.Tel, req.body.addr, req.body.Birth, req.body.email, req.body.ID.p_year, req.body.ID.p_major], function(err, results) {
            console.log(results[0].next);
            if (err) {
                return res.json({success: false});
            }
            else return res.json({success: true});
        })
    });
});

module.exports = router;