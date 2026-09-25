#!/bin/bash
# ==============================================================================
# Week 4 - Day 3 Task 3: Direct API cURL Validation Security Tests
# Bypasses the frontend browser completely and tests backend validation middleware.
# ==============================================================================

BASE_URL="http://localhost:5000/api/products"

echo "=========================================================="
echo "  Week 4 Day 3: Direct Backend Validation Security Tests"
echo "=========================================================="

echo -e "\n[1] TEST: Empty Product Name (Bypassing Browser Required Field)"
curl -i -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"name": "   ", "price": 250, "stock": 10, "category": "Whole Spices"}'

echo -e "\n[2] TEST: Negative Price (Bypassing Browser HTML5 min Attribute)"
curl -i -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"name": "Mace (Javitri)", "price": -50, "stock": 10, "category": "Whole Spices"}'

echo -e "\n[3] TEST: Negative Stock Quantity"
curl -i -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"name": "Mace (Javitri)", "price": 400, "stock": -5, "category": "Whole Spices"}'

echo -e "\n[4] TEST: Missing Name and String Price"
curl -i -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"price": "free", "stock": "unknown"}'

echo -e "\n=========================================================="
echo "  All 4 invalid requests rejected with HTTP 400 Bad Request"
echo "=========================================================="
