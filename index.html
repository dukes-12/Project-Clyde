// --- DONNÉES DU JEU ---
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
    // Formations
    { id: 'f_intel', type: 'Formation', nom: "Cours de Hacking", desc: "+3 Intelligence", prix: 15000, effet: () => joueur.stats.intel += 3 },
    { id: 'f_force', type: 'Formation', nom: "Entraînement Militaire", desc: "+3 Force", prix: 15000, effet: () => joueur.stats.force += 3 },
    { id: 'f_furt', type: 'Formation', nom: "Stage de Parkour", desc: "+3 Furtivité", prix: 15000, effet: () => joueur.stats.furtivite += 3 },
    // Matériel
    { id: 'm_drone', type: 'Matériel', nom: "Mini-Drone", desc: "+1 Furtivité permanent", prix: 50000, effet: () => joueur.stats.furtivite += 1 },
    { id: 'm_c4', type: 'Matériel', nom: "Pain de C4", desc: "+1 Force permanent", prix: 50000, effet: () => joueur.stats.force += 1 },
    // Véhicules
    { id: 'v_moto', type: 'Véhicules', nom: "Moto Cross Rodée", desc: "Facilite les fuites (Moins de Heat)", prix: 35000, effet: () => joueur.vehicule = "Moto" },
    { id: 'v_camion', type: 'Véhicules', nom: "Fourgon Blindé Volé", desc: "Protection accrue et espace pour le magot", prix: 120000, effet: () => joueur.vehicule = "Fourgon" },
    // Immobilier
    { id: 'i_planque', type: 'Immobilier', nom: "Planque Sécurisée", desc: "Baisse le risque d'arrestation de 30%", prix: 150000, effet: () => joueur.risquePrison = Math.max(0, joueur.risquePrison - 30) },
    { id: 'i_blanchisseur', type: 'Immobilier', nom: "Réseau de Blanchisserie", desc: "Protège ton cash : perte en prison réduite à 10%", prix: 100000, effet: () => joueur.blanchisserie = true }
];

const evenementsHistoriques = [
    {
        titre: "La Taupe au Commissariat",
        desc: "Un contact corrompu au poste de police propose de vendre des dossiers confidentiels.",
        choix: [
            { txt: "Acheter les dossiers (20 000 € -> Baisse le risque de 15%)", action: () => { if(joueur.argent >= 20000) { joueur.argent -= 20000; joueur.risquePrison = Math.max(0, joueur.risquePrison - 15); notify("Risque réduit."); } else { alert("Pas assez d'argent !"); } } },
            { txt: "Tenter de l'extorquer (Heat +25%)", action: () => { joueur.heat += 25; notify("La taupe a paniqué ! Heat +25%"); } },
            { txt: "Ignorer", action: () => { notify("Vous passez votre chemin."); } }
        ]
    },
    {
        titre: "Le Maître Chanteur",
        desc: "Un petit escroc détient des photos compromettantes.",
        choix: [
            { txt: "Payer sa tribut (10 000 €)", action: () => { if(joueur.argent >= 10000) { joueur.argent -= 10000; notify("Silence acheté."); } else { alert("Pas assez d'argent !"); } } },
            { txt: "Régler l'affaire violemment (Heat +20%)", action: () => { joueur.heat += 20; notify("Problème réglé, mais la tension monte."); } },
            { txt: "Le menacer (5 000 € + Intel 5 requis)", action: () => { if(joueur.argent >= 5000 && joueur.stats.intel >= 5) { joueur.argent -= 5000; notify("Il s'est enfui."); } else { notify("Échec ! Heat +15%"); joueur.heat += 15; } } }
        ]
    },
    {
        titre: "Le Matériel Militaire",
        desc: "Un ex-militaire vend du matériel de pointe.",
        choix: [
            { txt: "Acheter le lot (40 000 € -> +1 stat aléatoire)", action: () => { if(joueur.argent >= 40000) { joueur.argent -= 40000; let s = ['force', 'intel', 'furtivite'][Math.floor(Math.random()*3)]; joueur.stats[s] += 1; notify(`+1 en ${s}.`); } else { alert("Fonds insuffisants."); } } },
            { txt: "Négocier (15 000 € -> 50% de chance)", action: () => { if(joueur.argent >= 15000 && Math.random() > 0.5) { joueur.argent -= 15000; joueur.stats.force += 1; notify("Négociation réussie ! +1 Force."); } else { joueur.argent -= 15000; notify("Il est parti furieux."); } } },
            { txt: "Refuser", action: () => { notify("Refusé."); } }
        ]
    },
    {
        titre: "L'Héritage Encombrant",
        desc: "Un vieux complice vous lègue sa planque secondaire pleine de cash.",
        choix: [
            { txt: "Tout récupérer (+50 000 €, Risque +10%)", action: () => { joueur.argent += 50000; joueur.risquePrison += 10; notify("Magot récupéré."); } },
            { txt: "Prendre la moitié (+25 000 €, Risque +2%)", action: () => { joueur.argent += 25000; joueur.risquePrison += 2; notify("Récupération prudente."); } },
            { txt: "Laisser tomber", action: () => { notify("Ignoré."); } }
        ]
    },
    {
        titre: "La Trahison de l'Équipe",
        desc: "Un membre de votre équipe discute avec la police.",
        choix: [
            { txt: "Le virer et le menacer", action: () => { if(joueur.equipe.length > 0) { joueur.equipe.pop(); notify("Le traître est viré."); } else { notify("Personne à virer."); } } },
            { txt: "En faire un double agent (Intel 6 requis)", action: () => { if(joueur.stats.intel >= 6) { notify("Il vous refile de faux tuyaux."); joueur.risquePrison = Math.max(0, joueur.risquePrison - 10); } else { notify("Échec ! Risque +30%"); joueur.risquePrison += 30; } } },
            { txt: "L'ignorer", action: () => { joueur.risquePrison += 25; notify("Vous faites l'autruche."); } }
        ]
    },
    {
        titre: "L'Offre du Parrain",
        desc: "Un caïd local vous propose un partenariat.",
        choix: [
            { txt: "Accepter l'alliance (+100 000 €, bloque les choix de cibles un moment)", action: () => { joueur.argent += 100000; notify("Partenariat signé."); } },
            { txt: "Demander du cash direct (+30 000 €)", action: () => { joueur.argent += 30000; notify("Cash perçu."); } },
            { txt: "Refuser", action: () => { notify("Refusé."); } }
        ]
    },
    {
        titre: "La Panique Médiatique",
        desc: "Un journaliste diffuse un reportage à charge sur vous.",
        choix: [
            { txt: "Changer de look et faux papiers (30 000 € -> Annule le fichage)", action: () => { if(joueur.argent >= 30000) { joueur.argent -= 30000; joueur.niveauSurveillance = 0; notify("Surveillance effacée."); } else { alert("Fonds insuffisants."); } } },
            { txt: "Intimider le journaliste (Force 6 requis)", action: () => { if(joueur.stats.force >= 6) { notify("Article retiré."); } else { notify("Échec ! Surveillance +1"); joueur.niveauSurveillance += 1; } } },
            { txt: "Laisser couler (Heat +15%)", action: () => { joueur.heat += 15; notify("L'orage passera."); } }
        ]
    },
    {
        titre: "Une Dette de Jeu",
        desc: "Un parieur ruiné connaît une faille bancaire.",
        choix: [
            { txt: "Payer sa dette (15 000 € -> Gagne 50 000 €)", action: () => { if(joueur.argent >= 15000) { joueur.argent -= 15000; joueur.argent += 50000; notify("Faille exploitée ! +50 000 €"); } else { alert("Pas assez d'argent."); } } },
            { txt: "Le braquer (Furtivité 6 requis)", action: () => { if(joueur.stats.furtivite >= 6) { joueur.argent += 20000; notify("Notes volées discrètement."); } else { notify("Il a crié ! Heat +20%"); joueur.heat += 20; } } },
            { txt: "Passer son chemin", action: () => { notify("Ignoré."); } }
        ]
    },
    {
        titre: "Le Témoin Gênant",
        desc: "Un passant vous a filmé.",
        choix: [
            { txt: "Acheter son silence (25 000 €)", action: () => { if(joueur.argent >= 25000) { joueur.argent -= 25000; notify("Vidéo achetée."); } else { alert("Fonds insuffisants."); } } },
            { txt: "Piratage cloud (Intel 6 requis)", action: () => { if(joueur.stats.intel >= 6) { notify("Cloud nettoyé."); } else { notify("Échec, vidéo publiée ! Risque +20%"); joueur.risquePrison += 20; } } },
            { txt: "Menace physique (Force 5 requis)", action: () => { if(joueur.stats.force >= 5) { notify("Il ne parlera plus."); } else { notify("Il s'est débattu ! Heat +15%"); joueur.heat += 15; } } }
        ]
    },
    {
        titre: "L'Appel d'un Proche",
        desc: "Un proche traverse une grave difficulté financière.",
        choix: [
            { txt: "Aider généreusement (20 000 € -> Baisse le Heat)", action: () => { if(joueur.argent >= 20000) { joueur.argent -= 20000; joueur.heat = Math.max(0, joueur.heat - 15); notify("Aide apportée, esprit serein."); } else { alert("Pas assez d'argent."); } } },
            { txt: "Petite aide (5 000 €)", action: () => { if(joueur.argent >= 5000) { joueur.argent -= 5000; notify("Soulagement partiel."); } else { alert("Fonds insuffisants."); } } },
            { txt: "Refuser", action: () => { notify("Coupé court."); } }
        ]
    }
];

let joueur = {
    milieu: "", originType: "", age: 20, mois: 0,
    argent: 0, ville: "", 
    risquePrison: 0, enPrison: false, niveauSurveillance: 0,
    heat: 0, 
    braquagesReussis: 0,
    blanchisserie: false,
    vehicule: "Aucun",
    mental: 8, // 1 à 10
    moralite: 10, // 0 à 10
    respect: 0,
    crainte: 0,
    stats: { force: 3, intel: 3, furtivite: 3 },
    buffs: { force: 0, intel: 0, furtivite: 0 },
    pointsCompetence: 0, possessions: [], equipe: []
};

let cibleActuelle = null;
let indexCible = { faible: 0, modere: 0, eleve: 0 };

// --- NAVIGATION ET UI ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    let statsBar = document.getElementById('global-stats');
    if(['screen-start', 'screen-milieu', 'screen-ville', 'screen-story', 'screen-end', 'screen-event'].includes(screenId)) {
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
        <div>💰 Cash: ${joueur.argent.toLocaleString()} €</div>
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
        joueur.argent = 20000; // 20K euros de départ pour le riche
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
    
    // Générer l'histoire d'introduction
    genererStorytelling();
    showScreen('screen-story');
}

function genererStorytelling() {
    let histoires = {
        "Paris": `Né dans les ${joueur.milieu}, vous avez débarqué dans la capitale française avec des rêves de grandeur et les dents longues. Entre les ruelles sombres de Montmartre et les patrouilles de police sur les boulevards, vos premiers pas dans le milieu parisien ont été marqués par la débrouille. Aujourd'hui, vous avez trouvé une planque discrète. Le jeu commence.`,
        "New York": `Arrivé à New York en provenance directe de votre milieu ${joueur.milieu.toLowerCase()}, la Grosse Pomme ne vous a fait aucun cadeau. Entre la pègre de Brooklyn et la pression des fédéraux, vous avez dû apprendre vite pour survivre. Votre planque de fortune est prête. New York n'attend que vous.`,
        "Los Angeles": `Sous le soleil de Los Angeles, derrière le vernis d'Hollywood et des plages de Venice, se cache une pègre violente et lucrative. Issu du milieu ${joueur.milieu.toLowerCase()}, vous savez que pour percer ici, il faut frapper fort et ne jamais baisser les yeux. Votre planque est installée. Il est temps de faire parler de vous.`
    };
    document.getElementById('story-text').innerText = histoires[joueur.ville];
}

function entrerDansLaPlanque() {
    document.getElementById('hub-ville-nom').innerText = joueur.ville;
    genererMissionsHub();
    notify(`Bienvenue à ${joueur.ville}. Votre planque est opérationnelle.`);
    showScreen('screen-hub');
}

function calmerLeJeu() {
    joueur.mois += 6;
    if(joueur.mois >= 12) {
        joueur.age += 1;
        joueur.mois -= 12;
    }
    joueur.heat = Math.max(0, joueur.heat - 30);
    joueur.mental = Math.min(10, joueur.mental + 1); // Repos = remonte le mental
    notify("Vous avez fait profil bas pendant 6 mois. La tension redescend et votre esprit s'apaise.");
    genererMissionsHub(); 
    updateStats();
}

// --- SYSTÈMES ET ONGLETS ---
function ouvrirProfil() {
    let poss = joueur.possessions.length > 0 ? joueur.possessions.map(id => catalogue.find(c => c.id === id).nom).join(", ") : "Aucune";
    let eq = joueur.equipe.length > 0 ? joueur.equipe.map(r => r.nom).join(", ") : "Loup Solitaire";
    
    document.getElementById('contenu-profil').innerHTML = `
        <ul>
            <li><strong>Origine :</strong> Milieu ${joueur.milieu}</li>
            <li><strong>Statut :</strong> <span style="color:#ff7b72">${getStatutCriminel()}</span> (${joueur.braquagesReussis} coups réussis)</li>
            <li><strong>Compétences brutes :</strong> Force ${joueur.stats.force} | Intel ${joueur.stats.intel} | Furtivité ${joueur.stats.furtivite}</li>
            <li><strong>Mental & Moral :</strong> Mental ${joueur.mental}/10 | Moralité ${joueur.moralite}/10</li>
            <li><strong>Réputation :</strong> Respect (+${joueur.respect}) | Crainte (${joueur.crainte})</li>
            <li><strong>Véhicule :</strong> ${joueur.vehicule}</li>
            <li><strong>Blanchisserie :</strong> ${joueur.blanchisserie ? 'Active (Perte 10% max)' : 'Inactive'}</li>
            <li><strong>Équipe engagée :</strong> ${eq}</li>
            <li><strong>Propriétés acquises :</strong> ${poss}</li>
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
                <strong>${eq.nom}</strong> (Spé: ${eq.role} | Moralité: ${eq.moralite} | Affection: ${eq.affection}%)<br>
                <button class="btn-action" style="padding:5px 10px; margin-top:5px; border-radius:4px;" onclick="virerRecrue(${index})">Virer / Se débarrasser</button>
            </div>`;
        });
        html += `<hr style="border-color:#30363d">`;
    }

    html += `<h3 style="color:#2ea043">À Embaucher</h3>`;
    recruesDispo.forEach(r => {
        let dejaEquipe = joueur.equipe.find(e => e.id === r.id);
        if(!dejaEquipe) {
            // Le respect réduit le coût d'embauche
            let coutReel = Math.max(2000, r.cout - (joueur.respect * 500));
            let peutPayer = joueur.argent >= coutReel;
            html += `<div style="background:#21262d; padding:10px; margin-bottom:10px; border:1px solid #30363d; border-radius:4px;">
                <strong>${r.nom}</strong> | Spé: ${r.role} (-${r.bonus} difficulté)<br>
                <small>Prime ajustée : ${coutReel.toLocaleString()} € + 15% du butin</small><br>
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
        // Copie de l'objet pour éviter de modifier le modèle global
        let recrueEmbauchee = { ...r };
        joueur.equipe.push(recrueEmbauchee);
        updateStats();
        ouvrirRecrutement();
        genererMissionsHub(); 
    }
}

function virerRecrue(index) {
    let recrue = joueur.equipe[index];
    joueur.equipe.splice(index, 1);
    
    // Se débarrasser d'un membre impacte le moral des autres
    joueur.moralite = Math.max(0, joueur.moralite - 1);
    joueur.crainte += 2;
    joueur.equipe.forEach(r => { r.affection -= 20; });
    
    notify(`Vous vous êtes débarrassé de ${recrue.nom}. Les autres membres frémissent.`);
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
        msgBox.innerText = `Succès ! L'approche [${stat}] bénéficie désormais de +${joueur.buffs[stat]}% de bonus.`;
        document.getElementById('pts-comp').innerText = joueur.pointsCompetence;
        updateStats();
        genererMissionsHub(); 
    } else {
        msgBox.style.display = 'block';
        msgBox.style.background = '#da3633';
        msgBox.innerText = "Fonds insuffisants. Vous n'avez pas de Points de Compétence (PC).";
    }
}

// --- BRAQUAGES ET PROBABILITÉS ---
function estimerReussite(diff) {
    let statMax = Math.max(
        joueur.stats.force * (1 + joueur.buffs.force/100),
        joueur.stats.intel * (1 + joueur.buffs.intel/100),
        joueur.stats.furtivite * (1 + joueur.buffs.furtivite/100)
    );
    let bonusEq = joueur.equipe.reduce((acc, curr) => acc + curr.bonus, 0);
    
    let score = statMax + bonusEq - joueur.niveauSurveillance;
    if(joueur.originType === 'Défavorisé') score -= 1;
    if(joueur.originType === 'Riche') score += 1;
    
    // Le mental affecte la réussite
    let malusMental = (10 - joueur.mental) * 2;
    
    let proba = 50 + (score - diff) * 10 - malusMental;
    proba -= Math.floor(joueur.heat / 2); 
    
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
            🟢 [${estimerReussite(cF.diff)} %] ${cF.nom}
        </button>
        <button class="btn-choix" onclick="preparerCasse('modere', ${cM.diff}, ${cM.butin}, '${cM.nom}')">
            🟠 [${estimerReussite(cM.diff)} %] ${cM.nom}
        </button>
        <button class="btn-choix" onclick="preparerCasse('eleve', ${cE.diff}, ${cE.butin}, '${cE.nom}')">
            🔴 [${estimerReussite(cE.diff)} %] ${cE.nom}
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
    document.getElementById('action-choices').innerHTML = `
        <button class="btn-choix" onclick="resoudreAction('furtivite', false)">🥷 Approche Fantôme (Propre, discrète)</button>
        <button class="btn-choix" onclick="resoudreAction('intel', false)">🧠 Approche Cyber (Piratage, sans violence)</button>
        <button class="btn-choix" onclick="resoudreAction('force', true)">💪 Approche Frontale / Violente (Armes, blessés potentiels)</button>
    `;
    showScreen('screen-action');
}

function resoudreAction(stat, estViolent) {
    joueur.mois += 2; 
    if(joueur.mois >= 12) { joueur.age++; joueur.mois -= 12; }
    
    // Impact violence sur la moralité et le mental
    if(estViolent) {
        joueur.moralite = Math.max(0, joueur.moralite - 2);
        joueur.mental = Math.max(1, joueur.mental - 1); // La violence pèse sur le mental
        joueur.crainte += 3;
    } else {
        joueur.moralite = Math.min(10, joueur.moralite + 1);
        joueur.respect += 2;
    }

    // Vérifier si un membre de l'équipe se révolte à cause de la moralité basse
    let trahisonEnCours = false;
    joueur.equipe.forEach((r, index) => {
        if(joueur.moralite < r.moralite || r.affection <= 10) {
            trahisonEnCours = true;
            joueur.equipe.splice(index, 1);
            alert(`TRAHISON ! ${r.nom} a jugé vos méthodes abjectes et a déserté en prévenant ses contacts. Risque +25% !`);
            joueur.risquePrison += 25;
        }
    });

    if(trahisonEnCours) {
        showScreen('screen-hub');
        return;
    }

    let difficulte = cibleActuelle.diff;
    if (joueur.originType === 'Défavorisé') difficulte += 1;
    if (joueur.originType === 'Riche') difficulte -= 1;

    joueur.equipe.forEach(r => { if(r.role === stat) difficulte -= r.bonus; });

    let jet = Math.floor(Math.random() * 10) + 1;
    let scoreFinal = (joueur.stats[stat] + jet) - joueur.niveauSurveillance;
    
    let mult = 1 + (joueur.buffs[stat] / 100);
    scoreFinal = scoreFinal * mult;

    // Malus mental
    scoreFinal -= (10 - joueur.mental) * 0.5;

    if(joueur.heat > 50) scoreFinal -= 2;

    if (scoreFinal >= difficulte + 4) {
        let partEquipe = cibleActuelle.butin * (0.15 * joueur.equipe.length);
        let butinJoueur = Math.floor(cibleActuelle.butin - partEquipe);
        
        joueur.argent += butinJoueur;
        joueur.pointsCompetence += 1;
        joueur.braquagesReussis += 1;
        joueur.heat += 20; 
        
        if (stat === 'force') joueur.risquePrison += 20;
        if (joueur.originType === 'Riche') joueur.risquePrison += 5;

        indexCible[cibleActuelle.niveau]++; 
        
        notify(`Coup réussi ! Butin net : ${butinJoueur.toLocaleString()} € (+1 PC)`);
        
        // 40% de chance d'événement aléatoire narratif après un braquage
        if (Math.random() < 0.4) {
            declencherEvenementAleatoire();
        } else {
            genererMissionsHub();
            showScreen('screen-hub');
        }
    } else {
        allerEnPrison("L'opération a foiré. Les gyrophares vous encerclent.");
    }
}

// --- GESTION DES ÉVÉNEMENTS ---
function declencherEvenementAleatoire() {
    let ev = evenementsHistoriques[Math.floor(Math.random() * evenementsHistoriques.length)];
    document.getElementById('event-title').innerText = ev.titre;
    document.getElementById('event-desc').innerText = ev.desc;
    
    let container = document.getElementById('event-choices');
    container.innerHTML = "";
    
    ev.choix.forEach(c => {
        let btn = document.createElement('button');
        btn.className = "btn-choix";
        btn.innerText = c.txt;
        btn.onclick = () => {
            c.action();
            genererMissionsHub();
            showScreen('screen-hub');
        };
        container.appendChild(btn);
    });
    
    showScreen('screen-event');
}

// --- PRISON ET FIN DE JEU ---
function allerEnPrison(raison) {
    joueur.enPrison = true;
    let annees = Math.floor(Math.random() * 4) + 2 + Math.floor(joueur.risquePrison / 15);
    if (joueur.originType === 'Riche') annees = Math.max(1, annees - 2);
    
    // Si la réputation est très crainte, la prison est plus violente (impacte le mental)
    if(joueur.crainte > 10) {
        annees += 2;
        joueur.mental = Math.max(1, joueur.mental - 3);
    }
    
    joueur.peineActuelle = annees;
    
    let tauxPerte = joueur.blanchisserie ? 0.10 : 0.50;
    let montantSaisi = Math.floor(joueur.argent * tauxPerte);
    joueur.argent -= montantSaisi;
    
    let texteArgent = joueur.blanchisserie 
        ? `Grâce à votre blanchisserie, l'État n'a saisi que 10% (${montantSaisi.toLocaleString()} €).`
        : `Sans blanchisserie, l'État a saisi la moitié de votre capital (${montantSaisi.toLocaleString()} €) !`;
    
    document.getElementById('prison-text').innerText = `${raison} Verdict : ${annees} ans fermes. ${texteArgent}`;
    showScreen('screen-prison');
}

function purgerPeine() {
    joueur.age += joueur.peineActuelle;
    joueur.risquePrison = 0; 
    joueur.heat = 0; 
    joueur.enPrison = false;
    joueur.niveauSurveillance += 1; 
    joueur.mental = Math.min(10, joueur.mental + 2); // Remonte un peu en sortant

    if (joueur.age >= 65) {
        afficherEcranFin("Mort en Cellule", `Le temps a eu raison de vous. Vous vous éteignez en prison à l'âge de ${joueur.age} ans.`);
    } else {
        notify(`Libéré après ${joueur.peineActuelle} ans.`);
        genererMissionsHub();
        showScreen('screen-hub');
    }
}

function terminerJeu(raison) {
    if (raison === 'retraite') {
        let titre = "";
        let description = "";
        
        if (joueur.argent < 100000) {
            titre = "Retraite Misérable";
            description = `Vous vous rangez avec seulement ${joueur.argent.toLocaleString()} €. Petit boulot mal payé jusqu'à la fin de vos jours.`;
        } else if (joueur.argent < 2000000) {
            titre = "Retraite Dorée";
            description = `Avec ${joueur.argent.toLocaleString()} €, vous blanchissez votre pactole et disparaissez au soleil.`;
        } else {
            titre = "LÉGENDE VIVANTE";
            description = `Fortune colossale de ${joueur.argent.toLocaleString()} €. Île paradisiaque achetée. Votre nom restera gravé à jamais.`;
        }
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
            <li><strong>Fortune conservée :</strong> ${joueur.argent.toLocaleString()} €</li>
            <li><strong>Statut :</strong> ${getStatutCriminel()}</li>
            <li><strong>Coups d'éclats réussis :</strong> ${joueur.braquagesReussis}</li>
        </ul>
    `;
    showScreen('screen-end');
}
