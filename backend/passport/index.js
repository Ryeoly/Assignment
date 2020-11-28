const LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '223.194.43.120',
    user: 'root',
    password: '1234!',
    database: 'db_project'
});

exports.config = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.pid);
    });

    passport.deserializeUser( async (pid, done) => {
        pool.getConnection(async function (err, connection) {
            connection.query("SELECT pid, pwd, name FROM person WHERE pid = ?", pid, function (err, results) {
                if (results.length !== 0) done(null, results[0]);
                else done(null, false);
            })
            connection.release();
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'pid',
        passwordField: 'pwd',
    }, (pid, pwd, done) => {

        pool.getConnection(async function (err, connection) {
            connection.query("SELECT COUNT(pid) AS isSuccess FROM person WHERE pid = ? AND pwd = ? LIMIT 0, 1", [pid, pwd], function (err, results) {
                if (err) done(err);
                else {
                    if (results[0].isSuccess === 1) done(null, {pid: pid, pwd: pwd});
                    else done(null, false, {isSuccess: false});
                }
            })
            connection.release();
        });
    }));
}