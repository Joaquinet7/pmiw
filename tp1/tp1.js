let titulo;

let marioFrames = [];
let marioSaltoFrames = [];
let luigiFrames = [];

let archivosMario = [
  "mariocaminando1.png",
  "mariocaminando2.png"
];

let archivosSalto = [
  "mariosaltando1.png",
  "mariosaltando2.png"
];

let archivosLuigi = [
  "luigicaminando1.png",
  "luigicaminando2.png"
];


let marioX = -80;
let luigiX = 880;

let posicionY = 480;

let velocidadMario = 4;
let velocidadLuigi = 4;

let velocidadAnimacion = 8;

let estado = "marioCaminando";

let comienzoSalto = 0;
let duracionSalto = 60;
let alturaSalto = 140;


function preload() {

  titulo = loadImage("titulo.png");

  for (let i = 0; i < archivosMario.length; i++) {
    marioFrames[i] = loadImage(archivosMario[i]);
  }

  for (let i = 0; i < archivosSalto.length; i++) {
    marioSaltoFrames[i] = loadImage(archivosSalto[i]);
  }

  for (let i = 0; i < archivosLuigi.length; i++) {
    luigiFrames[i] = loadImage(archivosLuigi[i]);
  }

}


function setup() {

  createCanvas(800, 600);

}


function draw() {

  dibujarFondo();

  dibujarTitulo();


  if (estado === "marioCaminando") {

    marioX = marioX + velocidadMario;

    dibujarPersonaje(marioFrames, marioX, posicionY, 8, velocidadAnimacion, false);

    if (marioX >= width / 2) {

      estado = "marioSaltando";

      comienzoSalto = frameCount;

    }

  }


  else if (estado === "marioSaltando") {

    marioX = marioX + velocidadMario;

    let tiempoSalto = frameCount - comienzoSalto;

    let progresoSalto = tiempoSalto / duracionSalto;

    let saltoY = posicionY - sin(progresoSalto * PI) * alturaSalto;

    dibujarPersonaje(marioSaltoFrames, marioX, saltoY, 8, 10, false);

    if (tiempoSalto >= duracionSalto) {

      estado = "marioCaminandoDespues";

    }

  }


  else if (estado === "marioCaminandoDespues") {

    marioX = marioX + velocidadMario;

    dibujarPersonaje(marioFrames, marioX, posicionY, 8, velocidadAnimacion, false);

    if (marioX > width + 80) {

      estado = "luigiCaminando";

      luigiX = width + 80;

    }

  }


  else if (estado === "luigiCaminando") {

    luigiX = luigiX - velocidadLuigi;

    dibujarPersonaje(luigiFrames, luigiX, posicionY, 8, velocidadAnimacion, true);

    if (luigiX < -80) {

      estado = "marioCaminando";

      marioX = -80;

    }

  }


  dibujarTexto();

}


function dibujarPersonaje(frames, x, y, escala, velocidad, invertir) {

  let frame = obtenerFrame(frames.length, velocidad);

  push();

  imageMode(CENTER);

  if (invertir === false) {

    image(frames[frame], x, y, 16 * escala, 21 * escala);

  }

  else {

    translate(x, y);

    scale(-1, 1);

    image(frames[frame], 0, 0, 16 * escala, 21 * escala);

  }

  pop();

}


function obtenerFrame(cantidadFrames, velocidad) {

  let numeroFrame;

  numeroFrame = floor(frameCount / velocidad);

  numeroFrame = numeroFrame % cantidadFrames;

  return numeroFrame;

}


function dibujarFondo() {

  background(92, 148, 252);

  fill(255);

  noStroke();

  rect(0, 455, width, 145);

  fill(0);

  rect(0, 455, width, 5);

  fill(255);

  rect(80, 130, 90, 20);

  rect(100, 115, 50, 35);

  rect(600, 170, 90, 20);

  rect(620, 155, 50, 35);

}


function dibujarTitulo() {

  image(titulo, 0, 0, 800, 600);

}
