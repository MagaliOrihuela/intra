
import SAToasts from '../services/SweetAlertToast'
import { storage } from '../utils/firebase'

const news = {
    namespaced:true,
    state: {
        DataNews: [],
        DataNewsTopFive: [],
        optionsDate: {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour24:"false"}
    },
    mutations: {
        ROWS_DATA_NEWS (state,data) {
            for( let i in data ) {
                const isFind = state.DataNews.find( news => news.id === data[i].id )
                if(typeof isFind === 'undefined') {
                    if(data[i].img_news != null) {
                        var imgNewsFB = storage.ref('/news/'+data[i].img_news)
                        imgNewsFB.getDownloadURL().then((url) => { data[i].img_news = url })
                    }
                    if(data[i].img_news_crs != null) {
                        var imgNewsCrsFB = storage.ref('/news/'+data[i].img_news_crs)
                        imgNewsCrsFB.getDownloadURL().then((url) => { data[i].img_news_crs = url })
                    }
                    var date = new Date(data[i].created_at);
                    data[i].created_at = date.toLocaleDateString("es-ES",state.optionsDate)
                    state.DataNews.push(data[i]);
                }
            }
        },
        CREATE_DATA_NEWS (state,data) {
            console.log(data)
            console.log('maga-->g');
            var date = new Date(data.created_at);
            data.created_at = date.toLocaleDateString("es-ES",state.optionsDate)
            state.DataNews.push(data);
        },
        DELETE_DATA_NEWS (state,data) {
            var newsFinal = state.DataNews.filter(function(news) {
                return news.id !== data.id; 
            });
            state.DataNews = newsFinal
        },
        UPDATE_DATA_NEWS (state,data) {
            state.DataNews.map(function(item){
                if(item.id == data.id){
                    item.title = data.title
                    item.is_principal = data.is_principal
                }
                return item;
            });
        },
        IMG_DATA_NEWS (state,data) {
            state.DataNews.map(function(item){
                if(item.id == data.id){
                    item.img_news = ''
                    item.img_news_crs = ''
                }
                return item;
            });
            state.DataNews.map(function(item){
                if(item.id == data.id){


                    if(data.img_news != null) {
                        var imgNewsFB = storage.ref('/news/'+data.img_news)
                        imgNewsFB.getDownloadURL().then((url) => { item.img_news = url })
                    }
                    if(data.img_news_crs != null) {
                        var imgNewsCrsFB = storage.ref('/news/'+data.img_news_crs)
                        imgNewsCrsFB.getDownloadURL().then((url) => { item.img_news_crs = url })
                    }
                }
                return item;
            });
        },NEWS_TOP_FIVE (state,data) {
            state.DataNewsTopFive = data
        },
    },
    actions: {
        async DataRowsNews({commit},payload) {
            const { data } = await axios.get(`/news/getRowsNews/${payload.user_id}`, { headers: { Authorization: "Bearer " + payload.token } })
            commit("ROWS_DATA_NEWS",data.dnews)
            return Promise.resolve(data)
        },
        async createNews({commit},payload) {
            console.log('maga-->f');
            commit('CREATE_DATA_NEWS',payload)
        },
        async deleteNews({commit},payload) {
            commit('DELETE_DATA_NEWS',payload) 
        },
        async updateNews({commit},payload ) {
            commit('UPDATE_DATA_NEWS',payload) 
        },
        async displayImgNews({commit},payload ) {
            commit('IMG_DATA_NEWS',payload) 
        },
        async newsTopFive({commit},payload ) {

            const { data } = await axios.post('/news/topfive', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 
            commit('NEWS_TOP_FIVE',payload) 
            return Promise.resolve(data)
        },
    },
    getters: {
      getNews: state => state.DataNews,
    }
 }
 
 export default news