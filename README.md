# React Tree App

React Tree App es una aplicación web que utiliza React, Material-UI, y React Router para mostrar una estructura jerárquica de navegación, proporcionando una interfaz limpia y responsiva para interactuar con una estructura de árbol. La aplicación permite la visualización de páginas y enlaces de navegación personalizables.

La aplicación está diseñada para ser flexible y extensible, permitiendo la fácil integración con diferentes conjuntos de páginas. Además, incluye una configuración de Storybook para el desarrollo y prueba de componentes aislados.

![image](https://github.com/user-attachments/assets/5a98615d-c0d0-40b1-a643-d70d9ff7ce18)

## 🌐 Enlace de Despliegue

Puedes ver la aplicación en vivo en [react-tree-app-peach.vercel.app](https://react-tree-app-peach.vercel.app).

## 🚀 Instalación

Para instalar las dependencias y ejecutar la aplicación localmente, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/darianaren/react-tree-app.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd react-tree-app
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia la aplicación en modo de desarrollo:
   ```bash
   npm start
   ```

Esto abrirá la aplicación en http://localhost:3000.

## 🔧 Tecnologías Utilizadas

- **React**: Biblioteca principal para la creación de la interfaz de usuario.
- **Material-UI**: Biblioteca de componentes para la interfaz de usuario con un diseño limpio y responsivo.
- **React Router**: Para la gestión de rutas y navegación en la aplicación.
- **Storybook**: Herramienta para desarrollar y documentar componentes aislados.
- **Cypress**: Herramienta para pruebas end-to-end (E2E), que se planea agregar próximamente.

## 📚 Scripts

- `npm start`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Construye la aplicación para producción en la carpeta build.
- `npm run test:cypress`: Abre la interfaz de Cypress para ejecutar los tests interactivos.
- `npm run test:cypress`:headless: Ejecuta los tests de Cypress en modo headless (sin interfaz gráfica).
- `npm run storybook`: Inicia Storybook en el puerto 6006 para la vista de los componentes.
- `npm run build-storybook`: Construye la versión estática de Storybook.

## 📒 Storybook

Este proyecto utiliza Storybook para el desarrollo de componentes aislados. Puedes acceder a Storybook para visualizar y probar componentes de forma individual.

Para ejecutar Storybook, usa el siguiente comando:

```bash
npm run storybook
```

Esto abrirá Storybook en http://localhost:6006.

## 🧪 Pruebas con Cypress

Cypress se utiliza para realizar pruebas end-to-end (E2E) en la aplicación. Puedes ejecutar los tests de Cypress de la siguiente manera:

Para abrir la interfaz interactiva de Cypress y ejecutar los tests:

```bash
npm run test:cypress
```

Para ejecutar los tests en modo headless (sin interfaz gráfica):

```bash
npm run test:cypress:headless
```

## 🔄 Integración Continua (CI) - GitHub Actions

Este proyecto está configurado con GitHub Actions para ejecutar las pruebas de Cypress automáticamente cada vez que se realiza un `push` o una `pull request` en la rama principal (`main`).

### Flujo de trabajo

1. **Acciones de GitHub**:
   Cada vez que se realiza un `push` o una `pull request` en la rama `main`, se ejecuta el flujo de trabajo de GitHub Actions definido en `.github/workflows/cypress.yml`. Este flujo de trabajo realiza lo siguiente:

   - **Instala las dependencias**: Instala las dependencias de Node.js y Cypress.
   - **Ejecuta los tests de Cypress**: Ejecuta las pruebas end-to-end (E2E) en un entorno de Ubuntu sin interfaz gráfica (modo headless).

2. **Ver los resultados de las pruebas**:
   Puedes ver el estado de las pruebas en la pestaña **Actions** de GitHub. Cada vez que se ejecutan los tests, verás un informe detallado de los resultados.

### ¡Gracias por tu interés en React Tree App! ❤
