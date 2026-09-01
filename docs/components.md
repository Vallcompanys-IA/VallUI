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
