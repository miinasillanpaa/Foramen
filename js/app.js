var App = {
	preGameview: null,
	currentGameView: null
};

var games = [
	{
        "gameId": 1,
        "title" : "Kuvaetsintä",
        "guide" : "<p>Ruutu on täynnä esineitä ja asioita esittäviä kuvia.</p>" +
                  "<p>Tehtävänä on etsiä kohdekuvat (näkyvissä tehtäväruudun alalaidassa) mahdollisimman nopeasti koskettamalla kutakin kohdekuvaa.</p>" +
                  "<p>Väärän valinnan voit poistaa koskettamalla kohdekuvaa uudestaan.</p>" +
                  "<p>Tehtävän suoritettuasi paina tehtäväruudun alareunassa näkyvää Valmis -näppäintä.</p>" +
                  "<p>Tehtävä voidaan keskeyttää Lopeta -nappulasta.</p>",
        "video" : "video/small.mp4",
        "coverImage" : "./img/fish.png"
    },
	{
        "gameId": 2,
        "title" : "Tekstiviesti",
        "guide" : "<p>Ruudulle ilmestyy matkapuhelimen kuva. Merkkiäänen jälkeen puhelimen ruudulle ilmestyy tekstiviesti.</p>" +
                  "<p>Tehtävänä on painaa mieleen tekstiviesti.</p>" +
                  "<p>Mieleenpainamisen jälkeen näytetään joukko kysymyksiä. ..</p>"
    },
	{"gameId": 3, "title" : "Sanojen tunnistamistehtävä"},
	{"gameId": 4, "title" : "Visuaalinen sarjamuisti Ärsykkeet samanaikaisesti"},
	{"gameId": 5, "title" : "Audatiivinen interferenssi-tehtävä"},
	{"gameId": 6, "title" : "KIM-yhdistelmä"},
	{"gameId": 7, "title" : "Päättele salasana"},
	{"gameId": 8, "title" : "Sudoku-tehtävät"},
	{"gameId": 9, "title" : "Konstruointi"},
	{"gameId": 10, "title" : "Ristinolla"}



];

$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
};

/*window.onscroll = function() {
    document.body.scrollTop = 0;
};*/
