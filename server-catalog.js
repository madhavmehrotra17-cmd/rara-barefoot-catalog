const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Request logger to debug static files and force disable all browser caches
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

// Serve static assets from the current directory (disable default index.html serving)
app.use(express.static(__dirname, { index: false }));

// Explicit handler for product images and static assets to resolve spaces and encoding issues
app.get('/:filename', (req, res, next) => {
    const ext = path.extname(req.params.filename).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext)) {
        const decodedName = decodeURIComponent(req.params.filename);
        const filePath = path.join(__dirname, decodedName);
        if (fs.existsSync(filePath)) {
            return res.sendFile(filePath);
        }
    }
    next();
});

// Route for the new catalog page
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'catalog.html');
    if (fs.existsSync(filePath)) {
        res.send(fs.readFileSync(filePath, 'utf8'));
    } else {
        res.status(404).send('catalog.html not found. Please create it.');
    }
});

// Cache-bypassing routes for preview
app.get('/fresh', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'catalog.html'), 'utf8'));
});

app.get('/preview', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'catalog.html'), 'utf8'));
});

// A fallback to catalog.html for easy access
app.get('/catalog', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'catalog.html'), 'utf8'));
});

// Map products to the new catalog.html so clicking shoes from homepage opens this new page
app.get('/products/:product', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'catalog.html'), 'utf8'));
});

// Serve other pages if needed
app.get('/pages/:page', (req, res) => {
    try {
        const file = path.join(__dirname, req.params.page + '.html');
        if (fs.existsSync(file)) {
            res.send(fs.readFileSync(file, 'utf8'));
        } else {
            res.status(404).send('Page not found on disk: ' + file);
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
});

const PORT = 5178;
app.listen(PORT, () => {
    console.log(`Fresh Catalog Server running on http://localhost:${PORT}`);
});
