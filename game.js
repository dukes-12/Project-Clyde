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
                {txt: "Discuter affaires (+5000€)", action:()=>{joueur.argent+=5000; joueur.argentGagne+=5000; return "Petit tuyau lucratif exploité avec succès. Vous empochez 5000€.";}}, 
                {txt: "L'ignorer superbement", action:()=>{joueur.respect++; return "Vous snobez le menu fretin. Votre respect dans le milieu augmente (+1).";}},
                {txt: "L'intimider pour son cash (Force 5)", action:()=>{if(joueur.stats.force>=5){joueur.argent+=2000; joueur.moralite--; return "Vous l'avez collé au mur et dépouillé (+2000€). Moralité en baisse.";}else{joueur.heat+=10; return "Il s'est débattu et a hurlé au voleur. La tension monte (Heat +10).";}}}
            ] 
        },
        { 
            titre: "Panne de réveil", desc: "Vous ratez un rendez-vous matinal avec un contact mineur.", 
            choix: [
                {txt: "Profiter pour dormir (Mental +1)", action:()=>{joueur.mental=Math.min(10,joueur.mental+1); return "Un repos bienvenu qui vous éclaircit les idées (Mental +1).";}},
                {txt: "S'excuser avec un pot-de-vin (2000€)", action:()=>{if(joueur.argent>=2000){joueur.argent-=2000; joueur.respect++; return "Billet glissé sous le manteau. Le contact est apaisé (Respect +1).";}else{joueur.respect--; return "Pas d'argent pour vous excuser. Le contact est vexé (Respect -1).";}}},
                {txt: "Le menacer pour qu'il la ferme", action:()=>{joueur.crainte++; joueur.moralite--; return "Vous le menacez de lui briser les genoux s'il se plaint (Crainte +1).";}}
            ] 
        },
        { 
            titre: "Contrôle de routine", desc: "Un agent patrouille près de votre planque.", 
            choix: [
                {txt: "Se cacher dans l'ombre (Furtivité 4)", action:()=>{if(joueur.stats.furtivite>=4){return "Vous fondez dans le décor. L'agent passe son chemin.";}else{joueur.heat+=15; return "Il vous a aperçu de loin et a pris votre signalement (Heat +15).";}}},
                {txt: "Garder son calme et dire bonjour (Mental 6)", action:()=>{if(joueur.mental>=6){return "Le flic vous a salué en retour, sans aucune suspicion.";}else{joueur.heat+=10; return "Vous avez bégayé nerveusement. Il a noté votre visage (Heat +10).";}}},
                {txt: "Fuir par la ruelle (Heat +20)", action:()=>{joueur.heat+=20; return "Fuite paniquée ! Les sirènes retentissent au loin (Heat +20).";}}
            ] 
        },
        { 
            titre: "Colis égaré", desc: "Un colis non réclamé traîne sur votre palier.", 
            choix: [
                {txt: "L'ouvrir pour le revendre (+2000€)", action:()=>{joueur.argent+=2000; joueur.argentGagne+=2000; return "Colis revendu au marché noir (+2000€).";}}, 
                {txt: "Chercher le destinataire", action:()=>{joueur.moralite=Math.min(10,joueur.moralite+1); return "Bonne action effectuée, votre conscience s'allège (Moralité +1).";}},
                {txt: "Le détruire par paranoïa", action:()=>{joueur.mental--; return "La paranoïa vous ronge, vous détruisez tout (Mental -1).";}}
            ] 
        },
        { 
            titre: "Coup de fil anonyme", desc: "Quelqu'un respire lourdement au téléphone.", 
            choix: [
                {txt: "Raccrocher calmement", action:()=>{return "Sûrement une erreur, vous n'y prêtez pas attention.";}},
                {txt: "Tracer l'appel (Intel 5)", action:()=>{if(joueur.stats.intel>=5){joueur.respect++; return "C'était un rival. Il est terrifié de vous avoir sous-estimé (Respect +1).";}else{joueur.mental--; return "Impossible de tracer. L'angoisse monte (Mental -1).";}}},
                {txt: "Hurler des menaces de mort", action:()=>{joueur.crainte++; joueur.moralite--; return "Le mystérieux appelant a raccroché illico (Crainte +1).";}}
            ] 
        },
        { 
            titre: "Verre renversé", desc: "Dans un bar, un gamin bouscule votre verre.", 
            choix: [
                {txt: "S'excuser poliment", action:()=>{joueur.moralite=Math.min(10,joueur.moralite+1); return "Vous restez digne et évitez l'incident.";}},
                {txt: "Vérifier ses poches (Furtivité 5)", action:()=>{if(joueur.stats.furtivite>=5){return "Portefeuille intact, c'était juste un accident.";}else{joueur.heat+=10; return "Le gamin a crié au pervers car vous l'avez fouillé (Heat +10).";}}},
                {txt: "Le gifler (Crainte +2)", action:()=>{joueur.crainte+=2; joueur.moralite-=2; return "Tout le bar vous fixe avec effroi. Vous êtes craint.";}}
            ] 
        },
        { 
            titre: "Rumeur de quartier", desc: "Le buraliste discute d'un braquage récent (le vôtre).", 
            choix: [
                {txt: "Sourire en coin (Mental +1)", action:()=>{joueur.mental=Math.min(10,joueur.mental+1); return "Votre ego est flatté de faire les gros titres.";}},
                {txt: "Le payer pour se taire (1000€)", action:()=>{if(joueur.argent>=1000){joueur.argent-=1000; joueur.heat=Math.max(0, joueur.heat-10); return "Il a compris le message (Heat -10).";}else{return "Vous n'avez pas l'argent pour le faire taire.";}}},
                {txt: "Le corriger à l'abri des regards", action:()=>{joueur.crainte+=2; joueur.moralite-=2; return "Il bégayera la prochaine fois qu'il parlera de vous.";}}
            ] 
        },
        { 
            titre: "Panne de Wi-Fi", desc: "Votre réseau sécurisé saute en pleine nuit.", 
            choix: [
                {txt: "Réinitialiser le routeur", action:()=>{return "Juste une panne serveur classique. Tout va bien.";}},
                {txt: "Pirater le voisin (Intel 4)", action:()=>{if(joueur.stats.intel>=4){return "Wi-Fi de secours établi discrètement.";}else{joueur.mental--; return "Impossible de se connecter, le stress monte.";}}},
                {txt: "Fuir la planque (Perd 5000€)", action:()=>{joueur.argent-=5000; joueur.argentPerdu+=5000; return "Nuit à l'hôtel par précaution. Votre solde en prend un coup.";}}
            ] 
        },
        { 
            titre: "Visite du propriétaire", desc: "Le logeur veut inspecter les lieux.", 
            choix: [
                {txt: "Dissimuler le matériel (Furtivité 5)", action:()=>{if(joueur.stats.furtivite>=5){return "L'inspection se passe sans aucun accroc.";}else{joueur.risquePrison+=15; return "Il a vu des objets louches ! (Risque Prison +15).";}}},
                {txt: "Le corrompre (3000€)", action:()=>{if(joueur.argent>=3000){joueur.argent-=3000; return "Il empoche le billet et fait demi-tour.";}else{return "Fonds insuffisants pour le corrompre.";}}},
                {txt: "Refuser de lui ouvrir", action:()=>{joueur.heat+=15; return "Il a appelé la police pour tapage nocturne (Heat +15).";}}
            ] 
        },
        { 
            titre: "Trouvaille dans la rue", desc: "Un portefeuille égaré sur un banc.", 
            choix: [
                {txt: "Le fouiller (+1000€)", action:()=>{joueur.argent+=1000; joueur.argentGagne+=1000; return "Billet récupéré, le reste va à la poubelle.";}}, 
                {txt: "Au poste (Moralité +2, Heat -10)", action:()=>{joueur.moralite=Math.min(10,joueur.moralite+2); joueur.heat=Math.max(0,joueur.heat-10); return "La police vous félicite. Vous passez pour un saint.";}},
                {txt: "Utiliser la carte (Intel 6)", action:()=>{if(joueur.stats.intel>=6){joueur.argent+=5000; return "Achat en ligne intraçable (+5000€).";}else{joueur.risquePrison+=20; return "Fraude signalée à la banque ! (Risque +20).";}}}
            ] 
        },
        { 
            titre: "Le Receleur Gourmand", desc: "Un contact veut revoir sa part du butin à la hausse après le casse.", 
            choix: [
                {txt: "Céder 20% du butin", action:()=>{let p = Math.floor(joueur.argent*0.2); joueur.argent-=p; return `Vous achetez la paix pour ${p}€.`;}}, 
                {txt: "Négocier fermement (Intel 8)", action:()=>{if(joueur.stats.intel>=8){return "Vos arguments financiers le font reculer. Vous gardez votre argent.";}else{joueur.respect-=2; return "Il se moque de vous et menace de ne plus travailler avec vous.";}}},
                {txt: "Le menacer (Force 8)", action:()=>{if(joueur.stats.force>=8){joueur.crainte+=2; return "Un couteau sous la gorge suffit à le calmer (Crainte +2).";}else{joueur.heat+=15; return "La bagarre éclate. Vous fuyez avant la police (Heat +15).";}}}
            ] 
        }
    ],
    moyen: [
        { 
            titre: "Chantage au flash", desc: "Un automobiliste possède une photo de vous près d'une cible.", 
            choix: [
                {txt: "Payer le maître chanteur (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000;joueur.argentPerdu+=10000; return "Silence acheté. La photo est supprimée.";}else{joueur.heat+=25; return "Impossible de payer. La photo est publiée ! (Heat +25).";}}}, 
                {txt: "Détruire son téléphone (Force 6)", action:()=>{if(joueur.stats.force>=6){return "Vous avez brisé son nez et son appareil photo.";}else{joueur.risquePrison+=20; return "Il s'est enfui avec la preuve et a tout balancé (Risque +20).";}}},
                {txt: "Pirater son Cloud (Intel 7)", action:()=>{if(joueur.stats.intel>=7){return "Photo effacée à distance depuis votre van.";}else{joueur.heat+=15; return "Le piratage a échoué. Il se doute de quelque chose (Heat +15).";}}}
            ] 
        },
        { 
            titre: "Concurrence déloyale", desc: "Un autre gang revendique votre territoire.", 
            choix: [
                {txt: "Affirmer son autorité (Force 7)", action:()=>{if(joueur.stats.force>=7){joueur.respect+=3; return "Quelques côtes brisées plus tard, ils ont reculé (Respect +3).";}else{joueur.mental-=2; joueur.heat+=20; return "Passage à tabac subi. Votre ego en prend un coup (Mental -2, Heat +20).";}}},
                {txt: "Proposer un partage (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000; return "Accord conclu dans le sang et les billets.";}else{return "Vous n'avez pas l'argent pour négocier.";}}},
                {txt: "Les balancer aux flics (Intel 6)", action:()=>{if(joueur.stats.intel>=6){joueur.heat=Math.max(0, joueur.heat-20); return "Vos rivaux sont arrêtés, la tension redescend (Heat -20).";}else{joueur.crainte-=2; return "Ils ont découvert que vous étiez la balance (Crainte -2).";}}}
            ] 
        },
        { 
            titre: "Le corbeau", desc: "Une lettre détaille vos derniers déplacements mystérieusement.", 
            choix: [
                {txt: "Changer de planque (20000€)", action:()=>{if(joueur.argent>=20000){joueur.argent-=20000;joueur.argentPerdu+=20000; return "Déménagement réussi, vous êtes à l'abri.";}else{joueur.risquePrison+=25; return "Vous restez, la peur au ventre (Risque +25).";}}},
                {txt: "Tendre un guet-apens (Furtivité 7)", action:()=>{if(joueur.stats.furtivite>=7){joueur.crainte+=3; return "Vous avez attrapé le fouineur (Crainte +3).";}else{joueur.mental-=2; return "Il ne s'est jamais montré. Paranoïa (Mental -2).";}}},
                {txt: "Ignorer superbement la menace", action:()=>{joueur.risquePrison+=15; joueur.mental++; return "Vous avez des nerfs d'acier, mais c'est risqué.";}}
            ] 
        },
        { 
            titre: "Interrogatoire subtil", desc: "Un inspecteur en civil vous aborde au café.", 
            choix: [
                {txt: "Garder son sang-froid (Mental 7)", action:()=>{if(joueur.mental>=7){joueur.heat=Math.max(0, joueur.heat-10); return "Il n'a rien vu. La tension baisse.";}else{joueur.risquePrison+=20; return "Vous avez transpiré à grosses gouttes devant lui !";}}},
                {txt: "Se faire passer pour un indic (Intel 6)", action:()=>{if(joueur.stats.intel>=6){joueur.respect++; return "Il vous croit de son côté. Belle manipulation.";}else{joueur.heat+=20; return "Mensonge grossier. Il vous a à l'œil.";}}},
                {txt: "L'envoyer balader sèchement", action:()=>{joueur.crainte++; joueur.heat+=15; return "L'inspecteur vous a mis sur sa liste rouge.";}}
            ] 
        },
        { 
            titre: "Dette de comparses", desc: "Un ancien complice libéré réclame sa part oubliée.", 
            choix: [
                {txt: "Lui donner son dû (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000;joueur.argentPerdu+=15000;joueur.respect+=2; return "La loyauté paie dans le milieu (Respect +2).";}else{joueur.risquePrison+=15; return "Il promet de se venger...";}}},
                {txt: "Lui offrir un job en compensation", action:()=>{return "Il intègre temporairement vos équipes.";}},
                {txt: "Le chasser avec fracas (Force 6)", action:()=>{if(joueur.stats.force>=6){joueur.crainte+=2; return "Il a fui, la queue entre les jambes.";}else{joueur.mental-=2; return "Vous avez perdu la bagarre devant témoins.";}}}
            ] 
        },
        { 
            titre: "Contrôle fiscal surprise", desc: "L'État s'étonne de votre train de vie.", 
            choix: [
                {txt: "Graisser la patte de l'auditeur (25000€)", action:()=>{if(joueur.argent>=25000){joueur.argent-=25000;joueur.argentPerdu+=25000; return "Dossier classé sans suite après paiement.";}else{joueur.risquePrison+=30; return "Alerte de redressement judiciaire ! (Risque +30).";}}},
                {txt: "Falsifier les documents (Intel 8)", action:()=>{if(joueur.stats.intel>=8){return "Vous passez pour un modeste employé.";}else{joueur.risquePrison+=25; return "Fraude découverte par les agents.";}}},
                {txt: "Fuir le pays (Perd 1 mois)", action:()=>{joueur.mois+=1; joueur.heat=Math.max(0, joueur.heat-20); return "Vos affaires stagnent, mais vous êtes sauf.";}}
            ] 
        },
        { 
            titre: "Matériel défectueux", desc: "Vos outils achetés récemment lâchent en pleine rue.", 
            choix: [
                {txt: "Racheter du matos certifié (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000;joueur.argentPerdu+=15000; return "Nouveau matériel flambant neuf.";}else{return "Fonds insuffisants pour racheter l'équipement.";}}},
                {txt: "Réparer avec les moyens du bord (Intel 6)", action:()=>{if(joueur.stats.intel>=6){return "Système D fonctionnel.";}else{joueur.stats.intel--; return "Le matos a grillé entre vos mains (Intel -1).";}}},
                {txt: "Casser la figure du vendeur (Force 7)", action:()=>{if(joueur.stats.force>=7){joueur.argent+=5000; return "Remboursement obtenu de force.";}else{joueur.heat+=15; return "Il a appelé la sécurité du quartier.";}}}
            ] 
        },
        { 
            titre: "Course-poursuite urbaine", desc: "Vous êtes filé par deux hommes en trench-case.", 
            choix: [
                {txt: "Semer les ombres (Furtivité 7)", action:()=>{if(joueur.stats.furtivite>=7){return "Vous disparaissez dans la foule sans laisser de traces.";}else{joueur.heat+=25; return "Ils vous ont filé jusqu'à votre planque !";}}},
                {txt: "Les affronter (Force 8)", action:()=>{if(joueur.stats.force>=8){joueur.crainte+=3; return "Deux flics en civil au tapis. Respect.";}else{joueur.risquePrison+=30; return "C'était les stups. Grosse galère.";}}},
                {txt: "Créer une émeute (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000; return "Des liasses en l'air, la foule bloque les poursuivants.";}else{return "Pas assez d'argent pour créer diversion.";}}}
            ] 
        },
        { 
            titre: "Voisinage curieux", desc: "Un voisin insiste pour tout savoir sur vos nuits dehors.", 
            choix: [
                {txt: "L'embrouiller (Mental 6)", action:()=>{if(joueur.mental>=6){return "Il vous prend pour un trader insomniaque.";}else{joueur.risquePrison+=15; return "Votre alibi ne tient pas la route.";}}},
                {txt: "Déménager discrètement (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000; return "Nouvel appartement, nouvelle vie.";}else{return "Vous ne pouvez pas financer le déménagement.";}}},
                {txt: "Le terrifier (Crainte +2)", action:()=>{joueur.crainte+=2; joueur.moralite--; return "Il baisse les yeux dès qu'il vous croise.";}}
            ] 
        },
        { 
            titre: "Fuite d'informations", desc: "Des rumeurs circulent sur les forums underground.", 
            choix: [
                {txt: "Piratage préventif (Intel 7)", action:()=>{if(joueur.stats.intel>=7){return "Toutes les traces numériques sont effacées.";}else{joueur.niveauSurveillance++; return "Vous êtes surveillé de plus près (Surveillance +1).";}}},
                {txt: "Lancer une fausse piste (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000; joueur.heat=Math.max(0, joueur.heat-15); return "La police suit désormais un autre gang.";}else{return "Pas d'argent pour financer la désinformation.";}}},
                {txt: "Ne rien faire", action:()=>{joueur.heat+=20; return "La rumeur enfle dangereusement (Heat +20).";}}
            ] 
        },
        { 
            titre: "Le Vengeur", desc: "Un ancien membre de votre équipe que vous avez viré réclame vengeance.", 
            choix: [
                {txt: "Le dédommager (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000; joueur.respect++; return "Liasse jetée au visage. Affaire classée proprement (Respect +1).";}else{joueur.risquePrison+=15; return "Pas d'argent. Il va voir la police.";}}},
                {txt: "L'intimider une bonne fois (Force 7)", action:()=>{if(joueur.stats.force>=7){joueur.crainte+=2; return "Il a compris qu'il ne faisait pas le poids (Crainte +2).";}else{joueur.heat+=20; return "Fusillade dans la rue. Il a fui (Heat +20).";}}},
                {txt: "Déménager discrètement (Perd 1 mois)", action:()=>{joueur.mois+=1; return "Vous changez de planque d'urgence pour l'éviter.";}}
            ] 
        }
    ],
    complique: [
        { 
            titre: "Piège du FBI", desc: "Un indic propose un faux plan d'attaque juteux.", 
            choix: [
                {txt: "Analyser le piège (Intel 9)", action:()=>{if(joueur.stats.intel>=9){joueur.respect+=5; return "Piège identifié et évité. Le milieu salue votre flair (Respect +5).";}else{allerEnPrison("Guet-apens fédéral sur la fausse cible !"); return "Les menottes se referment sur vous.";}}},
                {txt: "Payer un autre gang (30000€)", action:()=>{if(joueur.argent>=30000){joueur.argent-=30000; joueur.heat=Math.max(0, joueur.heat-30); return "Des bleusailles se sont fait arrêter à votre place (Heat -30).";}else{return "Impossible de financer une diversion.";}}},
                {txt: "L'ignorer sagement", action:()=>{joueur.mental++; return "Prudence est mère de sûreté (Mental +1).";}}
            ] 
        },
        { 
            titre: "Fusillade interlope", desc: "Un règlement de comptes éclate au bas de votre immeuble.", 
            choix: [
                {txt: "Sécuriser et tirer (Force 9)", action:()=>{if(joueur.stats.force>=9){joueur.crainte+=5; return "Vous avez nettoyé la rue seul. Terrifiant.";}else{joueur.mental-=3; return "Vous avez failli y passer. Traumatisme.";}}},
                {txt: "Fuir par les toits (Furtivité 9)", action:()=>{if(joueur.stats.furtivite>=9){return "Une fuite spectaculaire au-dessus du chaos.";}else{joueur.risquePrison+=30; return "Repéré par les hélicoptères de police.";}}},
                {txt: "Faire le mort sous le lit", action:()=>{joueur.mental-=2; return "Lâche, mais vous restez en vie.";}}
            ] 
        },
        { 
            titre: "Infiltration de la planque", desc: "Votre serrure a été subtilement crochetée.", 
            choix: [
                {txt: "Payer des mercenaires (40000€)", action:()=>{if(joueur.argent>=40000){joueur.argent-=40000; return "Votre planque est devenue un véritable bunker.";}else{return "Pas assez d'argent.";}}},
                {txt: "Poser des pièges (Intel 8)", action:()=>{if(joueur.stats.intel>=8){return "Défenses mortelles activées.";}else{joueur.risquePrison+=20; return "Vos propres caméras piratées vous incriminent.";}}},
                {txt: "Attendre le cambrioleur (Force 8)", action:()=>{if(joueur.stats.force>=8){joueur.crainte+=4; return "Le voleur a fini enroulé dans un tapis.";}else{joueur.argentPerdu+=20000; joueur.argent-=20000; return "Il vous a assommé et volé 20 000€.";}}}
            ] 
        },
        { 
            titre: "Traîtrise de haut vol", desc: "Un associé de longue date s'apprête à témoigner contre vous.", 
            choix: [
                {txt: "Acheter son avocat (50000€)", action:()=>{if(joueur.argent>=50000){joueur.argent-=50000; return "Témoignage annulé pour vice de procédure.";}else{allerEnPrison("Il a tout balancé au juge."); return "C'est la fin du voyage.";}}},
                {txt: "Le neutraliser (Furtivité 9)", action:()=>{if(joueur.stats.furtivite>=9){joueur.moralite-=3; return "Une disparition bien mystérieuse...";}else{allerEnPrison("Pris en flagrant délit par la protection des témoins."); return "Erreur fatale.";}}},
                {txt: "Fuir à l'étranger (-50% cash)", action:()=>{joueur.argent = Math.floor(joueur.argent/2); joueur.heat=0; joueur.risquePrison=0; return "Moitié de votre fortune laissée derrière, mais vous repartez à zéro.";}}
            ] 
        },
        { 
            titre: "Saccage par un parrain", desc: "Le syndicat réclame 30% de vos gains ou votre tête.", 
            choix: [
                {txt: "Payer la dîme (Perd 30% du cash)", action:()=>{let tax=Math.floor(joueur.argent*0.3); joueur.argent-=tax; joueur.argentPerdu+=tax; return `Vous courbez l'échine et payez ${tax}€.`;}},
                {txt: "Décapiter l'organisation (Force 10)", action:()=>{if(joueur.stats.force>=10){joueur.respect+=10; joueur.crainte+=10; return "Vous êtes le nouveau boss incontesté de la ville.";}else{allerEnPrison("La vendetta a raté, on vous a livré aux flics."); return "Échec cuisant.";}}},
                {txt: "Pirater leurs comptes (Intel 9)", action:()=>{if(joueur.stats.intel>=9){joueur.argent+=100000; return "Vous les avez ruinés ! (+100 000€).";}else{joueur.mental-=4; return "Ils ont mis un contrat sur votre tête.";}}}
            ] 
        },
        { 
            titre: "Mandat imminent", desc: "Une taupe prévient que le SWAT arrive à l'aube.", 
            choix: [
                {txt: "Brûler la planque (Furtivité 8)", action:()=>{if(joueur.stats.furtivite>=8){return "Il ne reste que des cendres de vos preuves.";}else{joueur.risquePrison+=40; return "La fumée a attiré les pompiers trop tôt !";}}},
                {txt: "Appeler un nettoyeur pro (40000€)", action:()=>{if(joueur.argent>=40000){joueur.argent-=40000; joueur.niveauSurveillance=0; return "L'endroit est cliniquement propre.";}else{allerEnPrison("Impossible d'effacer les preuves à temps."); return "La descente vous a surpris.";}}},
                {txt: "Se rendre pour négocier (Intel 8)", action:()=>{if(joueur.stats.intel>=8){joueur.risquePrison=0; return "Vous avez trouvé un vice de procédure dans le mandat. Libre.";}else{allerEnPrison("Le FBI ne négocie pas avec vous."); return "Derrière les barreaux.";}}}
            ] 
        },
        { 
            titre: "Enlèvement d'un proche", desc: "Un cartel rival a kidnappé un de vos receleurs.", 
            choix: [
                {txt: "Payer la rançon (50000€)", action:()=>{if(joueur.argent>=50000){joueur.argent-=50000; joueur.respect++; return "Argent transféré, le receleur est libre.";}else{return "Vous n'avez pas l'argent pour le sauver.";}}},
                {txt: "Mener l'assaut (Force 9)", action:()=>{if(joueur.stats.force>=9){joueur.crainte+=5; joueur.moralite-=2; return "Un bain de sang, mais il est sauf.";}else{joueur.mental-=5; return "Il a péri dans les échanges de tirs croisés.";}}},
                {txt: "Le sacrifier froidement (Mental 8)", action:()=>{if(joueur.mental>=8){joueur.crainte+=5; joueur.moralite-=4; return "Le cartel a compris que vous n'aviez aucune faiblesse.";}else{joueur.mental-=4; return "La culpabilité va vous empêcher de dormir longtemps.";}}}
            ] 
        },
        { 
            titre: "Piratage de comptes", desc: "Un hacker inconnu siphonne vos fonds non blanchis.", 
            choix: [
                {txt: "Contre-attaque cyber (Intel 10)", action:()=>{if(joueur.stats.intel>=10){joueur.argent+=50000; return "Vous l'avez hacké en retour ! (+50 000€).";}else{joueur.argent=Math.floor(joueur.argent*0.8); return "20% de votre cash a été volatilisé !";}}},
                {txt: "Payer une firme de cybersécu (30000€)", action:()=>{if(joueur.argent>=30000){joueur.argent-=30000; return "Le bouclier est actif, fonds sécurisés.";}else{joueur.argent=Math.floor(joueur.argent*0.5); return "La moitié de vos fonds s'est évaporée.";}}},
                {txt: "Ne rien pouvoir faire", action:()=>{joueur.argent=Math.floor(joueur.argent*0.7); joueur.mental-=2; return "Vous regardez 30% de votre argent disparaître, impuissant.";}}
            ] 
        },
        { 
            titre: "Témoin clé", desc: "Un gardien traumatisé vous a reconnu dans la rue.", 
            choix: [
                {txt: "Acheter son silence (60000€)", action:()=>{if(joueur.argent>=60000){joueur.argent-=60000; return "Il vit désormais confortablement aux Bahamas.";}else{allerEnPrison("Faute de pot-de-vin, il a témoigné au procès."); return "Coupable.";}}},
                {txt: "Le faire disparaître (Furtivité 10)", action:()=>{if(joueur.stats.furtivite>=10){joueur.moralite-=5; return "Il a eu un accident de voiture très tragique...";}else{allerEnPrison("Le corps a été retrouvé très vite."); return "Perpétuité.";}}},
                {txt: "Convaincre par la psycho (Mental 9)", action:()=>{if(joueur.mental>=9){return "Vous l'avez tellement embrouillé qu'il croit s'être trompé.";}else{joueur.risquePrison+=40; return "Il a pris peur et a couru au poste le plus proche !";}}}
            ] 
        },
        { 
            titre: "Embuscade routière", desc: "La route est bloquée par des véhicules banalisés armés.", 
            choix: [
                {txt: "Forcer le barrage (Force 9)", action:()=>{if(joueur.stats.force>=9){return "Votre pare-choc renforcé a fait voler leurs voitures en éclats !";}else{allerEnPrison("Votre moteur a calé sous la pluie de balles."); return "Terminus.";}}},
                {txt: "Manœuvre évasive (Furtivité 9)", action:()=>{if(joueur.stats.furtivite>=9){return "Un dérapage contrôlé et vous disparaissez dans la nuit.";}else{allerEnPrison("Pneus crevés par une herse cachée."); return "Fini de rouler.";}}},
                {txt: "Abandonner le véhicule (50000€)", action:()=>{if(joueur.argent>=50000){joueur.argent-=50000; joueur.heat+=20; return "Vous fuyez à pied dans la forêt, laissant le cash derrière vous.";}else{allerEnPrison("Rattrapé par les chiens dans la boue."); return "Capture.";}}}
            ] 
        },
        { 
            titre: "Billets Marqués", desc: "Le butin de votre dernier casse contenait des traceurs fédéraux !", 
            choix: [
                {txt: "Blanchir en urgence (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000; return "Vos contacts ont nettoyé les numéros de série.";}else{allerEnPrison("Interpellé en train d'utiliser de l'argent marqué !"); return "Fin de cavale.";}}},
                {txt: "Brûler les liasses (Perd 20% cash)", action:()=>{let p = Math.floor(joueur.argent*0.2); joueur.argent-=p; joueur.moralite--; return `Vous brûlez ${p}€ dans un baril d'acide. Douloureux.`;}},
                {txt: "Garder et risquer le coup", action:()=>{joueur.risquePrison+=25; return "Les traceurs bipent dans votre coffre (Risque +25).";}}
            ] 
        },
        { 
            titre: "La Rumeur Sanglante", desc: "Le milieu parle de vos exécutions. On doute de votre stabilité.", 
            choix: [
                {txt: "Revendiquer la terreur", action:()=>{joueur.crainte+=5; joueur.heat+=20; return "Message clair : personne n'est à l'abri (Crainte +5, Heat +20).";}},
                {txt: "Faire taire la rumeur (Intel 8)", action:()=>{if(joueur.stats.intel>=8){return "Campagne de désinformation réussie. La rumeur s'éteint.";}else{joueur.mental-=2; return "Personne ne vous croit. La paranoïa s'installe (Mental -2).";}}},
                {txt: "Payer les indics (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000; return "Les bouches se ferment à coup de billets de 100.";}else{joueur.respect-=3; return "Incapable de payer. Vous passez pour un fou fauché.";}}}
            ] 
        }
    ],
    prison: [
        { 
            titre: "Douches froides", desc: "Un gang rival vous coince dans les douches.", 
            choix: [
                {txt: "Se battre (Force 7)", action:()=>{if(joueur.stats.force>=7){joueur.crainte+=3; return "Vous avez couché le chef de gang devant tout le monde (Crainte +3).";}else{joueur.mental-=2; return "Battu à sang, vous vous réveillez à l'infirmerie (Mental -2).";}}},
                {txt: "Esquiver (Furtivité 6)", action:()=>{if(joueur.stats.furtivite>=6){return "Vous avez glissé entre leurs doigts et rejoint le surveillant.";}else{joueur.mental--; return "Attrapé par le col. Humiliation publique (Mental -1).";}}},
                {txt: "Payer la protection (5000€)", action:()=>{if(joueur.argent>=5000){joueur.argent-=5000; joueur.argentPerdu+=5000; return "Vous racketter vous coûte 5000€, mais vous êtes entier.";}else{joueur.mental-=2; return "Pas de cash. Le passage à tabac est sévère.";}}}
            ] 
        },
        { 
            titre: "Le Marché Noir Pénitentiaire", desc: "Un maton corrompu propose ses services à travers les barreaux.", 
            choix: [
                {txt: "Acheter un tel crypté (8000€)", action:()=>{if(joueur.argent>=8000){joueur.argent-=8000; joueur.argentPerdu+=8000; joueur.stats.intel++; return "Vous continuez à gérer vos affaires depuis la cellule (Intel +1).";}else{return "Fonds insuffisants.";}}},
                {txt: "Acheter des stéroïdes (5000€)", action:()=>{if(joueur.argent>=5000){joueur.argent-=5000; joueur.argentPerdu+=5000; joueur.stats.force++; return "Pompes et stéroïdes. Vous devenez un monstre (Force +1).";}else{return "Fonds insuffisants.";}}},
                {txt: "Refuser pour faire profil bas", action:()=>{joueur.mental++; return "Moins on se fait remarquer en prison, mieux on se porte (Mental +1).";}}
            ] 
        },
        { 
            titre: "Projet d'évasion", desc: "Des détenus creusent un tunnel sous les cuisines.", 
            choix: [
                {txt: "Tenter l'évasion (Furtivité 8)", action:()=>{if(joueur.stats.furtivite>=8){joueur.peineActuelle=0; return "Vous rampez dans la boue... et voyez la lumière ! Évasion réussie !";}else{joueur.peineActuelle+=3; return "Les chiens vous ont rattrapé à la lisière du bois. +3 ans fermes.";}}},
                {txt: "Les dénoncer au directeur", action:()=>{joueur.peineActuelle=Math.max(1, joueur.peineActuelle-2); joueur.respect-=5; return "Remise de peine accordée (-2 ans), mais vous êtes marqué au fer rouge (Respect -5).";}},
                {txt: "Fermer les yeux et attendre", action:()=>{return "Pas vos affaires. Vous laissez les autres risquer leur peau.";}}
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
    let textRisque = joueur.enPrison ? `<span style="color:#8b949e;text-decoration:line-through;">EN TAULE</span>` : `${joueur.risquePrison}%`;
    let texteSurveillance = joueur.niveauSurveillance > 0 ? `<div style="color:#da3633; text-align:center; padding-top: 10px; margin-top: 5px; border-top: 1px solid #30363d;">👁️ Fiché (Malus : -${joueur.niveauSurveillance * 10}%)</div>` : "";
    
    document.getElementById('global-stats').innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 14px;">
            
            <!-- En-tête : Âge et Argent -->
            <div style="display: flex; justify-content: space-between; color:#79c0ff; border-bottom: 1px solid #30363d; padding-bottom: 8px;">
                <span style="white-space: nowrap;">👤 ${joueur.age} ans (M: ${joueur.mois})</span>
                <span style="white-space: nowrap;">💰 ${joueur.argent.toLocaleString()} €</span>
            </div>
            
            <!-- Corps : Compétences et Réputation (2 colonnes) -->
            <div style="display: flex; justify-content: space-between; gap: 10px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <span style="white-space: nowrap;">💪 Force : ${joueur.stats.force}</span>
                    <span style="white-space: nowrap;">🧠 Intel : ${joueur.stats.intel}</span>
                    <span style="white-space: nowrap;">🥷 Furtivité : ${joueur.stats.furtivite}</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; text-align: right;">
                    <span style="white-space: nowrap;">👑 Respect : ${joueur.respect}</span>
                    <span style="white-space: nowrap;">💀 Crainte : ${joueur.crainte}</span>
                    <span style="white-space: nowrap;">🧠 Mental : ${joueur.mental}/10</span>
                </div>
            </div>

            <!-- Pied : Jauges de danger et moralité -->
            <div style="border-top: 1px solid #30363d; padding-top: 10px; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; justify-content: space-between;">
                    <span style="white-space: nowrap;">⚖️ Moralité : ${joueur.moralite}/10</span>
                    <span class="heat-text" style="white-space: nowrap;">🔥 Heat : ${joueur.heat}%</span>
                </div>
                <div class="danger-text" style="text-align: center; margin-top: 4px; font-weight: bold;">
                    🚨 Risque Global : ${textRisque}
                </div>
            </div>
            
            ${texteSurveillance}
        </div>
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
                <div style="display:flex; gap:10px; margin-top:8px;">
                    <button class="btn-choix" style="padding:8px; margin:0; flex:1;" onclick="virerRecrue(${index})">Virer</button>
                    <button class="btn-action" style="padding:8px; border-radius:6px; border:none; cursor:pointer; flex:1; font-weight:bold;" onclick="executerRecrue(${index})">Exécuter</button>
                </div>
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
