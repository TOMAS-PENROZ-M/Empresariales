# Sistema de registro de ventas

Aplicación web que permite registrar ventas y ver estadisticas relevantes para tu negocio.

---

## Requisitos

Asegúrate de tener instalado:

* Node.js (versión LTS recomendada, al desarrollar la aplicación se usó v24.14.1)
* npm (v11.11.0 usada en el desarrollo)
* PostgreSQL (v16.13 usada en el desarrollo)

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/TOMAS-PENROZ-M/Empresariales.git
```

---

### Para hacer funcionar el backend de manera local:
```
cd backend
```

Instalar dependencias:

```bash
npm install
```

### 🔐 Variables de entorno

Crear un archivo `.env` en la carpeta de backend:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME"
```
Con la información correspondiente al usuario y base de datos creada en tu maquina.

### 🗄️ Base de datos

Asegúrate de:

* Tener PostgreSQL corriendo
* Haber creado la base de datos
* Haber configurado correctamente el usuario

*(El usuario debe tener permiso para crear bases de datos, permisos sobre la base de datos a utilizar y permisos sobre el schema "public")*

Ejemplo de configuración de usuario *"sales_user"* para usar la base de datos *"sales_app"*

```
ALTER USER sales_user CREATEDB;

GRANT ALL PRIVILEGES ON DATABASE sales_app TO sales_user;
```
```
\c sales_app
```
```
GRANT ALL ON SCHEMA public TO sales_user;
ALTER SCHEMA public OWNER TO sales_user;
```

---

### Configuración de prisma
Se utiliza el ORM Prisma para interactuar con la base de datos, este se instala junto a las demás dependencias pero debe ser configurado:

*([documentación de prisma para usarlo con postgres](https://www.prisma.io/docs/prisma-orm/quickstart/prisma-postgres))*

Aplica el esquema definido a tu base de datos local:
```
npx prisma migrate dev --name init
```
Genera el cliente prisma:
```
npx prisma generate
```


---

### ▶️ Iniciar el backend

Modo desarrollo:

```bash
npm run dev
```

El servidor debería iniciar en:

```bash
http://localhost:3000
```

---

## 🧪 Endpoints disponibles

### Crear venta

```http
POST /api/sales
```

### Obtener ventas

```http
GET /api/sales
```

### Ver cantidad de productos vendidos para cada producto
```http
GET /api/reports/products/quantity
```

### Ver ganancias obtenidas por cada producto
```http
GET /api/reports/products/revenue
```

### Ver ganancias totales
```http
GET /api/reports/total-revenue
```

---

## 🧠 Notas

* Asegúrate de que el archivo `.env` esté correctamente configurado
* Verifica que PostgreSQL esté en ejecución antes de iniciar el servidor
* El proyecto utiliza nodemon para recarga automática en desarrollo

---