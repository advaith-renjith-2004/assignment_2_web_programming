const fs = require('fs');
const path = require('path');

// 1. Minify CSS
const cssPath = path.join(__dirname, '..', 'css', 'style.css');
const minCssPath = path.join(__dirname, '..', 'css', 'style.min.css');

let css = fs.readFileSync(cssPath, 'utf8');
const originalCssSize = Buffer.byteLength(css, 'utf8');

// Strip multi-line comments
css = css.replace(/\/\*[\s\S]*?\*\//g, '');
// Strip excessive whitespace
css = css.replace(/\s+/g, ' ');
css = css.replace(/\s*([{}:;,>+~])\s*/g, '$1');
css = css.replace(/;}/g, '}');
css = css.trim();

fs.writeFileSync(minCssPath, css, 'utf8');
const minCssSize = Buffer.byteLength(css, 'utf8');

console.log(`CSS Minification: ${originalCssSize} bytes -> ${minCssSize} bytes (${((1 - minCssSize/originalCssSize)*100).toFixed(1)}% reduction)`);

// 2. Minify JS
const jsPath = path.join(__dirname, '..', 'js', 'app.js');
const minJsPath = path.join(__dirname, '..', 'js', 'app.min.js');

let js = fs.readFileSync(jsPath, 'utf8');
const originalJsSize = Buffer.byteLength(js, 'utf8');

// Strip block comments (preserve regex literals safely)
js = js.replace(/\/\*[\s\S]*?\*\//g, '');
// Strip single-line comments that are alone on a line
js = js.split('\n')
    .map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('//')) return '';
        return line;
    })
    .filter(line => line.length > 0)
    .join('\n');

fs.writeFileSync(minJsPath, js, 'utf8');
const minJsSize = Buffer.byteLength(js, 'utf8');

console.log(`JS Optimization: ${originalJsSize} bytes -> ${minJsSize} bytes (${((1 - minJsSize/originalJsSize)*100).toFixed(1)}% reduction)`);
