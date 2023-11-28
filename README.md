

### *Crear una notificacion*:

```js
            var payload = {
                token: this.getUserApi.token, // token del proyecto
                title: 'hola soy una nueva notificacion', // titulo de la notificacion
                description: ' soy una descripcion de 100 caracteres minimo ...', // minimo 100 caracteres para que no se sature la notificacion
                route: '/ruta/identificador', // rota la cual abrira la notificacion, si no contiene ruta dejarlo en blanco 
                is_partner: 0, // registro 0 para mostrar notificacion en general - 1 para mostrar solo a partners de Shades
                icon: 'mdi-newspaper', // icono que llevara la notificacion
                module: 'aquiVaUnNombreDeModulo',
                relation_id: 'id del registro de modulo que creaste'
            } 

            await this.$store.dispatch({ type:'notifications/createNotification',payload});
```

### *Eliminar una notificacion*:

```js
            var payload = {
                token: this.getUserApi.token, // token del proyecto
                module: 'news',
                relation_id: data.id
            }

            await this.$store.dispatch({ type:'notifications/deleteNotification',payload});
```

### *Editar una notificacion*:

```js
            var payload = {
                token: this.getUserApi.token,
                title: data.title, // titulo de la notificacion
                description: data.description.substr(0,100)+' ...', // minimo 100 caracteres para que no se sature la notificacion
                module: 'news',
                relation_id: data.news_id
            }

            await this.$store.dispatch({ type:'notifications/updateNotification',payload});
```

## Equipo de desarrollo:

Oscar Cortes <br>
Magali Orihuela
