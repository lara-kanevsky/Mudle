# Mudle

# Introducción
El sistema de gestión de material de estudio y trackeo de tareas y eventos es un software que permitirá a los usuarios organizarse especialmente pensado para estudiantes o gente estudiando por su cuenta. El sistema estará disponible en línea y permitirá a los usuarios acceder desde cualquier lado a todos sus archivos e items por seccion.
### Requerimientos del sistema
##### Requerimientos funcionales
- El usuario puede cargar cursos o secciones y agregarle tareas, bibliografia, apuntes etc. Esto lo puede hacer de forma manual o *automatica*, conectandose con moodle.
- El usuario puede marcar como realizadas tareas y adjuntar archivos ahi mismo.
- El usuario puede compartir una seccion o curso y otorgar permiso de lectura o modificacion a otro usuario del sitio.
- Se pueden cargar eventos como examenes, y estos se pueden configurar para conectarse con diferentes items (ejercisios o bibliografia) y agregarles un tag con el nombre de ese examen.
- Se puede filtrar por estos eventos.
- Los eventos pueden tener una barra de progreso con la cantidad de items asignados y los completados.
- Se puede crear un backup de lo que se seleccione.
- La pagina se puede levantar en servidor local o comprar el servicio oficial y soporte que se ofrece.

##### Requerimientos no funcionales
- El sistema debe ser rapido y actualizarse si asi esta configurado.
- El sistema debe ser estable y retener toda la informacion que se ingrese

### Reglas de negocio
- *Reglas de sincronizacion con Moodle:*
	- Si al sincronizarse se hubieran eliminado elementos, se pregunta antes la confirmacion de si se quiere eliminar
	- Se puede seleccionar que sincronizar y que no.
	- Pueden coexistir elementos de Moodle y elementos propios del usuario
	- Se pueden modificar los elementos traidos de Moodle
- *Reglas de secciones:*
	- El usuario puede crear secciones y compartirlas con otros usuarios de la plataforma mediante un link de invitacion.
	- Este link puede dar diferentes permisos, como de lectura o de escritura.
	- Un usuario sin cuenta puede ingresar y ver mediante un link compartido, pero para la escritura tiene que estar logeado.
*- Reglas de items:*
	- Los items van a poder pertenecer a mas de una seccion. Esto va a permitir poder hacer secciones con una recopilacion de items seleccionados segun algun criterio.
	- Los items van a tener diferentes tipos.
	- Un item puede contener archivos adjuntos en diferentes formatos.
	- Los items van a poder tener tags para luego poder hacer una busqueda por tags.
*- Reglas de filtros:*
	- Se va a poder filtrar tan especifica o generalmente como el usuario quiera. Puede filtrar cada item que exista en su cuenta o dentro de una seccion o dentro de un tag.
- *Reglas de eventos:*
	- Un evento va a poder configurarse para que avise cuando se acerca la fecha.
	- Puede asignarsele una lista de items a completar.
	- Un evento va a ser un tipo de item
# Conclusión
El sistema de gestion de material de estudio y trackeo de tareas y eventos va a ayudar especialmente a estudiantes pero es lo suficientemente general como para ser util en diferentes ambitos.
