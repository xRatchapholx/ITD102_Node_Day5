const config = require("../config/db.js");

const dataType = require("sequelize");
const sequelize = new dataType(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect
  }
);

const db = {};

db.dataType = dataType;
db.sequelize = sequelize;

db.employee = require("./employee.model.js")(sequelize, dataType);
db.setting = require("./setting.model.js")(sequelize, dataType);
db.company = require("./company.model.js")(sequelize, dataType);

// one-to-one
db.employee.hasOne(db.setting, {
  onDelete: 'CASCADE'
});
db.setting.belongsTo(db.employee);

// one-to-many
db.company.hasMany(db.employee, {
  foreignkey: "companyId",
  onDelete: 'CASCADE'
});
db.employee.belongsTo(db.company, {
  foreignkey: "companyId"
});

module.exports = db;