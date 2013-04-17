var KIM = Backbone.View.extend({
    el: $(' #content '),
    template: '#KIMTemplate',

    render: function () {

        $('#header').empty();

        //todo remove debug time (4500)
        var visible = this.itemsLength()*2000;

        var targets = this.renderTargets();
        Settings.set({targets:targets});
        var allItems = this.addBluffs(targets);

        var variables = {targets:targets,bluffs:allItems};
        var template = _.template( $(this.template).html(), variables ) ;

        var timer = setTimeout(
            function() {
                $('.targets').addClass('hidden');
                $('.allItems').removeClass('hidden');
            },visible);

        this.$el.html(template);
        return this;

    },

    events: {
        'click .selectable' : 'selectItem',
        'click .finish' : 'checkCorrects'
    },

    selectItem: function () {
        var target = $(event.target);
        target.toggleClass('selected');
    },

    itemsLength: function () {
        var diff = Settings.get('difficulty');
        var itemsLength;
        if(diff === 'easy'){
            itemsLength = 4;
        }else if(diff === 'medium'){
            itemsLength = 14;
        }else{
            itemsLength = 20;
        }

        return itemsLength;
    },

    renderTargets: function () {
        var itemsLength = this.itemsLength();

        var targetsArr = [];

        for(var i=0; i<itemsLength; i++){
            var unique = true;
            var rand = Math.floor((Math.random()) * 68 );

            for(var j=0; j<itemsLength; j++){
                if(targetsArr[j] === rand ){
                    unique = false;
                }
            }
            if(unique){
                targetsArr.push(rand);
            }else{
                i--;
            }
        }

        return targetsArr;
    },

    addBluffs: function (targets) {
        var targets = targets;
        var itemsLength = this.itemsLength();

        var bluffsArr = [];
        for(var i=0; i<itemsLength; i++){
            var unique = true;
            var rand = Math.floor((Math.random()) * 68 );

            for(var j=0; j<itemsLength; j++){
                if(bluffsArr[j] === rand){
                    unique = false;

                }else if(targets[j] === rand){
                    unique = false;
                }
            }

            if(unique){
                bluffsArr.push(rand);
            }else{
                i--;
            }
        }

        for(var k=0; k<itemsLength; k++){
            bluffsArr.push(targets[k]);
        }

        function randomizeArray( myArray ) {
            var i = myArray.length, j, tempi, tempj;
            if ( i === 0 ) return false;
            while ( --i ) {
                j = Math.floor( Math.random() * ( i + 1 ) );
                tempi = myArray[i];
                tempj = myArray[j];
                myArray[i] = tempj;
                myArray[j] = tempi;
            }
        }

        randomizeArray(bluffsArr);

        return bluffsArr;
    },

    checkCorrects: function () {
        var targets = Settings.get('targets');

        var targetImg = [];
        for( var i=0; i<targets.length; i++ ) {
            var img = './pics/KIM/'+targets[i]+'.png';
            targetImg.push(img);
        }

        var selected = [];
        for(var j=0; j < $('.selected').length; j++){
            var selection = $('img.selected:nth('+j+')').attr('src');
            selected.push(selection);

            if( $.inArray(selection, targetImg) > -1 ){
                console.log('oikea valinta');
                $('img.selected:nth('+j+')').addClass('success-border');

            }else if( $.inArray(selection, targetImg) === -1 ){
                console.log('kuvaa ei etsitty');
                $('img.selected:nth('+j+')').addClass('danger-border');
            }
        }

        for(var k=0; k<targetImg.length; k++){
            if( ($.inArray(targetImg[k], selected)) === -1 ){
                console.log('kuva puuttui');
                $(".allItems img[src="+'"'+targetImg[k]+'"'+"]").addClass('warning-border');

            }
        }



        console.log(targetImg);
        console.log(selected);


    }



});
