export default {
    mysql: {
        host: process.env.DB_HOST,
        connectionLimit: 10,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA
    },
    auth: {
        secret: process.env.SECRET
    }
}