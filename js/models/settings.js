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

        }
	}

});
//looks a bit ugly when scrolling but works.
window.onscroll = function () { window.scrollTo(0, 0); };