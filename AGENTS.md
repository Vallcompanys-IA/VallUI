# VallUI Agent Notes

## Public repository

VallUI es un repositorio publico. Todo su contenido puede ser leido por
cualquier persona, incluido el historial de Git y las releases.

- No introducir contrasenas, tokens, API keys, client secrets, certificados,
  claves privadas ni cadenas de conexion.
- No introducir datos reales de usuarios, granjas, telefonos, emails internos,
  servidores privados o informacion de negocio.
- No copiar configuracion desde VallChat o VallSmartDocs a este repositorio.
- Usar siempre placeholders y ejemplos ficticios si hace falta documentar una
  integracion.
- Antes de publicar cambios revisar tambien los archivos nuevos, el historial
  y el contenido del paquete de release.

## Scope

VallUI contiene solo estilos, componentes visuales, utilidades JavaScript
ligeras y documentacion. No debe incorporar logica de negocio, acceso a SQL,
autenticacion, llamadas a servicios internos ni dependencias de backend.

Las aplicaciones consumidoras descargan la release durante su build de Docker.
El paquete de release debe conservar `src/` y `dist/` juntos porque el CSS de
`dist/` usa imports relativos a `src/`.
