# Week 4 - Day 4: SQL and NoSQL Basics & Comparative Analysis

**Course:** 23EEL43H Web Programming  
**Topic:** Relational (MySQL) vs Document (MongoDB) Paradigms, Syntax Mapping, and Architecture Trade-offs  

---

## Part 1: Student Record Representation (Task 2)

### 1.1 Representation as a Row of an SQL Table (MySQL Relational Schema)

In a relational database, data is normalized into rigid columns with predefined primitive data types. Relational structures rely on tables, rows (tuples), and primary/foreign keys.

**Table Definition:**
```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    course VARCHAR(100) NOT NULL,
    marks DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Table Row View:**
| id | roll_no | name | email | course | marks | created_at |
|:---:|:---:|:---|:---|:---|:---:|:---:|
| 1 | 23EEL001 | Advaith Renjith | advaith@mbcet.ac.in | Web Programming | 96.50 | 2026-09-25 10:30:00 |

**SQL Insertion Statement:**
```sql
INSERT INTO students (roll_no, name, email, course, marks)
VALUES ('23EEL001', 'Advaith Renjith', 'advaith@mbcet.ac.in', 'Web Programming', 96.50);
```

---

### 1.2 Representation as a MongoDB Document (BSON / JSON)

In a document database, data is represented as a flexible, hierarchical JSON/BSON document. Related data (such as address, phone numbers, and enrolled subject modules) can be embedded directly without requiring multi-table normalization or joins.

```json
{
  "_id": { "$oid": "66f40b2a7e28d159a41b8a10" },
  "rollNo": "23EEL001",
  "name": "Advaith Renjith",
  "email": "advaith@mbcet.ac.in",
  "course": "Web Programming",
  "marks": 96.5,
  "enrolledSubjects": [
    { "code": "23EEL43H", "title": "Web Programming", "credits": 4, "grade": "S" },
    { "code": "23EEL44H", "title": "Database Systems", "credits": 3, "grade": "A+" }
  ],
  "contact": {
    "phone": "+91 9847012345",
    "city": "Trivandrum",
    "state": "Kerala"
  },
  "isActive": true,
  "createdAt": { "$date": "2026-09-25T10:30:00.000Z" }
}
```

---

## Part 2: CRUD Operations Syntax Comparison (Task 2)

| Operation | MySQL Syntax (Relational SQL) | MongoDB Syntax (Document NoSQL) | Notes & Differences |
|:---|:---|:---|:---|
| **CREATE** (Insert Single) | `INSERT INTO students (roll_no, name, course, marks) VALUES ('23EEL001', 'Advaith', 'Web Prog', 96.50);` | `db.students.insertOne({ rollNo: "23EEL001", name: "Advaith", course: "Web Prog", marks: 96.5 });` | SQL requires column alignment matching table schema; MongoDB dynamically infers document types. |
| **CREATE** (Insert Multiple) | `INSERT INTO students (roll_no, name, course, marks) VALUES ('R1', 'A', 'CS', 80), ('R2', 'B', 'CS', 85);` | `db.students.insertMany([{ rollNo: "R1", name: "A" }, { rollNo: "R2", name: "B" }]);` | MongoDB accepts heterogeneous arrays of documents in a single batch. |
| **READ** (All Records) | `SELECT * FROM students;` | `db.students.find({});` | SQL returns structured tabular result set; MongoDB returns a cursor of JSON documents. |
| **READ** (Filter with Condition) | `SELECT * FROM students WHERE marks >= 90.00 AND course = 'Web Prog';` | `db.students.find({ marks: { $gte: 90.0 }, course: "Web Prog" });` | SQL uses standard keyword clauses; MongoDB uses JSON query operators (`$gte`, `$eq`, `$in`). |
| **READ** (Sort & Limit) | `SELECT * FROM students ORDER BY marks DESC LIMIT 5;` | `db.students.find().sort({ marks: -1 }).limit(5);` | MySQL uses `LIMIT` and `DESC`; MongoDB chains cursor methods `.sort()` and `.limit()`. |
| **UPDATE** (Modify Field) | `UPDATE students SET marks = 98.00 WHERE roll_no = '23EEL001';` | `db.students.updateOne({ rollNo: "23EEL001" }, { $set: { marks: 98.0 } });` | In MongoDB, `$set` updates only targeted attributes without replacing the whole document. |
| **UPDATE** (Increment Value) | `UPDATE students SET marks = marks + 2.0 WHERE roll_no = '23EEL001';` | `db.students.updateOne({ rollNo: "23EEL001" }, { $inc: { marks: 2.0 } });` | MySQL uses arithmetic expression; MongoDB provides atomic `$inc` operator. |
| **DELETE** (Remove Matching) | `DELETE FROM students WHERE roll_no = '23EEL001';` | `db.students.deleteOne({ rollNo: "23EEL001" });` | SQL uses `WHERE`; MongoDB provides explicit `deleteOne()` and `deleteMany()` APIs. |
| **DELETE** (Clear Table/Collection) | `TRUNCATE TABLE students;` (or `DELETE FROM students;`) | `db.students.deleteMany({});` (or `db.students.drop()`) | Drops or wipes the storage container. |

---

## Part 3: Deep Comparison: SQL vs NoSQL (Task 3)

| Dimension | SQL Databases (e.g., MySQL, PostgreSQL) | NoSQL Databases (e.g., MongoDB, DynamoDB, Redis) |
|:---|:---|:---|
| **1. Data Schema** | **Rigid, Predefined Schema (Schema-on-Write)**.<br>Tables, columns, and data types must be defined explicitly with DDL (`CREATE TABLE`) prior to data insertion. Modifying columns requires `ALTER TABLE` migrations. | **Dynamic, Schema-less (Schema-on-Read)**.<br>Documents in the same collection can have differing fields, nested structures, or new attributes without changing existing records. |
| **2. Flexibility** | **Moderate to Low Flexibility**.<br>Great for predictable, structured domain models. Altering database schemas in high-volume production tables requires carefully staged zero-downtime database migrations. | **High Flexibility**.<br>Ideal for rapidly evolving schemas, polymorphic data, IoT telemetry, and nested hierarchical data models. |
| **3. Consistency & Transactions** | **Strict ACID Guarantees**.<br>- **Atomicity**: Entire transaction succeeds or rolls back completely.<br>- **Consistency**: Referential integrity constraints (Foreign Keys) enforced at engine level.<br>- **Isolation**: Serializable / Repeatable Read isolation levels prevent dirty reads.<br>- **Durability**: Committed data survives system crashes via write-ahead logging (WAL). | **BASE Model (Eventual Consistency)**.<br>- **Basically Available**<br>- **Soft state**<br>- **Eventual consistency**.<br>(Modern MongoDB supports multi-document ACID transactions, but at the cost of distributed performance). |
| **4. Scaling Model** | **Vertical Scaling (Scale-Up)**.<br>Typically scaled by augmenting CPU, RAM, and SSD storage on a primary master server. Read replicas handle read scale. | **Horizontal Scaling (Scale-Out)**.<br>Native distributed sharding across clusters of commodity hardware to handle massive multi-terabyte datasets. |
| **5. Query Language & Joins** | **Declarative SQL with Relational JOINs**.<br>Allows normalization of data across separate tables (Orders, OrderItems, Products, Customers) with complex multi-table queries. | **Document-based Query API or Key-Value lookups**.<br>Joins (`$lookup`) exist but are computationally expensive; data is often denormalized/embedded. |
| **6. Typical Use Cases** | Financial ledgers, ERP, banking, e-commerce order management, inventory control, transactional records. | Real-time big data analytics, social media feeds, content management (CMS), mobile apps, session stores, IoT streams. |

---

## Part 4: Database Selection for the Shop's Order Data (Task 3)

### Choice: **SQL Database (MySQL / PostgreSQL)**

### Architectural Rationale & Justification:

For managing the **EL Herbs and Spices Shop's order data**, an **SQL relational database (MySQL)** is unequivocally the correct choice for the following critical business and technical reasons:

1. **ACID Transaction Guarantees for Financial Payments & Inventory:**
   - When a customer purchases 5kg of Cardamom (Elaichi) and 2kg of Turmeric:
     - Step 1: The order is recorded in `orders`.
     - Step 2: Individual line items are recorded in `order_items`.
     - Step 3: Available stock in `products` must be decremented atomically.
     - Step 4: The customer's payment must be recorded in `transactions`.
   - If payment verification fails, an SQL transaction rolls back *all* steps automatically. Without strict ACID transactions, network failures could lead to money being deducted without an order being created, or stock being deducted without a payment.
2. **Referential Integrity & Foreign Keys:**
   - Relational foreign key constraints (`FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT`) prevent catastrophic orphan records (e.g. an order referencing a deleted spice item).
3. **Prevention of Race Conditions & Overselling (Stock Allocation):**
   - Spices are physical inventory with hard stock limits (e.g. only 8kg of Clove available).
   - SQL row-level locks (`SELECT ... FOR UPDATE`) prevent two concurrent checkout sessions from purchasing the same remaining inventory simultaneously.
4. **GST Tax Compliance, Accounting, & Reporting:**
   - Commercial invoice calculations require precise decimal arithmetic (`DECIMAL(10,2)`), distinct 5% GST breakdowns, and auditable reconciliation. Relational reporting with structured queries guarantees exact accounting compliance.
