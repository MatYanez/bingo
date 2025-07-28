let historialMarcados = [];
let current = null, previous = null;
let segundos = 0;
let premioEnJuego = null;

function iniciarBingo() {
  const incompletos = premios.some(p => !p.mayor.trim() || !p.binguito.trim());
  if (incompletos) {
    abrirModalError();
    return;
  }

  document.getElementById("pantallaPremios").style.display = "none";
  document.getElementById("pantallaTablero").style.display = "block";
  document.getElementById("nombreFinal").textContent = `Bingo "${nombreOrg}"`;

  if (logoURL) {
    const logo = document.getElementById("logoFinal");
    logo.src = logoURL;
    logo.style.display = "block";
  }

  const sel = document.getElementById("selectorBingo");
  sel.innerHTML = "<option value=''>Selecciona un bingo</option>";
  premios.forEach((_, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `Bingo ${i + 1}`;
    sel.appendChild(opt);
  });

  let n = 1;
  const grid = document.getElementById("bingoGrid");
  grid.innerHTML = "";
  const letras = ['B','I','N','G','O'];
  for (let r = 0; r < 5; r++) {
    const lbl = document.createElement("div");
    lbl.className = "label";
    lbl.textContent = letras[r];
    grid.appendChild(lbl);

    for (let c = 0; c < 15; c++) {
      const numero = n;
      const cell = document.createElement("div");
      cell.className = "number";
      cell.textContent = numero;
      cell.onclick = () => {
        if (cell.classList.contains("marked")) {
          cell.classList.remove("marked");
          historialMarcados = historialMarcados.filter(num => num !== numero);
        } else {
          cell.classList.add("marked");
          historialMarcados.push(numero);
        }

        const len = historialMarcados.length;
        current = historialMarcados[len - 1] ?? "–";
        previous = historialMarcados[len - 2] ?? "–";

        document.getElementById("currentNumber").textContent = current;
        document.getElementById("previousNumber").textContent = previous;
      };
      grid.appendChild(cell);
      n++;
    }
  }

  setInterval(() => {
    segundos++;
    const m = String(Math.floor(segundos / 60)).padStart(2, '0');
    const s = String(segundos % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `Tiempo transcurrido: ${m}:${s}`;
  }, 1000);
}

function mostrarPremioSeleccionado() {
  const i = document.getElementById("selectorBingo").value;
  document.querySelectorAll(".premio-box").forEach(box => box.classList.remove("activo"));

  if (i !== "") {
    const box = document.querySelectorAll(".premio-box")[i];
    if (box) box.classList.add("activo");
  }

  const p = premios[i];
  if (p) {
    document.getElementById("premioActual").innerHTML = `
      <strong class="premio seleccionable" onclick="seleccionarPremio('mayor')">Premio Mayor: ${p.mayor}</strong><br>
      <strong class="binguito seleccionable" onclick="seleccionarPremio('binguito')">Binguito: ${p.binguito}</strong>
    `;
  } else {
    document.getElementById("premioActual").innerHTML = "";
  }
}

function seleccionarPremio(tipo) {
  premioEnJuego = tipo;
  const premio = document.querySelector('.premio');
  const binguito = document.querySelector('.binguito');
  premio.classList.remove('activo');
  binguito.classList.remove('activo');

  if (tipo === 'mayor') premio.classList.add('activo');
  else if (tipo === 'binguito') binguito.classList.add('activo');
}
