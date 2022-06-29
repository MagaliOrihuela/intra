<template>
   <div>
      <v-carousel
         cycle
         height="400"
         hide-delimiter-background
         show-arrows-on-hover
         style="margin-top:20px"
      >
         <v-carousel-item
            v-for="(newItem, i) in newsItems"
            :key="i"
            :src="newItem.img_news_crs"
         >
         </v-carousel-item>
      </v-carousel>
   </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { storage } from '../../utils/firebase'
  const refFB = storage.ref()

   export default {
      data () {
         return {
            newsItems: [],
         }
      },
      methods: {
         async getDataNews () {

            let payload = {
              token: this.getUserApi.token
            }
            const dataNews = await this.$store.dispatch('news/newsTopFive',payload);

            this.newsItems = dataNews.dNew

            for( let i in this.newsItems ) {

                if(this.newsItems[i].img_news_crs != null) {
                    var imgNewsFB = storage.ref('/news/'+this.newsItems[i].img_news_crs)
                    imgNewsFB.getDownloadURL().then((url) => { this.newsItems[i].img_news_crs = url })
                }

                var date = new Date(this.newsItems[i].created_at);
                this.newsItems[i].created_at = date.toLocaleDateString("es-ES",this.optionsDate)

                // insertamos la ruta
                this.newsItems[i].route = '/noticias/'+this.newsItems[i].id ;

                this.newsItems[i].description = this.newsItems[i].description.substring(0, 70) + '...';
            }
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
   }
</script>