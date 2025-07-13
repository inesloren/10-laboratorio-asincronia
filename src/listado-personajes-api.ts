import { Personaje } from './listado-personajes.model';

const API_URL = 'http://localhost:3000/personajes';

export async function obtenerPersonajes(nombre = ''): Promise<Personaje[]> {
  const url = nombre
    ? `${API_URL}?nombre_like=${encodeURIComponent(nombre)}`
    : API_URL;

  const res = await fetch(url);
  const personajes: Personaje[] = await res.json();
  return personajes;
}
