-- ==============================================================================
-- EL Herbs and Spices Shop - Database Schema Definition (schema.sql)
-- Course: 23EEL43H Web Programming | Assignment # 2
-- Week 4 - Day 4: SQL Database Schema, Table Constraints, & CRUD Statements
-- ==============================================================================

-- 1. Create Database if it does not exist
CREATE DATABASE IF NOT EXISTS el_herbs_shop
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE el_herbs_shop;

-- Drop existing tables to ensure clean initialization
DROP TABLE IF EXISTS enquiries;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS students;

-- ==============================================================================
-- TABLE 1: products
-- Stores spices, herbs, prices, inventory stocks, and categories
-- Primary Key: id (INT AUTO_INCREMENT)
-- Constraints: price > 0, stock >= 0
-- ==============================================================================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_product_price CHECK (price > 0),
    CONSTRAINT chk_product_stock CHECK (stock >= 0)
) ENGINE=InnoDB;

-- ==============================================================================
-- TABLE 2: tasks
-- Stores admin shop operational tasks
-- Primary Key: id (INT AUTO_INCREMENT)
-- ==============================================================================
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(500) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==============================================================================
-- TABLE 3: enquiries
-- Stores customer wholesale orders, enquiries, and contact messages
-- Primary Key: id (INT AUTO_INCREMENT)
-- ==============================================================================
CREATE TABLE enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    phone_num VARCHAR(20),
    interest_category VARCHAR(100) DEFAULT 'Whole Spices',
    order_quantity INT DEFAULT 1,
    message_text TEXT NOT NULL,
    newsletter BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'received',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_enquiry_qty CHECK (order_quantity >= 1)
) ENGINE=InnoDB;

-- ==============================================================================
-- TABLE 4: students (Task 1 Demonstration Table)
-- Stores student records for course demonstrations
-- Primary Key: id (INT AUTO_INCREMENT)
-- Unique Key: roll_no, email
-- ==============================================================================
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    course VARCHAR(100) NOT NULL,
    marks DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_student_marks CHECK (marks >= 0.00 AND marks <= 100.00)
) ENGINE=InnoDB;

-- ==============================================================================
-- TASK 1: SQL CRUD STATEMENTS FOR students TABLE
-- Demonstrating INSERT, SELECT with WHERE, UPDATE, and DELETE
-- ==============================================================================

-- 1. INSERT Statement: Insert new student records
INSERT INTO students (roll_no, name, email, course, marks)
VALUES 
  ('23EEL001', 'Advaith Renjith', 'advaith@mbcet.ac.in', 'Web Programming', 96.50),
  ('23EEL002', 'Aravind Krishnan', 'aravind@mbcet.ac.in', 'Web Programming', 88.00),
  ('23EEL003', 'Ananya Sharma', 'ananya@mbcet.ac.in', 'Database Systems', 92.00);

-- 2. SELECT with WHERE Clause: Filter students by course and marks threshold
SELECT id, roll_no, name, email, marks 
FROM students 
WHERE course = 'Web Programming' AND marks >= 90.00;

-- 3. UPDATE Statement: Update marks for a specific student using roll_no
UPDATE students 
SET marks = 98.00 
WHERE roll_no = '23EEL001';

-- 4. DELETE Statement: Delete a student record matching a condition
DELETE FROM students 
WHERE roll_no = '23EEL003';

-- ==============================================================================
-- INITIAL SEED DATA FOR SHOP APPLICATION
-- ==============================================================================
INSERT INTO products (name, price, stock, category) VALUES
  ('Cardamom (Elaichi)', 450.00, 25, 'Whole Spices'),
  ('Turmeric Powder (Haldi)', 180.00, 50, 'Ground Spices'),
  ('Black Pepper (Kali Mirch)', 320.00, 40, 'Whole Spices'),
  ('Cinnamon Sticks (Dalchini)', 280.00, 15, 'Whole Spices'),
  ('Clove (Laung)', 550.00, 8, 'Whole Spices'),
  ('Ginger Powder (Saunth)', 150.00, 30, 'Ground Spices'),
  ('Bay Leaf (Tej Patta)', 90.00, 0, 'Herbs'),
  ('Nutmeg (Jaiphal)', 420.00, 12, 'Whole Spices');

INSERT INTO tasks (text, completed) VALUES
  ('Restock Ceylon Cinnamon 200g pouches', FALSE),
  ('Grind 25kg sun-dried Turmeric roots', FALSE);

INSERT INTO enquiries (full_name, email_address, phone_num, interest_category, order_quantity, message_text, newsletter) VALUES
  ('Priya Nair', 'priya@example.com', '9847012345', 'Whole Spices', 10, 'Need wholesale pricing for 10kg Cardamom and Black Pepper.', TRUE);
