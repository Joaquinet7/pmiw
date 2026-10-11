let textoActual = [];
let fondo = [];
let escena = {};
let texto = [];
let repFinal = {0: final_1, 1: final_animacion};
let fondoNegro = false;

let T = true;

let TA = 0;
let EA = 0;
let f = 0;
let v = 0;

let idea = false;

let fnl;
let final = false;

let mouseSoltado = false;

let fuente;

// --- Animación final ---
let fotogramas = [];
let indiceFotograma = 0;
let fondoFinal;
let robotX;
let robotY;
let velocidad = 2.5;
let escalaRobot = 360;
let velocidadAnimacion = 8;


function mouseReleased() {
  mouseSoltado = false;
}

function sprite1(archivo) {
  return loadImage("data/" + archivo + ".png");
}

function sprite2(archivo) {
  return loadImage("data/" + archivo + ".jpg");
}

function fondoEscena(a) {
  fondo[a] = loadImage("data/fondo" + a + ".jpeg");
}

function fondoEscena1(a) {
  fondo[a] = loadImage("data/fondo" + a + ".png");
}

function fondoEscena2(a) {
  fondo[a] = loadImage("data/fondo" + a + ".webp");
}


function preload() {
  fuente = loadFont("data/PressStart2P.ttf");

  textoActual[0] = "En este mundo, las industrias usan robots para construir sus maquinas";

  fondoEscena(0);
  fondoEscena1(1);
  fondoEscena1(2);
  fondoEscena2(3);
  fondoEscena(4);
  fondoEscena(5);
  fondoEscena(6);
  fondoEscena1(7);
  fondoEscena1(8);
  fondoEscena1(9);
  fondoEscena1(10);

  // Animación final
  fondoFinal = loadImage("data/fondo.png");
  for (let i = 0; i < 7; i++) {
    fotogramas[i] = loadImage("data/robotcamina" + (i + 1) + ".png");
  }

  escena[0] = escena_0;
  escena[1] = escena_1;
  escena[2] = escena_2;
  escena[3] = escena_3;
  escena[4] = escena_4;

  escena[99] = escena_texto;
}


function interactivo1(sprite, posX, posY, txt, esc, ff, vv, acc) {
  if (dist(mouseX, mouseY, posX, posY) < sprite.width / 2 && mouseIsPressed && !mouseSoltado) {
    TA = txt;
    EA = esc;
    f = ff;
    v = vv;
    mouseSoltado = true;
  }

  image(sprite, posX - sprite.width / 2, posY - sprite.height / 2);

  if (dist(mouseX, mouseY, posX, posY) < sprite.width / 2) {
    fill(250);
    textSize(10);
    text(acc, mouseX, mouseY);
  }
}

function interactivo(posX, posY, tamX, tamY, txt, esc, ff, vv, acc) {
  fill(175, 0, 0, 80);
  noStroke();
  rect(posX, posY, tamX, tamY);

  if (mouseX >= posX && mouseX <= posX + tamX && mouseY >= posY && mouseY <= posY + tamY) {
    fill(250);
    textSize(10);
    text(acc, mouseX, mouseY);

    if (mouseIsPressed && !mouseSoltado) {
      TA = txt;
      EA = esc;
      f = ff;
      v = vv;
      mouseSoltado = true;
    }
  }
}

function fsuma() {
  f = f + 1;
}

function setup() {
  createCanvas(800, 450);
  frameRate(30);

  // Posición inicial del robot de la animación final
  robotX = 10;
  robotY = height - escalaRobot / 2;
}


function draw() {
  // Si estamos en un final, se dibuja solo el final
  if (final) {
    repFinal[fnl]();
    return;
  }

  if (fondoNegro) {
    fill(0);
    rect(0, 0, 800, 250);
  } else if (fondo[f]) {
    image(fondo[f], 0, 0, 800, 250);
  } else {
    fill(60, 80, 100);
    rect(0, 0, 800, 250);
  }
  fill(0);
  rect(0, 250, 800, 200);

  escena[EA]();

  textSize(12);
  fill(255);
  textFont(fuente);
  text(textoActual, 20, 272);

  if (T) {
    escena_texto();
  }

  fill(250, 250, 0);
  textSize(20);
  text(mouseX + " - " + mouseY + ", " + f + ", " + EA, mouseX, mouseY + 30);
}

function escena_no() {
  fondoNegro = true;
}

function escena_texto() {
  fill(255);
  noStroke();
  triangle(730, 400, 730, 432, 762, 416);

  fill(175, 0, 0, 80);
  noStroke();
  rect(726, 396, 40, 40);

  if (mouseX >= 726 && mouseX <= 726 + 40 && mouseY >= 396 && mouseY <= 396 + 40) {
    if (mouseIsPressed && !mouseSoltado) {
      text(textoActual, 10, 260);
      mouseSoltado = true;
    }
  }
}

function escena_0() {
  if (v === 0) {
    // bomba
    interactivo(353, 153, 70, 37, 0, 1, 2, 0, "Resignarse y seguir trabajando");
    // puerta
    interactivo(443, 17, 150, 120, 0, 0, 1, 1, "Explotar la puerta");
  } else {
    // puerta rota
    interactivo(443, 17, 150, 120, 0, 2, 7, 0, "Escapar");
  }
}

function escena_1() {
  if (f <= 5) {
    fill(175, 0, 0, 80);
    noStroke();
    rect(353, 153, 70, 37);

    if (mouseX >= 353 && mouseX <= 353 + 70 && mouseY >= 153 && mouseY <= 153 + 37) {
      fill(250);
      textSize(10);
      text("seguir trabajando", mouseX, mouseY);

      if (mouseIsPressed && !mouseSoltado) {
        fsuma();
        mouseSoltado = true;
      }
    }

    if (f >= 4) {
      interactivo(346, 98, 20, 20, 0, 1, f, 0, "apagarte");
    }

  } else {
    fill(175, 0, 0, 80);
    noStroke();
    rect(443, 17, 150, 120);

    if (mouseX >= 443 && mouseX <= 443 + 150 && mouseY >= 17 && mouseY <= 17 + 120) {
      fill(250);
      textSize(10);
      text("Salir", mouseX, mouseY);

      if (mouseIsPressed && !mouseSoltado) {
        final = true;
        fnl = 1;            // 1 = animación del robot, 0 = "final malo"
        mouseSoltado = true;
      }
    }
  }
}

function escena_2() {
  interactivo(196, 50, 88, 70, 0, 4, 10, 0, "Seguir el sonido");
  interactivo(511, 58, 88, 73, 0, 3, 8, 0, "Ignorar el sonido");
}

function escena_3() {
  interactivo(196, 50, 88, 70, 0, 0, 0, 0, "Seguir el camino");
  interactivo(153, 201, 70, 30, 0, 2, 7, 0, "Volver a la habitacion anterior");

  if (v == 0) {
    if (idea) {
      interactivo(639, 64, 40, 90, 0, 3, 9, 1, "Explotar grieta");
    }
  } else {
    interactivo(551, 58, 100, 85, 0, 0, 0, 0, "Pasar por el agujero");
  }
}

function escena_4() {
  interactivo(80, 52, 150, 75, 0, 0, 0, 0, "Ponerle una bomba al monstruo");
}


function final_1() {
  background(0);
  fill(255);
  textFont(fuente);
  textSize(12);
  text("final malo", 200, 100);
}

function final_animacion() {
  // Fondo ocupando todo el lienzo
  imageMode(CORNER);
  image(fondoFinal, 0, 0, width, height);

  // Cambiar de fotograma para simular la caminata
  if (frameCount % velocidadAnimacion === 0) {
    if (indiceFotograma < 5) {
      indiceFotograma++;
    } else {
      // Alternar solamente entre las imágenes 6 y 7
      indiceFotograma = (indiceFotograma === 5) ? 6 : 5;
    }
  }

  let robot = fotogramas[indiceFotograma];
  let anchoRobot = escalaRobot * robot.width / robot.height;

  imageMode(CENTER);
  image(robot, robotX, robotY, anchoRobot, escalaRobot);
  imageMode(CORNER);   // devolver el modo que usa el resto del juego

  // Desplazar el robot hacia la derecha
  robotX += velocidad;

  // Si sale de la pantalla, vuelve a empezar por la izquierda
  if (robotX > width + anchoRobot / 2) {
    robotX = 50;
    indiceFotograma = 0;
  }
}