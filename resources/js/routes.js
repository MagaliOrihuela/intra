import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index.vue'
import Cotizaciones from './views/Cotizaciones.vue'
import Cotizacion from './views/Cotizacion.vue'
import Orders from './views/Orders.vue'
import Order from './views/Order.vue'
import Configuracion from './views/Configuracion.vue'
import NotAutorized from './views/errors/401.vue'
import checkToken  from './guards/token.guard'
import checkClientCot from './guards/clientCot.guard'
import store from './store/store'


Vue.use(VueRouter)

const routes = [
   {
      path:'/',
      name:'Login',
      component: Index,
      meta: { 
         Auth: true, 
         title: 'Cotizador Shades',
      },
   },
   // {
   //    path:'/inicio',
   //    name:'Inicio',
   //    component: Home,
   //    meta: { 
   //       Auth: true, 
   //       title: 'Inicio | Cotizador Shades',
   //    },
   //    beforeEnter: checkToken , // revisa que el token se encuentre activo cada que cambiamos de ruta para la actividad
   // },
   {
      path:'/cotizaciones',
      component: () => import("./views/ViewAll.vue"),
      children: [
         {
            path: "",
            name: "cotizaciones",
            component: Cotizaciones,
            meta: { 
               Auth: true, 
               title: 'Cotizaciones | Cotizador Shades',
            },
            beforeEnter: checkToken , 
         },
         {
            path: ":cotizacion_id",
            name: "cotizacion",
            component: Cotizacion, 
            meta: { 
               Auth: true, 
               title: 'cotización | Cotizador Shades',
            },
            beforeEnter: checkClientCot ,
         },
      ],
   },
   {
      path:'/pedidos',
      component: () => import("./views/ViewAll.vue"),
      children: [
         {
            path: "",
            name:'Pedidos',
            component: Orders,
            meta: { 
               Auth: true,
               title: 'Pedidos | Cotizador Shades',
            },
            beforeEnter: checkToken , 
         },
         {
            path: ":order_id",
            name: "Pedido",
            component: Order, 
            meta: { 
               Auth: true, 
               title: 'Pedido | Cotizador Shades',
            },
            beforeEnter: checkClientCot ,
         },
      ],
   },
   {
      path:'/herramientas',
      name:'Tools',
      component: () => import("./views/tools/Tools.vue"),
      meta: { 
         Auth: true,
         title: 'Herramientas | Cotizador Shades',
      },
      beforeEnter: checkToken , 
   },
   {
      path: "/herramientas/noticias",
      name: "News ",
      component: () => import("./views/tools/NewsTools.vue"),
      meta: { 
         Auth: true, 
         title: 'Noticias | Cotizador Shades',
      },
      beforeEnter: checkToken,
   },
   {
      path:'/configuracion',
      name:'Configuracion',
      component: Configuracion,
      meta: { 
         Auth: true, 
         title: 'Configuracion | Cotizador Shades',
      },
      beforeEnter: checkToken , 
   },
   {
      path:'/noticias',
      name:'News',
      component: () => import("./views/News.vue"),
      meta: { 
         Auth: true,
         title: 'Noticias | Cotizador Shades',
      },
      beforeEnter: checkToken , 
   },
   {
      path:'/noticias/:news_id',
      name:'New',
      component: () => import("./views/New.vue"),
      meta: { 
         Auth: true,
         title: 'Noticia | Cotizador Shades',
      },
      beforeEnter: checkToken , 
   },
   {
      path:'/cuenta',
      name:'Account',
      component: () => import("./views/account/AccountUser.vue"),
      meta: { 
         Auth: true,
         title: 'Noticia | Cotizador Shades',
      },
      beforeEnter: checkToken , 
   },
   {
      path:'/configuracion/cuentas',
      name:'Accounts',
      component: () => import("./views/configuration/Accounts.vue"),
      meta: { 
         Auth: true,
         title: 'Cuentas | Cotizador Shades',
      },
      beforeEnter: checkToken , 
   },
   {
      path:'/configuracion/nueva_cuenta',
      name:'NewAccount',
      component: () => import("./views/configuration/NewAccount.vue"),
      meta: { 
         Auth: true,
         title: 'Nueva Cuenta | Cotizador Shades',
      },
      beforeEnter: checkToken , 
   },
   {
      path:'/configuracion/editar_cuenta',
      name:'EditAccount',
      component: () => import("./views/configuration/EditAccount.vue"),
      meta: { 
         Auth: true,
         title: 'Nueva Cuenta | Cotizador Shades',
      },
      beforeEnter: checkToken , 
   },
   {
      path:'/almacen/inventario',
      name:'Inventory',
      component: () => import("./views/warehouse/Inventory.vue"),
      meta: { 
         Auth: true,
         title: 'Inventario | Cotizador Shades',
      },
      beforeEnter: checkToken , 
   },
   {
      path:'/facturacion',
      name:'Invoice',
      component: () => import("./views/invoice/Invoice.vue"),
      meta: { 
         Auth: true,
         title: 'Liberar Facturas | Cotizador Shades',
      },
      beforeEnter: checkToken , 
   },
   {
      path:'*',
      name:'not-found',
      component: () => import( /* webpackChunkName: "Not Found" */ "./views/errors/404.vue"),
   },
   {
      path:'/401',
      name:'NotAutorized',
      component: NotAutorized
   }
]

const router = new VueRouter ({
   mode: 'history',
   routes
})

router.beforeEach((to,from,next) => {

   if( to.name != 'Login' ) {
      store.dispatch({ type:'timerLogin/startTimerLogin'});
   }
   next()
})

export default router