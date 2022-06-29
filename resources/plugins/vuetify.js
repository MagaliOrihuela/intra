// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetifyColors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            light: {
                shades_one: '#E3E3E3',
                shades_two: '#9B9B9B',
                shades_three: '#3F3F3F',
                shades_four: '#1B7A6D',
            },
        },
    },
}

export default new Vuetify(opts)