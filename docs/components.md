# Componentes

La base visual se consume dentro de un contenedor `.v-app`. Las clases usan el
prefijo `v-` para convivir con Bootstrap y con estilos de cada aplicacion.

## Panel

```html
<section class="v-panel">
  <div class="v-panel-body">Contenido</div>
</section>
```

## Botones

```html
<button class="v-button v-button-primary">Accion principal</button>
<button class="v-button v-button-secondary">Accion secundaria</button>
<button class="v-button v-button-ghost">Cancelar</button>
```

## Autenticacion

El cuadro de inicio de sesion comparte solo la presentacion. La aplicacion
consumidora mantiene su propia autenticacion, URLs y mensajes.

```html
<body class="v-app">
  <main class="v-auth-shell">
    <section class="v-auth-card">
      <p class="v-eyebrow">VALLCHAT</p>
      <h1>Nombre de la aplicacion</h1>
      <p class="v-auth-subtitle">Acceso corporativo</p>
      <div class="v-auth-actions">
        <a class="v-button v-button-primary" href="/auth/login/start">
          Iniciar sesion con Microsoft
        </a>
      </div>
      <div class="v-auth-status v-auth-status-info">Mensaje informativo</div>
    </section>
  </main>
</body>
```

## Tabla

```html
<div class="v-table-wrap">
  <table class="v-table">
    <thead><tr><th>Nombre</th></tr></thead>
    <tbody><tr><td>Elemento</td></tr></tbody>
  </table>
</div>
```

## Toast

```html
<script src="/vallui/dist/vall-ui.js"></script>
<script>
  VallUI.toast("Ruta guardada", { variant: "success" });
</script>
```

El contenedor de avisos se crea automaticamente en el primer uso. Para un aviso
persistente se puede usar `duration: 0`; el resultado de `VallUI.toast()` ofrece
`dismiss()` para cerrarlo manualmente.

## Layout administrativo

```html
<div class="v-sidebar-layout">
  <nav class="v-sidebar">
    <a class="v-sidebar-link is-active" href="#">Usuarios</a>
    <a class="v-sidebar-link" href="#">Configuracion</a>
  </nav>
  <main class="v-content">
    <section class="v-panel">
      <div class="v-panel-body">Contenido de la pantalla</div>
    </section>
  </main>
</div>
```

## Estado

```html
<span class="v-status v-status-success">
  <i class="v-status-dot is-active"></i>
  Operativo
</span>
```

Los componentes son presentacionales. Cada aplicacion decide cuando cambiar el
estado, abrir un dialogo o mostrar un toast desde su propio JavaScript.

## Navegació amb botons amplis

La variant `v-hero-links-comfortable` conserva els botons de mida de text
heretada i amplada mínima de 180 px. S’afegeix a `v-hero-links`; la barra
estàndard manté els seus estils. Per sota de 680 px, els enllaços es desplacen
horitzontalment i perden l’amplada mínima.

```html
<nav class="v-hero-links v-hero-links-comfortable" aria-label="Navegació principal">
  <a class="v-button v-button-ghost" href="/example">Apartat d’exemple</a>
  <span class="v-hero-status">Entorn <strong>DEV</strong></span>
</nav>
```

La variant inclou el tema turquesa quan l’arrel té `data-environment="TEST"`
i el text de l’indicador de producció amb `data-environment="PROD"`.
Només canvia la presentació: cada aplicació defineix els enllaços, el nom de
l’entorn, l’apartat actual i les regles de visibilitat. No cal JavaScript de
VallUI per utilitzar aquesta barra.

### Apartat actual

Els enllaços es mantenen visibles en visitar-los. L’aplicació consumidora marca
l’apartat actual amb `aria-current="page"`; VallUI el mostra amb un fons més
intens del color principal i un contorn reforçat, sense canviar la mida del botó.
Aquest estat es pot utilitzar tant a la barra estàndard com a la variant ampla.

```html
<a class="v-button v-button-ghost" href="/example" aria-current="page">
  Apartat actual
</a>
```

### Indicador amb desplegable

Un indicador `v-hero-status` pot ser un botó amb `popovertarget`, sense canviar
la seva aparença ni afegir icones. El desplegable natiu utilitza la classe
`v-panel v-navigation-menu`; el títol reutilitza `v-field-hint` amb
`v-navigation-menu-title`, i els enllaços reutilitzen `v-list-item`.
Els colors, la superfície, l’ombra i la tipografia provenen dels estils base.
L’aplicació defineix les opcions, els permisos i la posició del desplegable.
Les adreces de destinació no formen part de VallUI.


### Navegació compartida amb JavaScript

`VallUI.renderNavigation(container, items, options)` construeix tots els tabs,
inclòs l’actual, i el destaca amb `aria-current="page"`. No elimina el tab
seleccionat ni decideix permisos. L’aplicació proporciona la llista completa,
l’identificador actual i la visibilitat de cada enllaç.

```javascript
const links = VallUI.renderNavigation(document.querySelector(".v-hero-links"), [
  { id: "overview", label: "Resum", href: "/overview" },
  { id: "settings", label: "Configuració", href: "/settings", hidden: !canConfigure },
], { currentId: "overview", trailingNodes: [sessionIndicator] });
```

Retorna un `Map` d’enllaços indexat per `id`, perquè el consumidor hi pugui
aplicar els seus atributs i permisos. `trailingNodes` conserva indicadors de
sessió, entorn o altres controls al final. L’opció `element` d’un item reutilitza
un enllaç existent i conserva els seus listeners; `domId` estableix el seu ID.
Un item ocult continua ocult encara que sigui l’actual. Aquesta utilitat no
conté rutes, autenticació ni crides a serveis de les aplicacions.

### Selectors desplegables

Afegeix `data-v-selects` al contenidor de l’aplicació per activar l’estil compartit.
La fletxa queda a 16 px de la vora i apunta amunt quan el selector és obert.

```html
<body class="v-app" data-v-selects>
  <label for="category">Categoria</label>
  <select id="category" name="category">
    <option value="all">Totes</option>
    <option value="example">Exemple</option>
  </select>
</body>
```

Conserva el `select` original: valors, `input`, `change`, validació, labels,
opcions desactivades i canvis programàtics. No crea còpies de les opcions ni
listeners per simular l’estat obert.

Amb el JavaScript de VallUI, en navegadors d’escriptori compatibles amb `appearance: base-select`, el menú
utilitza l’aparença compartida i una alçada màxima de 280 px. En altres
navegadors i en dispositius tàctils es conserva el menú natiu; la inversió de
la fletxa depèn del suport de `:open`. Els selectors múltiples i els que tenen
`size` no es modifiquen. `data-v-native-select` permet excloure un selector.

La mida base del selector és de 44 px d’alçada mínima, amb padding de 10 px
verticals i 14 px horitzontals, lletra de 14 px amb interlineat de 20 px i
radi de 12 px. Les aplicacions consumidores només han de definir l’amplada
i la distribució del control; no han de duplicar-ne la mida ni el padding.

Els selectors centren verticalment el text, també quan el consumidor utilitza
`min-height` amb padding vertical zero. El text seleccionat es trunca amb
punts suspensius segons l'amplada disponible, sense modificar el valor ni
el text de les opcions. En ampliar el control es recupera el text complet.

Inclou també `dist/vall-ui.js` per activar automàticament el botó natiu amb
`selectedcontent` en navegadors compatibles i el títol amb el text complet.
Es respecten els atributs `title` definits pel consumidor. Les llistes d'opcions
carregades o substituïdes dinàmicament continuen funcionant. Sense JavaScript,
es conserva el selector natiu amb truncament, sense el menú personalitzat.

La pàgina `examples/selects.html` permet comprovar controls estrets i amples,
text centrat, teclat, opcions dinàmiques, canvis programàtics i exclusions.