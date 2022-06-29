<template>
   <div>
      <v-card
         class="mx-auto mt-10 rounded-0 border-0 cotizacion-shades"
         max-width="99%"
         :elevation="0"
      >
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="red darken-4"
      ></v-progress-linear>
        <v-card-text>
          <div class="text-h5 text--primary">
            <v-icon
              color="red darken-1"
              class="pr-2 pb-1"
            >
              mdi-newspaper
            </v-icon>
            Noticias
          </div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
               <v-btn
                  color="red darken-4"
                  dark
                  absolute
                  top
                  right
                  small
                  fab
                  style="top: 15px;"
                  v-bind="attrs"
                  v-on="on"
                  @click="openNews = true,is_edit = false, imgSaveNws = '', imgSaveCrs = '' "
                  elevation="3"
               >
                  <v-icon>mdi-newspaper-plus</v-icon>
               </v-btn>
            </template>
            <span>Nueva Noticia </span>
          </v-tooltip>
        </v-card-text>


        
        <div v-if="skeletorTable">
          <v-skeleton-loader
              class="mx-auto"
              type="table-thead, table-tbody"
          ></v-skeleton-loader>
        </div>
    
        <div v-else>
          <v-data-table
            :v-model="news"
            :headers="headers"
            :items="news"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            sort-by="id" 
            :sort-desc="true"
            :search="search"
            hide-default-footer
            class="elevation-0 overflow-y-auto"
            @page-count="pageCount = $event"
            scroll.sync="scrollSync"
          >
            <template #[`item`]="{ item }">
              <tr>
                <td >{{ item.id }}</td>
                <td><v-img :src="item.img_news_crs" max-width="100px"></v-img></td>
                <td><v-img :src="item.img_news" max-width="100px"></v-img></td>
                <td >{{ item.title }}</td>
                <td >{{ item.is_principal }}</td>
                <td >{{ item.created_at }}</td>
                <td >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn 
                          color="blue-grey darken-3"
                          :to=item.edit
                          @click="editNews(item.id)"
                          fab 
                          dark
                          v-bind="attrs"
                          v-on="on"
                          elevation="3"
                          max-width="25px"
                          max-height="25px"
                      >
                          <v-icon size="15px">mdi-newspaper-variant-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Editar Noticia </span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn 
                          color="blue-grey darken-3"
                          v-on:click="deleteNews(item.id,item.title)" 
                          fab 
                          dark 
                          v-bind="attrs"
                          v-on="on"
                          elevation="3"
                          max-width="25px"
                          max-height="25px"
                      >
                          <v-icon color="red" size="15px">mdi-trash-can-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Eliminar Noticia </span>
                  </v-tooltip>
                </td>
              </tr>
            </template>

          </v-data-table>

          
          <div class="text-center pt-2">
              <v-pagination 
                v-model="page" 
                :length="pageCount" 
                total-visible="7"
                circle 
                color="blue-grey darken-3" 
              ></v-pagination>
          </div>

        </div>
        
      </v-card>

    <!-- MODAL NEW NEWS -->
      <v-row justify="center">
        <v-dialog
          v-model="openNews"
          persistent
          max-width="600px"
        >
        <v-card>
            <v-card-title v-if="is_edit">
              <v-icon color="red darken-1" left>mdi-newspaper-plus</v-icon>
              <span class="text-h5">Guardar Edición Noticia</span>
            </v-card-title>
            <v-card-title v-else>
              <v-icon color="red darken-1" left>mdi-newspaper-plus</v-icon>
              <span class="text-h5">Guardar Nueva Noticia</span>
            </v-card-title>
            <v-card-text>
               <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="titleFmod"
                      label="Titulo *"
                      :error-messages="titleErrors"
                      @input="$v.titleFmod.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                      v-model="principalFmod"
                      :items="itemsPrincipal"
                      item-text="name"
                      item-value="id"
                      label="Es principal *"
                      :error-messages="principalErrors"
                      @input="$v.principalFmod.$touch()"
                    ></v-select>
                  </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-file-input
                      v-model="imgNewsFmod"
                      chips
                      multiple
                      label="Imagen Carrusel"
                      :hint="imgSaveNws"
                    ></v-file-input>
                  </v-col>
                  <v-col 
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-file-input
                      v-model="imgCrsFmod"
                      chips
                      multiple
                      label="Imagen Noticia"
                      :hint="imgSaveCrs"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="descFmod"
                      name="input-7-1"
                      label="Descripción de la noticia"
                      :error-messages="descriptionErrors"
                      @input="$v.descFmod.$touch()"
                      
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="openNews = false,cancelNews()"
              >
                <v-icon left>mdi-close-box-outline</v-icon>
                Cerrar
              </v-btn>
              <div v-if="is_edit">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="[loading = true,saveEditNews()]"
                >
                  <v-icon left>mdi-content-save-outline</v-icon>
                  Guardar Edición
                </v-btn>
              </div>
              <div v-else>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="[loading = true,saveNews()]"
                >
                  <v-icon left>mdi-content-save-outline</v-icon>
                  Guardar
                </v-btn>
              </div>
            </v-card-actions>
          </v-card> 
        </v-dialog>
      </v-row>

    </div>
</template>
<script>

  import { mapGetters } from 'vuex'
  import { storage } from '../../utils/firebase'
  import { validationMixin } from 'vuelidate'
  import { requiredIf} from 'vuelidate/lib/validators'
  import SAToasts from '../../services/SweetAlertToast'
  import SAQuestions from '../../services/SweetAlertQuestion'
  import socketClientEmit from '../../shared/socketEmit'
  const refFB = storage.ref()

  export default {
    data () {
      return {
        id_update: 0,
        is_edit:false,
        itemsPrincipal: [
          { id: 0,
            name: 'No' 
          }, 
          { id: 1,
            name: 'Si' 
          },
        ],
        imgSaveNws:'',
        imgSaveCrs:'',
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
          },
          {
            text: 'Carrousel', value: 'img_news_crs',
          },
          { text: 'Entrada', value: 'img_news' },
          { text: 'Titulo', value: 'title' },
          { text: 'Principal', value: 'is_principal' },
          { text: 'Fecha de creacion', value: 'created_at' },
          { 
            text: 'Acciones', 
            sortable: false,
            value: 'options',
          },
        ],
        skeletorTable: true,
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        search: '',
        openNews: false,
        loading: false,

        // inputs 
        titleFmod: '',
        principalFmod: '',
        descFmod: '',
        imgNewsFmod: [],
        imgCrsFmod: [],

        // required

        RTitle: true,
        RPrincipal: true,
        RDescription: true,
      }
    },
    mixins: [validationMixin],
    validations: {
      titleFmod: {
        required: requiredIf(function() {
          return this.RTitle;
        })
      },
      principalFmod: { 
        required: requiredIf(function() {
          return this.RPrincipal;
        })
      },
      descFmod: { 
        required: requiredIf(function() {
          return this.RDescription;
        })
      },
    },
    methods: {

      async getDataRowsNews() {

        this.skeletorTable = true
        let payload = {
            user_id: this.getUserApi.uid ,
            token: this.getUserApi.token,
        }
        const data = await this.$store.dispatch('news/DataRowsNews',payload);
        if(data.success) {
          this.skeletorTable = false
        } else {

        }

      },

      async saveNews () {

        this.$v.$touch()
        if (!this.$v.$invalid) {

          this.skeletorTable = true
          var imgNewsName = ''
          var imgCrsName = ''
          if(this.imgNewsFmod != ''){ imgNewsName = this.imgNewsFmod[0].name }
          if(this.imgCrsFmod != ''){ imgCrsName = this.imgCrsFmod[0].name }

          let payload = {
            token: this.getUserApi.token,
            title: this.titleFmod,
            is_principal: this.principalFmod,
            description: this.descFmod, 
            img_news: imgNewsName, 
            img_news_crs: imgCrsName, 
          }
          console.log('maga-->a');
          const data = await socketClientEmit.createNewsEmit(payload)

          if(data.success) {
            // creamos la notificacion

            let payload = {
                user_id: this.getUserApi.uid,
                token: this.getUserApi.token,
                title: data.dNew.title, // titulo de la notificacion
                description: data.dNew.description.substr(0,100)+' ...', // minimo 100 caracteres para que no se sature la notificacion
                route: '/noticias/'+data.dNew.id, // rota la cual abrira la notificacion, si no contiene ruta dejarlo en blanco 
                is_partner: 0, // registro 0 para mostrar notificacion en general - 1 para mostrar solo a partners de Shades
                icon: 'mdi-newspaper', // icono que llevara la notificacion
                module: 'news',
                relation_id: data.dNew.id, //
                department_id: 0 // deparamento para el que va dirigido este ticket - 0 es para todos 
            }
            await socketClientEmit.createNotificationEmit(payload)
            
            // subimos las imagenes a firebase


            if(this.imgNewsFmod != '') {
              const refNews = refFB.child('news/'+data.dNew.img_news)
              let img_news_ext = data.dNew.img_news.split('.').pop();
              var metadata1 = { contentType: 'image/'+img_news_ext }
              refNews.put(this.imgNewsFmod[0],metadata1).then( e => console.log(e))
            }
              
            if(this.imgCrsFmod != '') {
              const refCrs = refFB.child('news/'+data.dNew.img_news_crs)
              let img_carousel_ext = data.dNew.img_news_crs.split('.').pop();
              var metadata2 = { contentType: 'image/'+img_carousel_ext }
              refCrs.put(this.imgCrsFmod[0],metadata2).then( e => console.log(e))
            }


            let payloadImg = {
                img_news: data.dNew.img_news,
                img_news_crs: data.dNew.img_news_crs,
                id: data.dNew.id
            }

            await socketClientEmit.imgsNewsEmit(payloadImg)

            var iconToast = 'success'
            var msjToast = 'Noticia creada con éxito! '
            var positionToast = 'top'
            var timerToast = 4000
            const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
            SAToastsVar.getToast()
            
            this.loading = false
            this.openNews = false
            this.titleFmod = ''
            this.principalFmod = ''
            this.descFmod = ''
            this.imgNewsFmod = []
            this.imgCrsFmod = []
            this.$v.$reset()
            this.skeletorTable = false

          } else {

            var iconToast = 'warning'
            var msjToast = '¡No se pudo crear tu noticia, favor de contacta al area de sistemas! '
            var positionToast = 'top'
            var timerToast = 4000
            const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
            SAToastsVar.getToast()
            
          }

        }

      },

      async editNews(id) {

          const {data} = await axios.get(`/news/show/${id}`,  { headers: { Authorization: "Bearer " + this.getUserApi.token } })
          if(data.success) {
            
              this.titleFmod = data.dNew.title
              this.principalFmod = data.dNew.is_principal
              this.descFmod = data.dNew.description
              this.id_update = data.dNew.id
              if(data.dNew.img_news != null ) { this.imgSaveNws = 'Img Guardada '+data.dNew.img_news }
              if(data.dNew.img_news_crs != null ) { this.imgSaveCrs = 'Img Guardada '+data.dNew.img_news_crs }
          }
            this.is_edit=true
            this.openNews = true

      },

      async saveEditNews(id) {

        this.$v.$touch()
        if (!this.$v.$invalid) {

          this.skeletorTable = true
          var imgNewsName = ''
          var imgCrsName = ''
          if(this.imgNewsFmod != ''){ imgNewsName = this.imgNewsFmod[0].name }
          if(this.imgCrsFmod != ''){ imgCrsName = this.imgCrsFmod[0].name }

          let payload = {
            token: this.getUserApi.token,
            id: this.id_update,
            title: this.titleFmod,
            is_principal: this.principalFmod,
            description: this.descFmod, 
            img_news: imgNewsName, 
            img_news_crs: imgCrsName, 
          }

          const data = await socketClientEmit.updateNewsEmit(payload)

          if(data.success) {
            // editamos la notificacion

            let payload = {
                user_id: this.getUserApi.uid,
                token: this.getUserApi.token,
                title: data.dNew.title, // titulo de la notificacion
                description: data.dNew.description.substr(0,100)+' ...', // minimo 100 caracteres para que no se sature la notificacion
                module: 'news',
                relation_id: data.dNew.id
            }

            await socketClientEmit.updateNotificationEmit(payload)

            // subimos las imagenes a firebase
            if(this.imgNewsFmod != '') {
              const refNews = refFB.child('news/'+data.dNew.img_news)
              let img_news_ext = data.dNew.img_news.split('.').pop();
              let metadata1 = { contentType: 'image/'+img_news_ext }
              refNews.put(this.imgNewsFmod[0],metadata1).then( e => console.log(e))
            }
              
            if(this.imgCrsFmod != '') {
              const refCrs = refFB.child('news/'+data.dNew.img_news_crs)
              let img_carousel_ext = data.dNew.img_news_crs.split('.').pop();
              let metadata2 = { contentType: 'image/'+img_carousel_ext }
              refCrs.put(this.imgCrsFmod[0],metadata2).then( e => console.log(e))
            }

            let payloadImg = {
                img_news: data.dNew.img_news,
                img_news_crs: data.dNew.img_news_crs,
                id: data.dNew.id
            }

            await socketClientEmit.imgsNewsEmit(payloadImg)

            var iconToast = 'success'
            var msjToast = 'Noticia editada con éxito! '
            var positionToast = 'top'
            var timerToast = 4000
            const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
            SAToastsVar.getToast()
            
            this.loading = false
            this.openNews = false
            this.titleFmod = ''
            this.principalFmod = ''
            this.descFmod = ''
            this.imgNewsFmod = []
            this.imgCrsFmod = []
            this.$v.$reset()

            this.skeletorTable = false

          }else {

            var iconToast = 'warning'
            var msjToast = '¡No se pudo editar tu noticia, favor de contacta al area de sistemas! '
            var positionToast = 'top'
            var timerToast = 4000
            const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
            SAToastsVar.getToast()
            
          }
        }

      },

      cancelNews() {
        this.titleFmod = ''
        this.principalFmod = ''
        this.descFmod = ''
        this.id_update = 0
      },

      async deleteNews(id,itemTitle) {

        var iconQuestion = ''
        var titleQuestion = 'Noticia: '+itemTitle
        var textQuestion = 'Se elimiar la Noticia seleccionada, ¿ Estas seguro de esto... ?'
        var confirmBtnQuestion = 'Eliminar Noticia'
        var cancelBtnQuestion = '<template><b-icon icon="arrow-up"></b-icon></template> Cancelar'

        const SAQQuestionVar = new SAQuestions(iconQuestion,titleQuestion,textQuestion,confirmBtnQuestion,cancelBtnQuestion)
        var resQuestion = await SAQQuestionVar.getQuestionRoute()
        if(resQuestion) {

          this.skeletorTable = true
          let payload = {
              token: this.getUserApi.token,
              id: id
          }

          const data = await socketClientEmit.deleteNewsEmit(payload)

          if(data.success) {

            // eliminamos la notificacion relacionada

            let payload = {
                user_id: this.getUserApi.uid,
                token: this.getUserApi.token,
                module: 'news',
                relation_id: data.dNew.id
            }

            await socketClientEmit.deleteNotificationEmit(payload)

            // eliminamos las imagenes de firebase
            if(data.dNew.img_news != null) {
              const refDel = refFB.child('news/'+data.dNew.img_news)
              refDel.delete().then( e => console.log(e))
            }

            
            if(data.dNew.img_news_crs != null) {
              const refDelCrs = refFB.child('news/'+data.dNew.img_news_crs)
              refDelCrs.delete().then( e => console.log(e))
            }

            var iconToast = 'success'
            var msjToast = '¡Noticia eliminada correctamente!'
            var positionToast = 'top'
            var timerToast = 4000
            const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
            SAToastsVar.getToast()

            this.skeletorTable = false
            
          } else {
            var iconToast = 'warning'
            var msjToast = '¡error, favor de contacta al area de sistemas! '
            var positionToast = 'top'
            var timerToast = 4000
            const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
            SAToastsVar.getToast()
          }

        }

      },
      async socketEmmitNotification() {
        await this.$store.dispatch({ type:'socketIO/socket_refresh',payload}); // refrescamos la conexion al socket
      }

    },
    computed: {
      ...mapGetters({ 
        getUserApi: 'auth/getUserApi',
        news: 'news/getNews', 
        }),
      
      titleErrors(){
        const errors = []
        if (!this.$v.titleFmod.$dirty) return errors
        !this.$v.titleFmod.required && errors.push('Necesitas un titulo para tu noticia.')
        return errors
      },
      principalErrors(){
        const errors = []
        if (!this.$v.principalFmod.$dirty) return errors
        !this.$v.principalFmod.required && errors.push('Necesitas indicar su importancia.')
        return errors
      },
      descriptionErrors(){
        const errors = []
        if (!this.$v.descFmod.$dirty) return errors
        !this.$v.descFmod.required && errors.push('Necesitas indicarle una descripción.')
        return errors
      },

    },
    created(){
        this.getDataRowsNews()
        this.$store.dispatch('modals/loaderfull',false); // desactivamos el overlay cargando
    },
  }
</script>