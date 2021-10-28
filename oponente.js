let turno = 1;
let fichas = ["O", "X"];
let puestas = 0;
let partidaAcabada = false;
let textoVictoria =
    document.getElementById("textoVictoria");
let botones =
    Array.from(document.getElementsByName("botonJugable"));

botones.forEach(
    x => x.addEventListener("click", ponerFicha)
);

let modoJuego;
/*Iniciamos variable. Si el modo es 0, es pvp, si es 1 es pve fácil y si es 2 es pve difícil*/

/*Para mostrar los modos de juego de pve en la pantalla inicial, al pulsar el botón pve*/
function mostrarBotonesPve() {
    var x = document.getElementById("facilDificil");
    if (x.style.visibility === "visible") {
        x.style.visibility = "hidden";
    } else {
        x.style.visibility = "visible";
    }
    //document.getElementById("facilDificil").style.visibility = "visible";
}

document.getElementById("pve").onclick = function () {
    mostrarBotonesPve();
}

var cuadro = document.querySelector("#cuadro");

function cargarPartida() {
    //cuadro.setAttribute("visibility", "visible"); //Esto de momento no funciona

    document.getElementById("cuadro").style.visibility = "visible";
    document.getElementById("reinicio").style.visibility = "visible";
    document.getElementById("tipoJuego").style.visibility = "hidden";
    document.getElementById("facilDificil").style.visibility = "hidden";
} //Esta función muestra el cuadro de juego

function asignarModoJuego() {
    if (document.getElementById("pvp").onclick) {
        modoJuego = 0;
    } else if (document.getElementById("botonPveFacil").onclick) {
        modoJuego = 1;
    } else if (document.getElementById("botonPveDificil").onclick) {
        modoJuego = 2;
    }
}

function animar() {
    document.getElementById("progress").style.visibility = "visible";
    document.getElementById("barra").classList.toggle("final");
    setTimeout(function () {
        document.getElementById("progress").style.visibility = "hidden";
    }, 2000);
}


/*En función del botón que pulsemos, se cargará siempre la barra de progreso, luego desaparece, carga el cuadro de juego y la variable modoJuego tendrá un valor distinto*/
document.querySelector("#pvp").addEventListener("click", function () {
    animar();
    setTimeout(function () {
        cargarPartida();
    }, 2000);
    asignarModoJuego();
    document.getElementById("textoModoJuego").innerHTML = "Jugador contra Jugador";
});

document.querySelector("#botonPveFacil").addEventListener("click", function () {
    animar();
    setTimeout(function () {
        cargarPartida();
    }, 300);
    asignarModoJuego();
    document.getElementById("textoModoJuego").innerHTML = "Jugador contra la máquina. Modo fácil";
});

document.querySelector("#botonPveDificil").addEventListener("click", function () {
    animar();
    setTimeout(function () {
        cargarPartida();
    }, 300);
    asignarModoJuego();
    document.getElementById("textoModoJuego").innerHTML = "Jugador contra la máquina. Modo difícil";
});

function reiniciar() {
    window.location.reload();
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
                /*Si no se ha llenado el tablero*/
                iaFacil(); /*Llamamos a la función de que la ia(máquina) mueva*/
                /*OJO AQUÍ ELEGIREMOS iaFacil O iaDificil EN FUNCIÓN DEL MODO QUE ELIJAMOS
                AL PRINCIPIO*/
                estadoPartida = estado();
                puestas += 1;
                cambiarTurno();
            }
        }

        if (estadoPartida == 1) {
            textoVictoria.style.visibility = "visible";
            partidaAcabada = true;
        } else if (estadoPartida == -1) {
            textoVictoria.innerHTML = '<i class="far fa-laugh-squint"></i> ¡Has perdido, lamer! <i class="fas fa-skull-crossbones"></i>';
            partidaAcabada = true;
            textoVictoria.style.visibility = "visible";
        } else if (estadoPartida == 0) {
            /*Si no quedan movimientos y no hay un ganador, hay un empate*/
            textoVictoria.innerHTML = '<i class="far fa-laugh-squint"></i> ¡Empate! <i class="fas fa-skull-crossbones"></i>';
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
    nEstado = 0;

    function sonIguales(...args) {
        valores = args.map(x => x.innerHTML);
        if (valores[0] != "" && valores.every((x, i, arr) => x === arr[0])) {
            /*Aquí comprobamos que los botones tienen el mismo valor SALVO "" */
            args.forEach(x => x.style.backgroundColor = "lightgreen");
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

    /*Comprobamos quien ha ganado*/
    if (posicionVictoria > 0) {
        if (turno == 1) {
            nEstado = 1; /*Gana el jugador*/
        } else {
            nEstado = -1; /*Gana la máquina*/
        }
    }
    return nEstado;
}

/*
function playerVsPlayer() {
    //Función player vs player
}*/

function iaFacil() {
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

/*
function iaDificil() {
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let valores = botones.map(x => x.innerHTML);
    let pos = -1;

    //Si está el centro libre, a por él
    if (valores[4] == "") {
        pos = 4;
    } else { //Si el centro está pillado genera una posición aleatoria
        let n = aleatorio(0, botones.length - 1);
        while (valores[n] != "") {
            n = aleatorio(0, botones.length - 1);
        } //Solo sale de este bucle si encuentra una posición libre (y que no sea el centro)
        pos = n;
    }
    botones[pos].innerHTML = "O";
    return pos;
}*/