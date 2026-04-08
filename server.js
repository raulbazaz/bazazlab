const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/case-studies', express.static(path.join(__dirname, 'case-studies')));
app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Explicit route for LexiWork case study
app.get('/case-studies/lexiwork.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'case-studies', 'lexiwork.html'));
});

app.listen(PORT, () => {
    console.log(`BazazLab website running at http://localhost:${PORT}`);
});
