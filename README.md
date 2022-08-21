# so1_practica1_201403877
## Aldo ebany pérez larios

### Recursos adicionales
Docker compose:
> https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04

Crear imagen docker de Go
> https://docs.docker.com/language/golang/build-images/

Ejecutar imagen como un contenedor
> https://docs.docker.com/language/golang/run-containers/

Eliminar Imagenes y Contenedores
> https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes-es

Repositorios en docker hub
> https://docs.docker.com/docker-hub/repos/#:~:text=To%20push%20an%20image%20to,docs%2Fbase%3Atesting%20).

Referencia de archivo compose
> https://docs.docker.com/compose/compose-file/compose-file-v3/

### Notas

Para subir una imagen a docker hub antes debe hacer login en su maquina local.

Para comunicar contenedores internamente se debe usar host.docker.internal en lugar de 127.0.0.1 o localhost.


### Base de datos
Se utiliza la imagen oficial de mongoDB en Docker, se ha configurado para mantener la información incluso si los contenedores no están activos.

Instalación y configuración
> https://www.bmc.com/blogs/mongodb-docker-container/


### Backend

Se utiliza la versión 1.17.7 de go y se utiliza el framework Gin para el manejo de peticiones http. La imagen está alojada en docker hub y tiene una configuración de varias etapas para reducir el vólumen del contendeor.

Creación de api rest con go
> https://go.dev/doc/tutorial/web-service-gin

Conexión con mongoDB
> https://blog.friendsofgo.tech/posts/driver-oficial-mongodb-golang/

### Frontend