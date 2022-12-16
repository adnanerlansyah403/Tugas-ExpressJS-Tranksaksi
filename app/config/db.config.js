const HOST = "localhost";
const PORT = 3306;
const USER = "root";
const PASSWORD = "";
const DATABASENAME = "expressauthentication";
const dialect = "mysql";
const pool = {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
};

export default {
    DATABASENAME,
    HOST,
    PORT,
    USER,
    PASSWORD,
    dialect,
    pool
}
