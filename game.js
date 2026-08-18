// --- DONNÉES DU JEU (v0.0.8) ---
const monde = {
    "Paris": {
        faible: [{ nom: "Tabac-Presse", diff: 4, butin: 12000, desc: "La boutique est mal éclairée. Trois clients patientent, le gérant écoute la radio, distrait." }, { nom: "Pharmacie de garde", diff: 5, butin: 15000, desc: "Seule la croix verte éclaire la rue. Le pharmacien est seul, somnolant derrière le comptoir." }],
        modere: [{ nom: "Bijouterie Vendôme", diff: 7, butin: 200000, desc: "L'endroit est luxueux. 4 clients fortunés essaient des parures, gardés par deux vigiles armés." }, { nom: "Fourgon de fonds", diff: 8, butin: 250000, desc: "Le fourgon est à l'arrêt devant une banque. Deux convoyeurs lourdement armés font le transfert." }],
        eleve: [{ nom: "Musée du Louvre", diff: 10, butin: 3500000, desc: "Une forteresse culturelle. Rondes de nuit constantes, lasers croisés et vitrines blindées." }, { nom: "Vente aux enchères", diff: 11, butin: 4500000, desc: "Le tout-Paris est là. Sécurité maximale, caméras biométriques et police en civil dans la salle." }]
    },
    "New York": {
        faible: [{ nom: "Prêteur sur gages", diff: 5, butin: 20000, desc: "Boutique crasseuse dans le Bronx. Le patron garde un fusil à pompe sous le comptoir." }, { nom: "Supérette", diff: 5, butin: 18000, desc: "Un caissier fatigué et quelques ivrognes traînent dans les rayons." }],
        modere: [{ nom: "Fourgon Blindé", diff: 8, butin: 350000, desc: "Pris dans les embouteillages de Manhattan. Les convoyeurs sont sur les nerfs." }, { nom: "Boutique de luxe", diff: 7, butin: 300000, desc: "Sur la 5ème Avenue. Vigiles en costard, portes magnétiques et clientèle snob." }],
        eleve: [{ nom: "Réserve Fédérale", diff: 11, butin: 7000000, desc: "La cible ultime. Gardes d'élite, coffre-fort de 10 tonnes et caméras à reconnaissance faciale." }, { nom: "Banque de Manhattan", diff: 10, butin: 5500000, desc: "Un hall gigantesque grouillant de monde. Le SWAT n'est jamais loin dans ce quartier." }]
    },
    "Los Angeles": {
        faible: [{ nom: "Dispensaire local", diff: 4, butin: 18000, desc: "Forte odeur d'herbe. Le vigile regarde son téléphone, la caisse est pleine d'argent liquide." }, { nom: "Station service", diff: 4, butin: 14000, desc: "Isolée sur une route désertique. Un seul employé s'ennuie derrière une vitre pare-balles." }],
        modere: [{ nom: "Manoir a Beverly Hills", diff: 6, butin: 150000, desc: "Les propriétaires sont à une fête. Il reste le personnel de maison et des chiens de garde." }, { nom: "Joaillier VIP", diff: 7, butin: 200000, desc: "Un salon privé sur rendez-vous. Verre blindé et alarmes reliées directement au poste local." }],
        eleve: [{ nom: "Casino Clandestin", diff: 9, butin: 2800000, desc: "Géré par la mafia. Les gardes ont la gâchette facile et l'argent coule à flots." }, { nom: "Reserve de Lingots", diff: 10, butin: 3500000, desc: "Un entrepôt banalisé lourdement gardé par des mercenaires privés." }]
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

// 30 ÉVÉNEMENTS (10 Simples, 10 Moyens, 10 Compliqués) - 3 CHOIX CHACUN
const banqueEvenements = {
    simple: [
        { 
            titre: "Rencontre fortuite", desc: "Vous croisez un ancien camarade peu regardant sur la légalité.", 
            choix: [
                {txt: "Discuter affaires (+5000€)", action:()=>{joueur.argent+=5000; joueur.argentGagne+=5000; notify("Petit tuyau lucratif exploité.");}}, 
                {txt: "L'ignorer superbement", action:()=>{joueur.respect++; notify("Vous snobez le menu fretin. Respect +1.");}},
                {txt: "L'intimider pour son cash (Force 5)", action:()=>{if(joueur.stats.force>=5){joueur.argent+=2000; joueur.moralite--; notify("Vous lui avez fait les poches.");}else{joueur.heat+=10; notify("Il s'est débattu et a hurlé. Heat +10.");}}}
            ] 
        },
        { 
            titre: "Panne de réveil", desc: "Vous ratez un rendez-vous matinal avec un contact mineur.", 
            choix: [
                {txt: "Profiter pour dormir (Mental +1)", action:()=>{joueur.mental=Math.min(10,joueur.mental+1); notify("Un repos bienvenu.");}},
                {txt: "S'excuser avec un pot-de-vin (2000€)", action:()=>{if(joueur.argent>=2000){joueur.argent-=2000; joueur.respect++; notify("Contact apaisé.");}else{joueur.respect--; notify("Pas d'argent, contact vexé.");}}},
                {txt: "Le menacer pour qu'il la ferme", action:()=>{joueur.crainte++; joueur.moralite--; notify("Il ne mouftera pas. Crainte +1.");}}
            ] 
        },
        { 
            titre: "Contrôle de routine", desc: "Un agent patrouille près de votre planque.", 
            choix: [
                {txt: "Se cacher dans l'ombre (Furtivité 4)", action:()=>{if(joueur.stats.furtivite>=4){notify("Vous êtes une ombre.");}else{joueur.heat+=15; notify("Il vous a aperçu de loin. Heat +15.");}}},
                {txt: "Garder son calme et dire bonjour (Mental 6)", action:()=>{if(joueur.mental>=6){notify("Le flic vous a salué en retour.");}else{joueur.heat+=10; notify("Vous avez bégayé, il est suspicieux.");}}},
                {txt: "Fuir par la ruelle (Heat +20)", action:()=>{joueur.heat+=20; notify("Fuite paniquée. La tension monte !");}}
            ] 
        },
        { 
            titre: "Colis égaré", desc: "Un colis non réclamé traîne sur votre palier.", 
            choix: [
                {txt: "L'ouvrir pour le revendre (+2000€)", action:()=>{joueur.argent+=2000; joueur.argentGagne+=2000; notify("Revendu au marché noir.");}}, 
                {txt: "Chercher le vrai destinataire (Moralité +1)", action:()=>{joueur.moralite=Math.min(10,joueur.moralite+1); notify("Bonne action effectuée.");}},
                {txt: "Le détruire par paranoïa", action:()=>{joueur.mental--; notify("La paranoïa vous ronge. Mental -1.");}}
            ] 
        },
        { 
            titre: "Coup de fil anonyme", desc: "Quelqu'un respire lourdement au téléphone.", 
            choix: [
                {txt: "Raccrocher calmement", action:()=>{notify("Sûrement une erreur.");}},
                {txt: "Tracer l'appel (Intel 5)", action:()=>{if(joueur.stats.intel>=5){joueur.respect++; notify("C'était un rival. Il est terrifié de vous avoir sous-estimé.");}else{joueur.mental--; notify("Impossible de tracer. L'angoisse monte.");}}},
                {txt: "Hurler des menaces de mort", action:()=>{joueur.crainte++; joueur.moralite--; notify("Le mystérieux appelant a raccroché illico.");}}
            ] 
        },
        { 
            titre: "Verre renversé", desc: "Dans un bar, un gamin bouscule votre verre.", 
            choix: [
                {txt: "S'excuser poliment (Moralité +1)", action:()=>{joueur.moralite=Math.min(10,joueur.moralite+1); notify("Vous restez digne.");}},
                {txt: "Vérifier ses poches direct (Furtivité 5)", action:()=>{if(joueur.stats.furtivite>=5){notify("Portefeuille intact, tout va bien.");}else{joueur.heat+=10; notify("Le gamin a crié au pervers. Heat +10.");}}},
                {txt: "Le gifler (Crainte +2)", action:()=>{joueur.crainte+=2; joueur.moralite-=2; notify("Tout le bar vous fixe avec effroi.");}}
            ] 
        },
        { 
            titre: "Rumeur de quartier", desc: "Le buraliste discute d'un braquage récent (le vôtre).", 
            choix: [
                {txt: "Sourire en coin (Mental +1)", action:()=>{joueur.mental=Math.min(10,joueur.mental+1); notify("L'ego est flatté.");}},
                {txt: "Lui glisser 1000€ pour qu'il se taise", action:()=>{if(joueur.argent>=1000){joueur.argent-=1000; joueur.heat-=10; notify("Il a compris le message. Heat -10.");}else{notify("Vous n'avez pas l'argent.");}}},
                {txt: "Le corriger à l'abri des regards", action:()=>{joueur.crainte+=2; joueur.moralite-=2; notify("Il bégayera la prochaine fois.");}}
            ] 
        },
        { 
            titre: "Panne de Wi-Fi", desc: "Votre réseau sécurisé saute en pleine nuit.", 
            choix: [
                {txt: "Réinitialiser le routeur", action:()=>{notify("Juste une panne serveur.");}},
                {txt: "Pirater le réseau du voisin (Intel 4)", action:()=>{if(joueur.stats.intel>=4){notify("Wi-Fi de secours établi.");}else{joueur.mental--; notify("Impossible de se connecter.");}}},
                {txt: "Fuir la planque par sécurité (Perd 5000€)", action:()=>{joueur.argent-=5000; joueur.argentPerdu+=5000; notify("Nuit à l'hôtel par précaution.");}}
            ] 
        },
        { 
            titre: "Visite du propriétaire", desc: "Le logeur veut inspecter les lieux.", 
            choix: [
                {txt: "Dissimuler le matériel (Furtivité 5)", action:()=>{if(joueur.stats.furtivite>=5){notify("Rien vu, rien su.");}else{joueur.risquePrison+=15; notify("Il a vu des choses louches ! Risque +15.");}}},
                {txt: "Le corrompre (3000€)", action:()=>{if(joueur.argent>=3000){joueur.argent-=3000; notify("Il ferme les yeux pour un an.");}else{notify("Fonds insuffisants.");}}},
                {txt: "Refuser de lui ouvrir", action:()=>{joueur.heat+=15; notify("Il a appelé la police pour tapage. Heat +15.");}}
            ] 
        },
        { 
            titre: "Trouvaille dans la rue", desc: "Un portefeuille égaré sur un banc.", 
            choix: [
                {txt: "Le fouiller (+1000€)", action:()=>{joueur.argent+=1000; joueur.argentGagne+=1000; notify("Cash récupéré.");}}, 
                {txt: "Le déposer au poste (Moralité +2, Heat -10)", action:()=>{joueur.moralite=Math.min(10,joueur.moralite+2); joueur.heat=Math.max(0,joueur.heat-10); notify("Bon citoyen accompli.");}},
                {txt: "Utiliser la carte (Intel 6)", action:()=>{if(joueur.stats.intel>=6){joueur.argent+=5000; notify("Achat en ligne intraçable (+5000€).");}else{joueur.risquePrison+=20; notify("Fraude signalée ! Risque +20.");}}}
            ] 
        }
    ],
    moyen: [
        { 
            titre: "Chantage au flash", desc: "Un automobiliste possède une photo de vous près d'une cible.", 
            choix: [
                {txt: "Payer le maître chanteur (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000;joueur.argentPerdu+=10000; notify("Silence acheté.");}else{joueur.heat+=25; notify("Photo publiée ! Heat +25.");}}}, 
                {txt: "Le traquer et détruire son téléphone (Force 6)", action:()=>{if(joueur.stats.force>=6){notify("Problème réglé violemment.");}else{joueur.risquePrison+=20; notify("Il s'est enfui et a tout balancé.");}}},
                {txt: "Pirater son Cloud (Intel 7)", action:()=>{if(joueur.stats.intel>=7){notify("Photo supprimée à distance.");}else{joueur.heat+=15; notify("Piratage échoué.");}}}
            ] 
        },
        { 
            titre: "Concurrence déloyale", desc: "Un autre gang revendique votre territoire.", 
            choix: [
                {txt: "Affirmer son autorité (Force 7)", action:()=>{if(joueur.stats.force>=7){joueur.respect+=3;notify("Ils ont reculé en tremblant.");}else{joueur.mental-=2; joueur.heat+=20; notify("Passage à tabac. Mental en berne.");}}},
                {txt: "Proposer un partage des gains (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000; notify("Accord conclu dans le sang.");}else{notify("Vous n'avez pas l'argent.");}}},
                {txt: "Les balancer anonymement (Intel 6)", action:()=>{if(joueur.stats.intel>=6){joueur.heat-=20; notify("Vos rivaux sont arrêtés.");}else{joueur.crainte-=2; notify("Ils ont découvert la balance.");}}}
            ] 
        },
        { 
            titre: "Le corbeau", desc: "Une lettre détaille vos derniers déplacements mystérieusement.", 
            choix: [
                {txt: "Changer de planque en urgence (20000€)", action:()=>{if(joueur.argent>=20000){joueur.argent-=20000;joueur.argentPerdu+=20000;notify("Déménagement réussi.");}else{joueur.risquePrison+=25;notify("Vous restez, la peur au ventre.");}}},
                {txt: "Tendre un guet-apens (Furtivité 7)", action:()=>{if(joueur.stats.furtivite>=7){joueur.crainte+=3; notify("Vous avez attrapé le fouineur.");}else{joueur.mental-=2; notify("Il ne s'est jamais montré.");}}},
                {txt: "Ignorer superbement la menace", action:()=>{joueur.risquePrison+=15; joueur.mental++; notify("Nerfs d'acier, mais risqué.");}}
            ] 
        },
        { 
            titre: "Interrogatoire subtil", desc: "Un inspecteur en civil vous aborde au café.", 
            choix: [
                {txt: "Garder son sang-froid absolu (Mental 7)", action:()=>{if(joueur.mental>=7){joueur.heat-=10; notify("Il n'a rien vu.");}else{joueur.risquePrison+=20; notify("Vous avez transpiré !");}}},
                {txt: "Se faire passer pour un indic (Intel 6)", action:()=>{if(joueur.stats.intel>=6){joueur.respect++; notify("Il vous croit de son côté.");}else{joueur.heat+=20; notify("Mensonge grossier.");}}},
                {txt: "L'envoyer balader sèchement", action:()=>{joueur.crainte++; joueur.heat+=15; notify("Sur liste rouge.");}}
            ] 
        },
        { 
            titre: "Dette de comparses", desc: "Un ancien complice libéré réclame sa part oubliée.", 
            choix: [
                {txt: "Lui donner son dû (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000;joueur.argentPerdu+=15000;joueur.respect+=2;notify("La loyauté paie.");}else{joueur.risquePrison+=15;notify("Il va se venger.");}}},
                {txt: "Lui offrir un job en compensation", action:()=>{notify("Il intègre temporairement vos équipes.");}},
                {txt: "Le chasser avec perte et fracas (Force 6)", action:()=>{if(joueur.stats.force>=6){joueur.crainte+=2; notify("Il a fui.");}else{joueur.mental-=2; notify("Bagarre perdue.");}}}
            ] 
        },
        { 
            titre: "Contrôle fiscal surprise", desc: "L'État s'étonne de votre train de vie.", 
            choix: [
                {txt: "Graisser la patte de l'auditeur (25000€)", action:()=>{if(joueur.argent>=25000){joueur.argent-=25000;joueur.argentPerdu+=25000;notify("Dossier classé.");}else{joueur.risquePrison+=30;notify("Redressement judiciaire !");}}},
                {txt: "Falsifier les documents (Intel 8)", action:()=>{if(joueur.stats.intel>=8){notify("Vous passez pour un employé.");}else{joueur.risquePrison+=25;notify("Fraude découverte.");}}},
                {txt: "Fuir le pays (Perd 1 mois)", action:()=>{joueur.mois+=1; joueur.heat-=20; notify("Vous êtes sauf.");}}
            ] 
        },
        { 
            titre: "Matériel défectueux", desc: "Vos outils achetés lâchent en pleine rue.", 
            choix: [
                {txt: "Racheter du matos (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000;joueur.argentPerdu+=15000;notify("Outils réparés.");}else{notify("Fonds insuffisants.");}}},
                {txt: "Réparer soi-même (Intel 6)", action:()=>{if(joueur.stats.intel>=6){notify("Système D.");}else{joueur.stats.intel--; notify("Matos flingué. Intel -1.");}}},
                {txt: "Aller casser la figure du vendeur (Force 7)", action:()=>{if(joueur.stats.force>=7){joueur.argent+=5000; notify("Remboursement forcé.");}else{joueur.heat+=15; notify("Il a appelé la sécurité.");}}}
            ] 
        },
        { 
            titre: "Course-poursuite urbaine", desc: "Vous êtes filé par deux hommes en trench-case.", 
            choix: [
                {txt: "Semer les ombres (Furtivité 7)", action:()=>{if(joueur.stats.furtivite>=7){notify("Vous disparaissez.");}else{joueur.heat+=25; notify("Planque repérée !");}}},
                {txt: "Les affronter dans une ruelle (Force 8)", action:()=>{if(joueur.stats.force>=8){joueur.crainte+=3; notify("Deux flics sur le carreau.");}else{joueur.risquePrison+=30; notify("C'était les stups.");}}},
                {txt: "Jeter des liasses pour une émeute (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000; notify("Fuite parfaite.");}else{notify("Pas assez d'argent.");}}}
            ] 
        },
        { 
            titre: "Voisinage curieux", desc: "Un voisin insiste pour tout savoir sur vos nuits.", 
            choix: [
                {txt: "L'embrouiller (Mental 6)", action:()=>{if(joueur.mental>=6){notify("Il vous prend pour un trader.");}else{joueur.risquePrison+=15; notify("Il n'a pas cru.");}}},
                {txt: "Déménager discrètement (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000; notify("Tranquillité achetée.");}else{notify("Impossible.");}}},
                {txt: "Le terrifier (Crainte +2, Moralité -1)", action:()=>{joueur.crainte+=2; joueur.moralite--; notify("Il baisse les yeux.");}}
            ] 
        },
        { 
            titre: "Fuite d'informations", desc: "Des rumeurs circulent sur vous.", 
            choix: [
                {txt: "Piratage préventif (Intel 7)", action:()=>{if(joueur.stats.intel>=7){notify("Traces effacées.");}else{joueur.niveauSurveillance++; notify("Surveillance +1.");}}},
                {txt: "Fausse piste (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000; joueur.heat-=15; notify("Police égarée.");}else{notify("Pas d'argent.");}}},
                {txt: "Ne rien faire", action:()=>{joueur.heat+=20; notify("La rumeur enfle.");}}
            ] 
        }
    ],
    complique: [
        { 
            titre: "Piège du FBI", desc: "Un indic propose un faux plan d'attaque juteux.", 
            choix: [
                {txt: "Analyser le piège (Intel 9)", action:()=>{if(joueur.stats.intel>=9){notify("Piège évité !");}else{allerEnPrison("C'était un guet-apens fédéral !");}}},
                {txt: "Payer un autre gang (30000€)", action:()=>{if(joueur.argent>=30000){joueur.argent-=30000; joueur.heat-=30; notify("Ils se sont fait prendre.");}else{notify("Impossible.");}}},
                {txt: "L'ignorer sagement", action:()=>{joueur.mental++; notify("Prudence est mère de sûreté.");}}
            ] 
        },
        { 
            titre: "Fusillade interlope", desc: "Un règlement de comptes éclate au bas de l'immeuble.", 
            choix: [
                {txt: "Tirer (Force 9)", action:()=>{if(joueur.stats.force>=9){joueur.crainte+=5; notify("Rue nettoyée.");}else{joueur.mental-=3; notify("Traumatisme.");}}},
                {txt: "Fuite toits (Furtivité 9)", action:()=>{if(joueur.stats.furtivite>=9){notify("Fuite spectaculaire.");}else{joueur.risquePrison+=30; notify("Repéré par les hélicos.");}}},
                {txt: "Faire le mort", action:()=>{joueur.mental-=2; notify("Lâche mais vivant.");}}
            ] 
        },
        { 
            titre: "Infiltration de la planque", desc: "Votre serrure a été subtilement crochetée.", 
            choix: [
                {txt: "Mercenaires (40000€)", action:()=>{if(joueur.argent>=40000){joueur.argent-=40000; notify("Planque bunkerisée.");}else{notify("Pas d'argent.");}}},
                {txt: "Poser des pièges (Intel 8)", action:()=>{if(joueur.stats.intel>=8){notify("Défenses activées.");}else{joueur.risquePrison+=20; notify("Caméras vous incriminent.");}}},
                {txt: "Attendre le cambrioleur (Force 8)", action:()=>{if(joueur.stats.force>=8){joueur.crainte+=4; notify("Voleur neutralisé.");}else{joueur.argentPerdu+=20000; joueur.argent-=20000; notify("Il vous a volé 20 000€.");}}}
            ] 
        },
        { 
            titre: "Traîtrise de haut vol", desc: "Un associé de longue date va témoigner.", 
            choix: [
                {txt: "Acheter son avocat (50000€)", action:()=>{if(joueur.argent>=50000){joueur.argent-=50000; notify("Témoignage annulé.");}else{allerEnPrison("Il a tout balancé.");}}},
                {txt: "Le neutraliser (Furtivité 9)", action:()=>{if(joueur.stats.furtivite>=9){joueur.moralite-=3; notify("Disparition mystérieuse.");}else{allerEnPrison("Pris en flagrant délit.");}}},
                {txt: "Fuir à l'étranger (Reset Risque, -50% cash)", action:()=>{joueur.argent = Math.floor(joueur.argent/2); joueur.heat=0; joueur.risquePrison=0; notify("Nouvelle vie.");}}
            ] 
        },
        { 
            titre: "Saccage par un parrain", desc: "Le syndicat réclame 30% de vos gains.", 
            choix: [
                {txt: "Payer la dîme (Perd 30% cash)", action:()=>{let tax=Math.floor(joueur.argent*0.3); joueur.argent-=tax; joueur.argentPerdu+=tax; notify("Vous baissez la tête.");}},
                {txt: "Décapiter l'orga (Force 10)", action:()=>{if(joueur.stats.force>=10){joueur.respect+=10; joueur.crainte+=10; notify("Nouveau boss en ville.");}else{allerEnPrison("Vendetta ratée.");}}},
                {txt: "Pirater leurs comptes (Intel 9)", action:()=>{if(joueur.stats.intel>=9){joueur.argent+=100000; notify("+100 000€.");}else{joueur.mental-=4; notify("Contrat sur votre tête.");}}}
            ] 
        },
        { 
            titre: "Mandat imminent", desc: "Le SWAT arrive à l'aube.", 
            choix: [
                {txt: "Brûler et fuir (Furtivité 8)", action:()=>{if(joueur.stats.furtivite>=8){notify("Il ne reste que des cendres.");}else{joueur.risquePrison+=40; notify("Fumée repérée !");}}},
                {txt: "Nettoyeur pro (40000€)", action:()=>{if(joueur.argent>=40000){joueur.argent-=40000; joueur.niveauSurveillance=0; notify("Lieu propre.");}else{allerEnPrison("Impossible d'effacer.");}}},
                {txt: "Négocier (Intel 8)", action:()=>{if(joueur.stats.intel>=8){joueur.risquePrison=0; notify("Vice de procédure.");}else{allerEnPrison("Pas de négociation.");}}}
            ] 
        },
        { 
            titre: "Enlèvement d'un proche", desc: "Un cartel rival a kidnappé un contact.", 
            choix: [
                {txt: "Payer rançon (50000€)", action:()=>{if(joueur.argent>=50000){joueur.argent-=50000; joueur.respect++; notify("Il est libre.");}else{notify("Pas l'argent.");}}},
                {txt: "Assaut (Force 9, Moralité -2)", action:()=>{if(joueur.stats.force>=9){joueur.crainte+=5; joueur.moralite-=2; notify("Bain de sang. Sauvé.");}else{joueur.mental-=5; notify("Il est mort dans les tirs.");}}},
                {txt: "Sacrifier froidement (Mental 8)", action:()=>{if(joueur.mental>=8){joueur.crainte+=5; joueur.moralite-=4; notify("Cartel impressionné.");}else{joueur.mental-=4; notify("Culpabilité.");}}}
            ] 
        },
        { 
            titre: "Piratage de comptes", desc: "Un hacker siphonne vos fonds non blanchis.", 
            choix: [
                {txt: "Contre-attaque (Intel 10)", action:()=>{if(joueur.stats.intel>=10){joueur.argent+=50000; notify("Hacké en retour ! +50 000€");}else{joueur.argent=Math.floor(joueur.argent*0.8); notify("20% volatilisé !");}}},
                {txt: "Firme cybersécu (30000€)", action:()=>{if(joueur.argent>=30000){joueur.argent-=30000; notify("Fonds sécurisés.");}else{joueur.argent=Math.floor(joueur.argent*0.5); notify("Moitié perdue.");}}},
                {txt: "Rien faire", action:()=>{joueur.argent=Math.floor(joueur.argent*0.7); joueur.mental-=2; notify("30% perdus.");}}
            ] 
        },
        { 
            titre: "Témoin clé", desc: "Un gardien traumatisé vous a reconnu.", 
            choix: [
                {txt: "Acheter silence (60000€)", action:()=>{if(joueur.argent>=60000){joueur.argent-=60000; notify("Il vit aux Bahamas.");}else{allerEnPrison("Il a témoigné.");}}},
                {txt: "Faire disparaître (Furtivité 10)", action:()=>{if(joueur.stats.furtivite>=10){joueur.moralite-=5; notify("Accident tragique...");}else{allerEnPrison("Corps retrouvé !");}}},
                {txt: "Lavage de cerveau (Mental 9)", action:()=>{if(joueur.mental>=9){notify("Il croit s'être trompé.");}else{joueur.risquePrison+=40; notify("Il a couru au poste !");}}}
            ] 
        },
        { 
            titre: "Embuscade routière", desc: "Route bloquée par des flics banalisés.", 
            choix: [
                {txt: "Bélier (Force 9)", action:()=>{if(joueur.stats.force>=9){notify("Passage en force !");}else{allerEnPrison("Moteur calé.");}}},
                {txt: "Esquive extrême (Furtivité 9)", action:()=>{if(joueur.stats.furtivite>=9){notify("Fondu dans la nuit.");}else{allerEnPrison("Pneus crevés.");}}},
                {txt: "Abandonner (50000€)", action:()=>{if(joueur.argent>=50000){joueur.argent-=50000; joueur.heat+=20; notify("Fuite à pied.");}else{allerEnPrison("Rattrapé.");}}}
            ] 
        }
    ],
    prison: [
        { 
            titre: "Douches froides", desc: "Un gang rival vous coince dans les douches.", 
            choix: [
                {txt: "Se battre (Force 7)", action:()=>{if(joueur.stats.force>=7){joueur.crainte+=3; return "Vous avez couché le chef. Crainte +3.";}else{joueur.mental-=2; return "Vous avez fini à l'infirmerie. Mental -2.";}}},
                {txt: "Esquiver (Furtivité 6)", action:()=>{if(joueur.stats.furtivite>=6){return "Vous vous êtes glissé hors du piège intact.";}else{joueur.mental--; return "Ils vous ont attrapé. Humiliation.";}}},
                {txt: "Payer les caïds (5000€)", action:()=>{if(joueur.argent>=5000){joueur.argent-=5000; joueur.argentPerdu+=5000; return "Protection achetée. Cash perdu.";}else{joueur.mental-=2; return "Pas d'argent. Passage à tabac.";}}}
            ] 
        },
        { 
            titre: "Le Marché Noir", desc: "Un maton corrompu propose ses services.", 
            choix: [
                {txt: "Acheter un tel crypté (8000€)", action:()=>{if(joueur.argent>=8000){joueur.argent-=8000; joueur.argentPerdu+=8000; joueur.stats.intel++; return "Vous gérez vos affaires. Intel +1.";}else{return "Fonds insuffisants.";}}},
                {txt: "Acheter des stéroïdes (5000€)", action:()=>{if(joueur.argent>=5000){joueur.argent-=5000; joueur.argentPerdu+=5000; joueur.stats.force++; return "Entraînement hardcore. Force +1.";}else{return "Fonds insuffisants.";}}},
                {txt: "Refuser pour faire profil bas", action:()=>{joueur.mental++; return "Moins on se fait remarquer, mieux c'est. Mental +1.";}}
            ] 
        },
        { 
            titre: "Projet d'évasion", desc: "Des détenus creusent un tunnel.", 
            choix: [
                {txt: "Tenter l'évasion (Furtivité 8)", action:()=>{if(joueur.stats.furtivite>=8){joueur.peineActuelle=0; return "Évasion réussie ! Vous êtes libre.";}else{joueur.peineActuelle+=3; return "Pris en flagrant délit. +3 ans de peine.";}}},
                {txt: "Les dénoncer", action:()=>{joueur.peineActuelle=Math.max(1, joueur.peineActuelle-2); joueur.respect-=5; return "Remise de peine (-2 ans), mais vous êtes une balance. Respect -5.";}},
                {txt: "Laisser faire", action:()=>{return "Vous ne vous mêlez pas de ça.";}}
            ] 
        }
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
    joueur.niveauSurveillance += 1; 
    joueur.mental = Math.min(10, joueur.mental + 2); 

    if (joueur.age >= 65) {
        afficherEcranFin("Mort en Cellule", `Vous vous éteignez en prison à l'âge de ${joueur.age} ans.`);
    } else {
        notify(`Libéré. Retour à la réalité.`);
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
                <button class="btn-action" style="padding:5px 10px; margin-top:5px; border-radius:4px;" onclick="virerRecrue(${index})">Virer / Exécuter</button>
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
            🟢 ${cF.nom}<br><span style="font-size:12px; color:#8b949e; font-style:italic;">Chance de réussite estimée : ~${getTx(cF.diff)}%</span>
        </button>
        <button class="btn-choix" style="padding:10px;" onclick="preparerCasse('modere', ${cM.diff}, ${cM.butin}, '${cM.nom}', \`${cM.desc}\`)">
            🟠 ${cM.nom}<br><span style="font-size:12px; color:#8b949e; font-style:italic;">Chance de réussite estimée : ~${getTx(cM.diff)}%</span>
        </button>
        <button class="btn-choix" style="padding:10px;" onclick="preparerCasse('eleve', ${cE.diff}, ${cE.butin}, '${cE.nom}', \`${cE.desc}\`)">
            🔴 ${cE.nom}<br><span style="font-size:12px; color:#8b949e; font-style:italic;">Chance de réussite estimée : ~${getTx(cE.diff)}%</span>
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
        <p style="background:#21262d; padding:15px; border-radius:6px; text-align:left; border-left:4px solid #da3633; line-height:1.5;">${contexteCasse.texteAction}</p>
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
        <h3 style="color:${reussi ? '#2ea043' : '#da3633'}">${reussi ? 'Coup Réussi avec Succès' : 'Opération Compromise'}</h3>
        <p style="font-style:italic; color:#8b949e;">${msgAmbiance}</p>
        <p><strong>Butin net empoché :</strong> ${butin.toLocaleString()} €</p>
        <hr style="border-color:#30363d">
        <h4>Bilan Humain :</h4>
        <ul style="color:#ff7b72;">
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
