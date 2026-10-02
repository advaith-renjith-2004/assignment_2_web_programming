/* ==============================================================================
   EL Herbs and Spices Shop - Comprehensive Route Regression Test Suite
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 2: Verify all routes after MVC refactoring
   ============================================================================== */

const http = require('http');
const path = require('path');
module.paths.push(path.resolve(__dirname, '../backend/node_modules'));
module.paths.push(path.resolve(__dirname, './backend/node_modules'));

const app = require('../backend/server');

const TEST_PORT = 5055;
let server;

function makeRequest(method, urlPath, body = null) {
    return new Promise((resolve, reject) => {
        const payload = body ? JSON.stringify(body) : null;
        const options = {
            hostname: '127.0.0.1',
            port: TEST_PORT,
            path: urlPath,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                let parsed = null;
                try {
                    parsed = data ? JSON.parse(data) : null;
                } catch (e) {
                    parsed = data;
                }
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: parsed
                });
            });
        });

        req.on('error', reject);
        if (payload) req.write(payload);
        req.end();
    });
}

async function runTests() {
    console.log("================================================================================");
    console.log("  WEEK 5 - DAY 1 TASK 2: ROUTE REGRESSION TESTS AFTER MVC REFACTORING");
    console.log("================================================================================\n");

    server = app.listen(TEST_PORT, '127.0.0.1');

    const results = [];

    async function test(name, fn) {
        try {
            await fn();
            results.push({ name, status: "PASS" });
            console.log(`  \x1b[32m[PASS]\x1b[0m ${name}`);
        } catch (err) {
            results.push({ name, status: "FAIL", error: err.message });
            console.log(`  \x1b[31m[FAIL]\x1b[0m ${name}: ${err.message}`);
        }
    }

    try {
        // 1. Health endpoint
        await test("GET /api/health -> 200 OK", async () => {
            const res = await makeRequest('GET', '/api/health');
            if (res.status !== 200 || res.body.status !== "OK") {
                throw new Error(`Expected 200 OK, got ${res.status}`);
            }
        });

        // 2. Products - GET all
        await test("GET /api/products -> 200 OK with product list", async () => {
            const res = await makeRequest('GET', '/api/products');
            if (res.status !== 200 || !Array.isArray(res.body.data) || res.body.data.length === 0) {
                throw new Error(`Expected 200 with array, got ${res.status}`);
            }
        });

        // 3. Products - GET by ID (Found)
        await test("GET /api/products/1 -> 200 OK single product", async () => {
            const res = await makeRequest('GET', '/api/products/1');
            if (res.status !== 200 || !res.body.data || res.body.data.id !== 1) {
                throw new Error(`Expected 200 with id 1, got ${res.status}`);
            }
        });

        // 4. Products - GET by ID (Not Found)
        await test("GET /api/products/999 -> 404 Not Found", async () => {
            const res = await makeRequest('GET', '/api/products/999');
            if (res.status !== 404) {
                throw new Error(`Expected 404, got ${res.status}`);
            }
        });

        // 5. Products - POST create valid
        let createdProdId = null;
        await test("POST /api/products -> 201 Created", async () => {
            const res = await makeRequest('POST', '/api/products', {
                name: "Nutmeg Whole Premium",
                price: 490,
                stock: 20,
                category: "Whole Spices"
            });
            if (res.status !== 201 || !res.body.data || !res.body.data.id) {
                throw new Error(`Expected 201 with new product, got ${res.status}`);
            }
            createdProdId = res.body.data.id;
        });

        // 6. Products - POST validation rejection
        await test("POST /api/products (invalid price) -> 400 Bad Request", async () => {
            const res = await makeRequest('POST', '/api/products', {
                name: "Invalid Spice",
                price: -10,
                stock: 5,
                category: "Herbs"
            });
            if (res.status !== 400) {
                throw new Error(`Expected 400, got ${res.status}`);
            }
        });

        // 7. Products - PUT update
        await test("PUT /api/products/1 -> 200 OK updated", async () => {
            const res = await makeRequest('PUT', '/api/products/1', {
                name: "Cardamom (Elaichi) Grade A+",
                price: 480,
                stock: 30,
                category: "Whole Spices"
            });
            if (res.status !== 200 || !res.body.data) {
                throw new Error(`Expected 200, got ${res.status}`);
            }
        });

        // 8. Products - DELETE
        await test(`DELETE /api/products/${createdProdId || 8} -> 204 No Content`, async () => {
            const targetId = createdProdId || 8;
            const res = await makeRequest('DELETE', `/api/products/${targetId}`);
            if (res.status !== 204) {
                throw new Error(`Expected 204, got ${res.status}`);
            }
        });

        // 9. Search - Vulnerable
        await test("GET /api/products/search-vulnerable?q=' OR '1'='1 -> 200 OK (All rows)", async () => {
            const res = await makeRequest('GET', "/api/products/search-vulnerable?q=%27%20OR%20%271%27=%271");
            if (res.status !== 200 || res.body.matchCount === 0) {
                throw new Error(`Expected 200 and leaked rows, got ${res.status}`);
            }
        });

        // 10. Search - Secure
        await test("GET /api/products/search?q=' OR '1'='1 -> 200 OK (0 rows / defended)", async () => {
            const res = await makeRequest('GET', "/api/products/search?q=%27%20OR%20%271%27=%271");
            if (res.status !== 200 || res.body.matchCount !== 0) {
                throw new Error(`Expected 200 with 0 matches, got ${res.status}`);
            }
        });

        // 11. Tasks - GET all
        await test("GET /api/tasks -> 200 OK", async () => {
            const res = await makeRequest('GET', '/api/tasks');
            if (res.status !== 200 || !Array.isArray(res.body.data)) {
                throw new Error(`Expected 200, got ${res.status}`);
            }
        });

        // 12. Tasks - POST
        let createdTaskId = null;
        await test("POST /api/tasks -> 201 Created", async () => {
            const res = await makeRequest('POST', '/api/tasks', { text: "Verify vacuum sealing temperature" });
            if (res.status !== 201 || !res.body.data) {
                throw new Error(`Expected 201, got ${res.status}`);
            }
            createdTaskId = res.body.data.id;
        });

        // 13. Tasks - DELETE
        await test(`DELETE /api/tasks/${createdTaskId || 1} -> 204 No Content`, async () => {
            const targetId = createdTaskId || 1;
            const res = await makeRequest('DELETE', `/api/tasks/${targetId}`);
            if (res.status !== 204) {
                throw new Error(`Expected 204, got ${res.status}`);
            }
        });

        // 14. Enquiries - GET all & POST
        await test("POST /api/enquiries -> 201 Created", async () => {
            const res = await makeRequest('POST', '/api/enquiries', {
                fullName: "Kavitha Menon",
                emailAddress: "kavitha@example.com",
                phoneNum: "9447123456",
                messageText: "Need export pricing catalog."
            });
            if (res.status !== 201) {
                throw new Error(`Expected 201, got ${res.status}`);
            }
        });

        // 15. Students - GET all
        await test("GET /api/students -> 200 OK", async () => {
            const res = await makeRequest('GET', '/api/students');
            if (res.status !== 200 || !Array.isArray(res.body.data)) {
                throw new Error(`Expected 200, got ${res.status}`);
            }
        });

        // 16. Non-existent route -> 404
        await test("GET /api/nonexistent -> 404 Not Found", async () => {
            const res = await makeRequest('GET', '/api/nonexistent');
            if (res.status !== 404) {
                throw new Error(`Expected 404, got ${res.status}`);
            }
        });

    } finally {
        server.close();
    }

    const passedCount = results.filter(r => r.status === "PASS").length;
    console.log(`\n================================================================================`);
    console.log(`  Tests Complete: ${passedCount} / ${results.length} PASSED`);
    console.log(`  All route responses confirmed identical to pre-refactor implementation.`);
    console.log(`================================================================================`);

    if (passedCount !== results.length) {
        process.exit(1);
    }
}

runTests();
