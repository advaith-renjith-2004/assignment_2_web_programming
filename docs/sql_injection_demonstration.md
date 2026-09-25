# Week 4 - Day 5: SQL Injection Attack & Parameterized Query Defense Demonstration

**Course:** 23EEL43H Web Programming  
**Topic:** Connecting Node.js to MySQL, Parameterized Queries, and SQL Injection Mitigation  

---

## 1. Executive Summary & Attack Vector

In dynamic web applications, user search bars frequently query database tables by keyword. When developers construct database queries by **joining/concatenating strings directly** with untrusted user input, malicious actors can inject SQL control characters (`'`, `--`, `OR`, `UNION`, `DROP`) to alter the logical execution plan of the query.

### The Attack Payload:
```text
' OR '1'='1
```

---

## 2. Before Mitigation: Vulnerable Search Route (String Concatenation)

### Vulnerable Server Implementation:
```javascript
app.get('/api/products/search-vulnerable', async (req, res) => {
    const q = req.query.q || '';
    // CRITICAL SECURITY DEFECT: Raw string concatenation with untrusted user input
    const sql = "SELECT * FROM products WHERE name LIKE '%" + q + "%'";
    const [rows] = await db.query(sql);
    res.json({ success: true, count: rows.length, data: rows });
});
```

### Resulting SQL Executed on Database:
```sql
SELECT * FROM products WHERE name LIKE '%' OR '1'='1%'
```

### What Happens (Security Breach):
1. The injected single quote (`'`) prematurely closes the string literal for the `LIKE` clause (`name LIKE '%'`).
2. The logical operator `OR` is introduced into the SQL syntax.
3. The condition `'1'='1'` is evaluated by the SQL engine. Because `'1'='1'` is **always TRUE** for every row in the table, the entire `WHERE` clause evaluates to `TRUE`.
4. **Impact:** The database returns **all 8 products** (the entire catalog/table), completely ignoring search filters. In user/admin tables, this vulnerability allows attackers to dump passwords, credit card numbers, or administrative credentials.

### Recorded Terminal Output (Before Mitigation):
```text
================================================================================
  1. BEFORE: VULNERABLE SEARCH (String Concatenation)
--------------------------------------------------------------------------------
Constructed SQL Statement: SELECT * FROM products WHERE name LIKE '%' OR '1'='1%'

❌ SECURITY BREACH CONFIRMED!
Rows returned: 8 (ALL PRODUCTS LEAKED)
Reason: The condition '1'='1' evaluates to TRUE for every row in the table.
Table Data Leaked:
┌─────────┬────┬──────────────────────────────┬───────┬───────┐
│ (index) │ id │ name                         │ price │ stock │
├─────────┼────┼──────────────────────────────┼───────┼───────┤
│ 0       │ 1  │ 'Cardamom (Elaichi)'         │ 450   │ 25    │
│ 1       │ 2  │ 'Turmeric Powder (Haldi)'    │ 180   │ 50    │
│ 2       │ 3  │ 'Black Pepper (Kali Mirch)'  │ 320   │ 40    │
│ 3       │ 4  │ 'Cinnamon Sticks (Dalchini)' │ 280   │ 15    │
│ 4       │ 5  │ 'Clove (Laung)'              │ 550   │ 8     │
│ 5       │ 6  │ 'Ginger Powder (Saunth)'     │ 150   │ 30    │
│ 6       │ 7  │ 'Bay Leaf (Tej Patta)'       │ 90    │ 0     │
│ 7       │ 8  │ 'Nutmeg (Jaiphal)'           │ 420   │ 12    │
└─────────┴────┴──────────────────────────────┴───────┴───────┘
```

---

## 3. After Mitigation: Secure Search Route (Parameterized Queries with Placeholders)

### Secure Server Implementation:
```javascript
app.get('/api/products/search', async (req, res) => {
    const q = req.query.q || '';
    // SECURE ARCHITECTURE: Using parameterized query with '?' placeholder
    const sql = "SELECT * FROM products WHERE name LIKE ?";
    const param = `%${q}%`;
    const [rows] = await db.query(sql, [param]);
    res.json({ success: true, count: rows.length, data: rows });
});
```

### Parameterized Template & Bound Value:
- **Prepared SQL Template:** `SELECT * FROM products WHERE name LIKE ?`
- **Bound Parameter Value:** `["%' OR '1'='1%"]`

### Why the Attack Fails (Secure Defense):
1. When using parameterized queries (Prepared Statements), the SQL syntax is compiled and optimized by the database engine **before** user inputs are bound.
2. The placeholder `?` marks an immutable data parameter slot.
3. The database engine treats the entire input string `%' OR '1'='1%` strictly as a **literal string value**, never as executable SQL tokens or keywords.
4. The query specifically searches for a spice item whose name literally contains the substring `"' OR '1'='1"`. Since no spice has that name, **0 rows are returned**.

### Recorded Terminal Output (After Mitigation):
```text
================================================================================
  2. AFTER: SECURE SEARCH (Parameterized Query with '?' Placeholder)
--------------------------------------------------------------------------------
Parameterized SQL Template: SELECT * FROM products WHERE name LIKE ?
Bound Parameter Value:      ["%' OR '1'='1%"]

✅ ATTACK DEFENDED SUCCESSFULLY!
Rows returned: 0 (0 MATCHES)
Reason: The MySQL engine compiles the SQL execution plan first and treats the
malicious input strictly as literal string characters, never as executable code.
Result: Safe empty set returned. No data leaked.
```

---

## 4. Visual Comparison Screenshot

Refer to the visual screenshots saved in:
- `docs/screenshots/sql_injection_before_after.svg`
- `docs/screenshots/sql_injection_comparison.html`
