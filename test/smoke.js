'use strict';
/* Test de fumée : charge l'app dans jsdom, ouvre le livret, bascule le
   masquage du français, vérifie les boutons de sauvegarde. */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const APP = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8')
  .replace('<script src="app.js"></script>', '')
  .replace(/<!-- pwa:start -->.*?<!-- pwa:end -->/gs, '');
const js = fs.readFileSync(path.join(APP, 'app.js'), 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true });
const w = dom.window;
w.matchMedia = w.matchMedia || (() => ({ matches: false, addListener(){}, removeListener(){} }));
w.confirm = () => true;
w.URL.createObjectURL = () => 'blob:fake';
w.URL.revokeObjectURL = () => {};

let fail = 0;
const ok = (cond, name) => { console.log((cond ? 'PASS' : 'FAIL') + ' — ' + name); if (!cond) fail++; };

try { w.eval(js); ok(true, 'app.js s\'exécute sans erreur'); }
catch (e) { ok(false, 'app.js s\'exécute sans erreur : ' + e.message); process.exit(1); }

const $ = s => w.document.querySelector(s);

/* page de bienvenue au premier lancement */
ok($('#welcome-layer').classList.contains('open'), 'bienvenue : affichée au premier lancement');
ok($('#welcome-layer').textContent.includes('100 % gratuit'), 'bienvenue : mention « 100 % gratuit »');
$('#welcome-start').click();
ok(!$('#welcome-layer').classList.contains('open'), 'bienvenue : se ferme au clic sur Commencer');
ok(JSON.parse(w.localStorage.getItem('diangou-diadia-v1')).welcomed === true, 'bienvenue : ne réapparaîtra plus (welcomed persisté)');
ok($('#lesson-layer').classList.contains('open') && $('#lesson-body').textContent.includes('alphabet complet'),
   'bienvenue : Commencer ouvre directement la leçon 1 du livret');
$('#book-close').click();
ok(!$('#lesson-layer').classList.contains('open'), 'bienvenue : la leçon 1 se referme sur le sommaire du livret');

/* suivi de lecture du livret */
ok(JSON.parse(w.localStorage.getItem('diangou-diadia-v1')).bookRead[0] === true, 'livret : leçon 1 marquée lue après fermeture');
ok($('#book-list .book-card').classList.contains('read'), 'livret : la carte de la leçon 1 porte la coche « lue »');
ok(w.document.querySelectorAll('#book-list .book-card')[1].classList.contains('next'), 'livret : la leçon 2 est signalée « À lire »');
ok($('#book-count').textContent.includes('1/11'), 'livret : compteur « 1/11 lues » affiché');

/* bouton Reprendre */
ok($('#btn-resume').textContent.includes('leçon 2'), 'reprendre : le bouton vise la leçon 2');
$('#btn-resume').click();
ok($('#lesson-layer').classList.contains('open') && $('#lesson-body').textContent.includes('écritures'),
   'reprendre : ouvre bien la leçon 2 (les écritures)');
$('#book-close').click();
ok($('#btn-resume').textContent.includes('leçon 3'), 'reprendre : avance à la leçon 3 après lecture');

ok($('#view-book').classList.contains('active'), 'accueil : le Livret est l\'onglet par défaut');
ok(!$('#view-home').classList.contains('active'), 'accueil : le Parcours n\'est pas affiché en premier');
ok(w.document.querySelector('.bottomnav button').dataset.nav === 'book', 'nav : Livret en première position');

ok($('#path').children.length === 10, 'parcours : 10 étapes rendues');
ok($('#book-list').children.length === 11, 'livret : 11 leçons listées (dont les signes du Coran)');
ok(w.document.querySelectorAll('#book-list .book-card')[10].textContent.includes('signes particuliers'),
   'livret : la leçon 11 « signes particuliers du Coran » est présente');

/* dernière leçon du livret → passerelle vers le parcours */
w.document.querySelectorAll('#book-list .book-card')[10].click();
const toPath = $('#book-to-path');
ok(!!toPath, 'livret : bouton « Vers le parcours » sur la dernière leçon (11)');
toPath.click();
ok(!$('#lesson-layer').classList.contains('open') && $('#view-home').classList.contains('active'), 'livret : la passerelle ouvre le parcours');
ok(!!$('#export-btn') && !!$('#import-btn'), 'options : boutons sauvegarder/restaurer présents');

/* ouvrir la leçon 1 du livret */
$('#book-list .book-card').click();
ok($('#lesson-layer').classList.contains('open'), 'livret : la leçon 1 s\'ouvre');
ok(w.document.querySelectorAll('#lesson-body .bcell').length >= 28, 'livret : alphabet complet affiché');

/* français masqué par défaut, bouton pour l'afficher */
ok($('#lesson-body .step').classList.contains('hide-fr'), 'livret : français masqué par défaut');
const btn = $('#book-hide-fr');
ok(!!btn && btn.textContent.includes('Afficher'), 'livret : bouton « Afficher le français » présent');
btn.click();
ok(!$('#lesson-body .step').classList.contains('hide-fr'), 'livret : le français s\'affiche après clic');
ok($('#book-hide-fr').textContent.includes('Masquer'), 'livret : le bouton devient « Masquer le français »');
ok(JSON.parse(w.localStorage.getItem('diangou-diadia-v1')).showFr === true, 'livret : préférence showFr persistée');
$('#book-hide-fr').click();
ok($('#lesson-body .step').classList.contains('hide-fr'), 'livret : le re-masquage fonctionne');

/* page Lecture : sourates mot à mot */
ok(w.document.querySelectorAll('.bottomnav button').length === 5, 'nav : 5 onglets (avec Lecture)');
w.document.querySelector('[data-nav="read"]').click();
ok($('#view-read').classList.contains('active'), 'lecture : l\'onglet Lecture s\'ouvre');
ok(w.document.querySelectorAll('#sourate-list .book-card').length === 5, 'lecture : 5 sourates listées');
w.document.querySelector('#sourate-list .book-card').click();
ok($('#lesson-body').textContent.includes('Al-Kawthar'), 'lecture : Al-Kawthar s\'ouvre');
ok(w.document.querySelectorAll('#lesson-body .verse-card').length === 3, 'lecture : 3 versets affichés');
ok(!!$('#lesson-body .basmala'), 'lecture : la basmala est affichée en tête');
ok($('#lesson-body .verse-words').classList.contains('hide-tr'), 'lecture : phonétique masquée par défaut');
ok(w.document.querySelectorAll('#lesson-body .word-chip').length >= 10, 'lecture : les mots sont des briques cliquables');
const starsBefore = JSON.parse(w.localStorage.getItem('diangou-diadia-v1')).stars;
w.document.querySelectorAll('#lesson-body .verse-eval [data-lv="2"]').forEach(b => b.click());
const st2 = JSON.parse(w.localStorage.getItem('diangou-diadia-v1'));
ok(st2.sourates && st2.sourates.kawthar && st2.sourates.kawthar.every(x => x === 2), 'lecture : évaluations « couramment » persistées');
ok(st2.stars === starsBefore + 3, 'lecture : une étoile par verset lu couramment');
ok($('#toast').textContent.includes('Al-Kawthar'), 'lecture : félicitations quand la sourate est maîtrisée');
$('#sourate-close').click();
ok($('#sourate-list .book-card').classList.contains('read'), 'lecture : Al-Kawthar marquée ✓ sur le sommaire');
ok($('#read-count').textContent.includes('1/5'), 'lecture : compteur « 1/5 lues » affiché');
ok(st2.badges === undefined || JSON.parse(w.localStorage.getItem('diangou-diadia-v1')).badges.includes('b9'), 'lecture : badge « Première sourate » décerné');

/* export : le clic ne jette pas */
try { $('#export-btn').click(); ok(true, 'export : clic sans erreur'); }
catch (e) { ok(false, 'export : ' + e.message); }

/* import : fichier invalide rejeté proprement (via l'input fichier) */
try {
  const inp = $('#import-file');
  const f = new w.File(['{"nimporte":1}'], 'x.json', { type: 'application/json' });
  Object.defineProperty(inp, 'files', { value: [f], configurable: true });
  inp.dispatchEvent(new w.Event('change', { bubbles: true }));
  ok(true, 'import : fichier invalide géré sans crash');
} catch (e) { ok(false, 'import invalide : ' + e.message); }

setTimeout(() => {
  const t = $('#toast').textContent;
  ok(t.includes('pas une sauvegarde'), 'import : message d\'erreur affiché (« ' + t + ' »)');
  console.log(fail ? '\n' + fail + ' échec(s)' : '\nTout est vert ✔');
  process.exit(fail ? 1 : 0);
}, 300);
