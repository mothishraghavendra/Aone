const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const config = {
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development'
  },

  staff: {
    admin: {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD
    },
    principal: {
      username: process.env.PRINCIPAL_USERNAME,
      password: process.env.PRINCIPAL_PASSWORD
    },
    warden: {
      username: process.env.WARDEN_USERNAME,
      password: process.env.WARDEN_PASSWORD
    }
  },
  
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '#Mothish@123',
    database: process.env.DB_NAME || 'aone',
    port: process.env.DB_PORT || 3306
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: process.env.JWT_EXPIRE || '24h'
  },
  
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  
  upload: {
    maxSize: process.env.MAX_FILE_SIZE || 5242880,
    path: process.env.UPLOAD_PATH || './uploads'
  }
};

module.exports = config;