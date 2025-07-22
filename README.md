## 📦 Proyecto React – Minecraft Mobs

Pequeña tienda de “mobs” de Minecraft con búsqueda, paginación, carrito y CRUD de administración.

---

### 🛠 Tecnologías

* **React** + **Vite**
* **React‑Bootstrap** para componentes
* **SweetAlert** para notificaciones
* **MockAPI** como backend REST

---

### 🚀 Instalación

1. Clona el repositorio y entra a la carpeta:

   ```bash
   git clone https://github.com/TU_USUARIO/TU_REPO.git
   cd TU_REPO
   ```
2. Instala dependencias:

   ```bash
   npm install
   ```
3. Crea el fichero de variables de entorno (no es necesario en Netlify):

   ```bash
   echo "VITE_API_BASE_URL=https://687ef708efe65e520087fee2.mockapi.io" > .env
   ```
4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Accede en `http://localhost:5173`.

---

### 🔧 Variables de entorno

* **VITE\_API\_BASE\_URL** – URL base de la API MockAPI

  * Endpoints: `/mobsearch` y `/mobsearch/:id`

---

### 📖 Uso de la app

* **Página principal**

  * Buscar mobs por nombre
  * Paginación (16 por página)
  * Botón ℹ️ abre modal con datos completos y “Agregar al carrito”
* **Carrito**

  * Ajusta cantidades con “+” / “–”
  * Eliminar individual o vaciar todo
* **Admin (`/admin`)**

  * CRUD de mobs: crear, editar (nombre/vida/dimensiones) y eliminar
  * Cambios se reflejan en la lista pública

---

### 🌐 Deploy en Netlify

LINK: https://minecraftmob.netlify.app

El sitio ya está desplegado desde `main`.
Netlify gestiona `VITE_API_BASE_URL` y hace redirecciones automáticas a MockAPI.
