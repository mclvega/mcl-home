# McL Juegos

Página de inicio minimalista (tema oscuro, negro puro para pantallas AMOLED) con tarjetas que enlazan a los juegos de McL publicados en Netlify.

## Juegos

| Juego         | URL                                   |
|---------------|---------------------------------------|
| Last Survival | https://mcl-last-survival.netlify.app |
| Biblia Quiz   | https://mcl-biblia-quiz.netlify.app   |
| Arcade        | https://mcl-arcade.netlify.app        |
| Tiles         | https://mcl-tiles.netlify.app         |
| Archer        | https://mcl-archer.netlify.app        |
| Slug          | https://mcl-slug.netlify.app          |
| Snow          | https://mcl-snow.netlify.app          |

## Estructura

- `index.html`: página completa (HTML, CSS y JS en línea, sin dependencias).

## Agregar un juego

Añade una entrada al arreglo `games` dentro de `index.html`:

```js
{ name: "Nuevo", url: "https://mcl-nuevo.netlify.app", icon: "🎮", accent: "#4f8cff", desc: "Descripción corta." }
```

## Ejecutar en local

Abre `index.html` en el navegador.

## Publicar en Netlify

Sube la carpeta a GitHub y crea un sitio en Netlify desde ese repositorio, sin comando de build y con `.` como directorio de publicación.
