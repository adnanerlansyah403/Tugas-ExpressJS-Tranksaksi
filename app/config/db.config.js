const HOST = "localhost";
const USER = "postgres";
const PASSWORD = "postgres";
const DB = "far-express";
const dialect = "postgres";
const pool = {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
};

export default {
    DB,
    HOST,
    USER,
    PASSWORD,
    dialect,
    pool
}
