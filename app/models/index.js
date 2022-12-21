import config from "../config/db.config.js";
import { Sequelize } from 'sequelize';
import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import Customer from "../models/customer.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import bcrypt from 'bcryptjs';


const sequelize = new Sequelize('far-express', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User(sequelize, Sequelize);
db.role = Role(sequelize, Sequelize);
db.customer = Customer(sequelize, Sequelize);
db.order = Order(sequelize, Sequelize);
db.product = Product(sequelize, Sequelize);

// Relationships

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

db.customer.belongsToMany(db.product, {
  through: "orders",
  foreignKey: "customerId",
  otherKey: "productId",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
db.product.belongsToMany(db.customer, {
  through: "orders",
  foreignKey: "productId",
  otherKey: "customerId",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
}) 

db.customer.belongsTo(db.user);
db.user.hasOne(db.customer);


db.ROLES = ["user", "admin", "moderator"];

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
})
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

function createUser() {
  db.user.bulkCreate([
    {
      username: 'adnanerlansyah403',
      name: 'Adnan Erlansyah',
      email: 'adnanerlansyah403@gmail.com',
      password: bcrypt.hashSync('12345', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'bayutresna23',
      name: 'Bayu Tresna',
      email: 'bayutresna@gmail.com',
      password: bcrypt.hashSync('12345', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'ridwanhakim44',
      name: 'Ridwan Hakim',
      email: 'ridwanhakim@gmail.com',
      password: bcrypt.hashSync('12345', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
}
function createRole() {
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
function createProduct() {
  db.product.bulkCreate([
    {
      nama: 'Blow Edna Flats Shoes Sepatu',
      uom: 'sepasang',
      harga: 73990,
      stock: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: 'Kipas Angin A58 Usb',
      uom: 'gram',
      harga: 20000,
      stock: 45,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: 'Nutella B',
      uom: 'gram',
      harga: 50000,
      stock: 40,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
}
function createCustomer() {
  db.customer.bulkCreate([
    {
      telp: 81957440893,
      nik: 62182913193,
      alamat: "Kp. Harapan Baru RT 01/ RW 09",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      telp: 87748310753,
      nik: 62138132182,
      alamat: "Jl. Ki Haji No. 4, Cikampek",
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      telp: 84712323189,
      nik: 62132183218,
      alamat: "Jl. Cisitu Indah No. 16, Bandung",
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
}

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  createRole();
  createProduct();
  createUser();
  createCustomer();

});

export default db;
