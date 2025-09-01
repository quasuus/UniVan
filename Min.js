document.addEventListener("keyup", e =>{


    e.target.matches("#buscar")
    if(e.target.matches("#buscar")){
        document.querySelectorAll(".Route").forEach(UNi =>{
            UNi.textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
            ?UNi.classList.remove("filtro")
            :UNi.classList.add(filtro)

        })
    }
console.log(e.target.value)
})

 const filas = ['A', 'B', 'C', 'D'];
    const columnas = ['1', '2', '3', '4'];
    const bus = document.getElementById("bus");

    filas.forEach(fila => {
      columnas.forEach(col => {
        const asiento = document.createElement("div");
        const codigo = fila + col;
        asiento.classList.add("asiento");
        asiento.dataset.estado = "disponible";
        asiento.innerHTML = `<span>${codigo}</span>`;
        asiento.addEventListener("click", () => manejarClick(asiento));
        bus.appendChild(asiento);
      });
    });

    function manejarClick(asiento) {
      const estado = asiento.dataset.estado;
      if (estado === "disponible") {
        asiento.classList.add("ocupado");
        asiento.dataset.estado = "ocupado";
      } else if (estado === "ocupado") {
        if (confirm("¿Cancelar esta reserva?")) {
          asiento.classList.remove("ocupado");
          asiento.dataset.estado = "disponible";
        }
      }
    }


      document.querySelectorAll('.seat-image').forEach(img => {
    img.addEventListener('click', () => {
      img.classList.toggle('ring-4');
      img.classList.toggle('ring-green-400');
    });
  });


  document.getElementById('button').addEventListener('click', () => {
  const selected = Array.from(document.querySelectorAll('.seat-image.ring-green-400'))
    .map(img => img.alt);

  alert("Has reservado: " + (selected.length ? selected.join(', ') : "ningún asiento."));
  window.location.href = 'sistema.html'; 
});
