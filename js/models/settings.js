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


        playThruNum: 0,
        results: [],

        scrollerResults:{
            corrects:0,
            wrongs:0,
            selectorPresses:0
        },

        categories: {
            'animals' : [   'KIRAHVI','KILPIKONNA','LEIJONA','SIKA','KOIRA','KAMELI','KAURIS',
                            'LAMMAS','HIIRI','KISSA','HÄRKÄ','LEHMÄ','PANDA','KARHU','KETTU',
                            'ORAVA','ETANA','KÄÄRME','HYLJE','HEVONEN' ]
        }




	}


});
