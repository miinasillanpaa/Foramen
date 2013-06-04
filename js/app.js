var App = {
	preGameview: null,
	currentGameView: null
};

var games = [
	{
        "gameId"     : 1,
        "title"      : "Etsi kuvat",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Etsitään yhtä kuvaa</span></p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Etsitään kahta kuvaa</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Etsitään kolmea kuvaa</p></div>' +

                       "<p>Ruudulla näkyy kuvia. Ruudun alalaidassa näkyy etsittävät kohdekuvat.</p>" +
                       "<p>Tehtävänä on etsiä samanlaisia kuvia kuin kohdekuva tai kohdekuvat koskettamalla niitä mahdollisimman nopeasti.</p>" +
                       "<p>Väärän valinnan voit poistaa koskettamalla kuvaa uudestaan..</p>" +
                       '<p>Näet tuloksesi painamalla "Valmis".</p>' +
                       '<p>Tehtävä voidaan keskeyttää painamalla "Lopeta".</p>',
        "video"      : "http://www.youtube.com/embed/tEkZSAo9OIg",
        "coverImage" : "./img/fish.png"
    },
	{

        "gameId"     : 2,
        "title"      : "Muista viesti",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Viesti näkyy 60 sekuntia</span></p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Viesti näkyy 30 sekuntia</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Viesti näkyy haluamasi ajan</p></div>' +

                       "<p>Ruudulla näkyy matkapuhelimen kuva. Merkkiäänen jälkeen ilmestyy tekstiviesti. Tehtävänä on painaa tekstiviesti mieleen.</p>" +
                       "<p>Mieleenpainamisen jälkeen näytetään joukko kysymyksiä ja niiden vastausvaihtoehtoja.</p>" +
                       '<p>Vastausvaihtoehdot tulevat näkyviin, kun kosketat kysymystä.</p>'+
                       '<p>Vastaa kysymykseen koskettamalla vastausta.</p>'+
                       '<p>Kosketa "Tarkista", jolloin oikeat vastaukset näytetään vihreällä ja väärät punaisella.</p>'+
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta".</p>',
        "video"     :  "http://www.youtube.com/embed/7htCYIcrVoo",
        "coverImage" : "./img/txt.png"
    },
	{
        "gameId"     : 3,
        "title"      : "Tunnista sanat",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Kirjaimet siirtyvät 1,5 sekunnin välein</span></p>' +
                        '<p class="lvl-box lvl-med hidden">Taso II: Kirjaimet siirtyvät 1 sekunnin välein</p>' +
                        '<p class="lvl-box lvl-hard hidden">Taso III: Kirjaimet siirtyvät 0,5 sekunnin välein</p></div>' +

                        "<p>Ruudulla näkyy liikkuva kirjainrivi, jonka keskellä on punaisella merkitty alue.</p>" +
                       '<p>Tehtävänä on havaita punaisella alueella perusmuodossa oleva substantiivi (nimisana), esimerkiksi "kissa".</p>'+
                       "<p>Valinta osoitetaan koskettamalla alueen alapuolella olevaa Löytyi-painiketta.</p>"+
                       '<p>Tehtävä kestää neljä minuuttia. Voit kuitenkin keskeyttää tehtävän koskettamalla "Lopeta".</p>',
        "video"      : "http://www.youtube.com/embed/UlYAon9pjoY",
        'coverImage' : './img/sanat.png'
    },
	{
        "gameId"     : 4,
        "title"      : "Muista näkemäsi numerosarja",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Sarjan pituus 3 numeroa</span></p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Sarjan pituus 4 numeroa</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Sarjan pituus 5 numeroa</p></div>' +

                       "<p>Ruudulla näkyy numerosarja. Tehtävänä on painaa se mieleen.</p>"+
                       "<p>Kun sarja on esitetty, numerot peitetään mustilla neliöillä. Kulloinkin mieleenpalautettavan numeron paikka on merkitty punaisella kehyksellä. Alarivillä näkyvät numero 0-9. Vastaa koskettamalla alarivin kyseistä numeroa. Sama toistetaan jokaisen mustan neliön kohdalla.</p>"+
                       '<p>Kosketa "Tarkista", jolloin näet oikeat vastaukset.</p>'+
                       '<p>Muistettavia numerosarjoja tulee viisi peräkkäin. Voit kuitenkin keskeyttää tehtävän koskettamalla "Lopeta".</p>',
        "video"      : "http://www.youtube.com/embed/JAyMd0IEPxE",
        "coverImage" : "./img/vis.png"
    },
	{
        "gameId"     : 5,
        "title"      : "Muista kuulemasi sanat",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Sarjan pituus 2 sanaa</span></p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Sarjan pituus 3 numeroa</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Sarjan pituus 4 numeroa</p></div>' +

                       "<p>Kovaäänisistä kuuluu sarja sanoja. Tehtävänä on painaa sarja mieleen.</p>"+
                       "<p>Tämän jälkeen ruudulle ilmestyy häirintätehtävä. Tehtävänä on koskettaa Löytyi-näppäintä, kun ruudulle ilmestyy eläin.</p>"+
                       "<p>Häirintätehtävän jälkeen mieleenpainettu sarja kirjoitetaan ruudukkoon vapaassa järjestyksessä.</p>"+
                       '<p>Kun koko sarja on kirjoitettu kosketa "Valmis"-painiketta, jolloin näkyviin tulee oikeiden vastauksien määrä.</p>'+
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta".</p>',
        "video"      : "http://www.youtube.com/embed/BztSh8D8il0",
        'coverImage' : './img/aud.png'
    },
	{
        "gameId"     : 6,
        "title"      : "Muista näkemäsi esineet",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: 8 etsittävää esinettä</span></p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: 14 etsittävää esinettä</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: 20 etsittävää esinettä</p></div>' +

                       "<p>Ruudulla näkyy esineiden kuvia. Tehtävänä on oppia tunnistamaan nämä muiden joukosta.</p>"+
                       "<p>Mieleenpainamisen jälkeen ruudulle ilmestyy aiemmin esitetyt kuvat ja joukko muita kuvia. Tehtävänä on tunnistaa aiemmin esitetyt kuvat. Tunnistaminen osoitetaan koskettamalla kuvaa</p>"+
                       '<p>Kosketa “Valmis”, jonka jälkeen kone näyttää oikeat vastaukset vihreällä ja puuttuvat oranssilla. Jos muistit kaikki kuvat tehtävä loppuu. Mikäli et muistanut kaikkia, tehtävä jatkuu kunnes muistat kaikki tai korkeintaan kymmenen kierrosta.</p>',
        "video"      : "http://www.youtube.com/embed/_HGOhJ1S-gM",
        "coverImage" : "./img/kim.png"
    },
	{
        "gameId"     : 7,
        "title"      : "Päättele salasana",
        "guide"      :  '<div class="well well-info">'+
                        '<p class="lvl-box lvl-easy hidden">Taso I: Sanan pituus 3 kirjainta</span></p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Sanan pituus 4 kirjainta</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Sanan pituus 5 kirjainta</p></div>' +

                       "<p>Kuvaruudulla näkyy tyhjä tekstikenttä. Tehtävänä on päätellä koneen valitsema salasana, joka on perusmuodossa oleva substantiivi eli nimisana.</p>"+
                       '<p>Aloita tehtävä koskettamalla sormella tekstikenttään, jolloin näppäimistö tulee näkyviin. Kenttään kirjoitetaan mikä tahansa määritellyn pituinen sana ja painetaan "Valmis".</p>'+
                       "<p>Kone kirjoittaa sanan ruudulle ja ilmoittaa kuinka monta sanan kirjaimista on oikeita ja oikealla paikalla (musta ympyrä) ja kuinka monta sanan kirjaimista on oikeita, mutta väärällä paikalla (valkoinen ympyrä).</p>"+
                       "<p>Yritä päätellä salasana koneen antamien vihjeiden avulla.</p>"+
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta".</p>',
        "video"      : "http://www.youtube.com/embed/IrgFSCQJT3A",
        "coverImage" : "./img/password1.png"
    },
	{
        "gameId"     : 8,
        "title"      : "Sudoku",
        "guide"      : '<div class="well well-info">' +
                       '<p class="lvl-box lvl-easy hidden">Taso I: Kuvaruudulla näkyy 6x6-pääruudukko, josta jokainen ruutu on jaettu edelleen 3x2-pienruudukkoon. Ohjelma valitse ruudun johon numero/hedelmä on täytettävä. Ohjelma ilmoittaa'  +
                       'virheellisen valintayrityksen äänimerkillä.</span></p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Kuvaruudulla näkyy 6x6-pääruudukko, josta jokainen ruutu on jaettu edelleen 3x2-pienruudukkoon. Sekä ruudun, että numeron/ hedelmän saa itse valita.  Ohjelma ilmoittaa' +
                       'virheellisen valintayrityksen äänimerkillä.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Tasolla III: Kuvaruudulla näkyy 6x6-pääruudukko, josta jokainen ruutu on jaettu edelleen 3x2-pienruudukkoon. Sekä ruudun, että numeron/ hedelmän saa itse valita. Ohjelma sallii myös' +
                       'virheellisen valinnan. <br/><br/> Kosketa "Tarkista", niin ohjelma ilmoittaa punaisella pohjavärillä, jos ruutu on täytetty sääntöjen vastaisesti. Virheellinen valinta voidaan vaihtaa koskettamalla uudestaan ruutua ja valitsemalla sivuvalikosta uusi numero/hedelmä.</p>' +
                       '<p class="lvl-box lvl-joker hidden">Jokeritaso: Jokeritasolla pääruudukkoja on 9x9. Sekä ruudun, että numeron/hedelmän saa itse valita. Ohjelma sallii myös virheellisen valinnan. <br/><br/> Kosketa ”Tarkista niin ohjelma ilmoittaa punaisella pohjavärillä,' +
                       'jos ruutu on täytetty sääntöjen vastaisesti. <br/><br/> Kosketa ”Vihje” saat ohjelmalta apua suodokun täyttämiseen. <br/><br/> Virheellinen valinta voidaan vaihtaa koskettamalla uudestaan ruutua ja valitsemalla sivuvalikosta uusi numero/hedelmä.</p>' +
                       '</div>' +

                       '<p>Tehtävänä on täyttää ruudukon vapaat paikat hedelmillä tai numeroilla 1-6 siten, että kukin hedelmä tai numero voi esiintyä vain kerran jokaisen pääruudukon pysty- tai vaakarivissä sekä jokaisessa pienruudukossa. Osa ruuduista on valmiiksi täytetty, ne on merkitty harmaalla pohjavärillä.</p>' +
                       '<p>Ruudukon täyttäminen tapahtuu koskettamalla haluttua tyhjää ruutua, jolloin sen ympärille muodostuu punainen kehä. Sivulla olevasta valikosta valitaan koskettamalla haluttu numero/hedelmä.</p>' +
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta".</p>' +
                       '<p>Kosketa X kun haluat poistaa virheellisen valinnan.</p>',
        'coverImage' : "./img/sudoku.png"
    },
	{
        "gameId"     : 9,
        "title"      : "Rakenna kuvio mallista",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Pieni ruudukko apuviivoilla</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Iso ruudukko apuviivoilla</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Iso ruudukko ilman apuviivoja</p></div>' +
                       "<p>Ruudulla näkyy kaksi neliön muotoista aluetta. Vasemmanpuoleinen neliö on mallikuvio, joka on koottu alareunassa olevista pienistä neliöistä.</p>"+
                       "<p>Tehtävänä on koota oikeanpuolimmainen neliö mallikuvion mukaiseksi.</p>"+
                       "<p>Kokoaminen tapahtuu koskettamalla ensin ruudun alareunassa näkyvää pientä neliötä ja sen jälkeen vastaavaa kohtaa koottavassa ruudukossa</p>"+
                       '<p>Kosketa “Valmis”. Mikäli kuviossa on virheellisiä tai puuttuvia osia näkyvät ne punaisella X:lla. merkittynä.</p>'+
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta".</p>',
        "video"      : "http://www.youtube.com/embed/bBLbo0fK0OU",
        "coverImage" : "./img/konstruointi.png"
    },
	{
        "gameId"     : 10,
        "title"      : "Jätkänshakki",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Helppo vastustaja</span></p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Keskinkertainen vastustaja</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Taitava vastustaja</p></div>' +
                       "<p>Kuvaruudulla näkyy tyhjä ruudukko.<br/>Tehtävässä kone pelaa ihmistä vastaan.</p>"+
                       '<p>Ruudukkoon asetetaan vuorotellen "risti" ja "nolla" (kone asettaa nollan, ihminen ristin). Tavoitteena on saada viisi peräkkäistä ristiä tai nollaa pysty-, vaaka- tai vinoruudukkoon.</p>'+
                       "<p>Valinta osoitetaan koskettamalla haluttua ruutua.</p>"+
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta"</p>',
        "coverImage" : "./img/ristinolla.png"
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
    var mm = today.getMonth()+1;
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

Array.prototype.chunk = function(chunkSize) {
    var array=this;
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
};

