// --- DONNÉES DU JEU (v0.0.9) ---
const monde = {
    "Paris": {
        faible: [{ nom: "Tabac-Presse", diff: 4, butin: 8000, desc: "La boutique est mal éclairée. Trois clients patientent, le gérant écoute la radio, distrait." }, { nom: "Pharmacie de garde", diff: 5, butin: 10000, desc: "Seule la croix verte éclaire la rue. Le pharmacien est seul, somnolant derrière le comptoir." }, { nom: "Boutique de vêtements", diff: 5, butin: 12000, desc: "Caisse pleine après les soldes. Un seul vigile fatigué à l'entrée." }],
        modere: [{ nom: "Bijouterie Vendôme", diff: 7, butin: 130000, desc: "L'endroit est luxueux. 4 clients fortunés essaient des parures, gardés par deux vigiles armés." }, { nom: "Fourgon de fonds", diff: 8, butin: 162000, desc: "Le fourgon est à l'arrêt devant une banque. Deux convoyeurs lourdement armés font le transfert." }, { nom: "Banque d'Affaires", diff: 8, butin: 195000, desc: "Accès restreint, coffres-forts individuels. Caméras à chaque angle." }],
        eleve: [{ nom: "Musée du Louvre", diff: 10, butin: 2275000, desc: "Une forteresse culturelle. Rondes de nuit constantes, lasers croisés et vitrines blindées." }, { nom: "Vente aux enchères", diff: 11, butin: 2925000, desc: "Le tout-Paris est là. Sécurité maximale, caméras biométriques et police en civil dans la salle." }, { nom: "Palais de l'Élysée (Réserves)", diff: 12, butin: 3900000, desc: "Cible suicidaire. Garde républicaine, sécurité d'État, mais des œuvres inestimables en sous-sol." }],
        legendaire: [{ nom: "Coffre-Fort de la Banque de France", diff: 17, butin: 9750000, desc: "Le sous-sol le plus gardé du pays. Lingots d'or, réserves d'État, et une sécurité pensée pour être infranchissable." }]
    },
    "New York": {
        faible: [{ nom: "Prêteur sur gages", diff: 5, butin: 13000, desc: "Boutique crasseuse dans le Bronx. Le patron garde un fusil à pompe sous le comptoir." }, { nom: "Supérette", diff: 5, butin: 12000, desc: "Un caissier fatigué et quelques ivrognes traînent dans les rayons." }, { nom: "Dépôt de quartier", diff: 6, butin: 14000, desc: "Petite réserve de matériel électronique. Grilles métalliques simples." }],
        modere: [{ nom: "Fourgon Blindé", diff: 8, butin: 228000, desc: "Pris dans les embouteillages de Manhattan. Les convoyeurs sont sur les nerfs." }, { nom: "Boutique de luxe", diff: 7, butin: 195000, desc: "Sur la 5ème Avenue. Vigiles en costard, portes magnétiques et clientèle snob." }, { nom: "Bijoutier de Brooklyn", diff: 7, butin: 182000, desc: "Diamants bruts fraîchement arrivés. La mafia locale surveille de loin." }],
        eleve: [{ nom: "Réserve Fédérale", diff: 11, butin: 4550000, desc: "La cible ultime. Gardes d'élite, coffre-fort de 10 tonnes et caméras à reconnaissance faciale." }, { nom: "Banque de Manhattan", diff: 10, butin: 3575000, desc: "Un hall gigantesque grouillant de monde. Le SWAT n'est jamais loin dans ce quartier." }, { nom: "Bourse de Wall Street", diff: 12, butin: 5200000, desc: "Salles de serveurs ultra-sécurisées. Objectif : détournement de fonds à haute fréquence." }],
        legendaire: [{ nom: "Chambre Forte de la Réserve Fédérale (Sous-sol)", diff: 18, butin: 11700000, desc: "Le mythe absolu de tout braqueur. Des tonnes de lingots sous Manhattan, protégées comme un secret d'État." }]
    },
    "Los Angeles": {
        faible: [{ nom: "Dispensaire local", diff: 4, butin: 12000, desc: "Forte odeur d'herbe. Le vigile regarde son téléphone, la caisse est pleine d'argent liquide." }, { nom: "Station service", diff: 4, butin: 9000, desc: "Isolée sur une route désertique. Un seul employé s'ennuie derrière une vitre pare-balles." }, { nom: "Motel miteux", diff: 4, butin: 10000, desc: "Le coffre de la réception contient les paiements au noir de la semaine." }],
        modere: [{ nom: "Manoir a Beverly Hills", diff: 6, butin: 98000, desc: "Les propriétaires sont à une fête. Il reste le personnel de maison et des chiens de garde." }, { nom: "Joaillier VIP", diff: 7, butin: 130000, desc: "Un salon privé sur rendez-vous. Verre blindé et alarmes reliées directement au poste local." }, { nom: "Banque de Vinewood", diff: 7, butin: 143000, desc: "Petite succursale pour acteurs de seconde zone. Sécurité moyenne mais active." }],
        eleve: [{ nom: "Casino Clandestin", diff: 9, butin: 1820000, desc: "Géré par la mafia. Les gardes ont la gâchette facile et l'argent coule à flots." }, { nom: "Reserve de Lingots", diff: 10, butin: 2275000, desc: "Un entrepôt banalisé lourdement gardé par des mercenaires privés." }, { nom: "Studio de Cinéma (Coffre)", diff: 10, butin: 1950000, desc: "Cachette secrète contenant les salaires non déclarés. Milice privée sur place." }],
        legendaire: [{ nom: "Voûte du Studio Central (Archives Secrètes)", diff: 16, butin: 8580000, desc: "Sous les studios, une voûte que même les producteurs ignorent. Argent noir accumulé sur des décennies." }]
    }
};

const SEUIL_LEGENDAIRE_PAR_VILLE = 10;
const POIDS_NIVEAU_LEGENDAIRE = { faible: 1, modere: 2, eleve: 3, legendaire: 0 };

const recruesDispo = [
    { id: 'r1', nom: 'Gueule d\'Ange', role: 'furtivite', bonus: 2, cout: 5000, moralite: 5, desc: "Ancien cambrioleur solitaire, silencieux comme une ombre. Ne pardonne pas les coups violents.", histoire: "De son vrai nom Kevin Lacroix. Ancien enfant de chœur devenu cambrioleur solitaire après avoir été mis à la rue par sa propre famille à 17 ans. Son surnom vient de son visage juvénile qui ne laisse jamais deviner ce qu'il a en tête. Discret, méthodique, il déteste par-dessus tout l'improvisation et la violence gratuite." },
    { id: 'r2', nom: 'Le Bulldozer', role: 'force', bonus: 3, cout: 8000, moralite: 3, desc: "Ex-videur reconverti dans le crime. Loyal tant que l'argent coule et que l'action ne manque pas.", histoire: "De son vrai nom Yannick « Yann » Preskovic. Ancien videur de boîte de nuit à Marseille, reconverti après avoir cassé l'arcade sourcilière d'un client qui s'est avéré être le neveu d'un magistrat. Costaud, loyal, pas franchement subtil. Privé de baston ou de billets, son moral chute vite." },
    { id: 'r3', nom: 'Neo', role: 'intel', bonus: 2, cout: 6000, moralite: 6, desc: "Hacker prodige, parano sur les bords. Déteste être mis de côté sur les décisions techniques.", histoire: "De son vrai nom Adrien Wu. Prodige de l'informatique repéré puis viré d'une école d'ingénieurs pour avoir piraté le système de notation de son établissement. Vit reclus, entouré d'écrans. Paranoïaque de nature, ce qui le rend extrêmement susceptible dès qu'on l'écarte d'une décision technique." },
    { id: 'r4', nom: 'Le Chauffeur', role: 'chauffeur', bonus: 2, cout: 7000, moralite: 5, desc: "Ancien pilote de rallye clandestin. Change la donne à chaque exfiltration motorisée.", histoire: "De son vrai nom Théo Marchetti. Ancien pilote de rallye clandestin dans les collines au-dessus de Nice, contraint de raccrocher après un accident qui a coûté la vie à son copilote — une blessure qu'il ne mentionne jamais. Calme au volant, nerveux à l'arrêt." },
    { id: 'r5', nom: 'La Négociatrice', role: 'negociateur', bonus: 1, cout: 9000, moralite: 7, desc: "Ex-avocate d'affaires. Obtient de meilleurs prix auprès des receleurs pour toute l'équipe.", histoire: "De son vrai nom Camille Ferrand. Ex-avocate d'affaires dans un grand cabinet parisien, elle a basculé du mauvais côté de la loi le jour où elle a compris qu'elle négociait de meilleurs accords pour des criminels en col blanc que pour ses propres clients. Élégante, glaciale, redoutable en négociation." },
    { id: 'r6', nom: 'La Veuve', role: 'force', bonus: 3, cout: 9000, moralite: 2, desc: "Ex-boxeuse professionnelle bannie du circuit pour un combat truqué qui a mal tourné. Frappe fort, ne discute jamais deux fois.", histoire: "De son vrai nom Sonia Kadri. Ancienne boxeuse professionnelle, bannie à vie du circuit après un combat truqué qui a viré au scandale. Son surnom, elle l'a hérité d'un adversaire resté KO si longtemps que la rumeur d'un veuvage a couru tout un été. Sèche, économe en mots." },
    { id: 'r7', nom: 'Doc', role: 'intel', bonus: 2, cout: 7000, moralite: 6, desc: "Ex-ingénieur biomédical reconverti dans le faux document et le piratage de systèmes de sécurité. Calme, méthodique, incollable en électronique.", histoire: "De son vrai nom Malik Touré. Ancien ingénieur biomédical licencié après avoir été accusé (à tort, insiste-t-il) d'avoir trafiqué des dossiers patients. Reconverti dans le faux document et le piratage. Garde des habitudes de blouse blanche : gestes précis, calme en toute circonstance." },
    { id: 'r8', nom: 'La Souris', role: 'furtivite', bonus: 3, cout: 8000, moralite: 4, desc: "Ancienne contorsionniste de cirque itinérant. Se glisse littéralement partout où un humain normal ne devrait pas passer.", histoire: "De son vrai nom Elena Popescu. Ancienne contorsionniste dans un cirque itinérant d'Europe de l'Est, laissée sur le carreau quand la troupe a fait faillite en pleine tournée. D'un calme presque inquiétant, elle ne comprend jamais vraiment pourquoi les autres s'affolent." },
    { id: 'r9', nom: 'Tanker', role: 'chauffeur', bonus: 3, cout: 8500, moralite: 4, desc: "Ex-chauffeur de fourgon blindé retourné après un licenciement jugé injuste. Connaît tous les itinéraires de sécurité par cœur — et comment les déjouer.", histoire: "De son vrai nom Marcus Webb. Ancien chauffeur de fourgon blindé, licencié après avoir « égaré » quelques minutes de trajet un jour où sa société l'accusait à tort de complicité dans un braquage qu'il n'avait pas commis. Costaud, bourru, mais d'une fidélité à toute épreuve tant qu'on ne lui manque pas de respect." },
    { id: 'r10', nom: 'Le Comptable', role: 'negociateur', bonus: 2, cout: 10000, moralite: 8, desc: "Ex-comptable qui blanchissait discrètement pour des cartels avant de se faire lâcher par ses employeurs. Chiffre tout, ne laisse jamais rien au hasard.", histoire: "De son vrai nom Julien Sabatier. Ancien comptable qui blanchissait de l'argent pour des cartels sud-américains depuis un cabinet en apparence irréprochable, jusqu'à ce que ses employeurs le lâchent au premier signe d'enquête fiscale. Méticuleux à l'excès." }
];

const TAILLE_MAX_EQUIPE = 5;

const catalogue = [
    { id: 'f_force1', type: 'Formation', nom: "Entraînement Militaire I", desc: "+1 Force", prix: 5000, effet: () => joueur.stats.force += 1 },
    { id: 'f_force2', type: 'Formation', nom: "Entraînement Militaire II", desc: "+1 Force", prix: 12000, requiert: 'f_force1', effet: () => joueur.stats.force += 1 },
    { id: 'f_force3', type: 'Formation', nom: "Entraînement Militaire III", desc: "+1 Force", prix: 25000, requiert: 'f_force2', effet: () => joueur.stats.force += 1 },
    { id: 'f_intel1', type: 'Formation', nom: "Cours de Hacking I", desc: "+1 Intelligence", prix: 5000, effet: () => joueur.stats.intel += 1 },
    { id: 'f_intel2', type: 'Formation', nom: "Cours de Hacking II", desc: "+1 Intelligence", prix: 12000, requiert: 'f_intel1', effet: () => joueur.stats.intel += 1 },
    { id: 'f_intel3', type: 'Formation', nom: "Cours de Hacking III", desc: "+1 Intelligence", prix: 25000, requiert: 'f_intel2', effet: () => joueur.stats.intel += 1 },
    { id: 'f_furt1', type: 'Formation', nom: "Stage de Parkour I", desc: "+1 Furtivité", prix: 5000, effet: () => joueur.stats.furtivite += 1 },
    { id: 'f_furt2', type: 'Formation', nom: "Stage de Parkour II", desc: "+1 Furtivité", prix: 12000, requiert: 'f_furt1', effet: () => joueur.stats.furtivite += 1 },
    { id: 'f_furt3', type: 'Formation', nom: "Stage de Parkour III", desc: "+1 Furtivité", prix: 25000, requiert: 'f_furt2', effet: () => joueur.stats.furtivite += 1 },
    { id: 'm_drone', type: 'Matériel', nom: "Mini-Drone", desc: "+1 Furtivité permanent", prix: 50000, effet: () => joueur.stats.furtivite += 1 },
    { id: 'm_c4', type: 'Matériel', nom: "Pain de C4", desc: "+1 Force permanent", prix: 50000, effet: () => joueur.stats.force += 1 },
    { id: 'a_9mm', type: 'Armement', nom: "Pistolet 9mm", desc: "-3 de difficulté sur toute approche Frontale", prix: 40000, effet: () => joueur.bonusArmeForce = (joueur.bonusArmeForce || 0) + 3 },
    { id: 'a_silencieux', type: 'Armement', nom: "Kit Silencieux", desc: "-2 de difficulté en Frontale, sans faire de bruit (aucune Tension supplémentaire)", prix: 55000, effet: () => joueur.bonusArmeForce = (joueur.bonusArmeForce || 0) + 2 },
    { id: 'a_fusil', type: 'Armement', nom: "Fusil à Pompe Scié", desc: "-5 de difficulté en Frontale, mais une arme aussi voyante fait immédiatement monter la Tension (+10%)", prix: 90000, effet: () => { joueur.bonusArmeForce = (joueur.bonusArmeForce || 0) + 5; joueur.heat = Math.min(100, joueur.heat + 10); } },
    { id: 'e_gilet', type: 'Équipement', nom: "Gilet Pare-Balles", desc: "Réduit fortement le risque de perdre un allié ou d'y laisser la vie lors d'un coup qui tourne mal", prix: 60000, effet: () => joueur.giletPareBalles = true },
    { id: 'e_brouilleur', type: 'Équipement', nom: "Brouilleur de Fréquences", desc: "Réduit le risque d'alerte policière lors des approches Cyber", prix: 55000, effet: () => joueur.brouilleurFreq = true },
    { id: 'e_papiers', type: 'Équipement', nom: "Faux Papiers", desc: "Supprime le risque de contrôle douanier lors des déplacements entre villes", prix: 45000, effet: () => joueur.fauxPapiers = true },
    { id: 'e_kit', type: 'Équipement', nom: "Kit de Crochetage Pro", desc: "Supprime le malus lié à une Furtivité encore faible lors des approches discrètes", prix: 35000, effet: () => joueur.kitCrochetage = true },
    { id: 'e_serveur', type: 'Équipement', nom: "Ferme de Serveurs Dédiée", desc: "Infrastructure numérique discrète, recherchée par certains réseaux cybercriminels pour leurs opérations d'envergure", prix: 70000, effet: () => {} },
    { id: 'v_moto', type: 'Véhicules', nom: "Moto Cross Rodée", desc: "Facilite les fuites", prix: 35000, effet: () => joueur.vehicule = "Moto" },
    { id: 'v_camion', type: 'Véhicules', nom: "Fourgon Blindé Volé", desc: "Protection et espace", prix: 120000, effet: () => joueur.vehicule = "Fourgon" },
    { id: 'i_planque', type: 'Immobilier', nom: "Planque Sécurisée", desc: "Baisse le risque de 30%", prix: 150000, effet: () => joueur.risquePrison = Math.max(0, joueur.risquePrison - 30) },
    { id: 'i_blanchisseur', type: 'Économie', nom: "Réseau de Blanchisserie", desc: "Blanchit 70% de chaque butin (Cash insaisissable), plafonné à 300 000 € par an de jeu", prix: 100000, effet: () => joueur.blanchisserie = true }
];

const banqueEvenements = {
    simple: [
        { 
            id: "S01", titre: "Rencontre fortuite", desc: "Vous croisez un ancien camarade peu regardant sur la légalité.", 
            choix: [
                { txt: "Discuter discrètement d'affaires", action: () => { if (Math.random() > 0.3) { joueur.argent += 5000; joueur.argentGagne += 5000; return "Le tuyau était en or. Vous récupérez 5 000 € sur une revente rapide."; } else { joueur.heat += 5; return "Le plan est tombé à l'eau et un indic rôdait dans le coin (Tension +5%)."; } } },
                { txt: "L'ignorer superbement", action: () => { if (joueur.respect >= 3) { joueur.respect += 1; return "Votre froideur en impose. Votre réputation monte dans le quartier (Respect +1)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Il prend mal votre mépris et lance des rumeurs blessantes (Mental -1)."; } } },
                { txt: "L'intimider pour lui faire les poches", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 6) { joueur.argent += 2000; joueur.argentGagne += 2000; joueur.moralite = Math.max(0, joueur.moralite - 1); return "Plaqué contre le mur, il vous vide ses poches sans un mot (+2 000 €, Moralité -1)."; } else { joueur.heat += 10; joueur.moralite = Math.max(0, joueur.moralite - 1); return "Il s'est débattu en hurlant à l'aide avant de s'enfuir (Tension +10%)."; } } }
            ] 
        },
        { 
            id: "S02", titre: "Panne de réveil", desc: "Vous ratez un rendez-vous matinal avec un contact mineur.", 
            choix: [
                { txt: "Profiter de l'occasion pour dormir", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Une grasse matinée réparatrice qui vous remet d'aplomb (Mental +1)."; } else { joueur.respect = Math.max(0, joueur.respect - 1); return "Le contact a pris ce retard pour un affront délibéré (Respect -1)."; } } },
                { txt: "Proposer un dédommagement financier (-2 000 €)", action: () => { if (depenser(2000)) { if (Math.random() > 0.2) { joueur.respect += 1; return "L'enveloppe glissée fait oublier l'affront (Respect +1)."; } else { return "Il prend l'argent mais garde une dent contre vous."; } } else { joueur.respect = Math.max(0, joueur.respect - 1); return "Faute de fonds suffisants, votre tentative d'excuse tourne au ridicule (Respect -1)."; } } },
                { txt: "Le menacer pour qu'il garde le silence", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 5) { joueur.crainte += 1; joueur.moralite = Math.max(0, joueur.moralite - 1); return "Le ton employé lui fait passer toute envie de se plaindre (Crainte +1)."; } else { joueur.heat += 10; return "Il ne s'est pas laissé impressionner et promet de vous griller (Tension +10%)."; } } }
            ] 
        },
        { 
            id: "S03", titre: "Contrôle de routine", desc: "Une patrouille de police s'arrête non loin de votre planque.", 
            choix: [
                { txt: "Se fondre immédiatement dans l'obscurité", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 6) { return "Vous disparaissez dans l'ombre sans faire le moindre bruit."; } else { joueur.heat += 15; return "Un agent a remarqué votre silhouette fuyante et prend des notes (Tension +15%)."; } } },
                { txt: "Passer devant eux d'un pas assuré", action: () => { let score = joueur.mental + Math.floor(Math.random() * 6); if (score >= 7) { return "Un simple hochement de tête poli et ils poursuivent leur ronde."; } else { joueur.heat += 10; return "Votre nervosité était palpable. Les agents vous dévisagent longuement (Tension +10%)."; } } },
                { txt: "Prendre la fuite en courant par les coursives", action: () => { if (Math.random() > 0.5) { joueur.heat += 15; return "Vous les semez de justesse dans le dédale des ruelles (Tension +15%)."; } else { joueur.heat += 25; joueur.risquePrison += 2; return "Une course-poursuite s'engage. Votre signalement est diffusé sur les ondes (Tension +25%, Risque +2%)."; } } }
            ] 
        },
        { 
            id: "S04", titre: "Colis égaré", desc: "Un carton non étiqueté a été déposé sur votre palier.", 
            choix: [
                { txt: "Forcer le colis pour en écouler le contenu", action: () => { if (Math.random() > 0.3) { joueur.argent += 2000; joueur.argentGagne += 2000; return "Le colis contenait du matériel électronique vite revendu (+2 000 €)."; } else { joueur.heat += 10; return "C'était un appât d'escrocs locaux. Une altercation éclate (Tension +10%)."; } } },
                { txt: "Rechercher le véritable destinataire dans l'immeuble", action: () => { if (Math.random() > 0.3) { joueur.moralite = Math.min(10, joueur.moralite + 1); return "Le voisin vous remercie chaleureusement (Moralité +1)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le voisin vous accuse d'avoir tenté de voler son paquet (Mental -1)."; } } },
                { txt: "Détruire le paquet par précaution", action: () => { if (Math.random() > 0.5) { return "Le carton est brûlé sans laisser de traces."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "La paranoïa commence à peser lourdement sur vos nerfs (Mental -1)."; } } }
            ] 
        },
        { 
            id: "S05", titre: "Coup de fil anonyme", desc: "Une respiration pesante se fait entendre à l'autre bout de la ligne.", 
            choix: [
                { txt: "Raccrocher immédiatement", action: () => { if (Math.random() > 0.4) { return "La ligne est coupée, aucun nouvel appel."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le téléphone sonne à nouveau cinq minutes plus tard (Mental -1)."; } } },
                { txt: "Tenter une localisation du signal", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 6) { joueur.respect += 1; return "Vous identifiez la cabine d'un rival et le prenez de vitesse (Respect +1)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le signal était masqué derrière des proxys impénétrables (Mental -1)."; } } },
                { txt: "Répondre par des menaces de mort explicites", action: () => { let score = joueur.crainte + Math.floor(Math.random() * 6); if (score >= 4) { joueur.crainte += 1; return "L'interlocuteur raccroche, visiblement déstabilisé (Crainte +1)."; } else { joueur.heat += 10; return "Votre interlocuteur éclate de rire et promet des représailles (Tension +10%)."; } } }
            ] 
        },
        { 
            id: "S06", titre: "Verre renversé", desc: "Dans un bar miteux, un client alcoolisé bouscule brutalement votre table.", 
            choix: [
                { txt: "Tempérer la situation et s'excuser", action: () => { if (Math.random() > 0.3) { joueur.moralite = Math.min(10, joueur.moralite + 1); return "L'homme marmonne une excuse et s'éloigne (Moralité +1)."; } else { joueur.respect = Math.max(0, joueur.respect - 1); return "Le bar entier se moque de votre passivité (Respect -1)."; } } },
                { txt: "Lui subtiliser son portefeuille pendant la bousculade", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 6) { joueur.argent += 500; joueur.argentGagne += 500; return "Geste chirurgical. Vous empochez 500 € en toute discrétion."; } else { joueur.heat += 10; return "Pris la main dans la poche, une bagarre générale éclate (Tension +10%)."; } } },
                { txt: "Lui asséner un coup violent sans sommation", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 6) { joueur.crainte += 2; joueur.moralite = Math.max(0, joueur.moralite - 1); return "L'homme s'écroule net. Le silence se fait dans la salle (Crainte +2)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); joueur.heat += 10; return "Le coup a manqué de punch et la riposte vous sonne (Mental -1, Tension +10%)."; } } }
            ] 
        },
        { 
            id: "S07", titre: "Rumeur de quartier", desc: "Le commerçant du coin commente bruyamment votre dernier coup.", 
            choix: [
                { txt: "Prendre l'information avec détachement", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Vous écoutez l'histoire avec délectation (Mental +1)."; } else { return "Le commerçant change de sujet sans faire attention à vous."; } } },
                { txt: "Lui glisser un billet pour orienter la discussion (-1 000 €)", action: () => { if (depenser(1000)) { if (Math.random() > 0.3) { joueur.heat = Math.max(0, joueur.heat - 10); return "Le commerçant promet d'égarer les curieux sur de fausses pistes (Tension -10%)."; } else { return "Il empoche l'argent mais reste bavard comme une pie."; } } else { joueur.heat += 5; return "Faute de moyens, votre proposition le rend suspicieux (Tension +5%)."; } } },
                { txt: "Lui faire comprendre de se taire à l'écart", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 6) { joueur.crainte += 1; return "Un regard appuyé dans l'arrière-boutique scelle son silence (Crainte +1)."; } else { joueur.heat += 15; return "Paniqué par vos menaces, il prévient le commissariat de quartier (Tension +15%)."; } } }
            ] 
        },
        { 
            id: "S08", titre: "Panne de réseau", desc: "Votre routeur sécurisé perd sa synchronisation satellite.", 
            choix: [
                { txt: "Relancer manuellement le matériel", action: () => { if (Math.random() > 0.4) { return "Le matériel redémarre sans encombre."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "La panne persiste plusieurs heures et bloque vos opérations (Mental -1)."; } } },
                { txt: "Détourner le signal du voisinage", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 6) { return "Pont réseau établi en quelques secondes sur une ligne voisine."; } else { joueur.heat += 10; return "Le pare-feu voisin déclenche une alerte intrusion chez le fournisseur (Tension +10%)."; } } },
                { txt: "Abandonner temporairement la planque (-3 000 €)", action: () => { if (depenser(3000)) { if (Math.random() > 0.3) { return "Nuit passée dans un hôtel sécurisé."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "L'hôtel était surveillé par des patrouilles en civil (Mental -1)."; } } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Sans fonds pour l'hôtel, vous passez une nuit blanche et nerveuse (Mental -2)."; } } }
            ] 
        },
        { 
            id: "S09", titre: "Visite du bailleur", desc: "Le propriétaire exige d'inspecter les compteurs de la planque.", 
            choix: [
                { txt: "Camoufler le matériel compromettant", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 6) { return "Tout le matériel est dissimulé dans les faux plafonds à temps."; } else { joueur.risquePrison += 3; return "Il aperçoit des plans et des étuis suspects (Risque +3%)."; } } },
                { txt: "Lui verser une avance en liquide pour écourter la visite (-3 000 €)", action: () => { if (depenser(3000)) { if (Math.random() > 0.2) { return "Ravi du supplément, il repart immédiatement sans poser de questions."; } else { joueur.heat += 5; return "Il prend l'argent mais s'interroge sur l'origine de ces liasses (Tension +5%)."; } } else { joueur.risquePrison += 2; return "Votre refus de payer l'incite à faire une inspection méticuleuse (Risque +2%)."; } } },
                { txt: "Lui refuser fermement l'accès au domicile", action: () => { if (Math.random() > 0.5) { return "Vexé, il tourne les talons en marmonnant."; } else { joueur.heat += 15; return "Il contacte les forces de l'ordre pour signaler un locataire clandestin (Tension +15%)."; } } }
            ] 
        },
        { 
            id: "S10", titre: "Trouvaille sur le bitume", desc: "Un portefeuille bien garni traîne sur une banquette de métro.", 
            choix: [
                { txt: "Garder les liquidités et jeter le reste", action: () => { if (Math.random() > 0.3) { joueur.argent += 1000; joueur.argentGagne += 1000; return "Vous récupérez 1 000 € en petites coupures non tracées."; } else { joueur.heat += 5; return "Une caméra de quai vous a filmé en train de ramasser l'objet (Tension +5%)."; } } },
                { txt: "Le déposer aux objets trouvés", action: () => { if (Math.random() > 0.3) { joueur.moralite = Math.min(10, joueur.moralite + 1); joueur.heat = Math.max(0, joueur.heat - 10); return "Ce geste civique apaise votre conscience (Moralité +1, Tension -10%)."; } else { return "Le préposé prend le portefeuille sans un regard."; } } },
                { txt: "Exploiter les cartes bancaires en ligne", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7) { joueur.argent += 4000; joueur.argentGagne += 4000; return "Commandes passées via des comptes relais (+4 000 €)."; } else { joueur.risquePrison += 3; return "Le blocage bancaire a tracé l'adresse IP de votre connexion (Risque +3%)."; } } }
            ] 
        },
        { 
            id: "S11", titre: "La fuite de gaz", desc: "Une forte odeur d'hydrocarbures envahit la cage d'escalier de la planque.", 
            choix: [
                { txt: "Évacuer discrètement avec les caisses de matériel", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 5) { return "Vous chargez le matériel dans le coffre sans attirer l'attention des voisins."; } else { joueur.heat += 10; return "Un voisin vous aide à porter une caisse particulièrement lourde et suspecte (Tension +10%)."; } } },
                { txt: "Faire intervenir un artisan au noir (-1 500 €)", action: () => { if (depenser(1500)) { if (Math.random() > 0.3) { return "La fuite est réparée en une heure dans la plus grande discrétion."; } else { joueur.crainte += 1; return "L'artisan a vu vos armes et promet de se taire par pure terreur (Crainte +1)."; } } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Sans argent pour payer le dépanneur, vous coupez l'arrivée générale vous-même (Mental -1)."; } } },
                { txt: "Calfeutrer les portes et attendre la fin de l'alerte", action: () => { if (Math.random() > 0.5) { joueur.risquePrison += 2; return "Les pompiers inspectent le couloir sans toquer à votre porte (Risque +2%)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Les vapeurs toxiques vous causent d'atroces migraines (Mental -2)."; } } }
            ] 
        },
        { 
            id: "S12", titre: "Pourboire suspect", desc: "Un livreur attarde son regard sur des armes posées sur votre meuble d'entrée.", 
            choix: [
                { txt: "Le toiser froidement pour le dissuader d'ouvrir la bouche", action: () => { let score = joueur.crainte + Math.floor(Math.random() * 6); if (score >= 4) { joueur.crainte += 1; return "Pétrifié, il recule sans demander son reste (Crainte +1)."; } else { joueur.heat += 15; return "Dès la porte refermée, il compose le numéro de la police (Tension +15%)."; } } },
                { txt: "Lui tendre un pourboire colossal pour acheter son silence (-500 €)", action: () => { if (depenser(500)) { if (Math.random() > 0.3) { return "L'argent fait disparaître toute velléité de bavardage."; } else { joueur.heat += 5; return "Le montant extravagant renforce ses soupçons (Tension +5%)."; } } else { joueur.heat += 10; return "Faute de monnaie, le malaise s'installe et il s'enfuit en courant (Tension +10%)."; } } },
                { txt: "L'empoigner brutalement avant qu'il ne quitte le palier", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 6) { joueur.moralite = Math.max(0, joueur.moralite - 1); joueur.crainte += 2; return "Secoué vigoureusement, il jure de ne rien avoir vu (Crainte +2, Moralité -1)."; } else { joueur.heat += 15; joueur.moralite = Math.max(0, joueur.moralite - 1); return "Il se débat bruyamment et ameute les résidents de l'étage (Tension +15%)."; } } }
            ] 
        },
        { 
            id: "S13", titre: "La table clandestine", desc: "On vous propose une place dans une partie de poker clandestine en sous-sol.", 
            choix: [
                { txt: "Prendre place et miser gros", action: () => { if (Math.random() > 0.5) { joueur.argent += 10000; joueur.argentGagne += 10000; joueur.respect += 1; return "Une série de mains exceptionnelles vous rapporte 10 000 € (Respect +1)."; } else { let perte = Math.min(joueur.argent, 5000); joueur.argent -= perte; joueur.argentPerdu += perte; return `La chance vous abandonne et vous perdez ${perte} €.`; } } },
                { txt: "Analyser les tricheries des autres joueurs", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 6) { joueur.stats.intel += 1; return "Vous décryptez les signaux des faux jetons (+1 Intel)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Les croupiers remarquent votre manège et vous expulsent (Mental -1)."; } } },
                { txt: "Décliner l'invitation et rester concentré", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Vous préservez votre capital et votre sérénité (Mental +1)."; } else { return "Vous passez une soirée ordinaire dans votre planque sans vous faire remarquer."; } } }
            ] 
        }
    ],
    moyen: [
        { 
            id: "M01", titre: "Chantage au cliché", desc: "Un individu prétend détenir des photos de vos repérages récents.", 
            choix: [
                { txt: "Acheter l'intégralité des négatifs (-10 000 €)", action: () => { if (depenser(10000)) { if (Math.random() > 0.2) { return "Les clichés et cartes mémoire sont détruits devant vous."; } else { joueur.heat += 10; return "Il avait conservé un double et tente une nouvelle extorsion (Tension +10%)."; } } else { joueur.heat += 25; return "Incapable de payer, les clichés sont envoyés anonymement à la presse (Tension +25%)."; } } },
                { txt: "Localiser l'individu et détruire son matériel", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 2; return "L'appareil est brisé et le maître chanteur neutralisé (Crainte +2)."; } else { joueur.risquePrison += 4; return "L'agression échoue et l'homme court déposer plainte (Risque +4%)."; } } },
                { txt: "Pirater son espace de stockage distant", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7) { return "Les serveurs du maître chanteur sont effacés sans laisser de trace."; } else { joueur.heat += 15; return "L'intrusion déclenche une sauvegarde automatique vers ses complices (Tension +15%)."; } } }
            ] 
        },
        { 
            id: "M02", titre: "Concurrence territoriale", desc: "Une bande rivale exige un droit de passage sur vos zones de repli.", 
            choix: [
                { txt: "Organiser une expédition punitive", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 8) { joueur.respect += 3; joueur.crainte += 2; return "La bande rivale bat en retraite définitivement (Respect +3, Crainte +2)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); joueur.heat += 20; return "L'affrontement tourne au désastre pour vos troupes (Mental -2, Tension +20%)."; } } },
                { txt: "Négocier un accord financier temporaire (-15 000 €)", action: () => { if (depenser(15000)) { if (Math.random() > 0.3) { return "Un pacte de non-agression est signé avec leur chef."; } else { joueur.respect = Math.max(0, joueur.respect - 1); return "Ils empochent la somme et vous considèrent désormais comme une proie facile (Respect -1)."; } } else { joueur.heat += 15; return "Faute de fonds, les négociations tournent court sous les menaces (Tension +15%)."; } } },
                { txt: "Transmettre un tuyau anonyme aux stups sur leurs planques", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7) { joueur.heat = Math.max(0, joueur.heat - 20); return "La brigade des stups démantèle vos rivaux au petit matin (Tension -20%)."; } else { joueur.crainte = Math.max(0, joueur.crainte - 2); return "Votre rôle d'indicateur fuite dans le milieu criminel (Crainte -2)."; } } }
            ] 
        },
        { 
            id: "M03", titre: "La lettre anonyme", desc: "Un courrier glissé sous la porte liste les immatriculations de vos véhicules.", 
            condition: () => joueur.vehicule !== 'Aucun',
            choix: [
                { txt: "Changer immédiatement de planque et de véhicules (-20 000 €)", action: () => { if (depenser(20000)) { if (Math.random() > 0.2) { joueur.risquePrison = Math.max(0, joueur.risquePrison - 15); return "Nouvelle planque sécurisée et plaques changées (Risque -15%)."; } else { return "Déménagement effectué mais les frais annexes ont été exorbitants."; } } else { joueur.risquePrison += 5; return "Fonds insuffisants pour déménager. L'étau se resserre (Risque +5%)."; } } },
                { txt: "Tendre une embuscade au messager", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 3; return "L'espion est intercepté et vous livre le nom de son commanditaire (Crainte +3)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Le guet-apens échoue et votre couverture locale est grillée (Mental -2)."; } } },
                { txt: "Faire le choix d'ignorer la provocation", action: () => { if (Math.random() > 0.5) { joueur.mental = Math.min(10, joueur.mental + 1); return "C'était un coup de bluff. Rien ne se produit (Mental +1)."; } else { joueur.risquePrison += 4; return "Les surveillances policières se multiplient autour du bâtiment (Risque +4%)."; } } }
            ] 
        },
        { 
            id: "M04", titre: "L'interrogatoire impromptu", desc: "Un commissaire de police en civil prend place en face de vous sur une terrasse.", 
            choix: [
                { txt: "Maintenir un calme absolu et soutenir le regard", action: () => { let score = joueur.mental + Math.floor(Math.random() * 6); if (score >= 7) { joueur.heat = Math.max(0, joueur.heat - 10); return "Votre flegme le déroute totalement. Il quitte la table sans preuves (Tension -10%)."; } else { joueur.risquePrison += 4; return "Vos hésitations trahissent votre nervosité. Il ordonne une filature (Risque +4%)."; } } },
                { txt: "Tenter de l'embrouiller avec une fausse identité commerciale", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7) { joueur.respect += 1; return "Vos faux papiers et votre bagout commercial le convainquent (Respect +1)."; } else { joueur.heat += 20; return "Le commissaire repère les failles de votre histoire immédiatement (Tension +20%)."; } } },
                { txt: "Quitter les lieux abruptement en l'insultant", action: () => { if (Math.random() > 0.4) { joueur.crainte += 1; return "Votre agressivité soudaine le fige le temps que vous disparaissiez (Crainte +1)."; } else { joueur.heat += 20; joueur.risquePrison += 2; return "Il alerte ses collègues en patrouille pour vous intercepter (Tension +20%, Risque +2%)."; } } }
            ] 
        },
        { 
            id: "M05", titre: "Le vieux complice", desc: "Un ancien associé fraîchement sorti de détention réclame sa part oubliée.", 
            choix: [
                { txt: "Régler la dette immédiatement (-15 000 €)", action: () => { if (depenser(15000)) { if (Math.random() > 0.3) { joueur.respect += 2; return "Votre parole d'honneur est respectée. Le milieu salue le geste (Respect +2)."; } else { return "Il prend l'argent sans un mot de remerciement."; } } else { joueur.risquePrison += 3; return "Incapable de payer, il menace d'aller voir les autorités (Risque +3%)."; } } },
                { txt: "Lui proposer une place sur la prochaine opération", action: () => { if (Math.random() > 0.4) { return "Il accepte le partenariat avec enthousiasme."; } else { joueur.respect = Math.max(0, joueur.respect - 1); return "Il refuse l'offre et vous accuse de vouloir l'exploiter (Respect -1)."; } } },
                { txt: "L'éconduire violemment et lui interdire le secteur", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 2; return "Battu à plate couture, il quitte la ville sans insister (Crainte +2)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "L'affrontement tourne à son avantage devant vos recrues (Mental -2)."; } } }
            ] 
        },
        { 
            id: "M06", titre: "L'agent des télécoms", desc: "Un technicien réseau découvre par hasard un concentrateur pirate sur votre ligne.", 
            choix: [
                { txt: "Le corrompre pour falsifier son rapport d'intervention (-8 000 €)", action: () => { if (depenser(8000)) { if (Math.random() > 0.2) { return "Le rapport mentionne un simple défaut de ligne. Incident clos."; } else { joueur.heat += 5; return "Il accepte l'argent mais exige des versements récurrents (Tension +5%)."; } } else { joueur.risquePrison += 4; return "Sans fonds, le technicien envoie son rapport d'intrusion au parquet (Risque +4%)."; } } },
                { txt: "Pirater sa tablette pour effacer l'anomalie enregistrée", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7) { return "Les données de diagnostic sont corrompues à distance avec succès."; } else { joueur.heat += 15; return "L'intrusion logicielle alerte le service de sécurité de l'opérateur (Tension +15%)."; } } },
                { txt: "Séquestrer l'agent et confisquer son matériel", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 2; joueur.moralite = Math.max(0, joueur.moralite - 2); return "Terrifié, il s'engage sous la contrainte à démissionner (Crainte +2, Moralité -2)."; } else { joueur.heat += 20; return "Il parvient à déclencher son alarme de détresse professionnelle (Tension +20%)."; } } }
            ] 
        },
        { 
            id: "M07", titre: "La cargaison sans maître", desc: "Une camionnette accidentée contenant des caisses scellées est abandonnée près de chez vous.", 
            choix: [
                { txt: "Forcer les scellés et piller le chargement", action: () => { if (Math.random() > 0.4) { joueur.argent += 25000; joueur.argentGagne += 25000; joueur.risquePrison += 3; return "Cargaison de luxe récupérée (+25 000 €, Risque +3%)."; } else { joueur.heat += 20; return "Le transporteur était surveillé par la brigade des douanes (Tension +20%)."; } } },
                { txt: "Contacter un receleur pour évacuer le camion à cinquante-cinquante", action: () => { if (Math.random() > 0.3) { joueur.argent += 12000; joueur.argentGagne += 12000; joueur.respect += 2; return "Opération propre. Votre receleur écoule le lot et partage les gains (+12 000 €, Respect +2)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le receleur disparaît avec l'intégralité de la marchandise (Mental -1)."; } } },
                { txt: "Ne pas toucher au véhicule et s'éloigner", action: () => { if (Math.random() > 0.5) { return "Une équipe de nettoyeurs rivaux récupère le véhicule sans incident."; } else { joueur.heat += 5; return "La police quadrille le quartier pour inspecter le véhicule suspect (Tension +5%)."; } } }
            ] 
        },
        { 
            id: "M08", titre: "L'avocat d'affaires", desc: "Un juriste influent propose de faire disparaître une ancienne déposition vous concernant.", 
            choix: [
                { txt: "Régler l'intégralité de ses honoraires occultes (-20 000 €)", action: () => { if (depenser(20000)) { if (Math.random() > 0.2) { joueur.risquePrison = Math.max(0, joueur.risquePrison - 20); return "Le dossier d'instruction est détruit pour vice de forme (Risque -20%)."; } else { return "Le greffe traîne des pieds mais la procédure est ralentie."; } } else { joueur.risquePrison += 2; return "Faute de paiement, l'avocat transmet le dossier au magistrat (Risque +2%)."; } } },
                { txt: "Négocier ses tarifs en échange d'informations financières (-10 000 €)", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7 && depenser(10000)) { joueur.risquePrison = Math.max(0, joueur.risquePrison - 15); return "Accord conclu à moitié prix grâce à vos tuyaux financiers (Risque -15%)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "L'avocat rejette vos propositions et rompt le contact (Mental -1)."; } } },
                { txt: "Refuser l'offre et couper les communications", action: () => { if (Math.random() > 0.5) { return "L'avocat abandonne la piste sans donner suite."; } else { joueur.heat += 10; return "Il revend l'information à un cabinet rival (Tension +10%)."; } } }
            ] 
        },
        { 
            id: "M09", titre: "Le receleur gourmand", desc: "Votre intermédiaire financier exige une commission supplémentaire sous peine de blocage.", 
            choix: [
                { txt: "Accepter la hausse de commission sans négocier", action: () => { let part = Math.floor(joueur.argent * 0.15); joueur.argent -= part; joueur.argentPerdu += part; if (Math.random() > 0.3) { return `Vous cédez ${part.toLocaleString()} € pour maintenir vos canaux d'écoulement.`; } else { joueur.respect = Math.max(0, joueur.respect - 1); return `Le receleur empoche vos ${part.toLocaleString()} € et se montre arrogant (Respect -1).`; } } },
                { txt: "Démontrer comptablement les failles de ses exigences", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 8) { return "Vos arguments financiers le contraignent à respecter les tarifs initiaux."; } else { joueur.respect = Math.max(0, joueur.respect - 2); return "Il rejette vos calculs et boycotte temporairement vos cargaisons (Respect -2)."; } } },
                { txt: "Lui rappeler les conséquences physiques d'une trahison", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 8) { joueur.crainte += 2; return "Un avertissement musclé le ramène à la raison sans délai (Crainte +2)."; } else { joueur.heat += 15; return "La confrontation dégénère et il coupe définitivement les ponts (Tension +15%)."; } } }
            ] 
        },
        { 
            id: "M10", titre: "L'ancien complice évincé", desc: "Une recrue récemment renvoyée cherche à vous faire chanter.", 
            condition: () => Object.keys(joueur.recruesVirees).length > 0 || joueur.recruesMortes.length > 0,
            choix: [
                { txt: "Lui verser une prime de séparation (-10 000 €)", action: () => { if (depenser(10000)) { if (Math.random() > 0.3) { joueur.respect += 1; return "Il prend la somme et quitte la région (Respect +1)."; } else { return "L'argent est empoché mais la rancune demeure."; } } else { joueur.risquePrison += 3; return "Faute de moyens, il commence à contacter des officiers de police (Risque +3%)."; } } },
                { txt: "Lui imposer le silence par la force", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 2; return "Une démonstration de force suffit à lui faire passer le message (Crainte +2)."; } else { joueur.heat += 20; return "La bagarre éclate sur la voie publique et attire des témoins (Tension +20%)."; } } },
                { txt: "Changer d'adresse pour couper tout contact", action: () => { avancerTemps(1); if (Math.random() > 0.4) { return "Vous vous installez ailleurs et semez définitivement sa trace."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le déménagement précipité désorganise vos affaires (Mental -1)."; } } }
            ] 
        }
    ],
    complique: [
        { 
            id: "C01", titre: "L'infiltration d'un indic", desc: "Une recrue prometteuse semble entretenir des liens troubles avec les autorités.", 
            condition: () => joueur.equipe.length > 0,
            choix: [
                { txt: "Mener un interrogatoire psychologique poussé", action: () => { let score = joueur.mental + Math.floor(Math.random() * 6); if (score >= 8) { joueur.respect += 5; return "L'espion craque sous la pression et avoue sa mission d'infiltration (Respect +5)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Il retourne vos questions contre vous et sème le doute dans l'équipe (Mental -2)."; } } },
                { txt: "Lui transmettre de faux plans d'opération", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 8) { joueur.heat = Math.max(0, joueur.heat - 20); return "La police se déploie en masse sur une fausse cible (Tension -20%)."; } else { joueur.risquePrison += 4; return "Il détecte le piège et transmet vos véritables coordonnées (Risque +4%)."; } } },
                { txt: "L'éliminer froidement à titre préventif", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 8) { joueur.crainte += 5; joueur.moralite = Math.max(0, joueur.moralite - 4); return "Disparition immédiate. Personne dans le réseau n'osera parler (Crainte +5, Moralité -4)."; } else { joueur.heat += 30; joueur.moralite = Math.max(0, joueur.moralite - 4); return "L'élimination échoue et l'indic s'échappe sous protection policière (Tension +30%)."; } } }
            ] 
        },
        { 
            id: "C02", titre: "Le consortium cybercriminel", desc: "Un groupe de pirates informatiques sollicite vos serveurs pour une attaque d'ampleur.", 
            condition: () => joueur.possessions.includes('e_serveur'),
            choix: [
                { txt: "Mettre à disposition vos réseaux sécurisés", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 9) { joueur.argent += 150000; joueur.argentGagne += 150000; return "Opération financière massive. Vous touchez 150 000 € de commission nette."; } else { joueur.risquePrison += 7; return "Les serveurs sont saisis par les services fédéraux de lutte contre la cybercriminalité (Risque +7%)."; } } },
                { txt: "Revendre les informations de l'attaque aux banques ciblées", action: () => { if (Math.random() > 0.4) { joueur.argent += 50000; joueur.argentGagne += 50000; joueur.respect = Math.max(0, joueur.respect - 5); return "Prime de sécurité touchée, mais le milieu vous tourne le dos (+50 000 €, Respect -5)."; } else { joueur.crainte = Math.max(0, joueur.crainte - 3); joueur.heat += 15; return "Les hackers découvrent votre trahison et publient vos données personnelles (Tension +15%)."; } } },
                { txt: "Refuser fermement toute implication", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Vous évitez un scandale d'État et préservez vos opérations (Mental +1)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le consortium vous lance des attaques par déni de service de représailles (Mental -1)."; } } }
            ] 
        },
        { 
            id: "C03", titre: "Le piège fédéral", desc: "Une proposition de braquage particulièrement lucrative présente toutes les marques d'un guet-apens.", 
            choix: [
                { txt: "Analyser minutieusement les données de la cible", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 9) { joueur.respect += 5; return "Vous mettez au jour les faux certificats du FBI et évitez le piège (Respect +5)."; } else { allerEnPrison("Guet-apens fédéral confirmé lors de la phase d'approche."); return "Les unités d'intervention vous cernent immédiatement."; } } },
                { txt: "Sous-traiter le coup à une équipe concurrente (-30 000 €)", action: () => { if (depenser(30000)) { if (Math.random() > 0.2) { joueur.heat = Math.max(0, joueur.heat - 30); return "L'équipe concurrente tombe dans le piège à votre place (Tension -30%)."; } else { return "L'équipe concurrente se méfie et refuse la proposition."; } } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Fonds insuffisants pour monter l'opération de diversion (Mental -1)."; } } },
                { txt: "Classer l'affaire et doubler la sécurité de la planque", action: () => { if (Math.random() > 0.3) { joueur.mental = Math.min(10, joueur.mental + 1); return "La prudence vous évite une arrestation certaine (Mental +1)."; } else { joueur.risquePrison += 2; return "Des véhicules de surveillance banalisés patrouillent dans votre secteur (Risque +2%)."; } } }
            ] 
        },
        { 
            id: "C04", titre: "La fusillade nocturne", desc: "Des règlements de comptes violents éclatent au pied de votre immeuble.", 
            choix: [
                { txt: "Prendre les armes pour repousser les assaillants", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 9) { joueur.crainte += 5; return "Votre riposte violente met en déroute les tireurs (Crainte +5)."; } else { joueur.mental = Math.max(1, joueur.mental - 3); joueur.risquePrison += 4; return "Touché lors des échanges de tirs, vous devez vous soigner dans l'urgence (Mental -3, Risque +4%)."; } } },
                { txt: "S'exfiltrer par les toits de la ville", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 9) { return "Vous quittez le périmètre sans être repéré par le cordon policier."; } else { joueur.risquePrison += 6; return "Un projecteur d'hélicoptère accroche votre silhouette sur les toits (Risque +6%)."; } } },
                { txt: "Rester retranché en silence", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.max(1, joueur.mental - 1); return "Les tirs cessent avec l'arrivée des renforts de police."; } else { joueur.mental = Math.max(1, joueur.mental - 2); joueur.heat += 15; return "Des tirs de sommation perforent vos cloisons (Mental -2, Tension +15%)."; } } }
            ] 
        },
        { 
            id: "C05", titre: "L'ultimatum du parrain", desc: "Le syndicat du crime local exige un tiers de vos liquidités sous menace directe.", 
            choix: [
                { txt: "Verser le tribut exigé pour préserver la paix", action: () => { let taxe = Math.floor(joueur.argent * 0.3); joueur.argent -= taxe; joueur.argentPerdu += taxe; if (Math.random() > 0.3) { return `Vous versez ${taxe.toLocaleString()} € pour maintenir vos affaires à flot.`; } else { joueur.respect = Math.max(0, joueur.respect - 2); return `Le syndicat encaisse vos ${taxe.toLocaleString()} € et réclame déjà davantage (Respect -2).`; } } },
                { txt: "Lancer une opération pour éliminer leur chef", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 10) { joueur.respect += 10; joueur.crainte += 10; return "Le chef du syndicat est abattu. Vous prenez le contrôle de la place (Respect +10, Crainte +10)."; } else { allerEnPrison("L'assaut a échoué. Les hommes du syndicat vous ont livré aux forces de l'ordre."); return "Fin de partie violente."; } } },
                { txt: "Siphonner leurs comptes offshores en représailles", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 9) { joueur.argent += 100000; joueur.argentGagne += 100000; return "Leurs comptes sont siphonnés à votre profit (+100 000 €)."; } else { joueur.mental = Math.max(1, joueur.mental - 4); joueur.heat += 25; return "Leur sécurité informatique bloque l'attaque et localise votre relais (Mental -4, Tension +25%)."; } } }
            ] 
        },
        { 
            id: "C06", titre: "L'avis de perquisition", desc: "Une source fiable vous avertit qu'un raid tactique est prévu à l'aube sur votre planque.", 
            choix: [
                { txt: "Incendier les archives et s'évacuer immédiatement", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 8) { return "Toutes les preuves partent en fumée avant l'arrivée du raid."; } else { joueur.risquePrison += 7; return "L'incendie prématuré attire les patrouilles avant votre départ (Risque +7%)."; } } },
                { txt: "Faire appel à des nettoyeurs professionnels (-40 000 €)", action: () => { if (depenser(40000)) { if (Math.random() > 0.2) { joueur.heat = Math.max(0, joueur.heat - 40); return "Les nettoyeurs stérilisent le lieu. Le raid ne trouve absolument rien (Tension -40%)."; } else { return "Le lieu est nettoyé mais les nettoyeurs ont gardé des copies d'assurance."; } } else { allerEnPrison("Fonds insuffisants pour payer les nettoyeurs. Pris au saut du lit par le SWAT."); return "Arrestation musclée."; } } },
                { txt: "Préparer un dossier de vice de procédure avec vos juristes", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 8) { joueur.risquePrison = 0; return "Le mandat est annulé par le juge d'instruction avant l'assaut."; } else { allerEnPrison("Le vice de forme est rejeté. Vous êtes appréhendé sans délai."); return "Direction la maison d'arrêt."; } } }
            ] 
        },
        { 
            id: "C07", titre: "La prise d'otage", desc: "Un cartel rival a capturé votre contact principal et réclame rançon.", 
            choix: [
                { txt: "Payer la rançon demandée (-50 000 €)", action: () => { if (depenser(50000)) { if (Math.random() > 0.2) { joueur.respect += 2; return "Votre contact est libéré sain et sauf (Respect +2)."; } else { return "Le contact est libéré mais reste profondément marqué psychologiquement."; } } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Fonds insuffisants. Vous apprenez son exécution le lendemain (Mental -2)."; } } },
                { txt: "Lancer un raid armé pour le libérer", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 9) { joueur.crainte += 5; joueur.moralite = Math.max(0, joueur.moralite - 2); return "L'assaut fait des ravages mais l'otage est extrait vivant (Crainte +5)."; } else { joueur.mental = Math.max(1, joueur.mental - 4); return "L'opération échoue et l'otage périt sous les tirs croisés (Mental -4)."; } } },
                { txt: "Refuser toute négociation publiquement", action: () => { let score = joueur.mental + Math.floor(Math.random() * 6); if (score >= 8) { joueur.crainte += 5; joueur.moralite = Math.max(0, joueur.moralite - 3); return "Votre détermination sans faille impressionne le cartel qui relâche l'otage sans conditions (Crainte +5)."; } else { joueur.mental = Math.max(1, joueur.mental - 3); joueur.moralite = Math.max(0, joueur.moralite - 3); return "Le cartel exécute l'otage et la culpabilité vous hante (Mental -3, Moralité -3)."; } } }
            ] 
        },
        { 
            id: "C08", titre: "Les coupures tracées", desc: "Le produit de votre dernier coup comporte des traceurs de la banque centrale.", 
            choix: [
                { txt: "Faire appel à un circuit de blanchiment express (-15 000 €)", action: () => { if (depenser(15000)) { if (Math.random() > 0.2) { return "Les coupures sont remplacées par des devises étrangères propres."; } else { joueur.heat += 10; return "Le blanchisseur a pris une commission exorbitante sur l'échange (Tension +10%)."; } } else { allerEnPrison("Interpellé en tentant d'écouler les coupures marquées."); return "Menottes immédiates."; } } },
                { txt: "Détruire la totalité des liasses suspectes", action: () => { let part = Math.floor(joueur.argent * 0.2); joueur.argent -= part; joueur.argentPerdu += part; if (Math.random() > 0.3) { joueur.moralite = Math.max(0, joueur.moralite - 1); return `Vous réduisez en cendres ${part.toLocaleString()} € pour couper court à toute enquête.`; } else { joueur.mental = Math.max(1, joueur.mental - 1); return `La destruction de ${part.toLocaleString()} € affecte lourdement votre moral (Mental -1).`; } } },
                { txt: "Tenter d'écouler les billets malgré le risque", action: () => { if (Math.random() > 0.6) { return "Les commerçants ne remarquent aucune anomalie sur les billets."; } else { joueur.risquePrison += 5; return "Plusieurs commerces signalent les numéros de série à la banque de France (Risque +5%)."; } } }
            ] 
        }
    ],
    prison: [
        { 
            id: "P01", titre: "Affrontement aux douches", desc: "Un groupe de détenus hostiles bloque la sortie des vestiaires.", 
            choix: [
                { txt: "Prendre l'initiative et frapper en premier", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 3; return "Vous mettez leur meneur hors de combat devant les surveillants (Crainte +3)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Submergé par le nombre, vous vous réveillez à l'infirmerie (Mental -2)."; } } },
                { txt: "Esquiver le groupe et alerter discrètement la garde", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 6) { return "Vous vous extirpez du piège sans essuyer le moindre coup."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Rattrapé près de la grille, vous encaissez plusieurs coups (Mental -1)."; } } },
                { txt: "Acheter la protection des caïds du pavillon (-5 000 €)", action: () => { if (depenser(5000)) { if (Math.random() > 0.2) { return "Les caïds interviennent et dispersent le groupe immédiatement."; } else { return "Votre argent est pris mais vos protecteurs restent distants."; } } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Sans argent pour payer la taxe, l'agression est inévitable (Mental -2)."; } } }
            ] 
        },
        { 
            id: "P02", titre: "Le trafic de coursive", desc: "Un surveillant propose d'introduire du matériel prohibé dans votre cellule.", 
            choix: [
                { txt: "Acheter un terminal mobile crypté (-8 000 €)", action: () => { if (depenser(8000)) { if (Math.random() > 0.2) { joueur.stats.intel += 1; return "Le terminal vous permet de piloter vos réseaux extérieurs (+1 Intel)."; } else { return "Le téléphone fonctionne par intermittence mais reste utile."; } } else { return "Fonds insuffisants pour conclure la transaction."; } } },
                { txt: "Acquérir des stéroïdes et du matériel d'entraînement (-5 000 €)", action: () => { if (depenser(5000)) { if (Math.random() > 0.2) { joueur.stats.force += 1; return "Programme d'entraînement intensif en cellule (+1 Force)."; } else { return "Produits de qualité médiocre mais l'exercice physique porte ses fruits."; } } else { return "Fonds insuffisants pour acquérir le lot."; } } },
                { txt: "Rejeter la proposition et garder un profil bas", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Votre discipline exemplaire vous évite toute fouille inopinée (Mental +1)."; } else { return "Le surveillant s'éloigne sans insister."; } } }
            ] 
        },
        { 
            id: "P03", titre: "Le creusement d'un tunnel", desc: "Des codétenus vous proposent de rejoindre une tentative d'évasion par les sous-sols.", 
            choix: [
                { txt: "Prendre part à la tentative d'évasion nocturne", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 8) { joueur.peineActuelle = 0; return "Vous franchissez le périmètre extérieur sans alerter les miradors ! Liberté retrouvée."; } else { joueur.peineActuelle += 3; return "Interpellé dans les conduites d'évacuation (+3 ans de peine ferme)."; } } },
                { txt: "Révéler le plan à l'administration pénitentiaire", action: () => { if (Math.random() > 0.3) { joueur.peineActuelle = Math.max(1, joueur.peineActuelle - 2); joueur.respect = Math.max(0, joueur.respect - 5); return "Remise de peine accordée par la direction (-2 ans, Respect -5)."; } else { joueur.respect = Math.max(0, joueur.respect - 5); return "La direction prend note sans réduire votre peine (Respect -5)."; } } },
                { txt: "Garder le secret sans prendre part aux travaux", action: () => { if (Math.random() > 0.5) { return "La tentative échoue pour vos codétenus sans que vous ne soyez inquiété."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "L'ensemble du bâtiment est consigné en cellule après l'incident (Mental -1)."; } } }
            ] 
        },
        { 
            id: "P04", titre: "La mutinerie du bloc B", desc: "Une émeute généralisée éclate lors de la fermeture des cellules.", 
            choix: [
                { txt: "Prendre la direction du mouvement d'insoumission", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 8) { joueur.respect += 5; joueur.crainte += 5; return "Vous imposez vos conditions aux équipes d'intervention (Respect +5, Crainte +5)."; } else { joueur.peineActuelle += 2; joueur.mental = Math.max(1, joueur.mental - 2); return "La brigade d'intervention reprend le contrôle par la force (+2 ans de peine, Mental -2)."; } } },
                { txt: "Se barricader dans sa cellule", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Vous évitez les gaz lacrymogènes et les sanctions collectives (Mental +1)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "La porte cède sous les assauts des mutins mais vous restez indemne (Mental -1)."; } } },
                { txt: "Profiter du chaos pour piller le bureau du greffe", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 8) { joueur.argent += 20000; joueur.argentGagne += 20000; return "Vous récupérez 20 000 € de valeurs saisies dans le coffre du greffe."; } else { joueur.peineActuelle += 1; return "Surpris par les caméras de secours du greffe (+1 an de peine)."; } } }
            ] 
        },
        { 
            id: "P05", titre: "L'avis de transfert disciplinaire", desc: "La direction pénitentiaire ordonne votre transfert vers une maison centrale ultra-sécurisée.", 
            choix: [
                { txt: "Soudoyer le directeur adjoint (-30 000 €)", action: () => { if (depenser(30000)) { if (Math.random() > 0.2) { return "Votre dossier est reclassé. Le transfert est annulé."; } else { return "Le transfert est reporté de quelques mois seulement."; } } else { joueur.crainte += 2; return "Fonds insuffisants. Vous partez sous escorte lourde (Crainte +2)."; } } },
                { txt: "Simuler une urgence médicale grave", action: () => { let score = joueur.mental + Math.floor(Math.random() * 6); if (score >= 7) { return "Le médecin suspend le transfert pour observation clinique."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "La supercherie est découverte et vous êtes placé à l'isolement (Mental -2)."; } } },
                { txt: "Accepter le régime de haute sécurité sans protester", action: () => { joueur.peineActuelle += 1; if (Math.random() > 0.4) { joueur.crainte += 3; return "Votre séjour en quartier d'isolement forge votre réputation (Crainte +3, Peine +1 an)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "L'isolement strict entame sévèrement vos facultés (Mental -2, Peine +1 an)."; } } }
            ] 
        }
    ]
};


let joueur = {
    milieu: "", classe: "", originType: "", age: 20, mois: 0,
    argent: 0, argentGagne: 0, argentPerdu: 0,
    cashBlanchi: 0, ville: "", 
    risquePrison: 0, enPrison: false,
    heat: 0, 
    braquagesReussis: 0, cptLarcin: 0,
    blanchisserie: false,
    vehicule: "Aucun",
    mental: 8, 
    moralite: 10, 
    respect: 0,
    crainte: 0,
    stats: { force: 3, intel: 3, furtivite: 3 },
    buffs: { force: 0, intel: 0, furtivite: 0, sangfroid: 0, contacts: 0 },
    competences: { forceT2: false, forceT3: false, intelT2: false, intelT3: false, furtiviteT2: false, furtiviteT3: false, disciplineT2: false },
    pointsCompetence: 0, possessions: [], equipe: [],
    recruesMortes: [], recruesVirees: {},
    statItemsAchetes: 0,
    blanchiPeriodeDebut: 0, blanchiPeriodeMontant: 0,
    risqueParVille: {}, nombreArrestations: 0,
    braquagesParVille: {},
    eventsVus: {},
    journal: []
};


let cibleActuelle = null;
let indexCible = { faible: 0, modere: 0, eleve: 0, legendaire: 0 };
let eventsRestantsAfaire = 0; 

// --- NAVIGATION ET UI ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    let statsBar = document.getElementById('global-stats');
    if(['screen-start', 'screen-milieu', 'screen-classe', 'screen-ville', 'screen-story', 'screen-end', 'screen-event', 'screen-debrief'].includes(screenId)) {
        statsBar.style.display = 'none';
    } else {
        statsBar.style.display = 'block';
        updateStats();
    }
    document.getElementById('msg-arbre').style.display = 'none'; 
}

function updateStats() {
    let enTaule = joueur.enPrison;

    document.getElementById('global-stats').innerHTML = `
        <div class="stat-id">
            <span class="stat-id-item"><strong>${joueur.age} ans</strong><span class="stat-sub">(mois ${joueur.mois})</span></span>
        </div>
        <div class="stat-subline">${joueur.classe || '—'} · ${getStatutCriminel()}</div>
        <div class="stat-id stat-id-money-row">
            <span class="stat-id-item stat-id-money">💰 <strong>${joueur.argent.toLocaleString()} €</strong></span>
            <span class="stat-id-item stat-id-blanchi">🧼 <strong>${joueur.cashBlanchi.toLocaleString()} €</strong></span>
        </div>

        <div class="stat-row3">
            <div class="stat-cell3"><span class="stat-label" title="Force">💪</span><span class="stat-value">${joueur.stats.force}</span></div>
            <div class="stat-cell3"><span class="stat-label" title="Intelligence">🧠</span><span class="stat-value">${joueur.stats.intel}</span></div>
            <div class="stat-cell3"><span class="stat-label" title="Furtivité">🥷</span><span class="stat-value">${joueur.stats.furtivite}</span></div>
        </div>
        <div class="stat-row3">
            <div class="stat-cell3"><span class="stat-label">👑 Respect</span><span class="stat-value">${joueur.respect}</span></div>
            <div class="stat-cell3"><span class="stat-label">💀 Crainte</span><span class="stat-value">${joueur.crainte}</span></div>
            <div class="stat-cell3"><span class="stat-label">💭 Mental</span><span class="stat-value">${joueur.mental}/10</span></div>
        </div>

        <div class="stat-gauges">
            <div class="stat-gauge"><span class="stat-label">⚖️ Moralité</span><span class="stat-value">${joueur.moralite}/10</span></div>
            <div class="stat-gauge"><span class="stat-label">🔥 Heat</span><span class="stat-value heat-text">${joueur.heat}%</span></div>
        </div>

        <div class="stat-risk ${enTaule ? 'stat-risk--jailed' : ''}">
            🚨 Risque Global : ${enTaule ? 'EN TAULE' : joueur.risquePrison + '%'}
        </div>
    `;
}






function avancerTemps(nbMois) {
    joueur.mois += nbMois;
    while (joueur.mois >= 12) { joueur.age++; joueur.mois -= 12; }
    // Seule la Tension retombe naturellement avec le temps. Le Risque, lui, ne bouge
    // que par une action concrète (papiers, chirurgie, déménagement) — voir setVille et le Marché Noir.
    joueur.heat = Math.max(0, Math.round(joueur.heat - nbMois * 1.5));
}

function peutPayer(montant) {
    return (joueur.argent + joueur.cashBlanchi) >= montant;
}

function depenser(montant) {
    if (!peutPayer(montant)) return false;
    if (joueur.argent >= montant) {
        joueur.argent -= montant;
        joueur.argentPerdu += montant;
    } else {
        // L'argent sale ne suffit pas : on pioche le complément dans le cash déjà blanchi.
        let manque = montant - joueur.argent;
        joueur.argentPerdu += joueur.argent;
        joueur.argent = 0;
        joueur.cashBlanchi -= manque;
        joueur.argentPerdu += manque;
    }
    return true;
}

function notify(msg) {
    document.getElementById('hub-notification').innerText = msg;
}

// --- CARNET DE BORD ---
function ajouterJournal(texte) {
    joueur.journal.unshift({ age: joueur.age, mois: joueur.mois, ville: joueur.ville || "—", texte: texte });
    if (joueur.journal.length > 40) joueur.journal.pop();
}

function ouvrirJournal() {
    let html = "";
    if (joueur.journal.length === 0) {
        html = `<p style="color:var(--paper-dim); font-style:italic;">Aucune entrée pour le moment. Vos faits d'armes s'écriront ici au fil de la partie.</p>`;
    } else {
        joueur.journal.forEach(e => {
            html += `<div class="journal-entry">
                <span class="journal-date">An ${e.age} · mois ${e.mois} · ${e.ville}</span>
                <p>${e.texte}</p>
            </div>`;
        });
    }
    document.getElementById('journal-liste').innerHTML = html;
    showScreen('screen-journal');
}

// --- AVATAR TEXTUEL (classe + véhicule) ---
function getAvatarEmoji() {
    let base = joueur.classe === 'Fantôme' ? '🥷' : (joueur.classe === 'Hacker' ? '🧠' : (joueur.classe === 'Gros Bras' ? '💪' : '👤'));
    let vehic = joueur.vehicule === 'Moto' ? '🏍️' : (joueur.vehicule === 'Fourgon' ? '🚐' : '');
    return vehic ? `${base}${vehic}` : base;
}

// --- PRESSE LOCALE ---
function nomJournal() {
    return joueur.ville === 'Paris' ? "Le Réverbère" : (joueur.ville === 'New York' ? "NY Daily Post" : (joueur.ville === 'Los Angeles' ? "LA Chronicle" : "La Gazette"));
}

function genererManchette(ctx) {
    let manchettes;
    if (ctx.reussi && ctx.niveau === 'eleve') {
        manchettes = [
            `« Casse du siècle » : un butin colossal dérobé en plein ${joueur.ville}, la préfecture est sur les dents.`,
            `Un vol d'une ampleur inédite secoue ${joueur.ville} — les enquêteurs évoquent « un réseau parfaitement organisé ».`
        ];
    } else if (ctx.reussi && ctx.violent) {
        manchettes = [
            `Braquage violent à ${joueur.ville} : des blessés parmi les forces de l'ordre, la traque s'intensifie.`,
            `Panique à ${joueur.ville} : des coups de feu ont éclaté durant un vol à main armée.`
        ];
    } else if (ctx.reussi) {
        manchettes = [
            `Un commerce de ${joueur.ville} braqué dans la nuit, aucune piste sérieuse pour l'instant.`,
            `Nouveau vol signalé à ${joueur.ville}. La police appelle les habitants à rester vigilants.`
        ];
    } else {
        manchettes = [
            `Braquage manqué à ${joueur.ville} : un suspect activement recherché, l'enquête se poursuit.`,
            `Alerte déjouée à ${joueur.ville} : la vigilance d'un commerçant a mis en échec une tentative de vol.`
        ];
    }
    return { journal: nomJournal(), texte: manchettes[Math.floor(Math.random() * manchettes.length)] };
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
        joueur.stats.furtivite += 1;
        joueur.argent = 0;
    } else if(originType === 'Classique') {
        joueur.milieu = "Classe Moyenne";
        joueur.stats.force += 1;
        joueur.argent = 0;
    } else if(originType === 'Riche') {
        joueur.milieu = "Milieu Aisé";
        joueur.stats.intel += 1;
        joueur.argent = 20000; 
        joueur.argentGagne += 20000;
    }
    showScreen('screen-classe'); // On va vers le choix de classe
}

function setClasse(nomClasse) {
    joueur.classe = nomClasse;
    if(nomClasse === 'Fantôme') joueur.stats.furtivite += 2;
    if(nomClasse === 'Hacker') joueur.stats.intel += 2;
    if(nomClasse === 'Gros Bras') joueur.stats.force += 2;
    showScreen('screen-ville'); // Ensuite on va vers le choix de la ville
}

function setVille(ville) {
    let ancienneVille = joueur.ville;
    let changeReellement = (ancienneVille !== "" && ancienneVille !== ville);

    if (ancienneVille !== "" && joueur.risquePrison > 0 && !joueur.fauxPapiers) {
        if (Math.random() * 100 < joueur.risquePrison) {
            allerEnPrison("La douane vous a intercepté à l'aéroport.", 6);
            return;
        }
    }

    if (changeReellement) {
        let moisTotal = joueur.age * 12 + joueur.mois;
        // On mémorise le Risque laissé derrière soi dans l'ancienne ville.
        joueur.risqueParVille[ancienneVille] = { valeur: joueur.risquePrison, derniereVisite: moisTotal };

        // On retrouve (ou non) le Risque de la ville de destination : au-delà de 5 ans d'absence, l'ardoise est effacée.
        let entree = joueur.risqueParVille[ville];
        if (entree && (moisTotal - entree.derniereVisite) < 60) {
            joueur.risquePrison = entree.valeur;
            if (entree.valeur > 0) notify(`De retour à ${ville} : votre passé vous y rattrape (Risque : ${entree.valeur}%).`);
        } else {
            if (entree) notify(`Cela fait plus de 5 ans que vous n'étiez pas venu à ${ville}. Votre ardoise y est effacée.`);
            joueur.risquePrison = 0;
        }
    }

    joueur.ville = ville;
    genererStorytelling();
    showScreen('screen-story');
}

function genererStorytelling() {
    let histoires = {
        "Paris": `Issu du ${joueur.milieu.toLowerCase()}, vous avez débarqué dans la grisaille parisienne avec une seule idée en tête : prendre ce qui vous est dû. Entre les ruelles étroites de Montmartre et les avenues bourgeoises, la capitale offre autant d'opportunités que de pièges. En tant que ${joueur.classe}, vos compétences sont votre seule assurance vie. Votre planque est modeste, l'air sent le renfermé, mais c'est le point de départ de votre empire. Le jeu commence.`,
        "New York": `L'odeur de l'asphalte mouillé et le bruit constant des sirènes. Arrivé à New York depuis votre ${joueur.milieu.toLowerCase()}, vous avez vite compris que la Grosse Pomme broie les faibles. Mais vous n'êtes pas n'importe qui. Votre profil de ${joueur.classe} a déjà attiré l'attention de quelques receleurs locaux. Depuis votre planque de fortune à l'ombre des gratte-ciel, la ville qui ne dort jamais n'attend plus que d'être braquée.`,
        "Los Angeles": `Sous le soleil brûlant de Los Angeles, le contraste entre votre ${joueur.milieu.toLowerCase()} et les villas opulentes est saisissant. Ici, tout n'est qu'illusion, paillettes et argent sale. Parfait pour un ${joueur.classe} comme vous, prêt à exploiter les failles de ce paradis artificiel. Vous avez sécurisé une planque discrète loin des palmiers et des regards indiscrets. Préparez votre matériel, et faites-vous un nom.`
    };
    document.getElementById('story-text').innerText = histoires[joueur.ville];
}

function entrerDansLaPlanque() {
    document.getElementById('hub-ville-nom').innerText = joueur.ville;
    genererMissionsHub();
    notify(`Bienvenue à ${joueur.ville}.`);
    showScreen('screen-hub');
}

function petitLarcin() {
    avancerTemps(1);
    joueur.cptLarcin++; 
    
    let butin = Math.floor(Math.random() * 1500) + 500;
    let risqueFichage = joueur.cptLarcin * 15; 
    
    updateStats(); // Mise à jour immédiate de l'âge/mois
    
    if (Math.random() * 100 < 90) { 
        joueur.argent += butin;
        joueur.argentGagne += butin;
        
        let msg = `Vous avez fait les poches d'un passant ou braqué une petite caisse. Butin : ${butin}€.`;
        
        if (Math.random() * 100 < risqueFichage) {
            joueur.heat = Math.min(100, joueur.heat + 15);
            msg += `\n\nCependant, une caméra vous a grillé en pleine action. La police vous a surveillé ! (Tension +15%).`;
            joueur.cptLarcin = 0; 
        }
        
        // Bloque les événements en chaîne pour juste afficher la carte résultat du larcin
        eventsRestantsAfaire = 0; 
        afficherResultatEvenement(msg);
    } else {
        joueur.heat += 10;
        eventsRestantsAfaire = 0;
        afficherResultatEvenement("Le larcin a foiré. La cible s'est défendue et vous avez dû fuir les mains vides. (Heat +10)");
    }
}

function calmerLeJeu() {
    avancerTemps(6);
    joueur.heat = Math.max(0, joueur.heat - 20);
    joueur.mental = Math.min(10, joueur.mental + 1);
    joueur.cptLarcin = 0; 
    
    updateStats();
    notify("Vous faites profil bas. Le temps passe...");
    
    // Déclenche obligatoirement 1 ou 2 événements aléatoires
    eventsRestantsAfaire = Math.floor(Math.random() * 2) + 1;
    prochaineEtapeEvenement();
}



// --- GESTION DES ÉVÉNEMENTS POST-BRAQUAGE ---
function lancerSequenceEvenements() {
    eventsRestantsAfaire = Math.floor(Math.random() * 3) + 1; // Entre 1 et 3 événements
    prochaineEtapeEvenement();
}

let modePrison = false;

function choisirEvenementPondere(liste) {
    // Un événement déjà vu devient de moins en moins probable à chaque répétition,
    // sans jamais devenir totalement impossible (utile pour les petites banques comme "prison").
    let poids = liste.map(ev => {
        let vues = joueur.eventsVus[ev.titre] || 0;
        return 1 / Math.pow(vues + 1, 1.6);
    });
    let total = poids.reduce((a, b) => a + b, 0);
    let tirage = Math.random() * total;
    for (let i = 0; i < liste.length; i++) {
        tirage -= poids[i];
        if (tirage <= 0) return liste[i];
    }
    return liste[liste.length - 1];
}

function prochaineEtapeEvenement() {
    if(eventsRestantsAfaire <= 0) {
        if(modePrison) { purgerPeine(); } 
        else { genererMissionsHub(); showScreen('screen-hub'); }
        return;
    }
    eventsRestantsAfaire--;

    let cat = modePrison ? "prison" : (joueur.heat > 50 ? (Math.random() > 0.4 ? "complique" : "moyen") : (joueur.heat > 20 ? (Math.random() > 0.5 ? "moyen" : "simple") : "simple"));
    let liste = banqueEvenements[cat].filter(ev => !ev.condition || ev.condition());
    if (liste.length === 0) liste = banqueEvenements[cat].filter(ev => !ev.condition);
    let ev = choisirEvenementPondere(liste);
    joueur.eventsVus[ev.titre] = (joueur.eventsVus[ev.titre] || 0) + 1;

    document.getElementById('event-title').innerText = ev.titre;
    document.getElementById('event-desc').innerText = ev.desc;
    
    let container = document.getElementById('event-choices');
    container.innerHTML = "";
    ev.choix.forEach(c => {
        let btn = document.createElement('button');
        btn.className = "btn-choix"; btn.innerText = c.txt;
        btn.onclick = () => {
            let msgResultat = c.action();
            afficherResultatEvenement(msgResultat);
        };
        container.appendChild(btn);
    });
    showScreen('screen-event');
}

function afficherResultatEvenement(msg) {
    document.getElementById('event-result-text').innerText = msg || "Le temps passe...";
    let btnNext = document.getElementById('btn-event-next');
    
    btnNext.onclick = () => {
        if(modePrison && joueur.peineActuelle === 0) { purgerPeine(); } // Cas de l'évasion réussie
        else { prochaineEtapeEvenement(); }
    };
    showScreen('screen-event-result');
}

function allerEnPrison(raison, graviteDiff) {
    joueur.enPrison = true;
    modePrison = true;
    joueur.nombreArrestations = (joueur.nombreArrestations || 0) + 1;

    let diff = graviteDiff || (cibleActuelle ? cibleActuelle.diff : 6);
    let base = 1 + Math.floor(diff / 3); // ex: diff 4 -> 2 ans, diff 12 -> 5 ans, diff 18 -> 7 ans
    let recidive = Math.min(6, (joueur.nombreArrestations - 1) * 1); // +1 an par arrestation antérieure, plafonné
    let annees = base + Math.floor(Math.random() * 2) + recidive;
    if (joueur.originType === 'Riche') annees = Math.max(1, annees - 2);
    if (joueur.crainte > 10) { annees += 2; joueur.mental = Math.max(1, joueur.mental - 3); }
    joueur.peineActuelle = annees;
    
    let cashNonBlanchi = Math.max(0, joueur.argent - joueur.cashBlanchi);
    let amendeBase = annees * 15000;
    let montantSaisi = Math.min(cashNonBlanchi, amendeBase);
    
    joueur.argent -= montantSaisi;
    joueur.argentPerdu += montantSaisi;

    let texteRecidive = recidive > 0 ? ` La justice note qu'il s'agit de votre ${joueur.nombreArrestations}${joueur.nombreArrestations === 2 ? 'ème' : 'ème'} interpellation : la peine est alourdie (+${recidive} an${recidive > 1 ? 's' : ''} pour récidive).` : "";
    let texteDecouvert = joueur.argent < 0 ? ` Vous êtes à DÉCOUVERT de ${Math.abs(joueur.argent).toLocaleString()} € !` : "";
    let texteArgent = `L'État a saisi ${montantSaisi.toLocaleString()} € sur vos fonds non blanchis.${texteDecouvert} Vos ${joueur.cashBlanchi.toLocaleString()} € blanchis sont intouchables.`;
    
    document.getElementById('prison-text').innerText = `${raison} Verdict : ${annees} ans fermes.${texteRecidive}\n\n${texteArgent}`;
    ajouterJournal(`Arrêté (${raison}) — ${annees} ans fermes.`);
    
    // Modifier le bouton de la prison pour lancer les événements au lieu de sortir direct
    let btn = document.querySelector('#screen-prison button');
    btn.innerText = "Entrer dans le quartier de haute sécurité...";
    btn.onclick = () => { 
        eventsRestantsAfaire = Math.floor(Math.random() * 2) + 1; // 1 ou 2 événements en prison
        prochaineEtapeEvenement(); 
    };
    
    showScreen('screen-prison');
}

function purgerPeine() {
    modePrison = false;
    let annees = joueur.peineActuelle;
    avancerTemps(annees * 12);
    joueur.risquePrison = 0; 
    joueur.enPrison = false;
    joueur.cptLarcin = 0;
    joueur.heat = Math.min(100, joueur.heat + 25); // Fiché : la sortie de prison vous rend plus voyant, pas moins — mais ça se dissipe avec le temps.
    joueur.mental = Math.min(10, joueur.mental + 2); 

    if (joueur.age >= 65) {
        let titreMort = joueur.argentGagne >= 1000000
            ? "Fortune Perdue, Vie Perdue"
            : (joueur.braquagesReussis === 0 ? "Mort Anonyme, Carrière Avortée" : "Mort en Cellule");
        afficherEcranFin(titreMort, `Vous vous éteignez en prison à l'âge de ${joueur.age} ans, après ${joueur.nombreArrestations || 1} arrestation${(joueur.nombreArrestations || 1) > 1 ? 's' : ''} et ${joueur.braquagesReussis} casse${joueur.braquagesReussis !== 1 ? 's' : ''} réussi${joueur.braquagesReussis !== 1 ? 's' : ''} au compteur.`, 'sombre');
    } else {
        ajouterJournal(`Libéré après avoir purgé sa peine. Désormais surveillé par les autorités.`);
        notify(`Libéré. Vous êtes surveillé (Tension +25%) — restez discret un moment pour la faire retomber.`);
        genererMissionsHub();
        showScreen('screen-hub');
    }
}

// --- SYSTÈMES ET ONGLETS ---
function ouvrirProfil() {
    let poss = joueur.possessions.length > 0 ? joueur.possessions.map(id => catalogue.find(c => c.id === id).nom).join(", ") : "Aucune";
    let eq = joueur.equipe.length > 0 ? joueur.equipe.map(r => r.nom).join(", ") : "Loup Solitaire";
    
    document.getElementById('contenu-profil').innerHTML = `
        <ul>
            <li><strong>Version :</strong> v0.0.7</li>
            <li><strong>Profil :</strong> ${joueur.milieu} | <strong>Classe :</strong> ${joueur.classe}</li>
            <li><strong>Avatar :</strong> ${getAvatarEmoji()}</li>
            <li><strong>Statut :</strong> <span style="color:#c8564a">${getStatutCriminel()}</span> (${joueur.braquagesReussis} coups réussis)</li>
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

const iconesCategoriesBoutique = {
    'Formation': '🎓', 'Matériel': '🧰', 'Armement': '🔫', 'Équipement': '🛡️',
    'Véhicules': '🚗', 'Immobilier': '🏠', 'Économie': '💱'
};

let categorieBoutiqueActive = null;

function ouvrirBoutique() {
    categorieBoutiqueActive = null;
    rafraichirBoutique();
    showScreen('screen-boutique');
}

function prixReelItem(item) {
    return item.prix;
}

function rafraichirBoutique() {
    let html = "";
    let types = [...new Set(catalogue.map(item => item.type))];

    if (!categorieBoutiqueActive) {
        let supplementCount = { 'Économie': 1, 'Équipement': 2 }; // services réutilisables non listés dans le catalogue (blanchisseur, papiers, chirurgie)
        types.forEach(type => {
            let count = catalogue.filter(i => i.type === type).length + (supplementCount[type] || 0);
            let possedes = catalogue.filter(i => i.type === type && joueur.possessions.includes(i.id)).length;
            html += `<button class="btn-choix btn-categorie" onclick="ouvrirCategorieBoutique('${type}')">
                ${iconesCategoriesBoutique[type] || '📦'} ${type}
                <span class="cat-count">${possedes}/${count} acquis</span>
            </button>`;
        });
    } else {
        html += `<button class="btn-choix" onclick="ouvrirBoutiqueCategories()">← Retour aux catégories</button>`;
        html += `<h3 style="color:#bd9245; border-bottom:1px solid #2b323c; padding-bottom:5px; margin-top:14px;">${iconesCategoriesBoutique[categorieBoutiqueActive] || ''} ${categorieBoutiqueActive}</h3>`;
        catalogue.filter(i => i.type === categorieBoutiqueActive).forEach(item => {
            let possede = joueur.possessions.includes(item.id);
            let verrouille = item.requiert && !joueur.possessions.includes(item.requiert);
            let prixReel = prixReelItem(item);
            let asseyArgent = peutPayer(prixReel);

            let btn, disabled, noteVerrou = "";
            if (possede) { btn = "Acquis"; disabled = "disabled"; }
            else if (verrouille) {
                let itemRequis = catalogue.find(i => i.id === item.requiert);
                btn = "Verrouillé"; disabled = "disabled";
                noteVerrou = `<p style="font-size:11px; color:var(--rust-bright); margin:4px 0 0;">🔒 Nécessite d'abord "${itemRequis ? itemRequis.nom : item.requiert}".</p>`;
            } else {
                btn = asseyArgent ? `Acheter (${prixReel.toLocaleString()} €)` : `Fonds insuffisants (${prixReel.toLocaleString()} €)`;
                disabled = asseyArgent ? "" : "disabled";
            }

            html += `<div class="shop-item">
                <div class="shop-info"><h4>${item.nom}</h4><p>${item.desc}</p>${noteVerrou}</div>
                <button class="btn-achat" ${disabled} onclick="acheterItem('${item.id}')">${btn}</button>
            </div>`;
        });
        if (categorieBoutiqueActive === 'Économie') {
            let recu = Math.floor(joueur.argent * 0.5);
            html += `<div class="shop-item">
                <div class="shop-info"><h4>Blanchisseur Indépendant</h4><p>Convertit tout votre argent liquide actuel (${joueur.argent.toLocaleString()} €) en Cash Blanchi, contre une commission immédiate de 50%. Utilisable à tout moment, sans plafond.</p></div>
                <button class="btn-achat" ${joueur.argent <= 0 ? 'disabled' : ''} onclick="payerBlanchisseur()">Blanchir (${recu.toLocaleString()} € reçus)</button>
            </div>`;
        }
        if (categorieBoutiqueActive === 'Équipement') {
            html += `<div class="shop-item">
                <div class="shop-info"><h4>Cartes d'Identité Vierges</h4><p>Un faussaire vous fournit une nouvelle identité complète. Réduit le Risque de 20%. Réutilisable autant que nécessaire.</p></div>
                <button class="btn-achat" ${!peutPayer(40000) ? 'disabled' : ''} onclick="acheterPapiersVierges()">Acheter (40 000 €)</button>
            </div>
            <div class="shop-item">
                <div class="shop-info"><h4>Chirurgie Esthétique</h4><p>Change durablement votre visage aux yeux des autorités. Réduit le Risque de 50%. Très coûteux, mais réutilisable.</p></div>
                <button class="btn-achat" ${!peutPayer(250000) ? 'disabled' : ''} onclick="payerChirurgie()">Payer (250 000 €)</button>
            </div>`;
        }
    }
    document.getElementById('boutique-liste').innerHTML = html;
}

function acheterPapiersVierges() {
    if (!depenser(40000)) return;
    joueur.risquePrison = Math.max(0, joueur.risquePrison - 20);
    updateStats();
    rafraichirBoutique();
    notify("Nouvelle identité vierge acquise auprès du faussaire (Risque -20%).");
}

function payerChirurgie() {
    if (!depenser(250000)) return;
    joueur.risquePrison = Math.max(0, joueur.risquePrison - 50);
    updateStats();
    rafraichirBoutique();
    notify("Chirurgie esthétique réussie. Plus personne ne vous reconnaît (Risque -50%).");
}

function payerBlanchisseur() {
    if (joueur.argent <= 0) return;
    let montant = joueur.argent;
    let recu = Math.floor(montant * 0.5);
    joueur.argent = 0;
    joueur.cashBlanchi += recu;
    updateStats();
    rafraichirBoutique();
    notify(`Le blanchisseur a converti ${montant.toLocaleString()} € en ${recu.toLocaleString()} € propres (commission de 50%).`);
}

function ouvrirCategorieBoutique(type) {
    categorieBoutiqueActive = type;
    rafraichirBoutique();
}

function ouvrirBoutiqueCategories() {
    categorieBoutiqueActive = null;
    rafraichirBoutique();
}

function acheterItem(id) {
    let item = catalogue.find(i => i.id === id);
    let verrouille = item.requiert && !joueur.possessions.includes(item.requiert);
    let prixReel = prixReelItem(item);
    if (!verrouille && !joueur.possessions.includes(id) && depenser(prixReel)) {
        joueur.possessions.push(id);
        item.effet(); 
        updateStats();
        rafraichirBoutique(); 
    }
}

function libelleLoyaute(affection) {
    if (affection >= 75) return { txt: "Dévoué", classe: "loyalty-high" };
    if (affection >= 40) return { txt: "Fiable", classe: "loyalty-mid" };
    if (affection >= 16) return { txt: "Douteux", classe: "loyalty-low" };
    return { txt: "Prêt à trahir", classe: "loyalty-critical" };
}

const SEUIL_RECRUTEMENT_BRAQUAGES = 3;
const SEUIL_RECRUTEMENT_RESPECT = 5;

function ouvrirRecrutement() {
    let debloque = joueur.braquagesReussis >= SEUIL_RECRUTEMENT_BRAQUAGES || joueur.respect >= SEUIL_RECRUTEMENT_RESPECT;
    if (!debloque) {
        document.getElementById('liste-recrues').innerHTML = `
            <div class="content-box">
                <p>🔒 Personne dans le milieu ne vous connaît encore assez pour rejoindre votre équipe.</p>
                <p style="margin-top:10px; font-size:13px; color:var(--paper-dim);">Débloqué après ${SEUIL_RECRUTEMENT_BRAQUAGES} casses réussis (${joueur.braquagesReussis}/${SEUIL_RECRUTEMENT_BRAQUAGES}) ou ${SEUIL_RECRUTEMENT_RESPECT} points de Respect (${joueur.respect}/${SEUIL_RECRUTEMENT_RESPECT}).</p>
            </div>`;
        showScreen('screen-recrutement');
        return;
    }

    let html = "";
    html += `<p class="hint-text" style="margin-bottom:14px;">Escouade : <strong style="color:var(--paper);">${joueur.equipe.length}/${TAILLE_MAX_EQUIPE}</strong></p>`;

    if(joueur.equipe.length > 0) {
        html += `<h3 style="color:#8fb4d1">Votre Équipe Actuelle</h3>`;
        joueur.equipe.forEach((eq, index) => {
            if (eq.affection === undefined) eq.affection = 50;
            let loy = libelleLoyaute(eq.affection);
            html += `<div class="recrue-card">
                <strong>${eq.nom}</strong> <span style="color:var(--paper-dim); font-size:12px;">(Spé : ${eq.role})</span>
                <div class="loyalty-bar"><div class="loyalty-fill ${loy.classe}" style="width:${eq.affection}%;"></div></div>
                <span class="loyalty-label ${loy.classe}">${loy.txt} — ${eq.affection}%</span>
                <div style="display:flex; gap:8px; margin-top:8px;">
                    <button class="btn-choix" style="padding:8px; margin:0; flex:1;" onclick="ouvrirProfilRecrue('${eq.id}')">👤 Profil</button>
                    <button class="btn-choix" style="padding:8px; margin:0; flex:1;" onclick="virerRecrue(${index})">Virer</button>
                    <button class="btn-action" style="padding:8px; border-radius:2px; border:none; cursor:pointer; flex:1; font-weight:bold;" onclick="executerRecrue(${index})">Exécuter</button>
                </div>
            </div>`;
        });
        html += `<hr style="border-color:#2b323c">`;
    }

    let equipeComplete = joueur.equipe.length >= TAILLE_MAX_EQUIPE;
    html += `<h3 style="color:#4f9967">À Embaucher</h3>`;
    if (equipeComplete) {
        html += `<p class="hint-text" style="margin-bottom:10px;">Escouade complète — virez ou perdez une recrue pour en engager une autre.</p>`;
    }

    recruesDispo.forEach(r => {
        if (joueur.recruesMortes.includes(r.id)) return;
        let dejaEquipe = joueur.equipe.find(e => e.id === r.id);
        if(!dejaEquipe) {
            let fois = joueur.recruesVirees[r.id] || 0;
            let coutReel = Math.max(2000, r.cout - (joueur.respect * 500));
            coutReel = Math.floor(coutReel * (1 - (joueur.buffs.contacts || 0) / 100));
            if (joueur.competences.intelT2) coutReel = Math.floor(coutReel * 0.9);
            if (fois > 0) coutReel = Math.floor(coutReel * (1 + fois * 0.5));

            let peutPayer = window.peutPayer(coutReel);
            let disabled = (!peutPayer || equipeComplete) ? 'disabled' : '';
            let libelleBtn = equipeComplete ? 'Escouade complète' : (!peutPayer ? `Fonds insuffisants (${coutReel.toLocaleString()} €)` : 'Engager');

            let badgeRenvoi = fois > 0
                ? `<p class="badge-renvoi">⚠️ Déjà renvoyé(e) ${fois}× — prime majorée, part plus grande sur le butin, confiance entamée dès l'embauche.</p>`
                : "";

            html += `<div class="recrue-card">
                <strong>${r.nom}</strong> <span style="color:var(--paper-dim); font-size:12px;">| Spé : ${r.role} (-${r.bonus} difficulté)</span>
                <p style="font-size:12px; color:var(--paper-dim); margin:6px 0;">${r.desc || ""}</p>
                ${badgeRenvoi}
                <small>Prime : ${coutReel.toLocaleString()} €</small>
                <div style="display:flex; gap:8px; margin-top:5px;">
                    <button class="btn-choix" style="padding:8px; margin:0; flex:1;" onclick="ouvrirProfilRecrue('${r.id}')">👤 Profil</button>
                    <button class="btn-choix" ${disabled} style="padding:8px; margin:0; flex:1;" onclick="embaucher('${r.id}', ${coutReel})">${libelleBtn}</button>
                </div>
            </div>`;
        }
    });
    document.getElementById('liste-recrues').innerHTML = html;
    showScreen('screen-recrutement');
}

function ouvrirProfilRecrue(id) {
    let base = recruesDispo.find(x => x.id === id);
    if (!base) return;
    let enEquipe = joueur.equipe.find(e => e.id === id);
    let fois = joueur.recruesVirees[id] || 0;

    let statutLigne;
    if (enEquipe) {
        let loy = libelleLoyaute(enEquipe.affection ?? 50);
        statutLigne = `Dans l'équipe actuelle — Loyauté : ${loy.txt} (${enEquipe.affection ?? 50}%)`;
    } else if (fois > 0) {
        statutLigne = `Disponible — déjà renvoyé(e) ${fois}× par le passé`;
    } else {
        statutLigne = "Jamais recruté(e) pour l'instant";
    }

    document.getElementById('profil-recrue-nom').innerText = base.nom;
    document.getElementById('profil-recrue-contenu').innerHTML = `
        <p><strong>Spécialité :</strong> ${base.role} (-${base.bonus} difficulté) — Prime de base : ${base.cout.toLocaleString()} €</p>
        <p><strong>Statut :</strong> ${statutLigne}</p>
        <hr style="border-color:#2b323c">
        <p style="line-height:1.6;">${base.histoire || base.desc || "Aucune information supplémentaire."}</p>
    `;
    showScreen('screen-profil-recrue');
}

function embaucher(id, cout) {
    let r = recruesDispo.find(x => x.id === id);
    if (joueur.equipe.length >= TAILLE_MAX_EQUIPE) {
        notify("Escouade complète : virez ou perdez une recrue avant d'en engager une nouvelle.");
        return;
    }
    let fois = joueur.recruesVirees[id] || 0;
    if(depenser(cout)) {
        joueur.equipe.push({
            ...r,
            affection: Math.max(10, 50 - fois * 20),
            partBonus: fois > 0 ? Math.min(0.15, fois * 0.05) : 0
        });
        ajouterJournal(`${r.nom} rejoint l'équipe (Spé : ${r.role}).${fois > 0 ? " Réembauché(e) après un renvoi — méfiance de mise." : ""}`);
        updateStats();
        ouvrirRecrutement();
        genererMissionsHub(); 
    }
}

function afficherConsequence(titre, msg, retourFn) {
    document.getElementById('consequence-title').innerText = titre;
    document.getElementById('consequence-text').innerText = msg;
    let btn = document.getElementById('btn-consequence-next');
    btn.onclick = retourFn;
    showScreen('screen-consequence');
}

function demanderConfirmation(titre, msg, callbackOui) {
    document.getElementById('confirm-title').innerText = titre;
    document.getElementById('confirm-text').innerText = msg;
    document.getElementById('btn-confirm-oui').onclick = () => { callbackOui(); };
    document.getElementById('btn-confirm-non').onclick = () => { showScreen('screen-hub'); };
    showScreen('screen-confirm');
}

function virerRecrue(index) {
    let r = joueur.equipe.splice(index, 1)[0];
    joueur.moralite = Math.max(0, joueur.moralite - 1);
    joueur.recruesVirees[r.id] = (joueur.recruesVirees[r.id] || 0) + 1;

    let phrases = [`${r.nom} quitte l'équipe et disparaît dans la nature.`];
    let rancunier = (r.affection !== undefined && r.affection < 35);
    if (rancunier && Math.random() < 0.4) {
        joueur.heat += 15;
        phrases.push(`Rancunier d'avoir été lâché après tout ce temps, il a vendu quelques détails sur vos habitudes à qui voulait l'entendre (Tension +15%).`);
    } else if (!rancunier) {
        joueur.respect += 1;
        phrases.push(`Il garde un souvenir correct de votre collaboration et parle de vous en bien dans le milieu (Respect +1).`);
    } else {
        phrases.push(`Il s'en va en silence, sans faire de vagues.`);
    }
    phrases.push(`Vous pourrez le/la réembaucher plus tard, mais à un tarif plus élevé et avec une confiance entamée.`);

    ajouterJournal(`${r.nom} a été renvoyé de l'équipe.`);
    updateStats();
    genererMissionsHub();
    afficherConsequence("Renvoi de l'équipe", phrases.join(" "), () => { ouvrirRecrutement(); });
}

function executerRecrue(index) {
    let r = joueur.equipe.splice(index, 1)[0];
    joueur.moralite = Math.max(0, joueur.moralite - 5);
    joueur.crainte += 5;
    joueur.respect = Math.max(0, joueur.respect - 2);
    joueur.equipe.forEach(m => { m.affection = Math.max(0, (m.affection ?? 50) - 15); });
    joueur.recruesMortes.push(r.id);

    let phrases = [`Vous avez abattu ${r.nom} froidement. Il/elle ne reviendra pas — inutile d'espérer le/la recroiser dans le milieu.`];
    if (joueur.equipe.length > 0) {
        phrases.push(`Le reste de l'équipe assiste à la scène, terrifié — leur confiance en vous s'effondre (Loyauté -15 pour chacun).`);
    }
    if (Math.random() < 0.3) {
        joueur.risquePrison += 3;
        phrases.push(`Le corps est retrouvé quelques jours plus tard, relançant une enquête sur vos activités (Risque +3%).`);
    } else {
        phrases.push(`Le corps ne sera jamais retrouvé.`);
    }

    ajouterJournal(`${r.nom} a été exécuté froidement par vos soins.`);
    updateStats();
    genererMissionsHub();
    afficherConsequence("Exécution", phrases.join(" "), () => { ouvrirRecrutement(); });
}


const arbreBranches = [
    { stat: 'force', nomT1: 'Musculation & Tir', icon: '💪',
      t2: { id: 'forceT2', nom: 'Frappe Chirurgicale', desc: "Vos approches Frontale ne blessent plus jamais de civils par accident.", cout: 2 },
      t3: { id: 'forceT3', nom: 'Poigne de Fer', desc: "Réduit de moitié le risque de perdre un allié ou d'y laisser la vie lors d'un coup qui tourne mal.", cout: 3 } },
    { stat: 'intel', nomT1: 'Laboratoire Cyber', icon: '🧠',
      t2: { id: 'intelT2', nom: 'Ingénierie Sociale', desc: "Réduit encore le coût de recrutement de nouvelles recrues (-10% supplémentaire).", cout: 2 },
      t3: { id: 'intelT3', nom: 'Fantôme du Réseau', desc: "Vos approches Cyber ignorent le malus lié à une Tension élevée (>50%).", cout: 3 } },
    { stat: 'furtivite', nomT1: 'Parkour & Ombres', icon: '🥷',
      t2: { id: 'furtiviteT2', nom: 'Pas Feutrés', desc: "Supprime le malus de discrétion tant que votre Furtivité est faible.", cout: 2 },
      t3: { id: 'furtiviteT3', nom: 'Ombre Insaisissable', desc: "Une seconde chance automatique si une fuite discrète tourne mal.", cout: 3 } }
];

const libellesCompetence = {
    force: "Force", intel: "Intelligence", furtivite: "Furtivité",
    sangfroid: "Sang-Froid", contacts: "Réseau de Contacts"
};

function ouvrirArbre() {
    rafraichirArbre();
    showScreen('screen-arbre');
}

function rafraichirArbre() {
    document.getElementById('pts-comp').innerText = joueur.pointsCompetence;
    document.getElementById('arbre-content').innerHTML = genererArbreHTML();
}

function genererArbreHTML() {
    let html = "";
    arbreBranches.forEach(b => {
        let palier = Math.round(joueur.buffs[b.stat] / 10);
        html += `<div class="arbre-branche">
            <h3>${b.icon} ${b.nomT1.toUpperCase()} <span class="arbre-palier">Palier ${palier}/3</span></h3>
            <button class="btn-choix btn-action" ${palier >= 3 ? 'disabled' : ''} onclick="ameliorerArbre('${b.stat}')">+10% réussite — Coût : 1 PC</button>
            ${rendreTierPerk(b.t2, palier >= 2, joueur.competences[b.t2.id])}
            ${rendreTierPerk(b.t3, palier >= 3 && joueur.competences[b.t2.id], joueur.competences[b.t3.id], palier < 3 ? "débloqué au palier 3, après " + b.t2.nom : null)}
        </div>`;
    });

    let palierSF = Math.round(joueur.buffs.sangfroid / 10);
    let palierCT = Math.round(joueur.buffs.contacts / 10);
    let disciplinePerk = { nom: "Instinct de Survie", desc: "Réduit de 25% le Risque de prison encaissé lors des casses.", cout: 3 };
    html += `<div class="arbre-branche">
        <h3>🧭 DISCIPLINE</h3>
        <p class="arbre-sub">Sang-Froid (-10% Tension gagnée) — Palier ${palierSF}/3</p>
        <button class="btn-choix btn-action" ${palierSF >= 3 ? 'disabled' : ''} onclick="ameliorerArbre('sangfroid')">Sang-Froid — Coût : 1 PC</button>
        <p class="arbre-sub">Réseau de Contacts (-10% coût recrutement) — Palier ${palierCT}/3</p>
        <button class="btn-choix btn-action" ${palierCT >= 3 ? 'disabled' : ''} onclick="ameliorerArbre('contacts')">Réseau de Contacts — Coût : 1 PC</button>
        ${rendreTierPerk({ id: 'disciplineT2', ...disciplinePerk }, palierSF >= 2 && palierCT >= 2, joueur.competences.disciplineT2, "débloqué au palier 2 dans les deux disciplines")}
    </div>`;

    return html;
}

function rendreTierPerk(perk, debloque, acquis, texteVerrouille) {
    if (acquis) {
        return `<div class="perk-acquis">✅ <strong>${perk.nom}</strong> — ${perk.desc}</div>`;
    }
    if (debloque) {
        return `<button class="btn-choix perk-btn" onclick="acheterPerk('${perk.id}', ${perk.cout})">🔓 <strong>${perk.nom}</strong> — ${perk.desc} (Coût : ${perk.cout} PC)</button>`;
    }
    return `<div class="perk-locked">🔒 ${perk.nom} — ${texteVerrouille || "débloqué au palier 2"}</div>`;
}

function ameliorerArbre(stat) {
    let msgBox = document.getElementById('msg-arbre');
    if (joueur.buffs[stat] >= 30) {
        msgBox.style.display = 'block';
        msgBox.style.background = '#a4453a';
        msgBox.innerText = "Palier maximum déjà atteint pour cette branche.";
        return;
    }
    if (joueur.pointsCompetence > 0) {
        joueur.pointsCompetence -= 1;
        joueur.buffs[stat] += 10;
        msgBox.style.display = 'block';
        msgBox.style.background = '#3d7a52';
        msgBox.innerText = `Succès ! ${libellesCompetence[stat] || stat} : +${joueur.buffs[stat]}% de bonus.`;
        updateStats();
        genererMissionsHub();
        rafraichirArbre();
    } else {
        msgBox.style.display = 'block';
        msgBox.style.background = '#a4453a';
        msgBox.innerText = "Pas de Points de Compétence (PC).";
    }
}

function acheterPerk(id, cout) {
    let msgBox = document.getElementById('msg-arbre');
    if (joueur.competences[id]) return;
    if (joueur.pointsCompetence >= cout) {
        joueur.pointsCompetence -= cout;
        joueur.competences[id] = true;
        msgBox.style.display = 'block';
        msgBox.style.background = '#3d7a52';
        msgBox.innerText = "Compétence maîtresse débloquée !";
        updateStats();
        genererMissionsHub();
        rafraichirArbre();
    } else {
        msgBox.style.display = 'block';
        msgBox.style.background = '#a4453a';
        msgBox.innerText = `Pas assez de PC (requis : ${cout}).`;
    }
}

// --- BRAQUAGES, CONDITIONS DE COMPÉTENCES ET STORYTELLING ---
function estimerReussite(diff, typeStat) {
    let statVal = joueur.stats[typeStat];
    let recruesRole = joueur.equipe.filter(r => r.role === typeStat).sort((a, b) => b.bonus - a.bonus);
    let bonusEq = recruesRole.reduce((acc, r, i) => acc + r.bonus * Math.pow(0.5, i), 0);
    
    let score = statVal + bonusEq;
    let malusMental = (10 - joueur.mental) * 2;
    
    let proba = 50 + (score - diff) * 10 - malusMental;
    proba -= Math.floor(joueur.heat / 2); 
    
    if(typeStat === 'furtivite' && statVal < 5) proba -= 25;
    
    if(proba > 95) return 95;
    if(proba < 5) return 5;
    return Math.floor(proba);
}

function legendaireDebloquee(ville) {
    return (joueur.braquagesParVille[ville] || 0) >= SEUIL_LEGENDAIRE_PAR_VILLE;
}

function genererMissionsHub() {
    let v = monde[joueur.ville];
    let cF = v.faible[Math.min(indexCible.faible, v.faible.length - 1)];
    let cM = v.modere[Math.min(indexCible.modere, v.modere.length - 1)];
    let cE = v.eleve[Math.min(indexCible.eleve, v.eleve.length - 1)];

    let getTx = (diff) => Math.max(estimerReussite(diff, 'furtivite'), estimerReussite(diff, 'intel'), estimerReussite(diff, 'force'));

    // Le casse légendaire reste totalement invisible tant qu'il n'est pas débloqué dans CETTE ville — aucun indice, aucune mention.
    let blocLegendaire = "";
    if (legendaireDebloquee(joueur.ville) && v.legendaire && v.legendaire.length > 0) {
        let cL = v.legendaire[Math.min(indexCible.legendaire || 0, v.legendaire.length - 1)];
        blocLegendaire = `
        <button class="btn-choix btn-legendaire" style="padding:10px;" onclick="preparerCasse('legendaire', ${cL.diff}, ${cL.butin}, '${cL.nom}', \`${cL.desc}\`)">
            🟣 ${cL.nom} <span class="tag-legendaire">LÉGENDAIRE</span><br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance de réussite estimée : ~${getTx(cL.diff)}%</span>
        </button>`;
    }

    document.getElementById('hub-targets').innerHTML = `
        <button class="btn-choix" style="padding:10px;" onclick="preparerCasse('faible', ${cF.diff}, ${cF.butin}, '${cF.nom}', \`${cF.desc}\`)">
            🟢 ${cF.nom}<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance de réussite estimée : ~${getTx(cF.diff)}%</span>
        </button>
        <button class="btn-choix" style="padding:10px;" onclick="preparerCasse('modere', ${cM.diff}, ${cM.butin}, '${cM.nom}', \`${cM.desc}\`)">
            🟠 ${cM.nom}<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance de réussite estimée : ~${getTx(cM.diff)}%</span>
        </button>
        <button class="btn-choix" style="padding:10px;" onclick="preparerCasse('eleve', ${cE.diff}, ${cE.butin}, '${cE.nom}', \`${cE.desc}\`)">
            🔴 ${cE.nom}<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance de réussite estimée : ~${getTx(cE.diff)}%</span>
        </button>
        ${blocLegendaire}
    `;
}

let contexteCasse = { blesseFlics: 0, mortFlics: 0, blesseCivils: 0, mortCivils: 0, flicsPresents: false, texteAction: "" };

function coutEtDureeReperage(niveau, diff) {
    if (niveau === 'faible') return { cout: 0, duree: 1 };
    if (niveau === 'modere') return { cout: diff * 3000, duree: 2 };
    if (niveau === 'eleve') return { cout: diff * 5000, duree: 3 };
    return { cout: diff * 8000, duree: 4 }; // légendaire
}

function preparerCasse(niveau, diff, butin, nom, desc) {
    cibleActuelle = { niveau: niveau, nom: nom, diff: diff, butin: butin, desc: desc, repere: false };
    document.getElementById('prep-desc').innerText = `Premier coup d'œil : ${desc}`;
    document.getElementById('prep-butin').innerText = butin.toLocaleString();
    document.getElementById('prep-reperage-info').innerHTML = "";

    let { cout, duree } = coutEtDureeReperage(niveau, diff);
    let btnRep = document.getElementById('btn-reperer');
    btnRep.disabled = !peutPayer(cout);
    btnRep.innerText = cout > 0
        ? `🔍 Repérer les lieux (+${duree} mois, -${cout.toLocaleString()} €)`
        : `🔍 Repérer les lieux (+${duree} mois, gratuit)`;
    showScreen('screen-prep');
}

function reperageCasse() {
    if (!cibleActuelle || cibleActuelle.repere) return;
    let { cout, duree } = coutEtDureeReperage(cibleActuelle.niveau, cibleActuelle.diff);
    if (!peutPayer(cout)) return;

    if (cout > 0) depenser(cout);
    avancerTemps(duree);
    cibleActuelle.repere = true;
    updateStats();

    let indice = cibleActuelle.diff >= 9
        ? "Une présence armée nombreuse est à prévoir : la force frontale sera risquée."
        : cibleActuelle.diff >= 6
            ? "La sécurité est correcte mais pas irréprochable : une approche technique ou furtive peut payer."
            : "Peu de résistance attendue, toutes les approches se valent à peu près.";

    let alerte = "";
    if (Math.random() < 0.15) {
        joueur.heat += 5;
        alerte = ` Un passant vous a peut-être remarqué en train d'observer les lieux (Tension +5%).`;
        updateStats();
    }

    document.getElementById('prep-reperage-info').innerHTML =
        `<p style="color:var(--gold); font-size:13px; text-align:left; margin-top:10px;">🔍 <strong>Repérage effectué</strong> — la difficulté du coup est réduite. ${indice}${alerte}</p>`;

    let btnRep = document.getElementById('btn-reperer');
    btnRep.disabled = true;
    btnRep.innerText = "✅ Lieux repérés";
}

function validerPrep() {
    document.getElementById('action-title').innerText = cibleActuelle.nom;

    // Frais d'entretien : chaque recrue coûte un petit forfait à chaque opération lancée,
    // qu'elle réussisse ou non — une escouade nombreuse a un vrai coût d'opportunité.
    let fraisEntretien = joueur.equipe.length * 800;
    let noteFrais = "";
    if (fraisEntretien > 0) {
        if (!depenser(fraisEntretien)) {
            // Même sans le sou, les frais sont dus : on plonge dans le découvert plutôt que d'annuler l'opération.
            joueur.argent -= fraisEntretien;
            joueur.argentPerdu += fraisEntretien;
        }
        updateStats();
        noteFrais = `<p class="hint-text" style="margin-bottom:10px;">💸 Frais d'entretien de l'équipe (${joueur.equipe.length} recrue${joueur.equipe.length > 1 ? 's' : ''}) : -${fraisEntretien.toLocaleString()} €</p>`;
    }
    
    let reqHacking = cibleActuelle.niveau === 'faible' ? 5 : (cibleActuelle.niveau === 'modere' ? 10 : 15);
    let disabledIntel = joueur.stats.intel < reqHacking ? `disabled` : ``;
    let texteIntel = joueur.stats.intel < reqHacking ? `🧠 Approche Cyber (Requis : ${reqHacking} Intel)` : `🧠 Approche Cyber`;

    document.getElementById('action-choices').innerHTML = `
        ${noteFrais}
        <button class="btn-choix" onclick="lancerMiniScenarioAction('furtivite')">🥷 Approche Fantôme</button>
        <button class="btn-choix" ${disabledIntel} onclick="lancerMiniScenarioAction('intel')">${texteIntel}</button>
        <button class="btn-choix" onclick="lancerMiniScenarioAction('force')">💪 Approche Frontale</button>
    `;
    showScreen('screen-action');
}

function lancerMiniScenarioAction(stat) {
    // On génère le contexte du braquage selon l'approche
    contexteCasse = { blesseFlics: 0, mortFlics: 0, blesseCivils: 0, mortCivils: 0, flicsPresents: false, texteAction: "" };
    
    if (stat === 'force') {
        if (Math.random() > 0.5) {
            contexteCasse.texteAction = "Vous entrez avec fracas. L'alarme hurle immédiatement, et une patrouille de police qui passait par là freine net devant l'entrée ! Affrontement inévitable.";
            contexteCasse.flicsPresents = true;
        } else {
            contexteCasse.texteAction = "Vous braquez tout le monde en hurlant. Les civils se jettent au sol dans la panique. La tension est électrique.";
            if (Math.random() > 0.7) contexteCasse.blesseCivils = 1; // Risque de blesser un civil dans la panique
        }
    } else if (stat === 'furtivite') {
        if (Math.random() > 0.6) {
            contexteCasse.texteAction = "Vous vous faufilez dans l'ombre, mais vous faites tomber un objet. Un vigile s'approche, l'arme à la main...";
        } else {
            contexteCasse.texteAction = "Vous glissez comme un fantôme à travers les conduits. Personne ne soupçonne votre présence.";
        }
    } else if (stat === 'intel') {
        let seuilAlerte = joueur.brouilleurFreq ? 0.88 : 0.7;
        if (Math.random() > seuilAlerte) {
            contexteCasse.texteAction = "Le pare-feu contre-attaque ! Les portes se verrouillent et le réseau s'affole. La police est en route, il faut forcer le système.";
            contexteCasse.flicsPresents = true;
        } else {
            contexteCasse.texteAction = joueur.brouilleurFreq
                ? "Le brouilleur étouffe toute alerte. Vous bouclez les caméras sans le moindre accroc."
                : (joueur.equipe.length > 0
                    ? "Vous bouclez les caméras. Votre équipe entre, déguisée en techniciens de maintenance."
                    : "Vous bouclez les caméras et vous glissez seul à l'intérieur, déguisé en technicien de maintenance.");
        }
    }

    document.getElementById('action-title').innerText = "Sur les lieux...";
    document.getElementById('action-choices').innerHTML = `
        <p style="background:#1d232b; padding:15px; border-radius:6px; text-align:left; border-left:4px solid #a4453a; line-height:1.5;">${contexteCasse.texteAction}</p>
        <button class="btn-choix btn-action" onclick="resoudreAction('${stat}')">Exécuter le plan</button>
    `;
}

function resoudreAction(stat) {
    avancerTemps(2);
    
    let estViolent = (stat === 'force');
    if(estViolent) { joueur.moralite = Math.max(0, joueur.moralite - 2); joueur.mental = Math.max(1, joueur.mental - 1); joueur.crainte += 3; } 
    else { joueur.moralite = Math.min(10, joueur.moralite + 1); joueur.respect += 2; }

    let difficulte = cibleActuelle.diff;
    if (joueur.originType === 'Défavorisé') difficulte += 1;
    if (joueur.originType === 'Riche') difficulte -= 1;
    if (cibleActuelle.repere) difficulte -= 2;
    if (stat === 'force') difficulte -= (joueur.bonusArmeForce || 0);

    // Recrues du bon rôle : rendements décroissants (la meilleure compte à 100%, la suivante à 50%, etc.)
    // pour éviter qu'empiler des recrues du même rôle ne rende un casse quasi garanti.
    let recruesRole = joueur.equipe.filter(r => r.role === stat).sort((a, b) => b.bonus - a.bonus);
    recruesRole.forEach((r, i) => { difficulte -= r.bonus * Math.pow(0.5, i); });

    // Plancher : quels que soient les bonus cumulés (équipe, armes, repérage), la difficulté
    // ne peut jamais descendre sous 45% de la difficulté d'origine de la cible.
    let plancherDifficulte = Math.max(1, Math.ceil(cibleActuelle.diff * 0.45));
    difficulte = Math.max(plancherDifficulte, Math.round(difficulte));

    let jet = Math.floor(Math.random() * 10) + 1;
    let immuniteTension = (stat === 'intel' && joueur.competences.intelT3);
    let scoreFinal = joueur.stats[stat] + jet;
    scoreFinal = scoreFinal * (1 + (joueur.buffs[stat] / 100));

    if(stat === 'furtivite' && joueur.stats.furtivite < 5 && !joueur.competences.furtiviteT2 && !joueur.kitCrochetage) scoreFinal -= 3;
    if(joueur.heat > 50 && !immuniteTension) scoreFinal -= 2;

    let reussi = (scoreFinal >= difficulte + 4);
    let mortAllie = 0;
    contexteCasse.nomAllieMort = null;
    
    // Ajustement de la loyauté de l'équipe selon le style d'approche
    joueur.equipe.forEach(r => {
        if (r.affection === undefined) r.affection = 50;
        r.affection = Math.max(0, Math.min(100, r.affection + (estViolent ? -5 : (reussi ? 3 : -2))));
    });

    // Conséquences selon le contexte généré
    // Un policier ne peut être blessé ou tué que si la police a réellement été mentionnée dans le scénario.
    if (contexteCasse.flicsPresents && (estViolent || !reussi)) {
        contexteCasse.blesseFlics = Math.floor(Math.random() * 3);
        if (Math.random() > 0.7) contexteCasse.mortFlics = 1;
    }
    if (estViolent || !reussi) {
        contexteCasse.blesseCivils += (estViolent && joueur.competences.forceT2) ? 0 : Math.floor(Math.random() * 2);
    }
    {
        // Poigne de Fer et Gilet pare-balles offrent chacun une protection de 50% : elles ne se cumulent
        // pas (avoir les deux n'est pas plus sûr qu'en avoir une seule), pour éviter la quasi-immunité.
        let facteurProtection = (joueur.competences.forceT3 || joueur.giletPareBalles) ? 0.5 : 1;
        let chanceMortAllie = 0.15 * facteurProtection;
        if(!reussi && Math.random() < chanceMortAllie && joueur.equipe.length > 0) {
            let idx = Math.floor(Math.random() * joueur.equipe.length);
            let mort = joueur.equipe.splice(idx, 1)[0];
            mortAllie = 1; contexteCasse.nomAllieMort = mort.nom;
            joueur.recruesMortes.push(mort.id);
        }
        let chanceMortJoueur = 0.03 * facteurProtection;
        if(!reussi && Math.random() < chanceMortJoueur) {
            afficherEcranFin(`Abattu à ${joueur.ville}`, `La police a ouvert le feu durant l'assaut sur ${cibleActuelle ? cibleActuelle.nom : 'la cible'}. Vous n'avez pas survécu, après ${joueur.braquagesReussis} casse${joueur.braquagesReussis !== 1 ? 's' : ''} réussi${joueur.braquagesReussis !== 1 ? 's' : ''}.`, 'sombre'); return;
        }
    }

    let butinJoueur = 0;
    let noteButin = "";
    if (reussi) {
        // Variance sur le butin réel : le montant annoncé n'est qu'une estimation.
        let tirageButin = Math.random();
        let multiplicateur = 1;
        if (tirageButin < 0.40) {
            multiplicateur = 0.55 + Math.random() * 0.20; // 55% à 75% du butin annoncé
            noteButin = "Le butin réel s'est révélé plus maigre que prévu à l'ouverture du coffre.";
        } else if (tirageButin >= 0.90) {
            multiplicateur = 1.25 + Math.random() * 0.25; // 125% à 150% du butin annoncé
            noteButin = "Coup de chance : la cible valait bien plus que ce qui était annoncé.";
        }
        let butinReel = Math.floor(cibleActuelle.butin * multiplicateur);

        let tauxBase = joueur.equipe.some(r => r.role === 'negociateur') ? 0.10 : 0.15;
        let partEquipe = joueur.equipe.reduce((acc, r) => acc + butinReel * (tauxBase + (r.partBonus || 0)), 0);
        butinJoueur = Math.floor(butinReel - partEquipe);
        
        joueur.argent += butinJoueur; joueur.argentGagne += butinJoueur;
        if(joueur.blanchisserie) {
            let moisTotal = joueur.age * 12 + joueur.mois;
            if (moisTotal - joueur.blanchiPeriodeDebut >= 12) {
                joueur.blanchiPeriodeDebut = moisTotal;
                joueur.blanchiPeriodeMontant = 0;
            }
            let plafondAnnuel = 300000;
            let restant = Math.max(0, plafondAnnuel - joueur.blanchiPeriodeMontant);
            let montantBlanchi = Math.min(Math.floor(butinJoueur * 0.7), restant);
            joueur.cashBlanchi += montantBlanchi;
            joueur.blanchiPeriodeMontant += montantBlanchi;
        }

        joueur.pointsCompetence += 1; joueur.braquagesReussis += 1;
        joueur.respect += 1; // Réussir un casse, quelle que soit l'approche, forge une réputation dans le milieu.
        let gainHeat = 20 - Math.floor(20 * (joueur.buffs.sangfroid / 100));
        joueur.heat += Math.max(5, gainHeat); 
        if (stat === 'force') ajouterRisque(3);
        indexCible[cibleActuelle.niveau]++; 
        contexteCasse.noteButin = noteButin;

        // Comptage pondéré par ville pour le déblocage du casse légendaire (invisible dans le profil).
        let poids = POIDS_NIVEAU_LEGENDAIRE[cibleActuelle.niveau] || 0;
        if (poids > 0) {
            let avantDeblocage = legendaireDebloquee(joueur.ville);
            joueur.braquagesParVille[joueur.ville] = (joueur.braquagesParVille[joueur.ville] || 0) + poids;
            if (!avantDeblocage && legendaireDebloquee(joueur.ville)) {
                contexteCasse.popupLegendaireVille = joueur.ville;
            }
        }
    }

    if (verifierTrahisonEquipe()) return;

    afficherRapportBraquage(reussi, butinJoueur, mortAllie, estViolent);
}

function ajouterRisque(montant) {
    joueur.risquePrison += joueur.competences.disciplineT2 ? Math.round(montant * 0.75) : montant;
}

function verifierTrahisonEquipe() {
    let traitre = joueur.equipe.find(r => r.affection !== undefined && r.affection <= 15);
    if (traitre && Math.random() < 0.12) {
        afficherEcranFin(`Trahi par ${traitre.nom}`, `${traitre.nom} en avait assez d'être maltraité et de toucher les miettes. Un coup de feu dans le dos pendant l'opération, et c'est terminé pour vous.`, 'sombre');
        return true;
    }
    return false;
}

// --- PHASE D'EXFILTRATION ---
function estimerExfiltration(mode) {
    let bonusChauffeur = joueur.equipe.some(r => r.role === 'chauffeur') ? 3 : 0;
    let scoreBase = mode === 'discrete' ? joueur.stats.furtivite
        : mode === 'vehicule' ? joueur.stats.force + (joueur.vehicule !== 'Aucun' ? 3 : 0) + bonusChauffeur
        : joueur.stats.force;
    let proba = Math.max(0, Math.min(100, scoreBase * 10));
    if (mode === 'discrete' && joueur.competences.furtiviteT3) {
        // Seconde chance automatique en cas d'échec : réduit la probabilité d'échec au carré.
        proba = Math.round(100 - Math.pow(100 - proba, 2) / 100);
    }
    return proba;
}

function afficherRapportBraquage(reussi, butin, mortAllie, estViolent) {
    contexteCasse.reussiVol = reussi;
    contexteCasse.butinObtenu = butin;
    contexteCasse.mortAllieVol = mortAllie;
    contexteCasse.estViolent = estViolent;
    contexteCasse.violent = estViolent || contexteCasse.mortFlics > 0;

    let msgAmbiance = reussi 
        ? (cibleActuelle.niveau === 'faible' ? "Le braquage s'est déroulé sans accroc majeur, de l'argent de poche facile." : "Un coup magistral qui fera la une des journaux demain.")
        : "Le plan a totalement déraillé. Les forces de l'ordre vous ont pris en tenaille.";

    document.getElementById('debrief-titre').innerText = "Rapport du Braquage";
    document.getElementById('debrief-content').innerHTML = `
        <div class="stamp-reveal ${reussi ? 'stamp-ok' : 'stamp-echec'}">${reussi ? '✅ Réussi' : '❌ Échoué'}</div>
        <p style="font-style:italic; color:#8a8c7c; text-align:center;">${msgAmbiance}</p>
    `;
    let btn = document.getElementById('debrief-btn');
    btn.innerText = "Continuer";
    btn.onclick = () => { lancerExfiltration(reussi, butin, mortAllie, estViolent); };
    showScreen('screen-debrief');
}

function lancerExfiltration(reussi, butin, mortAllie, estViolent) {
    document.getElementById('action-title').innerText = reussi ? "Exfiltration" : "Repli en catastrophe";
    let intro = reussi
        ? "Le butin en main, il faut maintenant sortir du secteur avant que le quartier ne soit bouclé."
        : "Le coup a capoté. Il faut fuir avant l'arrivée en masse des renforts.";

    let bonusChauffeur = joueur.equipe.some(r => r.role === 'chauffeur') && joueur.vehicule !== 'Aucun';

    document.getElementById('action-choices').innerHTML = `
        <p style="background:var(--panel-raised); padding:15px; border-radius:2px; text-align:left; border-left:4px solid var(--rust); line-height:1.5;">${intro}</p>
        <button class="btn-choix" onclick="resoudreExfiltration('discrete')">🥷 Fuite discrète (couloirs, égouts)<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance de réussite estimée : ~${estimerExfiltration('discrete')}%</span></button>
        <button class="btn-choix" onclick="resoudreExfiltration('vehicule')">🚗 Foncer vers le véhicule${bonusChauffeur ? ' (Chauffeur en renfort)' : ''}<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance de réussite estimée : ~${estimerExfiltration('vehicule')}%</span></button>
        <button class="btn-choix" onclick="resoudreExfiltration('force')">💪 Forcer le passage<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance de réussite estimée : ~${estimerExfiltration('force')}%</span></button>
    `;
    showScreen('screen-action');
}

function resoudreExfiltration(mode) {
    let reussi = contexteCasse.reussiVol;
    let butin = contexteCasse.butinObtenu;
    let mortAllie = contexteCasse.mortAllieVol;

    let bonusChauffeur = joueur.equipe.some(r => r.role === 'chauffeur') ? 3 : 0;
    let scoreBase = mode === 'discrete' ? joueur.stats.furtivite
        : mode === 'vehicule' ? joueur.stats.force + (joueur.vehicule !== 'Aucun' ? 3 : 0) + bonusChauffeur
        : joueur.stats.force;

    let jet = Math.floor(Math.random() * 10) + 1;
    let exfilReussie = (scoreBase + jet) >= 11;

    if (!exfilReussie && mode === 'discrete' && joueur.competences.furtiviteT3) {
        let jet2 = Math.floor(Math.random() * 10) + 1;
        if ((scoreBase + jet2) >= 11) exfilReussie = true;
    }

    let msgExfil;
    if (exfilReussie) {
        joueur.heat += (mode === 'force') ? 15 : 5;
        msgExfil = mode === 'discrete' ? "Vous vous fondez dans la ville sans laisser de trace."
            : mode === 'vehicule' ? "Le moteur rugit, vous distancez les premières sirènes."
            : "Vous forcez le passage sans ménagement, mais vous êtes dehors.";
    } else {
        // Pénalité modérée seulement : la scène de chasse qui suit offre une vraie chance de s'en sortir,
        // le sort ne se joue pas entièrement sur ce seul jet.
        joueur.heat += 15; ajouterRisque(2);
        let cause = contexteCasse.flicsPresents
            ? "Un policier resté en faction a donné l'alerte dès votre sortie."
            : contexteCasse.estViolent
                ? "Les coups de feu ont résonné dans tout le quartier : quelqu'un a appelé la police."
                : "Un passant, intrigué par votre sortie précipitée, a composé le numéro d'urgence depuis le trottoir d'en face.";
        msgExfil = `${cause} Une patrouille toute proche vous prend en chasse.`;
    }

    afficherRapportExfiltration(reussi, butin, mortAllie, exfilReussie, msgExfil);
}

function afficherRapportExfiltration(reussi, butin, mortAllie, exfilReussie, msgExfil) {
    document.getElementById('debrief-titre').innerText = "Rapport d'Exfiltration";
    document.getElementById('debrief-content').innerHTML = `
        <div class="stamp-reveal ${exfilReussie ? 'stamp-ok' : 'stamp-echec'}">${exfilReussie ? '✅ Réussie' : '❌ Compromise'}</div>
        <p style="font-style:italic; color:#8fb4d1; text-align:center;">${msgExfil}</p>
    `;
    let btn = document.getElementById('debrief-btn');
    btn.innerText = "Continuer";

    if (!exfilReussie) {
        // Compromise ne veut pas dire prison automatique : une vraie porte de sortie s'ouvre.
        btn.onclick = () => { lancerPriseEnChasse(reussi, butin, mortAllie); };
    } else {
        // Phase 2 (Trajet Retour) : ne se joue que si la situation le justifie déjà.
        let besoinTrajetRetour = joueur.heat > 50 || contexteCasse.flicsPresents;
        if (besoinTrajetRetour) {
            btn.onclick = () => { lancerTrajetRetour(reussi, butin, mortAllie); };
        } else {
            btn.onclick = () => { afficherDebrief(reussi, butin, mortAllie, "", false, true); };
        }
    }
    showScreen('screen-debrief');
}

function lancerPriseEnChasse(reussi, butin, mortAllie) {
    document.getElementById('action-title').innerText = "Prise en Chasse";
    document.getElementById('action-choices').innerHTML = `
        <p style="background:var(--panel-raised); padding:15px; border-radius:2px; text-align:left; border-left:4px solid var(--rust); line-height:1.5;">Les gyrophares se rapprochent dans le rétroviseur. Il faut décider vite.</p>
        <button class="btn-choix" onclick="resoudrePriseEnChasse('force', ${butin}, ${reussi}, ${mortAllie})">💪 Forcer un barrage improvisé<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance d'y échapper : ~${Math.max(0, Math.min(100, joueur.stats.force * 10))}%</span></button>
        <button class="btn-choix" onclick="resoudrePriseEnChasse('furtivite', ${butin}, ${reussi}, ${mortAllie})">🥷 Semer la patrouille dans les ruelles<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance d'y échapper : ~${Math.max(0, Math.min(100, joueur.stats.furtivite * 10))}%</span></button>
        <button class="btn-choix" onclick="resoudrePriseEnChasse('intel', ${butin}, ${reussi}, ${mortAllie})">🧠 Brouiller votre trace numérique<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance d'y échapper : ~${Math.max(0, Math.min(100, joueur.stats.intel * 10))}%</span></button>
    `;
    showScreen('screen-action');
}

function resoudrePriseEnChasse(stat, butin, reussi, mortAllie) {
    let score = joueur.stats[stat];
    let jet = Math.floor(Math.random() * 10) + 1;
    let echappe = (score + jet) >= 10; // Seuil légèrement plus clément : c'est une vraie deuxième chance.

    let msg;
    if (echappe) {
        joueur.heat += 10;
        msg = stat === 'force' ? "Vous forcez un barrage improvisé et disparaissez dans la circulation."
            : stat === 'furtivite' ? "Vous semez la patrouille dans un dédale de ruelles."
            : "Vous brouillez votre trace numérique, la patrouille perd votre piste.";
        afficherDebrief(reussi, butin, mortAllie, msg, false, false);
    } else {
        joueur.heat += 20; ajouterRisque(5);
        msg = "La patrouille vous rattrape avant que vous ayez pu semer la filature.";
        afficherDebrief(reussi, butin, mortAllie, msg, true, false);
    }
}

function estimerTrajetRetour() {
    return Math.max(0, Math.min(100, joueur.stats.furtivite * 10));
}

function lancerTrajetRetour(reussi, butin, mortAllie) {
    document.getElementById('action-title').innerText = "Trajet Retour";
    document.getElementById('action-choices').innerHTML = `
        <p style="background:var(--panel-raised); padding:15px; border-radius:2px; text-align:left; border-left:4px solid var(--gold-dim); line-height:1.5;">Le quartier reste chaud. Une voiture banalisée semble vous suivre à distance sur le chemin du retour.</p>
        <button class="btn-choix" onclick="resoudreTrajetRetour('semer', ${butin}, ${reussi}, ${mortAllie})">🥷 Semer la filature<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Chance de réussite estimée : ~${estimerTrajetRetour()}% — rien à perdre si ça passe</span></button>
        <button class="btn-choix" onclick="resoudreTrajetRetour('planquer', ${butin}, ${reussi}, ${mortAllie})">📦 Planquer le butin en urgence<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Sûr, mais -15% de butin (Tension -10%)</span></button>
        <button class="btn-choix" onclick="resoudreTrajetRetour('abandonner', ${butin}, ${reussi}, ${mortAllie})">💸 Lâcher du lest pour semer le poids<br><span style="font-size:12px; color:#8a8c7c; font-style:italic;">Garanti, mais -30% de butin (Tension -20%, Risque -10%)</span></button>
    `;
    showScreen('screen-action');
}

function resoudreTrajetRetour(mode, butinInitial, reussi, mortAllie) {
    let butin = butinInitial;
    let msgTrajet;

    if (mode === 'semer') {
        let jet = Math.floor(Math.random() * 10) + 1;
        let ok = (joueur.stats.furtivite + jet) >= 11;
        if (ok) {
            msgTrajet = "Vous multipliez les détours dans la circulation et perdez la filature sans rien sacrifier.";
            afficherDebrief(reussi, butin, mortAllie, msgTrajet, false, false);
        } else {
            joueur.heat += 15; ajouterRisque(3);
            msgTrajet = "Impossible de semer la voiture : elle vous colle jusqu'à quelques rues de la planque.";
            // Là aussi, une dernière porte de sortie plutôt qu'un couperet.
            lancerPriseEnChasse(reussi, butin, mortAllie);
            return;
        }
    } else if (mode === 'planquer') {
        let perte = Math.floor(butinInitial * 0.15);
        butin = butinInitial - perte;
        joueur.argent = Math.max(0, joueur.argent - perte);
        joueur.argentPerdu += perte;
        joueur.heat = Math.max(0, joueur.heat - 10);
        msgTrajet = "Vous planquez une partie du butin dans une consigne de fortune avant de rentrer presque les mains vides.";
        afficherDebrief(reussi, butin, mortAllie, msgTrajet, false, false);
    } else {
        let perte = Math.floor(butinInitial * 0.30);
        butin = butinInitial - perte;
        joueur.argent = Math.max(0, joueur.argent - perte);
        joueur.argentPerdu += perte;
        joueur.heat = Math.max(0, joueur.heat - 20);
        joueur.risquePrison = Math.max(0, joueur.risquePrison - 10);
        msgTrajet = "Vous balancez une bonne partie du butin par la fenêtre pour semer le poids et filer sans encombre.";
        afficherDebrief(reussi, butin, mortAllie, msgTrajet, false, false);
    }

    updateStats();
}

function calculerBilanHumain(mortAllie) {
    let policeImpliquee = contexteCasse.flicsPresents;
    let aucuneVictime = contexteCasse.blesseCivils === 0 && contexteCasse.mortCivils === 0 && mortAllie === 0 &&
        (!policeImpliquee || (contexteCasse.blesseFlics === 0 && contexteCasse.mortFlics === 0));

    let lignes = [];
    if (policeImpliquee) {
        lignes.push({ txt: `Policiers blessés : ${contexteCasse.blesseFlics} | tués : ${contexteCasse.mortFlics}` });
    }
    lignes.push({ txt: `Civils blessés : ${contexteCasse.blesseCivils} | tués : ${contexteCasse.mortCivils}` });
    lignes.push({ txt: `Alliés perdus : ${mortAllie}${contexteCasse.nomAllieMort ? ` (${contexteCasse.nomAllieMort})` : ""}` });

    let effet = "";
    if (aucuneVictime) {
        joueur.moralite = Math.min(10, joueur.moralite + 1);
        joueur.mental = Math.min(10, joueur.mental + 1);
        effet = `<p class="bilan-effet bon">✅ Aucune victime, aucun blessé : l'équipe garde la tête haute (Moralité +1, Mental +1).</p>`;
    } else if (mortAllie > 0) {
        joueur.mental = Math.max(1, joueur.mental - 1);
        effet = `<p class="bilan-effet mauvais">⚠️ La perte d'un allié pèse sur le moral du groupe (Mental -1).</p>`;
    } else if (contexteCasse.mortCivils > 0 || (policeImpliquee && contexteCasse.mortFlics > 0)) {
        joueur.moralite = Math.max(0, joueur.moralite - 1);
        effet = `<p class="bilan-effet mauvais">⚠️ Le sang versé laisse des traces, sur votre conscience comme sur votre réputation (Moralité -1).</p>`;
    }

    return `<ul style="color:#c8564a; list-style:none; padding:0;">${lignes.map(l => `<li>${l.txt}</li>`).join('')}</ul>${effet}`;
}

function afficherDebrief(reussi, butin, mortAllie, msgExfil, arreteEnFuite, exfiltrationPropre) {
    let manchette = genererManchette({ reussi: reussi, niveau: cibleActuelle.niveau, violent: contexteCasse.violent });
    let bilanHumainHtml = calculerBilanHumain(mortAllie);

    // Palier de résultat : Parfait (rare) > Réussi (avec complications surmontées) > Rattrapé après coup > Échec.
    let palier, coloTitre, texteButin;
    if (!reussi) {
        palier = "❌ Opération Compromise"; coloTitre = '#a4453a';
        texteButin = null;
    } else if (arreteEnFuite) {
        palier = "⚠️ Butin Empoché... Puis Rattrapé"; coloTitre = '#c98a2c';
        texteButin = `<strong>Butin récupéré sur place :</strong> ${butin.toLocaleString()} € — mais l'arrestation qui suit risque d'en coûter une partie.`;
    } else if (exfiltrationPropre) {
        palier = "🌟 Coup Parfait"; coloTitre = '#c49a4e';
        texteButin = `<strong>Butin net empoché :</strong> ${butin.toLocaleString()} €`;
    } else {
        palier = "✅ Coup Réussi (Sortie Compliquée)"; coloTitre = '#4f9967';
        texteButin = `<strong>Butin net empoché :</strong> ${butin.toLocaleString()} €`;
    }

    document.getElementById('debrief-titre').innerText = "Bilan de l'Opération";
    let html = `
        <h3 style="color:${coloTitre}">${palier}</h3>
        ${texteButin ? `<p>${texteButin}</p>` : ""}
        ${contexteCasse.noteButin ? `<p style="font-style:italic; color:var(--gold); font-size:13px;">${contexteCasse.noteButin}</p>` : ""}
        ${msgExfil ? `<p style="font-style:italic; color:#8fb4d1; font-size:13px;">${msgExfil}</p>` : ""}
        <hr style="border-color:#2b323c">
        <h4>Bilan Humain :</h4>
        ${bilanHumainHtml}
        <div class="press-clip"><strong>${manchette.journal}</strong> — ${manchette.texte}</div>
    `;
    document.getElementById('debrief-content').innerHTML = html;

    ajouterJournal(
        reussi
            ? `${cibleActuelle.nom} braqué avec succès (${butin.toLocaleString()} €).${arreteEnFuite ? " Rattrapé en pleine fuite juste après." : (exfiltrationPropre ? " Coup parfait." : "")}`
            : `Coup raté sur ${cibleActuelle.nom}.`
    );
    
    let btnSuite = document.getElementById('debrief-btn');
    if (arreteEnFuite) {
        btnSuite.innerText = "Aller en case prison...";
        btnSuite.onclick = () => { allerEnPrison("Rattrapé après une course-poursuite, butin saisi en partie."); };
    } else if(!reussi) {
        btnSuite.innerText = "Aller en case prison...";
        btnSuite.onclick = () => { allerEnPrison("Arrêté sur les lieux."); };
    } else {
        btnSuite.innerText = "Vivre votre vie";
        let villePopup = contexteCasse.popupLegendaireVille;
        btnSuite.onclick = () => {
            eventsRestantsAfaire = Math.floor(Math.random() * 3) + 1;
            if (villePopup) {
                afficherConsequence(
                    "🟣 Casse Légendaire Débloqué",
                    `Votre réputation à ${villePopup} vous a ouvert des portes que peu osent franchir. Une cible légendaire est désormais disponible dans cette ville — retournez à la planque pour la découvrir.`,
                    () => { prochaineEtapeEvenement(); }
                );
            } else {
                prochaineEtapeEvenement();
            }
        };
    }
    showScreen('screen-debrief');
}

// --- FIN DE JEU (FINS ALTERNATIVES) ---
function terminerJeu(raison) {
    if (raison === 'retraite') {
        let titre, description, categorie = 'triomphe';
        let bilan = `(Gagné total : ${joueur.argentGagne.toLocaleString()} € / Perdu : ${joueur.argentPerdu.toLocaleString()} €).`;

        if (joueur.moralite <= 2 && joueur.crainte >= 15) {
            titre = "Le Boucher du Milieu";
            description = `Vous vous retirez craint de tous et aimé de personne, avec ${joueur.argent.toLocaleString()} € et un sillage de sang derrière vous. ${bilan}`;
            categorie = 'sombre';
        } else if (joueur.respect >= 25 && joueur.argent >= 500000) {
            titre = "Parrain de la Pègre";
            description = `Vous ne vous retirez pas vraiment : vous régnez désormais sur le milieu depuis l'ombre, avec ${joueur.argent.toLocaleString()} € et un réseau de loyautés à toute épreuve. ${bilan}`;
        } else if (joueur.moralite >= 8 && joueur.argent >= 200000) {
            titre = "Rédemption";
            description = `Vous quittez le milieu la conscience presque tranquille, avec ${joueur.argent.toLocaleString()} € et une vie loin des projecteurs qui vous attend. ${bilan}`;
        } else if (joueur.argent < 100000) {
            titre = "Retraite Misérable";
            description = `Retraite avec seulement ${joueur.argent.toLocaleString()} €, une carrière qui n'aura pas payé. ${bilan}`;
        } else if (joueur.argent < 2000000) {
            titre = "Retraite Dorée";
            description = `Retraite confortable avec ${joueur.argent.toLocaleString()} € en poche. ${bilan}`;
        } else {
            titre = "LÉGENDE VIVANTE";
            description = `Retraite avec ${joueur.argent.toLocaleString()} € — votre nom restera gravé dans le milieu. ${bilan}`;
        }
        ajouterJournal(`Fin de carrière : ${titre}.`);
        afficherEcranFin(titre, description, categorie);
    }
}

function afficherEcranFin(titre, description, categorie) {
    categorie = categorie || 'neutre';
    let classeStamp = categorie === 'sombre' ? 'stamp-echec' : 'stamp-ok';
    let libelleStamp = categorie === 'sombre' ? '☠️ Fin de Partie' : '🏁 Fin de Partie';

    document.getElementById('end-titre').innerText = titre;
    document.getElementById('end-text').innerHTML = `
        <div class="stamp-reveal ${classeStamp} stamp-long">${libelleStamp}</div>
        <p style="text-align:center; font-style:italic; margin-top:-4px;">${description}</p>
        <hr style="border-color:#2b323c; margin: 18px 0;">
        <h4>Dossier de Carrière</h4>
        <ul style="list-style:none; padding:0; font-size:13px;">
            <li class="bilan-ligne"><span>Âge final</span><strong>${joueur.age} ans</strong></li>
            <li class="bilan-ligne"><span>Ville</span><strong>${joueur.ville || '—'}</strong></li>
            <li class="bilan-ligne"><span>Profil</span><strong>${joueur.classe || '—'} · ${getStatutCriminel()}</strong></li>
            <li class="bilan-ligne"><span>Casses réussis</span><strong>${joueur.braquagesReussis}</strong></li>
            <li class="bilan-ligne"><span>Arrestations</span><strong>${joueur.nombreArrestations || 0}</strong></li>
            <li class="bilan-ligne"><span>Argent gagné (total)</span><strong>${joueur.argentGagne.toLocaleString()} €</strong></li>
            <li class="bilan-ligne"><span>Argent perdu (total)</span><strong>${joueur.argentPerdu.toLocaleString()} €</strong></li>
            <li class="bilan-ligne"><span>Fortune finale</span><strong>${joueur.argent.toLocaleString()} €</strong></li>
            <li class="bilan-ligne"><span>Dont blanchi</span><strong>${joueur.cashBlanchi.toLocaleString()} €</strong></li>
            <li class="bilan-ligne"><span>Équipe au moment des faits</span><strong>${joueur.equipe.length} recrue${joueur.equipe.length !== 1 ? 's' : ''}</strong></li>
            <li class="bilan-ligne"><span>Recrues perdues en carrière</span><strong>${joueur.recruesMortes.length}</strong></li>
            <li class="bilan-ligne"><span>Respect</span><strong>${joueur.respect}</strong></li>
            <li class="bilan-ligne"><span>Crainte</span><strong>${joueur.crainte}</strong></li>
            <li class="bilan-ligne"><span>Moralité finale</span><strong>${joueur.moralite}/10</strong></li>
        </ul>
    `;
    showScreen('screen-end');
}
