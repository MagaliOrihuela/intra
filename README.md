
![Shades de México](http://tecnolinemexico.net/img/shades/logos_black.png)

# Cotizador interno de Shades
Cotizador interno de Shades realizado por el departamento de sistemas, inicio de proceso de desarrollo 20 de noviembre del 2020, aun en proceso

# Documentacion Notificaciones:

Ruta:
```js
    store/notifications.js
```

Las notificaciones cuentan con varias llamadas al su store:
- /notifications/DataRowsNotifications " Regresa todas las notificaciones para mostrar al usuario al momento de recargar el menu header ( componente: MainLayoutComponent.vue) "
- /notifications/InvalidNotification " invalida la notificacion del usuario al momento que el mismo le da click, esto con el objetivo de que ya no aparezca en sus notificaciones "
- /notifications/createNotification "Crea una nueva notificacion"
- /notifications/deleteNotification "elimina una notificacion"
- /notifications/updateNotification "edita una notificacion"


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