import { Box, Typography } from "@mui/material";

const StaticPage = () => {
  return (
    <Box component="article">
      <Typography variant="h3" component="h1">
        Desafío React 🚀
      </Typography>

      <Box component="section" sx={{ margin: "1.5rem" }}>
        <Typography variant="h4" component="h2">
          Descripción
        </Typography>
        <p>
          Este proyecto es una aplicación en React con TypeScript que permite
          mostrar y manipular un árbol de datos guardados en localStorage. El
          árbol es interactivo y permite agregar y eliminar nodos en cualquier
          nivel, además de mostrarlo de forma estructurada.
        </p>
      </Box>

      <hr />

      <Box component="section" sx={{ margin: "1.5rem" }}>
        <Typography variant="h4" component="h2">
          Características Clave
        </Typography>
        <Box component="ul" sx={{ margin: "1.5rem" }}>
          <li>
            <b>Interactividad:</b> La aplicación permite agregar y eliminar
            nodos del árbol en cualquier parte de la estructura.
          </li>
          <li>
            <b>Modo de Vista y Edición:</b> Dos modos que controlan la forma en
            que se muestra el árbol. En el modo de edición, los nodos tienen
            botones para agregar y eliminar hijos, mientras que en el modo de
            vista, el árbol se muestra de forma estática.
          </li>
          <li>
            <b>Formulario de Agregado:</b> Para agregar un nodo hijo, se
            despliega un formulario validado para asegurar que el campo de texto
            no quede vacío.
          </li>
          <li>
            <b>Persistencia en localStorage:</b> El árbol y sus modificaciones
            se guardan y persisten incluso después de recargar la página.
          </li>
          <li>
            <b>Uso de Material-UI:</b> Los botones, formularios y demás
            componentes de la interfaz de usuario están estilizados utilizando
            Material-UI.
          </li>
        </Box>
      </Box>

      <hr />

      <Box component="section" sx={{ margin: "1.5rem" }}>
        <Typography variant="h4" component="h2">
          Funcionalidades Adicionales
        </Typography>
        <Box component="ul" sx={{ margin: "1.5rem" }}>
          <li>
            <b>Notificaciones con Snackbar:</b> Confirmación visual cuando se
            agregue o elimine un nodo.
          </li>
          <li>
            <b>Colapsar/Desplegar Nodos:</b> Los nodos pueden ser colapsables,
            agregando íconos "+" o "-" para mostrar/ocultar hijos. El primer
            nivel del árbol no es colapsable.
          </li>
          <li>
            <b>Desplegar/Colapsar Todo:</b> Botón para expandir o colapsar todos
            los nodos de la raíz y sus descendientes.
          </li>
          <li>
            <b>Uso de React Router:</b> Para estructurar la aplicación con un
            menú donde se puedan navegar entre páginas estáticas y el árbol.
          </li>
          <li>
            <b>Pruebas E2E con Cypress:</b> Pruebas de extremo a extremo para
            garantizar el correcto funcionamiento de la aplicación.
          </li>
          <li>
            <b>Storybook:</b> Visualizar los componentes aislados en Storybook
            para facilitar su desarrollo y documentación.
          </li>
        </Box>
      </Box>

      <hr />

      <Box component="section" sx={{ margin: "1.5rem" }}>
        <Typography variant="h4" component="h2">
          Tecnologías Utilizadas
        </Typography>
        <Box component="ul" sx={{ margin: "1.5rem" }}>
          <li>
            <b>React:</b> Biblioteca para construir la interfaz de usuario.
          </li>
          <li>
            <b>Material-UI:</b> Para componentes estilizados (botones, campos de
            texto, etc.).
          </li>
          <li>
            <b>localStorage:</b> Para persistir los datos del árbol.
          </li>
          <li>
            <b>Cypress:</b> Herramienta para pruebas E2E.
          </li>
          <li>
            <b>React Router</b> Para estructurar la aplicación y navegación
          </li>
        </Box>
      </Box>

      <hr />
      <Typography variant="h6" component="p" sx={{ margin: "1.5rem" }}>
        ❤ ¡Gracias por revisar este proyecto! No olvides visitar el{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/darianaren/react-tree-app"
          aria-label="Ver repositorio de GitHub del proyecto React Tree"
        >
          repositorio en GitHub
        </a>
        .
      </Typography>
    </Box>
  );
};

export default StaticPage;
