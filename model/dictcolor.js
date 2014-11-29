var Sequelize = require('sequelize');
var sequelize = require('../lib/sequelize');

var Color = sequelize.define('Color', {
    id:Sequelize.BIGINT,
    alias:Sequelize.INTEGER,
    color_name:Sequelize.STRING,
    create_time:Sequelize.NOW,
    is_valid:Sequelize.BOOLEAN
}, {
    tableName:'weshop_area',
    timestamps:false
});

module.exports = Color;