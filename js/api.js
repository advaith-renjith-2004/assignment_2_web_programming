/* ==============================================================================
   EL Herbs and Spices Shop - Client API Helper (api.js)
   Course: 23EEL43H Web Programming | Assignment # 2
   Week 4 - Day 1: Connecting the Frontend to the Backend
   ============================================================================== */

/**
 * Base URL for the Express Backend Server.
 * Supports configurable global window.API_BASE_URL or defaults to http://localhost:5000
 */
const API_BASE_URL = (typeof window !== 'undefined' && window.API_BASE_URL)
    ? window.API_BASE_URL
    : 'http://localhost:5000';

// ==============================================================================
// TASK 1: TASK MANAGEMENT API FUNCTIONS
// Each function uses fetch with:
// - the correct HTTP method (GET, POST, DELETE)
// - Content-Type header set to application/json
// - body converted using JSON.stringify(...)
// ==============================================================================

/**
 * Fetch all tasks from the server.
 * Method: GET
 * Header: Content-Type: application/json
 * @returns {Promise<Object>} JSON response containing tasks array
 */
async function getTasks() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: HTTP ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("[api.js] Error in getTasks():", error.message);
        throw error;
    }
}

/**
 * Save a new task to the server.
 * Method: POST
 * Header: Content-Type: application/json
 * Body: JSON.stringify({ text })
 * @param {string} text - The task description text
 * @returns {Promise<Object>} Created task JSON returned by server
 */
async function addTask(text) {
    try {
        if (!text || text.trim() === '') {
            throw new Error("Task text cannot be empty.");
        }

        const response = await fetch(`${API_BASE_URL}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text.trim() })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Failed to add task: HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("[api.js] Error in addTask():", error.message);
        throw error;
    }
}

/**
 * Delete a task from the server by id.
 * Method: DELETE
 * Header: Content-Type: application/json
 * @param {number|string} id - The ID of the task to delete
 * @returns {Promise<boolean>} True if deleted (HTTP 204 or ok)
 */
async function deleteTask(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
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
// TASK 3: CUSTOMER ENQUIRY API SUBMISSION
// Sends customer enquiry form data to POST /api/enquiries using fetch
// ==============================================================================

/**
 * Submit customer enquiry data to backend.
 * Method: POST
 * Header: Content-Type: application/json
 * Body: JSON.stringify(enquiryData)
 * @param {Object} enquiryData - Customer enquiry object
 * @returns {Promise<Object>} Server response JSON
 */
async function submitEnquiry(enquiryData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enquiryData)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Submission failed: HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("[api.js] Error in submitEnquiry():", error.message);
        throw error;
    }
}

/* ==============================================================================
   WEEK 4 - DAY 1 TASK 3: BUGGY FETCH PROGRAM ANALYSIS & CORRECTIONS
   ==============================================================================
   
   THE GIVEN BUGGY PROGRAM:
   ------------------------------------------------------------------------------
   function sendEnquiry(data) {
       let res = fetch('http://localhost:5000/api/enquiries', {
           method: 'POST',
           body: data                  // BUG 1: body is raw object, NOT converted using JSON.stringify
                                       // BUG 2: 'Content-Type': 'application/json' header is missing
       });
       let result = res.json();        // BUG 3: 'await' is missing before res.json() (and res is unawaited Promise)
       return result;
   }
   ------------------------------------------------------------------------------

   EXPLANATION OF THE THREE BUGS:
   1. Missing Header:
      Without `headers: { 'Content-Type': 'application/json' }`, the Express server's 
      `express.json()` middleware does not know how to parse the request body, leaving 
      `req.body` as `undefined` or `{}`.
   2. Missing JSON.stringify:
      Passing a plain JavaScript object directly to `body` causes JavaScript to call 
      `toString()`, sending `[object Object]` to the server over HTTP, causing JSON parse errors.
      It must be serialized into a valid JSON string using `JSON.stringify(data)`.
   3. Missing await:
      `fetch()` and `res.json()` are asynchronous operations returning Promises. Without `await`,
      `res.json()` is invoked on a pending Promise rather than a Response object (or returns a 
      pending Promise instead of parsed data), causing synchronous callers to receive 
      `[object Promise]` instead of the actual data payload.

   THE CORRECTED PROGRAM:
   ------------------------------------------------------------------------------
   async function sendEnquiryCorrected(data) {
       const res = await fetch('http://localhost:5000/api/enquiries', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'      // FIX 1: Explicit JSON header
           },
           body: JSON.stringify(data)                  // FIX 2: Serialized JSON string
       });
       const result = await res.json();                // FIX 3: Await the response JSON promise
       return result;
   }
   ------------------------------------------------------------------------------
*/

// Export for browser environment & CommonJS / Node testing
if (typeof window !== 'undefined') {
    window.getTasks = getTasks;
    window.addTask = addTask;
    window.deleteTask = deleteTask;
    window.submitEnquiry = submitEnquiry;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getTasks,
        addTask,
        deleteTask,
        submitEnquiry,
        API_BASE_URL
    };
}
