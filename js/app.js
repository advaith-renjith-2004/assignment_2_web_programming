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

// ==========================================================================
// WEEK 2 - DAY 1: DOM MANIPULATION
// ==========================================================================

console.group("%c--- Week 2 Day 1: DOM Manipulation ---", "color: #38bdf8; font-weight: bold;");

// Task 1: Select heading by id, change text with textContent, change image with setAttribute, toggle class
function updatePageBranding() {
    const heading = document.querySelector('#mainHeading');
    if (heading) {
        heading.textContent = "EL Herbs & Spices Shop";
        heading.classList.toggle('shop-title-accent');
        console.log("Updated heading textContent and toggled class:", heading.textContent);
    }
    const logoImg = document.querySelector('#mainShopLogo');
    if (logoImg) {
        logoImg.setAttribute('alt', 'EL Herbs & Spices Signature Brand Logo');
        logoImg.classList.toggle('logo-active');
        console.log("Updated logo image attribute alt:", logoImg.getAttribute('alt'));
    }
}
updatePageBranding();

// Task 2: renderProducts(list) using createElement, textContent, .out-of-stock class
function renderProducts(list) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    productGrid.innerHTML = ''; // Clear existing contents

    const imageMap = {
        1: "cardamom.jpg",
        2: "turmeric.jpg",
        3: "black_pepper.jpg",
        4: "cinnamon.jpg",
        5: "clove.jpg",
        6: "ginger_powder.jpg",
        7: "bay_leaf.jpg",
        8: "nutmeg.jpg"
    };

    list.forEach(product => {
        // Create product card element
        const card = document.createElement('article');
        card.classList.add('product-card');
        card.setAttribute('data-category', product.category);

        // Add class out-of-stock when stock is 0 (Task 2 Requirement)
        if (product.stock === 0) {
            card.classList.add('out-of-stock');
        }

        // Image wrapper
        const imgWrap = document.createElement('div');
        imgWrap.classList.add('card-image-wrapper');

        const img = document.createElement('img');
        img.setAttribute('src', `images/${imageMap[product.id] || 'logo.jpg'}`);
        img.setAttribute('alt', product.name);

        const badge = document.createElement('span');
        badge.classList.add('badge');
        if (product.stock === 0) {
            badge.classList.add('stock-out');
            badge.textContent = 'Out of Stock';
        } else if (product.stock < 15) {
            badge.classList.add('stock-low');
            badge.textContent = `Low Stock (${product.stock} kg)`;
        } else {
            badge.classList.add('stock-in');
            badge.textContent = `In Stock (${product.stock} kg)`;
        }

        imgWrap.appendChild(img);
        imgWrap.appendChild(badge);

        // Card Body
        const body = document.createElement('div');
        body.classList.add('card-body');

        const cat = document.createElement('span');
        cat.classList.add('category-tag');
        cat.textContent = product.category;

        const title = document.createElement('h3');
        title.classList.add('product-name');
        title.textContent = product.name;

        const desc = document.createElement('p');
        desc.classList.add('product-desc');
        desc.textContent = `Fresh organic ${product.name} sourced from sustainable Kerala farms.`;

        // Card Footer
        const footer = document.createElement('div');
        footer.classList.add('card-footer');

        const priceBox = document.createElement('div');
        priceBox.classList.add('price-container');

        const priceLbl = document.createElement('span');
        priceLbl.classList.add('price-label');
        priceLbl.textContent = 'Unit Price';

        const priceVal = document.createElement('span');
        priceVal.classList.add('price-value');
        priceVal.textContent = `₹${product.price}`;

        priceBox.appendChild(priceLbl);
        priceBox.appendChild(priceVal);

        const btn = document.createElement('button');
        btn.classList.add('btn-cart');
        if (product.stock === 0) {
            btn.classList.add('disabled');
            btn.setAttribute('disabled', 'true');
            btn.textContent = 'Out of Stock';
        } else {
            btn.textContent = 'Add to Cart';
            btn.setAttribute('data-id', product.id);
            btn.setAttribute('data-name', product.name);
        }

        footer.appendChild(priceBox);
        footer.appendChild(btn);

        body.appendChild(cat);
        body.appendChild(title);
        body.appendChild(desc);
        body.appendChild(footer);

        card.appendChild(imgWrap);
        card.appendChild(body);

        productGrid.appendChild(card);
    });
    console.log(`Rendered ${list.length} products to #productGrid via renderProducts()`);
}

// Initial render using the products array
renderProducts(products);

// Task 3: Debug and correct given program + textContent vs innerHTML explanation
/*
BUGGY PROGRAM ANALYSIS & CORRECTIONS:
1. Error: const heading = document.querySelector("mainHeading");
   Correction: Query selector requires '#' symbol for ID selection: document.querySelector("#mainHeading").
2. Error: const grid = document.getElementsByClassName("productGrid");
   Correction: 'productGrid' is an ID, not a class name. Use document.getElementById("productGrid") or document.querySelector("#productGrid").
3. Error: const cards = document.querySelectorAll(".product-card"); cards.style.color = "red";
   Correction: querySelectorAll returns a NodeList collection, which has no direct .style property. Must iterate using .forEach().
*/
const correctedHeading = document.querySelector("#mainHeading");
const correctedGrid = document.getElementById("productGrid");
const correctedCards = document.querySelectorAll(".product-card");
correctedCards.forEach(card => {
    card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
});
console.log("Task 3 Bug Corrections executed successfully.");

/*
-----------------------------------------------------------------------------
EXPLANATION: textContent vs innerHTML
-----------------------------------------------------------------------------
1. textContent:
   - Reads or writes pure unformatted text within an element and all child nodes.
   - Encodes any HTML special characters (<, >, &, etc.) as plain text.
   - Prevents XSS (Cross-Site Scripting) because strings containing <script> or
     malicious HTML tags are treated safely as inert text.
   - Faster execution because the browser does not invoke its HTML parser.

2. innerHTML:
   - Reads or writes serialized HTML markup.
   - Any HTML markup string is parsed into DOM nodes and rendered directly.
   - Vulnerable to security risks (XSS) if untrusted user input is directly 
     assigned without proper sanitization.
-----------------------------------------------------------------------------
*/
console.groupEnd();

// ==========================================================================
// WEEK 2 - DAY 2: EVENT HANDLING
// ==========================================================================
console.group("%c--- Week 2 Day 2: Event Handling ---", "color: #a855f7; font-weight: bold;");

// Task 1 & Task 2: Setup Event Listeners, print event objects, note 3 properties in comments
function initWeek2Day2Events() {
    // 1. Click on "Add to Cart" button -> shows message
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('btn-cart') && !e.target.disabled) {
            // Task 2: Print event object and note 3 properties in comments
            console.log("Cart Button Click Event Object:", e);
            /*
            EVENT PROPERTIES NOTED (Task 2):
            1. e.type: The string representing the event type, here 'click'.
            2. e.target: The DOM element that triggered the event, here the <button class="btn-cart">.
            3. e.clientX / e.clientY: Coordinates of mouse click relative to viewport.
            */
            const prodName = e.target.getAttribute('data-name') || 'Spice Item';
            const toast = document.getElementById('cartMessageToast');
            if (toast) {
                toast.style.display = 'inline-block';
                toast.textContent = `🛒 Added "${prodName}" to your shopping basket!`;
                setTimeout(() => { toast.style.display = 'none'; }, 3500);
            }
        }
    });

    // 2. Mouse hover on product card -> adds and removes 'zoom' class
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        productGrid.addEventListener('mouseover', function(e) {
            const card = e.target.closest('.product-card');
            if (card) {
                card.classList.add('zoom');
                // Task 2: Event properties: e.type ('mouseover'), e.target, e.currentTarget
            }
        });

        productGrid.addEventListener('mouseout', function(e) {
            const card = e.target.closest('.product-card');
            if (card) {
                card.classList.remove('zoom');
            }
        });
    }

    // 3. Key press in search box -> reacts to Enter key and clears on Escape key
    const searchBox = document.getElementById('spiceSearch');
    if (searchBox) {
        searchBox.addEventListener('keydown', function(e) {
            // Task 2: Print KeyboardEvent object and note properties
            console.log("Search Keydown Event Object:", e);
            /*
            EVENT PROPERTIES NOTED (Task 2):
            1. e.type: String name of event, here 'keydown'.
            2. e.target: The <input id="spiceSearch"> element where key was typed.
            3. e.key: The value of the key pressed ('Enter', 'Escape', 'a', etc.).
            */
            if (e.key === 'Enter') {
                const query = searchBox.value.trim().toLowerCase();
                console.log(`Reacted to Enter key. Searching for: "${query}"`);
                const filtered = products.filter(p => p.name.toLowerCase().includes(query));
                renderProducts(filtered);
            } else if (e.key === 'Escape') {
                searchBox.value = '';
                console.log("Reacted to Escape key. Search input cleared.");
                renderProducts(products);
            }
        });
    }

    // Task 3: Form submission with event.preventDefault()
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevents browser page reload on submit
            console.log("Form submit event intercepted with event.preventDefault():", e);
            /*
            -------------------------------------------------------------------------
            COMMENT: WHY addEventListener IS PREFERRED OVER onclick ATTRIBUTE (Task 3)
            -------------------------------------------------------------------------
            1. Separation of Concerns: Keeps HTML markup clean and declarative while
               housing JavaScript logic in dedicated script files.
            2. Multiple Listeners: addEventListener allows attaching multiple independent
               handlers to the same element for the same event without overwriting existing ones.
            3. Event Propagation Control: Supports standard event capturing and bubbling phases
               (via the third capture boolean/options argument) which inline onclick cannot do.
            4. Memory Management & Cleanliness: Handlers can be dynamically removed using
               removeEventListener and can pass options like { once: true }.
            -------------------------------------------------------------------------
            */
            const feedback = document.getElementById('formFeedback');
            const name = document.getElementById('fullName') ? document.getElementById('fullName').value : 'Customer';
            if (feedback) {
                feedback.className = 'form-feedback success';
                feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your enquiry has been received safely without page reload via event.preventDefault().`;
            }
        });
    }
}
console.groupEnd();

// ==========================================================================
// WEEK 2 - DAY 3: DYNAMIC LIST WITH EVENT DELEGATION
// ==========================================================================
console.group("%c--- Week 2 Day 3: Dynamic List with Event Delegation ---", "color: #f59e0b; font-weight: bold;");

function initWeek2Day3TaskManager() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCounter = document.getElementById('taskCounter');

    let taskCount = 0;

    function updateCounterDisplay() {
        if (taskCounter) {
            taskCounter.textContent = taskCount;
        }
    }

    // Task 1: Add a shop task using createElement & textContent, ignoring empty input
    if (addTaskBtn && taskInput && taskList) {
        addTaskBtn.addEventListener('click', function() {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                console.warn("Ignored empty task input.");
                return;
            }

            // Create <li> task item
            const li = document.createElement('li');
            li.classList.add('task-item');

            // Text span
            const span = document.createElement('span');
            span.classList.add('task-text');
            span.textContent = taskText;

            // Task 2: Add Delete button to each task
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('task-delete-btn');
            deleteBtn.textContent = 'Delete';

            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);

            // Update counter after add (numeric addition)
            taskCount++;
            updateCounterDisplay();
            console.log(`Task added: "${taskText}". Active count: ${taskCount}`);

            taskInput.value = '';
            taskInput.focus();
        });

        // Allow pressing Enter in task input
        taskInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                addTaskBtn.click();
            }
        });

        // Task 2: Delete task using a SINGLE event listener on parent list (EVENT DELEGATION)
        taskList.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('task-delete-btn')) {
                const li = e.target.closest('li');
                if (li) {
                    const deletedText = li.querySelector('.task-text') ? li.querySelector('.task-text').textContent : 'task';
                    li.remove();

                    // Update counter after delete
                    taskCount = Math.max(0, taskCount - 1);
                    updateCounterDisplay();
                    console.log(`Task deleted via event delegation: "${deletedText}". Active count: ${taskCount}`);
                }
            }
        });
    }

    // Task 3: Debug and correct the given program
    /*
    -----------------------------------------------------------------------------
    BUGGY PROGRAM ANALYSIS & CORRECTIONS (Task 3):
    1. Error: counter increased using string concatenation:
       Bug: counter.textContent = counter.textContent + 1; // "0" + 1 = "01"
       Correction: Convert to number or maintain a numeric variable:
       let count = parseInt(counter.textContent, 10); count++; counter.textContent = count;
    2. Error: counter not updated after deleting:
       Bug: Delete handler simply removed item without decrementing count.
       Correction: Explicitly decrement count (count--) and update counter display.
    3. Error: Delete listeners attached before list items are created:
       Bug: document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener(...))
            ran once at page load when list items did not exist yet!
       Correction: Use Event Delegation on the existing parent container (taskList)
            to listen for clicks on current and future delete buttons dynamically.
    -----------------------------------------------------------------------------
    */
    console.log("Week 2 Day 3 Task Manager and Event Delegation initialized.");
}
initWeek2Day3TaskManager();
console.groupEnd();

// ==========================================================================
// WEEK 2 - DAY 4: ARRAYS AND OBJECTS
// ==========================================================================
console.group("%c--- Week 2 Day 4: Arrays and Objects ---", "color: #10b981; font-weight: bold;");

// Task 1: Student score array with name, roll, mark; map(), filter(), reduce()
const students = [
    { name: "Advaith Renjith", roll: 101, mark: 94 },
    { name: "Devika Nair", roll: 102, mark: 88 },
    { name: "Rahul Krishna", roll: 103, mark: 76 },
    { name: "Ananya Pillai", roll: 104, mark: 92 },
    { name: "Siddharth Menon", roll: 105, mark: 38 },
    { name: "Meera Varma", roll: 106, mark: 85 }
];

// 1. map() to get list of names
const studentNames = students.map(s => s.name);
console.log("Student Names (map):", studentNames);

// 2. filter() to get students who passed (pass mark >= 40)
const passedStudents = students.filter(s => s.mark >= 40);
console.log("Passed Students (filter mark >= 40):", passedStudents);

// 3. reduce() to find total and average marks
const totalMarks = students.reduce((acc, s) => acc + s.mark, 0);
const averageMark = totalMarks / students.length;
console.log(`Total Marks (reduce): ${totalMarks} | Average Mark: ${averageMark.toFixed(2)}`);

// Task 2: find(), some(), every(), Object.keys(), Object.entries()
// 1. find() to get topper
const highestMark = Math.max(...students.map(s => s.mark));
const topper = students.find(s => s.mark === highestMark);
console.log("Class Topper (find):", topper);

// 2. some() to check if anyone scored >= 90
const hasDistinction = students.some(s => s.mark >= 90);
console.log("Has any student scored 90+? (some):", hasDistinction);

// 3. every() to check if all students passed
const allPassed = students.every(s => s.mark >= 40);
console.log("Did every student pass? (every):", allPassed);

// 4. Object.keys() and Object.entries() on one student record
console.log("Keys of Topper (Object.keys):", Object.keys(topper));
console.log("Entries of Topper (Object.entries):");
Object.entries(topper).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
});

// Repeat map(), filter(), reduce() on products array
// a. map() to get product names
const productNames = products.map(p => p.name);
console.log("Product Names (map):", productNames);

// b. filter() to get products currently in stock
const inStockProducts = products.filter(p => p.stock > 0);
console.log("Products in Stock (filter stock > 0):", inStockProducts);

// c. reduce() to find total stock inventory value (price * stock)
const totalStockValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
console.log(`Total Stock Inventory Value (reduce): ₹${totalStockValue.toLocaleString()}`);

// Task 3: Dual real-time filtering: search input event + category dropdown
function setupDualFilter() {
    const searchBox = document.getElementById('spiceSearch');
    const categorySelect = document.getElementById('categoryFilter');

    function applyFilters() {
        const searchTerm = searchBox ? searchBox.value.trim().toLowerCase() : "";
        const selectedCat = categorySelect ? categorySelect.value : "All";

        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesCategory = (selectedCat === "All" || product.category === selectedCat);
            return matchesSearch && matchesCategory;
        });

        renderProducts(filtered);
        console.log(`Dual Filter applied -> Query: "${searchTerm}", Category: "${selectedCat}", Matches: ${filtered.length}`);
    }

    if (searchBox) {
        // Use input event as user types (Task 3 requirement)
        searchBox.addEventListener('input', applyFilters);
    }
    if (categorySelect) {
        categorySelect.addEventListener('change', applyFilters);
    }
}
setupDualFilter();
console.groupEnd();

// ==========================================================================
// WEEK 2 - DAY 5: FORM VALIDATION & CONSTRAINT API
// ==========================================================================
console.group("%c--- Week 2 Day 5: Form Validation ---", "color: #ec4899; font-weight: bold;");

function initWeek2Day5FormValidation() {
    const form = document.getElementById('enquiryForm');
    if (!form) return;

    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('emailAddress');
    const passwordInput = document.getElementById('custPassword');
    const confirmInput = document.getElementById('confirmPassword');
    const phoneInput = document.getElementById('phoneNum');
    const messageInput = document.getElementById('messageText');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmPasswordError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    const safePreview = document.getElementById('safeMessagePreview');

    // Email regex: Standard format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // 10-digit phone regex
    const phoneRegex = /^\d{10}$/;

    // Task 1 & 2: Field Validators using Constraint Validation API & Regex
    function validateName() {
        if (!nameInput) return true;
        if (nameInput.validity.valueMissing || nameInput.value.trim() === "") {
            nameError.textContent = "Full name is required.";
            nameInput.classList.add('input-invalid');
            nameInput.classList.remove('input-valid');
            return false;
        }
        nameError.textContent = "";
        nameInput.classList.remove('input-invalid');
        nameInput.classList.add('input-valid');
        return true;
    }

    function validateEmail() {
        if (!emailInput) return true;
        const val = emailInput.value.trim();
        if (emailInput.validity.valueMissing || val === "") {
            emailError.textContent = "Email address is required.";
        } else if (!emailRegex.test(val)) {
            emailError.textContent = "Please enter a valid email format (e.g. user@domain.com).";
        } else {
            emailError.textContent = "";
            emailInput.classList.remove('input-invalid');
            emailInput.classList.add('input-valid');
            return true;
        }
        emailInput.classList.add('input-invalid');
        emailInput.classList.remove('input-valid');
        return false;
    }

    function validatePassword() {
        if (!passwordInput) return true;
        if (passwordInput.validity.valueMissing || passwordInput.value.length === 0) {
            passwordError.textContent = "Password is required.";
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = `Password must be at least 8 characters (current: ${passwordInput.value.length}).`;
        } else {
            passwordError.textContent = "";
            passwordInput.classList.remove('input-invalid');
            passwordInput.classList.add('input-valid');
            validateConfirmPassword();
            return true;
        }
        passwordInput.classList.add('input-invalid');
        passwordInput.classList.remove('input-valid');
        return false;
    }

    function validateConfirmPassword() {
        if (!confirmInput || !passwordInput) return true;
        if (confirmInput.value !== passwordInput.value) {
            // Task 2: Use setCustomValidity() for confirm password field
            confirmInput.setCustomValidity("Passwords do not match!");
            confirmError.textContent = "Passwords do not match.";
            confirmInput.classList.add('input-invalid');
            confirmInput.classList.remove('input-valid');
            return false;
        } else {
            confirmInput.setCustomValidity(""); // Clear custom validity error
            confirmError.textContent = "";
            confirmInput.classList.remove('input-invalid');
            confirmInput.classList.add('input-valid');
            return true;
        }
    }

    function validatePhone() {
        if (!phoneInput) return true;
        const val = phoneInput.value.trim();
        if (phoneInput.validity.valueMissing || val === "") {
            phoneError.textContent = "Phone number is required.";
        } else if (!phoneRegex.test(val)) {
            phoneError.textContent = "Please enter a valid 10-digit mobile number.";
        } else {
            phoneError.textContent = "";
            phoneInput.classList.remove('input-invalid');
            phoneInput.classList.add('input-valid');
            return true;
        }
        phoneInput.classList.add('input-invalid');
        phoneInput.classList.remove('input-valid');
        return false;
    }

    function validateMessage() {
        if (!messageInput) return true;
        if (messageInput.value.trim() === "") {
            messageError.textContent = "Message or enquiry details cannot be empty.";
            messageInput.classList.add('input-invalid');
            messageInput.classList.remove('input-valid');
            return false;
        }
        messageError.textContent = "";
        messageInput.classList.remove('input-invalid');
        messageInput.classList.add('input-valid');
        return true;
    }

    // Task 2: Real-time feedback using 'input' event
    if (nameInput) nameInput.addEventListener('input', validateName);
    if (emailInput) emailInput.addEventListener('input', validateEmail);
    if (passwordInput) passwordInput.addEventListener('input', validatePassword);
    if (confirmInput) confirmInput.addEventListener('input', validateConfirmPassword);
    if (phoneInput) phoneInput.addEventListener('input', validatePhone);
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            validateMessage();
            // Task 3: Safe rendering preview using textContent
            if (safePreview) {
                safePreview.textContent = messageInput.value; // Safe rendering via textContent
            }
        });
    }

    // Form submission validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPassValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();
        const isPhoneValid = validatePhone();
        const isMsgValid = validateMessage();

        const isFormValid = isNameValid && isEmailValid && isPassValid && isConfirmValid && isPhoneValid && isMsgValid;

        const feedback = document.getElementById('formFeedback');
        if (isFormValid) {
            feedback.className = 'form-feedback success';
            feedback.innerHTML = `<strong>Success!</strong> All fields validated successfully via Constraint Validation API. Thank you, ${nameInput.value}!`;
            console.log("Form successfully validated and submitted.");
        } else {
            feedback.className = 'form-feedback';
            feedback.style.display = 'block';
            feedback.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
            feedback.style.color = '#f87171';
            feedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            feedback.textContent = "Please resolve the highlighted validation errors above.";
            console.warn("Form validation failed on submit.");
        }
    });

    /*
    -----------------------------------------------------------------------------
    WEEK 2 DAY 5 TASK 3: XSS VS SAFE RENDERING DEMONSTRATION
    -----------------------------------------------------------------------------
    EXPERIMENT OBSERVATION:
    When user enters: <script>alert('XSS Attack!')</script> or <img src=x onerror=alert('XSS')>
    - If rendered using innerHTML:
      element.innerHTML = userInput;
      The browser parses the input as HTML markup. An <img> onerror or executable payload
      triggers and runs arbitrary JavaScript in the user's session (Cross-Site Scripting).
    - When rendered using textContent:
      element.textContent = userInput;
      The browser treats the entire string literally as character data (TextNode). Special
      characters such as '<', '>', and '&' are not parsed as HTML tags, rendering
      '<script>alert("XSS")</script>' harmlessly on the screen as plain text.
    -----------------------------------------------------------------------------
    */
    console.log("Week 2 Day 5 Form Validation with Constraint API initialized.");
}
initWeek2Day5FormValidation();
console.groupEnd();

// ==========================================================================
// WEEK 3 - DAY 1: JSON AND THE FETCH API
// ==========================================================================
console.group("%c--- Week 3 Day 1: JSON & Fetch API ---", "color: #06b6d4; font-weight: bold;");

// Task 1: loadProducts() using fetch(), response.ok, response.json()
function loadProducts() {
    console.log("Initiating fetch() request for data/products.json...");
    return fetch('data/products.json')
        .then(response => {
            console.log(`Fetch response received. Status: ${response.status}, OK: ${response.ok}`);
            if (!response.ok) {
                throw new Error(`HTTP network error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(fetchedProducts => {
            console.log("Successfully parsed products from JSON:", fetchedProducts);
            renderProducts(fetchedProducts);
            return fetchedProducts;
        })
        .catch(err => {
            console.error("Error loading products via fetch:", err.message);
        });
}
loadProducts();

// Task 2: Save cart in localStorage via JSON.stringify(), read back with JSON.parse() inside try...catch
let cart = [];

function loadCartFromStorage() {
    try {
        const storedCart = localStorage.getItem('el_herbs_cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            console.log(`Loaded ${cart.length} items from localStorage cart:`, cart);
        } else {
            cart = [];
            console.log("No existing cart found in localStorage, initialized empty cart.");
        }
    } catch (e) {
        console.error("Error parsing cart from localStorage with JSON.parse():", e.message);
        cart = []; // Fallback to empty array if corrupted
    }
}
loadCartFromStorage();

function saveCartToStorage() {
    try {
        localStorage.setItem('el_herbs_cart', JSON.stringify(cart));
        console.log("Cart saved to localStorage via JSON.stringify():", cart);
    } catch (e) {
        console.error("Error saving cart to localStorage:", e.message);
    }
}

// Enhance Add-to-Cart clicks to update localStorage cart
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-cart') && !e.target.disabled) {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        const name = e.target.getAttribute('data-name') || 'Spice Item';
        cart.push({ id, name, timestamp: new Date().toISOString() });
        saveCartToStorage();
    }
});

// Task 3: JSON Syntax Error Observations & 404 Fetch Demonstration
/*
-----------------------------------------------------------------------------
JSON ERROR OBSERVATIONS (Task 3):
1. Single Quotes error:
   Invalid JSON: { 'name': 'Cardamom' }
   Error: SyntaxError: Expected property name or '}' in JSON (JSON standard strictly mandates double quotes "")
2. Trailing Comma error:
   Invalid JSON: [ { "id": 1 }, ]
   Error: SyntaxError: Unexpected token ']' in JSON at position ... (JSON forbids trailing commas)
3. Unquoted Key error:
   Invalid JSON: { name: "Cardamom" }
   Error: SyntaxError: Expected double-quoted property name in JSON at line ...
-----------------------------------------------------------------------------
*/

// Demonstration of 404 response on non-existent file
function demo404Fetch() {
    fetch('data/non_existent_spice_catalog.json')
        .then(response => {
            console.log("Demonstrating 404 Fetch Check:");
            console.log(`  Target URL: data/non_existent_spice_catalog.json`);
            console.log(`  response.ok: ${response.ok} (Expected: false)`);
            console.log(`  response.status: ${response.status} (Expected: 404 Not Found)`);
        })
        .catch(err => {
            console.log("Network error caught in 404 test:", err.message);
        });
}
demo404Fetch();
console.groupEnd();





