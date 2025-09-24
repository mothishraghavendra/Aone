const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
const config = require('../config/config');
const { createDefaultUsers } = require('./init-default-users');

async function initializeDatabase() {
    let connection;
    
    try {
        // Create connection without database selected
        connection = await mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            password: config.database.password
        });

        console.log('Connected to MySQL server');

        // Create and use the database
        try {
            await connection.query('DROP DATABASE IF EXISTS aone');
            console.log('Dropped existing database');
            await connection.query('CREATE DATABASE aone');
            console.log('Created new database');
            await connection.query('USE aone');
            console.log('Using aone database');
        } catch (error) {
            console.error('Error setting up database:', error);
            throw error;
        }

        // Read and execute SQL files in order
        const sqlFiles = [
            '00_users_auth.sql',
            '01_students_academics.sql',
            '02_hostel_services.sql',
            '03_payments_exams.sql',
            '04_alumni_services.sql'
        ];

        for (const file of sqlFiles) {
            const filePath = path.join(__dirname, file);
            const sql = await fs.readFile(filePath, 'utf8');
            
            // Split the file content into individual statements
            let statements = sql
                .split(/(?<=;)/)  // Split after semicolons while keeping them
                .map(statement => statement.trim())
                .filter(statement => statement.length > 0);

            // Combine trigger statements into a single statement
            let combinedStatements = [];
            let triggerStatement = '';
            let inTrigger = false;

            for (let statement of statements) {
                if (statement.toLowerCase().includes('create trigger')) {
                    inTrigger = true;
                    triggerStatement = statement;
                } else if (inTrigger) {
                    triggerStatement += '\n' + statement;
                    if (statement.trim().endsWith('END;')) {
                        combinedStatements.push(triggerStatement);
                        inTrigger = false;
                        triggerStatement = '';
                    }
                } else {
                    combinedStatements.push(statement);
                }
            }

            // Execute each statement
            for (let statement of combinedStatements) {
                try {
                    await connection.query(statement);
                } catch (err) {
                    console.error('Error executing statement:', statement);
                    throw err;
                }
            }
            
            console.log(`Executed ${file} successfully`);
        }

        // Initialize default users after tables are created
        try {
            await createDefaultUsers();
            console.log('Default users initialized successfully');
        } catch (err) {
            console.error('Error initializing default users:', err);
        }

        console.log('Database initialized successfully');

    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Run if called directly
if (require.main === module) {
    initializeDatabase()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}

module.exports = initializeDatabase;