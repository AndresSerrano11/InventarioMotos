const lista = document.getElementById('lista-motos');
const formulario = document.getElementById('formulario');

async function cargarMotos() {
  const res = await fetch('http://localhost:3000/productos');
  const datos = await res.json();

  lista.innerHTML = '';
  datos.forEach(moto => {
    const li = document.createElement('li');
    li.textContent = `${moto.nombre} - ${moto.marca} - $${moto.precio}`;
    lista.appendChild(li);
  });
}

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nuevaMoto = {
    nombre: document.getElementById('nombre').value,
    marca: document.getElementById('marca').value,
    precio: Number(document.getElementById('precio').value)
  };

  await fetch('http://localhost:3000/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevaMoto)
  });

  formulario.reset();
  cargarMotos();
});

cargarMotos();
