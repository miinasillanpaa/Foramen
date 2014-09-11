var App = {
	preGameview: null,
	currentGameView: null,
	headerView: null
};


var games = [
	{
        "gameId"     : 1,
        "title"      : "Etsi kuvat",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Etsitään yhtä kuvaa.</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Etsitään kahta kuvaa.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Etsitään kolmea kuvaa.</p></div>' +

                       "<p>Ruudulla näkyy kuvia. Ruudun alalaidassa näkyy etsittävät kohdekuvat.</p>" +
                       "<p>Tehtävänä on etsiä samanlaisia kuvia kuin kohdekuva tai kohdekuvat koskettamalla niitä mahdollisimman nopeasti.</p>" +
                       "<p>Väärän valinnan voit poistaa koskettamalla kuvaa uudestaan.</p>" +
                       '<p>Näet tuloksesi koskettamalla "Valmis".</p>' +
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta".</p>',
        "video"      : "//www.youtube.com/embed/Vxcs2E_B4fc",
        "coverImage" : "./img/fish.png"
    },
	{

        "gameId"     : 2,
        "title"      : "Muista viesti",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Viesti näkyy 60 sekuntia.</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Viesti näkyy 30 sekuntia.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Viesti näkyy haluamasi ajan.</p></div>' +

                       "<p>Ruudulla näkyy matkapuhelimen kuva. Merkkiäänen jälkeen ilmestyy tekstiviesti. Tehtävänä on painaa tekstiviesti mieleen.</p>" +
                       "<p>Mieleenpainamisen jälkeen näytetään joukko kysymyksiä ja niiden vastausvaihtoehtoja. Vastaa kysymykseen koskettamalla mielestäsi oikeaa vastausta.</p>" +
                       '<p>Kosketa "Tarkista", jolloin oikeat vastaukset näytetään vihreällä ja väärät punaisella.</p>'+
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta".</p>',
        "video"      : "//www.youtube.com/embed/Tb58VLIdkPQ",
        "coverImage" : "./img/txt.png"
    },
	{
        "gameId"     : 3,
        "title"      : "Tunnista sanat",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Kirjaimet siirtyvät 1,5 sekunnin välein.</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Kirjaimet siirtyvät 1 sekunnin välein.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Kirjaimet siirtyvät 0,5 sekunnin välein.</p></div>' +

                       "<p>Ruudulla näkyy liikkuva kirjainrivi. Keskellä on punaisella merkitty alue.</p>" +
                       '<p>Tehtävänä on havaita perusmuodossa oleva sana. Valinta osoitetaan koskettamalla Löytyi  -painiketta. Sanan on oltava kokonaan punaisella alueella.</p>'+
                       '<p>Tehtävä kestää neljä minuuttia. Voit keskeyttää tehtävän koskettamalla "Lopeta".</p>',
        "video"      : "//www.youtube.com/embed/oqHWiE8KCEE",
        'coverImage' : './img/sanat.png'
    },
	{
        "gameId"     : 4,
        "title"      : "Muista näkemäsi numerosarja",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Sarjan pituus 3 numeroa.</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Sarjan pituus 4 numeroa.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Sarjan pituus 5 numeroa.</p></div>' +

                       "<p>Ruudulla näkyy numerosarja. Tehtävänä on painaa se mieleen.</p>"+
                       "<p>Kun sarja on esitetty, numerot peitetään. Kone kysyy numeroita. Kulloinkin kysytyn numeron paikka on merkitty punaisella kehyksellä. Valitse oikea numero koskettamalla sitä alarivistä.</p>"+
                       '<p>Kosketa "Tarkista", jolloin näet oikeat vastaukset.</p>'+
                       '<p>Muistettavia numerosarjoja tulee viisi peräkkäin. Voit keskeyttää tehtävän koskettamalla "Lopeta".</p>',
        "video"      : "//www.youtube.com/embed/XQd-neae2Io",
        "coverImage" : "./img/vis.png"
    },
	{
        "gameId"     : 5,
        "title"      : "Muista kuulemasi sanat",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Sarjan pituus 2 sanaa.</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Sarjan pituus 3 sanaa.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Sarjan pituus 4 sanaa.</p></div>' +

                       "<p>Kuulet sarjan sanoja. Tehtävänä on painaa sarja mieleen.</p>"+
                       "<p>Tämän jälkeen ruudulle ilmestyy häirintätehtävä. Tehtävänä on koskettaa Löytyi-näppäintä aina, kun ruudulle ilmestyy mikä tahansa eläin.</p>"+
                       "<p>Häirintätehtävän jälkeen kirjoita alussa kuulemasi sanat tekstikenttään vapaassa järjestyksessä.</p>"+
                       '<p>Kun kaikki sanat on kirjoitettu, kosketa Valmis -painiketta. Näkyvin tulee oikeiden vastausten määrä.</p>'+
                       '<p>Voit keskeyttää tehtävän koskettamalla ”Lopeta”.</p>',
        "video"      : "//www.youtube.com/embed/RvY3qzzyHp0",
        'coverImage' : './img/aud.png'
    },
	{
        "gameId"     : 6,
        "title"      : "Muista näkemäsi esineet",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: 5 etsittävää esinettä.</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: 8 etsittävää esinettä.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: 14 etsittävää esinettä.</p></div>' +

                       "<p>Ruudulla näkyy esineiden kuvia. Paina esineet mieleesi. Tehtävänä on oppia tunnistamaan nämä muiden joukosta.</p>"+
                       "<p>Mieleenpainamisen jälkeen ruudulle ilmestyy aiemmin esitetyt kuvat ja lisäksi muita kuvia. Merkitse kuvia koskettamalla kaikki tehtävän alussa esitetyt esineet.</p>"+
                       '<p>Kun kosketat ”Valmis”, kone näyttää oikeat vastaukset vihreällä ja puuttuvat esineet oranssilla. Tehtävä jatkuu, kunnes muistat kaikki alussa näytetyt esineet.</p>',
        "video"      : "//www.youtube.com/embed/1iJVzK4PA74",
        "coverImage" : "./img/kim.png"
    },
	{
        "gameId"     : 7,
        "title"      : "Päättele salasana",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Sanan pituus 3 kirjainta.</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Sanan pituus 4 kirjainta.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Sanan pituus 5 kirjainta.</p></div>' +

                       "<p>Yritä päätellä koneen valitsema salasana.</p>" +
                       "<p>Aloita tehtävä koskettamalla tekstikenttää. Kirjoita siihen mikä tahansa määritellyn pituinen sana ja paina ”Valmis”.</p>"+
                       '<p>Kone ilmoittaa, kuinka monta kirjoittamasi sanan kirjaimista on oikeita ja oikealla paikalla (musta ympyrä) ja kuinka monta on oikeita, mutta väärällä paikalla (valkoinen ympyrä).</p>'+
                       "<p>Jatka salasanan päättelyä koneen antamien vihjeiden avulla. Salasana säilyy samana kunnes keksit sen.</p>"+
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta".</p>',
        "video"      : "//www.youtube.com/embed/CaLt6nolbZc",
        "coverImage" : "./img/password.png"
    },
	{
        "gameId"     : 8,
        "title"      : "Sudoku",
        "guide"      : '<div class="well well-info">' +
                       '<p class="lvl-box lvl-easy hidden">Taso I: Kuvaruudulla näkyy 6x6-pääruudukko, josta jokainen ruutu on jaettu edelleen 3x2-pienruudukkoon. Ohjelma valitse ruudun johon numero/hedelmä on täytettävä. Ohjelma ilmoittaa '  +
                       'virheellisen valintayrityksen äänimerkillä.</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Kuvaruudulla näkyy 6x6-pääruudukko, josta jokainen ruutu on jaettu edelleen 3x2-pienruudukkoon. Sekä ruudun, että numeron/ hedelmän saa itse valita.  Ohjelma ilmoittaa ' +
                       'virheellisen valintayrityksen äänimerkillä.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Tasolla III: Kuvaruudulla näkyy 6x6-pääruudukko, josta jokainen ruutu on jaettu edelleen 3x2-pienruudukkoon. Sekä ruudun, että numeron/ hedelmän saa itse valita. Ohjelma sallii myös ' +
                       'virheellisen valinnan. <br/><br/> Kosketa "Tarkista", niin ohjelma ilmoittaa punaisella pohjavärillä, jos ruutu on täytetty sääntöjen vastaisesti. <br/><br/> Virheellinen valinta voidaan vaihtaa koskettamalla uudestaan ruutua ja valitsemalla sivuvalikosta uusi numero/hedelmä. <br/>Kosketa X kun haluat poistaa virheellisen valinnan.</p>' +
                       '<p class="lvl-box lvl-joker hidden">Jokeritaso: Jokeritasolla pääruudukkoja on 9x9. Sekä ruudun, että numeron/hedelmän saa itse valita. Ohjelma sallii myös virheellisen valinnan. <br/><br/> Kosketa "Tarkista" niin ohjelma ilmoittaa punaisella pohjavärillä,' +
                       'jos ruutu on täytetty sääntöjen vastaisesti. <br/><br/> Kosketa ”Vihje” saat ohjelmalta apua suodokun täyttämiseen. <br/><br/> Virheellinen valinta voidaan vaihtaa koskettamalla uudestaan ruutua ja valitsemalla sivuvalikosta uusi numero/hedelmä. <br/>Kosketa X kun haluat poistaa virheellisen valinnan.</p>' +
                       '</div>' +

                       '<p>Tehtävänä on täyttää ruudukon vapaat paikat hedelmillä tai numeroilla 1-6 siten, että kukin hedelmä tai numero voi esiintyä vain kerran jokaisen pääruudukon pysty- tai vaakarivissä sekä jokaisessa pienruudukossa. Osa ruuduista on valmiiksi täytetty, ne on merkitty harmaalla pohjavärillä.</p>' +
                       '<p>Ruudukon täyttäminen tapahtuu koskettamalla haluttua tyhjää ruutua, jolloin sen ympärille muodostuu sininen kehä. Sivulla olevasta valikosta valitaan koskettamalla haluttu numero/hedelmä.</p>' +
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta".</p>',
		    "video"		   : "//www.youtube.com/embed/pAEv88Pkzqw",
        'coverImage' : "./img/sudoku.png"
    },
	{
        "gameId"     : 9,
        "title"      : "Rakenna kuvio mallista",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Pieni ruudukko apuviivoilla.</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Iso ruudukko apuviivoilla.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Iso ruudukko ilman apuviivoja.</p></div>' +

                       "<p>Ruudulla näkyy kaksi neliön muotoista aluetta. Vasemmanpuoleinen neliö on mallikuvio, joka on koottu alareunassa olevista pienistä neliöistä.</p>"+
                       "<p>Tehtävänä on koota oikeanpuolimmainen neliö mallikuvion mukaiseksi.</p>"+
                       "<p>Kokoaminen tapahtuu koskettamalla ensin ruudun alareunassa näkyvää pientä neliötä ja sen jälkeen vastaavaa kohtaa koottavassa ruudukossa.</p>"+
                       '<p>Kosketa “Valmis”. Mikäli kuviossa on virheellisiä tai puuttuvia osia, näkyvät ne punaisella X:lla merkittynä.</p>'+
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta".</p>',
        "video"      : "//www.youtube.com/embed/KhAety3hbk4",
        "coverImage" : "./img/konstruointi.png"
    },
	{
        "gameId"     : 10,
        "title"      : "Jätkänshakki",
        "guide"      : '<div class="well well-info">'+
                       '<p class="lvl-box lvl-easy hidden">Taso I: Helppo vastustaja.</p>' +
                       '<p class="lvl-box lvl-med hidden">Taso II: Keskinkertainen vastustaja.</p>' +
                       '<p class="lvl-box lvl-hard hidden">Taso III: Taitava vastustaja.</p></div>' +
                       
                       "<p>Kuvaruudulla näkyy tyhjä ruudukko.<br/>Tehtävässä kone pelaa ihmistä vastaan.</p>"+
                       '<p>Ruudukkoon asetetaan vuorotellen "risti" ja "nolla" (kone asettaa nollan, ihminen ristin). Tavoitteena on saada viisi peräkkäistä ristiä tai nollaa pysty-, vaaka- tai vinoruudukkoon.</p>'+
                       "<p>Valinta osoitetaan koskettamalla haluttua ruutua.</p>"+
                       '<p>Tehtävä voidaan keskeyttää koskettamalla "Lopeta"</p>',
		    "video"		   : "//www.youtube.com/embed/zuK3eFV0rbA",
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

function pad2(number){
    return (number < 10 ? '0' : '') + number;
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

    var h = pad2(hours);
    var m = pad2(minutes);

    return {'pvm': dd+'/'+mm+'/'+yyyy, 'klo': h+':'+m};
}

Array.prototype.chunk = function(chunkSize) {
    var array=this;
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
};

function hideModal() {
	$('.overlay').css('display','none');
    $('.info-modal').hide();
    $('#content').find('button').removeAttr('disabled');
    $('#content').find('img').prop('disabled',false);
}

function hideTogglePlayerModal (player) {
	var elem = $("#header").find('.toggle-player');

	if(player === 1) {
		Settings.set({'playerRole': 'Kuntoutuja'});
		elem.text('Kuntoutuja');
	}else{
		Settings.set({'playerRole': 'Läheinen'});
		elem.text('Läheinen');
	}

	$('.overlay').css('display','none');
	$('#content').find('button').removeAttr('disabled');
	$('#header').find('button').removeAttr('disabled');
	$('.modal')
		.html("<p class='text-center bigger'>Sisältöä ladataan...</p>")
		.css('display','none');
}

function hideFeedbackModal(status) {
	var mood;
	if(status === 1){
		mood = "positive";
	}else if(status === 2){
		mood = "neutral";
	}else{
		mood = "negative";
	}
	saveGameFeedback(mood);

	$('.overlay').css('display','none');
	$('.back-root').removeAttr('disabled');
	$('#content').find('button').removeAttr('disabled');
	$('.modal')
		.html("<p class='text-center bigger'>Sisältöä ladataan...</p>")
		.css('display','none');
}

function toggleFeedbackCheckbox () {

	if( $('#checkboxFeedback').checked ) {
		Settings.set({'showFeedbackModal': true});
	}else{
		Settings.set({'showFeedbackModal': false});
	}
}

var backend = 'http://stage.pienipiiri.fi/frSaveGame';
function saveGameStart (gameData) {
	$.ajax({
		url: backend,
		type: 'POST',
		dataType: 'json',
		data: gameData,
		success: function(res) {
			Settings.set({'gameInstanceId': res.id});
		}
	});
}

function saveGameEnd () {
	var gameInstanceId = Settings.get('gameInstanceId');
	var scoreObj = JSON.stringify(Settings.get('score'));
	var data = { 'id': gameInstanceId, 'score': scoreObj };
	$.ajax({
		url: 'http://stage.pienipiiri.fi/frSaveGame',
		type: 'POST',
		dataType: 'json',
		data: data,
		success: function(res) {
		}
	});
}

function saveHighScore (gameId, difficulty, scoreObj) {

  var data = {
    'gameId': gameId,
    'userId': Settings.get('currentUserId'),
    'difficultyLevel': difficulty,
    'score': JSON.stringify(scoreObj)
  };
  console.log(data);
  $.ajax({
    url: 'http://stage.pienipiiri.fi/frSaveHighscore',
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(res) {
      console.log(res);
    }
  });
}

function saveGameFeedback (mood) {
	var gameInstanceId = Settings.get('gameInstanceId');
	var data = { 'id': gameInstanceId, 'feedback': mood };
	$.ajax({
		url: backend,
		type: 'POST',
		dataType: 'json',
		data: data,
		success: function(res) {
		}
	});
}

function preloadMoodmeter () {
	var moods = ["./img/face_happy.png","./img/face_neutral.png","./img/face_sad.png"];
	$(moods).preload();
}

function saveInterruptedGame (gameInstanceId) {
  var data = {'id': gameInstanceId };
  $.ajax({
    url: 'http://stage.pienipiiri.fi/frSaveInterruptedGame',
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(res){
      console.log(res);
    }
  });
}

function savePlayedTime (){
  
  var started = Settings.get('startedPlaying');
  var now = new Date();
  var sessionTime = ( now.getTime() - started.getTime() )/1000;
  var data = {userId: Settings.get('currentUserId'), duration: sessionTime};

  $.ajax({
    url: 'http://stage.pienipiiri.fi/frSaveTotalPlayingTime',
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(res){

      //var userId = Settings.get('currentUserId');
      //var returnUrl = Settings.get('returnUrl');
      //window.location = returnUrl+userId;
    }
  });
}

function getPlayedTime (){

    $.ajax({
      url: 'http://stage.pienipiiri.fi/frGetTotalPlayingTime?userId='+Settings.get('currentUserId'),
      type: 'GET'
    }).done(function(data){
      
      var obj = $.parseJSON(data);
      Settings.set({ 'playedTimeMS': obj.duration });
      var sessionTime = Settings.get('sessionTime');
      //console.log('time from backend '+ obj.duration +' secs');
      var totalTime = obj.duration + sessionTime;
      
      var hours = Math.floor(totalTime / 3600) % 24;
      var minutes = Math.floor(totalTime / 60) % 60;

      //console.log('totalTime '+ totalTime +' secs is '+ minutes+ 'mins');
      $('#header h3').text('Olet tänään harjoitellut: '+ hours + "h " + minutes +"min");
  });
}
