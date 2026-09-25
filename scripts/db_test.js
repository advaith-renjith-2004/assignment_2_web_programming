/* ==============================================================================
   EL Herbs and Spices Shop - Database Connection Test Script
   Course: 23EEL43H Web Programming | Assignment # 2
   Week 4 - Day 5 Task 1: Connect to Database & Print Table Rows with Error Handling
   ============================================================================== */

const path = require('path');
module.paths.push(path.resolve(__dirname, '../backend/node_modules'));
module.paths.push(path.resolve(__dirname, './backend/node_modules'));

require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });
const db = require('../backend/db/connection');

async function testDatabaseConnection() {
    console.log("==========================================================");
    console.log("  Testing MySQL Connection Pool with Environment Variables");
    console.log("==========================================================");
    console.log(`Target Host: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
    console.log(`Target Database: ${process.env.DB_NAME || 'el_herbs_shop'}`);
    console.log(`Database User: ${process.env.DB_USER || 'root'}\n`);

    try {
        console.log("Executing SQL Query: SELECT * FROM products ORDER BY id ASC...");
        const [rows] = await db.query('SELECT * FROM products ORDER BY id ASC');

        console.log(`\n✅ Query Execution Successful! Retrieved ${rows.length} product records:`);
        console.table(rows);

        console.log("\nExecuting SQL Query: SELECT * FROM students ORDER BY id ASC...");
        const [students] = await db.query('SELECT * FROM students ORDER BY id ASC');
        console.log(`✅ Query Execution Successful! Retrieved ${students.length} student records:`);
        console.table(students);

        console.log("\n==========================================================");
        console.log("  Database connection and table row printing completed.");
        console.log("==========================================================");
    } catch (error) {
        console.error("❌ Database Error Caught:", error.message);
        console.error("Error Code:", error.code);
        process.exit(1);
    }
}

testDatabaseConnection();
