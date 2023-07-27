//  **** Declaración de Vqriables
//  Declaro constantes
const max = 9;
const min = 0;
const cantNrosGanadores = 4;
//  Declaro variables
let cantIntentos; //  Almacena la cantidad de Intentos
let nrosGanadores = []; //  Almacena un array con los nrosGanadores

//  Funciones con Eventos de Botones
function iniciarJuego() {
  crearNrosGanadores();
  iniciarIntentos();
}
function jugar() {
  // Valido que esista jueno, sino lo creo
  if (nrosGanadores.length == 0) {
    iniciarJuego();
  }
  let nrosIngresados = obtenerIntento();
  if (
    validarCantNumeros(nrosIngresados) &&
    validarSoloNumeros(nrosIngresados)
  ) {
    cantIntentos++;
    let resultJugada = evaluarResultado(nrosIngresados);
    if (resultJugada == "Gano") {
      alert("Ganó el Juego en " + cantIntentos + " Intentos!!!");
    } else {
      alert(resultJugada);
      jugar();
    }
  } else {
    alert("Error. Debe ingresar 4 números. Chance No computada");
    jugar();
  }
}

//  Funciones
//  Crea el array de numeros Ganadores
function crearNrosGanadores() {
  nrosGanadores = [];
  while (nrosGanadores.length < cantNrosGanadores) {
    let nro = obtenerNroRandom(max, min);
    if (!existeEnGanadores(nro)) {
      agregarEnGanadores(nro);
    }
  }
}
//  Obtiene un nro Random
function obtenerNroRandom(maximo, minimo) {
  return parseInt(Math.random() * (maximo - minimo));
}
//  Valida si el númeroGanador se encuentra entre los nrosGanadores
function existeEnGanadores(nroValidar) {
  let existe = false;
  if (nrosGanadores.length > 0) {
    let i = 0;
    while (!existe && i < nrosGanadores.length) {
      if (nrosGanadores[i] == nroValidar) existe = true;
      i++;
    }
  }
  return existe;
}
//  Agrega el númeroGanador a los nrosGanadores
function agregarEnGanadores(nro) {
  nrosGanadores.push(nro);
}
//  Inicia la cantidad de Intentos en 0. Función pasada a función flecha
const iniciarIntentos = () => {cantIntentos = 0;};
// function iniciarIntentos() {
//   cantIntentos = 0;
// }
//  Obtiene el intento. Función pasada a función flecha
const obtenerIntento = ()=>{return prompt("Ingrese 4 números");}
// function obtenerIntento() {
//   return prompt("Ingrese 4 números");
// }
// ***** Validaciones ***********************
//  Valida la cantidad de números ingresados
function validarCantNumeros(ingreso) {
  let valido = true;
  if (ingreso.length != 4) {
    valido = false;
  }
  return valido;
}
//  Valida que sea número. Función con parámetro pasada a función flecha
const esNumero = (valor) =>{
  let result = true;
  if (isNaN(valor)) {
    result = false;
  }
  return result;
}
// function esNumero(valor) {
//   let result = true;
//   if (isNaN(valor)) {
//     result = false;
//   }
//   return result;
// }
//  Valida que sean números
function validarSoloNumeros(ingreso) {
  let valido = true;
  for (let index = 0; index < ingreso.length; index++) {
    if (!esNumero(ingreso[index])) {
      valido = false;
    }
  }
  return valido;
}
// ***** Resultado ***********************
//  Evalua resultado
function evaluarResultado(numeros) {
  let cantVerde = 0;
  let cantAmarillo = 0;
  let cantRojo = 0;
  let result = "";
  if (numeros.length == 4) {
    for (let index = 0; index < numeros.length; index++) {
      if (sumaVerde(numeros[index], index)) {
        cantVerde++;
      } else {
        if (sumaAmarillo(numeros[index], index)) {
          cantAmarillo++;
        } else {
          if (sumaRojo(numeros)) {
            cantRojo++;
          }
        }
      }
    }
  }
  if (cantVerde == 4) {
    result = "Gano";
  } else {
    result =
      "Intento: " +
      cantIntentos +
      ". JUEGO ****" +
      numeros +
      "****Resultado: Verdes: " +
      cantVerde +
      ". Amarillos: " +
      cantAmarillo +
      ". Rojos: " +
      cantRojo;
    // console.log(result);  A Escribir en pantalla
  }
  return result;
}
//  Suma Verde?
function sumaVerde(numero, posicion) {
  let result = false;
  if (nrosGanadores[posicion] == numero) {
    result = true;
  }
  return result;
}
//  Suma Amarillo?
function sumaAmarillo(numero, posicion) {
  let result = false;
  for (let index = 0; index < nrosGanadores.length; index++) {
    if (nrosGanadores[index] == numero && index != posicion) {
      result = true;
    }
  }
  return result;
}
//  Suma Rojo?
function sumaRojo(numero) {
  let result = true;
  for (let index = 0; index < nrosGanadores.length; index++) {
    if (nrosGanadores[index] == numero) {
      result = true;
    }
  }
  return result;
}
