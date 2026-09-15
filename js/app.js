/* ==========================================================================
   EL Herbs and Spices Shop - JavaScript Application Logic (app.js)
   Course: 23EEL43H Web Programming | Assignment # 2
   Week 1 - Day 1 & Day 2 Tasks
   ========================================================================== */

console.log("%c🌿 Welcome to EL Herbs & Spices Shop JS Console", "color: #e6c265; font-size: 16px; font-weight: bold; background: #0d2b22; padding: 6px 12px; border-radius: 4px;");

// ==========================================================================
// DAY 2 - TASK 1: Variables, Data Types & Core Declarations
// ==========================================================================
// Using var, let, and const as specified in Task 1:

// 1. const: shopName (String)
const shopName = "EL Herbs and Spices Shop";

// 2. let: itemPrice (Number - price of Cardamom per unit)
let itemPrice = 450;

// 3. let: itemQuantity (Number - quantity of items ordered)
let itemQuantity = 3;

// 4. const: gstRate (Number - 5% Goods and Services Tax)
const gstRate = 0.05;

// 5. var: shopLocation (String - legacy var declaration)
var shopLocation = "Nalanchira, Trivandrum, Kerala";

// Print Task 1 variables in console with descriptive labels
console.group("%c--- Day 2 Task 1: Shop Core Variables ---", "color: #4ade80; font-weight: bold;");
console.log("Shop Name (const):", shopName);
console.log("Item Price per unit (let): ₹" + itemPrice);
console.log("Item Quantity (let):", itemQuantity);
console.log("GST Rate (const):", (gstRate * 100) + "% (" + gstRate + ")");
console.log("Shop Location (var):", shopLocation);
console.groupEnd();


// ==========================================================================
// DAY 2 - TASK 2: Products Array & Objects Data Types
// ==========================================================================
// Array named 'products' containing 8 objects for shop items
// Required properties: id, name, price, stock, category

const products = [
    { id: 1, name: "Cardamom (Elaichi)", price: 450, stock: 25, category: "Whole Spices" },
    { id: 2, name: "Turmeric Powder (Haldi)", price: 180, stock: 50, category: "Ground Spices" },
    { id: 3, name: "Black Pepper (Kali Mirch)", price: 320, stock: 40, category: "Whole Spices" },
    { id: 4, name: "Cinnamon Sticks (Dalchini)", price: 280, stock: 15, category: "Whole Spices" },
    { id: 5, name: "Clove (Laung)", price: 550, stock: 8, category: "Whole Spices" },
    { id: 6, name: "Ginger Powder (Saunth)", price: 150, stock: 30, category: "Ground Spices" },
    { id: 7, name: "Bay Leaf (Tej Patta)", price: 90, stock: 0, category: "Herbs" },
    { id: 8, name: "Nutmeg (Jaiphal)", price: 420, stock: 12, category: "Whole Spices" }
];

// Print requirements: First product, Last product, and Total product count
console.group("%c--- Day 2 Task 2: Products Array & Inventory ---", "color: #4ade80; font-weight: bold;");
console.log("Total Number of Products:", products.length);
console.log("First Product in Catalog:", products[0]);
console.log("Last Product in Catalog:", products[products.length - 1]);
console.table(products); // Render clean tabular view in browser developer console
console.groupEnd();


// ==========================================================================
// DAY 2 - TASK 3: Operators, GST Calculation & Type Coercion
// ==========================================================================
console.group("%c--- Day 2 Task 3: Operators & GST Calculations ---", "color: #4ade80; font-weight: bold;");

// 1. Arithmetic Operators on two numbers (numA = 450, numB = 50)
const numA = itemPrice; // 450
const numB = 50;

console.log(`Arithmetic Addition (+): ${numA} + ${numB} = ${numA + numB}`);
console.log(`Arithmetic Subtraction (-): ${numA} - ${numB} = ${numA - numB}`);
console.log(`Arithmetic Multiplication (*): ${numA} * ${numB} = ${numA * numB}`);
console.log(`Arithmetic Division (/): ${numA} / ${numB} = ${numA / numB}`);
console.log(`Arithmetic Modulus (%): ${numA} % ${numB} = ${numA % numB}`);

// 2. Comparison Operators == (Loose Equality) and === (Strict Equality)
const sampleNum = 5;
const sampleStr = "5";

console.log(`Loose Equality (5 == "5"):`, sampleNum == sampleStr, "(compares value after implicit type coercion)");
console.log(`Strict Equality (5 === "5"):`, sampleNum === sampleStr, "(compares value AND data type without coercion)");

// 3. Logical Operators && (AND), || (OR), ! (NOT)
const inStock = true;
const isLoggedIn = false;

console.log(`Logical AND (inStock && isLoggedIn):`, inStock && isLoggedIn, "(true only if both conditions are true)");
console.log(`Logical OR (inStock || isLoggedIn):`, inStock || isLoggedIn, "(true if at least one condition is true)");
console.log(`Logical NOT (!inStock):`, !inStock, "(inverts boolean value)");

// 4. GST Price Calculation: Price of one product after adding 5% GST
const priceWithGST = itemPrice + (itemPrice * gstRate); // 450 + (450 * 0.05) = 472.50
console.log(`Price of Cardamom (₹${itemPrice}) after 5% GST: ₹${priceWithGST.toFixed(2)}`);

// 5. JavaScript Type Coercion Explanation Comment (Task 3 Requirement):
/* 
   --------------------------------------------------------------------------
   EXPLANATION OF JAVASCRIPT TYPE COERCION: '10' + 5 vs '10' - 5
   --------------------------------------------------------------------------
   - Why '10' + 5 gives '105':
     In JavaScript, the addition operator (+) is overloaded. When one of the
     operands is a string (like '10'), JS coerces the other operand (number 5)
     into a string ('5') and performs string concatenation. 
     Thus, '10' + '5' = '105'.

   - Why '10' - 5 gives 5:
     The subtraction operator (-) is strictly a mathematical operator. It does
     NOT perform string concatenation. Therefore, JavaScript implicitly coerces
     the string operand ('10') into a number (10) before performing numeric 
     subtraction. 
     Thus, 10 - 5 = 5.
   --------------------------------------------------------------------------
*/

const addCoercion = '10' + 5;
const subCoercion = '10' - 5;
console.log(`Type Coercion Result ('10' + 5): "${addCoercion}" (String Concatenation)`);
console.log(`Type Coercion Result ('10' - 5): ${subCoercion} (Numeric Subtraction)`);

console.groupEnd();


// ==========================================================================
// INTERACTIVE HELPER FUNCTIONS FOR INDEX.HTML & ADMIN.HTML
// ==========================================================================

// Function to filter products on index.html by category
function filterCategory(categoryName) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        if (btn.innerText.includes(categoryName) || (categoryName === 'All' && btn.innerText === 'All Spices')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (categoryName === 'All' || cardCategory === categoryName) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to handle shopping cart addition feedback
function addToCart(productName) {
    alert(`🛒 ${productName} added to your cart!`);
}

// Function to handle enquiry form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('fullName').value;
    const feedback = document.getElementById('formFeedback');
    
    if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your enquiry has been received. Our team will contact you shortly with spice availability and pricing.`;
        document.getElementById('enquiryForm').reset();
    }
}
