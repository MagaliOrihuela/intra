<template>
  <div>
    <v-card
      class="mx-auto rounded-0 border-0 tools-shades"
      max-width="99%"
      elevation="0"
      transition="scale-transition"
    >
      <v-container fluid>
        <v-row>
          <v-col 
            v-for="Submodul in accessSubmoduls"
            :key="Submodul.submodule_id" 
            lg="3"
            md="6"
            sm="12"
          >
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 mb-1">
                    {{ Submodul.submodule }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                >
                  <v-icon size="58">{{ Submodul.icon }}</v-icon>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  outlined
                  rounded
                  text
                  block
                  :to="Submodul.route"
                >
                  Ingresar
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

  import { mapActions, mapState, mapGetters } from 'vuex'
  import store from '../../store/store'

  export default {
    data () {
      return {
          accessModules:[],
          accessSubmoduls:[],
      }




    },
    methods: {
      dataSubmoduls() {

        this.accessModules = store.getters['auth/getAccessModule']
        var { access_submoduls } = this.accessModules.find( access => access.module_id === 4 )
        this.accessSubmoduls = access_submoduls
      },

    },
    computed: {
      ...mapGetters({
        getAccessModule: 'auth/getAccessModule',
      }),
    },
    created: function () {
        this.dataSubmoduls()
    }
  }
</script>
<style scoped>


  .tools-shades {
     margin-top: 28px;
  }

</style>