<template>
   <div>
      <v-card
         class="mx-auto mt-4 rounded-0 border-0 cotizacion-shades"
         max-width="99%"
         :elevation="0"
      >
        <v-container fluid class="ma-0" transition="scroll-x-transition">
            <v-row>
                <v-col lg="4" md="4"  xs="12">
                    <v-list shaped>
                        <v-list-item-group
                            v-model="selectedItem"
                            color="primary"
                        >
                            <v-list-item
                                v-for="(item, i) in itemsMenu"
                                :key="i"
                            >
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title  v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list> 
                </v-col>
                <v-col v-model="selectedItem" lg="8" md="8"  xs="12" >
                    <v-slide-y-reverse-transition>
                        <MyAccountComponent  v-if="selectedItem == 0"  />
                     </v-slide-y-reverse-transition>

                </v-col>
            </v-row>
        </v-container>
      </v-card>
    </div>
</template>
<script>

  import { mapGetters } from 'vuex'
  import { storage } from '../../utils/firebase'
  import MyAccountComponent from './MyAccountComponent'

  const refFB = storage.ref()

  export default {
    data () {
      return {
        selectedItem: 0,
        itemsMenu: [
        { text: 'Mi Cuenta', icon: 'mdi-card-account-details-outline' },
        // { text: 'Mis Descuentos ', icon: 'mdi-tag-minus-outline' },
        // { text: 'Accesos Shades', icon: 'mdi-sofa-single-outline' },
      ],
      }
    },
    components: { MyAccountComponent },
    methods: {
        async getDataAccount () {

            this.$store.dispatch('modals/loaderfull',false);
            // const {data} = await axios.get(`/news/getNewsData/${this.newsId}`,  { headers: { Authorization: "Bearer " + this.getUserApi.token } }) 
            // if(data.success) {

            //     this.titleNews= data.dNew.title
            //     this.descriptionNews= data.dNew.description
            //     var date = new Date(data.dNew.created_at);
            //     this.createdNews = date.toLocaleDateString("es-ES",this.optionsDate)

            //     // obtenemos la imagen 
            //     var imgNewsCrsFB = storage.ref('/news/'+data.dNew.img_news)
            //     imgNewsCrsFB.getDownloadURL().then((url) => { this.imgNews = url })


            // } else {
            //     var imgNewsCrsFB = storage.ref('/img/notification_news.jpg')
            //     imgNewsCrsFB.getDownloadURL().then((url) => { this.imgNews = url })
            // }

            // let payload = {
            //   token: this.getUserApi.token
            // }
            // const datatop = await this.$store.dispatch('news/newsTopFive',payload);

            // this.newsTop = datatop.dNew

            // for( let i in this.newsTop ) {

            //     if(this.newsTop[i].img_news != null) {
            //         var imgNewsFB = storage.ref('/news/'+this.newsTop[i].img_news)
            //         imgNewsFB.getDownloadURL().then((url) => { this.newsTop[i].img_news = url })
            //     }

            //     var date = new Date(this.newsTop[i].created_at);
            //     this.newsTop[i].created_at = date.toLocaleDateString("es-ES",this.optionsDate)

            //     // insertamos la ruta
            //     this.newsTop[i].route = '/noticias/'+this.newsTop[i].id ;

            //     this.newsTop[i].description = this.newsTop[i].description.substring(0, 70) + '...';
            // }
        
        }
    },
    computed: {
      ...mapGetters({ 
            getUserApi: 'auth/getUserApi', 
        }),

    },
    created(){
        this.getDataAccount()
        this.$store.dispatch('modals/loaderfull',false); // desactivamos el overlay cargando
    },
  }
</script>
<style scoped>

</style>