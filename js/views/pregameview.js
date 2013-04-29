var PreGameView = Backbone.View.extend({
	el: $( '#content' ),
	template: '#preGameTemplate',

	render: function() {

        $('#header').show();

        var gameId = this.model.get('gameId');
		if( gameId === 1 ){
            this.preload('kalat');
        }else if ( gameId === 5){
            this.preloadAud('elaimet');
        }else if ( gameId === 6){
            this.preload('KIM');
        }else if ( gameId === 9){
            this.preload('konstruktio');
        }



		var variables = {title: this.model.get('title'),
                         guide: this.model.get('guide'),
                         difficulty: Settings.get('difficulty'),
                         categoryImg: Settings.get('categoryImg'),
                         categories: Settings.get('categories').titles,
                         titleImg: Settings.get('categories').titleImg};
        console.log(variables);
		var template = _.template( $(this.template).html(), variables );

		this.$el.html(template);

        var category = Settings.get('category');
        var textCat = Settings.get('textCategory');
        if( gameId === 1 ){
            $('.categories').removeClass('hidden');
        }else if ( gameId === 3){
            $('.categories-text').removeClass('hidden');

        }


        if(textCat === 'eläimet'){
            $('.inner-img-short img:nth(0)').addClass('selected')
        }else if(textCat === 'ammatit'){
            $('.inner-img-short img:nth(1)').addClass('selected')
        }else if(textCat === 'kasvit'){
            $('.inner-img-short img:nth(2)').addClass('selected')
        }else if(textCat === 'kaupungit'){
            $('.inner-img-short img:nth(3)').addClass('selected')
        }else if(textCat === 'miesten nimet'){
            $('.inner-img-short img:nth(4)').addClass('selected')
        }else if(textCat === 'naisten nimet'){
            $('.inner-img-short img:nth(5)').addClass('selected')
        }else if(textCat === 'sisustus'){
            $('.inner-img-short img:nth(6)').addClass('selected')
        }else if(textCat === 'soittimet'){
            $('.inner-img-short img:nth(7)').addClass('selected')
        }else if(textCat === 'työkalut'){
            $('.inner-img-short img:nth(8)').addClass('selected')
        }else if(textCat === 'urheilu'){
            $('.inner-img-short img:nth(9)').addClass('selected')
        }else if(textCat === 'valtiot'){
            $('.inner-img-short img:nth(10)').addClass('selected')
        }
        //todo scroll to specific item


        if(category === 'dinosaurukset'){
            $('.inner-img img:nth(0)').addClass('selected');
            this.preload('dinosaurukset');
        }else if(category === 'elaimet'){
            this.preload('elaimet');
            $('.inner-img img:nth(1)').addClass('selected');
        }else if(category === 'hedelmat'){
            this.preload('hedelmat');
            $('.inner-img img:nth(2)').addClass('selected');
        }else if(category === 'kalat'){
            this.preload('kalat');
            $('.inner-img img:nth(3)').addClass('selected');
        }else if(category === 'kansallispuvut'){
            this.preload('kansallispuvut');
            $('.inner-img img:nth(4)').addClass('selected');
        }else if(category === 'kasvit'){
            this.preload('kasvit');
            $('.inner-img img:nth(5)').addClass('selected');
        }else if(category === 'linnut'){
            this.preload('linnut');
            $('.inner-img img:nth(6)').addClass('selected');
        }else if(category === 'liput'){
            this.preload('liput');
            $('.inner-img img:nth(7)').addClass('selected');
        }else if(category === 'soittimet'){
            this.preload('soittimet');
            $('.inner-img img:nth(8)').addClass('selected');
        }else if(category === 'tyokalut'){
            this.preload('tyokalut');
            $('.inner-img img:nth(9)').addClass('selected');
        }else if(category === 'urheiluvalineet'){
            this.preload('urheiluvalineet');
            $('.inner-img img:nth(10)').addClass('selected');
        }

        var diff = Settings.get('difficulty');
        if(diff === 'easy'){
            this.easySelected();
        }else if(diff === 'medium'){
            this.mediumSelected();
        }else{
            this.hardSelected();
        }

	},

    events: {
        'click .easy' : 'easySelected',
        'click .medium' : 'mediumSelected',
        'click .hard' : 'hardSelected',
        'click .preview' : 'previewVideo',
        'click #play-game' : 'play',
        'click .category' : 'selectCategory',
        'click .text-category' : 'selectTextCategory'
    },

    selectCategory: function () {

        $('.category').removeClass('selected');
        var target = $(event.target);
        target.toggleClass('selected');
        var src = target.attr('src');
        var c = src.substring(7,src.length-6);
        Settings.set({category:c});
        console.log(c);

    },

    selectTextCategory: function () {
        $('.text-category').removeClass('selected');
        var target = $(event.target);
        var index = target.index()-1;
        var cat = $('span:nth-child('+index+')').text().toLowerCase();

        Settings.set({textCategory:cat});
        console.log(Settings.get('textCategory'));
        target.toggleClass('selected');
    },

    easySelected: function() {

        $('.easy').addClass('btn-success');
        $('.medium').removeClass('btn-warning');
        $('.hard').removeClass('btn-danger');
		Settings.set({difficulty: 'easy'});

    },

    mediumSelected: function() {

        $('.medium').addClass('btn-warning');
        $('.easy').removeClass('btn-success');
        $('.hard').removeClass('btn-danger');
		Settings.set({difficulty: 'medium'});
    },

    hardSelected: function() {

        $('.hard').addClass('btn-danger');
        $('.easy').removeClass('btn-success');
        $('.medium').removeClass('btn-warning');
		Settings.set({difficulty: 'hard'});
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

        //console.log(preload + ' preloaded');

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