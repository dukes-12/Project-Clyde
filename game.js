// --- DONNÉES DU JEU ---
const monde = {
    "Paris": {
        faible: [{ nom: "Tabac-Presse", diff: 3, butin: 15000 }, { nom: "Pharmacie de garde", diff: 4, butin: 18000 }],
        modere: [{ nom: "Bijouterie Vendôme", diff: 6, butin: 250000 }, { nom: "Fourgon de fonds", diff: 7, butin: 300000 }],
        eleve: [{ nom: "Musée du Louvre", diff: 9, butin: 4000000 }, { nom: "Vente aux enchères", diff: 10, butin: 5000000 }]
    },
    "New York": {
        faible: [{ nom: "Prêteur sur gages", diff: 4, butin: 25000 }, { nom: "Supérette", diff: 4, butin: 20000 }],
        modere: [{ nom: "Fourgon Blindé", diff: 7, butin: 400000 }, { nom: "Boutique de luxe", diff: 6, butin: 350000 }],
        eleve: [{ nom: "Réserve Fédérale", diff: 10, butin: 8000000 }, { nom: "Banque de Manhattan", diff: 9, butin: 6000000 }]
    },
    "Los Angeles": {
        faible: [{ nom: "Dispensaire local", diff: 3, butin: 20000 }, { nom: "Station service", diff: 3, butin: 15000 }],
        modere: [{ nom: "Manoir à Beverly Hills", diff: 5, butin: 180000 }, { nom: "Bijoutier d'Hollywood", diff: 6, butin: 220000 }],
        eleve: [{ nom: "Casino Clandestin", diff: 8, butin: 3000000 }, { nom: "Dépôt d'or", diff: 9, butin: 4000000 }]
    }
};

const recruesDispo = [
    { id: 'r1', nom: 'Gueule d\'Ange', role: 'furtivite', bonus: 2, cout: 5000 },
    { id: 'r2', nom: 'Le Bulldozer', role: 'force', bonus: 3, cout: 8000 },
    { id: 'r3', nom: 'Neo', role: 'intel', bonus: 2, cout: 6000 }
];

const catalogue = [
    { id: 'f_intel', type: 'Formation', nom: "Cours de Hacking", desc: "+3 Intelligence", prix: 15000, effet: () => joueur.stats.intel += 3 },
    { id: 'f_force', type: 'Formation', nom: "Entraînement Militaire", desc: "+3 Force", prix: 15000, effet: () => joueur.stats.force += 3 },
    { id: 'f_furt', type: 'Formation', nom: "Stage de Parkour", desc: "+3 Furtivité", prix: 15000, effet: () => joueur.stats.furtivite += 3 },
    { id: 'm_drone', type: 'Matériel', nom: "Mini-Drone", desc: "+1 Furtivité permanent", prix: 50000, effet: () => joueur.stats.furtivite += 1 },
    { id: 'm_c4', type: 'Matériel', nom: "Pain de C4", desc: "+1 Force permanent", prix: 50000, effet: () => joueur.stats.force += 1 },
    { id: 'i_planque', type: 'Immobilier', nom: "Planque Sécurisée", desc: "Baisse le risque d'arrestation de 30%", prix: 150000, effet: () => joueur.risquePrison = Math.max(0, joueur.risquePrison - 30) },
    { id: 'i_blanchisseur', type: 'Économie', nom: "Réseau de Blanchisserie", desc: "Protège ton cash : perte en prison réduite à 10%", prix: 100000, effet: () => joueur.blanchisserie = true }
];

// 10 ÉVÉNEMENTS AVEC 3 CHOIX CHACUN
const evenementsHistoriques = [
    {
        titre: "La Taupe au Commissariat",
        desc: "Un contact corrompu au poste de police propose de vendre des dossiers confidentiels sur les enquêtes en cours.",
        choix: [
            { txt: "Acheter les dossiers (Coût: 20 000 € -> Baisse le risque de 15%)", action: () => { if(joueur.argent >= 20000) { joueur.argent -= 20000; joueur.risquePrison = Math.max(0, joueur.risquePrison - 15); notify("Risque réduit grâce aux dossiers."); } else { alert("Pas assez d'argent !"); } } },
            { txt: "Tenter de l'extorquer pour les avoir gratis (Risque d'augmenter le Heat)", action: () => { joueur.heat += 25; notify("La taupe a paniqué et a prévenu ses collègues ! Heat +25%"); } },
            { txt: "Ignorer cette proposition louche", action: () => { notify("Vous passez votre chemin."); } }
        ]
    },
    {
        titre: "Le Maître Chanteur",
        desc: "Un petit escroc local détient des photos de vous près d'une cible et exige de l'argent.",
        choix: [
            { txt: "Payer sa tribut (Coût: 10 000 €)", action: () => { if(joueur.argent >= 10000) { joueur.argent -= 10000; notify("Silence acheté."); } else { alert("Pas assez d'argent !"); } } },
            { txt: "Régler l'affaire violemment (Heat +20%)", action: () => { joueur.heat += 20; notify("Problème réglé, mais la tension monte."); } },
            { txt: "Le menacer en retour avec vos propres relations (Coût: 5 000 € + Intel 5 requis)", action: () => { if(joueur.argent >= 5000 && joueur.stats.intel >= 5) { joueur.argent -= 5000; notify("Il s'est enfui terrifié."); } else { notify("Échec de l'intimidation, il a publié les photos ! Heat +15%"); joueur.heat += 15; } } }
        ]
    },
    {
        titre: "Le Matériel Haut de Gamme",
        desc: "Un ancien ingénieur de l'armée propose de vendre du matériel militaire de pointe volé.",
        choix: [
            { txt: "Acheter le lot complet (Coût: 40 000 € -> +1 dans une stat aléatoire)", action: () => { if(joueur.argent >= 40000) { joueur.argent -= 40000; let stats = ['force', 'intel', 'furtivite']; let s = stats[Math.floor(Math.random()*stats.length)]; joueur.stats[s] += 1; notify(`Matériel acquis ! +1 en ${s}.`); } else { alert("Fonds insuffisants."); } } },
            { txt: "Négocier un rabais (Coût: 15 000 € -> 50% de chance de succès)", action: () => { if(joueur.argent >= 15000 && Math.random() > 0.5) { joueur.argent -= 15000; joueur.stats.force += 1; notify("Négociation réussie ! +1 Force."); } else { joueur.argent -= 15000; notify("Il s'est vexé et est parti avec le matos."); } } },
            { txt: "Refuser, c'est trop louche", action: () => { notify("Vous refusez l'offre."); } }
        ]
    },
    {
        titre: "L'Héritage Encombrant",
        desc: "Un vieux complice incarcéré à vie vous lègue sa planque secondaire pleine de cash, mais la police rôde.",
        choix: [
            { txt: "Tout récupérer rapidement (+50 000 €, mais Risque +10%)", action: () => { joueur.argent += 50000; joueur.risquePrison += 10; notify("Magot récupéré, mais la police a flairé le coup."); } },
            { txt: "Y aller très prudemment et ne prendre que la moitié (+25 000 €, Risque +2%)", action: () => { joueur.argent += 25000; joueur.risquePrison += 2; notify("Récupération partielle sans vagues."); } },
            { txt: "Laisser tomber, trop dangereux", action: () => { notify("Vous laissez le magot aux autorités."); } }
        ]
    },
    {
        titre: "La Trahison dans l'Équipe",
        desc: "Vous apprenez qu'un membre de votre équipe discute en secret avec la police.",
        choix: [
            { txt: "Le virer immédiatement et le menacer", action: () => { if(joueur.equipe.length > 0) { joueur.equipe.pop(); notify("Le traître a été évincé."); } else { notify("Personne à virer, mais vous avez retenu la leçon."); } } },
            { txt: "Tenter de le retourner pour qu'il devienne un double agent (Intel 6 requis)", action: () => { if(joueur.stats.intel >= 6) { notify("Manœuvre réussie. Il vous reffile de faux tuyaux pour la police."); joueur.risquePrison = Math.max(0, joueur.risquePrison - 10); } else { notify("Il a compris et a balancé vos plans ! Risque +30%"); joueur.risquePrison += 30; } } },
            { txt: "L'ignorer (Risque d'arrestation accru au prochain casse)", action: () => { joueur.risquePrison += 25; notify("Vous faites l'autruche..."); } }
        ]
    },
    {
        titre: "L'Offre du Parrain",
        desc: "Un caïd local de la pègre vous invite à dîner. Il veut un partenariat exclusif.",
        choix: [
            { txt: "Accepter l'alliance (+100 000 €, mais vous perdez le choix des cibles pendant 1 braquage)", action: () => { joueur.argent += 100000; notify("Vous êtes lié au Parrain."); } },
            { txt: "Demander une contrepartie financière directe cash (+30 000 € sans conditions)", action: () => { joueur.argent += 30000; notify("Le Parrain apprécie l'audace."); } },
            { txt: "Refuser poliment mais fermement", action: () => { notify("Le Parrain fronce les sourcils mais vous laisse partir."); } }
        ]
    },
    {
        titre: "La Panique Médiatique",
        desc: "Un journaliste d'investigation diffuse un reportage à charge sur vos braquages. Votre visage tourne en boucle.",
        choix: [
            { txt: "Financer de faux documents et changer de look (Coût: 30 000 € -> Annule le fichage S)", action: () => { if(joueur.argent >= 30000) { joueur.argent -= 30000; joueur.niveauSurveillance = 0; notify("Identité floutée, niveau de surveillance effacé."); } else { alert("Fonds insuffisants."); } } },
            { txt: "Intimider le journaliste pour qu'il supprime l'article (Force 6 requis)", action: () => { if(joueur.stats.force >= 6) { notify("Le journaliste a pris peur et a tout retiré."); } else { notify("Il a tout enregistré ! Surveillance +1"); joueur.niveauSurveillance += 1; } } },
            { txt: "Ignorer les médias et faire profil bas (Heat +15%)", action: () => { joueur.heat += 15; notify("L'orage finira par passer."); } }
        ]
    },
    {
        titre: "Une Dette de Jeu",
        desc: "Dans un cercle privé, vous croisez un parieur ruiné qui connaît une faille de sécurité majeure sur une banque.",
        choix: [
            { txt: "Payer sa dette pour obtenir le tuyau (Coût: 15 000 € -> Débloque un bonus de butin)", action: () => { if(joueur.argent >= 15000) { joueur.argent -= 15000; joueur.argent += 50000; notify("Tuyau en or ! +50 000 € récupérés grâce à la faille."); } else { alert("Pas assez d'argent."); } } },
            { txt: "Le braquer directement à la sortie du cercle (Furtivité 6 requis)", action: () => { if(joueur.stats.furtivite >= 6) { joueur.argent += 20000; notify("Vous lui avez volé ses notes sans qu'il ne voie rien."); } else { notify("Il a crié au voleur ! Heat +20%"); joueur.heat += 20; } } },
            { txt: "Passer son chemin", action: () => { notify("Vous refusez de vous mêler de ses histoires."); } }
        ]
    },
    {
        titre: "Le Témoin Gênant",
        desc: "Un passant vous a filmé avec son smartphone lors de votre dernier coup et vous envoie un message de chantage.",
        choix: [
            { txt: "Acheter son silence (Coût: 25 000 €)", action: () => { if(joueur.argent >= 25000) { joueur.argent -= 25000; notify("Vidéo effacée."); } else { alert("Fonds insuffisants."); } } },
            { txt: "Retracer son IP et pirater son téléphone (Intel 6 requis)", action: () => { if(joueur.stats.intel >= 6) { notify("Cloud nettoyé avec succès, pas un centime dépensé."); } else { notify("Échec du hack, il a balancé la vidéo à la police ! Risque +20%"); joueur.risquePrison += 20; } } },
            { txt: "Le retrouver en personne et le dissuader violemment (Force 5 requis)", action: () => { if(joueur.stats.force >= 5) { notify("Message passé. Il ne parlera plus."); } else { notify("Il s'est débattu et vous a griffé ! Heat +15%"); joueur.heat += 15; } } }
        ]
    },
    {
        titre: "L'Appel d'un Proche",
        desc: "Un proche traverse une grave difficulté financière et vous demande de l'aide en urgence.",
        choix: [
            { txt: "L'aider généreusement (Coût: 20 000 € -> Améliore votre moral et baisse le Heat)", action: () => { if(joueur.argent >= 20000) { joueur.argent -= 20000; joueur.heat = Math.max(0, joueur.heat - 15); notify("Vous l'avez sauvé. Votre esprit est plus serein."); } else { alert("Vous n'avez pas assez d'argent pour l'aider."); } } },
            { txt: "L'aider avec une petite somme (Coût: 5 000 €)", action: () => { if(joueur.argent >= 5000) { joueur.argent -= 5000; notify("C'est un petit soulagement pour lui."); } else { alert("Fonds insuffisants."); } } },
            { txt: "Refuser et l'ignorer pour protéger vos affaires", action: () => { notify("Vous coupez court à la discussion."); } }
        ]
    }
];

let joueur = {
    milieu: "", age: 20, mois: 0,
    argent: 0, ville: "", 
    risquePrison: 0, enPrison: false, niveauSurveillance: 0,
    heat: 0, 
    braquagesReussis: 0,
    blanchisserie: false, // Nouveau système anti-saisie
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
    if(['screen-start', 'screen-milieu', 'screen-end', 'screen-event'].includes(screenId)) {
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
        <div class="heat-text">🔥 Tension (Heat): ${joueur.heat}%</div>
        <div class="danger-text">🚨 Risque Global : ${textRisque}</div>
        ${joueur.niveauSurveillance > 0 ? `<div>👁️ Fiché S (Malus : -${joueur.niveauSurveillance})</div>` : ""}
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

// --- LOGIQUE DE DÉPART ---
function initJoueur(milieu) {
    joueur.milieu = milieu;
    if(milieu === 'Défavorisé') joueur.stats.furtivite += 2;
    if(milieu === 'Riche') joueur.stats.intel += 2;
    if(milieu === 'Classique') joueur.stats.force += 2;
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
    document.getElementById('hub-ville-nom').innerText = ville;
    genererMissionsHub();
    notify(`Bienvenue à ${ville}.`);
    showScreen('screen-hub');
}

function calmerLeJeu() {
    joueur.mois += 6;
    if(joueur.mois >= 12) {
        joueur.age += 1;
        joueur.mois -= 12;
    }
    joueur.heat = Math.max(0, joueur.heat - 30);
    notify("Vous avez fait profil bas pendant 6 mois. La tension redescend.");
    genererMissionsHub(); 
    updateStats();
}

// --- GESTION DES ÉVÉNEMENTS ALÉATOIRES ---
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
            showScreen('screen-hub');
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
            <li><strong>Origine :</strong> Milieu ${joueur.milieu}</li>
            <li><strong>Statut :</strong> <span style="color:#ff7b72">${getStatutCriminel()}</span> (${joueur.braquagesReussis} coups réussis)</li>
            <li><strong>Compétences brutes :</strong> Force ${joueur.stats.force} | Intel ${joueur.stats.intel} | Furtivité ${joueur.stats.furtivite}</li>
            <li><strong>Buffs d'entraînement :</strong> +${joueur.buffs.force}% Force | +${joueur.buffs.intel}% Intel | +${joueur.buffs.furtivite}% Furtivité</li>
            <li><strong>Blanchisserie active :</strong> ${joueur.blanchisserie ? 'Oui (Protection 90% du cash)' : 'Non'}</li>
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
                <strong>${eq.nom}</strong> (Spé: ${eq.role}) 
                <button class="btn-action" style="padding:5px 10px; margin-left:10px; border-radius:4px;" onclick="virerRecrue(${index})">Virer</button>
            </div>`;
        });
        html += `<hr style="border-color:#30363d">`;
    }

    html += `<h3 style="color:#2ea043">À Embaucher</h3>`;
    recruesDispo.forEach(r => {
        let dejaEquipe = joueur.equipe.find(e => e.id === r.id);
        if(!dejaEquipe) {
            let peutPayer = joueur.argent >= r.cout;
            html += `<div style="background:#21262d; padding:10px; margin-bottom:10px; border:1px solid #30363d; border-radius:4px;">
                <strong>${r.nom}</strong> | Spé: ${r.role} (-${r.bonus} difficulté)<br>
                <small>Prime: ${r.cout.toLocaleString()} € + 15% du butin</small><br>
                <button class="btn-choix" ${!peutPayer ? 'disabled' : ''} style="padding:8px; margin-top:5px" onclick="embaucher('${r.id}')">Engager</button>
            </div>`;
        }
    });
    document.getElementById('liste-recrues').innerHTML = html;
    showScreen('screen-recrutement');
}

function embaucher(id) {
    let r = recruesDispo.find(x => x.id === id);
    if(joueur.argent >= r.cout) {
        joueur.argent -= r.cout;
        joueur.equipe.push(r);
        updateStats();
        ouvrirRecrutement();
        genererMissionsHub(); 
    }
}

function virerRecrue(index) {
    joueur.equipe.splice(index, 1);
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
    if(joueur.milieu === 'Défavorisé') score -= 1;
    if(joueur.milieu === 'Riche') score += 1;
    
    let proba = 50 + (score - diff) * 10;
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
        <button class="btn-choix" onclick="resoudreAction('furtivite')">🥷 Approche Fantôme (Furtivité)</button>
        <button class="btn-choix" onclick="resoudreAction('intel')">🧠 Approche Cyber (Intelligence)</button>
        <button class="btn-choix" onclick="resoudreAction('force')">💪 Approche Frontale (Force)</button>
    `;
    showScreen('screen-action');
}

function resoudreAction(stat) {
    joueur.mois += 2; 
    if(joueur.mois >= 12) { joueur.age++; joueur.mois -= 12; }
    
    let difficulte = cibleActuelle.diff;
    if (joueur.milieu === 'Défavorisé') difficulte += 1;
    if (joueur.milieu === 'Riche') difficulte -= 1;

    joueur.equipe.forEach(r => { if(r.role === stat) difficulte -= r.bonus; });

    let jet = Math.floor(Math.random() * 10) + 1;
    let scoreFinal = (joueur.stats[stat] + jet) - joueur.niveauSurveillance;
    
    let mult = 1 + (joueur.buffs[stat] / 100);
    scoreFinal = scoreFinal * mult;

    if(joueur.heat > 50) scoreFinal -= 2;

    if (scoreFinal >= difficulte + 4) {
        let partEquipe = cibleActuelle.butin * (0.15 * joueur.equipe.length);
        let butinJoueur = Math.floor(cibleActuelle.butin - partEquipe);
        
        joueur.argent += butinJoueur;
        joueur.pointsCompetence += 1;
        joueur.braquagesReussis += 1;
        joueur.heat += 20; 
        
        if (stat === 'force') joueur.risquePrison += 20;
        if (joueur.milieu === 'Riche') joueur.risquePrison += 5;

        indexCible[cibleActuelle.niveau]++; 
        
        notify(`Coup réussi ! Butin net : ${butinJoueur.toLocaleString()} € (+1 PC)`);
        
        // 40% de chance qu'un événement aléatoire survienne après un braquage
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

// --- PRISON ET FIN DE JEU (AVEC BLANCHISSERIE) ---
function allerEnPrison(raison) {
    joueur.enPrison = true;
    let annees = Math.floor(Math.random() * 4) + 2 + Math.floor(joueur.risquePrison / 15);
    if (joueur.milieu === 'Riche') annees = Math.max(1, annees - 2);
    
    joueur.peineActuelle = annees;
    
    // Si la blanchisserie est achetée, perte limitée à 10% du cash total, sinon perte de 50%
    let tauxPerte = joueur.blanchisserie ? 0.10 : 0.50;
    let montantSaisi = Math.floor(joueur.argent * tauxPerte);
    joueur.argent -= montantSaisi;
    
    let texteArgent = joueur.blanchisserie 
        ? `Grâce à votre réseau de blanchisserie, l'État n'a pu saisir que 10% (${montantSaisi.toLocaleString()} €) de votre fortune.`
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

    if (joueur.age >= 65) {
        afficherEcranFin("Mort en Cellule", `Le temps a eu raison de vous. Vous vous éteignez en prison à l'âge de ${joueur.age} ans.`);
    } else {
        notify(`Libéré après ${joueur.peineActuelle} ans. Les flics vous surveillent de près.`);
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
            description = `Vous vous rangez avec seulement ${joueur.argent.toLocaleString()} €. Vous finissez par faire un petit boulot mal payé jusqu'à la fin de vos jours pour survivre. Le monde criminel vous a oublié.`;
        } else if (joueur.argent < 2000000) {
            titre = "Retraite Dorée";
            description = `Avec ${joueur.argent.toLocaleString()} € en poche, vous blanchissez votre argent et disparaissez de la circulation. Vous finissez vos jours confortablement au soleil.`;
        } else {
            titre = "LÉGENDE VIVANTE";
            description = `Vous prenez votre retraite avec une fortune colossale de ${joueur.argent.toLocaleString()} €. Vous achetez une île paradisiaque. Votre nom restera à jamais gravé dans l'histoire du grand banditisme.`;
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
