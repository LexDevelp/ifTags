const texto = `<for i=0 i<5 i++ >
<p>hola tuki</p>`;

// Utilizar una expresión regular para extraer el contenido dentro de la etiqueta <for></for>
const contenidoFor = texto.replace(/<for[^>]*>(.*?)/s, '$1').trim();

console.log(contenidoFor);
