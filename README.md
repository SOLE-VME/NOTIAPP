# **Descripción General**
Esta aplicación de noticias permite a los usuarios ver, comentar, y gestionar noticias. Los usuarios pueden crear, editar y eliminar noticias que ellos mismos han publicado, mientras que los usuarios no autenticados solo pueden ver noticias y comentarios. La aplicación también permite a los usuarios ver perfiles de otros usuarios y gestionar sus propios perfiles.

# **Funcionalidades Principales**

1. Visualización de Noticias:

Los usuarios pueden ver una lista de noticias publicadas en la aplicación.
Cada noticia muestra el título, el contenido, y los comentarios asociados.
Los usuarios no autenticados pueden acceder a todas las noticias y los comentarios, pero no pueden interactuar con ellos.

2. Creación y Gestión de Noticias:

Los usuarios autenticados pueden crear nuevas noticias mediante un formulario que les permite ingresar un título, contenido, y una imagen opcional.
Los usuarios pueden editar o eliminar solo las noticias que han creado. Esta restricción asegura que los usuarios solo puedan modificar o eliminar su propio contenido.
Los usuarios no autenticados no tienen permisos para crear, editar o eliminar noticias.

3. Comentarios en Noticias:

Los usuarios autenticados pueden añadir comentarios a las noticias.
Los comentarios incluyen el contenido del comentario y la información del autor.
Los usuarios no autenticados no pueden comentar en las noticias, pero pueden ver los comentarios ya existentes.
Los usuarios pueden editar o eliminar sus propios comentarios, pero no aquellos realizados por otros.

4. Autenticación de Usuarios:

Los usuarios pueden registrarse y iniciar sesión en la aplicación.
Solo los usuarios autenticados tienen la capacidad de comentar y gestionar noticias.
La autenticación asegura que las acciones de creación, edición y eliminación se realicen solo por los usuarios correspondientes.

5. Perfiles de Usuario:

Los usuarios pueden ver perfiles de otros usuarios, que incluyen información básica como nombre, biografía, y fecha de nacimiento.
Los perfiles de usuario son de solo lectura para otros usuarios. Los usuarios solo pueden modificar su propio perfil.
Cada usuario tiene acceso a su propia página de perfil donde puede actualizar su información personal.

# **Tecnologías Utilizadas**

Vite:

Se utiliza para el bundling y desarrollo rápido de la aplicación. Vite proporciona una experiencia de desarrollo optimizada con recarga en caliente y construcción eficiente.

React:

La biblioteca principal para construir la interfaz de usuario. Utilizamos componentes funcionales y hooks para manejar el estado y los efectos secundarios de la aplicación.
Bootstrap:

Framework de CSS para el diseño responsivo y los estilos de la interfaz. Bootstrap ayuda a asegurar que la aplicación tenga un diseño consistente y adaptable a diferentes dispositivos.

CSS:

Estilos personalizados para dar un toque único a la aplicación y mejorar la experiencia del usuario. Los estilos se aplican para asegurar que la interfaz sea atractiva y funcional.

# **Flujo de Usuario**

Acceso a la Aplicación:

Los usuarios acceden a la página principal donde pueden ver la lista de noticias y comentarios.
Los usuarios no autenticados pueden leer noticias y ver comentarios.

**Autenticación:**

Los usuarios pueden registrarse o iniciar sesión en la aplicación para obtener acceso completo a las funcionalidades.

Interacción con Noticias y Comentarios:

Los usuarios autenticados pueden crear, editar, o eliminar noticias y comentarios.
Los usuarios pueden ver su perfil y el de otros usuarios, con opciones para editar solo su propia información.

**Gestión de Perfil:**

Los usuarios autenticados pueden actualizar su perfil desde la página de perfil.
La edición de perfil es accesible solo para el usuario autenticado.

# **Consideraciones de Seguridad**

**Autenticación y Autorización:**

Se asegura que los usuarios solo puedan realizar acciones en las noticias y comentarios que les pertenecen.
Los usuarios no autenticados tienen restricciones para interactuar con el contenido de la aplicación.

**Validaciones y Manejo de Errores:**

Validaciones en el frontend y backend aseguran que los datos ingresados sean correctos y que los usuarios solo realicen acciones permitidas.
