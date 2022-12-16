import config from "../config/db.config.js";
import { Sequelize } from 'sequelize';
import User from "../models/user.model.js";
import Role from "../models/role.model.js";


const sequelize = new Sequelize(
    "auth-jwt",
    "postgres",
    "postgres",
    {
      host: "localhost",
      dialect: "postgres",
      pool: {
        max: 9,
        min: 0,
        idle: 10000
      },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User(sequelize, Sequelize);
db.role = Role(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
})
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

function initial() {
  db.role.create({
    id: 1,
    name: "user"
  });
 
  db.role.create({
    id: 2,
    name: "moderator"
  });
 
  db.role.create({
    id: 3,
    name: "admin"
  });
}

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

export default db;
