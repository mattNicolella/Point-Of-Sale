const mysql = require('mysql');

module.exports = {
    query: function (str = '', callbackfunc = null) {
        if(typeof connection === 'undefined') {
            connection = mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWD,
                database: process.env.DATABASE
            });

            connection.connect();

            console.log('open DB');
        }
        connection.query(str, function (error, results, fields) {
            if (error) throw error;
            if (callbackfunc != null)
                callbackfunc(results);
        });

        triggerCloseDB();
    },
    debounce: function(func, timeout = process.env.CONNECTION_TIMOUT){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    },
    closeDB: () => {
        console.log('closeDB');
        connection.end();
        connection = undefined;
    },
    connection: undefined
}