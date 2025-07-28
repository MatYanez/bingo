function cargarSalas() {
  const contenedor = document.getElementById('salasContainer');
  contenedor.innerHTML = "<p>Cargando salas...</p>";

  db.collection("bingos").orderBy("creado", "desc").get()
    .then(snapshot => {
      contenedor.innerHTML = "";

      if (snapshot.empty) {
        contenedor.innerHTML = "<p style='text-align:center;'>No hay salas disponibles.</p>";
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "sala-card";
        div.onclick = () => {
          console.log("Seleccionaste:", doc.id);
          // Aquí luego redirigiremos al tablero del jugador
        };
        div.innerHTML = `
          <div class="sala-nombre">${data.nombre || "Sin nombre"}</div>
          <div class="sala-organizador">Organizado por ${data.organizador || "?"}</div>
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(err => {
      contenedor.innerHTML = "<p style='color: red;'>Error al cargar las salas.</p>";
      console.error(err);
    });
}

document.addEventListener("DOMContentLoaded", cargarSalas);
