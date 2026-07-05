'use strict';
/* ============================================================
   DONNÉES PÉDAGOGIQUES
   ============================================================ */
const LETTERS = [
 {ar:'ب',nom:'Bâ',son:'b',mot:'بَاب',fr:'porte',e:'🚪',c:1},
 {ar:'ت',nom:'Tâ',son:'t',mot:'تِين',fr:'figue',e:'🫐',c:1},
 {ar:'ث',nom:'Thâ',son:'th (anglais think)',mot:'ثَوْب',fr:'vêtement',e:'👕',c:1},
 {ar:'ن',nom:'Noûn',son:'n',mot:'نَهْر',fr:'rivière',e:'🏞️',c:1},
 {ar:'ج',nom:'Jîm',son:'dj',mot:'جَبَل',fr:'montagne',e:'⛰️',c:1},
 {ar:'ح',nom:'Hâ',son:'h soufflé (de la gorge)',mot:'حُوت',fr:'baleine',e:'🐋',c:1},
 {ar:'خ',nom:'Khâ',son:'kh (comme la jota)',mot:'خَرُوف',fr:'mouton',e:'🐑',c:1},
 {ar:'م',nom:'Mîm',son:'m',mot:'مَوْز',fr:'banane',e:'🍌',c:1},
 {ar:'د',nom:'Dâl',son:'d',mot:'دَار',fr:'maison',e:'🏠',c:0},
 {ar:'ذ',nom:'Dhâl',son:'dh (anglais this)',mot:'ذَهَب',fr:'or',e:'🥇',c:0},
 {ar:'ر',nom:'Râ',son:'r roulé',mot:'رَأْس',fr:'tête',e:'🙂',c:0},
 {ar:'ز',nom:'Zây',son:'z',mot:'زَهْرَة',fr:'fleur',e:'🌸',c:0},
 {ar:'س',nom:'Sîn',son:'s',mot:'سَمَاء',fr:'ciel',e:'☁️',c:1},
 {ar:'ش',nom:'Shîn',son:'ch',mot:'شَجَرَة',fr:'arbre',e:'🌳',c:1},
 {ar:'ص',nom:'Sâd',son:'s appuyé',mot:'صَابُون',fr:'savon',e:'🧼',c:1},
 {ar:'ض',nom:'Dâd',son:'d appuyé',mot:'ضَوْء',fr:'lumière',e:'💡',c:1},
 {ar:'ط',nom:'Tâ lourd',son:'t appuyé',mot:'طَبْل',fr:'tambour',e:'🥁',c:1},
 {ar:'ظ',nom:'Zâ lourd',son:'z appuyé',mot:'ظِلّ',fr:'ombre',e:'🌴',c:1},
 {ar:'ع',nom:'Aïn',son:'a profond (de la gorge)',mot:'عِنَب',fr:'raisin',e:'🍇',c:1},
 {ar:'غ',nom:'Ghaïn',son:'gh (r parisien)',mot:'غُرَاب',fr:'corbeau',e:'🐦‍⬛',c:1},
 {ar:'ف',nom:'Fâ',son:'f',mot:'فَرَاشَة',fr:'papillon',e:'🦋',c:1},
 {ar:'ق',nom:'Qâf',son:'q profond',mot:'قَمَر',fr:'lune',e:'🌙',c:1},
 {ar:'ك',nom:'Kâf',son:'k',mot:'كِتَاب',fr:'livre',e:'📖',c:1},
 {ar:'ل',nom:'Lâm',son:'l',mot:'لَيْل',fr:'nuit',e:'🌃',c:1},
 {ar:'ا',nom:'Alif',son:'â long',mot:'أَسَد',fr:'lion',e:'🦁',c:0},
 {ar:'ه',nom:'Hâ doux',son:'h léger',mot:'هَدِيَّة',fr:'cadeau',e:'🎁',c:1},
 {ar:'و',nom:'Wâw',son:'w / oû',mot:'وَرْد',fr:'roses',e:'🌹',c:0},
 {ar:'ي',nom:'Yâ',son:'y / î',mot:'يَد',fr:'main',e:'✋',c:1},
];
const L_BY_AR = Object.fromEntries(LETTERS.map(l=>[l.ar,l]));

/* groupes de découverte : lettres qui se ressemblent, apprises ensemble */
const GROUPS = [
 {titre:'La famille aux points', lettres:['ب','ت','ث','ن'], note:'Quatre lettres presque jumelles : seule la position des points change. C\'est le secret n°1 de l\'arabe : les points comptent !'},
 {titre:'Les courbes profondes', lettres:['ج','ح','خ','م'], note:'Trois grandes courbes jumelles (avec ou sans point) et le petit rond du Mîm.'},
 {titre:'Les petites voisines', lettres:['د','ذ','ر','ز'], note:'Deux paires : même dessin, avec ou sans point. Elles sont petites mais très fréquentes.'},
 {titre:'Les dentelées', lettres:['س','ش','ص','ض'], note:'Des vagues et des boucles. Un point ou trois points changent tout.'},
 {titre:'Les majestueuses', lettres:['ط','ظ','ع','غ'], note:'Les sons les plus typiques de l\'arabe. Écoute-les bien, ils n\'existent pas en français.'},
 {titre:'Les élégantes', lettres:['ف','ق','ك','ل'], note:'Des boucles fines et hautes. Fâ et Qâf sont jumelles : 1 point contre 2 points.'},
 {titre:'Les voyageuses', lettres:['ا','ه','و','ي'], note:'Les dernières ! Alif, Wâw et Yâ savent aussi allonger les sons — tu les retrouveras partout.'},
];

/* voyelles courtes et signes */
const HARAKAT = [
 {sym:'َ',nom:'Fatha',son:'a',desc:'Un petit trait AU-DESSUS de la lettre. Il donne le son « a ».',ex:[['بَ','ba'],['تَ','ta'],['سَ','sa'],['مَ','ma'],['دَ','da'],['لَ','la']]},
 {sym:'ُ',nom:'Damma',son:'ou',desc:'Une petite boucle AU-DESSUS de la lettre. Elle donne le son « ou ».',ex:[['بُ','bou'],['تُ','tou'],['سُ','sou'],['مُ','mou'],['نُ','nou'],['كُ','kou']]},
 {sym:'ِ',nom:'Kasra',son:'i',desc:'Un petit trait EN DESSOUS de la lettre. Il donne le son « i ».',ex:[['بِ','bi'],['تِ','ti'],['سِ','si'],['مِ','mi'],['لِ','li'],['رِ','ri']]},
 {sym:'ْ',nom:'Soukoun',son:'(stop)',desc:'Un petit rond au-dessus : la lettre s\'arrête net, sans voyelle. بْ = « b » tout seul.',ex:[['بَبْ','bab'],['مِنْ','min'],['كُنْ','koun'],['بَلْ','bal']]},
];

/* mots à assembler brique par brique (module 5) — sens de lecture : droite → gauche */
const BUILD_WORDS = [
 {parts:['بَ','ا','ب'],word:'بَاب',tr:'bâb',fr:'porte',e:'🚪'},
 {parts:['قَ','مَ','ر'],word:'قَمَر',tr:'qamar',fr:'lune',e:'🌙'},
 {parts:['جَ','بَ','ل'],word:'جَبَل',tr:'jabal',fr:'montagne',e:'⛰️'},
 {parts:['وَ','لَ','د'],word:'وَلَد',tr:'walad',fr:'garçon',e:'👦'},
 {parts:['كِ','تَ','ا','ب'],word:'كِتَاب',tr:'kitâb',fr:'livre',e:'📖'},
 {parts:['نُ','و','ر'],word:'نُور',tr:'noûr',fr:'lumière',e:'✨'},
 {parts:['سُ','و','ق'],word:'سُوق',tr:'soûq',fr:'marché',e:'🛒'},
 {parts:['دِ','ي','ك'],word:'دِيك',tr:'dîk',fr:'coq',e:'🐓'},
];

/* syllabes pour la lecture (module 5) */
const SYLL = [
 ['بَ','ba'],['بُ','bou'],['بِ','bi'],['تَ','ta'],['مُ','mou'],['سِ','si'],
 ['لَ','la'],['نُ','nou'],['رِ','ri'],['كَ','ka'],['دُ','dou'],['فِ','fi'],
 ['قَ','qa'],['شُ','chou'],['جِ','ji'],['حَ','ha'],['عَ','ʿa'],['طُ','tou'],
];

/* vocabulaire par thème (module 6) */
const VOCAB = [
 {id:'famille',titre:'La famille',e:'👪',items:[
   {ar:'أَب',tr:'ab',fr:'papa',e:'👨'},
   {ar:'أُمّ',tr:'oumm',fr:'maman',e:'👩'},
   {ar:'أَخ',tr:'akh',fr:'frère',e:'👦'},
   {ar:'أُخْت',tr:'oukht',fr:'sœur',e:'👧'},
   {ar:'بِنْت',tr:'bint',fr:'fille',e:'🧒'},
   {ar:'وَلَد',tr:'walad',fr:'garçon',e:'👶'},
 ]},
 {id:'nombres',titre:'Les nombres',e:'🔢',items:[
   {ar:'وَاحِد',tr:'wâhid',fr:'un (1)',e:'1️⃣'},
   {ar:'اِثْنَان',tr:'ithnân',fr:'deux (2)',e:'2️⃣'},
   {ar:'ثَلَاثَة',tr:'thalâtha',fr:'trois (3)',e:'3️⃣'},
   {ar:'أَرْبَعَة',tr:'arbaʿa',fr:'quatre (4)',e:'4️⃣'},
   {ar:'خَمْسَة',tr:'khamsa',fr:'cinq (5)',e:'5️⃣'},
 ]},
 {id:'couleurs',titre:'Les couleurs',e:'🎨',items:[
   {ar:'أَحْمَر',tr:'ahmar',fr:'rouge',e:'🔴'},
   {ar:'أَزْرَق',tr:'azraq',fr:'bleu',e:'🔵'},
   {ar:'أَخْضَر',tr:'akhdar',fr:'vert',e:'🟢'},
   {ar:'أَصْفَر',tr:'asfar',fr:'jaune',e:'🟡'},
   {ar:'أَبْيَض',tr:'abyad',fr:'blanc',e:'⚪'},
 ]},
 {id:'animaux',titre:'Les animaux',e:'🐾',items:[
   {ar:'قِطّ',tr:'qitt',fr:'chat',e:'🐱'},
   {ar:'كَلْب',tr:'kalb',fr:'chien',e:'🐶'},
   {ar:'حِصَان',tr:'hisân',fr:'cheval',e:'🐴'},
   {ar:'سَمَك',tr:'samak',fr:'poisson',e:'🐟'},
   {ar:'أَسَد',tr:'asad',fr:'lion',e:'🦁'},
 ]},
 {id:'nourriture',titre:'La nourriture',e:'🍽️',items:[
   {ar:'مَاء',tr:'mâ',fr:'eau',e:'💧'},
   {ar:'خُبْز',tr:'khoubz',fr:'pain',e:'🍞'},
   {ar:'حَلِيب',tr:'halîb',fr:'lait',e:'🥛'},
   {ar:'تُفَّاح',tr:'touffâh',fr:'pomme',e:'🍎'},
   {ar:'عَسَل',tr:'ʿasal',fr:'miel',e:'🍯'},
 ]},
];
const VOCAB_ALL = VOCAB.flatMap(c=>c.items);

/* phrases courtes (module 7) — mots dans l'ordre arabe (droite→gauche à l'affichage) */
const PHRASES = [
 {mots:['هَذَا','بَاب'],ar:'هَذَا بَاب',tr:'hâdhâ bâb',fr:'Ceci est une porte.',e:'🚪'},
 {mots:['هَذَا','كِتَاب'],ar:'هَذَا كِتَاب',tr:'hâdhâ kitâb',fr:'Ceci est un livre.',e:'📖'},
 {mots:['هَذِهِ','بِنْت'],ar:'هَذِهِ بِنْت',tr:'hâdhihi bint',fr:'Voici une fille.',e:'🧒'},
 {mots:['اَلْقِطُّ','صَغِير'],ar:'اَلْقِطُّ صَغِير',tr:'al-qittou saghîr',fr:'Le chat est petit.',e:'🐱'},
 {mots:['اَلْبَيْتُ','كَبِير'],ar:'اَلْبَيْتُ كَبِير',tr:'al-baytou kabîr',fr:'La maison est grande.',e:'🏠'},
 {mots:['أُحِبُّ','اَلْحَلِيب'],ar:'أُحِبُّ اَلْحَلِيب',tr:'ouhibbou al-halîb',fr:'J\'aime le lait.',e:'🥛'},
 {mots:['اَلْمَاءُ','بَارِد'],ar:'اَلْمَاءُ بَارِد',tr:'al-mâou bârid',fr:'L\'eau est froide.',e:'🧊'},
 {mots:['عِنْدِي','كَلْب'],ar:'عِنْدِي كَلْب',tr:'ʿindî kalb',fr:'J\'ai un chien.',e:'🐶'},
];

/* dialogues (module 8) */
const DIALOGUES = [
 {titre:'Dire bonjour',e:'👋',lignes:[
   {who:'a',ar:'السَّلَامُ عَلَيْكُم',tr:'as-salâmou ʿalaykoum',fr:'Bonjour (que la paix soit sur toi)'},
   {who:'b',ar:'وَعَلَيْكُمُ السَّلَام',tr:'wa ʿalaykoumou s-salâm',fr:'Bonjour à toi aussi'},
   {who:'a',ar:'كَيْفَ حَالُكَ؟',tr:'kayfa hâlouka ?',fr:'Comment vas-tu ?'},
   {who:'b',ar:'بِخَيْر، شُكْرًا',tr:'bikhayr, choukran',fr:'Bien, merci'},
 ]},
 {titre:'Se présenter',e:'🙋',lignes:[
   {who:'a',ar:'مَا اسْمُكَ؟',tr:'mâ ismouka ?',fr:'Comment t\'appelles-tu ?'},
   {who:'b',ar:'اِسْمِي آدَم',tr:'ismî Âdam',fr:'Je m\'appelle Adam'},
   {who:'a',ar:'مِنْ أَيْنَ أَنْتَ؟',tr:'min ayna anta ?',fr:'D\'où viens-tu ?'},
   {who:'b',ar:'أَنَا مِنْ فَرَنْسَا',tr:'anâ min Faransâ',fr:'Je viens de France'},
 ]},
 {titre:'Merci et au revoir',e:'🙏',lignes:[
   {who:'a',ar:'شُكْرًا جَزِيلًا',tr:'choukran jazîlan',fr:'Merci beaucoup'},
   {who:'b',ar:'عَفْوًا',tr:'ʿafwan',fr:'De rien'},
   {who:'a',ar:'مَعَ السَّلَامَة',tr:'maʿa s-salâma',fr:'Au revoir'},
   {who:'b',ar:'إِلَى اللِّقَاء',tr:'ilâ l-liqâ',fr:'À bientôt'},
 ]},
];

/* badges */
const BADGES = [
 {id:'b1',nom:'Premier pas',e:'🌱',test:p=>p.stars>=2},
 {id:'b2',nom:'Alphabet vu',e:'🔤',test:p=>p.mods[0]&&p.mods[0].passed},
 {id:'b3',nom:'Œil de lynx',e:'👀',test:p=>p.mods[1]&&p.mods[1].passed},
 {id:'b4',nom:'Oreille d\'or',e:'🎧',test:p=>p.mods[2]&&p.mods[2].passed},
 {id:'b5',nom:'Calligraphe',e:'✍️',test:p=>p.mods[3]&&p.mods[3].passed},
 {id:'b6',nom:'Lecteur',e:'📖',test:p=>p.mods[4]&&p.mods[4].passed},
 {id:'b7',nom:'Série de 3 jours',e:'🔥',test:p=>p.streak>=3},
 {id:'b8',nom:'Diplômé',e:'🏆',test:p=>p.mods[9]&&p.mods[9].passed},
];
/* ============================================================
   ÉTAT & PERSISTANCE
   ============================================================ */
const DKEY = 'diangou-diadia-v1';
const DEFAULT_P = {
  stars:0, streak:0, last:null, theme:null, name:'', force:false, showFr:false, welcomed:false,
  mods: Array.from({length:10},()=>({done:[], passed:false, best:0})),
  rq:[], reviewCount:0, badges:[]
};
let P = JSON.parse(JSON.stringify(DEFAULT_P));
function save(){ try{ localStorage.setItem(DKEY, JSON.stringify(P)); }catch(e){} }
function load(){
  try{
    const raw = localStorage.getItem(DKEY);
    if(raw){ P = Object.assign(JSON.parse(JSON.stringify(DEFAULT_P)), JSON.parse(raw)); }
  }catch(e){}
  const today = new Date().toISOString().slice(0,10);
  if(P.last !== today){
    if(P.last){
      const diff = (new Date(today) - new Date(P.last))/86400000;
      P.streak = diff===1 ? P.streak+1 : 1;
    } else P.streak = 1;
    P.last = today;
  }
  save();
}

/* sauvegarde / restauration de la progression (fichier JSON) */
function exportProgress(){
  const payload = {app:'diangou-diadia', version:1, date:new Date().toISOString(), data:P};
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'diangou-diadia-progression-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 5000);
  toast('💾 Fichier de sauvegarde téléchargé — garde-le précieusement !');
}
function importProgress(file){
  const rd = new FileReader();
  rd.onload = ()=>{
    try{
      const obj = JSON.parse(rd.result);
      if(obj.app!=='diangou-diadia' || !obj.data || !Array.isArray(obj.data.mods)) throw 0;
      if(!confirm('Remplacer la progression actuelle par celle du fichier ('+(obj.date||'date inconnue').slice(0,10)+') ?')) return;
      P = Object.assign(JSON.parse(JSON.stringify(DEFAULT_P)), obj.data);
      save(); applyTheme(); renderAll();
      toast('📥 Progression restaurée — content de te revoir !');
    }catch(e){ toast('❌ Ce fichier n\'est pas une sauvegarde Diangou Diadia.'); }
  };
  rd.readAsText(file);
}

/* ============================================================
   THÈME clair / sombre
   ============================================================ */
function applyTheme(){
  const pref = P.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light');
  document.documentElement.dataset.theme = pref;
  document.getElementById('theme-btn').textContent = pref==='dark' ? '☀️' : '🌙';
}
document.getElementById('theme-btn').addEventListener('click', ()=>{
  const cur = document.documentElement.dataset.theme;
  P.theme = cur==='dark' ? 'light' : 'dark';
  save(); applyTheme();
});

/* ============================================================
   AUDIO — synthèse vocale arabe
   ============================================================ */
let voiceAr = null, voicesReady = false, audioWarned = false;
function pickVoice(){
  const vs = speechSynthesis.getVoices();
  if(vs.length) voicesReady = true;
  voiceAr = vs.find(v=>/^ar/i.test(v.lang)) || null;
}
if('speechSynthesis' in window){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(txt, rate=0.72){
  if(!('speechSynthesis' in window)) return toast('🔇 Audio non disponible sur cet appareil — appuie-toi sur la prononciation écrite', 5000);
  if(!voiceAr) pickVoice();
  if(voicesReady && !voiceAr && !audioWarned){
    audioWarned = true;
    toast('🔇 Aucune voix arabe trouvée sur cet appareil. Ajoute-en une dans les réglages (Accessibilité → Synthèse vocale) — en attendant, suis la prononciation écrite.', 7000);
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(txt);
  u.lang='ar-SA'; u.rate=rate; u.pitch=1;
  if(voiceAr) u.voice = voiceAr;
  speechSynthesis.speak(u);
}

/* ============================================================
   OUTILS
   ============================================================ */
const $ = s=>document.querySelector(s);
const shuffle = a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
const sample = (a,n)=>shuffle([...a]).slice(0,n);
const esc = s=>String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function toast(msg, ms=2400){
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(t._x); t._x = setTimeout(()=>t.classList.remove('show'), ms);
}
function confetti(){
  const w = document.createElement('div'); w.className='confetti';
  const em = ['✨','⭐','🎉','💫','🌟'];
  for(let i=0;i<20;i++){
    const s = document.createElement('span');
    s.textContent = em[i%em.length];
    s.style.left = Math.random()*100+'%';
    s.style.animationDelay = Math.random()*0.5+'s';
    w.appendChild(s);
  }
  document.body.appendChild(w); setTimeout(()=>w.remove(),2100);
}
function addStars(n){
  P.stars += n; checkBadges(); save(); renderHUD();
}
function checkBadges(){
  BADGES.forEach(b=>{
    if(!P.badges.includes(b.id) && b.test(P)){
      P.badges.push(b.id);
      toast('🏅 Badge gagné : '+b.nom+' !'); confetti();
    }
  });
}

/* file de révision : on mémorise ce qui a été raté */
function pushReview(bank, key){
  if(!P.rq.some(r=>r.bank===bank && r.key===key)) P.rq.push({bank,key});
  if(P.rq.length>40) P.rq.shift();
  save();
}

/* ============================================================
   GÉNÉRATEURS DE QUESTIONS (partagés leçons / quiz / révision / examen)
   ============================================================ */
/* Touche la lettre <nom> (avec audio) */
function qLetter(l, pool){
  const others = sample((pool||LETTERS).filter(x=>x.ar!==l.ar), 3);
  const opts = shuffle([l, ...others]);
  return {k:'qcm', q:'Écoute, puis touche la lettre « '+l.nom+' »',
    say:l.ar, prompt:null, opts:opts.map(o=>({ar:o.ar})), ans:opts.indexOf(l),
    good:l.nom+' = '+l.ar+' — son « '+l.son+' »', bank:'letter', key:l.ar};
}
/* Quel est le nom de cette lettre ? */
function qLetterName(l, pool){
  const others = sample((pool||LETTERS).filter(x=>x.ar!==l.ar), 3);
  const opts = shuffle([l, ...others]);
  return {k:'qcm', q:'Comment s\'appelle cette lettre ?',
    say:l.ar, prompt:{ar:l.ar}, opts:opts.map(o=>({txt:o.nom})), ans:opts.indexOf(l),
    good:l.ar+' = '+l.nom, bank:'letter', key:l.ar};
}
/* Lis la syllabe */
function qSyll(s){
  const others = sample(SYLL.filter(x=>x[1]!==s[1]), 3);
  const opts = shuffle([s, ...others]);
  return {k:'qcm', q:'Lis cette syllabe. Comment se prononce-t-elle ?',
    say:s[0], prompt:{ar:s[0]}, opts:opts.map(o=>({txt:o[1]})), ans:opts.indexOf(s),
    good:s[0]+' se lit « '+s[1]+' »', bank:'syll', key:s[0]};
}
/* Image → mot arabe */
function qVocab(v){
  const others = sample(VOCAB_ALL.filter(x=>x.ar!==v.ar), 3);
  const opts = shuffle([v, ...others]);
  return {k:'qcm', q:'Quel mot correspond à l\'image ?',
    prompt:{e:v.e}, opts:opts.map(o=>({ar:o.ar})), ans:opts.indexOf(v), sayAfter:v.ar,
    good:v.ar+' ('+v.tr+') = '+v.fr, bank:'vocab', key:v.ar, optSize:'mid'};
}
/* Mot arabe → sens */
function qVocabFr(v){
  const others = sample(VOCAB_ALL.filter(x=>x.fr!==v.fr), 3);
  const opts = shuffle([v, ...others]);
  return {k:'qcm', q:'Que veut dire ce mot ?',
    say:v.ar, prompt:{ar:v.ar}, opts:opts.map(o=>({txt:o.e+' '+o.fr})), ans:opts.indexOf(v),
    good:v.ar+' ('+v.tr+') = '+v.fr, bank:'vocab', key:v.ar};
}
/* Phrase → sens */
function qPhrase(ph){
  const others = sample(PHRASES.filter(x=>x.fr!==ph.fr), 2);
  const opts = shuffle([ph, ...others]);
  return {k:'qcm', q:'Que veut dire cette phrase ?',
    say:ph.ar, prompt:{ar:ph.ar, small:1}, opts:opts.map(o=>({txt:o.e+' '+o.fr})), ans:opts.indexOf(ph),
    good:ph.ar+' = '+ph.fr, bank:'phrase', key:ph.ar, single:1};
}
/* Bonne réplique de dialogue */
function qReply(d, i){
  const line = d.lignes[i], reply = d.lignes[i+1];
  const others = sample(DIALOGUES.flatMap(x=>x.lignes).filter(l=>l.ar!==reply.ar && l.ar!==line.ar), 2);
  const opts = shuffle([reply, ...others]);
  return {k:'qcm', q:'On te dit : « '+line.fr+' ». Que réponds-tu ?',
    say:line.ar, prompt:{ar:line.ar, small:1}, opts:opts.map(o=>({txt:o.tr+' — '+o.fr})), ans:opts.indexOf(reply),
    good:reply.ar+' ('+reply.tr+')', bank:'dial', key:reply.ar, single:1};
}
/* Trouve toutes les lettres X */
function qHunt(l, distractors){
  const tiles = shuffle([l.ar,l.ar,l.ar, ...sample(distractors.filter(a=>a!==l.ar), 5)]);
  return {k:'hunt', q:'Touche TOUTES les lettres « '+l.nom+' » ('+l.ar+')', target:l.ar, tiles,
    bank:'letter', key:l.ar};
}
/* Assemble un mot brique par brique */
function qBuild(w){
  return {k:'build', q:'Assemble le mot « '+w.fr+' » '+w.e+' — en arabe on lit de DROITE à GAUCHE', w,
    bank:'build', key:w.word};
}
/* Remets la phrase dans l'ordre */
function qOrder(ph){
  return {k:'order', q:'Remets la phrase dans l\'ordre : « '+ph.fr+' »', ph,
    bank:'phrase', key:ph.ar};
}
/* Traçage d'une lettre */
function qTrace(l){
  return {k:'trace', q:'Trace la lettre « '+l.nom+' » avec ton doigt ou ta souris', l};
}
/* Écoute et répète */
function qSpeak(line){
  return {k:'speak', q:'Écoute, puis répète à voix haute', line};
}

/* ============================================================
   LES 10 MODULES
   Chaque leçon = suite d'étapes {t:...}. Rituel :
   goal → explication/exemples → exercices corrigés → recap.
   ============================================================ */
function lettersOf(g){ return g.lettres.map(a=>L_BY_AR[a]); }
function groupPool(gi){ return GROUPS.slice(0, gi+1).flatMap(lettersOf); }

const MODULES = [
{ icon:'🔤', titre:'Découvrir les lettres', desc:'28 lettres, 7 leçons douces',
  lessons: GROUPS.map((g,gi)=>()=>{
    const ls = lettersOf(g);
    const steps = [
      {t:'goal', title:'Leçon '+(gi+1)+' — '+g.titre, text:'Objectif : découvrir 4 nouvelles lettres. '+g.note}
    ];
    ls.forEach(l=>steps.push({t:'teach', l}));
    ls.forEach(l=>steps.push({t:'ex', ex:qLetter(l, ls)}));
    steps.push({t:'recap', title:'Bravo, 4 lettres de plus !',
      text:'Tu viens de rencontrer '+ls.map(x=>x.nom).join(', ')+'. À la prochaine leçon, de nouveaux visages — et bientôt, tu sauras les reconnaître partout.'});
    return steps;
  }),
  quiz: ()=>sample(LETTERS,8).map(l=>({t:'ex', ex: Math.random()<0.5 ? qLetter(l) : qLetterName(l)}))
},
{ icon:'👀', titre:'Reconnaître les lettres', desc:'Les jumelles et leurs points',
  lessons: [
    ()=>{
      const g=['ب','ت','ث','ن'];
      return [
        {t:'goal', title:'Les points font la lettre', text:'Objectif : ne plus confondre les lettres jumelles. Même corps, points différents = lettres différentes !'},
        {t:'rule', title:'Regarde bien 👇', text:'ب a 1 point EN DESSOUS. ت a 2 points AU-DESSUS. ث a 3 points AU-DESSUS. ن a 1 point AU-DESSUS.',
         ex:[['ب','Bâ'],['ت','Tâ'],['ث','Thâ'],['ن','Noûn']]},
        {t:'ex', ex:qHunt(L_BY_AR['ب'], g)},
        {t:'ex', ex:qHunt(L_BY_AR['ت'], g)},
        {t:'ex', ex:qLetterName(L_BY_AR['ث'], g.map(a=>L_BY_AR[a]))},
        {t:'ex', ex:qLetterName(L_BY_AR['ن'], g.map(a=>L_BY_AR[a]))},
        {t:'recap', title:'Œil aiguisé !', text:'Tu sais maintenant lire les points. Prochaine leçon : les grandes courbes ج ح خ.'}
      ];
    },
    ()=>{
      const g=['ج','ح','خ','د','ذ','ر','ز'];
      return [
        {t:'goal', title:'Courbes et petites sœurs', text:'Objectif : distinguer ج ح خ (grandes courbes) et د ذ ر ز (petites paires).'},
        {t:'rule', title:'Le point change tout', text:'ح est nue. ج a un point DEDANS. خ a un point AU-DESSUS. Et د/ذ, ر/ز : sans point / avec point.',
         ex:[['ح','Hâ'],['ج','Jîm'],['خ','Khâ'],['د','Dâl'],['ذ','Dhâl'],['ر','Râ'],['ز','Zây']]},
        {t:'ex', ex:qHunt(L_BY_AR['ج'], ['ج','ح','خ'])},
        {t:'ex', ex:qHunt(L_BY_AR['ر'], ['ر','ز','د','ذ'])},
        {t:'ex', ex:qLetterName(L_BY_AR['خ'], g.map(a=>L_BY_AR[a]))},
        {t:'ex', ex:qLetterName(L_BY_AR['ذ'], g.map(a=>L_BY_AR[a]))},
        {t:'recap', title:'De mieux en mieux !', text:'7 lettres jumelles domptées. La suite : les dentelées س ش ص ض.'}
      ];
    },
    ()=>{
      const g=['س','ش','ص','ض','ط','ظ'];
      return [
        {t:'goal', title:'Vagues et boucles', text:'Objectif : reconnaître les dentelées س ش, les rondes ص ض et les hautes ط ظ.'},
        {t:'rule', title:'Trois familles', text:'س (nue) / ش (3 points). ص (nue) / ض (1 point). ط (nue) / ظ (1 point).',
         ex:[['س','Sîn'],['ش','Shîn'],['ص','Sâd'],['ض','Dâd'],['ط','Tâ lourd'],['ظ','Zâ lourd']]},
        {t:'ex', ex:qHunt(L_BY_AR['ش'], ['س','ش','ص','ض'])},
        {t:'ex', ex:qLetterName(L_BY_AR['ص'], g.map(a=>L_BY_AR[a]))},
        {t:'ex', ex:qLetterName(L_BY_AR['ط'], g.map(a=>L_BY_AR[a]))},
        {t:'ex', ex:qHunt(L_BY_AR['ظ'], ['ط','ظ','ص','ض'])},
        {t:'recap', title:'Rien ne t\'échappe !', text:'Dernière ligne droite : ع غ ف ق et les voyageuses.'}
      ];
    },
    ()=>{
      const g=['ع','غ','ف','ق','ه','و','ي','ا'];
      return [
        {t:'goal', title:'Les dernières jumelles', text:'Objectif : finir le tour complet de l\'alphabet, sans confusion possible.'},
        {t:'rule', title:'Souviens-toi', text:'ع (nue) / غ (1 point). ف (1 point) / ق (2 points + boucle plus ronde). Et les voyageuses ا ه و ي.',
         ex:[['ع','Aïn'],['غ','Ghaïn'],['ف','Fâ'],['ق','Qâf'],['ه','Hâ doux'],['و','Wâw'],['ي','Yâ'],['ا','Alif']]},
        {t:'ex', ex:qHunt(L_BY_AR['غ'], ['ع','غ'])},
        {t:'ex', ex:qHunt(L_BY_AR['ق'], ['ف','ق'])},
        {t:'ex', ex:qLetterName(L_BY_AR['و'], g.map(a=>L_BY_AR[a]))},
        {t:'ex', ex:qLetterName(L_BY_AR['ه'], g.map(a=>L_BY_AR[a]))},
        {t:'recap', title:'Alphabet maîtrisé à l\'œil !', text:'Ton regard ne se trompe plus. Place au quiz de passage, puis... aux sons !'}
      ];
    },
  ],
  quiz: ()=>sample(LETTERS,8).map(l=>({t:'ex', ex: Math.random()<0.4 ? qHunt(l, LETTERS.map(x=>x.ar)) : qLetterName(l)}))
},
{ icon:'🎧', titre:'Associer lettre et son', desc:'Ton oreille devient arabe',
  lessons: [0,1,2].map(part=>()=>{
    const gs = part===0 ? GROUPS.slice(0,3) : part===1 ? GROUPS.slice(3,5) : GROUPS.slice(5,7);
    const ls = gs.flatMap(lettersOf);
    const steps = [
      {t:'goal', title:'Écoute et devine', text:'Objectif : reconnaître une lettre juste en l\'entendant. Appuie sur 🔊 autant de fois que tu veux — l\'oreille apprend en répétant.'}
    ];
    sample(ls, Math.min(6, ls.length)).forEach(l=>steps.push({t:'ex', ex:qLetter(l, ls)}));
    steps.push({t:'recap', title:'Ton oreille progresse !', text:'Les sons arabes deviennent familiers. Continue, la magie opère à force d\'écoute.'});
    return steps;
  }),
  quiz: ()=>sample(LETTERS,8).map(l=>({t:'ex', ex:qLetter(l)}))
},
{ icon:'✍️', titre:'Écrire les lettres', desc:'Trace, encore et encore',
  lessons: [
    {list:['ا','ب','ت','ن'], forms:'ب'},
    {list:['م','س','د','ر'], forms:'س'},
    {list:['ح','ج','ع','ل'], forms:'ع'},
    {list:['ف','ق','ك','ي'], forms:'ك'},
  ].map((cfg,ci)=>()=>{
    const steps = [
      {t:'goal', title:'À toi le stylo !', text:'Objectif : tracer 4 lettres. En arabe on écrit de DROITE à GAUCHE. Suis le modèle gris, recommence autant que tu veux.'},
      {t:'forms', l:L_BY_AR[cfg.forms]}
    ];
    cfg.list.forEach(a=>steps.push({t:'ex', ex:qTrace(L_BY_AR[a])}));
    steps.push({t:'ex', ex:qFormPick(L_BY_AR[cfg.forms])});
    steps.push({t:'recap', title:'Belle plume !', text:'Écrire aide ta mémoire : ta main apprend en même temps que tes yeux.'});
    return steps;
  }),
  quiz: ()=>sample(LETTERS.filter(l=>l.c),6).map(l=>({t:'ex', ex:qFormPick(l)}))
},
{ icon:'🧩', titre:'Lire des syllabes', desc:'Le déclic de la lecture',
  lessons: [
    ...HARAKAT.map((h,hi)=>()=>{
      const steps = [
        {t:'goal', title:h.nom+' — le son « '+h.son+' »', text:'Objectif : lire tes premières syllabes. Une lettre + '+h.nom+' = un son. C\'est LE déclic de la lecture !'},
        {t:'rule', title:h.nom+'  '+('بتسم'[0]+h.sym), text:h.desc, ex:h.ex, say:1}
      ];
      sample(h.ex,4).forEach(s=>steps.push({t:'ex', ex:qSyllOf(s, h)}));
      steps.push({t:'recap', title:'Tu LIS de l\'arabe !', text:hi<HARAKAT.length-1 ? 'Prochaine voyelle : '+HARAKAT[hi+1].nom+'. Chaque signe appris = des centaines de mots lisibles.' : 'Toutes les voyelles courtes sont à toi. Place aux mots entiers !'});
      return steps;
    }),
    ()=>{
      const ws = sample(BUILD_WORDS, 4);
      return [
        {t:'goal', title:'Assembler des mots entiers', text:'Objectif : lire un vrai mot en collant les syllabes comme des briques, de droite à gauche. Exactement comme un puzzle.'},
        {t:'ex', ex:qBuild(ws[0])},
        {t:'ex', ex:qBuild(ws[1])},
        {t:'ex', ex:qBuild(ws[2])},
        {t:'ex', ex:qBuild(ws[3])},
        {t:'recap', title:'Tu lis des MOTS !', text:'بَاب، قَمَر، كِتَاب... Ce ne sont plus des dessins, ce sont des mots que TU lis. Quiz de passage, puis le vocabulaire t\'attend.'}
      ];
    }
  ],
  quiz: ()=>[
    ...sample(SYLL,5).map(s=>({t:'ex', ex:qSyll(s)})),
    ...sample(BUILD_WORDS,3).map(w=>({t:'ex', ex:qBuild(w)}))
  ]
},
{ icon:'🖼️', titre:'Comprendre des mots', desc:'5 thèmes du quotidien',
  lessons: VOCAB.map(cat=>()=>{
    const steps = [
      {t:'goal', title:cat.e+' '+cat.titre, text:'Objectif : '+cat.items.length+' mots de tous les jours. Écoute-les, lis-les — tu en es capable maintenant !'},
      {t:'words', cat}
    ];
    sample(cat.items, 3).forEach(v=>steps.push({t:'ex', ex:qVocab(v)}));
    sample(cat.items, 2).forEach(v=>steps.push({t:'ex', ex:qVocabFr(v)}));
    steps.push({t:'recap', title:'Ton sac de mots se remplit !', text:'Ces mots reviendront dans tes révisions — c\'est en les recroisant qu\'ils resteront.'});
    return steps;
  }),
  quiz: ()=>sample(VOCAB_ALL,8).map(v=>({t:'ex', ex: Math.random()<0.5 ? qVocab(v) : qVocabFr(v)}))
},
{ icon:'💬', titre:'Petites phrases', desc:'2 mots suffisent pour parler',
  lessons: [PHRASES.slice(0,3), PHRASES.slice(3,6), PHRASES.slice(6,8)].map((chunk,ci)=>()=>{
    const steps = [
      {t:'goal', title:'Tes premières phrases', text:'Objectif : comprendre et construire des phrases de 2 mots. En arabe, pas besoin du verbe « être » : هَذَا بَاب = « ceci (est) une porte ».'}
    ];
    chunk.forEach(ph=>steps.push({t:'phrase', ph}));
    chunk.forEach(ph=>steps.push({t:'ex', ex: Math.random()<0.5 ? qPhrase(ph) : qOrder(ph)}));
    steps.push({t:'recap', title:'Tu fais des phrases !', text:'Deux mots + ton vocabulaire = des dizaines de phrases possibles. La parole arrive juste après.'});
    return steps;
  }),
  quiz: ()=>sample(PHRASES,6).map(ph=>({t:'ex', ex: Math.random()<0.5 ? qPhrase(ph) : qOrder(ph)}))
},
{ icon:'🗣️', titre:'Parler', desc:'Tes premiers échanges',
  lessons: DIALOGUES.map((d,di)=>()=>{
    const steps = [
      {t:'goal', title:d.e+' '+d.titre, text:'Objectif : tenir ce mini-dialogue à voix haute. Écoute chaque phrase, répète-la fort — même seul(e), c\'est comme ça qu\'on ose parler.'}
    ];
    d.lignes.forEach(line=>steps.push({t:'ex', ex:qSpeak(line)}));
    steps.push({t:'ex', ex:qReply(d, 0)});
    if(d.lignes.length>3) steps.push({t:'ex', ex:qReply(d, 2)});
    steps.push({t:'recap', title:'Tu as parlé arabe !', text:'Rejoue ce dialogue avec quelqu\'un autour de toi. La prochaine fois, tu répondras sans réfléchir.'});
    return steps;
  }),
  quiz: ()=>{
    const qs=[];
    DIALOGUES.forEach(d=>{ qs.push({t:'ex', ex:qReply(d,0)}); if(d.lignes.length>3) qs.push({t:'ex', ex:qReply(d,2)}); });
    return sample(qs, Math.min(6, qs.length));
  }
},
{ icon:'🔁', titre:'Réviser', desc:'La boîte à souvenirs', review:true },
{ icon:'🏆', titre:'Valider — grand examen', desc:'Tout ce que tu sais, mélangé', exam:true },
];

/* choisir la bonne forme d'une lettre selon sa place */
function qFormPick(l){
  const places = [
    {lbl:'au DÉBUT d\'un mot', form:l.ar+'ـ'},
    {lbl:'au MILIEU d\'un mot', form:'ـ'+l.ar+'ـ'},
    {lbl:'à la FIN d\'un mot', form:'ـ'+l.ar},
  ];
  const pick = places[Math.floor(Math.random()*places.length)];
  const opts = shuffle(places.map(p=>({ar:p.form})));
  return {k:'qcm', q:'Quelle est la forme de « '+l.nom+' » ('+l.ar+') '+pick.lbl+' ?',
    prompt:{ar:l.ar}, opts, ans:opts.findIndex(o=>o.ar===pick.form),
    good:pick.form+' = '+l.nom+' '+pick.lbl, bank:'letter', key:l.ar};
}
/* syllabe d'une leçon voyelle */
function qSyllOf(s, h){
  const others = sample(h.ex.filter(x=>x[1]!==s[1]).concat(sample(SYLL,2)), 3);
  const opts = shuffle([s, ...others]);
  return {k:'qcm', q:'Lis : comment se prononce cette syllabe ?',
    say:s[0], prompt:{ar:s[0]}, opts:opts.map(o=>({txt:o[1]})), ans:opts.indexOf(s),
    good:s[0]+' se lit « '+s[1]+' »', bank:'syll', key:s[0]};
}
/* ============================================================
   RENDU — accueil, parcours, progrès
   ============================================================ */
function renderHUD(){
  $('#hud-stars').textContent = P.stars;
  $('#hud-streak').textContent = P.streak;
  $('#st-stars').textContent = P.stars;
  $('#st-streak').textContent = P.streak;
  $('#lesson-stars').textContent = P.stars;
}
function isUnlocked(i){ return P.force || i===0 || (P.mods[i-1] && P.mods[i-1].passed); }
function modTotal(i){ const m=MODULES[i]; return m.lessons ? m.lessons.length : 0; }
function modDone(i){ return (P.mods[i].done||[]).filter(Boolean).length; }

function renderHome(){
  const passed = P.mods.filter(m=>m.passed).length;
  const pct = Math.round(passed/10*100);
  const ring = $('#home-ring');
  ring.style.setProperty('--p', pct);
  $('#home-ring-pct').textContent = pct+'%';
  $('#st-done').textContent = passed+'/10';
  const who = P.name ? ', '+P.name : '';
  $('#home-greet').textContent = passed===0 ? 'Bienvenue'+who+' !' :
    passed<4 ? 'Beau départ'+who+' !' : passed<8 ? 'Tu avances fort'+who+' !' :
    passed<10 ? 'Presque au sommet'+who+' !' : 'Diplômé(e)'+who+' ! 🏆';
  $('#home-sub').textContent = passed===0 ? 'Tu as lu le livret ? Entraîne-toi ici, étape par étape.' :
    passed<10 ? 'Prochaine étape : '+MODULES[P.mods.findIndex((m,i)=>isUnlocked(i)&&!m.passed)].titre.toLowerCase()+'.' :
    'Tu sais lire, écrire et parler tes premiers mots d\'arabe.';

  const path = $('#path');
  path.innerHTML = P.mods.map((pm,i)=>{
    const M = MODULES[i];
    const unlocked = isUnlocked(i);
    const cls = pm.passed ? 'done' : (unlocked ? (i===P.mods.findIndex((m,x)=>isUnlocked(x)&&!m.passed) ? 'current':'') : 'locked');
    let sub;
    if(M.review) sub = pm.passed ? P.reviewCount+' session(s) faites' : 'Une session pour valider';
    else if(M.exam) sub = pm.passed ? 'Examen réussi 🎓' : 'Seuil : 80 % de réussite';
    else {
      const d = modDone(i), t = modTotal(i);
      sub = pm.passed ? 'Validé — quiz '+Math.round(pm.best*100)+' %' : d+'/'+t+' leçons'+(d>=t?' · quiz à passer !':'');
    }
    const barPct = M.review||M.exam ? (pm.passed?100:0) : Math.round((modDone(i)+(pm.passed?1:0))/(modTotal(i)+1)*100);
    return `<button class="mod ${cls}" data-mod="${i}">
      <div class="node">${pm.passed?'✔':M.icon}</div>
      <div class="meta">
        <b>${i+1}. ${M.titre}</b>
        <span>${sub}</span>
        <div class="bar"><i style="width:${barPct}%"></i></div>
      </div>
      <div class="state">${pm.passed?'⭐':(unlocked?'›':'🔒')}</div>
    </button>`;
  }).join('');
  path.querySelectorAll('.mod').forEach(b=>b.addEventListener('click', ()=>{
    const i = +b.dataset.mod;
    if(!isUnlocked(i)) return toast('🔒 Valide l\'étape '+i+' ('+MODULES[i-1].titre+') — ou déverrouille tout dans Progrès');
    startModule(i);
  }));
}
function renderBadges(){
  $('#badge-grid').innerHTML = BADGES.map(b=>`
    <div class="badge ${P.badges.includes(b.id)?'on':''}"><span class="e">${b.e}</span><small>${b.nom}</small></div>`).join('');
  const slot = $('#diploma-slot');
  slot.innerHTML = P.mods[9].passed ? diplomaHTML() : '';
}
function diplomaHTML(){
  return `<div class="diploma">
    <div class="seal">🎓</div>
    <h3>Diplôme Diangou Diadia</h3>
    <p>est fièrement décerné à</p>
    <div class="who">${esc(P.name||'Toi')}</div>
    <p>pour avoir appris à reconnaître, lire, écrire et prononcer<br>ses premiers mots et phrases en arabe.</p>
    <p style="margin-top:10px;">⭐ ${P.stars} étoiles · 🔥 ${P.streak} jours</p>
  </div>`;
}
function renderReviewView(){
  const n = P.rq.length;
  $('#review-note').textContent = n ? '📌 '+n+' point(s) à consolider t\'attendent dans la boîte.' :
    'Aucun raté en attente — la révision piochera dans tout ce que tu as appris.';
}

/* navigation basse */
function gotoView(v){
  document.querySelectorAll('.bottomnav button').forEach(x=>x.classList.toggle('active', x.dataset.nav===v));
  ['home','book','review','progress'].forEach(n=>$('#view-'+n).classList.toggle('active', n===v));
  window.scrollTo({top:0});
}
document.querySelectorAll('.bottomnav button').forEach(b=>b.addEventListener('click', ()=>gotoView(b.dataset.nav)));

/* déverrouillage forcé */
function renderOptions(){
  const btn = $('#force-btn'), d = $('#force-desc');
  if(!btn) return;
  if(P.force){
    btn.textContent = '🔒 Réactiver le parcours progressif';
    d.textContent = 'Mode libre activé : toutes les étapes sont ouvertes. Tu peux revenir au parcours guidé à tout moment.';
  } else {
    btn.textContent = '🔓 Tout déverrouiller';
    d.textContent = 'Par défaut, chaque étape s\'ouvre en validant la précédente (quiz à 80 %). En cas de besoin, tu peux ouvrir toutes les étapes d\'un coup.';
  }
}
$('#force-btn').addEventListener('click', ()=>{
  P.force = !P.force; save(); renderAll();
  toast(P.force ? '🔓 Toutes les étapes sont déverrouillées !' : '🔒 Parcours progressif réactivé');
});

/* sauvegarde / restauration */
$('#export-btn').addEventListener('click', exportProgress);
$('#import-btn').addEventListener('click', ()=>$('#import-file').click());
$('#import-file').addEventListener('change', e=>{
  if(e.target.files[0]) importProgress(e.target.files[0]);
  e.target.value = '';
});

/* ============================================================
   LIVRET — les 10 leçons du livre de référence, consultables
   ============================================================ */
const BOOK_ORDER = ['ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي'];
const TR = {ب:'b',ت:'t',ث:'th',ن:'n',ج:'dj',ح:'h',خ:'kh',م:'m',د:'d',ذ:'dh',ر:'r',ز:'z',س:'s',ش:'ch',ص:'s',ض:'d',ط:'t',ظ:'z',ع:'ʿ',غ:'gh',ف:'f',ق:'q',ك:'k',ل:'l',ه:'h',و:'w',ي:'y'};
function bCells(items, cls){
  return `<div class="btable ${cls||''}">${items.map(x=>`<button class="bcell" data-say="${x[0]}"><span class="a arabic">${x[0]}</span><small>${esc(x[1])}</small></button>`).join('')}</div>`;
}
function bNote(txt){ return `<div class="book-note">${txt}</div>`; }
function bH(t){ return `<h3 class="book-h">${t}</h3>`; }
function harakaTable(sym, v){
  const alif = sym==='َ' ? ['أَ','a'] : sym==='ِ' ? ['إِ','i'] : ['أُ','ou'];
  const items = BOOK_ORDER.filter(a=>a!=='ا').map(a=>[a+sym, TR[a]+v]);
  return bCells([alif, ...items]);
}
function formsTable(){
  let html = `<div class="btable forms"><div class="bhead">Lettre</div><div class="bhead">Début</div><div class="bhead">Milieu</div><div class="bhead">Fin</div>`;
  BOOK_ORDER.forEach(a=>{
    const l = L_BY_AR[a];
    const deb = l.c ? a+'ـ' : a;
    const mil = l.c ? 'ـ'+a+'ـ' : 'ـ'+a;
    const fin = 'ـ'+a;
    html += `<button class="bcell" data-say="${a}"><span class="a arabic">${a}</span><small>${l.nom}</small></button>
      <div class="bcell"><span class="a arabic">${deb}</span></div>
      <div class="bcell"><span class="a arabic">${mil}</span></div>
      <div class="bcell"><span class="a arabic">${fin}</span></div>`;
  });
  return html+'</div>';
}
const BOOK = [
 {titre:'L\'alphabet complet', sub:'Les 28 lettres + la hamza', icon:'1',
  html: ()=> bNote('L\'arabe se lit et s\'écrit de <b>droite à gauche</b>. Voici les 28 lettres de l\'alphabet, dans l\'ordre du livre. Touche une lettre pour l\'écouter.')
    + bCells(BOOK_ORDER.map(a=>[a, L_BY_AR[a].nom]))
    + bH('La hamza ء')
    + bNote('La hamza est un petit signe qui se prononce comme un léger coup de glotte (comme le début de « euh ! »). Elle s\'écrit souvent portée par ا, و ou ي : أ ؤ ئ.')
    + bCells([['ء','hamza'],['أ','a'],['ؤ','ou'],['ئ','i']])},
 {titre:'Les écritures des lettres', sub:'Début, milieu, fin de mot', icon:'2',
  html: ()=> bNote('Quand une lettre s\'attache aux autres, son dessin s\'adapte à sa place dans le mot : au <b>début</b>, au <b>milieu</b> ou à la <b>fin</b>. Le cœur de la lettre ne change jamais. Les lettres ا د ذ ر ز و ne s\'attachent jamais à la lettre suivante.')
    + formsTable()},
 {titre:'La fatha', sub:'Le son « a » — petit trait au-dessus', icon:'3',
  html: ()=> bNote('La <b>fatha</b> ( ـَ ) est un petit trait posé <b>au-dessus</b> de la lettre. Elle donne le son <b>« a »</b> (parfois entendu « è »). Exemple : بَ = « ba ».')
    + harakaTable('َ','a')
    + bH('Premiers mots à lire')
    + bCells([['لَكَ','laka'],['تَرَ','tara'],['أَخَذَ','akhadha'],['بَلَغَ','balagha'],['جَعَلَ','djaʿala'],['حَكَمَ','hakama']])},
 {titre:'La kasra', sub:'Le son « i » — petit trait en dessous', icon:'4',
  html: ()=> bNote('La <b>kasra</b> ( ـِ ) est un petit trait posé <b>en dessous</b> de la lettre. Elle donne le son <b>« i »</b>. Exemple : بِ = « bi ».')
    + harakaTable('ِ','i')
    + bH('Mots à lire')
    + bCells([['بِكَ','bika'],['عَلِمَ','ʿalima'],['شَرِبَ','chariba'],['سَمِعَ','samiʿa'],['شَهِدَ','chahida'],['لَعِبَ','laʿiba']])},
 {titre:'La damma', sub:'Le son « ou » — petite boucle au-dessus', icon:'5',
  html: ()=> bNote('La <b>damma</b> ( ـُ ) est une petite boucle posée <b>au-dessus</b> de la lettre. Elle donne le son <b>« ou »</b>. Exemple : بُ = « bou ».')
    + harakaTable('ُ','ou')
    + bH('Mots à lire')
    + bCells([['كُتُب','koutoub'],['رُسُل','rousoul'],['حَسُنَ','hasouna'],['أُفُق','oufouq'],['لَكُمْ','lakoum'],['خُلِقَ','khouliqa']])},
 {titre:'La soukoun et la shadda', sub:'La lettre qui s\'arrête, la lettre qui double', icon:'6',
  html: ()=> bH('La soukoun ـْ')
    + bNote('Un petit rond au-dessus de la lettre : elle se prononce <b>sans voyelle</b>, on s\'arrête net dessus. أَبْ = « ab ».')
    + bCells([['أَبْ','ab'],['أَمْ','am'],['أَنْ','an'],['أَسْ','as'],['أَكْ','ak'],['أَلْ','al'],['كُنْ','koun'],['قُمْ','qoum']])
    + bH('La shadda ـّ')
    + bNote('Un petit « w » au-dessus de la lettre : la lettre est <b>doublée</b>, on appuie dessus. رَبّ = « rabb ».')
    + bCells([['رَبّ','rabb'],['حَقّ','haqq'],['أُمّ','oumm'],['جَنَّة','djanna'],['قِطّ','qitt'],['شَدَّة','chadda']])},
 {titre:'Les moudouds', sub:'Les allongements â, î, oû', icon:'7',
  html: ()=> bNote('Trois lettres savent <b>allonger</b> le son de la voyelle qui précède : ا allonge le « a », ي allonge le « i », و allonge le « ou ». On tient le son deux temps.')
    + bH('Al madd bil élif — « â »')
    + bCells([['بَاب','bâb'],['قَال','qâl'],['سَلَام','salâm'],['كِتَاب','kitâb']])
    + bH('Al madd bil yè — « î »')
    + bCells([['فِيل','fîl'],['دِين','dîn'],['كَبِير','kabîr'],['كَرِيم','karîm']])
    + bH('Al madd bil waw — « oû »')
    + bCells([['نُور','noûr'],['سُوق','soûq'],['قَالُوا','qâloû'],['كَانُوا','kânoû']])},
 {titre:'Les tanwins', sub:'Les sons « ane », « ine », « oune »', icon:'8',
  html: ()=> bNote('Le <b>tanwin</b>, c\'est la voyelle écrite <b>en double</b> à la fin d\'un mot : elle ajoute un son « n ». ـً = « ane », ـٍ = « ine », ـٌ = « oune ».')
    + bH('Tanwin bil fatha ـً')
    + bCells([['وَلَدًا','waladane'],['كِتَابًا','kitâbane'],['خُبْزًا','khoubzane']])
    + bH('Tanwin bil kasra ـٍ')
    + bCells([['بَيْتٍ','baytine'],['قَلَمٍ','qalamine'],['كِتَابٍ','kitâbine']])
    + bH('Tanwin bid-damma ـٌ')
    + bCells([['وَلَدٌ','waladoune'],['كِتَابٌ','kitâboune'],['بَيْتٌ','baytoune']])},
 {titre:'Le tè marbouta · lettres lunaires et solaires', sub:'ة et le secret du « al- »', icon:'9',
  html: ()=> bH('Le tè marbouta ة')
    + bNote('Un ه avec deux points : on le trouve à la <b>fin</b> des mots (souvent féminins). En fin de phrase il se prononce « a », en liaison il se prononce « t ».')
    + bCells([['مَدْرَسَة','madrasa'],['شَجَرَة','chadjara'],['جَنَّة','djanna'],['قِصَّة','qissa']])
    + bH('Les lettres lunaires 🌙')
    + bNote('Après « al- » (اَلْ = le/la), avec une lettre <b>lunaire</b> (ء ب ج ح خ ع غ ف ق ك م هـ و ي), on prononce bien le « L » : اَلْقَمَر = « al-qamar ».')
    + bCells([['اَلْقَمَر','al-qamar'],['اَلْكِتَاب','al-kitâb'],['اَلْبَيْت','al-bayt']])
    + bH('Les lettres solaires ☀️')
    + bNote('Avec une lettre <b>solaire</b> (ت ث د ذ ر ز س ش ص ض ط ظ ل ن), le « L » disparaît et la lettre est doublée : اَلشَّمْس = « ach-chams ».')
    + bCells([['اَلشَّمْس','ach-chams'],['اَلنَّهَار','an-nahâr'],['اَلسَّلَام','as-salâm']])},
 {titre:'Exercices d\'entraînement', sub:'Lis, puis vérifie la phonétique', icon:'10',
  html: ()=> bNote('Essaie de lire chaque mot à voix haute. La phonétique est floutée : touche 👁 pour vérifier, 🔊 pour écouter la bonne prononciation.')
    + [['وَالْفَجْرِ','wal-fadjri'],['سَلَامٌ','salâmoune'],['جَنَّاتٌ','djannâtoune'],['مَسْرُورًا','masroûrane'],['وَاللَّيْلِ','wal-layli'],['فَذَكِّرْ','fadhakkir'],['وَالضُّحَى','wad-douhâ'],['لَشَهِيدٌ','lachahîdoune'],['بِالصَّبْرِ','bis-sabri'],['فَتَرْضَى','fatardâ']]
      .map(x=>`<div class="rev-row">
        <button class="speak-fab" style="width:42px;height:42px;font-size:16px;" data-say="${x[0]}">🔊</button>
        <span class="ar arabic">${x[0]}</span>
        <span class="tr hidden-tr">${esc(x[1])}</span>
        <button class="btn btn-ghost btn-sm" data-reveal>👁</button>
      </div>`).join('')},
];
function renderBook(){
  const list = $('#book-list');
  if(list.dataset.done) return;
  list.dataset.done = 1;
  list.innerHTML = BOOK.map((b,i)=>`
    <button class="book-card" data-book="${i}">
      <div class="no">${b.icon}</div>
      <div style="flex:1;min-width:0;"><b>${b.titre}</b><span>${b.sub}</span></div>
      <div style="font-size:18px;color:var(--muted);">›</div>
    </button>`).join('');
  list.querySelectorAll('.book-card').forEach(c=>c.addEventListener('click', ()=>openBook(+c.dataset.book)));
}
function openBook(i){
  const b = BOOK[i];
  S = null;
  $('#lesson-layer').classList.add('open');
  document.body.style.overflow='hidden';
  $('#lesson-track').style.width='100%';
  const B = $('#lesson-body');
  B.innerHTML = `<div class="step ${P.showFr?'':'hide-fr'}">
    <span class="kicker">Livret · Leçon ${i+1}/10</span>
    <h2>${b.titre}</h2>
    <button class="btn btn-ghost btn-sm" id="book-hide-fr" style="margin:4px 0 6px;">${P.showFr?'🙈 Masquer le français':'👁 Afficher le français'}</button>
    ${b.html()}
    <div style="display:flex;gap:10px;margin-top:22px;">
      ${i>0?`<button class="btn btn-ghost" id="book-prev" style="flex:1;">‹ Leçon ${i}</button>`:''}
      ${i<BOOK.length-1?`<button class="btn btn-primary" id="book-next" style="flex:1;">Leçon ${i+2} ›</button>`
        :`<button class="btn btn-primary" id="book-to-path" style="flex:1;">🗺️ Vers le parcours ›</button>`}
    </div>
    <button class="btn ${i<BOOK.length-1?'btn-ghost':'btn-primary'} btn-block" id="book-close" style="margin-top:10px;">Fermer le livret</button>
  </div>`;
  bindSpeaks(B);
  $('#book-hide-fr').addEventListener('click', ()=>{
    P.showFr = !P.showFr; save();
    const y = $('#lesson-layer').scrollTop;
    openBook(i);
    $('#lesson-layer').scrollTop = y;
  });
  B.querySelectorAll('[data-reveal]').forEach(btn=>btn.addEventListener('click', ()=>{
    btn.parentElement.querySelector('.tr').classList.toggle('hidden-tr');
  }));
  const pv = $('#book-prev'), nx = $('#book-next'), tp = $('#book-to-path');
  if(pv) pv.addEventListener('click', ()=>openBook(i-1));
  if(nx) nx.addEventListener('click', ()=>openBook(i+1));
  if(tp) tp.addEventListener('click', ()=>{ closeSession(); gotoView('home'); toast('🗺️ À toi de jouer : étape 1 du parcours !'); });
  $('#book-close').addEventListener('click', closeSession);
  $('#lesson-layer').scrollTop = 0;
}
$('#btn-review-short').addEventListener('click', ()=>startReview());
$('#btn-review-start').addEventListener('click', ()=>startReview());
$('#btn-continue').addEventListener('click', ()=>{
  const i = P.mods.findIndex((m,x)=>isUnlocked(x)&&!m.passed);
  if(i===-1) return toast('🏆 Tout est validé — tu peux tout rejouer librement !');
  startModule(i);
});

/* ============================================================
   MOTEUR DE SESSION (leçon / quiz / révision / examen)
   ============================================================ */
let S = null;
function startModule(i){
  const M = MODULES[i];
  if(M.review) return startReview();
  if(M.exam) return startExam();
  const d = modDone(i), t = modTotal(i);
  if(P.mods[i].passed){
    startSession(M.lessons[d % t](), {type:'lesson', mod:i, li:d % t, replay:true});
  } else if(d < t){
    startSession(M.lessons[d](), {type:'lesson', mod:i, li:d});
  } else {
    startSession([
      {t:'goal', title:'Quiz de passage — '+M.titre, text:'Réponds juste à 80 % des questions pour débloquer l\'étape suivante. Respire, tu as tout appris. 🍀'},
      ...M.quiz()
    ], {type:'quiz', mod:i});
  }
}
function startReview(){
  const qs = buildReview();
  if(!qs.length) return toast('🌱 Commence d\'abord une leçon, la révision viendra ensuite !');
  startSession([
    {t:'goal', title:'Révision du jour', text:'10 questions piochées dans ce que tu as appris — et surtout dans ce que tu as raté. C\'est ici que la mémoire se fabrique.'},
    ...qs
  ], {type:'review'});
}
function startExam(){
  const qs = [
    ...sample(LETTERS,4).map(l=>({t:'ex', ex: Math.random()<0.5?qLetter(l):qLetterName(l)})),
    ...sample(SYLL,3).map(s=>({t:'ex', ex:qSyll(s)})),
    ...sample(BUILD_WORDS,2).map(w=>({t:'ex', ex:qBuild(w)})),
    ...sample(VOCAB_ALL,3).map(v=>({t:'ex', ex: Math.random()<0.5?qVocab(v):qVocabFr(v)})),
    ...sample(PHRASES,2).map(ph=>({t:'ex', ex: Math.random()<0.5?qPhrase(ph):qOrder(ph)})),
    {t:'ex', ex:qReply(DIALOGUES[Math.floor(Math.random()*DIALOGUES.length)],0)},
  ];
  startSession([
    {t:'goal', title:'🏆 Le grand examen', text:'15 questions qui mélangent TOUT : lettres, sons, lecture, mots, phrases, dialogues. 80 % de réussite = ton diplôme. Bonne chance !'},
    ...shuffle(qs)
  ], {type:'exam'});
}
function buildReview(){
  const qs = [];
  P.rq.slice(0,6).forEach(r=>{
    const q = qFromRef(r);
    if(q){ q._rq = r; qs.push({t:'ex', ex:q}); }
  });
  const banks = [];
  const seen = GROUPS.slice(0, Math.max(modDone(0), P.mods[0].passed?7:0)).flatMap(lettersOf);
  if(seen.length) banks.push(()=>{ const l=sample(seen,1)[0]; return Math.random()<0.5?qLetter(l,seen):qLetterName(l,seen); });
  if(modDone(4)||P.mods[4].passed) banks.push(()=>qSyll(sample(SYLL,1)[0]), ()=>qBuild(sample(BUILD_WORDS,1)[0]));
  if(modDone(5)||P.mods[5].passed) banks.push(()=>{ const v=sample(VOCAB_ALL,1)[0]; return Math.random()<0.5?qVocab(v):qVocabFr(v); });
  if(modDone(6)||P.mods[6].passed) banks.push(()=>qPhrase(sample(PHRASES,1)[0]));
  while(qs.length<10 && banks.length){
    qs.push({t:'ex', ex: banks[Math.floor(Math.random()*banks.length)]()});
  }
  return shuffle(qs);
}
function qFromRef(r){
  try{
    if(r.bank==='letter'){ const l=L_BY_AR[r.key]; return Math.random()<0.5?qLetter(l):qLetterName(l); }
    if(r.bank==='syll'){ const s=SYLL.find(x=>x[0]===r.key); return s?qSyll(s):null; }
    if(r.bank==='vocab'){ const v=VOCAB_ALL.find(x=>x.ar===r.key); return v?qVocab(v):null; }
    if(r.bank==='phrase'){ const p=PHRASES.find(x=>x.ar===r.key); return p?qPhrase(p):null; }
    if(r.bank==='build'){ const w=BUILD_WORDS.find(x=>x.word===r.key); return w?qBuild(w):null; }
  }catch(e){}
  return null;
}

function startSession(steps, mode){
  S = {steps, i:0, right:0, wrong:0, mode};
  $('#lesson-layer').classList.add('open');
  document.body.style.overflow='hidden';
  renderHUD();
  renderStep();
}
function closeSession(){
  S = null;
  if('speechSynthesis' in window) speechSynthesis.cancel();
  $('#lesson-layer').classList.remove('open');
  document.body.style.overflow='';
  renderAll();
}
$('#lesson-quit').addEventListener('click', closeSession);

function next(){ if(!S) return; S.i++; renderStep(); }
function track(){
  $('#lesson-track').style.width = Math.round(S.i/S.steps.length*100)+'%';
}
function renderStep(){
  if(!S) return;
  track();
  if(S.i >= S.steps.length) return finishSession();
  const st = S.steps[S.i];
  const B = $('#lesson-body');
  const R = {goal:goalStep, teach:teachStep, rule:ruleStep, forms:formsStep, words:wordsStep, phrase:phraseStep, recap:recapStep, ex:exStep};
  B.innerHTML = '';
  R[st.t](B, st);
  window.scrollTo({top:0});
  const ll = $('#lesson-layer'); ll.scrollTop = 0;
}

/* ---------- étapes pédagogiques ---------- */
function contBtn(label='Continuer →'){
  return `<div style="margin-top:auto;padding-top:22px;"><button class="btn btn-primary btn-block" data-next>${label}</button></div>`;
}
function bindCont(B){ B.querySelector('[data-next]').addEventListener('click', next); }
function bindSpeaks(B){
  B.querySelectorAll('[data-say]').forEach(el=>el.addEventListener('click', ()=>speak(el.dataset.say)));
}
function goalStep(B, st){
  B.innerHTML = `<div class="step" style="display:flex;flex-direction:column;flex:1;">
    <span class="kicker">Objectif</span>
    <h2>${esc(st.title)}</h2>
    <p class="lead">${esc(st.text)}</p>
    ${contBtn('C\'est parti ! →')}
  </div>`;
  bindCont(B);
}
function teachStep(B, st){
  const l = st.l;
  const forms = l.c
    ? `<div class="forms-row">
        <div class="form-box"><div class="g arabic">${l.ar}</div><small>Seule</small></div>
        <div class="form-box"><div class="g arabic">${l.ar}ـ</div><small>Début</small></div>
        <div class="form-box"><div class="g arabic">ـ${l.ar}ـ</div><small>Milieu</small></div>
        <div class="form-box"><div class="g arabic">ـ${l.ar}</div><small>Fin</small></div>
      </div>`
    : `<p class="lead" style="text-align:center;margin:0 0 14px;">✨ Cette lettre ne s'attache jamais à la lettre qui la suit.</p>`;
  B.innerHTML = `<div class="step" style="display:flex;flex-direction:column;flex:1;">
    <span class="kicker">Nouvelle lettre</span>
    <div class="glyph-card">
      <span class="g arabic">${l.ar}</span>
      <div class="nm">${l.nom}</div>
      <div class="sd">se prononce « ${l.son} »</div>
      <button class="speak-fab big" data-say="${l.ar}">🔊</button>
    </div>
    ${forms}
    <div class="word-card">
      <div class="e">${l.e}</div>
      <div style="flex:1;">
        <div class="ar arabic">${l.mot}</div>
        <div class="fr">${l.fr} — commence par ${l.nom}</div>
      </div>
      <button class="speak-fab" data-say="${l.mot}">🔊</button>
    </div>
    ${contBtn()}
  </div>`;
  bindCont(B); bindSpeaks(B);
  speak(l.ar);
}
function ruleStep(B, st){
  B.innerHTML = `<div class="step" style="display:flex;flex-direction:column;flex:1;">
    <span class="kicker">Découverte</span>
    <h2>${esc(st.title)}</h2>
    <p class="lead">${esc(st.text)}</p>
    <div class="opts" style="grid-template-columns:repeat(3,1fr);direction:rtl;">
      ${st.ex.map(x=>`<button class="opt mid" data-say="${x[0]}"><span><span class="arabic" style="display:block;font-size:30px;">${x[0]}</span><span style="font-size:11.5px;font-weight:800;color:var(--muted);direction:ltr;">${esc(x[1])}</span></span></button>`).join('')}
    </div>
    <p class="lead" style="margin-top:12px;font-size:12.5px;">👆 Touche chaque case pour l'écouter.</p>
    ${contBtn()}
  </div>`;
  bindCont(B); bindSpeaks(B);
}
function formsStep(B, st){
  const l = st.l;
  B.innerHTML = `<div class="step" style="display:flex;flex-direction:column;flex:1;">
    <span class="kicker">Découverte</span>
    <h2>Une lettre, plusieurs habits</h2>
    <p class="lead">Quand une lettre s'attache aux autres, son dessin s'adapte. Regarde « ${l.nom} » ${l.ar} selon sa place dans le mot :</p>
    <div class="forms-row">
      <div class="form-box"><div class="g arabic">${l.ar}</div><small>Seule</small></div>
      <div class="form-box"><div class="g arabic">${l.ar}ـ</div><small>Début</small></div>
      <div class="form-box"><div class="g arabic">ـ${l.ar}ـ</div><small>Milieu</small></div>
      <div class="form-box"><div class="g arabic">ـ${l.ar}</div><small>Fin</small></div>
    </div>
    <p class="lead" style="font-size:13px;">Le cœur de la lettre ne change pas — seuls les traits d'attache apparaissent. Tu n'as pas à l'apprendre par cœur : à force de lire, tes yeux le feront tout seuls.</p>
    ${contBtn()}
  </div>`;
  bindCont(B);
}
function wordsStep(B, st){
  B.innerHTML = `<div class="step" style="display:flex;flex-direction:column;flex:1;">
    <span class="kicker">${st.cat.titre}</span>
    <h2>Écoute et répète chaque mot</h2>
    ${st.cat.items.map(v=>`
      <div class="word-card">
        <div class="e">${v.e}</div>
        <div style="flex:1;">
          <div class="ar arabic">${v.ar}</div>
          <div class="fr">${esc(v.fr)} · <i>${esc(v.tr)}</i></div>
        </div>
        <button class="speak-fab" data-say="${v.ar}">🔊</button>
      </div>`).join('')}
    ${contBtn('Je les ai écoutés →')}
  </div>`;
  bindCont(B); bindSpeaks(B);
}
function phraseStep(B, st){
  const ph = st.ph;
  B.innerHTML = `<div class="step" style="display:flex;flex-direction:column;flex:1;">
    <span class="kicker">Nouvelle phrase</span>
    <div class="glyph-card">
      <div style="font-size:44px;">${ph.e}</div>
      <span class="g arabic" style="font-size:40px;">${ph.ar}</span>
      <div class="sd">${esc(ph.tr)}</div>
      <div class="nm" style="font-family:'Manrope';font-size:15px;">${esc(ph.fr)}</div>
      <button class="speak-fab big" data-say="${ph.ar}">🔊</button>
    </div>
    ${contBtn()}
  </div>`;
  bindCont(B); bindSpeaks(B);
  speak(ph.ar);
}
function recapStep(B, st){
  B.innerHTML = `<div class="step" style="display:flex;flex-direction:column;flex:1;">
    <span class="kicker">Et maintenant ?</span>
    <div class="result" style="padding-top:14px;">
      <div class="big">🌟</div>
      <h2>${esc(st.title)}</h2>
      <p class="sub">${esc(st.text)}</p>
    </div>
    ${contBtn('Terminer la leçon ✓')}
  </div>`;
  bindCont(B);
}
/* ============================================================
   EXERCICES INTERACTIFS
   ============================================================ */
function exStep(B, st){
  const ex = st.ex;
  const K = {qcm:exQcm, hunt:exHunt, build:exBuild, order:exOrder, trace:exTrace, speak:exSpeak};
  K[ex.k](B, ex);
}
function exHeader(ex){
  return `<span class="kicker">Exercice</span><h2 style="font-size:16.5px;">${esc(ex.q)}</h2>`;
}
function fbHTML(){ return `<div class="feedback" id="fb"><span class="fx"></span><span class="msg"></span></div>
  <div id="fb-next" style="display:none;margin-top:14px;"><button class="btn btn-primary btn-block" data-next>Continuer →</button></div>`; }
function showFB(B, ok, msg, detail, auto){
  const fb = B.querySelector('#fb');
  fb.className = 'feedback show '+(ok?'good':'bad');
  fb.querySelector('.fx').textContent = ok ? ['🎉','👏','💪','✨','🙌'][Math.floor(Math.random()*5)] : '🤍';
  fb.querySelector('.msg').innerHTML = esc(msg) + (detail?`<span class="detail">${esc(detail)}</span>`:'');
  if(ok){ S.right++; addStars(0); } else S.wrong++;
  if(ok && auto){ setTimeout(next, 1100); }
  else { const n = B.querySelector('#fb-next'); n.style.display='block'; n.querySelector('[data-next]').addEventListener('click', next); }
  renderHUD();
}
function markRQ(ex, ok){
  if(!ok && ex.bank && ex.key) pushReview(ex.bank, ex.key);
  if(ok && ex._rq){ P.rq = P.rq.filter(r=>!(r.bank===ex._rq.bank && r.key===ex._rq.key)); save(); }
}

/* --- QCM --- */
function exQcm(B, ex){
  const prompt = ex.prompt
    ? `<div class="prompt-box">${ex.prompt.ar?`<div class="big-ar arabic" ${ex.prompt.small?'style="font-size:40px;"':''}>${ex.prompt.ar}</div>`:''}${ex.prompt.e?`<div class="big-e">${ex.prompt.e}</div>`:''}</div>`
    : '';
  const listen = ex.say ? `<div style="text-align:center;"><button class="speak-fab big" id="rehear">🔊</button></div>` : '';
  B.innerHTML = `<div class="step">
    ${exHeader(ex)}
    ${listen}${prompt}
    <div class="opts ${ex.single?'single':''}" id="opts">
      ${ex.opts.map((o,i)=>`<button class="opt ${o.txt?'text':''} ${ex.optSize==='mid'?'mid':''} ${o.ar?'arabic':''}" data-i="${i}">${o.ar||esc(o.txt)}</button>`).join('')}
    </div>
    ${fbHTML()}
  </div>`;
  if(ex.say){ B.querySelector('#rehear').addEventListener('click', ()=>speak(ex.say)); speak(ex.say); }
  B.querySelectorAll('.opt').forEach(b=>b.addEventListener('click', ()=>{
    const i = +b.dataset.i, ok = i===ex.ans;
    B.querySelectorAll('.opt').forEach((o,j)=>{
      o.style.pointerEvents='none';
      if(j===ex.ans) o.classList.add('correct');
      else if(o===b && !ok) o.classList.add('wrong');
      else o.classList.add('dim');
    });
    markRQ(ex, ok);
    if(ok && ex.sayAfter) speak(ex.sayAfter);
    showFB(B, ok, ok?'Bien joué !':'Presque ! La bonne réponse était :', ex.good, ok);
  }));
}

/* --- Trouve-les-tous --- */
function exHunt(B, ex){
  const need = ex.tiles.filter(t=>t===ex.target).length;
  let found = 0, errs = 0;
  B.innerHTML = `<div class="step">
    ${exHeader(ex)}
    <p class="lead" style="font-size:12.5px;">Il y en a ${need} à trouver.</p>
    <div class="hunt-grid" id="hunt">
      ${ex.tiles.map((t,i)=>`<button class="opt arabic" data-t="${t}">${t}</button>`).join('')}
    </div>
    ${fbHTML()}
  </div>`;
  B.querySelectorAll('#hunt .opt').forEach(b=>b.addEventListener('click', ()=>{
    if(b.dataset.t===ex.target){
      b.classList.add('correct'); b.style.pointerEvents='none';
      speak(ex.target); found++;
      if(found===need){
        B.querySelectorAll('#hunt .opt:not(.correct)').forEach(o=>{o.classList.add('dim');o.style.pointerEvents='none';});
        const ok = errs===0;
        markRQ(ex, ok);
        showFB(B, ok, ok?'Toutes trouvées, superbe !':'Trouvées — mais avec quelques hésitations.', ok?null:'Cette lettre reviendra en révision.', ok);
      }
    } else {
      b.classList.add('wrong'); errs++;
      setTimeout(()=>b.classList.remove('wrong'), 400);
    }
  }));
}

/* --- Assemble le mot (briques, droite → gauche) --- */
function exBuild(B, ex){
  const w = ex.w;
  let pos = 0, errs = 0;
  B.innerHTML = `<div class="step">
    ${exHeader(ex)}
    <div class="brick-target" id="slots">
      ${w.parts.map(()=>`<div class="brick-slot arabic"></div>`).join('')}
    </div>
    <div class="brick-pool" id="pool">
      ${shuffle(w.parts.map((p,i)=>({p,i}))).map(o=>`<button class="brick arabic" data-p="${o.p}">${o.p}</button>`).join('')}
    </div>
    <div class="fusion" id="fusion"></div>
    ${fbHTML()}
  </div>`;
  const slots = B.querySelectorAll('.brick-slot');
  B.querySelectorAll('.brick').forEach(b=>b.addEventListener('click', ()=>{
    if(b.dataset.p === w.parts[pos]){
      b.classList.add('used');
      slots[pos].textContent = w.parts[pos];
      slots[pos].classList.add('filled');
      speak(w.parts[pos]);
      pos++;
      if(pos===w.parts.length){
        B.querySelector('#fusion').innerHTML = `<span class="arabic">${w.word}</span> ${w.e}<span class="tr">${esc(w.tr)} — ${esc(w.fr)}</span>`;
        setTimeout(()=>speak(w.word), 500);
        const ok = errs===0;
        markRQ(ex, ok);
        showFB(B, ok, ok?'Tu viens de LIRE un mot entier !':'Mot assemblé — on le reverra ensemble.', w.word+' = '+w.tr, false);
      }
    } else {
      b.classList.add('wrong'); errs++;
      setTimeout(()=>b.classList.remove('wrong'), 400);
      toast('↪️ Rappel : on lit de droite à gauche');
    }
  }));
}

/* --- Remets la phrase dans l'ordre --- */
function exOrder(B, ex){
  const ph = ex.ph;
  let pos = 0, errs = 0;
  B.innerHTML = `<div class="step">
    ${exHeader(ex)}
    <div class="order-line arabic" id="line"></div>
    <div class="order-pool" id="pool">
      ${shuffle(ph.mots.map((m,i)=>({m,i}))).map(o=>`<button class="chip-word arabic" data-m="${o.m}">${o.m}</button>`).join('')}
    </div>
    ${fbHTML()}
  </div>`;
  B.querySelectorAll('.chip-word').forEach(b=>b.addEventListener('click', ()=>{
    if(b.dataset.m === ph.mots[pos]){
      b.classList.add('used');
      const s = document.createElement('span');
      s.className='chip-word'; s.style.borderColor='var(--acc)';
      s.textContent = ph.mots[pos];
      B.querySelector('#line').appendChild(s);
      pos++;
      if(pos===ph.mots.length){
        speak(ph.ar);
        const ok = errs===0;
        markRQ(ex, ok);
        showFB(B, ok, ok?'Phrase parfaite !':'Phrase reconstruite — à revoir bientôt.', ph.ar+' = '+ph.fr, false);
      }
    } else {
      b.classList.add('wrong'); errs++;
      setTimeout(()=>b.classList.remove('wrong'), 400);
    }
  }));
}

/* --- Traçage --- */
function exTrace(B, ex){
  const l = ex.l;
  B.innerHTML = `<div class="step">
    ${exHeader(ex)}
    <div class="trace-wrap">
      <div class="ghost arabic" id="ghost">${l.ar}</div>
      <canvas id="tc"></canvas>
    </div>
    <div class="trace-tools">
      <button class="btn btn-ghost btn-sm" id="t-clear">🧹 Effacer</button>
      <button class="btn btn-ghost btn-sm" id="t-ghost">👁️ Modèle</button>
      <button class="btn btn-ghost btn-sm" data-say="${l.ar}">🔊 Écouter</button>
      <button class="btn btn-ok btn-sm" id="t-done" style="margin-left:auto;">✅ J'ai réussi</button>
    </div>
    ${fbHTML()}
  </div>`;
  bindSpeaks(B);
  const cv = B.querySelector('#tc');
  const wrap = cv.parentElement;
  const ratio = window.devicePixelRatio||1;
  const rect = wrap.getBoundingClientRect();
  cv.width = rect.width*ratio; cv.height = 300*ratio;
  const ctx = cv.getContext('2d');
  ctx.scale(ratio,ratio);
  ctx.lineWidth = 11; ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--acc').trim();
  let drawing = false, drew = false;
  const pos = e=>{
    const r = cv.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return {x:p.clientX-r.left, y:p.clientY-r.top};
  };
  const start = e=>{ drawing=true; drew=true; const p=pos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); e.preventDefault(); };
  const move = e=>{ if(!drawing) return; const p=pos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); e.preventDefault(); };
  const end = ()=>drawing=false;
  cv.addEventListener('mousedown',start); cv.addEventListener('mousemove',move); addEventListener('mouseup',end);
  cv.addEventListener('touchstart',start,{passive:false}); cv.addEventListener('touchmove',move,{passive:false}); cv.addEventListener('touchend',end);
  B.querySelector('#t-clear').addEventListener('click', ()=>{ ctx.clearRect(0,0,cv.width,cv.height); drew=false; });
  B.querySelector('#t-ghost').addEventListener('click', ()=>{
    const g = B.querySelector('#ghost');
    g.style.opacity = g.style.opacity==='0' ? '' : '0';
  });
  B.querySelector('#t-done').addEventListener('click', ()=>{
    if(!drew) return toast('✍️ Trace d\'abord la lettre !');
    showFB(B, true, 'Belle écriture de '+l.nom+' !', 'Ta main mémorise le geste — refais-le sur papier si tu peux.', true);
  });
  speak(l.ar);
}

/* --- Écoute et répète --- */
function exSpeak(B, ex){
  const line = ex.line;
  B.innerHTML = `<div class="step">
    ${exHeader(ex)}
    <div class="glyph-card">
      <span class="g arabic" style="font-size:36px;">${line.ar}</span>
      <div class="sd">${esc(line.tr)}</div>
      <div class="nm" style="font-family:'Manrope';font-size:14.5px;">${esc(line.fr)}</div>
      <button class="speak-fab big" data-say="${line.ar}">🔊</button>
    </div>
    <p class="lead" style="text-align:center;font-size:13px;">Répète à voix haute, 2 ou 3 fois. Personne n'écoute — ose !</p>
    <div style="display:flex;gap:10px;">
      <button class="btn btn-ghost" data-say="${line.ar}" style="flex:1;">🔊 Réécouter</button>
      <button class="btn btn-ok" id="said" style="flex:1;">🗣️ Je l'ai dit !</button>
    </div>
    ${fbHTML()}
  </div>`;
  bindSpeaks(B);
  speak(line.ar);
  B.querySelector('#said').addEventListener('click', ()=>{
    showFB(B, true, 'Ta voix arabe se réveille !', line.tr, true);
  });
}

/* ============================================================
   FIN DE SESSION — score, étoiles, déblocages, diplôme
   ============================================================ */
function finishSession(){
  const m = S.mode;
  const total = S.right + S.wrong;
  const pct = total ? S.right/total : 1;
  const starsWon = total ? (1 + (pct>=0.7?1:0) + (pct>=0.95?1:0)) : 1;
  const B = $('#lesson-body');
  let title='', sub='', extra='', passed=false;

  if(m.type==='lesson'){
    if(!m.replay) P.mods[m.mod].done[m.li] = true;
    addStars(starsWon);
    const d = modDone(m.mod), t = modTotal(m.mod);
    title = 'Leçon terminée !';
    sub = d>=t && !P.mods[m.mod].passed
      ? 'Toutes les leçons du module sont faites — le quiz de passage t\'attend !'
      : 'Encore '+(t-d)+' leçon(s) dans ce module. Continue sur ta lancée !';
  }
  else if(m.type==='quiz'){
    passed = pct>=0.8;
    P.mods[m.mod].best = Math.max(P.mods[m.mod].best||0, pct);
    if(passed){
      P.mods[m.mod].passed = true;
      addStars(starsWon+2);
      title = 'Module validé ! 🎊';
      sub = m.mod<9 ? 'Étape suivante débloquée : '+MODULES[m.mod+1].titre+' !' : '';
    } else {
      addStars(1);
      title = 'Pas encore 80 %...';
      sub = 'Ce n\'est que partie remise : refais une leçon ou une révision, puis retente le quiz. Tu y es presque !';
    }
  }
  else if(m.type==='review'){
    P.reviewCount++;
    if(!P.mods[8].passed && isUnlocked(8)){ P.mods[8].passed = true; }
    addStars(starsWon);
    title = 'Révision faite ✔';
    sub = P.rq.length ? 'Il reste '+P.rq.length+' point(s) dans la boîte — reviens demain !' : 'Boîte vide, mémoire au top. Reviens demain pour entretenir la flamme 🔥';
  }
  else if(m.type==='exam'){
    passed = pct>=0.8;
    P.mods[9].best = Math.max(P.mods[9].best||0, pct);
    if(passed){
      P.mods[9].passed = true;
      addStars(starsWon+5);
      title = 'EXAMEN RÉUSSI ! 🎓';
      sub = 'Tu pars de zéro... et tu lis l\'arabe. Écris ton prénom pour recevoir ton diplôme :';
      extra = `<input class="name-input" id="dip-name" maxlength="20" placeholder="Ton prénom" value="${esc(P.name||'')}" style="margin-bottom:12px;">
        <button class="btn btn-amber btn-block" id="dip-btn">🎓 Recevoir mon diplôme</button>
        <div id="dip-out" style="margin-top:16px;"></div>`;
    } else {
      addStars(1);
      title = 'Pas encore... mais si proche !';
      sub = 'Refais quelques révisions et reviens : l\'examen se retente autant de fois que tu veux.';
    }
  }
  checkBadges(); save();

  B.innerHTML = `<div class="step result">
    <div class="big">${passed||m.type==='lesson'||m.type==='review' ? '🎉' : '💪'}</div>
    <h2>${title}</h2>
    ${total?`<div class="score-ring" style="--p:${Math.round(pct*100)}"><b>${Math.round(pct*100)}%</b></div>
    <div class="stars">${'⭐'.repeat(starsWon)}${'☆'.repeat(3-starsWon)}</div>`:''}
    <p class="sub">${sub}</p>
    ${extra}
    <button class="btn btn-primary btn-block" id="res-close" style="margin-top:14px;">Retour au parcours</button>
  </div>`;
  $('#lesson-track').style.width='100%';
  if(passed || m.type==='lesson') confetti();
  $('#res-close').addEventListener('click', closeSession);
  const dipBtn = $('#dip-btn');
  if(dipBtn) dipBtn.addEventListener('click', ()=>{
    P.name = ($('#dip-name').value||'').trim() || 'Toi';
    checkBadges(); save();
    $('#dip-out').innerHTML = diplomaHTML();
    confetti(); confetti();
  });
}

/* ============================================================
   INIT
   ============================================================ */
function renderAll(){
  renderHUD(); renderHome(); renderBadges(); renderReviewView(); renderBook(); renderOptions();
}

/* page de bienvenue — uniquement au premier lancement */
$('#welcome-start').addEventListener('click', ()=>{
  P.welcomed = true; save();
  $('#welcome-layer').classList.remove('open');
  document.body.style.overflow='';
  gotoView('book');
  openBook(0);
  toast('👋 Bienvenue ! Voici la leçon 1 : l\'alphabet complet.');
});

load();
applyTheme();
renderAll();
if(!P.welcomed){
  $('#welcome-layer').classList.add('open');
  document.body.style.overflow='hidden';
} else if(P.streak>1) setTimeout(()=>toast('🔥 '+P.streak+' jours d\'affilée — bravo !'), 800);
