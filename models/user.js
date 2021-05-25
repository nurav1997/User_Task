const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Todo = sequelize.define('UT_User',
    {
        UID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        BID: {
            type: Sequelize.TEXT,
        },
        FID: {
            type: Sequelize.TEXT,
        },
        UserName: {
            type: Sequelize.DATE,
        }

    }, {
    tableName: 'UT_User'
}
);

module.exports = Todo;