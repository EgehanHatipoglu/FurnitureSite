const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
    const defaultClient = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: 'postgres' // Connect to default database to create ours
    });

    try {
        await defaultClient.connect();
        console.log('Connected to PostgreSQL server.');

        // Check if database exists
        const dbRes = await defaultClient.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`);
        if (dbRes.rowCount === 0) {
            console.log(`Creating database ${process.env.DB_NAME}...`);
            await defaultClient.query(`CREATE DATABASE ${process.env.DB_NAME}`);
            console.log('Database created successfully.');
        } else {
            console.log(`Database ${process.env.DB_NAME} already exists.`);
        }
    } catch (err) {
        console.error('Error connecting to/creating database:', err.message);
        process.exit(1);
    } finally {
        await defaultClient.end();
    }

    // Now connect to the target database and run schema
    const targetClient = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    try {
        await targetClient.connect();
        console.log(`Connected to database ${process.env.DB_NAME}.`);

        const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        console.log('Executing schema.sql...');
        await targetClient.query(schemaSql);
        console.log('Schema executed successfully. Database is ready.');
    } catch (err) {
        console.error('Error executing schema:', err.message);
        process.exit(1);
    } finally {
        await targetClient.end();
    }
}

initDB();
