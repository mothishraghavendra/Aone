const mysql = require('mysql2/promise');

async function testConnection() {
    const config = {
        host: 'localhost',
        user: 'root',
        password: '#Mothish@123',
        multipleStatements: true
    };

    try {
        console.log('Attempting to connect to MySQL...');
        const connection = await mysql.createConnection(config);
        console.log('Successfully connected to MySQL!');
        
        // Try to create and use the database
        console.log('\nAttempting to create database...');
        await connection.query('CREATE DATABASE IF NOT EXISTS aone');
        console.log('Database "aone" created or already exists');
        
        await connection.query('USE aone');
        console.log('Successfully switched to database "aone"');
        
        await connection.end();
        console.log('\nConnection closed successfully');
        
    } catch (error) {
        console.error('Error:', error.message);
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\nTroubleshooting tips:');
            console.log('1. Verify the MySQL root password is correct');
            console.log('2. Make sure MySQL server is running');
            console.log('3. Check if the user "root" has proper privileges');
        }
    }
}

testConnection();