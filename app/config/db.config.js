const HOST = "localhost";
const USER = "root";
const PASSWORD = "";
const DB = "expressauthentication";
const dialect = "mysql";
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
