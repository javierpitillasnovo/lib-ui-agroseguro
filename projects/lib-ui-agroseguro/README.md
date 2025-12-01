# Agroseguro Angular Library

Versión de Angular: 18.0.3.

> IMPORTANTE: La librería debe de estar actualizada a la última versión de angular, compatible con https://www.npmjs.com/package/@angular-architects/native-federation, ya que está es la librería con la que montamos el sistema de microfrontends y los proyectos no podrán tener versiones de angular superior a la compatible con la última de esta biblioteca, ya que esto puede llevar a errores de compilación.

> Tanto librería como proyectos que la consuman, deben de tener la misma versión de angular, teniendo en cuenta la ultima versión compatible de https://www.npmjs.com/package/@angular-architects/native-federation.

## 0 - Instalación

Al bajarse el repositorio ejecutar `npm install` en el directorio del repo. Es importante ya que este es un angular workspace que luego contiene tanto la librería como el proyecto de documentación. El npm install NO debe de hacerse en la carpeta individual de ninguno de los dos.

## 1 - Trabajar con la librería en local

### 1.1 - Observar cambios en el compilado

Ejecutar `npm run startlib`, esto hace un `--watch` para que cada vez que hagamos cambios en la librería está recompile sola y el proyecto en local donde la estemos consumiendo este usando la versión con los últimos cambios que hemos hecho. Es necesario hacerlo si vamos a hacer cambios en la librería.

### 1.2 - Linkar la librería de forma local

Nos situamos en `dist/lib-ui-groseguro` y ejecutamos `npm link`, después en el proyecto donde la queramos consumir de forma local, ejecutamos `npm link lib-ui-agroseguro`.

## 2 - Compilación de librería

Ejecutar `ng build lib-ui-agroseguro` para compilar la librería. La compilación queda localizada en : `dist/lib-ui-groseguro`.

## 3 - Publicar en npm

Después de hacer el build de la librería con `ng build lib-ui-agroseguro`, ir a: `cd dist/lib-ui-agroseguro` y ejecutar `npm publish --access restricted` por terminal, antes de esto es necesario cambiar el número de versión de la librería en el package.json ubicado dentro de `projects/lib-ui-agroseguro/package.json`.

## 4 - Consumir libreria en un proyecto desde npm

Ejecutamos `npm i @agroseguro/lib-ui-agroseguro`, en caso de haber subido una versión y tenemos previamente instalada la librería ejectuar `npm update @agroseguro/lib-ui-agroseguro`.

## 5 - Configuraciones en los proyectos que la consumen

> En el tsconfig.json añadir:

    "paths": {
      "@lib-ui-agroseguro": ["./node_modules/@agroseguro/lib-ui-agroseguro"],
      "@ui-styles/*": ["./node_modules/@agroseguro/lib-ui-agroseguro/*"]
    },

> En el styles.scss añadir: `@use '@ui-styles/styles.scss';`

> Por cada componente: `@use '@ui-styles/_variables.scss' as *;` `@use '@ui-styles/_base.scss' as *;`

> Copiar el archivo .prettierrc.js a los nuevos proyectos! Después hacer npm i prettier y en las opciones de visual studio code ponerlo como formateador por defecto!
