import { API_URL } from './config.js';
const lista = document.getElementById('lista-motos');
const formulario = document.getElementById('formulario');

let editandoId = null;

async function cargarMotos() {
  const respuesta = await fetch(`${API_URL}/motos`);
  const motos = await respuesta.json();
  lista.innerHTML = '';
  motos.forEach(moto => {
    const card = document.createElement('div');
    card.className = 'moto-card';
    card.innerHTML = `
      <img src="${moto.imagenUrl}" alt="Imagen de la moto" width="120">
      <div><strong>${moto.marca} ${moto.modelo}</strong></div>
      <div>${moto.anio} - ${moto.color}</div>
      <div>Precio: $${moto.precio}</div>
      <div>Stock: ${moto.stock}</div>
      <button class="editar-btn">Editar</button>
      <button class="eliminar-btn">Eliminar</button>
    `;
    // Botón eliminar
    card.querySelector('.eliminar-btn').onclick = async () => {
      if (confirm('¿Seguro que deseas eliminar esta moto?')) {
        await fetch(`${API_URL}/motos/${moto._id}`, { method: 'DELETE' });
        cargarMotos();
      }
    };
    // Botón editar
    card.querySelector('.editar-btn').onclick = () => {
      editandoId = moto._id;
      document.getElementById('marca').value = moto.marca;
      document.getElementById('modelo').value = moto.modelo;
      document.getElementById('anio').value = moto.anio;
      document.getElementById('color').value = moto.color;
      document.getElementById('precio').value = moto.precio;
      document.getElementById('stock').value = moto.stock;
      formulario.scrollIntoView({ behavior: 'smooth' });
    };
    lista.appendChild(card);
  });
}
cargarMotos();

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('marca', document.getElementById('marca').value);
  formData.append('modelo', document.getElementById('modelo').value);
  formData.append('anio', document.getElementById('anio').value);
  formData.append('color', document.getElementById('color').value);
  formData.append('precio', document.getElementById('precio').value);
  formData.append('stock', document.getElementById('stock').value);
  if (document.getElementById('imagen').files[0]) {
    formData.append('imagen', document.getElementById('imagen').files[0]);
  }

  if (editandoId) {
    // PUT para actualizar
    await fetch(`${API_URL}/motos/${editandoId}`, {
      method: 'PUT',
      body: formData
    });
    editandoId = null;
  } else {
    // POST para crear
    await fetch(`${API_URL}/motos`, {
      method: 'POST',
      body: formData
    });
  }

  formulario.reset();
  cargarMotos();
});




