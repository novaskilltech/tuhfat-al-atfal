(function () {
  const ar = window.TUHFA;
  const meta = [
    ['Introduction de l’auteur','1–5','L’intention, la louange et le sujet du poème.', ['rājī : celui qui espère','naẓm : texte versifié','murīd : l’étudiant'], '﴿وَقُلْ رَبِّ زِدْنِي عِلْمًا﴾ — Ṭā-Hā, 20:114', 'Ne pas confondre mémorisation du texte et correction de la récitation.', 'Quels sont les deux sujets annoncés par l’auteur ?'],
    ['Nūn sākinah et tanwīn','6–16','Quatre règles : iẓhār, idghām, iqlāb et ikhfāʾ.', ['nūn sākinah : نْ','tanwīn : ـً ـٍ ـٌ','ghunnah : résonance nasale'], '﴿مِنْ عِلْمٍ﴾ — an-Najm, 53:28 : iẓhār devant ʿayn.', 'Il faut toujours observer la lettre qui suit la nūn ou le tanwīn.', 'Quelle est la règle dans «مِنْ عِلْمٍ» ?'],
    ['Mīm et nūn mushaddadah','17','Toute mīm ou nūn redoublée se lit avec une ghunnah de deux temps.', ['shaddah : deux lettres, la première immobile','deux temps : durée régulière, non comptée avec les doigts'], '﴿إِنَّا أَعْطَيْنَاكَ﴾ — al-Kawthar, 108:1.', 'Ne pas prolonger la ghunnah au-delà de sa durée.', 'Repérez la ghunnah dans «إِنَّا».'],
    ['Mīm sākinah','18–23','Trois règles : ikhfāʾ shafawī devant bāʾ, idghām shafawī devant mīm, iẓhār shafawī ailleurs.', ['shafawī : lié aux lèvres','ikhfāʾ shafawī : مْ avant ب','idghām shafawī : مْ avant م'], '﴿تَرْمِيهِمْ بِحِجَارَةٍ﴾ — al-Fīl, 105:4.', 'Devant wāw et fāʾ, faites bien apparaître la mīm.', 'Quelle est la règle dans «عَلَيْهِمْ وَلَا» ?'],
    ['Lām de «الـ» et lām du verbe','24–29','La lām est lunaire (prononcée) ou solaire (assimilée). La lām verbale est prononcée dans les exemples cités.', ['lunaire : lām audible','solaire : lām assimilée','lām du verbe : lām constitutive du verbe'], '﴿الْقَمَرَ﴾ — al-Qiyāmah, 75:9 ; ﴿الشَّمْسِ﴾ — ash-Shams, 91:1.', 'Ne pas supprimer la lām lunaire, ni prononcer la lām solaire.', 'Classez «الْفَلَق» et «النَّاس».'],
    ['Lettres semblables, proches et homogènes','30–34','La comparaison des points d’articulation et des attributs distingue mutamāthilayn, mutaqāribayn et mutajānisayn.', ['makhraj : point d’articulation','ṣifah : qualité de la lettre','ṣaghīr : première lettre immobile','kabīr : deux lettres vocalisées'], '﴿قَدْ تَبَيَّنَ﴾ — al-Baqarah, 2:256 : exemple étudié des lettres homogènes.', 'Ne pas appliquer une assimilation sans connaître la riwāya et le mot.', 'Quelle différence entre semblables et homogènes ?'],
    ['Fondements du madd et lettres de līn','35–41','Le madd naturel ne dépend ni d’une hamzah ni d’un sukūn. Les lettres de madd sont alif, wāw et yāʾ selon leurs conditions.', ['madd naturel : deux temps','lettre de madd : ا و ي sous conditions','lettre de līn : و ou ي immobile précédé d’une fatḥah'], '﴿قَالَ﴾ — al-Baqarah, 2:30 ; ﴿خَوْفٍ﴾ — al-Baqarah, 2:155.', 'Toute alif, wāw ou yāʾ n’est pas forcément une lettre de madd.', 'Trouvez la lettre de madd dans «قِيلَ».'],
    ['Règles du madd','42–47','Les madd sont obligatoire, permis ou nécessaire ; le madd secondaire a pour cause une hamzah ou un sukūn.', ['muttaṣil : hamzah et madd dans un mot','munfaṣil : séparés entre deux mots','ʿāriḍ : sukūn créé par l’arrêt','badal : hamzah avant la lettre de madd'], '﴿جَاءَ﴾ — al-Baqarah, 2:89 ; ﴿الْعَالَمِينَ﴾ — al-Fātiḥah, 1:2 à l’arrêt.', 'La durée se reçoit oralement : ne mélangez pas les options de lecture.', 'Classez «جَاءَ», «فِي أَنْفُسِكُمْ» et «آمَنُوا».'],
    ['Madd lāzim et débuts de sourates','48–57','Le madd nécessaire comporte quatre catégories : kalimī/ḥarfī, léger/lourd. Le ḥarfī se trouve dans certains débuts de sourates.', ['kalimī : dans un mot','ḥarfī : dans une lettre initiale','lourd : suivi d’assimilation','léger : sans assimilation'], '﴿الضَّالِّينَ﴾ — al-Fātiḥah, 1:7 ; ﴿الم﴾ — al-Baqarah, 2:1.', 'Les lettres isolées initiales ne se lisent pas comme des mots ordinaires.', 'Citez deux des quatre catégories du madd lāzim.'],
    ['Conclusion','58–61','Le poème s’achève par la louange et la prière sur le Prophète ﷺ.', ['an-nuhā : les intelligences','tārīkhuhā : date par valeur numérique des lettres','tābiʿ : successeur des Compagnons'], '﴿وَقُلِ الْحَمْدُ لِلَّهِ﴾ — an-Naml, 27:93.', 'Ne pas délaisser les règles pour le seul calcul de la date.', 'Par quoi le poème commence-t-il et se termine-t-il ?']
  ];
  const ui = {oneLine:'En une phrase',simple:'Explication simple',detailed:'Explication détaillée',terms:'Vocabulaire',example:'Exemple coranique documenté',warning:'Erreur fréquente',exercise:'Question ou exercice',references:'Références de la leçon',copy:'Copier le vers',copied:'Copié',searchEmpty:'Aucune leçon ne correspond. Essayez un autre mot.',verseRange:'Vers',quizQuestion:'Question',of:'sur',correct:'Exact.',retry:'À revoir.',next:'Question suivante',restart:'Recommencer le quiz',source:'Référence d’application : le Coran, lecture de Ḥafṣ d’après ʿĀṣim.'};
  window.TUHFA = { language:'fr', title:'Tuḥfat al-aṭfāl, pas à pas', ui,
    sources:'Le Coran, lecture de Ḥafṣ d’après ʿĀṣim ; Fatḥ al-aqfāl ; texte de la Tuḥfat al-aṭfāl.',
    contact:{teacherPhone:'',message:'Bonjour professeur, j’ai une question de tajwīd ou je souhaite faire corriger la récitation d’un verset. Merci.',configure:'Le numéro WhatsApp du professeur doit encore être ajouté. Indiquez-le au format international pour activer ce contact.',available:'Votre crédit du jour : une question disponible.',used:'Votre crédit du jour a été utilisé. Un nouveau crédit sera disponible demain.'},
    lessons: ar.lessons.map((lesson,i) => { const m=meta[i]; const further=lesson.id==='noon'?{title:'Pour aller plus loin : Nuzhat al-mushtaghilīn',text:'« Nuzhat al-mushtaghilīn fī aḥkām an-nūn as-sākinah wa-t-tanwīn » d’Ibn al-Qāṣīḥ, étudié et édité par Ghānim Qaddūrī al-Ḥamad, est une référence spécialisée à lire après l’assimilation des fondements de ce chapitre.'}:null; return {id:lesson.id,title:m[0],range:m[1],rule:m[2],terms:m[3],example:m[4],warning:m[5],exercise:m[6],further,verses:lesson.verses}; }),
    verseExamples: ar.verseExamples,
    glossary:[
      ['Tajwīd','Donner à chaque lettre son droit et ce qui lui est dû, selon une transmission orale.'],['Nūn sākinah','Nūn sans voyelle, stable à la liaison comme à l’arrêt.'],['Tanwīn','Nūn ajoutée à l’oral, non écrite comme nūn, à la fin d’un nom.'],['Iẓhār','Prononcer distinctement la lettre depuis son point d’articulation.'],['Idghām','Faire entrer une lettre immobile dans une lettre vocalisée.'],['Iqlāb','Changer nūn/tanwīn en mīm cachée avant bāʾ avec ghunnah.'],['Ikhfāʾ','Prononcer entre iẓhār et idghām, en conservant la ghunnah.'],['Ghunnah','Résonance nasale qui sort du nez, liée à mīm et nūn.'],['Mīm sākinah','Mīm sans voyelle : ikhfāʾ, idghām ou iẓhār labial.'],['Iẓhār shafawī','Prononcer la mīm immobile devant toute lettre sauf bāʾ et mīm.'],['Lām lunaire','Lām de «الـ» qui est audible devant quatorze lettres.'],['Lām solaire','Lām de «الـ» assimilée à la lettre solaire suivante.'],['Mutamāthilayn','Deux lettres identiques par le point d’articulation et les attributs.'],['Mutajānisayn','Deux lettres de même articulation mais d’attributs différents.'],['Mutaqāribayn','Deux lettres proches par l’articulation ou les attributs.'],['Madd','Prolongation de la voix avec une lettre de madd ou de līn lorsque sa cause existe.'],['Madd naturel','Deux temps, sans hamzah ni sukūn comme cause.'],['Madd joint','Hamzah après la lettre de madd dans le même mot.'],['Madd séparé','Lettre de madd en fin de mot, hamzah au début du suivant.'],['Madd accidentel','Madd causé par un sukūn créé lors de l’arrêt.'],['Madd badal','Hamzah avant une lettre de madd dans un même mot.'],['Madd nécessaire','Sukūn originel après une lettre de madd, à la liaison et à l’arrêt.'],['Lettres de madd','Alif précédé d’une fatḥah, wāw d’une ḍammah, yāʾ d’une kasrah.'],['Lettre de līn','Wāw ou yāʾ immobile précédé d’une fatḥah.'],['Débuts de sourates','Lettres isolées qui ouvrent certaines sourates.']
    ],
    commentarySources:{
      intro:'Fatḥ al-aqfāl (al-Jamzūrī) ; Minḥat dhī al-jalāl (aḍ-Ḍabbāʿ).',
      noon:'Fatḥ al-aqfāl ; Minḥat dhī al-jalāl ; Aysar al-maqāl.',
      ghunna:'Fatḥ al-aqfāl ; Minḥat dhī al-jalāl.',
      meem:'Fatḥ al-aqfāl ; Minḥat dhī al-jalāl ; Aysar al-maqāl.',
      lam:'Fatḥ al-aqfāl ; Minḥat dhī al-jalāl.',
      idgham:'Minḥat dhī al-jalāl ; Aysar al-maqāl ; avec retour à Fatḥ al-aqfāl.',
      'madd-foundation':'Fatḥ al-aqfāl ; Minḥat dhī al-jalāl.',
      'madd-rules':'Fatḥ al-aqfāl ; Minḥat dhī al-jalāl ; Aysar al-maqāl.',
      'madd-lazim':'Fatḥ al-aqfāl ; Minḥat dhī al-jalāl ; Aysar al-maqāl.',
      ending:'Fatḥ al-aqfāl ; Minḥat dhī al-jalāl.'
    },
    chapterNotes:{
      intro:'Les commentaires expliquent la langue de l’ouverture et l’éthique de commencer par la louange et la prière.',
      noon:'Les commentaires déterminent la règle en regardant la lettre qui suit la nūn sākinah ou le tanwīn, avec les conditions propres à chaque cas.',
      ghunna:'Ils précisent que la ghunnah est une qualité de la mīm et de la nūn, particulièrement manifeste lorsqu’elles sont redoublées.',
      meem:'Ils distinguent les trois cas d’après la lettre suivante et insistent sur le rôle des lèvres.',
      lam:'Ils distinguent la lām de l’article défini de la lām verbale et leurs conditions d’exécution.',
      idgham:'Ces vers sont des définitions ; l’application exacte se complète par une récitation contrôlée.',
      'madd-foundation':'Les commentaires posent les conditions des lettres de madd et de līn, puis font du madd naturel la base des autres madd.',
      'madd-rules':'Ils relient les durées à la riwāya et à la voie de lecture, et non à une estimation personnelle.',
      'madd-lazim':'Ils répartissent le madd nécessaire selon le lieu du sukūn et l’assimilation, avec des règles propres aux lettres initiales.',
      ending:'Ils expliquent la clôture par la louange, la prière, et la date obtenue par la valeur numérique des lettres.'
    },
    nuzhat:{
      author:'Épître d’Ibn al-Qāṣīḥ (m. 801 H), rédigée ici sous forme de parcours pédagogique intégré au site, sans reproduire l’édition critique.',
      introduction:'La Nuzhat al-mushtaghilīn est consacrée à la nūn sākinah et au tanwīn, le chapitre traité dans les vers 6 à 16 de la Tuḥfah. Cette section en intègre les idées dans un parcours pratique : repérer, identifier la lettre suivante, puis réciter à voix contrôlée.',
      sections:[
        {title:'1. Point de départ : localiser la règle',lead:'La nūn sākinah est un nūn sans voyelle. Le tanwīn est un nūn ajouté à l’oral à la fin d’un nom. La règle dépend de la lettre qui suit.',points:['Repérez d’abord نْ ou le tanwīn.','La lettre suivante est la clé du jugement.','La durée de la ghunnah se reçoit oralement.'],example:'﴿مِنْ عِلْمٍ﴾ — an-Najm, 53:28 : nūn sākinah suivie de ʿayn.',practice:'Relevez trois tanwīn dans le Coran et notez la lettre suivante.',tuhfah:'Vers 6 : quatre règles pour nūn sākinah et tanwīn.'},
        {title:'2. Iẓhār de gorge',lead:'Devant ء هـ ع ح غ خ, la nūn sākinah ou le tanwīn se prononce distinctement, sans assimilation.',points:['Les six lettres sortent de la gorge.','Prononcer distinctement ne signifie pas supprimer la résonance naturelle du nūn.','Travaillez la transition vers la gorge sans effort.'],example:'﴿مِنْ عِلْمٍ﴾ — an-Najm, 53:28 ; ﴿مَنْ آمَنَ﴾ — al-Baqarah, 2:62.',practice:'Trouvez un exemple avec nūn sākinah et un autre avec tanwīn.',tuhfah:'Vers 7–8 : définition et lettres de l’iẓhār.'},
        {title:'3. Idghām : sens et conditions',lead:'L’idghām fait entrer nūn sākinah ou tanwīn dans une lettre de «يرملون» lorsque les deux lettres sont dans deux mots.',points:['Il n’a pas lieu à l’intérieur d’un mot : «الدنيا» et «صنوان» font exception.','Ses lettres sont ي ر م ل و ن.','Il existe avec ou sans ghunnah.'],example:'﴿مَنْ يَعْمَلْ﴾ — az-Zalzalah, 99:7.',practice:'Comparez «مَنْ يَعْمَلْ» avec «الدُّنْيَا».',tuhfah:'Vers 9–11.'},
        {title:'4. Idghām avec et sans ghunnah',lead:'L’idghām avec ghunnah concerne ي ن م و. Sans ghunnah, il concerne lām et rāʾ.',points:['Mémorisez ي ن م و par «ينمو».','Pas de ghunnah avec lām et rāʾ.','La lettre seconde reçoit la shaddah de l’assimilation.'],example:'﴿مَنْ يَعْمَلْ﴾ — az-Zalzalah, 99:7 ; ﴿مِنْ رَبِّهِمْ﴾ — al-Baqarah, 2:5.',practice:'Écoutez et comparez les deux réalisations.',tuhfah:'Vers 10 et 12.'},
        {title:'5. Iqlāb',lead:'Devant bāʾ, nūn sākinah ou tanwīn devient une mīm cachée avec ghunnah.',points:['La seule lettre de l’iqlāb est ب.','Les lèvres se préparent à bāʾ pendant la ghunnah.','Ne prononcez ni le nūn, ni une mīm entièrement apparente.'],example:'﴿سَمِيعًا بَصِيرًا﴾ — an-Nisāʾ, 4:58.',practice:'Marquez le tanwīn puis présentez votre lecture à l’enseignant.',tuhfah:'Vers 13.'},
        {title:'6. Ikhfāʾ réel',lead:'L’ikhfāʾ se situe entre iẓhār et idghām avec ghunnah, devant les quinze lettres restantes.',points:['Les lettres sont réunies dans la formule du vers 16.','La lettre suivante ne prend pas de shaddah.','Le degré de dissimulation se travaille par l’écoute.'],example:'﴿مِنْ شَرِّ مَا خَلَقَ﴾ — al-Falaq, 113:2.',practice:'Relevez cinq ikhfaʾ avec des lettres suivantes différentes.',tuhfah:'Vers 14–16.'},
        {title:'7. Carte de décision',lead:'Posez une seule question : quelle lettre suit nūn sākinah ou tanwīn ?',points:['Gorge : iẓhār.','يرملون : idghām, sauf dans un seul mot ; ي ن م و avec ghunnah, ل ر sans ghunnah.','ب : iqlāb ; les autres : ikhfāʾ.'],example:'﴿مِنْ شَرٍّ﴾ — al-Falaq, 113:2 : shīn mène à l’ikhfāʾ.',practice:'Classez dix exemples tirés de courtes sourates.',tuhfah:'Synthèse des vers 6–16.'}
      ]
    },
    cards:[
      ['Iẓhār de gorge','ء هـ ع ح غ خ','Prononcer distinctement la nūn sākinah ou le tanwīn, sans ghunnah ajoutée.','مِنْ عِلْمٍ — an-Najm, 53:28'],
      ['Idghām avec ghunnah','ي ن م و','Faire entrer la nūn/tanwīn dans la lettre suivante avec ghunnah.','مِنْ وَالٍ — ar-Raʿd, 13:11'],
      ['Idghām sans ghunnah','ل ر','Faire entrer la nūn/tanwīn sans ghunnah.','مِنْ رَبِّهِمْ — al-Baqarah, 2:5'],
      ['Iqlāb','ب','Transformer en mīm cachée, avec ghunnah.','سَمِيعٌ بَصِيرٌ — an-Nisāʾ, 4:58'],
      ['Ikhfāʾ réel','15 lettres','Cacher la nūn/tanwīn avec ghunnah selon la lettre suivante.','مِنْ شَرٍّ — al-Falaq, 113:2'],
      ['Mīm sākinah','ب / م / autres','Ikhfāʾ, idghām ou iẓhār labial.','هُمْ بِهِ — al-Baqarah, 2:4'],
      ['Lām de «الـ»','lunaire / solaire','Prononcer la lunaire ; assimiler la solaire.','الْقَمَر / الشَّمْس'],
      ['Madd naturel','deux temps','Il ne dépend ni de hamzah ni de sukūn.','قَالَ — al-Baqarah, 2:30'],
      ['Madd secondaire','hamzah ou sukūn','Sa cause est une hamzah ou un sukūn ; apprendre la durée oralement.','جَاءَ — al-Baqarah, 2:89'],
      ['Madd nécessaire','6 temps en Ḥafṣ','Après la lettre de madd vient un sukūn originel.','الضَّالِّينَ — al-Fātiḥah, 1:7']
    ],
    quiz:[
      {q:'Quelles sont les lettres de l’iẓhār de gorge ?',a:['ء هـ ع ح غ خ','يرملون','ينمو'],ok:0,why:'Ce sont les six lettres qui sortent de la gorge.'},
      {q:'Quelle règle pour une nūn sākinah devant bāʾ ?',a:['Ikhfāʾ réel','Iqlāb','Iẓhār labial'],ok:1,why:'La nūn ou le tanwīn devient une mīm cachée avec ghunnah.'},
      {q:'Quelle règle pour une mīm sākinah devant mīm ?',a:['Idghām labial','Ikhfāʾ labial','Iẓhār de gorge'],ok:0,why:'La mīm immobile entre dans la mīm vocalisée avec ghunnah.'},
      {q:'«جَاءَ» est un exemple de quel madd ?',a:['Séparé','Joint','Accidentel à l’arrêt'],ok:1,why:'La hamzah vient après la lettre de madd dans le même mot.'},
      {q:'Quelle lām prononce-t-on dans «القمر» ?',a:['Solaire','Lunaire','Verbale'],ok:1,why:'Qāf appartient aux lettres de la lām lunaire.'}
    ]
  };
})();
