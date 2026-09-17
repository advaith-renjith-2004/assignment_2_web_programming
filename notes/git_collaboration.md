# Git Collaboration Workflow & Versioning Notes

**Course:** 23EEL43H Web Programming  
**Assignment:** # 2.c – Week 3, Day 3  
**Project:** EL Herbs and Spices Shop  

---

## 🌿 Task 1: `.gitignore` and Feature Branch Workflow

### 1. `.gitignore` Configuration
The root `.gitignore` file includes:
- `node_modules/`: Excluded because packages are defined in `package.json` and restored with `npm install`.
- `.env`: Excluded to prevent API keys and database credentials from leaking.
- `*.log`: Excluded because execution logs change dynamically.
- `.DS_Store` / `Thumbs.db`: Excluded because they are operating system file manager artifacts.

### 2. Feature Branching & Pull Request Process
```bash
# Create and switch to a feature branch
git checkout -b feature/cart-persistence

# Make commits on the feature branch
git add js/app.js
git commit -m "Feature: Added localStorage cart persistence"

# Push feature branch to remote GitHub repository
git push origin feature/cart-persistence

# On GitHub: Open Pull Request to merge into 'main'
# Classmate Code Reviewer Comments:
# - Comment 1 (Line 860): "Ensure try...catch handles corrupted JSON gracefully in loadCartFromStorage."
# - Comment 2 (Line 878): "Consider debouncing saveCartToStorage if cart items are updated frequently."
# Reviewer approves, and Pull Request is merged into 'main'.
```

---

## ⚔️ Task 2: Merge Conflict Simulation & Resolution

### How the Conflict Occurred
Two developers created separate branches from `main` to modify the store tagline on line 24 of `index.html`:

- **Branch A (`feature/tagline-organic`):**
  ```html
  <<<<<<< HEAD (or main)
  <p class="shop-tagline">100% Certified Organic Kerala Spices & Herbal Blends</p>
  =======
  ```
- **Branch B (`feature/tagline-heritage`):**
  ```html
  <p class="shop-tagline">Handcrafted Heritage Spices from the Hills of Kerala</p>
  >>>>>>> feature/tagline-heritage
  ```

### Merge Conflict Markers Captured:
```text
<<<<<<< HEAD
<p class="shop-tagline">100% Certified Organic Kerala Spices & Herbal Blends</p>
=======
<p class="shop-tagline">Handcrafted Heritage Spices from the Hills of Kerala</p>
>>>>>>> feature/tagline-heritage
```

### Conflict Resolution:
The conflict was resolved by discussing with the team and unifying both benefits into a combined, superior tagline:
```html
<p class="shop-tagline">Pure Organic Aromas • Authentic Quality • Farm Fresh</p>
```
All conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) were deleted, and the resolved merge commit was recorded.

---

## 🏷️ Task 3: Annotated Git Tag `v0.1.0` and Semantic Versioning

### Annotated Tag Creation:
```bash
git tag -a v0.1.0 -m "Release v0.1.0 - Completed Frontend for EL Herbs and Spices Shop"
git push origin v0.1.0
```

### Semantic Versioning (SemVer 2.0.0) Explanation:
Software versions follow the format **`MAJOR.MINOR.PATCH`** (e.g., `v0.1.0`):

1. **MAJOR (0):**
   - Incremented when making **incompatible API changes** or breaking modifications.
   - `0.y.z` denotes the initial development stage where anything may change at any time.
   - Example: Migrating from Vanilla JS to a complete React/Next.js rewrite would be bumped to `v1.0.0`.

2. **MINOR (1):**
   - Incremented when adding **functionality in a backwards-compatible manner**.
   - Example: Releasing the full frontend interactive UI with search, filtering, and local cart storage bumped the version to `v0.1.0`.

3. **PATCH (0):**
   - Incremented when making **backwards-compatible bug fixes**.
   - Example: Fixing a CSS alignment bug on mobile devices or correcting a typo in a product price would increment to `v0.1.1`.
