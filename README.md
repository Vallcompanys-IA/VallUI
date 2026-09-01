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
  auth.css         Cuadro de autenticacion compartido.
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

VallUI se distribuye mediante releases. Al ser un repositorio publico, cada
aplicacion puede descargar la ultima release durante su build de Docker y
servir el contenido dentro de su propia imagen. No se consulta GitHub durante
la ejecucion ni se mantiene una copia manual del codigo en los proyectos
consumidores.

El paquete conserva `src/` y `dist/` juntos porque `dist/vall-ui.css` resuelve
sus imports relativos a `src/`:

```html
<link rel="stylesheet" href="/vallui/dist/vall-ui.css">
<script src="/vallui/dist/vall-ui.js"></script>
```

Para publicar una version, crea y sube un tag con formato `v*`, por ejemplo
`v0.1.0`. El workflow de release adjunta `vall-ui.tar.gz` automaticamente.
Los consumidores no necesitan credenciales para descargar VallUI mientras el
repositorio permanezca publico. Las reglas de seguridad de este repositorio
estan documentadas en `AGENTS.md`.

## Toasts

Incluye `dist/vall-ui.js` desde la ruta compartida y usa la API global:

```html
<script src="/vallui/dist/vall-ui.js"></script>
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
