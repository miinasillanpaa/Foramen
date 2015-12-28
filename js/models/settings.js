var Settings = Backbone.Model.extend({
	defaults: {
		currentUserId: null,
		authToken: null,
		//returnUrl: 'https://pienipiiri.fi/mobile/?userId=',
		difficulty: 'easy',
		//playerRole: 'Kuntoutuja',
        category: 'kalat',
        textCategory: 'eläimet',
		//backendUrl: 'https://api.pienipiiri.fi',
		score: {},
		gameInstanceId: null,
		showFeedbackModal: false,
        // startedPlaying: null, //on going session started time (date obj)
        // playedTimeMS: null, //previous session(s) time from backend
        // playedTime: null, //string e.g. "1h 33min"

		isPotpuriGame: false,
		potpuriId: null,
		potpuriProgressIndex: 0,

        //Tekstiviesti exercise specific
        txtSenderDom: '<button class="btn btn-block a-button btn-danger">Et vastannut tähän</button>',
        txtItemDom: '<button class="btn btn-block a-button btn-danger">Et vastannut tähän</button>',
        txtPlaceDom: '<button class="btn btn-block a-button btn-danger">Et vastannut tähän</button>',
        txtReceiverDom: '<button class="btn btn-block a-button btn-danger">Et vastannut tähän</button>',
        txtTimeDom: '<button class="btn btn-block a-button btn-danger">Et vastannut tähän</button>',

        //Sanojen tunnistaminen
        startPos: "",
        selector: "",
        targetAmount: "",
        scrollerResults:{
            corrects:0,
            wrongs:0,
            selectorPresses:0
        },
        //Salasana quiz
        checks:0,
        scrollerChecks:0,

        correctSeries: 0,
        wrongSeries: 0,
        playThruNum: 0,
        results: [],

        // Audatiivinen Interferenssi
        corrects: 0,
        wrongs:0,
        stringCorrects:0,

        categoryImg: [
                './assets/pics/dinosaurukset/1.png',
                './assets/pics/elaimet/1.png',
                './assets/pics/hedelmat/1.png' ,
                './assets/pics/kalat/1.png',
                './assets/pics/kansallispuvut/1.png',
                './assets/pics/kasvit/1.png' ,
                './assets/pics/linnut/1.png',
                './assets/pics/liput/1.png',
                './assets/pics/soittimet/1.png' ,
                './assets/pics/tyokalut/1.png',
                './assets/pics/urheiluvalineet/1.png'
            ],

        categories: {
            'titles' :      [   "ELÄIMET","AMMATIT","KASVIT","KAUPUNGIT","MIESTEN NIMET","NAISTEN NIMET",
                                "SISUSTUS","SOITTIMET","TYÖKALUT","URHEILU","VALTIOT"
            ],
            'titleImg' :    [   "./assets/pics/elaimet/1.png","./assets/pics/KIM/22.png","./assets/pics/kasvit/1.png","./assets/pics/KIM/16.png",
                                "./assets/pics/kansallispuvut/1.png","./assets/pics/kansallispuvut/16.png","./assets/pics/KIM/28.png",
                                "./assets/pics/soittimet/5.png","./assets/pics/tyokalut/2.png","./assets/pics/urheiluvalineet/6.png","./assets/pics/liput/1.png"
            ],

            'eläimet' :     [   "KISSA","HILLERI","HEVONEN","LEHMÄ","LAMMAS","SÄRKI","MATO","AHVEN","TIIKERI","KÄÄRME",
                                "SAMMAKKO","ILVES","KORPPI","KIRVA","KARHU","AHMA","KYY","ROTTA","SUSI","MÄYRÄ"
            ],
            'ammatit' :     [   "LÄÄKÄRI","MYYJÄ","PARTURI","OPETTAJA","HOITAJA","VARTIJA","KAPTEENI","LENTÄJÄ","SEPPÄ",
                                "KOKKI","NÄYTTELIJÄ","METSURI","KÄTILÖ","VALMENTAJA","TERAPEUTTI",
                                "TARJOILIJA","KEITTÄJÄ","OHJAAJA","OMPELIJA","YRITTÄJÄ","KYLVETTÄJÄ","OPTIKKO"
            ],
            'kasvit' :      [   "OMENA","BANAANI","PÄÄRYNÄ","NEKTARIINI","SIPULI","TOMAATTI","LILJA","RUUSU","KOIVU",
                                "ESIKKO","MANSIKKA","MUURAIN","HORSMA","KANERVA","VEHNÄ","LEPPÄ","MÄNTY","OHRA","RUIS","APRIKOOSI"
            ],
            'kaupungit' :   [   "MADRID","LISSABON","OSLO","REYKJAVIK","BERLIINI","LIMA","LONTOO","SOFIA","ATEENA","VARSOVA",
                                "BUDAPEST","BERN","JERUSALEM","BEIRUT","TOKIO","WASHINGTON","SYDNEY","MOSKOVA","BOGOTA","HELSINKI"
            ],
            "miesten" :     [   "JUSSI","ARI","VÄINÖ","VILLE","KALLE","JUUSO","MATTI","PENTTI","EEMELI","TAPIO","JUKKA",
                                "MARTTI","LASSE","MAURI","PEKKA","LAURI","ILKKA","ALPO","SEPPO","EINO"
            ],
            "naisten" :     [   "ANNA","ANNE","ANU","LIISA","EILA","AILA","VIRVE","SATU","ARJA","TELLERVO","KERTTU","EMMA",
                                "KATJA","IRMA","IRMELI","PÄIVI","AIJA","RIITTA","IDA","KATRI"
            ],
            "sisustus" :    [   "TUOLI","RYIJY","PENKKI","SOHVA","PÖYTÄ","HYLLY","ARKKU","KIRSTU","VITRIINI","RAHI","VERHO",
                                "MATTO","TAULU","JULISTE","TYYNY","LAMPPU","PEILI","SERMI","HETEKA","KORISTE"
            ],
            "soittimet" :   [   "SELLO","PIANO","FLYYGELI","TAMBURIINI","HUILU","TRIANGELI","PICCOLO","HARPPU","VIULU",
                                "TUUBA","BASSO","TORVI","SITAR","URUT","TRUMPETTI","CEMBALO","SITRA","MANDOLIINI","KSYLOFONI","PILLI"
            ],
            "työkalut"  :   [   "SAHA","RUUVI","PORA","HONKA","LAPIO","KUOKKA","HARA","MEISSELI","TALTTA","HÖYLÄ","KANKI",
                                "VIILA","KIRVES","MUTTERI","PIHDIT","LEKA","SORVI","JYRSIN","TUNKKI","VESURI"
            ],
            "urheilu" :     [   "SQUASH","GOLF","VOIMISTELU","UINTI","KÄVELY","HÖLKKÄ","HIIHTO","LASKETTELU","AMMUNTA","RODEO",
                                "NYRKKEILY","PAINI","TRIATHLON","DARTS","JUDO","TENNIS","PURJEHDUS","SUUNNISTUS","SOUTU","PYÖRÄILY"
            ],
            "valtiot" :     [   "SUOMI","RUOTSI","VIETNAM","TANSKA","VIRO","LATVIA","SAKSA","RANSKA","BELGIA",
                                "KOLUMBIA","EGYPTI","BOLIVIA","VENÄJÄ","SUDAN","LIBANON","INTIA","MEKSIKO","JAPANI","KROATIA"
            ]
        },

        constructions: {
                 "2x2" : [{ 0:  [[1,2],[1,2]] },
                          { 1:  [[2,1],[2,1]] },
                          { 2:  [[3,4],[3,4]] },
                          { 3:  [[4,3],[4,3]] },
                          { 4:  [[5,5],[6,6]] },
                          { 5:  [[6,6],[5,5]] },
                          { 6:  [[0,7],[9,8]] },
                          { 7:  [[8,9],[7,0]] },
                          { 8:  [[2,7],[9,2]] },
                          { 9:  [[1,9],[7,1]] },
                          { 10: [[8,1],[1,0]] },
                          { 11: [[0,2],[2,8]] },
                          { 12: [[2,2],[1,1]] },
                          { 13: [[3,7],[3,8]] },
                          { 14: [[4,9],[4,0]] },
                          { 15: [[8,3],[7,3]] },
                          { 16: [[0,4],[9,4]] },
                          { 17: [[0,7],[6,6]] },
                          { 18: [[8,9],[5,5]] },
                          { 19: [[5,5],[9,8]] },
                          { 20: [[6,6],[7,0]] }
             ],
             "3x3" :   [ { 0:  [ [6,6,6],
                                 [5,4,5],
                                 [6,6,6] ] },
                         { 1:  [ [1,2,1],
                                 [2,2,2],
                                 [1,2,1] ] },
                         { 2:  [ [2,1,2],
                                 [1,1,1],
                                 [2,1,2] ] },
                         { 3:  [ [0,2,8],
                                 [1,2,0],
                                 [0,2,8] ] },
                         { 4:  [ [1,9,4],
                                 [7,2,9],
                                 [3,7,1] ] },
                         { 5:  [ [8,9,9],
                                 [7,2,9],
                                 [7,7,0] ] },
                         { 6:  [ [0,4,9],
                                 [1,4,2],
                                 [9,4,0] ] },
                         { 7:  [ [0,9,7],
                                 [9,2,9],
                                 [2,9,8] ] },
                         { 8:  [ [6,6,6],
                                 [7,0,7],
                                 [6,6,6] ] },
                         { 9:  [ [6,2,6],
                                 [8,5,9],
                                 [7,5,0] ] },
                         { 10: [ [3,7,1],
                                 [3,2,7],
                                 [3,2,8] ] },
                         { 11: [ [5,5,5],
                                 [9,6,8],
                                 [1,1,1] ] },
                         { 12: [ [5,5,5],
                                 [9,6,8],
                                 [1,1,1] ] },
                         { 13: [ [5,5,5],
                                 [4,3,5],
                                 [4,3,5] ] },
                         { 14: [ [8,2,9],
                                 [5,5,5],
                                 [7,2,0] ] },
                         { 15: [ [0,2,7],
                                 [6,2,5],
                                 [1,9,2] ] },
                         { 16: [ [2,1,9],
                                 [6,1,5],
                                 [7,1,2] ] },
                         { 17: [ [5,5,5],
                                 [1,9,2],
                                 [3,5,2] ] },
                         { 18: [ [6,2,7],
                                 [6,6,2],
                                 [1,6,6] ] },
                         { 19: [ [4,3,4],
                                 [4,2,8],
                                 [4,8,1] ] },
                         { 20: [ [4,2,3],
                                 [1,1,0],
                                 [7,0,2] ] }
             ]
        },

        salasanat: {
            "easy" : [
                "AHO","AIE","AJO","ANE","APE","APU","ARA","ARO","ASE","ASU","AVU","ALA","BOA","DUO","EGO","ELO","EMI",
                "EMO","EMU","EMÄ","ENO","ERÄ","EVÄ","HAI","IEN","IES","IHO","IKÄ","ILO","IMU","ISÄ","ITU","ITÄ","ÄES",
                "IVA","JAE","KOE","KOI","KUU","KYY","KÖÖ","LUU","MAA","OKA","OLO","ORA","ORI","OSA","OTE","YTY","ÄLY",
                "PUU","PII","PÄÄ","RAE","SEI","SUO","SUU","SYY","SÄE","SÄÄ","TAE","TIE","TII","TIU","TYÖ","TÄI","UFO","UHO",
                "URA","UTU"
            ],
            "medium" : [
                "AAMU","AUTO","AASI","ASKI","ASTE","ALKU","ALMU","AARI","ARKI","AKKU","ARPI","APPI","ARVO","AIKA","AATE",
                "AAVE","AHJO","AHMA","AIHE","AINE","AIRO","AITA","AIVO","AKKA","AHTI","ALHO","ALMU","ANSA","ANTI","ARMO",
                "ARPA","ASIA","ASTE","AULA","AUMA","AURA","EVÄS","ESTE","ENNE","ELIÖ","ELIN","EHTO","EMÄS","ERHE","ESSU",
                "ESTO","EURO","EHTO","HAJU","HOME","HAME","HIUS","HIKI","HALU","HYVE","HAKA","HAKE","HANA","HARA",
                "HAVU","HEDE","HELA","HELY","HERA","HIHA","HITU","HOVI","HUHU","HUPI","HUVI","HYMY","HÄKÄ","HÄLY","HÄMY",
                "HÄTÄ","HÄÄT","IDEA","IHME","IHRA","ILMA","ILME","ILTA","ILVE","INHO","IONI","ITIÖ","ISKU","ITKU","JADE",
                "JAKO","JANA","JANO","JAOS","JODI","JOKI","JONO","JUNA","JYVÄ","JÄTE","KALA","KANI","KARE","KARI","KATE",
                "KATO","KATU","KEHO","KEHÄ","KEKO","KELA","KELO","KERÄ","KESÄ","KIDE","KIHO","KILO","KIVI","KOHU","KOHO",
                "KOKO","KOLA","KONE","KORI","KORU","KOTI","KOTA","KUDE","KUJA","KULO","KUMU","KYKY","KYNÄ","KÄPY","KÄSI",
                "KÖLI","LAKI","LASI","LAVA","LEPO","LEVY","LIHA","LIMA","LOMA","LORU","LUKU","LUMO","LUPA","MAKU","MELA",
                "MELU","MERI","MIES","MUNA","MÄKI","MÖLY","NAPA","NARU","NENÄ","NISÄ","NISU","NOKI","NORO","NUHA","NYSÄ",
                "NÄKÖ","NÄKY","OBOE","OHRA","OIRE","OKSA","OHJE","OLKA","OLUT","ONKI","OPAS","ONNI","OPPI","ORAS","ORJA",
                "ORSI","OTSA","OTTO","PAHE","PAJU","PALA","PALO","PAPU","PESÄ","PIHA","PONI","PORA","PORE","PORO","PUHE",
                "PUJO","PULA","PURO","PYRY","PYRE","PÄRE","PÖLY","RAHA","RAHI","RAJA","RAKO","RATA","RAVI","REKI","ROMU",
                "RUHO","RUIS","RUNO","SADE","SAHA","SANA","SARA","SAVU","SIKA","SIVU","SOTA","SUTI","SATO","SETÄ","SUKA",
                "SUKU","SUMU","SUPI","SUTI","SURU","SUVI","SYLI","SYYS","SÄDE","SÄRÖ","TAJU","TAVU","TEHO","TEKO","TELA",
                "TERÄ","TINA","TOMU","TORI","TORA","TUKI","TULI","TUMA","TUPA","TÄRY","UHKA","USKO","USVA","UUNI","UROS",
                "UUTE","VAJA","VAJE","VAKO","VALA","VALO","VANA","VANU","VASA","VELI","VENE","VERI","VESI","VETY","VIPU",
                "VÄKI","VÄLI","VÄRI","YDIN","YLKÄ","YSKÄ","ÄIJÄ","ÄITI","ÄÄNI","ÄÄRI","ÖLJY"
            ],
            "hard" : [
                "AALTO","AARIA","ASKEL","AATOS","AATTO","AHVEN","AIRUT","AISTI","AITIO","AITTA","AIVOT","AJURI","APURI",
                "AKANA","ALKIO","AMEBA","ATOMI","ARKKU","ANKKA","ANNOS","ANODI","ANSIO","APAJA","APINA","AMMUS","ARINA",
                "ARKKI","ARVIO","ASEMA","ASTIA","ASKEL","ASTMA","ATLAS","AUKKO","AVAIN","EHTOO","ELÄIN","ELÄKE","ELÄMÄ",
                "ERITE","ESITE","ESINE","ETANA","ETELÄ","ETUUS","HAAMU","HAAVE","HAAPA","HAARA","HAAVA","HAAVI","HAHMO",
                "HAIKU","HAIMA","HEHKU","HAKKU","HUKKA","HALKO","HALLA","HALLI","HALVA","HARJA","HANHI","HANKE","HANKI",
                "HAPPI","HAPPO","HARHA","HIRSI","HIIRI","HARMI","HARSO","HEIMO","HATTU","HAUDE","HAUKI","HAULI","HAUTA",
                "HEHTO","HEILA","HEIMO","HEINÄ","HANKO","HELLA","HELLE","HELMA","HELMI","HENKI","HERJA","HERMO","HERNE",
                "HERNE","HERRA","HETKI","HIEHO","HIESU","HIETA","HIHNA","HIILI","HIIVA","HILLO","HILSE","HINKU","HINTA",
                "HIRVI","HISSI","HATTU","HOHDE","HOHTO","HOITO","HOIVA","HOKKI","HOLVI","HOPEA","HUONE","HOURE","HUHTA",
                "HUILU","HUIVI","HUMUS","HUNTU","HUPPU","HUOLI","HUOPA","HURMA","HURME","HUTTU","HUULI","HUUMA","HUUME",
                "HUURU","HUUTO","HINTA","HIHNA","HEHMÄ","HYLJE","HYLKY","HYLLY","HYLSY","HYMNI","HYTTI","HYÖKY","HYÖTY",
                "HÄKKI","HÄPEÄ","HÄRKÄ","HÄRMÄ","HÄIVÖ","HÄÄTÖ","HÖYLÄ","HÖYRY","IKONI","IKÄVÄ","ILMIÖ","ILVES","IMAGO",
                "IMURI","ITARA","ININÄ","IPANA","ISYYS","JAALA","JAKSO","JALKA","JARRU","JATKO","JOHTO","JUHLA","JUHTA",
                "JUOMA","JUONI","JUOPA","JUORU","JUOVA","JUURI","JYSKE","JÄLKI","JÄNNE","JÄNIS","JÄNKÄ","JÄRVI","JÄSEN",
                "JÄÄHY","JÄÄMÄ","KAALI","KAAOS","KAASU","KAHLE","KAHVI","KAIDE","KAIHI","KAIHO","KAIKU","KAIRA","KAIVO",
                "KAKKU","KALLO","KALVO","KAMMO","KAMPA","KANNE","KANSA","KANSI","KARHU","KARJA","KARJU","KARVA","KASKU",
                "KASVI","KATOS","KATSE","KATTO","KATVE","KAUNA","KAUSI","KEHYS","KEIJA","KEIJU","KEINO","KELLO","KELMI",
                "KEMIA","KENKÄ","KERHO","KESTO","KETJU","KEVÄT","KIELI","KIELO","KIISU","KIITO","KILJU","KILPA","KIRJA",
                "KIRJE","KIRJO","KIRNU","KIRVA","KISKO","KISSA","KITKA","KIUSA","KOHDE","KOHJU","KOHTU","KOKKI","KOLHU",
                "KOLVI","KOODI","KOPPA","KOPLA","KORPI","KOIRA","KORVA","KOTKA","KOULU","KOURA","KUHMU","KUILU","KUITU",
                "KUKKA","KUKKO","KULTA","KUNTO","KUOHU","KUOMA","KUORI","KUOVI","KUULA","KUULO","KUUME","KUUSI","KYYRI",
                "KYHMY","KYLKI","KYLVÖ","KYNSI","KÄNSÄ","KÄRHÖ","KÄRKI","KÄRRY","KÄRSÄ","KÄSKY","KÄTKÖ","KÄÄMI","KÄÄRÖ",
                "KÖYSI","LAAKI","LAAVA","LAHJA","LAHTI","LAINA","LAINE","LAITE","LAIVA","LAKKA","LAKKI","LAKKO","LANKO",
                "LAPIO","LAPSI","LASKO","LASKU","LASTU","LAULU","LAUSE","LEHMÄ","LEHTI","LEHTO","LEIPÄ","LEIMU","LEIRI",
                "LENTO","LEPPÄ","LETKU","LETTI","LETTO","LETTU","LIEKA","LIEMI","LIHAS","LIIKE","LIIMA","LIINA","LIITE",
                "LIITO","LIIVI","LINKO","LISKO","LIUKU","LOHTU","LOMMO","LOSKA","LUKKO","LUODE","LUOMI","LUSTO","LUULO",
                "LUUTA","LYHTY","LYIJY","LYPSY","LÄHDE","LÄHTÖ","LÄIKE","LÄMPÖ","LÄNSI","LÄPPÄ","LÄTTI","LÄÄKE","LÄÄNI",
                "LÄÄVÄ","LÖYLY","LÖYTÖ","MAHTI","MAINE","MAITO","MAKSA","MALLI","MALMI","MALTO","MARJA","MASSA","MASTO",
                "MATKA","MATTO","MERTA","METRO","METKU","METSÄ","MIELI","MIETE","MIINA","MITTA","MOPPI","MUHVI","MUOTO",
                "MUOTI","MURHE","MURSU","MUURI","MYTTY","MYYJÄ","MYYRÄ","MÄNTY","MÄYRÄ","MÖKKI","MÖRKÖ","NAHKA","NAAMA",
                "NAPPI","NARRI","NAUHA","NAURU","NEITI","NEKKU","NELIÖ","NETTO","NEULE","NEUVO","NIDOS","NIPPU","NISKA",
                "NIVEL","NIVUS","NOITA","NOKKA","NOPPA","NORSU","NOTKO","NUHDE","NUKKA","NUKKE","NUNNA","NUOLI","NUPPI",
                "NÄLKÄ","NÄPPY","NÄRHI","NÄYTE","NÄÄTÄ","OINAS","OHJUS","OMMEL","ORAVA","PAALU","PAHKA","PAHVI","PAINE",
                "PAINO","PAKKI","PALJU","PALMU","PANOS","PANTA","PAPPI","PARKU","PARSA","PARTA","PARVI","PASSI","PATJA",
                "PEHKO","PEILI","PELKO","PELLE","PERHE","PERHO","PIANO","PIENA","PIHKA","PIILO","PIINA","PIIKA","PILVI",
                "PINNE","PIRTA","PISTE","PITKO","POHJA","POIKA","POLVI","POSTI","POTKA","POUTA","PUHTI","PULLO","PULMA",
                "PUNOS","PUOMI","PURJO","PUSKA","PUSSI","PUTKI","PUUHA","PUURO","PUUTE","PYTTY","PYÖRÄ","PÄIVÄ","PÄSSI",
                "PÄTSI","PÄÄTE","PÄÄTY","PÖLLÖ","PÖYTÄ","RAANU","RAATI","RAIVO","RAMPA","RASIA","RATAS","RAUHA","RAUTA",
                "REIKÄ","REKKI","REMMI","RIHLA","RIHMA","RIIMU","RIITA","RIKOS","RIPPI","RISTI","ROHTO","ROMMI","ROOLI",
                "ROSKA","RUMPU","RUOKA","RUORI","RUOTO","RUOTU","RUSTO","RUUHI","RUUTI","RUUVI","RUUSU","RYPPY","RÄNNI",
                "SAARI","SAATE","SAKKO","SALMI","SALPA","SAPPI","SARKA","SARVI","SARJA","SAUNA","SEIMI","SEINÄ","SELKÄ",
                "SEPPÄ","SERMI","SIDOS","SIENI","SIHTI","SIKIÖ","SIILI","SILLI","SILMÄ","SISSI","SISKO","SOLKI","SOOLO",
                "SOPPA","SOPPI","SORSA","SORTO","SOTKA","SOTKA","SOUTU","SOUVI","SPRII","SUKKA","SUKSI","SULKA","SUOJA",
                "SUOLA","SUOLI","SUONI","SUOMU","SYDÄN","SYKSY","SYNTI","SYRJÄ","SYYHY","SYYTE","SÄHKE","SÄHKÖ","SÄILÖ",
                "SÄKKI","SÄLPÄ","SÄVEL","TAFTI","TAHKO","TAHTI","TAIDE","TAIKA","TAIVE","TAKKA","TAKKI","TALLI","TALVI",
                "TAMMI","TANKO","TARHA","TARMO","TATTI","TAULU","TAUTI","TEEMA","TENHO","TERÄS","TIEDE","TIETO","TIILI",
                "TIIRA","TIKKA","TIKKI","TIKKU","TIPPA","TISKI","TOIMI","TOIVE","TOIVO","TORVI","TUHKA","TUIKE","TUKKA",
                "TUKKI","TUKKU","TULLI","TULVA","TUNNE","TUNTI","TUNTO","TUOHI","TUOLI","TUOMI","TUOTE","TUPSU","TURVA",
                "TURVE","TUSKA","TUSSI","TUTKA","TUULI","TUURI","TUUMA","TYKKI","TYPPI","TYRNI","TYYLI","TYYNI","TYYNY",
                "TÄHKÄ","TÄHTI","TÄPLÄ","TÄYTE","TÖLLI","TÖRMÄ","TÖYRY","UITTO","ULINA","UMPIO","UNSSI","UUDIN","UURRE",
                "VAADE","VAARA","VAARI","VAATE","VAHTI","VAIHE","VAIMO","VAKIO","VALAS","VALHE","VALLI","VALTA","VAMMA",
                "VANNE","VARAS","VARIS","VARJO","VARSA","VARSI","VASEN","VATSA","VAUNU","VAUVA","VEDIN","VEDOS","VEHJE",
                "VEHNÄ","VEISU","VEKKI","VELHO","VELKA","VELLI","VENHO","VERBI","VERHO","VERKA","VERSO","VIHJE","VIILI",
                "VIINI","VIIRU","VIIVE","VIIVA","VILJA","VILLA","VIMMA","VIRHE","VIRKA","VIRKE","VIRTA","VIRUS","VITSA",
                "VOIDE","VOIMA","VUODE","VUOKA","VUONO","VUORI","VUORO","VUOTA","VYÖRY","VÄITE","VÄLKE","VÄYLÄ","YHTIÖ",
                "YKSIÖ","YNINÄ","YRTTI","ÄÄNNE"
            ]
        },


    sudokuCategory: "numerot",

    sudokuCategories: {
      "titles": [ "NUMEROT", "HEDELMÄT" ],
      "titleImg": [ "./assets/pics/numbers.png", "./assets/pics/hedelmat/1.png" ]
    },


    fiarNumberOfGamesBeforeResults: 1,

    fiarNumberOfGridRows: 15,
    fiarNumberOfGridCols: 15,
    computerMoving: false

  }

});
