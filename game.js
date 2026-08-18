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
                {txt: "Utiliser la carte de crédit (Intel 6)", action:()=>{if(joueur.stats.intel>=6){joueur.argent+=5000; notify("Achat en ligne intraçable réussi (+5000€).");}else{joueur.risquePrison+=20; notify("La fraude a été signalée ! Risque +20.");}}}
            ] 
        }
    ],
    moyen: [
        { 
            titre: "Chantage au flash", desc: "Un automobiliste possède une photo de vous près d'une cible.", 
            choix: [
                {txt: "Payer le maître chanteur (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000;joueur.argentPerdu+=10000; notify("Silence acheté.");}else{joueur.heat+=25; notify("Photo publiée ! Heat +25.");}}}, 
                {txt: "Le traquer et détruire son téléphone (Force 6)", action:()=>{if(joueur.stats.force>=6){notify("Problème réglé violemment.");}else{joueur.risquePrison+=20; notify("Il s'est enfui et a tout balancé. Risque +20.");}}},
                {txt: "Pirater son Cloud (Intel 7)", action:()=>{if(joueur.stats.intel>=7){notify("Photo supprimée à distance.");}else{joueur.heat+=15; notify("Piratage échoué.");}}}
            ] 
        },
        { 
            titre: "Concurrence déloyale", desc: "Un autre gang revendique votre territoire.", 
            choix: [
                {txt: "Affirmer son autorité (Force 7)", action:()=>{if(joueur.stats.force>=7){joueur.respect+=3;notify("Ils ont reculé en tremblant.");}else{joueur.mental-=2; joueur.heat+=20; notify("Passage à tabac. Mental en berne.");}}},
                {txt: "Proposer un partage des gains (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000; notify("Accord conclu dans le sang.");}else{notify("Vous n'avez pas l'argent.");}}},
                {txt: "Les balancer anonymement (Intel 6)", action:()=>{if(joueur.stats.intel>=6){joueur.heat-=20; notify("Vos rivaux sont sous les verrous.");}else{joueur.crainte-=2; notify("Ils ont découvert que vous étiez une balance.");}}}
            ] 
        },
        { 
            titre: "Le corbeau", desc: "Une lettre détaille vos derniers déplacements mystérieusement.", 
            choix: [
                {txt: "Changer de planque en urgence (20000€)", action:()=>{if(joueur.argent>=20000){joueur.argent-=20000;joueur.argentPerdu+=20000;notify("Déménagement réussi.");}else{joueur.risquePrison+=25;notify("Vous restez, la peur au ventre.");}}},
                {txt: "Tendre un guet-apens (Furtivité 7)", action:()=>{if(joueur.stats.furtivite>=7){joueur.crainte+=3; notify("Vous avez attrapé le fouineur.");}else{joueur.mental-=2; notify("Il ne s'est jamais montré. Paranoïa.");}}},
                {txt: "Ignorer superbement la menace", action:()=>{joueur.risquePrison+=15; joueur.mental++; notify("Vous avez des nerfs d'acier, mais c'est risqué.");}}
            ] 
        },
        { 
            titre: "Interrogatoire subtil", desc: "Un inspecteur en civil vous aborde au café.", 
            choix: [
                {txt: "Garder son sang-froid absolu (Mental 7)", action:()=>{if(joueur.mental>=7){joueur.heat-=10; notify("Il n'a rien vu. Heat en baisse.");}else{joueur.risquePrison+=20; notify("Vous avez transpiré à grosses gouttes !");}}},
                {txt: "Se faire passer pour un indic (Intel 6)", action:()=>{if(joueur.stats.intel>=6){joueur.respect++; notify("Il vous croit de son côté.");}else{joueur.heat+=20; notify("Mensonge grossier. Il vous a à l'œil.");}}},
                {txt: "L'envoyer balader sèchement", action:()=>{joueur.crainte++; joueur.heat+=15; notify("L'inspecteur vous a mis sur liste rouge.");}}
            ] 
        },
        { 
            titre: "Dette de comparses", desc: "Un ancien complice libéré réclame sa part oubliée.", 
            choix: [
                {txt: "Lui donner son dû (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000;joueur.argentPerdu+=15000;joueur.respect+=2;notify("La loyauté paie dans le milieu.");}else{joueur.risquePrison+=15;notify("Il va se venger.");}}},
                {txt: "Lui offrir un job en compensation", action:()=>{notify("Il intègre temporairement vos équipes. Cible prochaine plus facile.");}},
                {txt: "Le chasser avec perte et fracas (Force 6)", action:()=>{if(joueur.stats.force>=6){joueur.crainte+=2; notify("Il a fui la queue entre les jambes.");}else{joueur.mental-=2; notify("Bagarre perdue. Humiliation.");}}}
            ] 
        },
        { 
            titre: "Contrôle fiscal surprise", desc: "L'État s'étonne de votre train de vie.", 
            choix: [
                {txt: "Graisser la patte de l'auditeur (25000€)", action:()=>{if(joueur.argent>=25000){joueur.argent-=25000;joueur.argentPerdu+=25000;notify("Dossier classé sans suite.");}else{joueur.risquePrison+=30;notify("Redressement judiciaire !");}}},
                {txt: "Falsifier les documents (Intel 8)", action:()=>{if(joueur.stats.intel>=8){notify("Vous passez pour un modeste employé.");}else{joueur.risquePrison+=25;notify("Fraude découverte.");}}},
                {txt: "Fuir temporairement le pays (Perd 1 mois)", action:()=>{joueur.mois+=1; joueur.heat-=20; notify("Vos affaires stagnent, mais vous êtes sauf.");}}
            ] 
        },
        { 
            titre: "Matériel défectueux", desc: "Vos outils achetés récemment lâchent en pleine rue.", 
            choix: [
                {txt: "Racheter du matos certifié (15000€)", action:()=>{if(joueur.argent>=15000){joueur.argent-=15000;joueur.argentPerdu+=15000;notify("Outils réparés.");}else{notify("Fonds insuffisants.");}}},
                {txt: "Réparer avec les moyens du bord (Intel 6)", action:()=>{if(joueur.stats.intel>=6){notify("Système D fonctionnel.");}else{joueur.stats.intel--; notify("Le matos est flingué. Intel -1.");}}},
                {txt: "Aller casser la figure du vendeur (Force 7)", action:()=>{if(joueur.stats.force>=7){joueur.argent+=5000; notify("Remboursement forcé.");}else{joueur.heat+=15; notify("Il a appelé la sécurité.");}}}
            ] 
        },
        { 
            titre: "Course-poursuite urbaine", desc: "Vous êtes filé par deux hommes en trench-case.", 
            choix: [
                {txt: "Semer les ombres (Furtivité 7)", action:()=>{if(joueur.stats.furtivite>=7){notify("Vous disparaissez dans la foule.");}else{joueur.heat+=25; notify("Ils ont repéré votre planque !");}}},
                {txt: "Les affronter dans une ruelle (Force 8)", action:()=>{if(joueur.stats.force>=8){joueur.crainte+=3; notify("Deux flics sur le carreau.");}else{joueur.risquePrison+=30; notify("C'était les stups. Grosse galère.");}}},
                {txt: "Jeter des liasses pour créer une émeute (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000; notify("Foule en délire, fuite parfaite.");}else{notify("Pas assez d'argent.");}}}
            ] 
        },
        { 
            titre: "Voisinage curieux", desc: "Un voisin insiste pour tout savoir sur vos nuits dehors.", 
            choix: [
                {txt: "L'embrouiller avec une couverture (Mental 6)", action:()=>{if(joueur.mental>=6){notify("Il vous prend pour un trader de nuit.");}else{joueur.risquePrison+=15; notify("Il n'y a pas cru une seconde.");}}},
                {txt: "Déménager discrètement (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000; notify("Tranquillité d'esprit achetée.");}else{notify("Impossible de déménager.");}}},
                {txt: "Le terrifier (Crainte +2, Moralité -1)", action:()=>{joueur.crainte+=2; joueur.moralite--; notify("Il baisse les yeux quand il vous croise.");}}
            ] 
        },
        { 
            titre: "Fuite d'informations", desc: "Des rumeurs circulent sur les forums underground.", 
            choix: [
                {txt: "Piratage préventif (Intel 7)", action:()=>{if(joueur.stats.intel>=7){notify("Traces effacées.");}else{joueur.niveauSurveillance++; notify("Surveillance +1.");}}},
                {txt: "Lancer une fausse piste (10000€)", action:()=>{if(joueur.argent>=10000){joueur.argent-=10000; joueur.heat-=15; notify("La police suit le mauvais gars.");}else{notify("Pas assez d'argent.");}}},
                {txt: "Ne rien faire", action:()=>{joueur.heat+=20; notify("La rumeur enfle dangereusement.");}}
            ] 
        }
    ],
    complique: [
        { 
            titre: "Piège du FBI", desc: "Un indic propose un faux plan d'attaque juteux.", 
            choix: [
                {txt: "Analyser le piège réseau (Intel 9)", action:()=>{if(joueur.stats.intel>=9){notify("Piège évité et retourné !");}else{allerEnPrison("C'était un guet-apens fédéral !");}}},
                {txt: "Payer un autre gang pour y aller (30000€)", action:()=>{if(joueur.argent>=30000){joueur.argent-=30000; joueur.heat-=30; notify("Ils se sont fait prendre à votre place. Heat -30.");}else{notify("Impossible de payer.");}}},
                {txt: "L'ignorer sagement", action:()=>{joueur.mental++; notify("La prudence est mère de sûreté.");}}
            ] 
        },
        { 
            titre: "Fusillade interlope", desc: "Un règlement de comptes éclate au bas de votre immeuble.", 
            choix: [
                {txt: "Sécuriser le périmètre et tirer (Force 9)", action:()=>{if(joueur.stats.force>=9){joueur.crainte+=5; notify("Vous avez nettoyé la rue seul.");}else{joueur.mental-=3; notify("Vous avez failli y passer. Traumatisme.");}}},
                {txt: "S'enfuir par les toits (Furtivité 9)", action:()=>{if(joueur.stats.furtivite>=9){notify("Fuite spectaculaire.");}else{joueur.risquePrison+=30; notify("Repéré par les hélicos en fuyant.");}}},
                {txt: "Faire le mort sous le lit", action:()=>{joueur.mental-=2; notify("Lâche mais vivant.");}}
            ] 
        },
        { 
            titre: "Infiltration de la planque", desc: "Votre serrure a été subtilement crochetée.", 
            choix: [
                {txt: "Payer des mercenaires (40000€)", action:()=>{if(joueur.argent>=40000){joueur.argent-=40000; notify("La planque est un bunker.");}else{notify("Pas d'argent.");}}},
                {txt: "Poser des pièges soi-même (Intel 8)", action:()=>{if(joueur.stats.intel>=8){notify("Défenses mortelles activées.");}else{joueur.risquePrison+=20; notify("Vos propres caméras vous incriminent.");}}},
                {txt: "Attendre le cambrioleur (Force 8)", action:()=>{if(joueur.stats.force>=8){joueur.crainte+=4; notify("Le voleur a fini dans un tapis.");}else{joueur.argentPerdu+=20000; joueur.argent-=20000; notify("Il vous a assommé et volé 20 000€.");}}}
            ] 
        },
        { 
            titre: "Traîtrise de haut vol", desc: "Un associé de longue date s'apprête à témoigner contre vous.", 
            choix: [
                {txt: "Acheter son avocat (50000€)", action:()=>{if(joueur.argent>=50000){joueur.argent-=50000; notify("Témoignage annulé pour vice de procédure.");}else{allerEnPrison("Il a tout balancé au juge.");}}},
                {txt: "Le neutraliser avant l'audience (Furtivité 9)", action:()=>{if(joueur.stats.furtivite>=9){joueur.moralite-=3; notify("Disparition mystérieuse.");}else{allerEnPrison("Pris en flagrant délit de tentative de meurtre.");}}},
                {txt: "Fuir à l'étranger (Reset Heat et Risque, -50% cash)", action:()=>{joueur.argent = Math.floor(joueur.argent/2); joueur.heat=0; joueur.risquePrison=0; notify("Nouvelle vie, mais à quel prix ?");}}
            ] 
        },
        { 
            titre: "Saccage par un parrain", desc: "Le syndicat réclame 30% de vos gains ou votre tête.", 
            choix: [
                {txt: "Payer la dîme (Perd 30% du cash)", action:()=>{let tax=Math.floor(joueur.argent*0.3); joueur.argent-=tax; joueur.argentPerdu+=tax; notify("Vous baissez la tête.");}},
                {txt: "Décapiter l'organisation (Force 10)", action:()=>{if(joueur.stats.force>=10){joueur.respect+=10; joueur.crainte+=10; notify("Vous êtes le nouveau boss en ville.");}else{allerEnPrison("Vendetta ratée, ils vous ont livré aux flics.");}}},
                {txt: "Pirater leurs comptes offshore (Intel 9)", action:()=>{if(joueur.stats.intel>=9){joueur.argent+=100000; notify("Vous les avez ruinés. +100 000€.");}else{joueur.mental-=4; notify("Ils ont mis un contrat sur vous.");}}}
            ] 
        },
        { 
            titre: "Mandat imminent", desc: "Une taupe prévient que le SWAT arrive à l'aube.", 
            choix: [
                {txt: "Brûler la planque et fuir (Furtivité 8)", action:()=>{if(joueur.stats.furtivite>=8){notify("Il ne reste que des cendres.");}else{joueur.risquePrison+=40; notify("Fumée repérée trop tôt !");}}},
                {txt: "Faire appel à un nettoyeur pro (40000€)", action:()=>{if(joueur.argent>=40000){joueur.argent-=40000; joueur.niveauSurveillance=0; notify("Lieu cliniquement propre.");}else{allerEnPrison("Impossible d'effacer les preuves.");}}},
                {txt: "Se rendre pour négocier (Intel 8)", action:()=>{if(joueur.stats.intel>=8){joueur.risquePrison=0; notify("Vice de procédure trouvé. Libre.");}else{allerEnPrison("Ils ne négocient pas avec vous.");}}}
            ] 
        },
        { 
            titre: "Enlèvement d'un proche", desc: "Un cartel rival a kidnappé un de vos receleurs.", 
            choix: [
                {txt: "Payer la rançon (50000€)", action:()=>{if(joueur.argent>=50000){joueur.argent-=50000; joueur.respect++; notify("Il est libre.");}else{notify("Vous n'avez pas l'argent...");}}},
                {txt: "Mener l'assaut (Force 9, Moralité -2)", action:()=>{if(joueur.stats.force>=9){joueur.crainte+=5; joueur.moralite-=2; notify("Bain de sang. Receleur sauvé.");}else{joueur.mental-=5; notify("Il est mort dans les échanges de tirs.");}}},
                {txt: "Le sacrifier froidement (Mental 8)", action:()=>{if(joueur.mental>=8){joueur.crainte+=5; joueur.moralite-=4; notify("Le cartel a compris que vous étiez sans cœur.");}else{joueur.mental-=4; notify("La culpabilité vous ronge.");}}}
            ] 
        },
        { 
            titre: "Piratage de comptes", desc: "Un hacker inconnu siphonne vos fonds non blanchis.", 
            choix: [
                {txt: "Contre-attaque cybernétique (Intel 10)", action:()=>{if(joueur.stats.intel>=10){joueur.argent+=50000; notify("Vous l'avez hacké en retour ! +50 000€");}else{joueur.argent=Math.floor(joueur.argent*0.8); notify("20% du cash volatilisé !");}}},
                {txt: "Payer une firme de cybersécurité (30000€)", action:()=>{if(joueur.argent>=30000){joueur.argent-=30000; notify("Fonds sécurisés.");}else{joueur.argent=Math.floor(joueur.argent*0.5); notify("Moitié du cash perdu.");}}},
                {txt: "Ne rien pouvoir faire", action:()=>{joueur.argent=Math.floor(joueur.argent*0.7); joueur.mental-=2; notify("30% des fonds ont disparu.");}}
            ] 
        },
        { 
            titre: "Témoin clé", desc: "Un gardien de sécurité traumatisé vous a reconnu dans la rue.", 
            choix: [
                {txt: "Acheter son silence à vie (60000€)", action:()=>{if(joueur.argent>=60000){joueur.argent-=60000; notify("Il vit désormais aux Bahamas.");}else{allerEnPrison("Faute d'argent, il a témoigné.");}}},
                {txt: "Le faire disparaître (Furtivité 10, Moralité -5)", action:()=>{if(joueur.stats.furtivite>=10){joueur.moralite-=5; notify("Un accident tragique...");}else{allerEnPrison("Le corps a été retrouvé !");}}},
                {txt: "Le convaincre par la psychologie (Mental 9)", action:()=>{if(joueur.mental>=9){notify("Il croit s'être trompé. Lavage de cerveau.");}else{joueur.risquePrison+=40; notify("Il a couru au poste !");}}}
            ] 
        },
        { 
            titre: "Embuscade routière", desc: "La route est bloquée par des véhicules banalisés armés.", 
            choix: [
                {txt: "Forcer le barrage au bélier (Force 9)", action:()=>{if(joueur.stats.force>=9){notify("Passage en force épique !");}else{allerEnPrison("Moteur calé sous les balles.");}}},
                {txt: "Manœuvre évasive extrême (Furtivité 9)", action:()=>{if(joueur.stats.furtivite>=9){notify("Vous vous êtes fondu dans la nuit.");}else{allerEnPrison("Pneus crevés par une herse.");}}},
                {txt: "Abandonner le véhicule et 50000€", action:()=>{if(joueur.argent>=50000){joueur.argent-=50000; joueur.heat+=20; notify("Vous fuyez à pied dans les bois.");}else{allerEnPrison("Rattrapé dans les champs.");}}}
            ] 
        }
    ]
};
