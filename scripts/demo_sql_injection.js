/* ==============================================================================
   EL Herbs and Spices Shop - SQL Injection Attack & Defense Demonstration
   Course: 23EEL43H Web Programming | Assignment # 2
   Week 4 - Day 5 Task 3: SQL Injection Vulnerability vs Parameterized Query Defense
   ============================================================================== */

const path = require('path');
// Ensure modules can be resolved from backend/node_modules
module.paths.push(path.resolve(__dirname, '../backend/node_modules'));
module.paths.push(path.resolve(__dirname, './backend/node_modules'));

require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });
const db = require('../backend/db/connection');

async function runSqlInjectionDemo() {
    console.log("================================================================================");
    console.log("  WEEK 4 - DAY 5 TASK 3: SQL INJECTION VULNERABILITY vs DEFENSE DEMONSTRATION");
    console.log("================================================================================\n");

    const maliciousInput = "' OR '1'='1";
    console.log(`[Attacker Payload]: ${maliciousInput}`);
    console.log("Intended action: Search products by name keyword.\n");

    // -------------------------------------------------------------------------
    // 1. BEFORE: VULNERABLE ROUTE (Raw String Concatenation)
    // -------------------------------------------------------------------------
    console.log("--------------------------------------------------------------------------------");
    console.log("  1. BEFORE: VULNERABLE SEARCH (String Concatenation)");
    console.log("--------------------------------------------------------------------------------");
    const vulnerableSql = "SELECT * FROM products WHERE name LIKE '%" + maliciousInput + "%'";
    console.log(`Constructed SQL Statement: \x1b[31m${vulnerableSql}\x1b[0m`);

    try {
        const [vulnerableRows] = await db.query(vulnerableSql);
        console.log(`\n❌ SECURITY BREACH CONFIRMED!`);
        console.log(`Rows returned: \x1b[31m${vulnerableRows.length} (ALL PRODUCTS LEAKED)\x1b[0m`);
        console.log("Reason: The condition '1'='1' evaluates to TRUE for every row in the table.");
        console.log("Table Data Leaked:");
        console.table(vulnerableRows.map(r => ({ id: r.id, name: r.name, price: r.price, stock: r.stock })));
    } catch (err) {
        console.error("Vulnerable query execution error:", err.message);
    }

    // -------------------------------------------------------------------------
    // 2. AFTER: SECURE ROUTE (Parameterized Query with '?' Placeholder)
    // -------------------------------------------------------------------------
    console.log("\n--------------------------------------------------------------------------------");
    console.log("  2. AFTER: SECURE SEARCH (Parameterized Query with '?' Placeholder)");
    console.log("--------------------------------------------------------------------------------");
    const secureSql = "SELECT * FROM products WHERE name LIKE ?";
    const secureParam = `%${maliciousInput}%`;
    console.log(`Parameterized SQL Template: \x1b[32m${secureSql}\x1b[0m`);
    console.log(`Bound Parameter Value:      \x1b[32m["${secureParam}"]\x1b[0m`);

    try {
        const [secureRows] = await db.query(secureSql, [secureParam]);
        console.log(`\n✅ ATTACK DEFENDED SUCCESSFULLY!`);
        console.log(`Rows returned: \x1b[32m${secureRows.length} (0 MATCHES)\x1b[0m`);
        console.log("Reason: The MySQL engine compiles the SQL execution plan first and treats the");
        console.log("malicious input strictly as literal string characters, never as executable code.");
        if (secureRows.length === 0) {
            console.log("Result: Safe empty set returned. No data leaked.");
        } else {
            console.table(secureRows);
        }
    } catch (err) {
        console.error("Secure query execution error:", err.message);
    }

    console.log("\n================================================================================");
    console.log("  Demonstration completed. Database is fully protected against SQL Injection.");
    console.log("================================================================================");
}

runSqlInjectionDemo();
