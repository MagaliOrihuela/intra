<template>
   <div name="top">
      <v-card
         class="mx-auto mt-7 pt-10 rounded-0 border-0 cotizacion-shades"
         max-width="99%"
         :elevation="0"
      >
        <v-container>
            <v-row>
                <v-col>
                    <div>
                        <v-icon left size="32px" style="margin-bottom: 10px;">
                            mdi-newspaper
                        </v-icon>
                        <b class="top-nwes-header">Noticias</b>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-card
            class="mx-auto"
            max-width="80%"
          :elevation="0"
        >
            <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
            </template>

            <v-img
                height="100%"
                :src="imgNews"
            ></v-img>

            <v-card-title> {{ titleNews }} </v-card-title>
            <v-card-subtitle>
                <div class="text-subtitle-2">
                    {{ createdNews }}
                </div>
            </v-card-subtitle>
            <v-divider class="ma-0"></v-divider>
            <v-card-text>
                {{ descriptionNews }}
            </v-card-text>

        </v-card>
        
        <v-container fluid >
            <v-row style="padding-top:20px">
                <v-col>
                    <v-divider></v-divider>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div>
                        <v-icon left size="32px" style="margin-bottom: 10px;">
                            mdi-newspaper
                        </v-icon>
                        <b class="top-nwes-header">Noticias Relevantes</b>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    v-for="top in newsTop"
                    :key="top.id"
                    cols="3"
                >
                    <v-card
                        class="mx-auto"
                        max-width="250"
                    >
                        <v-img
                        class="white--text align-end"
                        height="200px"
                        :src="top.img_news"
                        >
                            <v-card-title class="top-title">{{ top.title }}</v-card-title>
                        </v-img>

                        <v-card-subtitle  class="top-subtitle pb-0">
                           {{ top.created_at }}
                        </v-card-subtitle>

                        <v-card-text class="text--primary top-description">
                            <div>{{ top.description }}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="blue-grey darken-4"
                                text
                                @click="viewNews(top.id)"
                            >
                                Ver noticia
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    
                </v-col>
            </v-row>
        </v-container>


      </v-card>
    </div>
</template>
<script>

  import { mapGetters } from 'vuex'
  import { storage } from '../../utils/firebase'
  const refFB = storage.ref()

  export default {
    data () {
      return {
        newsId: Number.parseInt(this.$route.params.news_id),
        titleNews: '',
        createdNews: '',
        descriptionNews: '',
        imgNews:'',
        optionsDate: {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour24:"false"},
        newsTop: [],
        idViewNotification: 0,
      }
    },
    methods: {
        async getDataNews () {
            const {data} = await axios.get(`/news/getNewsData/${this.newsId}`,  { headers: { Authorization: "Bearer " + this.getUserApi.token } }) 
            if(data.success) {

                this.titleNews= data.dNew.title
                this.descriptionNews= data.dNew.description
                var date = new Date(data.dNew.created_at);
                this.createdNews = date.toLocaleDateString("es-ES",this.optionsDate)
                this.idViewNotification = data.idNotificationInv

                // obtenemos la imagen 
                var imgNewsCrsFB = storage.ref('/news/'+data.dNew.img_news)
                imgNewsCrsFB.getDownloadURL().then((url) => { this.imgNews = url })
                
                this.invalidNotificationNews()
                
                this.$store.dispatch('modals/loaderfull',false)

            } else {
                var imgNewsCrsFB = storage.ref('/img/notification_news.jpg')
                imgNewsCrsFB.getDownloadURL().then((url) => { this.imgNews = url })
            }

            let payload = {
              token: this.getUserApi.token
            }

            const datatop = await this.$store.dispatch('news/newsTopFive',payload);

            this.newsTop = datatop.dNew

            for( let i in this.newsTop ) {

                if(this.newsTop[i].img_news != null) {
                    var imgNewsFB = storage.ref('/news/'+this.newsTop[i].img_news)
                    imgNewsFB.getDownloadURL().then((url) => { this.newsTop[i].img_news = url })
                }

                var date = new Date(this.newsTop[i].created_at);
                this.newsTop[i].created_at = date.toLocaleDateString("es-ES",this.optionsDate)

                // insertamos la ruta
                this.newsTop[i].route = '/noticias/'+this.newsTop[i].id ;

                this.newsTop[i].description = this.newsTop[i].description.substring(0, 70) + '...';
            }
        },
        async viewNews(id) {

            this.$store.dispatch('modals/loaderfull',true);
            // subir al top 
            window.location.hash = 'top';

            const {data} = await axios.get(`/news/getNewsData/${id}`,  { headers: { Authorization: "Bearer " + this.getUserApi.token } }) 
            if(data.success) {

                this.titleNews= data.dNew.title
                this.descriptionNews= data.dNew.description
                var date = new Date(data.dNew.created_at);
                this.createdNews = date.toLocaleDateString("es-ES",this.optionsDate)
                this.idViewNotification = data.idNotificationInv


                // obtenemos la imagen 
                var imgNewsCrsFB = storage.ref('/news/'+data.dNew.img_news)
                imgNewsCrsFB.getDownloadURL().then((url) => { this.imgNews = url })

                this.invalidNotificationNews()

            } else {
                var imgNewsCrsFB = storage.ref('/img/notification_news.jpg')
                imgNewsCrsFB.getDownloadURL().then((url) => { this.imgNews = url })
            }

            let payload = {
              token: this.getUserApi.token
            }
            const datatop = await this.$store.dispatch('news/newsTopFive',payload);

            this.newsTop = datatop.dNew

            for( let i in this.newsTop ) {

                if(this.newsTop[i].img_news != null) {
                    var imgNewsFB = storage.ref('/news/'+this.newsTop[i].img_news)
                    imgNewsFB.getDownloadURL().then((url) => { this.newsTop[i].img_news = url })
                }

                var date = new Date(this.newsTop[i].created_at);
                this.newsTop[i].created_at = date.toLocaleDateString("es-ES",this.optionsDate)

                // insertamos la ruta
                this.newsTop[i].route = '/noticias/'+this.newsTop[i].id ;

                this.newsTop[i].description = this.newsTop[i].description.substring(0, 70) + '...';
            }

            this.$router.push(`/noticias/${id}`)
            this.$store.dispatch('modals/loaderfull',false);
        },
        async invalidNotificationNews() {

              var payload = {
               token: this.getUserApi.token,
               user_id: this.getUserApi.uid,
               id: this.idViewNotification,
            }
            console.log(payload)
            await this.$store.dispatch({ type:'notifications/InvalidNotification', payload }); // buscamos las notificaciones
        },
    },
    computed: {
      ...mapGetters({ 
            getUserApi: 'auth/getUserApi', 
        }),

    },
    created(){
        this.getDataNews()
    },
    beforeMount() {
        this.$store.dispatch('modals/loaderfull',true);
    },

  }
</script>
<style scoped>


  .top-title {
     font-size: 16px;
  }

  .top-subtitle {
     font-size: 12px;
  }

  .top-description {
    text-overflow: ellipsis;  
  }
  
  .top-nwes-header {
      font-size: 25px ;
      font-weight: 400;
  }

</style>