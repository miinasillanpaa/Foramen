var Settings = Backbone.Model.extend({
	defaults: {
		currentUserId: '',
		returnUrl: 'https://pienipiiri.fi/mobile/?userId=',
		difficulty: 'easy',


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

        //commonly used
        playThruNum: 0,
        results: [],



        categories: {
            'animals' :     [   "KISSA","HILLERI","HEVONEN","LEHMÄ","LAMMAS","SÄRKI","MATO","AHVEN",
                                "TIIKERI","KÄÄRME","SAMMAKKO","ILVES","KORPPI","KIRVA","KARHU","AHMA",
                                "KYY","ROTTA","SUSI","MÄYRÄ"
            ],
            'professions' : [   "LÄÄKÄRI","MYYJÄ","PARTURI","OPETTAJA","HOITAJA","VARTIJA","KAPTEENI",
                                "LENTÄJÄ","SEPPÄ","KOKKI","NÄYTTELIJÄ","POSTELJOONI","METSURI","KÄTILÖ",
                                "VALMENTAJA","TERAPEUTTI","TARJOILIJA","KEITTÄJÄ","OHJAAJA","OMPELIJA",
                                "YRITTÄJÄ","KYLVETTÄJÄ","OPTIKKO"
            ],
            'plants' :      [   "OMENA","BANAANI","PÄÄRYNÄ","NEKTARIINI","SIPULI","TOMAATTI","LILJA",
                                "RUUSU","KOIVU","ESIKKO","MANSIKKA","MUURAIN","HORSMA","KANERVA",
                                "VEHNÄ","LEPPÄ","MÄNTY","OHRA","RUIS","APRIKOOSI"
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
                "ABI","AHO","AIE","AJO","ANE","APE","APU","ARA","ARO","ASE","ASU","AVU","BOA","DUO","EGO","ELO","EMI",
                "EMO","EMU","EMÄ","ENO","ERÄ","EVÄ","HAI","IEN","IES","IHO","IKÄ","ILO","IMU","ISI","ITU","ITÄ","ÄES",
                "IVA","JAE","KOE","KUU","KYY","KÖÖ","LUU","MAA","OKA","OLO","ORA","ORI","OSA","OTE","PAI","PUO","YTY","ÄLY",
                "PUU","PÄÄ","RAE","SEI","SUO","SUU","SÄE","SÄÄ","TAE","TIE","TII","TIU","TYÖ","TÄI","UFO","UHO","URA","UTU"
            ],
            "medium" : [
                "AAMU","AUTO","AASI","ASKI","ASTE","ALKU","ALMU","AARI","ARKI","AKKU","ARPI","APPI","ARVO","AIKA",
                "AATE","AAVE","AHJO","AHMA","AIHE","AINE","AIRO","AITA","AIVO","AKKA","AHTI","ALHO","ALMU","ANSA",
                "ANTI","ARMO","ARPA","ASIA","ASTE","AULA","AUMA","AURA","EVÄS","ESTE","ENNE","ELIÖ","ELIN","EHTO",
                "EMÄS","ERHE","ESSU","ESTO","EURO","EHTO","HAJU","HOME","HELA","HAME","HIUS","HIKI","HALU","HYVE",
                "HAKA","HAKE","HANA","HARA","HAVU","HEDE","HELA","HELY","HERA","HIHA","HITU","HOVI","HUHU","HUPI",
                "HUVI","HYMY","HÄKÄ","HÄLY","HÄMY","HÄTÄ","HÄÄT","IDEA","IHME","IHRA","ILMA","ILME","ILTA","ILVE",
                "INHO","IONI","ITIÖ","ISKU","ITKU","JADE","JAKO","JANA","JANO","JAOS","JODI","JOKI","JONO","JUNA",
                "JYVÄ","JÄTE","KALA","KANI","KARE","KARI","KATE","KATO","KATU","KEHO","KEHÄ","KEKO","KELA","KELO",
                "KERÄ","KESÄ","KIDE","KIHO","KILO","KIVI","KOHU","KOHO","KOKO","KOLA","KONE","KORI","KORU","KOTI",
                "KOTA","KUDE","KUJA","KULO","KUMU","KYKY","KYNÄ","KÄPY","KÄSI","KÖLI","LAKI","LASI"
            ],
            "hard" : []
        }

























    }
});
//looks a bit ugly when scrolling but works.
window.onscroll = function () { window.scrollTo(0, 0); };