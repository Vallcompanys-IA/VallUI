# VallUI

Base visual compartida para las interfaces web internas de VallChat y VallSmartDocs.

## Objetivo

Centralizar la identidad visual y los componentes presentacionales que deben ser
consistentes entre aplicaciones, sin compartir logica de negocio ni acoplar los
backends.

## Estructura

```text
src/
  tokens.css       Variables visuales comunes.
  foundation.css   Base tipografica, superficies y elementos generales.
  layout.css       Shell, hero, navegacion y layouts administrativos.
  forms.css        Formularios, acciones y controles segmentados.
  components.css   Componentes visuales reutilizables.
  status.css       Estados, badges y listas.
  dialogs.css      Dialogos nativos y confirmaciones.
  operations.css   Filtros, timelines y tarjetas operativas.
  toasts.css       Estilos del sistema de avisos.
  utilities.css    Clases auxiliares pequenas.
dist/
  vall-ui.css      Entry point para consumir la base visual.
  vall-ui.js       API JavaScript ligera para avisos.
docs/
  components.md   Contrato de clases y ejemplos.
```

## Convenciones

- Las clases publicas usan el prefijo `v-` para evitar conflictos con Bootstrap
  y con CSS especifico de cada aplicacion.
- La base no define logica de negocio ni llamadas a API.
- Los estilos globales deben limitarse al contenedor `.v-app` siempre que sea
  posible.
- Las aplicaciones pueden definir un acento propio usando los tokens de tema,
  sin cambiar las clases de los componentes.

## Consumo

La primera version no requiere compilacion. Se puede copiar `dist/vall-ui.css`
y `dist/vall-ui.js`, junto con los archivos `src/` asociados, a la carpeta
estatica de una aplicacion. Cuando la API visual este estabilizada, se
publicara mediante releases versionadas.

## Toasts

Incluye `dist/vall-ui.js` y usa la API global:

```html
<script src="/static/vall-ui.js"></script>
<script>
  VallUI.toast("Guardado correctamente", { variant: "success" });
  VallUI.toast("No se ha podido cargar el listado", {
    title: "Error",
    variant: "danger",
    duration: 0,
  });
</script>
```

Variantes disponibles: `info`, `success`, `warning` y `danger`. La llamada
devuelve un objeto con `dismiss()` para cerrar un aviso desde codigo.

## Estado

Version inicial de la base. Antes de migrar pantallas existentes hay que acordar
los tokens definitivos y probar los componentes en una pantalla real de cada
proyecto.
