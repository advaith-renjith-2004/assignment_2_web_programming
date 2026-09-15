# Assignment 2 - EL Herbs and Spices Shop

**Course:** 23EEL43H Web Programming  
**Branch:** Electrical & Computer Engineering (Seventh Semester B.Tech - 2026)  
**Institution:** Mar Baselios College of Engineering & Technology  
**Faculty:** Dr. Sheryl Arulini. A  
**Student Repository:** [assignment_2_web_programming](https://github.com/advaith-renjith-2004/assignment_2_web_programming)

---

## 🌿 About The Project

**EL Herbs and Spices Shop** is an e-commerce website for an organic spice boutique offering premium spices, herbs, and seasonings (such as Cardamom, Turmeric, Black Pepper, Cinnamon, Clove, Ginger Powder, Bay Leaf, and Nutmeg).

This repository contains **Assignment 2** covering **Week 1 – Website Setup and JavaScript Basics** (Day 1 and Day 2 tasks).

---

## 📁 Repository & Folder Structure

```text
assignment_2_web_programming/
├── index.html          # Main shop storefront page with semantic HTML, price list, enquiry form
├── admin.html          # Administrative inventory and product management dashboard
├── README.md           # Documentation for Assignment 2
├── css/
│   └── style.css       # Full responsive stylesheet using Flexbox, CSS Grid, variables, & media queries
├── js/
│   └── app.js          # JavaScript implementation for Day 2 (variables, arrays, operators, GST calc)
├── data/
│   └── products.json   # JSON product database (8 spice items with stock, category, price)
└── images/             # Spice photographs & shop logo
    ├── logo.jpg
    ├── cardamom.jpg
    ├── turmeric.jpg
    ├── black_pepper.jpg
    ├── cinnamon.jpg
    ├── clove.jpg
    ├── ginger_powder.jpg
    ├── bay_leaf.jpg
    └── nutmeg.jpg
```

---

## 📝 Detailed Tasks Summary

### **Day 1 – Project Setup: Folder Structure, HTML and CSS**

- **Task 1: Folder Structure & Setup**
  - Configured project architecture: `index.html`, `admin.html`, `css/style.css`, `js/app.js`, `images/`, `data/products.json`, and `README.md`.
- **Task 2: Semantic HTML (`index.html` & `admin.html`)**
  - **Header:** Features shop logo, title, and tagline.
  - **Navigation (`<nav>`):** Responsive navigation bar with links to Home, Products, Price List, Enquiry Form, and Admin Portal.
  - **Main Content (`<main>`):**
    - Showcase section for 8 products with high-resolution imagery, pricing, category tags, and stock status badges.
    - Semantic HTML Table showcasing full item price list, categories, and stock availability.
    - Customer Enquiry Form with custom input fields (`text`, `email`, `tel`, `select`, `textarea`, `submit`).
  - **Footer (`<footer>`):** Complete store address, business hours, contact numbers, and copyright.
- **Task 3: Responsive CSS Styling (`css/style.css`)**
  - Defined CSS custom properties (color palette with deep forest greens, warm gold accents, rich spice brown, and dark mode cards).
  - Used **Flexbox** for horizontal navigation layout, header alignment, card footers, and responsive controls.
  - Used **CSS Grid** for auto-responsive product card grid layout (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`).
  - Implemented CSS Box Model with padding, margin, rounded borders, shadow effects, and hover transitions.
  - Added Mobile Media Queries (`@media (max-width: 768px)`) for responsive navigation stacking and grid reflow.

---

### **Day 2 – Variables, Data Types and Operators**

- **Task 1: External JS & Core Variables**
  - Linked `js/app.js` to `index.html` and `admin.html`.
  - Declared shop constants and variables using `var`, `let`, and `const`:
    - `const shopName = "EL Herbs and Spices Shop";`
    - `let itemPrice = 450;` (Cardamom unit price)
    - `let itemQuantity = 3;`
    - `const gstRate = 0.05;` (5% GST)
  - Logged all core variables to browser developer console with clear labels.

- **Task 2: Products Array & Data Types**
  - Created a JavaScript array `products` containing 8 objects (`Cardamom`, `Turmeric`, `Black Pepper`, `Cinnamon`, `Clove`, `Ginger Powder`, `Bay Leaf`, `Nutmeg`).
  - Each product object includes `id`, `name`, `price`, `stock`, and `category`.
  - Logged to console: First product, Last product, and Total product count (`products.length`).

- **Task 3: Operators, GST Calculations & Type Coercion**
  - **Arithmetic Operators:** Demonstrated `+`, `-`, `*`, `/`, `%` on numeric operands.
  - **Comparison Operators:** Evaluated loose equality `==` vs strict equality `===` between a number and string (e.g. `5 == "5"` vs `5 === "5"`).
  - **Logical Operators:** Tested `&&`, `||`, and `!` using `inStock` and `isLoggedIn` flags.
  - **GST Calculation:** Calculated total price for an item with 5% GST (`itemPrice * (1 + gstRate)`).
  - **JavaScript Type Coercion Explanation:**
    - `'10' + 5` results in `'105'` because the binary `+` operator performs string concatenation when one operand is a string.
    - `'10' - 5` results in `5` because the `-` operator is strictly numeric and implicitly converts the string `'10'` to number `10`.

---

## 🚀 How to Run & Test

1. Clone the repository:
   ```bash
   git clone https://github.com/advaith-renjith-2004/assignment_2_web_programming.git
   ```
2. Open `index.html` or `admin.html` in any modern web browser.
3. Open Developer Console (`F12` or `Ctrl + Shift + I` -> Console tab) to inspect the console logs for Day 2 JavaScript output.

---

*Submitted for 23EEL43H Web Programming Assignment 2.*
