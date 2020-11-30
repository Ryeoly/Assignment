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

/* GET home page. */
router.post('/', function(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'select pid, name, pmajor from person where pid= ?', [req.body.user],
            function (err, db_user) {

                connection.query(
                    'select avg_grade, pid, semester, pmajor, hakjum, count(*) over (partition by semester,pmajor) as totalcount,\n' +
                    '       rank() over (partition by semester,pmajor order by avg_grade desc) as ranking, avg_grade*hakjum as avofav\n' +
                    'from average where semester =?', [req.body.selected],
                    function (err, db_score) {

                        console.log('db_user' + db_user);
                        console.log('db_score' + db_score);
                        res.json({db_user, db_score});

                    });
            });
        connection.release();
    });
});

module.exports = router;
