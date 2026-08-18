// --- DONNÉES DU JEU (v0.0.7) ---
const monde = {
    "Paris": {
        faible: [{ nom: "Tabac-Presse", diff: 4, butin: 12000 }, { nom: "Pharmacie de garde", diff: 5, butin: 15000 }],
        modere: [{ nom: "Bijouterie Vendôme", diff: 7, butin: 200000 }, { nom: "Fourgon de fonds", diff: 8, butin: 250000 }],
        eleve: [{ nom: "Musée du Louvre", diff: 10, butin: 3500000 }, { nom: "Vente aux enchères", diff: 11, butin: 4500000 }]
    },
    "New York": {
        faible: [{ nom: "Prêteur sur gages", diff: 5, butin: 20000 }, { nom: "Supérette", diff: 5, butin: 18000 }],
        modere: [{ nom: "Fourgon Blindé", diff: 8, butin: 350000 }, { nom: "Boutique de luxe", diff: 7, butin: 300000 }],
        eleve: [{ nom: "Réserve Fédérale", diff: 11, butin: 7000000 }, { nom: "Banque de Manhattan", diff: 10, butin: 5500000 }]
    },
    "Los Angeles": {
        faible: [{ nom: "Dispensaire local", diff: 4, butin: 18000 }, { nom: "Station service", diff: 4, butin: 14000 }],
        modere: [{ nom: "Manoir à Beverly Hills", diff: 6, butin: 150000 }, { nom: "Bijoutier d'Hollywood", diff: 7, butin: 200000 }],
        eleve: [{ nom: "Casino Clandestin", diff: 9, butin: 2800000 }, { nom: "Dépôt d'or", diff: 10, butin: 3500000 }]
    }
};

const recruesDispo = [
    { id: 'r1', nom: 'Gueule d\'Ange', role: 'furtivite', bonus: 2, cout: 5000, moralite: 5, affection: 50 },
    { id: 'r2', nom: 'Le Bulldozer', role: 'force', bonus: 3, cout: 8000, moralite: 3, affection: 50 },
    { id: 'r3', nom: 'Neo', role: 'intel', bonus: 2, cout: 6000, moralite: 6, affection: 50 }
];

const catalogue = [
    { id: 'f_intel', type: 'Formation', nom: "Cours de Hacking", desc: "+3 Intelligence", prix: 15000, effet: () => joueur.stats.intel += 3 },
    { id: 'f_force', type: 'Formation', nom: "Entraînement Militaire", desc: "+3 Force", prix: 15000, effet: () => joueur.stats.force += 3 },
    { id: 'f_furt', type: 'Formation', nom: "Stage de Parkour", desc: "+3 Furtivité", prix: 15000, effet: () => joueur.stats.furtivite += 3 },
    { id: 'm_drone', type: 'Matériel', nom: "Mini-Drone", desc: "+1 Furtivité permanent", prix: 50000, effet: () => joueur.stats.furtivite += 1 },
    { id: 'm_c4', type: 'Matériel', nom: "Pain de C4", desc: "+1 Force permanent", prix: 50000, effet: () => joueur.stats.force += 1 },
    { id: 'v_moto', type: 'Véhicules', nom: "Moto Cross Rodée", desc: "Facilite les fuites", prix: 35000, effet: () => joueur.vehicule = "Moto" },
    { id: 'v_camion', type: 'Véhicules', nom: "Fourgon Blindé Volé", desc: "Protection et espace", prix: 120000, effet: () => joueur.vehicule = "Fourgon" },
    { id: 'i_planque', type: 'Immobilier', nom: "Planque Sécurisée", desc: "Baisse le risque de 30%", prix: 150000, effet: () => joueur.risquePrison = Math.max(0, joueur.risquePrison - 30) },
    { id: 'i_blanchisseur', type: 'Économie', nom: "Réseau de Blanchisserie", desc: "Crée du Cash Blanchi (Insaisissable)", prix: 100000, effet: () => joueur.blanchisserie = true }
];

// 30 ÉVÉNEMENTS (10 Simples, 10 Moyens, 10 Compliqués)
const banqueEvenements = {
    simple: [
        { titre: "Rencontre fortuite", desc: "Vous croisez un ancien camarade peu regardant sur la légalité.", choix: [{txt: "Discuter affaires (+5000€)", action:()=>{joueur.argent+=5000; joueur.argentGagne+=5000; notify("Petit tuyau lucratif.");}}, {txt: "L'ignorer", action:()=>{notify("Rien de spécial.");}}] },
        { titre: "Panne de réveil", desc: "Vous ratez un rendez-vous matinal sans conséquence.", choix: [{txt: "Profiter pour dormir", action:()=>{joueur.mental=Math.min(10,joueur.mental+1); notify("Repos bienvenu.");}}] },
        { titre: "Contrôle de routine", desc: "Un agent patrouille près de votre planque.", choix: [{txt: "Se faire discret", action:()=>{notify("Il est parti sans insister.");}}] },
        { titre: "Colis égaré", desc: "Un colis non réclamé traîne sur votre palier.", choix: [{txt: "L'ouvrir (+2000€ de revente)", action:()=>{joueur.argent+=2000; joueur.argentGagne+=2000; notify("Revendu au marché noir.");}}, {txt: "Ignorer", action:()=>{notify("Laissé sur place.");}}] },
        { titre: "Coup de fil anonyme", desc: "Quelqu'un respire lourdement au téléphone.", choix: [{txt: "Raccrocher", action:()=>{notify("Simple blague.");}}] },
        { titre: "Verre renversé", desc: "Bousculade dans un troquet.", choix: [{txt: "S'excuser poliment", action:()=>{notify("Affaire classée.");}}] },
        { titre: "Rumeur de quartier", desc: "On chuchote qu'un braqueur sévit en ville.", choix: [{txt: "Sourire en coin", action:()=>{notify("Votre ego apprécie.");}}] },
        { titre: "Panne de Wi-Fi", desc: "Votre réseau sécurisé saute.", choix: [{txt: "Réinitialiser le routeur", action:()=>{notify("Connexion rétablie.");}}] },
        { titre: "Visite du propriétaire", desc: "Le logeur inspecte les lieux.", choix: [{txt: "Dissimuler le matériel", action:()=>{notify("Rien vu, rien su.");}}] },
        { titre: "Trouvaille dans la rue", desc: "Un portefeuille égaré sur un banc.", choix: [{txt: "Le fouiller (+1000€)", action:()=>{joueur.argent+=1000; joueur.argentGagne+=1000; notify("Cash récupéré.");}}, {txt: "Le déposer au poste", action:()=>{joueur.moralite=Math.min(10,joueur.moralite+1); notify("Bon citoyen.");}}] }
    ],
    moyen: [
        { titre: "Chantage au flash", desc: "Un automobiliste possède une photo de vous près d'une cible.", choix: [{txt: "Payer (5000€)", action:()=>{if(joueur.argent>=5000){joueur.argent-=5000;joueur.argentPerdu+=5000;}else{joueur.argent-=5000;joueur.argentPerdu+=5000;joueur.heat+=15;} notify("Silence acheté.");}}, {txt: "Ignorer", action:()=>{joueur.heat+=10; notify("Heat en hausse.");}}] },
        { titre: "Concurrence déloyale", desc: "Un autre gang revendique votre territoire.", choix: [{txt: "Affirmer son autorité (Force 5)", action:()=>{if(joueur.stats.force>=5){joueur.respect+=3;notify("Ils ont reculé.");}else{joueur.heat+=20;notify("Affrontement difficile.");}}] },
        { titre: "Le corbeau", desc: "Une lettre détaille vos derniers déplacements.", choix: [{txt: "Changer de planque", action:()=>{joueur.argent-=10000;joueur.argentPerdu+=10000;notify("Déménagement d'urgence.");}}] },
        { titre: "Interrogatoire subtil", desc: "Un inspecteur en civil vous aborde.", choix: [{txt: "Garder son sang-froid", action:()=>{notify("Aucune info lâchée.");}}] },
        { titre: "Dette de comparses", desc: "Un ancien complice réclame de l'aide.", choix: [{txt: "Aider (8000€)", action:()=>{if(joueur.argent>=8000){joueur.argent-=8000;joueur.argentPerdu+=8000;joueur.moralite++;}else{joueur.argent-=8000;joueur.argentPerdu+=8000;}}}, {txt: "Refuser", action:()=>{joueur.crainte++;}}] },
        { titre: "Fuite d'informations", desc: "Des rumeurs circulent sur les forums underground.", choix: [{txt: "Piratage préventif (Intel 5)", action:()=>{if(joueur.stats.intel>=5){notify("Traces effacées.");}else{joueur.niveauSurveillance++;}}] },
        { titre: "Contrôle fiscal surprise", desc: "L'État s'intéresse à votre train de vie.", choix: [{txt: "Graisser une patte (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000;joueur.argentPerdu+=15000;}else{joueur.argent-=15000;joueur.argentPerdu+=15000;joueur.risquePrison+=15;}}] }],
        { titre: "Matériel défectueux", desc: "Vos outils de piratage lâchent.", choix: [{txt: "Racheter du matos (10000€)", action:()=>{joueur.argent-=10000;joueur.argentPerdu+=10000;}}] },
        { titre: "Course-poursuite urbaine", desc: "Vous pensez être filé.", choix: [{txt: "Semer les ombres (Furtivité 5)", action:()=>{if(joueur.stats.furtivite>=5){notify("Semés.");}else{joueur.heat+=20;}}] }],
        { titre: "Voisinage curieux", desc: "Un voisin insiste pour tout savoir.", choix: [{txt: "Déménager discrètement", action:()=>{joueur.argent-=5000;joueur.argentPerdu+=5000;}}] }
    ],
    complique: [
        { titre: "Piège du FBI", desc: "Un indic propose un faux plan d'attaque.", choix: [{txt: "Analyser le piège (Intel 7)", action:()=>{if(joueur.stats.intel>=7){notify("Piège évité !");}else{allerEnPrison("C'était un guet-apens fédéral !");}}] },
        { titre: "Fusillade interlope", desc: "Règlement de comptes sous vos fenêtres.", choix: [{txt: "Riposter", action:()=>{joueur.moralite=Math.max(0,joueur.moralite-2);joueur.crainte+=5;}}] },
        { titre: "Infiltration de la planque", desc: "Votre serrure a été crochetée.", choix: [{txt: "Sécuriser (20000€)", action:()=>{joueur.argent-=20000;joueur.argentPerdu+=20000;}}] },
        { titre: "Traîtrise de haut vol", desc: "Un proche réseau a parlé.", choix: [{txt: "S'enfuir à l'étranger", action:()=>{joueur.argent-=50000;joueur.argentPerdu+=50000;joueur.ville="Paris";}}] },
        { titre: "Saccage par un parrain", desc: "Le syndicat réclame sa part.", choix: [{txt: "Payer tribut (40000€)", action:()=>{joueur.argent-=40000;joueur.argentPerdu+=40000;}}] },
        { titre: "Mandat imminent", desc: "Perquisition prévue à l'aube.", choix: [{txt: "Cacher le magot", action:()=>{joueur.risquePrison+=30;}}] },
        { titre: "Enlèvement d'un proche", desc: "Un rival demande rançon.", choix: [{txt: "Payer (30000€)", action:()=>{joueur.argent-=30000;joueur.argentPerdu+=30000;}}] },
        { titre: "Piratage de comptes", desc: "Fonds en partie siphonnés.", choix: [{txt: "Contrer l'attaque", action:()=>{joueur.argent-=25000;joueur.argentPerdu+=25000;}}] },
        { titre: "Témoin clé", desc: "Un gardien vous a reconnu.", choix: [{txt: "Discrétion totale (Furtivité 8)", action:()=>{if(joueur.stats.furtivite>=8){notify("Témoin neutralisé pacifiquement.");}else{allerEnPrison("Dénoncé par le gardien.");}}] },
        { titre: "Embuscade routière", desc: "Route bloquée par des véhicules banalisés.", choix: [{txt: "Forcer le barrage (Force 8)", action:()=>{if(joueur.stats.force>=8){notify("Passage en force réussi !");}else{allerEnPrison("Arrêté lors de l'embuscade.");}}] }]
    ]
};

let joueur = {
    milieu: "", originType: "", age: 20, mois: 0,
    argent: 0, argentGagne: 0, argentPerdu: 0,
    cashBlanchi: 0, ville: "", 
    risquePrison: 0, enPrison: false, niveauSurveillance: 0,
    heat: 0, 
    braquagesReussis: 0,
    blanchisserie: false,
    vehicule: "Aucun",
    mental: 8, 
    moralite: 10, 
    respect: 0,
    crainte: 0,
    stats: { force: 3, intel: 3, furtivite: 3 },
    buffs: { force: 0, intel: 0, furtivite: 0 },
    pointsCompetence: 0, possessions: [], equipe: []
};

let cibleActuelle = null;
let indexCible = { faible: 0, modere: 0, eleve: 0 };
let eventsRestantsAfaire = 0; // Compteur pour les événements post-braquage

// --- NAVIGATION ET UI ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    let statsBar = document.getElementById('global-stats');
    if(['screen-start', 'screen-milieu', 'screen-ville', 'screen-story', 'screen-end', 'screen-event', 'screen-debrief'].includes(screenId)) {
        statsBar.style.display = 'none';
    } else {
        statsBar.style.display = 'grid';
        updateStats();
    }
    document.getElementById('msg-arbre').style.display = 'none'; 
}

function updateStats() {
    let textRisque = joueur.enPrison ? `<span style="color:#8b949e;text-decoration:line-through;">EN TAULE</span>` : `${joueur.risquePrison} %`;
    
    document.getElementById('global-stats').innerHTML = `
        <div>👤 ${joueur.age} ans (Mois: ${joueur.mois})</div>
        <div>💰 Cash: ${joueur.argent.toLocaleString()} € (Blanchi: ${joueur.cashBlanchi.toLocaleString()} €)</div>
        <div>💪 ${joueur.stats.force} | 🧠 ${joueur.stats.intel} | 🥷 ${joueur.stats.furtivite}</div>
        <div>🧠 Mental: ${joueur.mental}/10 | ⚖️ Moral: ${joueur.moralite}</div>
        <div class="heat-text">🔥 Tension (Heat): ${joueur.heat}%</div>
        <div class="danger-text">🚨 Risque Global : ${textRisque}</div>
    `;
}

function notify(msg) {
    document.getElementById('hub-notification').innerText = msg;
}

function getStatutCriminel() {
    if (joueur.braquagesReussis === 0) return "Inconnu des services";
    if (joueur.braquagesReussis < 3) return "Tire-laine";
    if (joueur.braquagesReussis < 6) return "Braqueur Régulier";
    if (joueur.braquagesReussis < 12) return "Criminel Endurci";
    return "Légende du Milieu";
}

// --- LOGIQUE DE DÉPART ET STORYTELLING ---
function initJoueur(originType) {
    joueur.originType = originType;
    if(originType === 'Défavorisé') {
        joueur.milieu = "Quartiers Défavorisés";
        joueur.stats.furtivite += 2;
        joueur.argent = 0;
    } else if(originType === 'Classique') {
        joueur.milieu = "Classe Moyenne";
        joueur.stats.force += 2;
        joueur.argent = 0;
    } else if(originType === 'Riche') {
        joueur.milieu = "Milieu Aisé";
        joueur.stats.intel += 2;
        joueur.argent = 20000; // 20 000 € de départ
        joueur.argentGagne += 20000;
    }
    showScreen('screen-ville');
}

function setVille(ville) {
    if (joueur.ville !== "" && joueur.risquePrison > 0) {
        if (Math.random() * 100 < joueur.risquePrison) {
            allerEnPrison("La douane vous a intercepté à l'aéroport.");
            return;
        }
    }
    joueur.ville = ville;
    genererStorytelling();
    showScreen('screen-story');
}

function genererStorytelling() {
    let histoires = {
        "Paris": `Né dans les ${joueur.milieu}, vous débarquez à Paris. v0.0.7 opérationnel. Votre planque est prête.`,
        "New York": `Arrivé à New York (${joueur.milieu}). v0.0.7 opérationnel. Prêt pour la Grosse Pomme.`,
        "Los Angeles": `Sous le soleil de Los Angeles (${joueur.milieu}), v0.0.7 opérationnel. Le jeu commence.`
    };
    document.getElementById('story-text').innerText = histoires[joueur.ville];
}

function entrerDansLaPlanque() {
    document.getElementById('hub-ville-nom').innerText = joueur.ville;
    genererMissionsHub();
    notify(`Bienvenue à ${joueur.ville}.`);
    showScreen('screen-hub');
}

function calmerLeJeu() {
    joueur.mois += 6;
    if(joueur.mois >= 12) { joueur.age++; joueur.mois -= 12; }
    joueur.heat = Math.max(0, joueur.heat - 30);
    joueur.mental = Math.min(10, joueur.mental + 1);
    notify("Profil bas pendant 6 mois. Tension en baisse.");
    genererMissionsHub(); 
    updateStats();
}

// --- GESTION DES ÉVÉNEMENTS POST-BRAQUAGE ---
function lancerSequenceEvenements() {
    // Entre 1 et 3 événements
    eventsRestantsAfaire = Math.floor(Math.random() * 3) + 1;
    prochaineEtapeEvenement();
}

function prochaineEtapeEvenement() {
    if(eventsRestantsAfaire <= 0) {
        genererMissionsHub();
        showScreen('screen-hub');
        return;
    }
    eventsRestantsAfaire--;

    // Choisir la catégorie en fonction du profil (Heat ou Surveillance)
    let cat = "simple";
    if(joueur.heat > 50 || joueur.niveauSurveillance > 1) {
        cat = Math.random() > 0.4 ? "complique" : "moyen";
    } else if(joueur.heat > 20) {
        cat = Math.random() > 0.5 ? "moyen" : "simple";
    }

    let liste = banqueEvenements[cat];
    let ev = liste[Math.floor(Math.random() * liste.length)];

    document.getElementById('event-title').innerText = `[${cat.toUpperCase()}] ${ev.titre}`;
    document.getElementById('event-desc').innerText = ev.desc;
    
    let container = document.getElementById('event-choices');
    container.innerHTML = "";
    
    ev.choix.forEach(c => {
        let btn = document.createElement('button');
        btn.className = "btn-choix";
        btn.innerText = c.txt;
        btn.onclick = () => {
            c.action();
            prochaineEtapeEvenement();
        };
        container.appendChild(btn);
    });
    
    showScreen('screen-event');
}

// --- SYSTÈMES ET ONGLETS ---
function ouvrirProfil() {
    let poss = joueur.possessions.length > 0 ? joueur.possessions.map(id => catalogue.find(c => c.id === id).nom).join(", ") : "Aucune";
    let eq = joueur.equipe.length > 0 ? joueur.equipe.map(r => r.nom).join(", ") : "Loup Solitaire";
    
    document.getElementById('contenu-profil').innerHTML = `
        <ul>
            <li><strong>Version :</strong> v0.0.7</li>
            <li><strong>Origine :</strong> Milieu ${joueur.milieu}</li>
            <li><strong>Statut :</strong> <span style="color:#ff7b72">${getStatutCriminel()}</span> (${joueur.braquagesReussis} coups réussis)</li>
            <li><strong>Argent Gagné Total :</strong> ${joueur.argentGagne.toLocaleString()} €</li>
            <li><strong>Argent Perdu Total :</strong> ${joueur.argentPerdu.toLocaleString()} €</li>
            <li><strong>Cash Blanchi :</strong> ${joueur.cashBlanchi.toLocaleString()} €</li>
            <li><strong>Compétences :</strong> Force ${joueur.stats.force} | Intel ${joueur.stats.intel} | Furtivité ${joueur.stats.furtivite}</li>
            <li><strong>Mental & Moral :</strong> Mental ${joueur.mental}/10 | Moralité ${joueur.moralite}/10</li>
            <li><strong>Réputation :</strong> Respect (+${joueur.respect}) | Crainte (${joueur.crainte})</li>
            <li><strong>Équipe :</strong> ${eq}</li>
            <li><strong>Propriétés :</strong> ${poss}</li>
        </ul>
    `;
    showScreen('screen-profil');
}

function ouvrirBoutique() {
    let html = "";
    let types = [...new Set(catalogue.map(item => item.type))];
    
    types.forEach(type => {
        html += `<h3 style="color:#d29922; border-bottom:1px solid #30363d; padding-bottom:5px;">${type}</h3>`;
        catalogue.filter(i => i.type === type).forEach(item => {
            let possede = joueur.possessions.includes(item.id);
            let asseyArgent = joueur.argent >= item.prix;
            let btn = possede ? "Acquis" : (asseyArgent ? `Acheter (${item.prix.toLocaleString()} €)` : "Fonds insuffisants");
            let disabled = (possede || !asseyArgent) ? "disabled" : "";

            html += `<div class="shop-item">
                <div class="shop-info"><h4>${item.nom}</h4><p>${item.desc}</p></div>
                <button class="btn-achat" ${disabled} onclick="acheterItem('${item.id}')">${btn}</button>
            </div>`;
        });
    });
    document.getElementById('boutique-liste').innerHTML = html;
    showScreen('screen-boutique');
}

function acheterItem(id) {
    let item = catalogue.find(i => i.id === id);
    if (joueur.argent >= item.prix && !joueur.possessions.includes(id)) {
        joueur.argent -= item.prix;
        joueur.argentPerdu += item.prix;
        joueur.possessions.push(id);
        item.effet(); 
        updateStats();
        ouvrirBoutique(); 
    }
}

function ouvrirRecrutement() {
    let html = "";
    if(joueur.equipe.length > 0) {
        html += `<h3 style="color:#79c0ff">Votre Équipe Actuelle</h3>`;
        joueur.equipe.forEach((eq, index) => {
            html += `<div style="background:#0d1117; padding:10px; margin-bottom:10px; border:1px solid #30363d; border-radius:4px;">
                <strong>${eq.nom}</strong> (Spé: ${eq.role})<br>
                <button class="btn-action" style="padding:5px 10px; margin-top:5px; border-radius:4px;" onclick="virerRecrue(${index})">Virer</button>
            </div>`;
        });
        html += `<hr style="border-color:#30363d">`;
    }

    html += `<h3 style="color:#2ea043">À Embaucher</h3>`;
    recruesDispo.forEach(r => {
        let dejaEquipe = joueur.equipe.find(e => e.id === r.id);
        if(!dejaEquipe) {
            let coutReel = Math.max(2000, r.cout - (joueur.respect * 500));
            let peutPayer = joueur.argent >= coutReel;
            html += `<div style="background:#21262d; padding:10px; margin-bottom:10px; border:1px solid #30363d; border-radius:4px;">
                <strong>${r.nom}</strong> | Spé: ${r.role} (-${r.bonus} difficulté)<br>
                <small>Prime : ${coutReel.toLocaleString()} €</small><br>
                <button class="btn-choix" ${!peutPayer ? 'disabled' : ''} style="padding:8px; margin-top:5px" onclick="embaucher('${r.id}', ${coutReel})">Engager</button>
            </div>`;
        }
    });
    document.getElementById('liste-recrues').innerHTML = html;
    showScreen('screen-recrutement');
}

function embaucher(id, cout) {
    let r = recruesDispo.find(x => x.id === id);
    if(joueur.argent >= cout) {
        joueur.argent -= cout;
        joueur.argentPerdu += cout;
        joueur.equipe.push({ ...r });
        updateStats();
        ouvrirRecrutement();
        genererMissionsHub(); 
    }
}

function virerRecrue(index) {
    joueur.equipe.splice(index, 1);
    joueur.moralite = Math.max(0, joueur.moralite - 1);
    joueur.crainte += 2;
    updateStats();
    ouvrirRecrutement();
    genererMissionsHub();
}

function ouvrirArbre() {
    document.getElementById('pts-comp').innerText = joueur.pointsCompetence;
    showScreen('screen-arbre');
}

function ameliorerArbre(stat) {
    let msgBox = document.getElementById('msg-arbre');
    if (joueur.pointsCompetence > 0) {
        joueur.pointsCompetence -= 1;
        joueur.buffs[stat] += 10;
        msgBox.style.display = 'block';
        msgBox.style.background = '#238636';
        msgBox.innerText = `Succès ! +${joueur.buffs[stat]}% de bonus en ${stat}.`;
        document.getElementById('pts-comp').innerText = joueur.pointsCompetence;
        updateStats();
        genererMissionsHub(); 
    } else {
        msgBox.style.display = 'block';
        msgBox.style.background = '#da3633';
        msgBox.innerText = "Pas de Points de Compétence (PC).";
    }
}

// --- BRAQUAGES, CONDITIONS DE COMPÉTENCES ET STORYTELLING EN COURS ---
function estimerReussite(diff, typeStat) {
    let statVal = joueur.stats[typeStat];
    let bonusEq = joueur.equipe.reduce((acc, curr) => acc + (curr.role === typeStat ? curr.bonus : 0), 0);
    
    let score = statVal + bonusEq - joueur.niveauSurveillance;
    let malusMental = (10 - joueur.mental) * 2;
    
    let proba = 50 + (score - diff) * 10 - malusMental;
    proba -= Math.floor(joueur.heat / 2); 
    
    if(typeStat === 'furtivite' && statVal < 5) proba -= 25; // Risque grand à taux bas
    
    if(proba > 95) return 95;
    if(proba < 5) return 5;
    return Math.floor(proba);
}

function genererMissionsHub() {
    let v = monde[joueur.ville];
    let cF = v.faible[Math.min(indexCible.faible, v.faible.length - 1)];
    let cM = v.modere[Math.min(indexCible.modere, v.modere.length - 1)];
    let cE = v.eleve[Math.min(indexCible.eleve, v.eleve.length - 1)];

    document.getElementById('hub-targets').innerHTML = `
        <button class="btn-choix" onclick="preparerCasse('faible', ${cF.diff}, ${cF.butin}, '${cF.nom}')">
            🟢 [Fantôme ~${estimerReussite(cF.diff, 'furtivite')}% | Intel ~${estimerReussite(cF.diff, 'intel')}%] ${cF.nom}
        </button>
        <button class="btn-choix" onclick="preparerCasse('modere', ${cM.diff}, ${cM.butin}, '${cM.nom}')">
            🟠 [Fantôme ~${estimerReussite(cM.diff, 'furtivite')}% | Intel ~${estimerReussite(cM.diff, 'intel')}%] ${cM.nom}
        </button>
        <button class="btn-choix" onclick="preparerCasse('eleve', ${cE.diff}, ${cE.butin}, '${cE.nom}')">
            🔴 [Fantôme ~${estimerReussite(cE.diff, 'furtivite')}% | Intel ~${estimerReussite(cE.diff, 'intel')}%] ${cE.nom}
        </button>
    `;
}

function preparerCasse(niveau, diff, butin, nom) {
    cibleActuelle = { niveau: niveau, nom: nom, diff: diff, butin: butin };
    document.getElementById('prep-desc').innerText = `Cible : ${nom}`;
    document.getElementById('prep-butin').innerText = butin.toLocaleString();
    showScreen('screen-prep');
}

function validerPrep() {
    document.getElementById('action-title').innerText = cibleActuelle.nom;
    
    // Contraintes de Hacking (Intel) : 5 pour simple, 10 moyen, 15 dur
    let niveauCibleReq = cibleActuelle.niveau === 'faible' ? 5 : (cibleActuelle.niveau === 'modere' ? 10 : 15);
    let disabledIntel = joueur.stats.intel < niveauCibleReq ? `disabled style="opacity:0.5; cursor:not-allowed;"` : ``;
    let texteIntel = joueur.stats.intel < niveauCibleReq ? `🧠 Approche Cyber (Requis : ${niveauCibleReq} Intel - Insuffisant)` : `🧠 Approche Cyber (Hacking validé)`;

    document.getElementById('action-choices').innerHTML = `
        <button class="btn-choix" onclick="lancerMiniScenarioAction('furtivite', false)">🥷 Approche Fantôme (Risqué si bas)</button>
        <button class="btn-choix" ${disabledIntel} onclick="${joueur.stats.intel >= niveauCibleReq ? "lancerMiniScenarioAction('intel', false)" : ""}"> ${texteIntel}</button>
        <button class="btn-choix" onclick="lancerMiniScenarioAction('force', true)">💪 Approche Frontale (Risques accrus)</button>
    `;
    showScreen('screen-action');
}

// Mini-scénario narratif pendant le braquage
function lancerMiniScenarioAction(stat, estViolent) {
    let scnes = [
        "Les caméras de surveillance pivotent. Le cœur bat la chamade dans la cage thoracique...",
        "Un vigile fait une ronde inattendue tout près de votre position exacte.",
        "Le système central émet un signal d'alerte temporaire. Il faut improviser immédiatement."
    ];
    let texteStory = scnes[Math.floor(Math.random() * scnes.length)];

    document.getElementById('action-title').innerText = "Imprévu sur place !";
    document.getElementById('action-choices').innerHTML = `
        <p style="background:#21262d; padding:15px; border-radius:6px; text-align:left; border-left:4px solid #da3633;">${texteStory}</p>
        <button class="btn-choix btn-action" onclick="resoudreAction('${stat}', ${estViolent})">Foncer et exécuter le plan</button>
    `;
}

function resoudreAction(stat, estViolent) {
    joueur.mois += 2; 
    if(joueur.mois >= 12) { joueur.age++; joueur.mois -= 12; }
    
    if(estViolent) {
        joueur.moralite = Math.max(0, joueur.moralite - 2);
        joueur.mental = Math.max(1, joueur.mental - 1);
        joueur.crainte += 3;
    } else {
        joueur.moralite = Math.min(10, joueur.moralite + 1);
        joueur.respect += 2;
    }

    let difficulte = cibleActuelle.diff;
    if (joueur.originType === 'Défavorisé') difficulte += 1;
    if (joueur.originType === 'Riche') difficulte -= 1;

    joueur.equipe.forEach(r => { if(r.role === stat) difficulte -= r.bonus; });

    let jet = Math.floor(Math.random() * 10) + 1;
    let scoreFinal = (joueur.stats[stat] + jet) - joueur.niveauSurveillance;
    let mult = 1 + (joueur.buffs[stat] / 100);
    scoreFinal = scoreFinal * mult;

    if(stat === 'furtivite' && joueur.stats.furtivite < 5) scoreFinal -= 3; // Malus furtivité basse
    if(joueur.heat > 50) scoreFinal -= 2;

    let blesseFlics = estViolent ? Math.floor(Math.random() * 3) : 0;
    let mortFlics = estViolent && Math.random() > 0.7 ? 1 : 0;
    let blesseCivils = estViolent ? Math.floor(Math.random() * 2) : 0;
    let mortAllie = 0;
    let mortJoueur = false;

    if (scoreFinal >= difficulte + 4) {
        // SUCCÈS
        let partEquipe = cibleActuelle.butin * (0.15 * joueur.equipe.length);
        let butinJoueur = Math.floor(cibleActuelle.butin - partEquipe);
        
        joueur.argent += butinJoueur;
        joueur.argentGagne += butinJoueur;
        
        // Gestion blanchisserie
        if(joueur.blanchisserie) {
            let partBlanchie = Math.floor(butinJoueur * 0.7);
            joueur.cashBlanchi += partBlanchie;
        }

        joueur.pointsCompetence += 1;
        joueur.braquagesReussis += 1;
        joueur.heat += 20; 
        if (stat === 'force') joueur.risquePrison += 20;

        indexCible[cibleActuelle.niveau]++; 
        afficherDebrief(true, butinJoueur, 0, blesseFlics, mortFlics, blesseCivils, 0, false);
    } else {
        // ÉCHEC / ALERTE POLICE
        // Risque de mort d'un allié ou du joueur si police prévenue
        if(Math.random() < 0.15 && joueur.equipe.length > 0) {
            mortAllie = 1;
            joueur.equipe.pop(); // Un allié meurt
        }
        if(Math.random() < 0.03) {
            mortJoueur = true;
        }

        if(mortJoueur) {
            afficherEcranFin("Mort en Intervention", "La police a ouvert le feu. Vous n'avez pas survécu.");
            return;
        }

        afficherDebrief(false, 0, mortAllie, blesseFlics, mortFlics, blesseCivils, 0, true);
    }
}

// --- ÉCRAN DE DÉBRIEFING POST-BRAQUAGE ---
function afficherDebrief(reussi, butin, mortAllie, blesseFlics, mortFlics, blesseCivils, mortCivils, arrete) {
    let html = `
        <h3 style="color:${reussi ? '#2ea043' : '#da3633'}">${reussi ? 'Coup Réussi avec Succès' : 'Opération Compromise'}</h3>
        <p><strong>Butin net empoché :</strong> ${butin.toLocaleString()} €</p>
        <hr style="border-color:#30363d">
        <h4>Bilan Humain :</h4>
        <ul>
            <li>Policiers blessés : ${blesseFlics}</li>
            <li>Policiers tués : ${mortFlics}</li>
            <li>Civils blessés : ${blesseCivils}</li>
            <li>Civils tués : ${mortCivils}</li>
            <li>Alliés perdus (morts) : ${mortAllie}</li>
        </ul>
    `;
    document.getElementById('debrief-content').innerHTML = html;
    
    // Bouton de suite
    let btnSuite = document.getElementById('debrief-btn');
    if(arrete) {
        btnSuite.innerText = "Aller en case prison...";
        btnSuite.onclick = () => { allerEnPrison("Arrêté suite au fiasco de l'opération."); };
    } else {
        btnSuite.innerText = "Gérer les conséquences (Événements)";
        btnSuite.onclick = () => { lancerSequenceEvenements(); };
    }

    showScreen('screen-debrief');
}

// --- PRISON ET FIN DE JEU ---
function allerEnPrison(raison) {
    joueur.enPrison = true;
    let annees = Math.floor(Math.random() * 4) + 2 + Math.floor(joueur.risquePrison / 15);
    if (joueur.originType === 'Riche') annees = Math.max(1, annees - 2);
    if(joueur.crainte > 10) { annees += 2; joueur.mental = Math.max(1, joueur.mental - 3); }
    
    joueur.peineActuelle = annees;
    
    // Saisie proportionnelle : seule l'argent non blanchi subit la grosse saisie
    let cashNonBlanchi = Math.max(0, joueur.argent - joueur.cashBlanchi);
    let amendeBase = annees * 15000;
    
    let montantSaisi = Math.min(cashNonBlanchi, amendeBase);
    joueur.argent -= montantSaisi;
    joueur.argentPerdu += montantSaisi;

    // Si on tombe en dessous de 0, on gère le découvert
    let texteDecouvert = joueur.argent < 0 ? ` Vous êtes à DÉCOUVERT de ${Math.abs(joueur.argent).toLocaleString()} € !` : "";
    
    let texteArgent = `L'État a saisi ${montantSaisi.toLocaleString()} € sur vos fonds non blanchis.${texteDecouvert} Vos ${joueur.cashBlanchi.toLocaleString()} € blanchis sont restés intouchables.`;
    
    document.getElementById('prison-text').innerText = `${raison} Verdict : ${annees} ans fermes. ${texteArgent}`;
    showScreen('screen-prison');
}

function purgerPeine() {
    joueur.age += joueur.peineActuelle;
    joueur.risquePrison = 0; 
    joueur.heat = 0; 
    joueur.enPrison = false;
    joueur.niveauSurveillance += 1; 
    joueur.mental = Math.min(10, joueur.mental + 2); 

    if (joueur.age >= 65) {
        afficherEcranFin("Mort en Cellule", `Vous vous éteignez en prison à l'âge de ${joueur.age} ans.`);
    } else {
        notify(`Libéré après ${joueur.peineActuelle} ans.`);
        genererMissionsHub();
        showScreen('screen-hub');
    }
}

function terminerJeu(raison) {
    if (raison === 'retraite') {
        let titre = joueur.argent < 100000 ? "Retraite Misérable" : (joueur.argent < 2000000 ? "Retraite Dorée" : "LÉGENDE VIVANTE");
        let description = `Vous prenez votre retraite avec ${joueur.argent.toLocaleString()} € (Gagné total : ${joueur.argentGagne.toLocaleString()} € / Perdu : ${joueur.argentPerdu.toLocaleString()} €).`;
        afficherEcranFin(titre, description);
    }
}

function afficherEcranFin(titre, description) {
    let div = document.getElementById('end-text');
    div.innerHTML = `
        <h3 style="color:#ff7b72; margin-top:0;">${titre}</h3>
        <p>${description}</p>
        <hr style="border-color:#30363d; margin: 15px 0;">
        <ul style="list-style-type:none; padding:0; font-size: 14px;">
            <li><strong>Âge final :</strong> ${joueur.age} ans</li>
            <li><strong>Fortune actuelle :</strong> ${joueur.argent.toLocaleString()} €</li>
            <li><strong>Statut :</strong> ${getStatutCriminel()}</li>
        </ul>
    `;
    showScreen('screen-end');
}
