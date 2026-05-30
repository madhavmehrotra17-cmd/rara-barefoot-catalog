const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Force disable all browser caching to allow instant hot reload during edits
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    console.log(`[HOMEPAGE REQUEST] ${req.method} ${req.url}`);
    next();
});

// Serve static assets from the current directory (disable default index.html serving)
app.use(express.static(__dirname, { index: false }));

// Explicit handler for product images and static assets to resolve spaces and encoding issues
app.get('/:filename', (req, res, next) => {
    const ext = path.extname(req.params.filename).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.mp4'].includes(ext)) {
        const decodedName = decodeURIComponent(req.params.filename);
        const filePath = path.join(__dirname, decodedName);
        if (fs.existsSync(filePath)) {
            return res.sendFile(filePath);
        }
    }
    next();
});

// Route for the custom homepage
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'homepage.html');
    if (fs.existsSync(filePath)) {
        res.send(fs.readFileSync(filePath, 'utf8'));
    } else {
        res.status(404).send('homepage.html not found. Please wait as we create it.');
    }
});

// Explicit Route for the Compare Page
app.get('/pages/compare', (req, res) => {
    const filePath = path.join(__dirname, 'compare.html');
    if (fs.existsSync(filePath)) {
        res.setHeader('Cache-Control', 'no-store');
        res.send(fs.readFileSync(filePath, 'utf8'));
    } else {
        res.status(404).send('compare.html is currently being built by the developer. Please refresh in a moment.');
    }
});

// Explicit Route for Scroll 1
app.get('/scroll1', (req, res) => {
    const filePath = path.join(__dirname, 'homepage.html');
    if (fs.existsSync(filePath)) {
        res.send(fs.readFileSync(filePath, 'utf8'));
    } else {
        res.status(404).send('homepage.html not found.');
    }
});

// Explicit Route for Scroll 3 (Community)
app.get('/scroll3', (req, res) => {
    const filePath = path.join(__dirname, 'homepage-scroll3.html');
    if (fs.existsSync(filePath)) {
        res.send(fs.readFileSync(filePath, 'utf8'));
    } else {
        res.status(404).send('homepage-scroll3.html not found.');
    }
});

// Cache-bypassing routes for preview
app.get('/fresh', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'homepage.html'), 'utf8'));
});

app.get('/preview', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'homepage.html'), 'utf8'));
});

const PORT = 5180;
app.listen(PORT, () => {
    console.log(`Homepage Server running on http://localhost:${PORT}`);
});
