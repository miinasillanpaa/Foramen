var VideoView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#videoTemplate',

    render: function() {

        var video = { video: this.model.get('video') };
        console.log(this.model.get('video'));

		var template = _.template( $(this.template).html());

		this.$el.html(template);

		this.$el.append('<video id="video" autobuffer controls width="640" height="480" ><source type="video/mp4" src="'+ this.model.get('video') + '"></video>');

        return this;
    }
});
