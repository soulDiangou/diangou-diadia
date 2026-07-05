#!/usr/bin/env node
'use strict';
/* Régénère dist/diangou-diadia.html (version monofichier, partageable
   par simple envoi du fichier) à partir des sources du dossier.
   Usage : node build-single.js */
const fs = require('fs');
const path = require('path');

const APP = __dirname;
const OUT = path.join(__dirname, 'dist', 'diangou-diadia.html');
fs.mkdirSync(path.dirname(OUT), {recursive:true});

let html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(APP, 'styles.css'), 'utf8');
const js  = fs.readFileSync(path.join(APP, 'app.js'), 'utf8');

/* le monofichier garde les polices via le CDN Google (pas de dossier fonts/) */
html = html.replace(/<!-- pwa:fonts -->.*?<!-- \/pwa:fonts -->/s,
`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Manrope:wght@400;500;600;700;800&family=Noto+Naskh+Arabic:wght@400;500;700&display=swap" rel="stylesheet">`);

/* pas de manifest / service worker en monofichier */
html = html.replace(/\n?<!-- pwa:start -->.*?<!-- pwa:end -->/gs, '');

/* CSS et JS inlinés */
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + css + '</style>');
html = html.replace('<script src="app.js"></script>', '<script>\n' + js + '</script>');

if(/pwa:|styles\.css|app\.js"/.test(html)) throw new Error('transformation incomplète — marqueurs restants');
fs.writeFileSync(OUT, html);
console.log('OK →', OUT, '(' + html.length + ' octets)');
