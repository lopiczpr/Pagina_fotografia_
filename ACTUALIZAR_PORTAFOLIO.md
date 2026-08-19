# Guía para Actualizar el Portafolio y Videos

Esta página web está construida de manera que puedes actualizar el contenido (fotos del portafolio) sin necesidad de tocar el código de diseño, simplemente utilizando la interfaz de GitHub.

## 1. Preparar las Imágenes
Antes de subir cualquier imagen nueva, es **CRUCIAL** que la optimices para web. Subir imágenes muy pesadas hará que la página cargue lento.
- Utiliza herramientas como [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/) para comprimir tus fotos.
- El tamaño ideal no debería superar los 800px-1000px de lado largo, y el peso de cada foto debería ser menor a 300KB.

## 2. Subir las Imágenes a GitHub
1. Entra a tu repositorio en GitHub (`https://github.com/lopiczpr/Pagina_fotografia_`).
2. Navega a la carpeta: `assets/img/gallery/`.
3. Haz clic en el botón **"Add file"** en la esquina superior derecha y selecciona **"Upload files"**.
4. Arrastra las nuevas fotos que acabas de optimizar.
5. Escribe un mensaje de confirmación (ej: "Agregadas fotos de nueva boda") y haz clic en **"Commit changes"**.

## 3. Actualizar la Lista de Imágenes
Para que la página sepa que debe mostrar las nuevas imágenes, debes agregarlas al archivo de configuración:
1. En tu repositorio en GitHub, navega al archivo `assets/data/portfolio.json`.
2. Haz clic en el ícono del **lápiz (Editar)**.
3. Verás una lista de nombres de imágenes (ej. `"DSC00045.jpg"`). Agrega el nombre exacto de las fotos nuevas al final de la lista, asegurándote de separarlas por comas y de mantener las comillas.
   - **Ejemplo**: Si agregaste `boda-maria.jpg`, la lista final se vería así: `... "_DSC7034.jpg", "boda-maria.jpg" ]`
4. Haz clic en **"Commit changes"** para guardar. ¡Y listo! La página se actualizará automáticamente.

## 4. Cambiar los Videos de Inicio (Hero)
Actualmente, los videos se leen directamente de la carpeta `assets/vid/` con los nombres `vid1.mp4`, `vid2.mp4`, `vid3.mp4`, y `vid4.mp4`.
Para cambiarlos, tienes dos opciones:
1. **Reemplazar archivos**: Sube tus nuevos videos (optimizados y ligeros) a `assets/vid/` y nómbralos exactamente igual (`vid1.mp4`, etc.) sobreescribiendo los viejos. (Recuerda que Github tiene límite de 100MB por archivo, así que exporta los videos comprimidos).
2. **Agregar nuevos**: Sube el nuevo video a `assets/vid/` (ej. `mivideo.mp4`) y luego edita el archivo `assets/js/main.js` buscando la línea donde están los videos:
   `const videos = ["vid1.mp4", "vid2.mp4", "vid3.mp4", "vid4.mp4"];`
   Y agrega el tuyo:
   `const videos = ["vid1.mp4", "vid2.mp4", "vid3.mp4", "vid4.mp4", "mivideo.mp4"];`
