# Sistema de monitoreo de actividades agronómicas API

## Tabla de Contenido

- [Sistema de monitoreo de actividades agronómicas API](#sistema-de-monitoreo-de-actividades-agronómicas-api)
  - [Tabla de Contenido](#tabla-de-contenido)
  - [Descripción](#descripción)
  - [Prerequisitos](#prerequisitos)
  - [Iniciando proyecto localmente](#iniciando-proyecto-localmente)
- [Trabajando con contenedores](#trabajando-con-contenedores)
    - [Dockerizado](#dockerizado)
    - [Docker compose](#docker-compose)
  - [Variables de entorno](#variables-de-entorno)
  - [Sistema de archivos](#sistema-de-archivos)
    - [src](#src)

## Descripción

Esta API esta en capacidad de dar respuesta a diferentes solicitudes para diferentes funcionalidades del Ssistema de monitoreo de actividades agronómicas; ayudará a los campesinos a llevar un registro detallado de sus actividades diarias, tales como siembra, riego,  fertilización, cosecha, y otras labores agrícolas. El objetivo es proporcionar a los campesinos una herramienta  que les permita optimizar sus procesos y tomar decisiones informadas basadas en datos históricos y actuales.
.

## Prerequisitos

| Nombre                                                            | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Versión   |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| [NodeJs](https://nodejs.org/)                                     | Es un entorno de servidor de código abierto multiplataforma que puede ejecutarse en Windows, Linux, Unix, macOS y más                                                                                                                                                                                                                                                                                                                                                        | `v20.9.0` |
| [NPM](https://docs.npmjs.com/)                                    | Node Package Manager (administrador de paquetes de Node), es la plataforma donde se descargan multitud de paquetes y librerias pra el desarrollo de software y aplicaciones basadas en Javascript.                                                                                                                                                                                                                                                                           | `v10.1.0` |
| [Postgres](https://www.postgresql.org/download/)                  | PostgreSQL es un sistema de gestión de bases de datos relacional de código abierto que destaca por su robustez, escalabilidad y cumplimiento de estándares SQL. Es altamente personalizable, lo que permite a los desarrolladores y administradores de bases de datos adaptarlo a sus necesidades específicas. Para su funcionamiento en Windows, puedes descargarlo directamente desde su [página oficial](https://www.postgresql.org/download/).                           | `v16.0`   |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Software de código abierto utilizado para desplegar aplicaciones dentro de contenedores virtuales, multiplataforma que puede ejecutarse en Windows, Linux, Unix, macOS y más. Para Mac o Windows descarga [Docker Desktop](https://www.docker.com/products/docker-desktop), [Docker Compose](https://docs.docker.com/compose) se instalará automáticamente. En Linux, asegurece de tener la última version de [Compose](https://docs.docker.com/compose/install/) instalada. | `v23.0.1` |

                                                | `v7.1.3`  |

## Iniciando proyecto localmente

1. Clona el repositorio de la api en tu maquina local

   > <https://github.com/yornipaz/agro-monitor.git>

2. Crea una base de datos en postgres y construye o reestaura la estructura correspondiente para el sistema  debes tener en cuenta el nombre del usuario de la base de datos, la contraseña del usuario, el nombre de la base de datos, la dirección de alojamiento y el puerto de la base de datos.

3. Desde la terminal navega hasta la ubicacion donde descargaste el repositorio y ejecuta el comando para instalar dependencias

   > npm i

4. Crear un archivo con las variables de entorno en el apartado de [Variables de entorno](#variables-de-entorno)

5. Una vez cumplido con los anteriores pasos ejecuta el proyecto de manera local
   > npm run start:dev

# Trabajando con contenedores

Puedes levantar el proyecto en un ambiente de producción, bien sea creando una imagen de Docker y levantando el contenedor correspondiente utilizando sus respectivas variables de entorno o bien sea utilizando la herramienta de Docker composer.

### Dockerizado

1. Construyendo imagen Docker

   Construye de forma manual la imagen de Docker del proyecto, en la terminal del sistema operativo ejecuta el comando

   ```
   > docker build --pull --rm -f "Dockerfile" -t [nombre-de-imagen]:latest "."
   ```

1. Para iniciar el contenedor a partir de imagen recientemente creada, en la terminal ejecute el siguiente comando

```
 docker run --name [nombre-contenedor] -p 3004:3004 -d
 -e PORT=3004
 -e NODE_ENV='development'
 -e DB_PORT='xxxx'
 -e DB_HOST='xxxx'
 -e DB_DATABASE='xxxx'
 -e DB_USERNAME='xxxx'
 -e DB_PASSWORD='xxx'
 -e DB_SYNC='public'

 [nombre-de-imagen]:latest
```

3. Eliminar contenedor

   ```
   Para eliminar primero hay que asegurarse de detenerlo con el siguiente comando
   > docker stop [nombre-del-contenedor]

   Una vez detenido el contenedor se puede proceder a eliminar el contenedor
   > docker rm [nombre-del-contenedor]

   ```

4. Eliminar imagen

   ```
   Una vez esten detenidos todos los contenedores construidos a partir de la imagen, esta se puede eliminar
   > docker rmi [nombre-de-imagen]

   ```

### Docker compose

El proceso de Dockerizacion para construir la imagen y levantar el contenedor de la aplicación se puede levantar de forma rápida de la siguiente manera

1. Crear un archivo con las variables de entorno necesarias para ejecutar el docker compose, esto lo puedes hacer siguiendo la referencia al apartado de [Variables de entorno](#variables-de-entorno)

1. Levantar el proyecto

Una vez con el archivo .env en la raíz del proyecto puedes ejecutar el siguiente comando

    > docker compose up --build

Este comando procederá a crear una imagen partiendo del contenido del Dockerfile, esta imagen tendrá de nombre 'backendsigp' y seguidamente iniciará un contenedor de la aplicación con el nombre de 'api-sigp', este proceso no se completará si tienes una imagen o contenedor con estos nombres.

1. Detener el docker compose

Para detener el contenedor de la aplicación que se creó, ejecuta el siguiente comando

    > docker compose down

Esto no elimina la imagen del proyecto, si se desea eliminar la imagen que se creó se utiliza el siguiente comando

    > docker compose down --rmi all

## Variables de entorno

En la raiz del proyecto hay un archivo .env.example, a partir de las variables que estan en este archivo, crea un archivo llamado .env en el cual deberas configurar las **variables de entorno** del proyecto, y por cada uno de los valores, asignar su clave y valor tanto para claves la base de datos como para el servidor de minio. aca puedes apreciar un ejemplo de como quedarian este archivo, donde los valores que tiene xxxx son los valores que se han asignado una vez se define el servicio (base de datos y servidor de Minio), mientras que las variables que tienen un valor se deben tomar tal y como estan definidos a continuación:

```bash
PORT=3004
NODE_ENV='development'
DB_PORT='xxxx'
DB_HOST='xxxx'
DB_DATABASE='xxxx'
DB_USERNAME='xxxx'
DB_PASSWORD='xxx'
DB_SYNC='public'
```

## Sistema de archivos

El sistema de archivos del proyecto esta organizada de la siguiente manera

### src

`Dockerfile`:  
El Dockerfile se utiliza para construir una imagen de Docker para el proyecto. Contiene instrucciones sobre cómo construir la imagen y configurar el contenedor.

`package.json`:
El archivo package.json se utiliza para gestionar las dependencias y scripts del proyecto. Incluye información sobre el nombre, versión y dependencias del proyecto.

`common`

- `config`:
  La carpeta config contiene archivos de configuración para el proyecto. Incluye ajustes para diferentes entornos, como desarrollo, producción y pruebas.

`Modules`

- `acitivity`:
  El módulo activity maneja la funcionalidad de Actividades Agronómicas en el proyecto. Incluye características como registro,vista,edicion y eliminacion de actividades .

- `parcel`:
  El módulo hvi maneja la funcionalidad relacionada con la Hoja de Vida Institucional (HVI) del Sistema de Gestión Pedagógica v3.0. Incluye características como crear, actualizar y recuperar registros de HVI.

```bash
docker build --build-arg TAG="v0.5.2" -t agro-monitor-backend:0.5.2 --target prod .

docker push agro-monitor-backend:0.5.2
```
