let turno = 1;
let fichas = ["O", "X"];
let puestas = 0;
let partidaAcabada = false;
let textoVictoria = document.getElementById("vencedor");
let botones =
    Array.from(document.getElementsByName("botonJugable"));
var modoDeJuego = 2;
/*Iniciamos variable. Si el modo es 0, es pvp, si es 1 es pve fácil y si es 2 es pve difícil*/

/*Para mostrar los modos de juego de pve en la pantalla inicial, al pulsar el botón pve*/
function mostrarBotonesPve() {
    var x = document.getElementById("facilDificil");
    if (x.style.visibility === "visible") {
        x.style.visibility = "hidden";
    } else {
        x.style.visibility = "visible";
    }
}

document.getElementById("pve").onclick = function () {
    mostrarBotonesPve();
}

botones.forEach(
    x => x.addEventListener("click", ponerFicha)
);

var cuadro = document.querySelector("#cuadro");

function cargarPartida() {
    //cuadro.setAttribute("visibility", "visible"); //Esto de momento no funciona
    document.getElementById("cuadro").style.visibility = "visible";
    document.getElementById("reinicio").style.visibility = "visible";
    document.getElementById("tipoJuego").style.visibility = "hidden";
    document.getElementById("facilDificil").style.visibility = "hidden";
} //Esta función muestra el cuadro de juego y oculta los botones superiores

//Muestra la barra de carga, la anima y luego la oculta
function animar() {
    document.getElementById("progress").style.visibility = "visible";
    document.getElementById("barra").classList.toggle("final");
    setTimeout(function () {
        document.getElementById("progress").style.visibility = "hidden";
    }, 1000);
}

/*En función del botón que pulsemos, se cargará siempre la barra de progreso, luego desaparece, carga el cuadro de juego y la variable modoJuego tendrá un valor distinto*/
document.querySelector("#pvp").addEventListener("click", function () {
    modoDeJuego = 0;
    animar();
    setTimeout(function () {
        cargarPartida();
    }, 1000);
    document.getElementById("textoModoJuego").innerHTML = 'Jugador contra Jugador <i class="fas fa-people-arrows"></i>';
    //document.getElementById("modoJuego").innerHTML = modoDeJuego;
});

document.querySelector("#botonPveFacil").addEventListener("click", function () {
    modoDeJuego = 1;
    animar();
    setTimeout(function () {
        cargarPartida();
    }, 1000);
    document.getElementById("textoModoJuego").innerHTML = 'Jugador contra la máquina. Modo fácil <i class="fas fa-shapes"></i>';
    //document.getElementById("modoJuego").innerHTML = modoDeJuego;
});

document.querySelector("#botonPveDificil").addEventListener("click", function () {
    modoDeJuego = 2;
    animar();
    setTimeout(function () {
        cargarPartida();
    }, 1000);
    document.getElementById("textoModoJuego").innerHTML = 'Jugador contra la máquina. Modo difícil <i class="fas fa-fire-alt"></i>';
    //document.getElementById("modoJuego").innerHTML = modoDeJuego;
});

function reiniciar() {
    window.location.reload();
    window.scrollTo(0, 0); //recarga la página y hace scroll a la parte de arriba
}
document.querySelector("#reiniciar").addEventListener("click", function () {
    reiniciar();
});

function ponerFicha(event) {
    let botonPulsado = event.target;
    if (!partidaAcabada && botonPulsado.innerHTML == "") {
        /*Comprobamos que la partida no ha acabado y que el botón no tiene ningún texto*/
        botonPulsado.innerHTML = fichas[turno];
        puestas += 1; /*Cuando pulsamos un botón el contador de "puestas" sube 1*/
        let estadoPartida = estado(); /*0 si nadie ha ganado, 1 si gana el jugador, -1 si gana la máquina*/
        if (estadoPartida == 0) {
            /*Si nadie ha ganado...*/
            cambiarTurno();
            if (puestas < 9) {
                document.getElementById("modoJuego").innerHTML == modoDeJuego;
                if (modoDeJuego === 0) {
                    playerVsPlayer();
                    estadoPartida = estado();
                    puestas += 1;
                    cambiarTurno();
                } else if (modoDeJuego === 1) {
                    iaFacil();
                    estadoPartida = estado();
                    puestas += 1;
                    cambiarTurno();
                } else if (modoDeJuego === 2) {
                    iaDificil();
                    estadoPartida = estado();
                    puestas += 1;
                    cambiarTurno();
                }
            } else if (puestas = 9 && estadoPartida == 0) {
                /*Si no quedan movimientos y no hay un ganador, hay un empate*/
                textoVictoria.innerHTML = '<i class="far fa-laugh-squint"></i> ¡Empate! <i class="fas fa-skull-crossbones"></i>';
                partidaAcabada = true;
                textoVictoria.style.visibility = "visible";
            }
        }
        if (estadoPartida == 1) {
            textoVictoria.style.visibility = "visible";
            partidaAcabada = true;
        } else if (estadoPartida == -1) {
            textoVictoria.innerHTML = '<i class="far fa-laugh-squint"></i> ¡Has perdido, lamer! <i class="fas fa-skull-crossbones"></i>';
            partidaAcabada = true;
            textoVictoria.style.visibility = "visible";
        }
    }
}


function cambiarTurno() {
    if (turno == 1) {
        turno = 0;
    } else {
        turno = 1;
    }
}

function estado() {
    posicionVictoria = 0;
    let nEstado = 0;

    function sonIguales(...args) {
        valores = args.map(x => x.innerHTML);
        if (valores[0] != "" && valores.every((x, i, arr) => x === arr[0])) {
            args.forEach(x => x.style.backgroundColor = "lightgreen")
            return true;
        } else {
            return false;
        }
    }

    /*Comprobamos si hay alguna línea ganadora*/
    if (sonIguales(botones[0], botones[1], botones[2])) {
        posicionVictoria = 1;
    } else if (sonIguales(botones[3], botones[4], botones[5])) {
        posicionVictoria = 2;
    } else if (sonIguales(botones[6], botones[7], botones[8])) {
        posicionVictoria = 3;
        /*Comprobamos las columnas*/
    } else if (sonIguales(botones[0], botones[3], botones[6])) {
        posicionVictoria = 4;
    } else if (sonIguales(botones[1], botones[4], botones[7])) {
        posicionVictoria = 5;
    } else if (sonIguales(botones[2], botones[5], botones[8])) {
        posicionVictoria = 6;
        /*Comprobamos las diagonales*/
    } else if (sonIguales(botones[0], botones[4], botones[8])) {
        posicionVictoria = 7;
    } else if (sonIguales(botones[2], botones[4], botones[6])) {
        posicionVictoria = 8;
    }

    //Comprobamos quien ha ganado
    if (posicionVictoria > 0) {
        if (turno == 1) {
            nEstado = 1;
        } else {
            nEstado = -1;
        }
    }
    return nEstado;
}


function playerVsPlayer() {
    //Función player vs player
    /* document.getElementById("modoJuego").innerHTML = "He entrado en la función playerVsPlayer"; */
}

function iaFacil() {
    /* document.getElementById("modoJuego").innerHTML = "He entrado en la función iaFacil"; */
    /*Función aleatorio para el modo fácil*/
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let valores = botones.map(x => x.innerHTML);
    let pos = -1;

    let n = aleatorio(0, botones.length - 1);
    while (valores[n] != "") {
        n = aleatorio(0, botones.length - 1);
    } /*Solo sale de este bucle si encuentra una posición libre (y que no sea el centro)*/
    pos = n;

    botones[pos].innerHTML = "O";
    return pos;
}


function iaDificil() {
    /* document.getElementById("modoJuego").innerHTML = "He entrado en la función iaDificil"; */
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let valores = botones.map(x => x.innerHTML);
    let pos = -1;
    //Si está el centro libre, a por él
    if (valores[4] == "") {
        pos = 4;
        //Si el centro está ocupado, la máquina va a por las esquinas
    } else if (valores[0] == "") {
        pos = 0;
    } else if (valores[2] == "") {
        pos = 2;
    } else if (valores[6] == "") {
        pos = 6;
    } else if (valores[8] == "") {
        pos = 8;
    } else if (((sonIguales(botones[1], botones[2]) && botones[1] !== "") || (sonIguales(botones[3], botones[6]) && botones[3] !== "") || (sonIguales(botones[4], botones[8]) && botones[4] !== "")) && valores[0] == "") {
        pos = 0;
    } else if (((sonIguales(botones[0], botones[2]) && botones[0] !== "") || (sonIguales(botones[4], botones[7]) && botones[4] !== "")) && valores[1] == "") {
        pos = 1;
    } else if (((sonIguales(botones[0], botones[1]) && botones[0] !== "") || (sonIguales(botones[5], botones[8]) && botones[5] !== "") || (sonIguales(botones[4], botones[6]) && botones[4] !== "")) && valores[2] == "") {
        pos = 2;
    } else if (((sonIguales(botones[4], botones[5]) && botones[4] !== "") || (sonIguales(botones[0], botones[6]) && botones[0] !== "")) && valores[3] == "") {
        pos = 3;
    } else if (((sonIguales(botones[3], botones[4]) && botones[3] !== "") || (sonIguales(botones[2], botones[8]) && botones[2] !== "")) && valores[5] == "") {
        pos = 5;
    } else if (((sonIguales(botones[7], botones[8]) && botones[7] !== "") || (sonIguales(botones[0], botones[3]) && botones[0] !== "") || (sonIguales(botones[2], botones[4]) && botones[2] !== "")) && valores[6] == "") {
        pos = 6;
    } else if (((sonIguales(botones[6], botones[8]) && botones[6] !== "") || (sonIguales(botones[1], botones[4]) && botones[1] !== "")) && valores[7] == "") {
        pos = 7;
    } else if (((sonIguales(botones[6], botones[7]) && botones[6] !== "") || (sonIguales(botones[2], botones[5]) && botones[2] !== "") || (sonIguales(botones[0], botones[4]) && botones[0] !== "")) && valores[8] == "") {
        pos = 8;
    } else { //Si el centro está pillado y nadie puede hacer 3 en raya en la siguiente jugada, genera una posición aleatoria
        let n = aleatorio(0, botones.length - 1);
        while (valores[n] != "") {
            n = aleatorio(0, botones.length - 1);
        } //Solo sale de este bucle si encuentra una posición libre (y que no sea el centro)
        pos = n;
    }
    botones[pos].innerHTML = "O";
    return pos;
}