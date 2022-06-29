<template>
    <v-container fluid >
        <v-row style="padding-top:20px">
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
</template>

<script>

  import { mapGetters } from 'vuex'
  import { storage } from '../../utils/firebase'
  const refFB = storage.ref()

  export default {
    data () {
      return {
        optionsDate: {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour24:"false"},
        newsTop: []
      }
    },
    methods: {
        async getDataNews () {

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
        }
    },
    computed: {
      ...mapGetters({ 
            getUserApi: 'auth/getUserApi', 
        }),

    },
    created(){
      
        this.getDataNews()
        // setTimeout(() => this.$store.dispatch('modals/loaderfull', false), 3000); // desactivamos el overlay cargando
        this.$store.dispatch('modals/loaderfull', false)
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