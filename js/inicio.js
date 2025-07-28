let premioActual = -1;
let premios = [];
let nombreOrg = "";
let logoURL = "";

function pasarAPantallaPremios() {
  nombreOrg = document.getElementById("nombreOrganizador").value.trim();
  const logo = document.getElementById("logoOrganizador").files[0];
  if (logo) {
    const reader = new FileReader();
    reader.onload = e => logoURL = e.target.result;
    reader.readAsDataURL(logo);
  }
  document.getElementById('pantallaNombre').classList.replace('fade-in', 'fade-out');
  document.getElementById('pantallaPremios').classList.replace('fade-out', 'fade-in');
  generarBoxesPremios();
}

function volverAPantallaNombre() {
  document.getElementById('pantallaPremios').classList.replace('fade-in', 'fade-out');
  document.getElementById('pantallaNombre').classList.replace('fade-out', 'fade-in');
}

function generarBoxesPremios() {
  const cantidad = parseInt(document.getElementById('cantBingos').value);
  const contenedor = document.getElementById('contenedorPremios');
  contenedor.innerHTML = '';
  premios = premios.slice(0, cantidad);
  while (premios.length < cantidad) premios.push({ mayor: '', binguito: '' });

  premios.forEach((p, i) => {
    const box = document.createElement('div');
    box.className = 'premio-box';
    box.innerHTML = `<i>🎁</i><div>Bingo ${i+1}</div>`;
    if (p.mayor.trim() && p.binguito.trim()) {
      const tick = document.createElement("div");
      tick.className = "tick";
      tick.textContent = "✔";
      box.appendChild(tick);
    }
    box.onclick = () => abrirModal(i);
    contenedor.appendChild(box);
  });
}

function ajustarCantidad(delta) {
  const input = document.getElementById("cantBingos");
  let val = parseInt(input.value || "1");
  val = Math.max(1, Math.min(20, val + delta));
  input.value = val;
  generarBoxesPremios();
}

function abrirModal(i) {
  premioActual = i;
  document.getElementById('tituloModal').textContent = `Premio Bingo ${i+1}`;
  document.getElementById('inputMayor').value = premios[i].mayor || '';
  document.getElementById('inputBinguito').value = premios[i].binguito || '';
  document.getElementById('modalPremio').classList.add('active');
}

function cerrarModal(event) {
  if (!event || event.target.id === 'modalPremio' || event.type === 'click') {
    document.getElementById('modalPremio').classList.remove('active');
  }
}

function guardarPremio() {
  if (premioActual >= 0) {
    premios[premioActual].mayor = document.getElementById('inputMayor').value;
    premios[premioActual].binguito = document.getElementById('inputBinguito').value;
    cerrarModal({ target: { id: 'modalPremio' } });
  }
}

function abrirModalError() {
  document.getElementById("modalError").classList.add("active");
}

function cerrarModalError(event) {
  if (!event || event.target.id === 'modalError' || event.type === 'click') {
    document.getElementById("modalError").classList.remove("active");
  }
}

function guardarBingoEnFirestore() {
  const datosBingo = {
    nombre: nombreOrg,
    logoURL: logoURL || "",
    premios: premios,
    jugadores: [], // Se puede llenar después
    creado: new Date()
  };

  db.collection("bingos").add(datosBingo)
    .then(docRef => {
      console.log("Bingo creado con ID:", docRef.id);
      // Guarda el ID para usarlo después si es necesario
      window.bingoId = docRef.id;
    })
    .catch(error => {
      console.error("Error al guardar el bingo:", error);
    });
}
