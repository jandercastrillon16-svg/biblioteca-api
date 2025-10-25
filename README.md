# Biblioteca Virtual API

## Descripción
Esta API permite gestionar una biblioteca virtual con usuarios registrados. Los usuarios pueden autenticarse y acceder a rutas protegidas para crear, editar, eliminar o ver libros. Solo los usuarios con rol `admin` pueden crear o eliminar libros.

La API está construida con:

- Node.js
- Express
- Sequelize (SQLite como base de datos)
- JWT para autenticación y control de acceso
- Bcrypt para cifrado de contraseñas

---
# Biblioteca Virtual API


<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" width="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" alt="SQLite" width="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jsonwebtokens/jsonwebtokens-original.svg" alt="JWT" width="40"/>
<img src="https://img.icons8.com/color/48/000000/bcrypt.png" alt="Bcrypt" width="40"/>



## Instalación

1. Clonar el repositorio:

```bash
git clone <https://github.com/jandercastrillon16-svg/biblioteca-api>
cd biblioteca-api
```

Instalar dependencias:
```
npm install
```

Asegurarse de tener SQLite instalado (si no, instalar):
```
npm install sqlite3
```

Iniciar el servidor:
```
node server.js
```

El servidor correrá por defecto en http://localhost:3000.

Rutas de la API
1. Registro de usuario

Método: POST

Ruta: /auth/register

Body:
```
{
  "fullName": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "role": "admin" // o "user"
}
```

La contraseña se guarda cifrada con bcrypt.

2. Login / Autenticación

Método: POST

Ruta: /auth/login

Body:
```
{
  "email": "juan@example.com",
  "password": "123456"
}
```

Respuesta exitosa:
```
{
  "access_token": "<JWT>",
  "token_type": "bearer"
}

```
El JWT contiene la información mínima: sub (nombre del usuario y email), role, iat y exp.

3. Rutas protegidas de libros

Todas requieren el header:

Authorization: Bearer <JWT>

a) Listar todos los libros

Método: GET

Ruta: /books

Acceso: cualquier usuario autenticado

b) Crear un libro

Método: POST

Ruta: /books

Acceso: solo admin

Body:
```
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "ano_publicacion": 2008,
  "en_stock": true
}
```
c) Ver un libro por ID

Método: GET

Ruta: /books/:id

Acceso: cualquier usuario autenticado

d) Editar un libro

Método: PUT

Ruta: /books/:id

Acceso: cualquier usuario autenticado

Body: (los campos a actualizar)
```
{
  "titulo": "Clean Code - Updated",
  "autor": "Robert C. Martin",
  "ano_publicacion": 2008,
  "en_stock": false
}
```
e) Eliminar un libro

Método: DELETE

Ruta: /books/:id

Acceso: solo admin

Seguridad

JWT generado con algoritmo HS256 y una SECRET_KEY.

Middleware getCurrentUser valida el token antes de permitir el acceso.

Middleware authorizeRole(role) limita ciertas rutas según el rol del usuario.

Las contraseñas se almacenan cifradas con bcrypt.

Base de datos

Se utiliza SQLite mediante Sequelize.

Tablas principales:

Users: id, fullName, email, password, role

Books: id, titulo, autor, ano_publicacion, en_stock

La contraseña no se guarda en texto plano, solo en hash.

Pruebas con Thunder Client o Postman

Registrar usuario → POST /auth/register

Iniciar sesión → POST /auth/login → obtener JWT

Enviar JWT en el header Authorization para acceder a /books

Crear, editar o eliminar libros según rol


AUTOR: JANDER CASTRILLON
