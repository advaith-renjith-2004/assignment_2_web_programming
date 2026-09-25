#!/bin/bash
# ==============================================================================
# Week 4 - Day 2 Task 3: REST API Test Script for Products Resource
# Tests all 5 routes (GET, GET by id, POST, PUT, DELETE) including failure cases.
# ==============================================================================

BASE_URL="http://localhost:5000/api/products"

echo "=========================================================="
echo "  EL Herbs and Spices - Week 4 Day 2 REST API cURL Tests"
echo "=========================================================="

echo -e "\n[1] TEST: GET All Products (Expected Status: 200 OK)"
curl -s -o /dev/null -w "HTTP Status Code: %{http_code}\n" -X GET "$BASE_URL"

echo -e "\n[2] TEST: GET Product By ID - Success (Expected Status: 200 OK)"
curl -s -o /dev/null -w "HTTP Status Code: %{http_code}\n" -X GET "$BASE_URL/1"

echo -e "\n[3] TEST: GET Product By ID - Not Found Failure (Expected Status: 404 Not Found)"
curl -s -o /dev/null -w "HTTP Status Code: %{http_code}\n" -X GET "$BASE_URL/999"

echo -e "\n[4] TEST: GET Product By ID - Invalid ID Format (Expected Status: 400 Bad Request)"
curl -s -o /dev/null -w "HTTP Status Code: %{http_code}\n" -X GET "$BASE_URL/abc"

echo -e "\n[5] TEST: POST Create Product - Success (Expected Status: 201 Created)"
curl -s -o /dev/null -w "HTTP Status Code: %{http_code}\n" -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Star Anise (Chakra Phool)","price":380,"stock":15,"category":"Whole Spices"}'

echo -e "\n[6] TEST: POST Create Product - Validation Failure (Expected Status: 400 Bad Request)"
curl -s -o /dev/null -w "HTTP Status Code: %{http_code}\n" -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"","price":-20,"stock":-5}'

echo -e "\n[7] TEST: PUT Update Product - Success (Expected Status: 200 OK)"
curl -s -o /dev/null -w "HTTP Status Code: %{http_code}\n" -X PUT "$BASE_URL/1" \
  -H "Content-Type: application/json" \
  -d '{"name":"Cardamom (Elaichi) Grade A","price":480,"stock":28,"category":"Whole Spices"}'

echo -e "\n[8] TEST: PUT Update Product - Not Found Failure (Expected Status: 404 Not Found)"
curl -s -o /dev/null -w "HTTP Status Code: %{http_code}\n" -X PUT "$BASE_URL/999" \
  -H "Content-Type: application/json" \
  -d '{"name":"Non-existent Spice","price":100,"stock":10,"category":"Herbs"}'

echo -e "\n[9] TEST: DELETE Product - Success (Expected Status: 204 No Content)"
curl -s -o /dev/null -w "HTTP Status Code: %{http_code}\n" -X DELETE "$BASE_URL/8"

echo -e "\n[10] TEST: DELETE Product - Not Found Failure (Expected Status: 404 Not Found)"
curl -s -o /dev/null -w "HTTP Status Code: %{http_code}\n" -X DELETE "$BASE_URL/999"

echo "=========================================================="
echo "  All 10 cURL tests executed successfully."
echo "=========================================================="
