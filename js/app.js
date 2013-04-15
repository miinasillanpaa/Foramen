var App = {
	preGameview: null,
	currentGameView: null
};

var games = [
	{
        "gameId": 1,
        "title" : "Kuvaetsintä",
        "guide" :   "<p>Ruutu on täynnä esineitä ja asioita esittäviä kuvia.</p>" +
                    "<p>Tehtävänä on etsiä kohdekuvat (näkyvissä tehtäväruudun alalaidassa) mahdollisimman nopeasti koskettamalla kutakin kohdekuvaa.</p>" +
                    "<p>Väärän valinnan voit poistaa koskettamalla kohdekuvaa uudestaan.</p>" +
                    '<p>Tehtävän suoritettuasi paina tehtäväruudun alareunassa näkyvää "Valmis"-näppäintä.</p>' +
                    '<p>Tehtävä voidaan keskeyttää "Lopeta"-nappulasta.</p>',
        "video" : "video/small.mp4",
        "coverImage" : "./img/fish.png"
    },
	{
        "gameId": 2,
        "title" : "Tekstiviesti",
        "guide" :   "<p>Ruudulle ilmestyy matkapuhelimen kuva. Merkkiäänen jälkeen puhelimen ruudulle ilmestyy tekstiviesti. Tehtävänä on painaa mieleen tekstiviesti.</p>" +
                    "<p>Mieleenpainamisen jälkeen näytetään joukko kysymyksiä ja niiden vastausvaihtoehtoja. Kunkin kysymyksen vastausvaihtoehdot näytetään kun kysymys on aktiivisena. Vastaa kysymykseen koskettamalla vastausta.</p>" +
                    '<p>Vastaamisen jälkeen paina "Tarkista"-näppäintä, jolloin oikeat vastaukset näytetään vihreällä ja väärät punaisella.</p>' +
                    "<p>Tekstiviestejä näytetään yhteensä viisi kappaletta peräkkäin.</p>"
    },
	{
        "gameId": 3,
        "title" : "Sanojen tunnistaminen",
        "guide" :   "<p>Ruudulla näkyy liikkuva kirjainrivi, jonka keskellä on punaisella merkitty kohdealue.</p>" +
                    '<p>Tehtävänä on havaita kohdealueella perusmuodossa oleva substantiivi (nimisana), esimerkiksi "kissa".</p>'+
                    "<p>Valinta osoitetaan painamalla kohdealueen alapuolella olevaa painiketta.</p>"
    },
	{
        "gameId": 4,
        "title" : "Visuaalinen sarjamuisti",
        "guide":    "<p>Ruudulle ilmestyy samanaikaisesti sarja numeroita. Tehtävänä on painaa sarja mieleen.</p>"+
                    "<p>Kun sarja on esitetty, numerot peitetään mustilla neliöillä. Mieleenpalautettavan numeron paikka on merkitty punaisella kehyksellä.</p>"+
                    "<p>Alhaalla näkyvät numero 0-9, joista valitaan sarjaan kyseinen numero. Sama toistetaan jokaisen mustan neliön kohdalla.</p>"
    },
	{
        "gameId": 5,
        "title" : "Audatiivinen interferenssi"
    },
	{
        "gameId": 6,
        "title" : "KIM-yhdistelmä"
    },
	{
        "gameId": 7,
        "title" : "Päättele salasana"
    },
	{
        "gameId": 8,
        "title" : "Sudoku-tehtävät"
    },
	{
        "gameId": 9,
        "title" : "Konstruointi",
        "guide" :   "<p>Ruudulla näkyy kaksi neliön muotoista aluetta. Vasemmanpuoleinen neliö on mallikuvio, joka on koottu alareunassa olevista pienistä neliöistä.</p>"+
                    "<p>Tehtävänä on koota oikeanpuolimmainen neliö mallikuvion mukaiseksi.</p>"+
                    "<p>Kokoaminen tapahtuu koskettamalla ensin ruudun alareunassa näkyvää pientä neliötä ja sen jälkeen vastaavaa kohtaa koottavassa ruudukossa.</p>" +
                    "<p>Tehtäviä on yhteensä viisi kappaletta peräkkäin.</p>"
    },
	{
        "gameId": 10,
        "title" : "Ristinolla"
    }
];

$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
};

/*window.onscroll = function() {
    document.body.scrollTop = 0;
};*/
