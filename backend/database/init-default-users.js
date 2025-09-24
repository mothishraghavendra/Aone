const bcrypt = require('bcrypt');
const db = require('../config/db');
const config = require('../config/config');

async function createDefaultUsers() {
    try {
        // Hash passwords
        const adminHash = await bcrypt.hash(config.staff.admin.password, 10);
        const principalHash = await bcrypt.hash(config.staff.principal.password, 10);
        const wardenHash = await bcrypt.hash(config.staff.warden.password, 10);

        // SQL for checking if admin exists
        const checkUserSQL = 'SELECT username FROM users WHERE username = ?';
        
        // SQL for inserting users
        const insertUserSQL = `
            INSERT INTO users (username, password_hash, role, is_active)
            VALUES (?, ?, ?, true)
        `;

        // Default users data
        const defaultUsers = [
            {
                username: config.staff.admin.username,
                password: adminHash,
                role: 'admin'
            },
            {
                username: config.staff.principal.username,
                password: principalHash,
                role: 'principal'
            },
            {
                username: config.staff.warden.username,
                password: wardenHash,
                role: 'warden'
            }
        ];

        for (const user of defaultUsers) {
            try {
                // Check if user already exists
                const [existingUser] = await db.query(checkUserSQL, [user.username]);
                
                if (existingUser.length === 0) {
                    // User doesn't exist, create it
                    await db.query(insertUserSQL, [
                        user.username,
                        user.password,
                        user.role
                    ]);
                    console.log(`Created default ${user.role} user: ${user.username}`);
                } else {
                    console.log(`${user.role} user already exists: ${user.username}`);
                }
            } catch (error) {
                console.error(`Error processing ${user.role} user:`, error);
                throw error;
            }
        }
        
        console.log('All default users have been created successfully!');

    } catch (error) {
        console.error('Error creating default users:', error);
        throw error;
    }
}

// Run the function if this script is run directly
if (require.main === module) {
    createDefaultUsers()
        .then(() => {
            console.log('Default users initialization complete');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Failed to initialize default users:', error);
            process.exit(1);
        });
}

module.exports = { createDefaultUsers };