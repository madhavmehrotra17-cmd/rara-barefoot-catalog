const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
// Force disable all browser caches
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8'));
});

// Cache-bypassing routes for preview
app.get('/fresh', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8'));
});

app.get('/preview', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8'));
});

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

app.get('/collections/:collection', (req, res) => {
    try {
        const filepath = path.join(__dirname, 'collection.html');
        if (fs.existsSync(filepath)) {
            res.send(fs.readFileSync(filepath, 'utf8'));
        } else {
            let file = 'mens.html';
            if (req.params.collection.includes('women')) file = 'womens.html';
            const fallbackPath = path.join(__dirname, file);
            if (fs.existsSync(fallbackPath)) {
                res.send(fs.readFileSync(fallbackPath, 'utf8'));
            } else {
                res.status(404).send('Collection fallback not found on disk');
            }
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.get('/products/:product', (req, res) => {
    try {
        const filepath = path.join(__dirname, 'product.html');
        if (fs.existsSync(filepath)) {
            res.send(fs.readFileSync(filepath, 'utf8'));
        } else {
            res.status(404).send('Product template not found on disk: ' + filepath);
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.get('/cart', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'cart.html'), 'utf8'));
});

const PORT = 5176;
app.listen(PORT, () => {
    console.log(`Bulletproof server running on http://localhost:${PORT}`);
});