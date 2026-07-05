# Diangou Diadia

Application web (PWA) pour apprendre l'arabe pas a pas (debutants complets, enfants et adultes).
Fonctionne hors-ligne et s'installe sur l'ecran d'accueil.

## Structure
- `index.html` — structure de l'application
- `styles.css` — styles (mode clair/sombre)
- `app.js` — donnees pedagogiques + moteur de lecons
- `manifest.json`, `sw.js`, `icons/`, `fonts/` — PWA (installation + hors-ligne, polices auto-hebergees)
- `build-single.js` — genere `dist/diangou-diadia.html`, version monofichier a partager par simple envoi

## Lancer en local
Ouvrir `index.html` dans un navigateur, ou :
```
npx serve .
```

## Version monofichier
```
node build-single.js
```
Ne jamais modifier `dist/diangou-diadia.html` a la main : modifier les sources puis relancer le script.

## Deployer sur Vercel
```
npx vercel
```
(ou glisser-deposer ce dossier sur vercel.com/new — c'est un site statique, aucune configuration requise)

A chaque deploiement, incrementer la constante `CACHE` dans `sw.js` pour que les PWA deja installees recuperent la mise a jour.

Created by @S.B from T.
