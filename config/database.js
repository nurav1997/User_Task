const Sequelize = require('sequelize');
module.exports = new Sequelize('PrcLskK2zX', 'PrcLskK2zX', 'yMBdKApXhZ', {
    host: 'remotemysql.com',
    port: 3306,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000

    },
    define: {
        timestamps: false
    },
});