function abrirModalEntrada() {
  const total = parseInt(document.getElementById("cantEntradas").value) || 100;
  document.getElementById("rangoEntradas").textContent = total;
  document.getElementById("modalSorteoEntrada").classList.add("active");
}

function cerrarModalEntrada(event) {
  if (!event || event.target.id === 'modalSorteoEntrada' || event.type === 'click') {
    document.getElementById("modalSorteoEntrada").classList.remove("active");
  }
}

function sortearEntrada() {
  const total = parseInt(document.getElementById("cantEntradas").value) || 100;
  const cinta = document.getElementById("cintaNumeros");
  cinta.innerHTML = '';

  const visibles = 5;
  const totalNumeros = 30;
  const centro = Math.floor(visibles / 2);
  let numeros = [];

  for (let i = 0; i < totalNumeros; i++) {
    const rand = Math.floor(Math.random() * total) + 1;
    numeros.push(rand);
  }

  const ganadorIndex = Math.floor(Math.random() * (totalNumeros - visibles)) + centro;
  const numeroGanador = numeros[ganadorIndex];

  numeros.forEach((num, i) => {
    const div = document.createElement("div");
    div.textContent = num;
    if (i === ganadorIndex) div.classList.add("ganador");
    cinta.appendChild(div);
  });

  const desplazamiento = ((ganadorIndex - centro) * 20) + "%";
  cinta.style.transition = 'none';
  cinta.style.transform = `translateX(0%)`;
  void cinta.offsetWidth;
  cinta.style.transition = 'transform 2.5s ease-out';
  cinta.style.transform = `translateX(-${desplazamiento})`;
}
