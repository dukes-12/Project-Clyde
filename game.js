// --- DONNÉES DU JEU (v0.0.9) ---
const monde = {
    "Paris": {
        faible: [{ nom: "Tabac-Presse", diff: 4, butin: 12000, desc: "La boutique est mal éclairée. Trois clients patientent, le gérant écoute la radio, distrait." }, { nom: "Pharmacie de garde", diff: 5, butin: 15000, desc: "Seule la croix verte éclaire la rue. Le pharmacien est seul, somnolant derrière le comptoir." }, { nom: "Boutique de vêtements", diff: 5, butin: 18000, desc: "Caisse pleine après les soldes. Un seul vigile fatigué à l'entrée." }],
        modere: [{ nom: "Bijouterie Vendôme", diff: 7, butin: 200000, desc: "L'endroit est luxueux. 4 clients fortunés essaient des parures, gardés par deux vigiles armés." }, { nom: "Fourgon de fonds", diff: 8, butin: 250000, desc: "Le fourgon est à l'arrêt devant une banque. Deux convoyeurs lourdement armés font le transfert." }, { nom: "Banque d'Affaires", diff: 8, butin: 300000, desc: "Accès restreint, coffres-forts individuels. Caméras à chaque angle." }],
        eleve: [{ nom: "Musée du Louvre", diff: 10, butin: 3500000, desc: "Une forteresse culturelle. Rondes de nuit constantes, lasers croisés et vitrines blindées." }, { nom: "Vente aux enchères", diff: 11, butin: 4500000, desc: "Le tout-Paris est là. Sécurité maximale, caméras biométriques et police en civil dans la salle." }, { nom: "Palais de l'Élysée (Réserves)", diff: 12, butin: 6000000, desc: "Cible suicidaire. Garde républicaine, sécurité d'État, mais des œuvres inestimables en sous-sol." }]
    },
    "New York": {
        faible: [{ nom: "Prêteur sur gages", diff: 5, butin: 20000, desc: "Boutique crasseuse dans le Bronx. Le patron garde un fusil à pompe sous le comptoir." }, { nom: "Supérette", diff: 5, butin: 18000, desc: "Un caissier fatigué et quelques ivrognes traînent dans les rayons." }, { nom: "Dépôt de quartier", diff: 6, butin: 22000, desc: "Petite réserve de matériel électronique. Grilles métalliques simples." }],
        modere: [{ nom: "Fourgon Blindé", diff: 8, butin: 350000, desc: "Pris dans les embouteillages de Manhattan. Les convoyeurs sont sur les nerfs." }, { nom: "Boutique de luxe", diff: 7, butin: 300000, desc: "Sur la 5ème Avenue. Vigiles en costard, portes magnétiques et clientèle snob." }, { nom: "Bijoutier de Brooklyn", diff: 7, butin: 280000, desc: "Diamants bruts fraîchement arrivés. La mafia locale surveille de loin." }],
        eleve: [{ nom: "Réserve Fédérale", diff: 11, butin: 7000000, desc: "La cible ultime. Gardes d'élite, coffre-fort de 10 tonnes et caméras à reconnaissance faciale." }, { nom: "Banque de Manhattan", diff: 10, butin: 5500000, desc: "Un hall gigantesque grouillant de monde. Le SWAT n'est jamais loin dans ce quartier." }, { nom: "Bourse de Wall Street", diff: 12, butin: 8000000, desc: "Salles de serveurs ultra-sécurisées. Objectif : détournement de fonds à haute fréquence." }]
    },
    "Los Angeles": {
        faible: [{ nom: "Dispensaire local", diff: 4, butin: 18000, desc: "Forte odeur d'herbe. Le vigile regarde son téléphone, la caisse est pleine d'argent liquide." }, { nom: "Station service", diff: 4, butin: 14000, desc: "Isolée sur une route désertique. Un seul employé s'ennuie derrière une vitre pare-balles." }, { nom: "Motel miteux", diff: 4, butin: 15000, desc: "Le coffre de la réception contient les paiements au noir de la semaine." }],
        modere: [{ nom: "Manoir a Beverly Hills", diff: 6, butin: 150000, desc: "Les propriétaires sont à une fête. Il reste le personnel de maison et des chiens de garde." }, { nom: "Joaillier VIP", diff: 7, butin: 200000, desc: "Un salon privé sur rendez-vous. Verre blindé et alarmes reliées directement au poste local." }, { nom: "Banque de Vinewood", diff: 7, butin: 220000, desc: "Petite succursale pour acteurs de seconde zone. Sécurité moyenne mais active." }],
        eleve: [{ nom: "Casino Clandestin", diff: 9, butin: 2800000, desc: "Géré par la mafia. Les gardes ont la gâchette facile et l'argent coule à flots." }, { nom: "Reserve de Lingots", diff: 10, butin: 3500000, desc: "Un entrepôt banalisé lourdement gardé par des mercenaires privés." }, { nom: "Studio de Cinéma (Coffre)", diff: 10, butin: 3000000, desc: "Cachette secrète contenant les salaires non déclarés. Milice privée sur place." }]
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

const banqueEvenements = {
    simple: [
        { 
            titre: "Rencontre fortuite", desc: "Vous croisez un ancien camarade peu regardant sur la légalité.", 
            choix: [
                { txt: "Discuter discrètement d'affaires", action: () => { if (Math.random() > 0.3) { joueur.argent += 5000; joueur.argentGagne += 5000; return "Le tuyau était en or. Vous récupérez 5 000 € sur une revente rapide."; } else { joueur.heat += 5; return "Le plan est tombé à l'eau et un indic rôdait dans le coin (Tension +5%)."; } } },
                { txt: "L'ignorer superbement", action: () => { if (joueur.respect >= 3) { joueur.respect += 1; return "Votre froideur en impose. Votre réputation monte dans le quartier (Respect +1)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Il prend mal votre mépris et lance des rumeurs blessantes (Mental -1)."; } } },
                { txt: "L'intimider pour lui faire les poches", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 6) { joueur.argent += 2000; joueur.argentGagne += 2000; joueur.moralite = Math.max(0, joueur.moralite - 1); return "Plaqué contre le mur, il vous vide ses poches sans un mot (+2 000 €, Moralité -1)."; } else { joueur.heat += 10; joueur.moralite = Math.max(0, joueur.moralite - 1); return "Il s'est débattu en hurlant à l'aide avant de s'enfuir (Tension +10%)."; } } }
            ] 
        },
        { 
            titre: "Panne de réveil", desc: "Vous ratez un rendez-vous matinal avec un contact mineur.", 
            choix: [
                { txt: "Profiter de l'occasion pour dormir", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Une grasse matinée réparatrice qui vous remet d'aplomb (Mental +1)."; } else { joueur.respect = Math.max(0, joueur.respect - 1); return "Le contact a pris ce retard pour un affront délibéré (Respect -1)."; } } },
                { txt: "Proposer un dédommagement financier", action: () => { if (joueur.argent >= 2000) { joueur.argent -= 2000; joueur.argentPerdu += 2000; if (Math.random() > 0.2) { joueur.respect += 1; return "L'enveloppe glissée fait oublier l'affront (Respect +1)."; } else { return "Il prend l'argent mais garde une dent contre vous."; } } else { joueur.respect = Math.max(0, joueur.respect - 1); return "Faute de fonds suffisants, votre tentative d'excuse tourne au ridicule (Respect -1)."; } } },
                { txt: "Le menacer pour qu'il garde le silence", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 5) { joueur.crainte += 1; joueur.moralite = Math.max(0, joueur.moralite - 1); return "Le ton employé lui fait passer toute envie de se plaindre (Crainte +1)."; } else { joueur.heat += 10; return "Il ne s'est pas laissé impressionner et promet de vous griller (Tension +10%)."; } } }
            ] 
        },
        { 
            titre: "Contrôle de routine", desc: "Une patrouille de police s'arrête non loin de votre planque.", 
            choix: [
                { txt: "Se fondre immédiatement dans l'obscurité", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 6) { return "Vous disparaissez dans l'ombre sans faire le moindre bruit."; } else { joueur.heat += 15; return "Un agent a remarqué votre silhouette fuyante et prend des notes (Tension +15%)."; } } },
                { txt: "Passer devant eux d'un pas assuré", action: () => { let score = joueur.mental + Math.floor(Math.random() * 6); if (score >= 7) { return "Un simple hochement de tête poli et ils poursuivent leur ronde."; } else { joueur.heat += 10; return "Votre nervosité était palpable. Les agents vous dévisagent longuement (Tension +10%)."; } } },
                { txt: "Prendre la fuite en courant par les coursives", action: () => { if (Math.random() > 0.5) { joueur.heat += 15; return "Vous les semez de justesse dans le dédale des ruelles (Tension +15%)."; } else { joueur.heat += 25; joueur.risquePrison += 10; return "Une course-poursuite s'engage. Votre signalement est diffusé sur les ondes (Tension +25%, Risque +10%)."; } } }
            ] 
        },
        { 
            titre: "Colis égaré", desc: "Un carton non étiqueté a été déposé sur votre palier.", 
            choix: [
                { txt: "Forcer le colis pour en écouler le contenu", action: () => { if (Math.random() > 0.3) { joueur.argent += 2000; joueur.argentGagne += 2000; return "Le colis contenait du matériel électronique vite revendu (+2 000 €)."; } else { joueur.heat += 10; return "C'était un appât d'escrocs locaux. Une altercation éclate (Tension +10%)."; } } },
                { txt: "Rechercher le véritable destinataire dans l'immeuble", action: () => { if (Math.random() > 0.3) { joueur.moralite = Math.min(10, joueur.moralite + 1); return "Le voisin vous remercie chaleureusement (Moralité +1)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le voisin vous accuse d'avoir tenté de voler son paquet (Mental -1)."; } } },
                { txt: "Détruire le paquet par précaution", action: () => { if (Math.random() > 0.5) { return "Le carton est brûlé sans laisser de traces."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "La paranoïa commence à peser lourdement sur vos nerfs (Mental -1)."; } } }
            ] 
        },
        { 
            titre: "Coup de fil anonyme", desc: "Une respiration pesante se fait entendre à l'autre bout de la ligne.", 
            choix: [
                { txt: "Raccrocher immédiatement", action: () => { if (Math.random() > 0.4) { return "La ligne est coupée, aucun nouvel appel."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le téléphone sonne à nouveau cinq minutes plus tard (Mental -1)."; } } },
                { txt: "Tenter une localisation du signal", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 6) { joueur.respect += 1; return "Vous identifiez la cabine d'un rival et le prenez de vitesse (Respect +1)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le signal était masqué derrière des proxys impénétrables (Mental -1)."; } } },
                { txt: "Répondre par des menaces de mort explicites", action: () => { let score = joueur.crainte + Math.floor(Math.random() * 6); if (score >= 4) { joueur.crainte += 1; return "L'interlocuteur raccroche, visiblement déstabilisé (Crainte +1)."; } else { joueur.heat += 10; return "Votre interlocuteur éclate de rire et promet des représailles (Tension +10%)."; } } }
            ] 
        },
        { 
            titre: "Verre renversé", desc: "Dans un bar miteux, un client alcoolisé bouscule brutalement votre table.", 
            choix: [
                { txt: "Tempérer la situation et s'excuser", action: () => { if (Math.random() > 0.3) { joueur.moralite = Math.min(10, joueur.moralite + 1); return "L'homme marmonne une excuse et s'éloigne (Moralité +1)."; } else { joueur.respect = Math.max(0, joueur.respect - 1); return "Le bar entier se moque de votre passivité (Respect -1)."; } } },
                { txt: "Lui subtiliser son portefeuille pendant la bousculade", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 6) { joueur.argent += 500; joueur.argentGagne += 500; return "Geste chirurgical. Vous empochez 500 € en toute discrétion."; } else { joueur.heat += 10; return "Pris la main dans la poche, une bagarre générale éclate (Tension +10%)."; } } },
                { txt: "Lui asséner un coup violent sans sommation", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 6) { joueur.crainte += 2; joueur.moralite = Math.max(0, joueur.moralite - 1); return "L'homme s'écroule net. Le silence se fait dans la salle (Crainte +2)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); joueur.heat += 10; return "Le coup a manqué de punch et la riposte vous sonne (Mental -1, Tension +10%)."; } } }
            ] 
        },
        { 
            titre: "Rumeur de quartier", desc: "Le commerçant du coin commente bruyamment votre dernier coup.", 
            choix: [
                { txt: "Prendre l'information avec détachement", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Vous écoutez l'histoire avec délectation (Mental +1)."; } else { return "Le commerçant change de sujet sans faire attention à vous."; } } },
                { txt: "Lui glisser un billet pour orienter la discussion", action: () => { if (joueur.argent >= 1000) { joueur.argent -= 1000; joueur.argentPerdu += 1000; if (Math.random() > 0.3) { joueur.heat = Math.max(0, joueur.heat - 10); return "Le commerçant promet d'égarer les curieux sur de fausses pistes (Tension -10%)."; } else { return "Il empoche l'argent mais reste bavard comme une pie."; } } else { joueur.heat += 5; return "Faute de moyens, votre proposition le rend suspicieux (Tension +5%)."; } } },
                { txt: "Lui faire comprendre de se taire à l'écart", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 6) { joueur.crainte += 1; return "Un regard appuyé dans l'arrière-boutique scelle son silence (Crainte +1)."; } else { joueur.heat += 15; return "Paniqué par vos menaces, il prévient le commissariat de quartier (Tension +15%)."; } } }
            ] 
        },
        { 
            titre: "Panne de réseau", desc: "Votre routeur sécurisé perd sa synchronisation satellite.", 
            choix: [
                { txt: "Relancer manuellement le matériel", action: () => { if (Math.random() > 0.4) { return "Le matériel redémarre sans encombre."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "La panne persiste plusieurs heures et bloque vos opérations (Mental -1)."; } } },
                { txt: "Détourner le signal du voisinage", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 6) { return "Pont réseau établi en quelques secondes sur une ligne voisine."; } else { joueur.heat += 10; return "Le pare-feu voisin déclenche une alerte intrusion chez le fournisseur (Tension +10%)."; } } },
                { txt: "Abandonner temporairement la planque", action: () => { if (joueur.argent >= 3000) { joueur.argent -= 3000; joueur.argentPerdu += 3000; if (Math.random() > 0.3) { return "Nuit passée dans un hôtel sécurisé."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "L'hôtel était surveillé par des patrouilles en civil (Mental -1)."; } } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Sans fonds pour l'hôtel, vous passez une nuit blanche et nerveuse (Mental -2)."; } } }
            ] 
        },
        { 
            titre: "Visite du bailleur", desc: "Le propriétaire exige d'inspecter les compteurs de la planque.", 
            choix: [
                { txt: "Camoufler le matériel compromettant", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 6) { return "Tout le matériel est dissimulé dans les faux plafonds à temps."; } else { joueur.risquePrison += 15; return "Il aperçoit des plans et des étuis suspects (Risque +15%)."; } } },
                { txt: "Lui verser une avance en liquide pour écourter la visite", action: () => { if (joueur.argent >= 3000) { joueur.argent -= 3000; joueur.argentPerdu += 3000; if (Math.random() > 0.2) { return "Ravi du supplément, il repart immédiatement sans poser de questions."; } else { joueur.heat += 5; return "Il prend l'argent mais s'interroge sur l'origine de ces liasses (Tension +5%)."; } } else { joueur.risquePrison += 10; return "Votre refus de payer l'incite à faire une inspection méticuleuse (Risque +10%)."; } } },
                { txt: "Lui refuser fermement l'accès au domicile", action: () => { if (Math.random() > 0.5) { return "Vexé, il tourne les talons en marmonnant."; } else { joueur.heat += 15; return "Il contacte les forces de l'ordre pour signaler un locataire clandestin (Tension +15%)."; } } }
            ] 
        },
        { 
            titre: "Trouvaille sur le bitume", desc: "Un portefeuille bien garni traîne sur une banquette de métro.", 
            choix: [
                { txt: "Garder les liquidités et jeter le reste", action: () => { if (Math.random() > 0.3) { joueur.argent += 1000; joueur.argentGagne += 1000; return "Vous récupérez 1 000 € en petites coupures non tracées."; } else { joueur.heat += 5; return "Une caméra de quai vous a filmé en train de ramasser l'objet (Tension +5%)."; } } },
                { txt: "Le déposer aux objets trouvés", action: () => { if (Math.random() > 0.3) { joueur.moralite = Math.min(10, joueur.moralite + 1); joueur.heat = Math.max(0, joueur.heat - 10); return "Ce geste civique apaise votre conscience (Moralité +1, Tension -10%)."; } else { return "Le préposé prend le portefeuille sans un regard."; } } },
                { txt: "Exploiter les cartes bancaires en ligne", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7) { joueur.argent += 4000; joueur.argentGagne += 4000; return "Commandes passées via des comptes relais (+4 000 €)."; } else { joueur.risquePrison += 15; return "Le blocage bancaire a tracé l'adresse IP de votre connexion (Risque +15%)."; } } }
            ] 
        },
        { 
            titre: "La fuite de gaz", desc: "Une forte odeur d'hydrocarbures envahit la cage d'escalier de la planque.", 
            choix: [
                { txt: "Évacuer discrètement avec les caisses de matériel", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 5) { return "Vous chargez le matériel dans le coffre sans attirer l'attention des voisins."; } else { joueur.heat += 10; return "Un voisin vous aide à porter une caisse particulièrement lourde et suspecte (Tension +10%)."; } } },
                { txt: "Faire intervenir un artisan au noir", action: () => { if (joueur.argent >= 1500) { joueur.argent -= 1500; joueur.argentPerdu += 1500; if (Math.random() > 0.3) { return "La fuite est réparée en une heure dans la plus grande discrétion."; } else { joueur.crainte += 1; return "L'artisan a vu vos armes et promet de se taire par pure terreur (Crainte +1)."; } } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Sans argent pour payer le dépanneur, vous coupez l'arrivée générale vous-même (Mental -1)."; } } },
                { txt: "Calfeutrer les portes et attendre la fin de l'alerte", action: () => { if (Math.random() > 0.5) { joueur.risquePrison += 10; return "Les pompiers inspectent le couloir sans toquer à votre porte (Risque +10%)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Les vapeurs toxiques vous causent d'atroces migraines (Mental -2)."; } } }
            ] 
        },
        { 
            titre: "Pourboire suspect", desc: "Un livreur attarde son regard sur des armes posées sur votre meuble d'entrée.", 
            choix: [
                { txt: "Le toiser froidement pour le dissuader d'ouvrir la bouche", action: () => { let score = joueur.crainte + Math.floor(Math.random() * 6); if (score >= 4) { joueur.crainte += 1; return "Pétrifié, il recule sans demander son reste (Crainte +1)."; } else { joueur.heat += 15; return "Dès la porte refermée, il compose le numéro de la police (Tension +15%)."; } } },
                { txt: "Lui tendre un pourboire colossal pour acheter son silence", action: () => { if (joueur.argent >= 500) { joueur.argent -= 500; joueur.argentPerdu += 500; if (Math.random() > 0.3) { return "L'argent fait disparaître toute velléité de bavardage."; } else { joueur.heat += 5; return "Le montant extravagant renforce ses soupçons (Tension +5%)."; } } else { joueur.heat += 10; return "Faute de monnaie, le malaise s'installe et il s'enfuit en courant (Tension +10%)."; } } },
                { txt: "L'empoigner brutalement avant qu'il ne quitte le palier", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 6) { joueur.moralite = Math.max(0, joueur.moralite - 1); joueur.crainte += 2; return "Secoué vigoureusement, il jure de ne rien avoir vu (Crainte +2, Moralité -1)."; } else { joueur.heat += 15; joueur.moralite = Math.max(0, joueur.moralite - 1); return "Il se débat bruyamment et ameute les résidents de l'étage (Tension +15%)."; } } }
            ] 
        },
        { 
            titre: "La table clandestine", desc: "On vous propose une place dans une partie de poker clandestine en sous-sol.", 
            choix: [
                { txt: "Prendre place et miser gros", action: () => { if (Math.random() > 0.5) { joueur.argent += 10000; joueur.argentGagne += 10000; joueur.respect += 1; return "Une série de mains exceptionnelles vous rapporte 10 000 € (Respect +1)."; } else { let perte = Math.min(joueur.argent, 5000); joueur.argent -= perte; joueur.argentPerdu += perte; return `La chance vous abandonne et vous perdez ${perte} €.`; } } },
                { txt: "Analyser les tricheries des autres joueurs", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 6) { joueur.stats.intel += 1; return "Vous décryptez les signaux des faux jetons (+1 Intel)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Les croupiers remarquent votre manège et vous expulsent (Mental -1)."; } } },
                { txt: "Décliner l'invitation et rester concentré", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Vous préservez votre capital et votre sérénité (Mental +1)."; } else { return "Vous passez une soirée ordinaire dans votre planque sans vous faire remarquer."; } } }
            ] 
        }
    ],
    moyen: [
        { 
            titre: "Chantage au cliché", desc: "Un individu prétend détenir des photos de vos repérages récents.", 
            choix: [
                { txt: "Acheter l'intégralité des négatifs", action: () => { if (joueur.argent >= 10000) { joueur.argent -= 10000; joueur.argentPerdu += 10000; if (Math.random() > 0.2) { return "Les clichés et cartes mémoire sont détruits devant vous."; } else { joueur.heat += 10; return "Il avait conservé un double et tente une nouvelle extorsion (Tension +10%)."; } } else { joueur.heat += 25; return "Incapable de payer, les clichés sont envoyés anonymement à la presse (Tension +25%)."; } } },
                { txt: "Localiser l'individu et détruire son matériel", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 2; return "L'appareil est brisé et le maître chanteur neutralisé (Crainte +2)."; } else { joueur.risquePrison += 20; return "L'agression échoue et l'homme court déposer plainte (Risque +20%)."; } } },
                { txt: "Pirater son espace de stockage distant", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7) { return "Les serveurs du maître chanteur sont effacés sans laisser de trace."; } else { joueur.heat += 15; return "L'intrusion déclenche une sauvegarde automatique vers ses complices (Tension +15%)."; } } }
            ] 
        },
        { 
            titre: "Concurrence territoriale", desc: "Une bande rivale exige un droit de passage sur vos zones de repli.", 
            choix: [
                { txt: "Organiser une expédition punitive", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 8) { joueur.respect += 3; joueur.crainte += 2; return "La bande rivale bat en retraite définitivement (Respect +3, Crainte +2)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); joueur.heat += 20; return "L'affrontement tourne au désastre pour vos troupes (Mental -2, Tension +20%)."; } } },
                { txt: "Négocier un accord financier temporaire", action: () => { if (joueur.argent >= 15000) { joueur.argent -= 15000; joueur.argentPerdu += 15000; if (Math.random() > 0.3) { return "Un pacte de non-agression est signé avec leur chef."; } else { joueur.respect = Math.max(0, joueur.respect - 1); return "Ils empochent la somme et vous considèrent désormais comme une proie facile (Respect -1)."; } } else { joueur.heat += 15; return "Faute de fonds, les négociations tournent court sous les menaces (Tension +15%)."; } } },
                { txt: "Transmettre un tuyau anonyme aux stups sur leurs planques", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7) { joueur.heat = Math.max(0, joueur.heat - 20); return "La brigade des stups démantèle vos rivaux au petit matin (Tension -20%)."; } else { joueur.crainte = Math.max(0, joueur.crainte - 2); return "Votre rôle d'indicateur fuite dans le milieu criminel (Crainte -2)."; } } }
            ] 
        },
        { 
            titre: "La lettre anonyme", desc: "Un courrier glissé sous la porte liste les immatriculations de vos véhicules.", 
            choix: [
                { txt: "Changer immédiatement de planque et de véhicules", action: () => { if (joueur.argent >= 20000) { joueur.argent -= 20000; joueur.argentPerdu += 20000; if (Math.random() > 0.2) { joueur.risquePrison = Math.max(0, joueur.risquePrison - 15); return "Nouvelle planque sécurisée et plaques changées (Risque -15%)."; } else { return "Déménagement effectué mais les frais annexes ont été exorbitants."; } } else { joueur.risquePrison += 25; return "Fonds insuffisants pour déménager. L'étau se resserre (Risque +25%)."; } } },
                { txt: "Tendre une embuscade au messager", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 3; return "L'espion est intercepté et vous livre le nom de son commanditaire (Crainte +3)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Le guet-apens échoue et votre couverture locale est grillée (Mental -2)."; } } },
                { txt: "Faire le choix d'ignorer la provocation", action: () => { if (Math.random() > 0.5) { joueur.mental = Math.min(10, joueur.mental + 1); return "C'était un coup de bluff. Rien ne se produit (Mental +1)."; } else { joueur.risquePrison += 20; return "Les surveillances policières se multiplient autour du bâtiment (Risque +20%)."; } } }
            ] 
        },
        { 
            titre: "L'interrogatoire impromptu", desc: "Un commissaire de police en civil prend place en face de vous sur une terrasse.", 
            choix: [
                { txt: "Maintenir un calme absolu et soutenir le regard", action: () => { let score = joueur.mental + Math.floor(Math.random() * 6); if (score >= 7) { joueur.heat = Math.max(0, joueur.heat - 10); return "Votre flegme le déroute totalement. Il quitte la table sans preuves (Tension -10%)."; } else { joueur.risquePrison += 20; return "Vos hésitations trahissent votre nervosité. Il ordonne une filature (Risque +20%)."; } } },
                { txt: "Tenter de l'embrouiller avec une fausse identité commerciale", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7) { joueur.respect += 1; return "Vos faux papiers et votre bagout commercial le convainquent (Respect +1)."; } else { joueur.heat += 20; return "Le commissaire repère les failles de votre histoire immédiatement (Tension +20%)."; } } },
                { txt: "Quitter les lieux abruptement en l'insultant", action: () => { if (Math.random() > 0.4) { joueur.crainte += 1; return "Votre agressivité soudaine le fige le temps que vous disparaissiez (Crainte +1)."; } else { joueur.heat += 20; joueur.risquePrison += 10; return "Il alerte ses collègues en patrouille pour vous intercepter (Tension +20%, Risque +10%)."; } } }
            ] 
        },
        { 
            titre: "Le vieux complice", desc: "Un ancien associé fraîchement sorti de détention réclame sa part oubliée.", 
            choix: [
                { txt: "Régler la dette immédiatement", action: () => { if (joueur.argent >= 15000) { joueur.argent -= 15000; joueur.argentPerdu += 15000; if (Math.random() > 0.3) { joueur.respect += 2; return "Votre parole d'honneur est respectée. Le milieu salue le geste (Respect +2)."; } else { return "Il prend l'argent sans un mot de remerciement."; } } else { joueur.risquePrison += 15; return "Incapable de payer, il menace d'aller voir les autorités (Risque +15%)."; } } },
                { txt: "Lui proposer une place sur la prochaine opération", action: () => { if (Math.random() > 0.4) { return "Il accepte le partenariat avec enthousiasme."; } else { joueur.respect = Math.max(0, joueur.respect - 1); return "Il refuse l'offre et vous accuse de vouloir l'exploiter (Respect -1)."; } } },
                { txt: "L'éconduire violemment et lui interdire le secteur", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 2; return "Battu à plate couture, il quitte la ville sans insister (Crainte +2)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "L'affrontement tourne à son avantage devant vos recrues (Mental -2)."; } } }
            ] 
        },
        { 
            titre: "L'agent des télécoms", desc: "Un technicien réseau découvre par hasard un concentrateur pirate sur votre ligne.", 
            choix: [
                { txt: "Le corrompre pour falsifier son rapport d'intervention", action: () => { if (joueur.argent >= 8000) { joueur.argent -= 8000; joueur.argentPerdu += 8000; if (Math.random() > 0.2) { return "Le rapport mentionne un simple défaut de ligne. Incident clos."; } else { joueur.heat += 5; return "Il accepte l'argent mais exige des versements récurrents (Tension +5%)."; } } else { joueur.risquePrison += 20; return "Sans fonds, le technicien envoie son rapport d'intrusion au parquet (Risque +20%)."; } } },
                { txt: "Pirater sa tablette pour effacer l'anomalie enregistrée", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7) { return "Les données de diagnostic sont corrompues à distance avec succès."; } else { joueur.heat += 15; return "L'intrusion logicielle alerte le service de sécurité de l'opérateur (Tension +15%)."; } } },
                { txt: "Séquestrer l'agent et confisquer son matériel", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 2; joueur.moralite = Math.max(0, joueur.moralite - 2); return "Terrifié, il s'engage sous la contrainte à démissionner (Crainte +2, Moralité -2)."; } else { joueur.heat += 20; return "Il parvient à déclencher son alarme de détresse professionnelle (Tension +20%)."; } } }
            ] 
        },
        { 
            titre: "La cargaison sans maître", desc: "Une camionnette accidentée contenant des caisses scellées est abandonnée près de chez vous.", 
            choix: [
                { txt: "Forcer les scellés et piller le chargement", action: () => { if (Math.random() > 0.4) { joueur.argent += 25000; joueur.argentGagne += 25000; joueur.risquePrison += 15; return "Cargaison de luxe récupérée (+25 000 €, Risque +15%)."; } else { joueur.heat += 20; return "Le transporteur était surveillé par la brigade des douanes (Tension +20%)."; } } },
                { txt: "Contacter un receleur pour évacuer le camion à cinquante-cinquante", action: () => { if (Math.random() > 0.3) { joueur.argent += 12000; joueur.argentGagne += 12000; joueur.respect += 2; return "Opération propre. Votre receleur écoule le lot et partage les gains (+12 000 €, Respect +2)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le receleur disparaît avec l'intégralité de la marchandise (Mental -1)."; } } },
                { txt: "Ne pas toucher au véhicule et s'éloigner", action: () => { if (Math.random() > 0.5) { return "Une équipe de nettoyeurs rivaux récupère le véhicule sans incident."; } else { joueur.heat += 5; return "La police quadrille le quartier pour inspecter le véhicule suspect (Tension +5%)."; } } }
            ] 
        },
        { 
            titre: "L'avocat d'affaires", desc: "Un juriste influent propose de faire disparaître une ancienne déposition vous concernant.", 
            choix: [
                { txt: "Régler l'intégralité de ses honoraires occultes", action: () => { if (joueur.argent >= 20000) { joueur.argent -= 20000; joueur.argentPerdu += 20000; if (Math.random() > 0.2) { joueur.risquePrison = Math.max(0, joueur.risquePrison - 20); return "Le dossier d'instruction est détruit pour vice de forme (Risque -20%)."; } else { return "Le greffe traîne des pieds mais la procédure est ralentie."; } } else { joueur.risquePrison += 10; return "Faute de paiement, l'avocat transmet le dossier au magistrat (Risque +10%)."; } } },
                { txt: "Négocier ses tarifs en échange d'informations financières", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 7 && joueur.argent >= 10000) { joueur.argent -= 10000; joueur.argentPerdu += 10000; joueur.risquePrison = Math.max(0, joueur.risquePrison - 15); return "Accord conclu à moitié prix grâce à vos tuyaux financiers (Risque -15%)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "L'avocat rejette vos propositions et rompt le contact (Mental -1)."; } } },
                { txt: "Refuser l'offre et couper les communications", action: () => { if (Math.random() > 0.5) { return "L'avocat abandonne la piste sans donner suite."; } else { joueur.heat += 10; return "Il revend l'information à un cabinet rival (Tension +10%)."; } } }
            ] 
        },
        { 
            titre: "Le receleur gourmand", desc: "Votre intermédiaire financier exige une commission supplémentaire sous peine de blocage.", 
            choix: [
                { txt: "Accepter la hausse de commission sans négocier", action: () => { let part = Math.floor(joueur.argent * 0.15); joueur.argent -= part; joueur.argentPerdu += part; if (Math.random() > 0.3) { return `Vous cédez ${part.toLocaleString()} € pour maintenir vos canaux d'écoulement.`; } else { joueur.respect = Math.max(0, joueur.respect - 1); return `Le receleur empoche vos ${part.toLocaleString()} € et se montre arrogant (Respect -1).`; } } },
                { txt: "Démontrer comptablement les failles de ses exigences", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 8) { return "Vos arguments financiers le contraignent à respecter les tarifs initiaux."; } else { joueur.respect = Math.max(0, joueur.respect - 2); return "Il rejette vos calculs et boycotte temporairement vos cargaisons (Respect -2)."; } } },
                { txt: "Lui rappeler les conséquences physiques d'une trahison", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 8) { joueur.crainte += 2; return "Un avertissement musclé le ramène à la raison sans délai (Crainte +2)."; } else { joueur.heat += 15; return "La confrontation dégénère et il coupe définitivement les ponts (Tension +15%)."; } } }
            ] 
        },
        { 
            titre: "L'ancien complice évincé", desc: "Une recrue récemment renvoyée cherche à vous faire chanter.", 
            choix: [
                { txt: "Lui verser une prime de séparation", action: () => { if (joueur.argent >= 10000) { joueur.argent -= 10000; joueur.argentPerdu += 10000; if (Math.random() > 0.3) { joueur.respect += 1; return "Il prend la somme et quitte la région (Respect +1)."; } else { return "L'argent est empoché mais la rancune demeure."; } } else { joueur.risquePrison += 15; return "Faute de moyens, il commence à contacter des officiers de police (Risque +15%)."; } } },
                { txt: "Lui imposer le silence par la force", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 2; return "Une démonstration de force suffit à lui faire passer le message (Crainte +2)."; } else { joueur.heat += 20; return "La bagarre éclate sur la voie publique et attire des témoins (Tension +20%)."; } } },
                { txt: "Changer d'adresse pour couper tout contact", action: () => { joueur.mois += 1; if (Math.random() > 0.4) { return "Vous vous installez ailleurs et semez définitivement sa trace."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le déménagement précipité désorganise vos affaires (Mental -1)."; } } }
            ] 
        }
    ],
    complique: [
        { 
            titre: "L'infiltration d'un indic", desc: "Une recrue prometteuse semble entretenir des liens troubles avec les autorités.", 
            choix: [
                { txt: "Mener un interrogatoire psychologique poussé", action: () => { let score = joueur.mental + Math.floor(Math.random() * 6); if (score >= 8) { joueur.respect += 5; return "L'espion craque sous la pression et avoue sa mission d'infiltration (Respect +5)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Il retourne vos questions contre vous et sème le doute dans l'équipe (Mental -2)."; } } },
                { txt: "Lui transmettre de faux plans d'opération", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 8) { joueur.heat = Math.max(0, joueur.heat - 20); return "La police se déploie en masse sur une fausse cible (Tension -20%)."; } else { joueur.risquePrison += 20; return "Il détecte le piège et transmet vos véritables coordonnées (Risque +20%)."; } } },
                { txt: "L'éliminer froidement à titre préventif", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 8) { joueur.crainte += 5; joueur.moralite = Math.max(0, joueur.moralite - 4); return "Disparition immédiate. Personne dans le réseau n'osera parler (Crainte +5, Moralité -4)."; } else { joueur.heat += 30; joueur.moralite = Math.max(0, joueur.moralite - 4); return "L'élimination échoue et l'indic s'échappe sous protection policière (Tension +30%)."; } } }
            ] 
        },
        { 
            titre: "Le consortium cybercriminel", desc: "Un groupe de pirates informatiques sollicite vos serveurs pour une attaque d'ampleur.", 
            choix: [
                { txt: "Mettre à disposition vos réseaux sécurisés", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 9) { joueur.argent += 150000; joueur.argentGagne += 150000; return "Opération financière massive. Vous touchez 150 000 € de commission nette."; } else { joueur.risquePrison += 35; return "Les serveurs sont saisis par les services fédéraux de lutte contre la cybercriminalité (Risque +35%)."; } } },
                { txt: "Revendre les informations de l'attaque aux banques ciblées", action: () => { if (Math.random() > 0.4) { joueur.argent += 50000; joueur.argentGagne += 50000; joueur.respect = Math.max(0, joueur.respect - 5); return "Prime de sécurité touchée, mais le milieu vous tourne le dos (+50 000 €, Respect -5)."; } else { joueur.crainte = Math.max(0, joueur.crainte - 3); joueur.heat += 15; return "Les hackers découvrent votre trahison et publient vos données personnelles (Tension +15%)."; } } },
                { txt: "Refuser fermement toute implication", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Vous évitez un scandale d'État et préservez vos opérations (Mental +1)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Le consortium vous lance des attaques par déni de service de représailles (Mental -1)."; } } }
            ] 
        },
        { 
            titre: "Le piège fédéral", desc: "Une proposition de braquage particulièrement lucrative présente toutes les marques d'un guet-apens.", 
            choix: [
                { txt: "Analyser minutieusement les données de la cible", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 9) { joueur.respect += 5; return "Vous mettez au jour les faux certificats du FBI et évitez le piège (Respect +5)."; } else { allerEnPrison("Guet-apens fédéral confirmé lors de la phase d'approche."); return "Les unités d'intervention vous cernent immédiatement."; } } },
                { txt: "Sous-traiter le coup à une équipe concurrente", action: () => { if (joueur.argent >= 30000) { joueur.argent -= 30000; joueur.argentPerdu += 30000; if (Math.random() > 0.2) { joueur.heat = Math.max(0, joueur.heat - 30); return "L'équipe concurrente tombe dans le piège à votre place (Tension -30%)."; } else { return "L'équipe concurrente se méfie et refuse la proposition."; } } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Fonds insuffisants pour monter l'opération de diversion (Mental -1)."; } } },
                { txt: "Classer l'affaire et doubler la sécurité de la planque", action: () => { if (Math.random() > 0.3) { joueur.mental = Math.min(10, joueur.mental + 1); return "La prudence vous évite une arrestation certaine (Mental +1)."; } else { joueur.risquePrison += 10; return "Des véhicules de surveillance banalisés patrouillent dans votre secteur (Risque +10%)."; } } }
            ] 
        },
        { 
            titre: "La fusillade nocturne", desc: "Des règlements de comptes violents éclatent au pied de votre immeuble.", 
            choix: [
                { txt: "Prendre les armes pour repousser les assaillants", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 9) { joueur.crainte += 5; return "Votre riposte violente met en déroute les tireurs (Crainte +5)."; } else { joueur.mental = Math.max(1, joueur.mental - 3); joueur.risquePrison += 20; return "Touché lors des échanges de tirs, vous devez vous soigner dans l'urgence (Mental -3, Risque +20%)."; } } },
                { txt: "S'exfiltrer par les toits de la ville", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 9) { return "Vous quittez le périmètre sans être repéré par le cordon policier."; } else { joueur.risquePrison += 30; return "Un projecteur d'hélicoptère accroche votre silhouette sur les toits (Risque +30%)."; } } },
                { txt: "Rester retranché en silence", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.max(1, joueur.mental - 1); return "Les tirs cessent avec l'arrivée des renforts de police."; } else { joueur.mental = Math.max(1, joueur.mental - 2); joueur.heat += 15; return "Des tirs de sommation perforent vos cloisons (Mental -2, Tension +15%)."; } } }
            ] 
        },
        { 
            titre: "L'ultimatum du parrain", desc: "Le syndicat du crime local exige un tiers de vos liquidités sous menace directe.", 
            choix: [
                { txt: "Verser le tribut exigé pour préserver la paix", action: () => { let taxe = Math.floor(joueur.argent * 0.3); joueur.argent -= taxe; joueur.argentPerdu += taxe; if (Math.random() > 0.3) { return `Vous versez ${taxe.toLocaleString()} € pour maintenir vos affaires à flot.`; } else { joueur.respect = Math.max(0, joueur.respect - 2); return `Le syndicat encaisse vos ${taxe.toLocaleString()} € et réclame déjà davantage (Respect -2).`; } } },
                { txt: "Lancer une opération pour éliminer leur chef", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 10) { joueur.respect += 10; joueur.crainte += 10; return "Le chef du syndicat est abattu. Vous prenez le contrôle de la place (Respect +10, Crainte +10)."; } else { allerEnPrison("L'assaut a échoué. Les hommes du syndicat vous ont livré aux forces de l'ordre."); return "Fin de partie violente."; } } },
                { txt: "Siphonner leurs comptes offshores en représailles", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 9) { joueur.argent += 100000; joueur.argentGagne += 100000; return "Leurs comptes sont siphonnés à votre profit (+100 000 €)."; } else { joueur.mental = Math.max(1, joueur.mental - 4); joueur.heat += 25; return "Leur sécurité informatique bloque l'attaque et localise votre relais (Mental -4, Tension +25%)."; } } }
            ] 
        },
        { 
            titre: "L'avis de perquisition", desc: "Une source fiable vous avertit qu'un raid tactique est prévu à l'aube sur votre planque.", 
            choix: [
                { txt: "Incendier les archives et s'évacuer immédiatement", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 8) { return "Toutes les preuves partent en fumée avant l'arrivée du raid."; } else { joueur.risquePrison += 35; return "L'incendie prématuré attire les patrouilles avant votre départ (Risque +35%)."; } } },
                { txt: "Faire appel à des nettoyeurs professionnels", action: () => { if (joueur.argent >= 40000) { joueur.argent -= 40000; joueur.argentPerdu += 40000; if (Math.random() > 0.2) { joueur.niveauSurveillance = 0; return "Les nettoyeurs stérilisent le lieu. Le raid ne trouve absolument rien."; } else { return "Le lieu est nettoyé mais les nettoyeurs ont gardé des copies d'assurance."; } } else { allerEnPrison("Fonds insuffisants pour payer les nettoyeurs. Pris au saut du lit par le SWAT."); return "Arrestation musclée."; } } },
                { txt: "Préparer un dossier de vice de procédure avec vos juristes", action: () => { let score = joueur.stats.intel + Math.floor(Math.random() * 6); if (score >= 8) { joueur.risquePrison = 0; return "Le mandat est annulé par le juge d'instruction avant l'assaut."; } else { allerEnPrison("Le vice de forme est rejeté. Vous êtes appréhendé sans délai."); return "Direction la maison d'arrêt."; } } }
            ] 
        },
        { 
            titre: "La prise d'otage", desc: "Un cartel rival a capturé votre contact principal et réclame rançon.", 
            choix: [
                { txt: "Payer la rançon demandée", action: () => { if (joueur.argent >= 50000) { joueur.argent -= 50000; joueur.argentPerdu += 50000; if (Math.random() > 0.2) { joueur.respect += 2; return "Votre contact est libéré sain et sauf (Respect +2)."; } else { return "Le contact est libéré mais reste profondément marqué psychologiquement."; } } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Fonds insuffisants. Vous apprenez son exécution le lendemain (Mental -2)."; } } },
                { txt: "Lancer un raid armé pour le libérer", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 9) { joueur.crainte += 5; joueur.moralite = Math.max(0, joueur.moralite - 2); return "L'assaut fait des ravages mais l'otage est extrait vivant (Crainte +5)."; } else { joueur.mental = Math.max(1, joueur.mental - 4); return "L'opération échoue et l'otage périt sous les tirs croisés (Mental -4)."; } } },
                { txt: "Refuser toute négociation publiquement", action: () => { let score = joueur.mental + Math.floor(Math.random() * 6); if (score >= 8) { joueur.crainte += 5; joueur.moralite = Math.max(0, joueur.moralite - 3); return "Votre détermination sans faille impressionne le cartel qui relâche l'otage sans conditions (Crainte +5)."; } else { joueur.mental = Math.max(1, joueur.mental - 3); joueur.moralite = Math.max(0, joueur.moralite - 3); return "Le cartel exécute l'otage et la culpabilité vous hante (Mental -3, Moralité -3)."; } } }
            ] 
        },
        { 
            titre: "Les coupures tracées", desc: "Le produit de votre dernier coup comporte des traceurs de la banque centrale.", 
            choix: [
                { txt: "Faire appel à un circuit de blanchiment express", action: () => { if (joueur.argent >= 15000) { joueur.argent -= 15000; joueur.argentPerdu += 15000; if (Math.random() > 0.2) { return "Les coupures sont remplacées par des devises étrangères propres."; } else { joueur.heat += 10; return "Le blanchisseur a pris une commission exorbitante sur l'échange (Tension +10%)."; } } else { allerEnPrison("Interpellé en tentant d'écouler les coupures marquées."); return "Menottes immédiates."; } } },
                { txt: "Détruire la totalité des liasses suspectes", action: () => { let part = Math.floor(joueur.argent * 0.2); joueur.argent -= part; joueur.argentPerdu += part; if (Math.random() > 0.3) { joueur.moralite = Math.max(0, joueur.moralite - 1); return `Vous réduisez en cendres ${part.toLocaleString()} € pour couper court à toute enquête.`; } else { joueur.mental = Math.max(1, joueur.mental - 1); return `La destruction de ${part.toLocaleString()} € affecte lourdement votre moral (Mental -1).`; } } },
                { txt: "Tenter d'écouler les billets malgré le risque", action: () => { if (Math.random() > 0.6) { return "Les commerçants ne remarquent aucune anomalie sur les billets."; } else { joueur.risquePrison += 25; return "Plusieurs commerces signalent les numéros de série à la banque de France (Risque +25%)."; } } }
            ] 
        }
    ],
    prison: [
        { 
            titre: "Affrontement aux douches", desc: "Un groupe de détenus hostiles bloque la sortie des vestiaires.", 
            choix: [
                { txt: "Prendre l'initiative et frapper en premier", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 7) { joueur.crainte += 3; return "Vous mettez leur meneur hors de combat devant les surveillants (Crainte +3)."; } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Submergé par le nombre, vous vous réveillez à l'infirmerie (Mental -2)."; } } },
                { txt: "Esquiver le groupe et alerter discrètement la garde", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 6) { return "Vous vous extirpez du piège sans essuyer le moindre coup."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "Rattrapé près de la grille, vous encaissez plusieurs coups (Mental -1)."; } } },
                { txt: "Acheter la protection des caïds du pavillon", action: () => { if (joueur.argent >= 5000) { joueur.argent -= 5000; joueur.argentPerdu += 5000; if (Math.random() > 0.2) { return "Les caïds interviennent et dispersent le groupe immédiatement."; } else { return "Votre argent est pris mais vos protecteurs restent distants."; } } else { joueur.mental = Math.max(1, joueur.mental - 2); return "Sans argent pour payer la taxe, l'agression est inévitable (Mental -2)."; } } }
            ] 
        },
        { 
            titre: "Le trafic de coursive", desc: "Un surveillant propose d'introduire du matériel prohibé dans votre cellule.", 
            choix: [
                { txt: "Acheter un terminal mobile crypté", action: () => { if (joueur.argent >= 8000) { joueur.argent -= 8000; joueur.argentPerdu += 8000; if (Math.random() > 0.2) { joueur.stats.intel += 1; return "Le terminal vous permet de piloter vos réseaux extérieurs (+1 Intel)."; } else { return "Le téléphone fonctionne par intermittence mais reste utile."; } } else { return "Fonds insuffisants pour conclure la transaction."; } } },
                { txt: "Acquérir des stéroïdes et du matériel d'entraînement", action: () => { if (joueur.argent >= 5000) { joueur.argent -= 5000; joueur.argentPerdu += 5000; if (Math.random() > 0.2) { joueur.stats.force += 1; return "Programme d'entraînement intensif en cellule (+1 Force)."; } else { return "Produits de qualité médiocre mais l'exercice physique porte ses fruits."; } } else { return "Fonds insuffisants pour acquérir le lot."; } } },
                { txt: "Rejeter la proposition et garder un profil bas", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Votre discipline exemplaire vous évite toute fouille inopinée (Mental +1)."; } else { return "Le surveillant s'éloigne sans insister."; } } }
            ] 
        },
        { 
            titre: "Le creusement d'un tunnel", desc: "Des codétenus vous proposent de rejoindre une tentative d'évasion par les sous-sols.", 
            choix: [
                { txt: "Prendre part à la tentative d'évasion nocturne", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 8) { joueur.peineActuelle = 0; return "Vous franchissez le périmètre extérieur sans alerter les miradors ! Liberté retrouvée."; } else { joueur.peineActuelle += 3; return "Interpellé dans les conduites d'évacuation (+3 ans de peine ferme)."; } } },
                { txt: "Révéler le plan à l'administration pénitentiaire", action: () => { if (Math.random() > 0.3) { joueur.peineActuelle = Math.max(1, joueur.peineActuelle - 2); joueur.respect = Math.max(0, joueur.respect - 5); return "Remise de peine accordée par la direction (-2 ans, Respect -5)."; } else { joueur.respect = Math.max(0, joueur.respect - 5); return "La direction prend note sans réduire votre peine (Respect -5)."; } } },
                { txt: "Garder le secret sans prendre part aux travaux", action: () => { if (Math.random() > 0.5) { return "La tentative échoue pour vos codétenus sans que vous ne soyez inquiété."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "L'ensemble du bâtiment est consigné en cellule après l'incident (Mental -1)."; } } }
            ] 
        },
        { 
            titre: "La mutinerie du bloc B", desc: "Une émeute généralisée éclate lors de la fermeture des cellules.", 
            choix: [
                { txt: "Prendre la direction du mouvement d'insoumission", action: () => { let score = joueur.stats.force + Math.floor(Math.random() * 6); if (score >= 8) { joueur.respect += 5; joueur.crainte += 5; return "Vous imposez vos conditions aux équipes d'intervention (Respect +5, Crainte +5)."; } else { joueur.peineActuelle += 2; joueur.mental = Math.max(1, joueur.mental - 2); return "La brigade d'intervention reprend le contrôle par la force (+2 ans de peine, Mental -2)."; } } },
                { txt: "Se barricader dans sa cellule", action: () => { if (Math.random() > 0.4) { joueur.mental = Math.min(10, joueur.mental + 1); return "Vous évitez les gaz lacrymogènes et les sanctions collectives (Mental +1)."; } else { joueur.mental = Math.max(1, joueur.mental - 1); return "La porte cède sous les assauts des mutins mais vous restez indemne (Mental -1)."; } } },
                { txt: "Profiter du chaos pour piller le bureau du greffe", action: () => { let score = joueur.stats.furtivite + Math.floor(Math.random() * 6); if (score >= 8) { joueur.argent += 20000; joueur.argentGagne += 20000; return "Vous récupérez 20 000 € de valeurs saisies dans le coffre du greffe."; } else { joueur.peineActuelle += 1; return "Surpris par les caméras de secours du greffe (+1 an de peine)."; } } }
            ] 
        },
        { 
            titre: "L'avis de transfert disciplinaire", desc: "La direction pénitentiaire ordonne votre transfert vers une maison centrale ultra-sécurisée.", 
            choix: [
                { txt: "Soudoyer le directeur adjoint", action: () => { if (joueur.argent >= 30000) { joueur.argent -= 30000; joueur.argentPerdu += 30000; if (Math.random() > 0.2) { return "Votre dossier est reclassé. Le transfert est annulé."; } else { return "Le transfert est reporté de quelques mois seulement."; } } else { joueur.crainte += 2; return "Fonds insuffisants. Vous partez sous escorte lourde (Crainte +2)."; } } },
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
    risquePrison: 0, enPrison: false, niveauSurveillance: 0,
    heat: 0, 
    braquagesReussis: 0, cptLarcin: 0,
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
let eventsRestantsAfaire = 0; 

// --- NAVIGATION ET UI ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    let statsBar = document.getElementById('global-stats');
    if(['screen-start', 'screen-milieu', 'screen-classe', 'screen-ville', 'screen-story', 'screen-end', 'screen-event', 'screen-debrief'].includes(screenId)) {
        statsBar.style.display = 'none';
    } else {
        statsBar.style.display = 'grid';
        updateStats();
    }
    document.getElementById('msg-arbre').style.display = 'none'; 
}

function updateStats() {
    let enTaule = joueur.enPrison;
    let texteSurveillance = joueur.niveauSurveillance > 0
        ? `<div class="stat-flag">👁️ Fiché — Malus : -${joueur.niveauSurveillance * 10}%</div>`
        : "";

    document.getElementById('global-stats').innerHTML = `
        <div class="stat-id">
            <span class="stat-id-item">👤 <strong>${joueur.age} ans</strong><span class="stat-sub">(mois ${joueur.mois})</span></span>
            <span class="stat-id-item stat-id-money">💰 <strong>${joueur.argent.toLocaleString()} €</strong></span>
        </div>

        <div class="stat-grid">
            <div class="stat-cell"><span class="stat-label">💪 Force</span><span class="stat-value">${joueur.stats.force}</span></div>
            <div class="stat-cell"><span class="stat-label">👑 Respect</span><span class="stat-value">${joueur.respect}</span></div>
            <div class="stat-cell"><span class="stat-label">🧠 Intel</span><span class="stat-value">${joueur.stats.intel}</span></div>
            <div class="stat-cell"><span class="stat-label">💀 Crainte</span><span class="stat-value">${joueur.crainte}</span></div>
            <div class="stat-cell"><span class="stat-label">🥷 Furtivité</span><span class="stat-value">${joueur.stats.furtivite}</span></div>
            <div class="stat-cell"><span class="stat-label">🧠 Mental</span><span class="stat-value">${joueur.mental}/10</span></div>
        </div>

        <div class="stat-gauges">
            <div class="stat-gauge"><span class="stat-label">⚖️ Moralité</span><span class="stat-value">${joueur.moralite}/10</span></div>
            <div class="stat-gauge"><span class="stat-label">🔥 Heat</span><span class="stat-value heat-text">${joueur.heat}%</span></div>
        </div>

        <div class="stat-risk ${enTaule ? 'stat-risk--jailed' : ''}">
            🚨 Risque Global : ${enTaule ? 'EN TAULE' : joueur.risquePrison + '%'}
        </div>

        ${texteSurveillance}
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
    joueur.mois += 1;
    if(joueur.mois >= 12) { joueur.age++; joueur.mois -= 12; }
    joueur.cptLarcin++; 
    
    let butin = Math.floor(Math.random() * 1500) + 500;
    let risqueFichage = joueur.cptLarcin * 15; 
    
    updateStats(); // Mise à jour immédiate de l'âge/mois
    
    if (Math.random() * 100 < 90) { 
        joueur.argent += butin;
        joueur.argentGagne += butin;
        
        let msg = `Vous avez fait les poches d'un passant ou braqué une petite caisse. Butin : ${butin}€.`;
        
        if (Math.random() * 100 < risqueFichage) {
            joueur.niveauSurveillance++;
            msg += `\n\nCependant, une caméra vous a grillé en pleine action. La police vous a mis dans ses registres ! (Surveillance +1).`;
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
    joueur.mois += 6;
    if(joueur.mois >= 12) { joueur.age++; joueur.mois -= 12; }
    joueur.heat = Math.max(0, joueur.heat - 30);
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

function prochaineEtapeEvenement() {
    if(eventsRestantsAfaire <= 0) {
        if(modePrison) { purgerPeine(); } 
        else { genererMissionsHub(); showScreen('screen-hub'); }
        return;
    }
    eventsRestantsAfaire--;

    let cat = modePrison ? "prison" : (joueur.heat > 50 || joueur.niveauSurveillance > 1 ? (Math.random() > 0.4 ? "complique" : "moyen") : (joueur.heat > 20 ? (Math.random() > 0.5 ? "moyen" : "simple") : "simple"));
    let liste = banqueEvenements[cat];
    let ev = liste[Math.floor(Math.random() * liste.length)];

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

function allerEnPrison(raison) {
    joueur.enPrison = true;
    modePrison = true;
    let annees = Math.floor(Math.random() * 4) + 2 + Math.floor(joueur.risquePrison / 15);
    if (joueur.originType === 'Riche') annees = Math.max(1, annees - 2);
    if (joueur.crainte > 10) { annees += 2; joueur.mental = Math.max(1, joueur.mental - 3); }
    joueur.peineActuelle = annees;
    
    let cashNonBlanchi = Math.max(0, joueur.argent - joueur.cashBlanchi);
    let amendeBase = annees * 15000;
    let montantSaisi = Math.min(cashNonBlanchi, amendeBase);
    
    joueur.argent -= montantSaisi;
    joueur.argentPerdu += montantSaisi;

    let texteDecouvert = joueur.argent < 0 ? ` Vous êtes à DÉCOUVERT de ${Math.abs(joueur.argent).toLocaleString()} € !` : "";
    let texteArgent = `L'État a saisi ${montantSaisi.toLocaleString()} € sur vos fonds non blanchis.${texteDecouvert} Vos ${joueur.cashBlanchi.toLocaleString()} € blanchis sont intouchables.`;
    
    document.getElementById('prison-text').innerText = `${raison} Verdict : ${annees} ans fermes.\n\n${texteArgent}`;
    
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
    joueur.age += joueur.peineActuelle;
    joueur.risquePrison = 0; 
    joueur.heat = 0; 
    joueur.enPrison = false;
    joueur.cptLarcin = 0;
    joueur.niveauSurveillance += 1; // La prison fiche automatiquement le joueur
    joueur.mental = Math.min(10, joueur.mental + 2); 

    if (joueur.age >= 65) {
        afficherEcranFin("Mort en Cellule", `Vous vous éteignez en prison à l'âge de ${joueur.age} ans.`);
    } else {
        notify(`Libéré. Attention : vous êtes désormais fiché. Vos prochains casses subiront un malus.`);
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
            <li><strong>Profil :</strong> Milieu ${joueur.milieu} | <strong>Classe :</strong> ${joueur.classe}</li>
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

function ouvrirBoutique() {
    let html = "";
    let types = [...new Set(catalogue.map(item => item.type))];
    
    types.forEach(type => {
        html += `<h3 style="color:#bd9245; border-bottom:1px solid #2b323c; padding-bottom:5px;">${type}</h3>`;
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
        html += `<h3 style="color:#8fb4d1">Votre Équipe Actuelle</h3>`;
                joueur.equipe.forEach((eq, index) => {
            html += `<div style="background:#0a0c10; padding:10px; margin-bottom:10px; border:1px solid #2b323c; border-radius:4px;">
                <strong>${eq.nom}</strong> (Spé: ${eq.role})<br>
                <div style="display:flex; gap:10px; margin-top:8px;">
                    <button class="btn-choix" style="padding:8px; margin:0; flex:1;" onclick="virerRecrue(${index})">Virer</button>
                    <button class="btn-action" style="padding:8px; border-radius:6px; border:none; cursor:pointer; flex:1; font-weight:bold;" onclick="executerRecrue(${index})">Exécuter</button>
                </div>
            </div>`;
        });
        html += `<hr style="border-color:#2b323c">`;
    }

    html += `<h3 style="color:#4f9967">À Embaucher</h3>`;
    recruesDispo.forEach(r => {
        let dejaEquipe = joueur.equipe.find(e => e.id === r.id);
        if(!dejaEquipe) {
            let coutReel = Math.max(2000, r.cout - (joueur.respect * 500));
            let peutPayer = joueur.argent >= coutReel;
            html += `<div style="background:#1d232b; padding:10px; margin-bottom:10px; border:1px solid #2b323c; border-radius:4px;">
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
    let r = joueur.equipe.splice(index, 1)[0];
    joueur.moralite = Math.max(0, joueur.moralite - 1);
    notify(`${r.nom} a été renvoyé de l'équipe.`);
    updateStats();
    ouvrirRecrutement();
    genererMissionsHub();
}

function executerRecrue(index) {
    let r = joueur.equipe.splice(index, 1)[0];
    joueur.moralite = Math.max(0, joueur.moralite - 5);
    joueur.crainte += 5;
    joueur.respect = Math.max(0, joueur.respect - 2);
    notify(`Vous avez abattu ${r.nom} froidement. L'équipe est terrifiée.`);
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
        msgBox.style.background = '#3d7a52';
        msgBox.innerText = `Succès ! +${joueur.buffs[stat]}% de bonus en ${stat}.`;
        document.getElementById('pts-comp').innerText = joueur.pointsCompetence;
        updateStats();
        genererMissionsHub(); 
    } else {
        msgBox.style.display = 'block';
        msgBox.style.background = '#a4453a';
        msgBox.innerText = "Pas de Points de Compétence (PC).";
    }
}

// --- BRAQUAGES, CONDITIONS DE COMPÉTENCES ET STORYTELLING ---
function estimerReussite(diff, typeStat) {
    let statVal = joueur.stats[typeStat];
    let bonusEq = joueur.equipe.reduce((acc, curr) => acc + (curr.role === typeStat ? curr.bonus : 0), 0);
    
    let score = statVal + bonusEq - joueur.niveauSurveillance;
    let malusMental = (10 - joueur.mental) * 2;
    
    let proba = 50 + (score - diff) * 10 - malusMental;
    proba -= Math.floor(joueur.heat / 2); 
    
    if(typeStat === 'furtivite' && statVal < 5) proba -= 25;
    
    if(proba > 95) return 95;
    if(proba < 5) return 5;
    return Math.floor(proba);
}

function genererMissionsHub() {
    let v = monde[joueur.ville];
    let cF = v.faible[Math.min(indexCible.faible, v.faible.length - 1)];
    let cM = v.modere[Math.min(indexCible.modere, v.modere.length - 1)];
    let cE = v.eleve[Math.min(indexCible.eleve, v.eleve.length - 1)];

    let getTx = (diff) => Math.max(estimerReussite(diff, 'furtivite'), estimerReussite(diff, 'intel'), estimerReussite(diff, 'force'));

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
    `;
}

let contexteCasse = { blesseFlics: 0, mortFlics: 0, blesseCivils: 0, mortCivils: 0, flicsPresents: false, texteAction: "" };

function preparerCasse(niveau, diff, butin, nom, desc) {
    cibleActuelle = { niveau: niveau, nom: nom, diff: diff, butin: butin, desc: desc };
    document.getElementById('prep-desc').innerText = `Repérage : ${desc}`;
    document.getElementById('prep-butin').innerText = butin.toLocaleString();
    showScreen('screen-prep');
}

function validerPrep() {
    document.getElementById('action-title').innerText = cibleActuelle.nom;
    
    let reqHacking = cibleActuelle.niveau === 'faible' ? 5 : (cibleActuelle.niveau === 'modere' ? 10 : 15);
    let disabledIntel = joueur.stats.intel < reqHacking ? `disabled` : ``;
    let texteIntel = joueur.stats.intel < reqHacking ? `🧠 Approche Cyber (Requis : ${reqHacking} Intel)` : `🧠 Approche Cyber`;

    document.getElementById('action-choices').innerHTML = `
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
        if (Math.random() > 0.7) {
            contexteCasse.texteAction = "Le pare-feu contre-attaque ! Les portes se verrouillent et le réseau s'affole. La police est en route, il faut forcer le système.";
            contexteCasse.flicsPresents = true;
        } else {
            contexteCasse.texteAction = "Vous bouclez les caméras. Votre équipe entre, déguisée en techniciens de maintenance.";
        }
    }

    document.getElementById('action-title').innerText = "Sur les lieux...";
    document.getElementById('action-choices').innerHTML = `
        <p style="background:#1d232b; padding:15px; border-radius:6px; text-align:left; border-left:4px solid #a4453a; line-height:1.5;">${contexteCasse.texteAction}</p>
        <button class="btn-choix btn-action" onclick="resoudreAction('${stat}')">Exécuter le plan</button>
    `;
}

function resoudreAction(stat) {
    joueur.mois += 2; 
    if(joueur.mois >= 12) { joueur.age++; joueur.mois -= 12; }
    
    let estViolent = (stat === 'force');
    if(estViolent) { joueur.moralite = Math.max(0, joueur.moralite - 2); joueur.mental = Math.max(1, joueur.mental - 1); joueur.crainte += 3; } 
    else { joueur.moralite = Math.min(10, joueur.moralite + 1); joueur.respect += 2; }

    let difficulte = cibleActuelle.diff;
    if (joueur.originType === 'Défavorisé') difficulte += 1;
    if (joueur.originType === 'Riche') difficulte -= 1;
    joueur.equipe.forEach(r => { if(r.role === stat) difficulte -= r.bonus; });

    let jet = Math.floor(Math.random() * 10) + 1;
    let scoreFinal = (joueur.stats[stat] + jet) - joueur.niveauSurveillance;
    scoreFinal = scoreFinal * (1 + (joueur.buffs[stat] / 100));

    if(stat === 'furtivite' && joueur.stats.furtivite < 5) scoreFinal -= 3;
    if(joueur.heat > 50) scoreFinal -= 2;

    let reussi = (scoreFinal >= difficulte + 4);
    let mortAllie = 0;
    
    // Conséquences selon le contexte généré
    if(contexteCasse.flicsPresents || !reussi) {
        if(estViolent || !reussi) {
            contexteCasse.blesseFlics = Math.floor(Math.random() * 3);
            if(Math.random() > 0.7) contexteCasse.mortFlics = 1;
            contexteCasse.blesseCivils += Math.floor(Math.random() * 2);
        }
        if(!reussi && Math.random() < 0.15 && joueur.equipe.length > 0) {
            mortAllie = 1; joueur.equipe.pop();
        }
        if(!reussi && Math.random() < 0.03) {
            afficherEcranFin("Mort en Intervention", "La police a ouvert le feu. Vous n'avez pas survécu."); return;
        }
    }

    if (reussi) {
        let partEquipe = cibleActuelle.butin * (0.15 * joueur.equipe.length);
        let butinJoueur = Math.floor(cibleActuelle.butin - partEquipe);
        
        joueur.argent += butinJoueur; joueur.argentGagne += butinJoueur;
        if(joueur.blanchisserie) { joueur.cashBlanchi += Math.floor(butinJoueur * 0.7); }

        joueur.pointsCompetence += 1; joueur.braquagesReussis += 1;
        joueur.heat += 20; 
        if (stat === 'force') joueur.risquePrison += 20;
        indexCible[cibleActuelle.niveau]++; 
        
        afficherDebrief(true, butinJoueur, mortAllie);
    } else {
        afficherDebrief(false, 0, mortAllie);
    }
}

function afficherDebrief(reussi, butin, mortAllie) {
    let msgAmbiance = reussi 
        ? (cibleActuelle.niveau === 'faible' ? "Le braquage s'est déroulé sans accroc majeur, de l'argent de poche facile." : "Un coup magistral qui fera la une des journaux demain.")
        : "Le plan a totalement déraillé. Les forces de l'ordre vous ont pris en tenaille.";

    let html = `
        <h3 style="color:${reussi ? '#4f9967' : '#a4453a'}">${reussi ? 'Coup Réussi avec Succès' : 'Opération Compromise'}</h3>
        <p style="font-style:italic; color:#8a8c7c;">${msgAmbiance}</p>
        <p><strong>Butin net empoché :</strong> ${butin.toLocaleString()} €</p>
        <hr style="border-color:#2b323c">
        <h4>Bilan Humain :</h4>
        <ul style="color:#c8564a;">
            <li>Policiers blessés : ${contexteCasse.blesseFlics} | tués : ${contexteCasse.mortFlics}</li>
            <li>Civils blessés : ${contexteCasse.blesseCivils} | tués : ${contexteCasse.mortCivils}</li>
            <li>Alliés perdus : ${mortAllie}</li>
        </ul>
    `;
    document.getElementById('debrief-content').innerHTML = html;
    
    let btnSuite = document.getElementById('debrief-btn');
    if(!reussi) {
        btnSuite.innerText = "Aller en case prison...";
        btnSuite.onclick = () => { allerEnPrison("Arrêté sur les lieux."); };
    } else {
        btnSuite.innerText = "Gérer les conséquences (Événements)";
        btnSuite.onclick = () => { eventsRestantsAfaire = Math.floor(Math.random() * 3) + 1; prochaineEtapeEvenement(); };
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
    
    let cashNonBlanchi = Math.max(0, joueur.argent - joueur.cashBlanchi);
    let amendeBase = annees * 15000;
    
    let montantSaisi = Math.min(cashNonBlanchi, amendeBase);
    joueur.argent -= montantSaisi;
    joueur.argentPerdu += montantSaisi;

    let texteDecouvert = joueur.argent < 0 ? ` Vous êtes à DÉCOUVERT de ${Math.abs(joueur.argent).toLocaleString()} € !` : "";
    let texteArgent = `L'État a saisi ${montantSaisi.toLocaleString()} € sur vos fonds non blanchis.${texteDecouvert} Vos ${joueur.cashBlanchi.toLocaleString()} € blanchis sont intouchables.`;
    
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
        let description = `Retraite avec ${joueur.argent.toLocaleString()} € (Gagné total : ${joueur.argentGagne.toLocaleString()} € / Perdu : ${joueur.argentPerdu.toLocaleString()} €).`;
        afficherEcranFin(titre, description);
    }
}

function afficherEcranFin(titre, description) {
    let div = document.getElementById('end-text');
    div.innerHTML = `
        <h3 style="color:#c8564a; margin-top:0;">${titre}</h3>
        <p>${description}</p>
        <hr style="border-color:#2b323c; margin: 15px 0;">
        <ul style="list-style-type:none; padding:0; font-size: 14px;">
            <li><strong>Âge final :</strong> ${joueur.age} ans</li>
            <li><strong>Fortune actuelle :</strong> ${joueur.argent.toLocaleString()} €</li>
            <li><strong>Statut :</strong> ${getStatutCriminel()}</li>
        </ul>
    `;
    showScreen('screen-end');
}
