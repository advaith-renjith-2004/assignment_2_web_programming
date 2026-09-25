/* ==============================================================================
   EL Herbs and Spices Shop - Client API Helper (api.js)
   Course: 23EEL43H Web Programming | Assignment # 2
   Week 4 - Day 1 & Day 2: Frontend-Backend Integration & Products REST Client
   ============================================================================== */

const API_BASE_URL = (typeof window !== 'undefined' && window.API_BASE_URL)
    ? window.API_BASE_URL
    : 'http://localhost:5000';

// ==============================================================================
// DAY 1: TASK MANAGEMENT API FUNCTIONS
// ==============================================================================
async function getTasks() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("[api.js] Error in getTasks():", error.message);
        throw error;
    }
}

async function addTask(text) {
    try {
        if (!text || text.trim() === '') {
            throw new Error("Task text cannot be empty.");
        }
        const response = await fetch(`${API_BASE_URL}/api/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text.trim() })
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Failed to add task: HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("[api.js] Error in addTask():", error.message);
        throw error;
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok && response.status !== 204) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Failed to delete task: HTTP ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error("[api.js] Error in deleteTask():", error.message);
        throw error;
    }
}

// ==============================================================================
// DAY 1: CUSTOMER ENQUIRY API SUBMISSION
// ==============================================================================
async function submitEnquiry(enquiryData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enquiryData)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Submission failed: HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("[api.js] Error in submitEnquiry():", error.message);
        throw error;
    }
}

// ==============================================================================
// DAY 2: PRODUCTS REST API FUNCTIONS (ALL 5 OPERATIONS)
// ==============================================================================

/**
 * 1. GET all products (Status 200)
 */
async function getProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`Failed to load products: HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("[api.js] Error in getProducts():", error.message);
        throw error;
    }
}

/**
 * 2. GET product by ID (Status 200 / 404)
 */
async function getProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Product #${id} not found: HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("[api.js] Error in getProductById():", error.message);
        throw error;
    }
}

/**
 * 3. POST new product (Status 201 Created)
 */
async function addProduct(product) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Failed to add product: HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("[api.js] Error in addProduct():", error.message);
        throw error;
    }
}

/**
 * 4. PUT update existing product by ID (Status 200 OK)
 */
async function updateProduct(id, product) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Failed to update product: HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("[api.js] Error in updateProduct():", error.message);
        throw error;
    }
}

/**
 * 5. DELETE product by ID (Status 204 No Content)
 */
async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok && response.status !== 204) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Failed to delete product: HTTP ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error("[api.js] Error in deleteProduct():", error.message);
        throw error;
    }
}

/* ==============================================================================
   BUG FIX NOTES & EXPLANATIONS:
   Week 4 - Day 1 Task 3: Missing Header, missing JSON.stringify, missing await
   Week 4 - Day 2 Task 3: req.params.id string vs number (===), missing 404 handler
   ============================================================================== */

// Export for browser environment & Node.js
if (typeof window !== 'undefined') {
    window.getTasks = getTasks;
    window.addTask = addTask;
    window.deleteTask = deleteTask;
    window.submitEnquiry = submitEnquiry;
    window.getProducts = getProducts;
    window.getProductById = getProductById;
    window.addProduct = addProduct;
    window.updateProduct = updateProduct;
    window.deleteProduct = deleteProduct;
    window.API_BASE_URL = API_BASE_URL;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getTasks, addTask, deleteTask, submitEnquiry,
        getProducts, getProductById, addProduct, updateProduct, deleteProduct,
        API_BASE_URL
    };
}
