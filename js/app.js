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
                    '<p>Vastaamisen jälkeen paina "Tarkista"-näppäintä, jolloin oikeat vastaukset näytetään vihreällä ja väärät punaisella.</p>',
        "coverImage" : "./img/txt.png"
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
        "title" : "Audatiivinen interferenssi",
        "guide" : "<p>Kovaäänisistä kuuluu sarja sanoja. Tehtävänä on painaa sarja mieleen.</p>"+
                  "<p>Tämän jälkeen ruudulle ilmestyy häirintätehtävä. Tehtävänä on painaa Bingo-näppäintä, kun ruudulle ilmestyy eläin.</p>"+
                  "<p>Häirintätehtävän jälkeen mieleenpainettu sarja kirjoitetaan ruudukkoon vapaassa järjestyksessä. Kun koko sarja on kirjoitettu painetaan Valmis-näppäintä, jolloin näkyviin tulee oikeiden vastauksien määrä.</p>"

    },
	{
        "gameId": 6,
        "title" : "KIM-yhdistelmä",
        "guide" : "<p>Ruudulla näkyy esineiden kuvia. Tehtävänä on painaa kuvat mieleen.</p>"+
                  "<p>Mieleenpainamisen jälkeen ruudulle ilmestyy aiemmin esitetyt kuvat ja joukko muita kuvia. Tehtävänä on tunnistaa aiemmin esitetyt kuvat. Tunnistaminen osoitetaan koskettamalla kuvaa.</p>"+
                  "<p>Kun tehtävä on suoritettu painetaan Valmis-nappulaa, jonka jälkeen kone näyttää oikeat vastaukset vihreällä ja puuttuvat oranssilla. Jos kaikki kuvat muistettiin peli loppuu. Jos kaikkia ei muistettu peliä jatketaan kunnes kaikki muistetaan tai kymmenen kierrosta.</p>"
    },
	{
        "gameId": 7,
        "title" : "Päättele salasana",
        "guide" : "<p>Kuvaruudulla näkyy tyhjä tekstikenttä. Tehtävänä on päätellä koneen valitsema salasana, joka on perusmuodossa oleva substantiivi eli nimisana.</p>"+
                  "<p>Kenttään kirjoitetaan mikä tahansa määritellyn pituinen sana ja painetaan Valmis-painiketta.</p>"+
                  "<p>Kone kirjoittaa sanan ruudulle ja ilmoittaa kuinka monta sanan kirjaimista on oikeita ja oikealla paikalla (musta ympyrä) ja kuinka monta sanan kirjaimista on oikeita, mutta väärällä paikalla (valkoinen ympyrä).</p>"+
                  "<p>Yritä päätellä salasana koneen antamien vihjeiden avulla.</p>"
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
                    "<p>Kokoaminen tapahtuu koskettamalla ensin ruudun alareunassa näkyvää pientä neliötä ja sen jälkeen vastaavaa kohtaa koottavassa ruudukossa.</p>",
        "coverImage" : "./img/konstruointi.png"
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

function msToStr(ms){
    var sec = ms / 1000;
    var nummin = Math.floor((((sec % 31536000) % 86400) % 3600) / 60);
    var numsec = Math.floor(((sec % 31536000) % 86400) % 3600) % 60;

    if(nummin){
        return nummin +' min ' + numsec +' s';
    }else{
        return numsec + ' s';
    }
}

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function getDateTime() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;//January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd}
    if(mm<10){mm='0'+mm}
    var hours = today.getHours();
    var minutes = today.getMinutes();

    function pad2(number){
        return (number < 10 ? '0' : '') + number
    }

    var h = pad2(hours);
    var m = pad2(minutes);

    return {'pvm': dd+'/'+mm+'/'+yyyy, 'klo': h+':'+m}
}




/*window.onscroll = function() {
    document.body.scrollTop = 0;
};*/
