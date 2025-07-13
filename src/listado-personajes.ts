import { obtenerPersonajes } from './listado-personajes-api';
import { Personaje } from './listado-personajes.model';

const form = document.getElementById('busqueda-form') as HTMLFormElement;
const input = document.getElementById('nombre-input') as HTMLInputElement;
const container = document.getElementById('personajes-container') as HTMLDivElement;

window.addEventListener('DOMContentLoaded', async () => {
  const personajes = await obtenerPersonajes();
  mostrarPersonajes(personajes);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = input.value.trim();
  const personajes = await obtenerPersonajes(nombre);
  mostrarPersonajes(personajes);
});

function mostrarPersonajes(personajes: Personaje[]) {
  container.innerHTML = '';

  if (personajes.length === 0) {
    container.innerHTML = '<p>No se encontraron personajes.</p>';
    return;
  }

  personajes.forEach((personaje) => {
    const div = document.createElement('div');
    div.className = 'personaje';

    const imagenUrl = `http://localhost:3000/${personaje.imagen}`;

    div.innerHTML = `
      <img src="${imagenUrl}" alt="${personaje.nombre}" />
      <h3>${personaje.nombre}</h3>
      <p><strong>Apodo:</strong> ${personaje.apodo}</p>
      <p><strong>Especialidad:</strong> ${personaje.especialidad}</p>
      <p><strong>Habilidades:</strong> ${personaje.habilidades.join(', ')}</p>
    `;

    container.appendChild(div);
  });
}
