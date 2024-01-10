// Variables
let cartas = [
    { imagen: "harry.png", texto: "Harry Potter" },
    { imagen: "hermione.png", texto: "Hermione Granger" },
    { imagen: "ron.png", texto: "Ron Weasley" },
    { imagen: "dumbledore.png", texto: "Albus Dumbledore" },
    { imagen: "snape.png", texto: "Severus Snape" },
    { imagen: "voldemort.png", texto: "Lord Voldemort" },
  ];
  
  let cartasVolteadas = [];
  let abiertas = 0;
  let juegoIniciado = false;
  
  // Funciones
  function crearCartas() {
    for (let i = 0; i < cartas.length; i++) {
      let carta = document.createElement("img");
      carta.classList.add("carta");
      carta.src = "img/back.jpg"; // Imagen de respaldo, asegúrate de tener esta imagen
      carta.alt = cartas[i].texto;
      carta.onclick = () => voltearCarta(carta);
  
      cartas[i].carta = carta;
  
      document.querySelector(".cartas").appendChild(carta);
    }
  }
  
  function barajarCartas(cartas) {
    return cartas
      .map((a) => ({ orden: Math.random(), valor: a }))
      .sort((a, b) => a.orden - b.orden)
      .map((a) => a.valor);
  }
  // ... (resto del código)

function voltearCarta(carta) {
    if (!juegoIniciado) {
      alert("Por favor, presiona el botón 'Jugar' para comenzar el juego.");
      return;
    }
  
    carta.classList.toggle("volteada");
  
    if (cartasVolteadas.length === 1) {
      cartasVolteadas.push(carta);
  
      setTimeout(() => {
        if (cartasVolteadas[0].alt === cartasVolteadas[1].alt) {
          cartasVolteadas[0].remove();
          cartasVolteadas[1].remove();
          abiertas++;
  
          if (abiertas === cartas.length) {
            alert("¡Has ganado!");
            reiniciarJuego();
          }
        } else {
          cartasVolteadas[0].classList.remove("volteada");
          cartasVolteadas[1].classList.remove("volteada");
        }
  
        cartasVolteadas = [];
      }, 1000);
    } else {
      cartasVolteadas[0] = carta;
    }
  }
  
  // ... (resto del código)
  
  
  function reiniciarJuego() {
    document.querySelector(".cartas").innerHTML = "";
    abiertas = 0;
    juegoIniciado = false;
  }
  
  function iniciarJuego() {
    const casaSeleccionada = document.getElementById("casas").value;
    const imagenesCasa = cartas.filter((carta) => carta.imagen.includes(casaSeleccionada));
  
    if (imagenesCasa.length === cartas.length / 2) {
      juegoIniciado = true;
      const cartasBarajadas = barajarCartas(imagenesCasa);
      const juegoDiv = document.querySelector(".cartas");
      juegoDiv.innerHTML = ""; // Limpia el contenido anterior
  
      cartasBarajadas.forEach((carta) => {
        juegoDiv.appendChild(carta.carta);
      });
  
      setTimeout(() => {
        juegoDiv.innerHTML = ""; // Oculta las cartas después de 10 minutos
        juegoIniciado = false;
      }, 600000); // 10 minutos en milisegundos
    } else {
      alert("Selecciona una casa antes de jugar.");
    }
  }
  
  // Eventos
  document.addEventListener("DOMContentLoaded", crearCartas);
  