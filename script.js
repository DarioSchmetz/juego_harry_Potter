
  const imagenes = [
  "harry.jpg", "harry.jpg",
  "severus.jpg", "severus.jpg",
  "hermione.jpg", "hermione.jpg",
  "ron.jpg", "ron.jpg",
  "albus.jpg", "albus.jpg"
];

let cartasVolteadas = [];
let abiertas = 0;
let juegoIniciado = false;
let permitirVolteo = true;

function barajarCartas(imagenes) {
  return imagenes
    .map((imagen, index) => ({ orden: Math.random(), valor: imagen, index: index }))
    .sort((a, b) => a.orden - b.orden)
    .map((a) => a.valor);
}

function voltearCarta(carta) {
  if (!juegoIniciado || !permitirVolteo) {
    alert("Por favor, presiona el botón 'Jugar' para comenzar el juego o reiniciar.");
    return;
  }

  if (!carta.classList.contains("volteada")) {
    carta.classList.toggle("volteada");

    if (cartasVolteadas.length === 1) {
      permitirVolteo = false;

      cartasVolteadas.push(carta);

      setTimeout(() => {
        if (cartasVolteadas[0].dataset.index === cartasVolteadas[1].dataset.index) {
          cartasVolteadas[0].classList.add("oculta");
          cartasVolteadas[1].classList.add("oculta");
          abiertas++;

          if (abiertas === imagenes.length / 2) {
            alert("¡Has ganado!");
            mostrarBotonReinicio();
          }
        } else {
          cartasVolteadas[0].classList.remove("volteada");
          cartasVolteadas[1].classList.remove("volteada");
        }

        cartasVolteadas = [];
        permitirVolteo = true;
      }, 1000);
    } else {
      cartasVolteadas[0] = carta;
    }
  }
}

function reiniciarJuego() {
  document.getElementById("juego").innerHTML = "";
  abiertas = 0;
  juegoIniciado = false;
  permitirVolteo = true;
  ocultarBotonReinicio();
  iniciarJuego();
}

function iniciarJuego() {
  juegoIniciado = true;
  const cartasBarajadas = barajarCartas(imagenes);
  const juegoDiv = document.getElementById("juego");

  cartasBarajadas.forEach((imagen, index) => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.index = index;
    carta.onclick = () => voltearCarta(carta);

    const imagenElement = document.createElement("img");
    imagenElement.src = imagen;
    imagenElement.alt = "Carta";

    carta.appendChild(imagenElement);
    juegoDiv.appendChild(carta);
  });
}

function mostrarBotonReinicio() {
  const botonReinicio = document.querySelector(".boton-reiniciar");
  botonReinicio.style.display = "block";
}

function ocultarBotonReinicio() {
  const botonReinicio = document.querySelector(".boton-reiniciar");
  botonReinicio.style.display = "none";
}

document.addEventListener("DOMContentLoaded", iniciarJuego);
