const mysql = require('mysql2/promise');
const config = require('../config/config');

async function checkDatabase() {
    try {
        console.log('Attempting to connect to MySQL with config:', {
            host: config.database.host,
            user: config.database.user,
            database: config.database.database,
            port: config.database.port
        });

        const connection = await mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
            port: config.database.port
        });

        console.log('Successfully connected to database');

        // Check users table
        const [users] = await connection.query('SELECT * FROM users');
        console.log('\nUsers in database:', users);

        // Check students table
        const [students] = await connection.query('SELECT * FROM students');
        console.log('\nStudents in database:', students);

        // Show tables in the database
        const [tables] = await connection.query('SHOW TABLES');
        console.log('\nTables in database:', tables);

        await connection.end();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkDatabase();