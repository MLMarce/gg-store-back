# Proyecto Backend

Este proyecto es el backend para GG Store. Está desarrollado con Node.js, Nest.js y PostgreSQL, y proporciona una API RESTful para gestionar las operaciones de negocio del sistema.

## Tabla de contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Pruebas](#pruebas)
- [Contribuciones](#contribuciones)

## Características

- **Gestión de Usuarios**: Autenticación, registro y actualización de perfiles.
- **Gestión de Productos**: CRUD de productos con soporte para imágenes.
- **Gestión de Órdenes**: Creación y consulta de órdenes de compra.
- **Seguridad**: Manejo de autenticación con JWT.
- **Escalabilidad**: Modular y preparado para futuras expansiones.

## Requisitos

Asegúrate de tener instalados los siguientes programas:

- Node.js (versión 16 o superior)
- PostgreSQL (versión 13 o superior)
- Git

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
   JWT_SECRET=tu_secreto_jwt
   ```

4. Configura la base de datos:

   - Ejecuta las migraciones:

     ```bash
     npm run migrate
     ```

   - (Opcional) Llena la base de datos con datos de prueba:

     ```bash
     npm run seed
     ```

## Uso

1. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

2. El backend estará disponible en `http://localhost:3001`.



## API Endpoints

### Autenticación

- **POST** `/auth/login`: Inicia sesión y retorna un token JWT.
- **POST** `/auth/register`: Registra un nuevo usuario.

### Productos

- **GET** `/products`: Lista todos los productos.
- **GET** `/products/:id`: Obtiene un producto por ID.
- **POST** `/products`: Crea un nuevo producto (requiere rol admin).
- **PUT** `/products/:id`: Actualiza un producto existente.
- **DELETE** `/products/:id`: Elimina un producto.

### Órdenes

- **GET** `/orders`: Lista las órdenes del usuario autenticado.
- **GET** `/orders/:id`: Detalle de una orden específica.
- **POST** `/orders`: Crea una nueva orden.

## Pruebas

1. Ejecuta las pruebas unitarias:

   ```bash
   npm run test
   ```

2. Genera el reporte de cobertura:

   ```bash
   npm run coverage
   ```

## Contribuciones

1. Haz un fork del proyecto.
2. Crea una nueva rama para tus cambios:

   ```bash
   git checkout -b mi-nueva-rama
   ```

3. Haz tus cambios y realiza un commit:

   ```bash
   git commit -m "Descripción de los cambios"
   ```

4. Envía un pull request.

---

¡Gracias por contribuir! Si tienes alguna pregunta o problema, no dudes en abrir un issue.
