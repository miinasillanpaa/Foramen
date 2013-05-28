var PreGameView = Backbone.View.extend({
	el: $( '#content' ),
	template: '#preGameTemplate',

    initialize: function () {
        var gameId = this.model.get('gameId');
        if(gameId === 1 || gameId === 3 || gameId === 8){
            $(".container").addClass('loading');
        }
    },

	render: function() {

        $('#header').show();
        var split = [];
        var txtSplit = [];
        var showJoker = false;

        var gameId = this.model.get('gameId');
        if( gameId === 1 ){
            this.preload('kalat');
            var categoryImg = Settings.get('categoryImg');
            split = categoryImg.chunk(3);
        }else if( gameId === 3){
            var catImg = Settings.get('categories').titleImg;
            var catTitle = Settings.get('categories').titles;
            split = catImg.chunk(3);
            txtSplit = catTitle.chunk(3);
            console.log(txtSplit);
            console.log(split);
        }else if ( gameId === 5){
            this.preloadAud('elaimet');
        }else if ( gameId === 6){
            this.preload('KIM');
        }else if ( gameId === 8){
            this.preload('hedelmat');
            var catImg = Settings.get('sudokuCategories').titleImg;
            var catTitle = Settings.get('sudokuCategories').titles;
            split = catImg.chunk(3);
            txtSplit = catTitle.chunk(3);
            showJoker = true;
        }else if ( gameId === 9){
            this.preload('konstruktio');
        }



		var variables = {title: this.model.get('title'),
                         guide: this.model.get('guide'),
                         difficulty: Settings.get('difficulty'),
                         showJoker: showJoker,
                         categoryImg: Settings.get('categoryImg'),
                         slide1: split[0],
                         slide1Titles: txtSplit[0],
                         slide2: split[1],
                         slide2Titles: txtSplit[1],
                         slide3: split[2],
                         slide3Titles: txtSplit[2],
                         slide4: split[3],
                         slide4Titles: txtSplit[3],
                         categories: Settings.get('categories').titles,
                         titleImg: Settings.get('categories').titleImg};
        console.log(variables);
		var template = _.template( $(this.template).html(), variables );

		this.$el.html(template);



        if( gameId === 1 ){
            $('.clicker').hide();
            $('.categoryTitle').removeClass('hidden');
            $("#categoryCarousel").removeClass('hidden');
            var category = Settings.get('category');

            $('.item img').addClass('category');

            console.log(category);
            $('.categories').removeClass('hidden');

            if(category === 'dinosaurukset'){
                $('img.category:nth(0)').addClass('selected');
                $('ol.carousel-indicators li:nth(0)').addClass('active');
                $('.carousel-inner .item:nth(0)').addClass('active');
            }else if(category === 'elaimet'){
                $('img.category:nth(1)').addClass('selected');
                $('ol.carousel-indicators li:nth(0)').addClass('active');
                $('.carousel-inner .item:nth(0)').addClass('active');
            }else if(category === 'hedelmat'){
                $('img.category:nth(2)').addClass('selected');
                $('ol.carousel-indicators li:nth(0)').addClass('active');
                $('.carousel-inner .item:nth(0)').addClass('active');
            }else if(category === 'kalat'){
                $('img.category:nth(3)').addClass('selected');
                $('ol.carousel-indicators li:nth(1)').addClass('active');
                $('.carousel-inner .item:nth(1)').addClass('active');
            }else if(category === 'kansallispuvut'){
                $('img.category:nth(4)').addClass('selected');
                $('ol.carousel-indicators li:nth(1)').addClass('active');
                $('.carousel-inner .item:nth(1)').addClass('active');
            }else if(category === 'kasvit'){
                $('img.category:nth(5)').addClass('selected');
                $('ol.carousel-indicators li:nth(1)').addClass('active');
                $('.carousel-inner .item:nth(1)').addClass('active');
            }else if(category === 'linnut'){
                $('img.category:nth(6)').addClass('selected');
                $('ol.carousel-indicators li:nth(2)').addClass('active');
                $('.carousel-inner .item:nth(2)').addClass('active');
            }else if(category === 'liput'){
                $('img.category:nth(7)').addClass('selected');
                $('ol.carousel-indicators li:nth(2)').addClass('active');
                $('.carousel-inner .item:nth(2)').addClass('active');
            }else if(category === 'soittimet'){
                $('img.category:nth(8)').addClass('selected');
                $('ol.carousel-indicators li:nth(2)').addClass('active');
                $('.carousel-inner .item:nth(2)').addClass('active');
            }else if(category === 'tyokalut'){
                $('img.category:nth(9)').addClass('selected');
                $('ol.carousel-indicators li:nth(3)').addClass('active');
                $('.carousel-inner .item:nth(3)').addClass('active');
            }else if(category === 'urheiluvalineet'){
                $('img.category:nth(10)').addClass('selected');
                $('ol.carousel-indicators li:nth(3)').addClass('active');
                $('.carousel-inner .item:nth(3)').addClass('active');
            }

        }else if ( gameId === 3 ){
            var textCat = Settings.get('textCategory');
            $("#categoryCarousel").removeClass('hidden');
            $('.wordsTitle').removeClass('hidden');
            console.log(textCat);
            $('.item img').addClass('text-category');

            if(textCat === 'eläimet'){
                $('img:nth(0)').addClass('selected');
                $('ol.carousel-indicators li:nth(0)').addClass('active');
                $('.carousel-inner .item:nth(0)').addClass('active');
            }else if(textCat === 'ammatit'){
                $('img:nth(1)').addClass('selected');
                $('ol.carousel-indicators li:nth(0)').addClass('active');
                $('.carousel-inner .item:nth(0)').addClass('active');
            }else if(textCat === 'kasvit'){
                $('img:nth(2)').addClass('selected');
                $('ol.carousel-indicators li:nth(0)').addClass('active');
                $('.carousel-inner .item:nth(0)').addClass('active');
            }else if(textCat === 'kaupungit'){
                $('img:nth(3)').addClass('selected');
                $('ol.carousel-indicators li:nth(1)').addClass('active');
                $('.carousel-inner .item:nth(1)').addClass('active');
            }else if(textCat === 'miesten nimet'){
                $('img:nth(4)').addClass('selected');
                $('ol.carousel-indicators li:nth(1)').addClass('active');
                $('.carousel-inner .item:nth(1)').addClass('active');
            }else if(textCat === 'naisten nimet'){
                $('img:nth(5)').addClass('selected');
                $('ol.carousel-indicators li:nth(1)').addClass('active');
                $('.carousel-inner .item:nth(1)').addClass('active');
            }else if(textCat === 'sisustus'){
                $('img:nth(6)').addClass('selected');
                $('ol.carousel-indicators li:nth(2)').addClass('active');
                $('.carousel-inner .item:nth(2)').addClass('active');
            }else if(textCat === 'soittimet'){
                $('img:nth(7)').addClass('selected');
                $('ol.carousel-indicators li:nth(2)').addClass('active');
                $('.carousel-inner .item:nth(2)').addClass('active');
            }else if(textCat === 'työkalut'){
                $('img:nth(8)').addClass('selected');
                $('ol.carousel-indicators li:nth(2)').addClass('active');
                $('.carousel-inner .item:nth(2)').addClass('active');
            }else if(textCat === 'urheilu'){
                $('img:nth(9)').addClass('selected');
                $('ol.carousel-indicators li:nth(3)').addClass('active');
                $('.carousel-inner .item:nth(3)').addClass('active');
            }else if(textCat === 'valtiot'){
                $('img:nth(10)').addClass('selected');
                $('ol.carousel-indicators li:nth(3)').addClass('active');
                $('.carousel-inner .item:nth(3)').addClass('active');
            }

        }else if ( gameId === 8 ){
            
            var textCat = Settings.get('sudokuCategory');
            $("#categoryCarousel").removeClass('hidden');
            console.log(textCat);
            $('.item img').addClass('text-category');
            
            if(textCat === 'numerot'){
                $('img:nth(0)').addClass('selected');
                $('ol.carousel-indicators li:nth(0)').addClass('active');
                $('.carousel-inner .item:nth(0)').addClass('active');
            }else if(textCat === 'hedelmät'){
                $('img:nth(1)').addClass('selected');
                $('ol.carousel-indicators li:nth(0)').addClass('active');
                $('.carousel-inner .item:nth(0)').addClass('active');
            }
            
            $("#categoryCarousel .carousel-indicators li:gt(0)").remove();
            $("#categoryCarousel .carousel-inner .item:gt(0)").remove();
            
        }

        $("#categoryCarousel").carousel('pause');

        $("#categoryCarousel").swipe({
            swipeLeft:function(){
                $("#categoryCarousel").carousel('next')
            },
            swipeRight:function(){
                $("#categoryCarousel").carousel('prev')
            }
        });

        $("#content").imagesLoaded( function ( $images ){
                console.log( $images.length + ' images have been loaded');
                $(".container").removeClass('loading');
        });
        
        // $('.carousel-inner div:nth-child(1)').addClass('active');
/*
        $('.easy').click(function(){
            scroller.scrollTo(500, 0, false);
        });

        $('.medium').click(function(){

            var val = scroller.getValues();
            console.log(val);
        });
 */

        var diff = Settings.get('difficulty');
        if(diff === 'easy' || (diff === 'joker' && !showJoker)){
            this.easySelected();
        }else if(diff === 'medium'){
            this.mediumSelected();
        }else if(diff === 'hard'){
            this.hardSelected();
        }else if(diff === 'joker'){
            this.jokerSelected();
        }

	},

    events: {
        'click .easy' : 'easySelected',
        'click .medium' : 'mediumSelected',
        'click .hard' : 'hardSelected',
        'click .joker' : 'jokerSelected',
        'click .preview' : 'previewVideo',
        'click #play-game' : 'play',
        'click .category' : 'selectCategory',
        'click .clicker' : 'selectTextCategory'
    },

    selectCategory: function( event ) {
        $('.category').removeClass('selected');
        var target = $(event.target);
        target.toggleClass('selected');
        var src = target.attr('src');
        var c = src.substring(7,src.length-6);
        Settings.set({category:c});
        console.log(c);
    },


    selectTextCategory: function( event ) {

        $('.text-category').removeClass('selected');
        var index = $(event.target).index();
        if(index > 0){
            index = index/2;
        }
        
        $('.active img.text-category:nth('+index+')').addClass('selected');
        var cat = $('.active h4:nth('+index+')').text().toLowerCase();
        
        var gameId = this.model.get('gameId');
        if( gameId === 8 ) {
          Settings.set({sudokuCategory:cat});
        } else {
          Settings.set({textCategory:cat});
        }

    },

    easySelected: function() {
        $('.easy').addClass('btn-success');
        $('.medium').removeClass('btn-warning');
        $('.hard').removeClass('btn-danger');
        $('.joker').removeClass('btn-info');
        Settings.set({difficulty: 'easy'});
    },

    mediumSelected: function() {
        $('.medium').addClass('btn-warning');
        $('.easy').removeClass('btn-success');
        $('.hard').removeClass('btn-danger');
        $('.joker').removeClass('btn-info');
        Settings.set({difficulty: 'medium'});
    },

    hardSelected: function() {
        $('.hard').addClass('btn-danger');
        $('.easy').removeClass('btn-success');
        $('.medium').removeClass('btn-warning');
        $('.joker').removeClass('btn-info');
        Settings.set({difficulty: 'hard'});
    },
    
    jokerSelected: function() {
        $('.joker').addClass('btn-info');
        $('.easy').removeClass('btn-success');
        $('.medium').removeClass('btn-warning');
        $('.hard').removeClass('btn-danger');
        Settings.set({difficulty: 'joker'});
    },

    previewVideo: function() {
         var gameId = this.model.get('gameId');
         router.navigate('game/' + gameId + '/video', true);
    },

    play: function() {
		console.log('play button clicked!');
        var gameId = this.model.get('gameId');

		router.navigate('game/' + gameId + '/play', {trigger: true});

    },

    preload: function(category) {

        var category = category;
        var preload = [];
        var img;
        if(category === 'konstruktio'){
            for(var j=0;j<12;j++){
                img = './pics/' + category + '/' + j + '.png';
                preload.push(img);
            }
        }else if(category === 'KIM'){
            for(var k=0;k<68;k++){
                img = './pics/' + category + '/' + k + '.png';
                preload.push(img);
            }
        }else{
            for(var i=1;i<21;i++){
                img = './pics/' + category + '/' + i + '.png';
                preload.push(img);
            }
        }
        $(preload).preload();
        //console.log(preload + ' preloaded')
    },

    preloadAud: function (category) {
        var category = category;
        var audio;
        var elaimet = ['ahma','ahven','hevonen','hilleri','ilves','kaarme','karhu','kirva','kissa','korppi','kyy',
                       'lammas','lehma','mato','mayra','rotta','sammakko','sarki','susi','tiikeri'];

        for (var i=0; i<elaimet.length; i++){
            audio = './sounds/audio/' + category + '/' + elaimet[i] + '.mp3';
            this.loadAudio(audio)
        }
    },

    loadAudio: function (uri) {
        var audio = new Audio();
        audio.addEventListener('canplaythrough', false);
        audio.src = uri;
        return audio;
    },


	setModel: function(model) {
		this.model = model;
	}
 });