var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var passport = require('passport');

var pool = mysql.createPool({
    connectionLimit: 5,
    host     : 'assign.bluemango.me',
    user     : 'root',
    password : '1234!',
    database : 'db_project'
});

router.get('/login', function (req, res, next){
   if(req.isAuthenticated() && req.user) {
       return res.json({user: req.user});
   }
   return res.json({user: null});
});

router.post('/login', function (req, res, next) {
   if(req.isAuthenticated()) {
       return res.json({isSuccess: true});
   }
   passport.authenticate('local', (authError, user, info) => {
       if(authError) {
           return next(authError);
       }
       if(!user) {
           return res.json(info);
       }
       return req.login(user, (loginError) => {
           if (loginError) {
               return next(loginError);
           }
           return res.json({ user });
       });
   })(req, res, next);
});

router.get('/logout', function (req, res, next){
    req.logout();
    req.session.save(function(){
        res.json({isSuccess: true});
    });
});

router.post('/userinfo', function (req, res, next){
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM person WHERE pid=?", [req.body.pid], function(err, results) {
            if (err) throw err;
            else {
                if (results.length === 1) res.json({isSuccess: true, info: results[0]});
                else res.json({isSuccess: false, info: null});
            }
        })
        connection.release();
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
        connection.release();
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
        connection.release();
    });
});

router.post('/join', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("INSERT INTO person (pnum, pyear, pmajor, pwd, name, tel, addr, birth, email, admin) SELECT CASE WHEN MAX(pnum) is NULL THEN 1 ELSE MAX(pnum)+1 END, ?,?,?,?,?, ?,?,?,0 FROM person WHERE pyear=? and pmajor=?",
            [parseInt(req.body.ID.p_year), parseInt(req.body.ID.p_major), req.body.PW, req.body.Name, req.body.Tel, req.body.addr, req.body.Birth, req.body.email, parseInt(req.body.ID.p_year), parseInt(req.body.ID.p_major)], function(err, results) {
            if (err) {
                return res.json({success: false});
            }
            else return res.json({success: true});
        })
        connection.release();
    });
});

router.post('/update', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("UPDATE person SET pwd=?, tel=?, addr=?, birth=?, email=? WHERE pid=?",
            [req.body.info.pwd, req.body.info.tel, req.body.info.addr, req.body.info.birth, req.body.info.email, req.body.info.pid], function(err, results) {
                if (err) {
                    return res.json({success: false});
                }
                else return res.json({success: true});
            })
        connection.release();
    });
});

module.exports = router;