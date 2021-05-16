var mysql = require('mysql');
const util = require('util');

module.exports = {

    connectDB: function () {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.DBPassword,
            database: process.env.Database
        });

        return {
            query(sql, args) {
                return util.promisify(connection.query)
                    .call(connection, sql, args);
            },
            close() {
                return util.promisify(connection.end).call(connection);
            }
        };
    }
}