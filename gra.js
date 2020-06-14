document.querySelectorAll('.slot').forEach(slot => slot.addEventListener('click', handleSlotClick));

const buttStart = document.querySelector('.start');
buttStart.disabled = true;

const buttRestart = document.querySelector('.restart');
buttRestart.disabled = true;

const buttStop = document.querySelector('.stop');
buttStop.disabled = true;

var p1 = document.getElementById("playerOneTyp");
var p2 = document.getElementById("playerTwoTyp");

p1.addEventListener('change', handleGraczClick);
p2.addEventListener('change', handleGraczClick);

var info = document.getElementById("reporter");

function handleGraczClick (clickedGraczEvent) {
	if (p1.value !== "0" && p2.value !== "0") {
		buttStart.disabled = false;
		buttStart.addEventListener('click', handleStartClick);
	}
	else {
		buttStart.removeEventListener('click', handleStartClick);
		buttStart.disabled = true;
	}
}

var stanGry = ["", "", "", "", "", "", "", "", ""];
var graczSymbol = "";
var graczAktualny = "";
var graczLudzki = false;
var graczWygral = "";

function handleStartClick () {
	buttStart.removeEventListener('click', handleStartClick);
	buttStart.disabled = true;
	p1.disabled = true;
	p2.disabled = true;
	buttStop.disabled = false;
	buttStop.addEventListener('click', handleKonieClick);
	buttRestart.disabled = false;
	buttRestart.addEventListener('click', handleRestartClick);
	nowaGra();
}

function handleKonieClick () {
	buttRestart.removeEventListener('click', handleRestartClick);
	buttRestart.disabled = true;
	buttStop.removeEventListener('click', handleKonieClick);
	buttStop.disabled = true;
	p1.disabled = false;
	p2.disabled = false;
	buttStart.disabled = false;
	buttStart.addEventListener('click', handleStartClick);
	info.innerHTML = "Wybierz graczy";
}

function handleRestartClick () {
	nowaGra ();
}



function nowaGra () {
	stanGry = ["", "", "", "", "", "", "", "", ""];
	rysujPlansze();
	info.innerHTML = "";
	graczAktualny = Math.floor(Math.random() * 6) % 2 ? '1' : '2';
	graczSymbol = Math.floor(Math.random() * 6) % 2 ? 'X' : 'O';
	logujGre("Zaczyna gracz "+graczAktualny+" z symbolem "+graczSymbol);
	graczWygral = "";
	turaGracza();
}

function turaGracza () {
	if (graczAktualny === '1') {
		if (p1.value === '1') {
			ruchGracz();
		}
		else {
			ruchRandy();
		}
	}
	else {
		if (p2.value === '1') {
			ruchGracz();
		}
		else {
			ruchRandy();
		}
	}
	//rysujPlansze();
}

function ruchGracz () {
	graczLudzki = true;
	return;
}

function handleSlotClick (clickedSlotEvent) {
	if (!graczLudzki) { return; }
	const clickedSlot = clickedSlotEvent.target;
	const clickedSlotIndex = parseInt(clickedSlot.getAttribute('id'));
	if (stanGry[clickedSlotIndex] === "") {
		stanGry[clickedSlotIndex] = graczSymbol;
		clickedSlot.innerHTML = graczSymbol;
		graczLudzki = false;
		sprawdzKoniec();
	}
	else {
		ruchGracz();
	}
}

var ruch = 0;

function ruchRandy () {
	ruch = Math.floor(Math.random() * 9);
	if (stanGry[ruch] === "") {
		stanGry[ruch] = graczSymbol;
		document.getElementById(ruch).innerHTML = graczSymbol;
		info.innerHTML = "(Komputer)"+info.innerHTML;
		sprawdzKoniec();
	}
	else {
		ruchRandy();
	}
}

function zmienGracza () {
	graczAktualny = graczAktualny !== '1' ? '1' : '2';
	graczSymbol = graczSymbol !== 'X' ? 'X' : 'O';
	logujGre("Ruch gracza "+graczAktualny+" - "+graczSymbol);
	turaGracza();
}

function sprawdzKoniec () {
	sprawdzWarunek (2,4,6);
	sprawdzWarunek (0,4,8);
	for (let i = 0; i < 3; i++) {
		sprawdzWarunek (i*3,i*3+1,i*3+2);
		sprawdzWarunek (i,i+3,i+6);
	}
	if (graczWygral !== "") {
		logujGre("WYGRYWA "+graczWygral);
		return;
	}
	else {
		if (!stanGry.includes("")) {
			logujGre("REMIS!");
			return;
		}
	}
	zmienGracza();
}

function sprawdzWarunek (a,b,c) {
	if (stanGry[a] === "" || stanGry[b] === "" || stanGry[c] === "") {
		return;
	}
	if (stanGry[a] === stanGry[b] && stanGry[b] === stanGry[c]) {
		graczWygral = stanGry[a];
	}
}

function rysujPlansze () {
	for (let i = 0; i <= 8; i++) {
		document.getElementById(i).innerHTML = stanGry[i];
	}
}

function logujGre (wpis) {
	info.innerHTML = wpis+"<br>"+info.innerHTML;
}