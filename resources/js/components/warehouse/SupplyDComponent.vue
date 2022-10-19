<template >
    <div>
        <v-card
            class="mx-auto rounded-0 border-0  cotizacion-shades"
            max-width="99%"
            :elevation="0"
            transition="scale-transition"
        >
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="red darken-4"
            ></v-progress-linear>
            <v-card-subtitle  class="pa-2 ma-0 ">
                <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" >
                    <v-row class="pa-0 ma-0" >
                        <v-col 
                            class="pa-0 pt-4 ma-0"
                            xs="12"
                            sm="12"
                            md="3"
                            lg="3"
                            xl="3"
                            style="font-size: 16px;"
                        >
                            <v-icon color="red darken-1">mdi-clipboard-check-multiple-outline</v-icon> &nbsp;&nbsp;Liberación: <b class="font-weight-regular">{{ dataSuppD.id }}</b>
                        </v-col>
                        <v-col 
                            class="pa-0 pt-4 ma-0"
                            xs="12"
                            sm="12"
                            md="3"
                            lg="3"
                            xl="3"
                            style="font-size: 16px;"
                        >
                            <v-icon left>mdi-clipboard-text-outline</v-icon> &nbsp;&nbsp;Pedido: <b class="font-weight-regular">{{ dataSuppD.no_ped }}</b>
                        </v-col>
                        <v-col 
                            class="pa-0 pt-4 ma-0"
                            xs="12"
                            sm="12"
                            md="3"
                            lg="3"
                            xl="3" 
                            style="font-size: 16px;"
                        > <!--  Agente  -->
                            <v-icon left>mdi-account-tie</v-icon> Agente: <b class="font-weight-regular"> {{ dataSuppD.agent }} </b>
                        </v-col>
                        <v-col 
                            class="pa-0 pt-4 ma-0" 
                            xs="12"
                            sm="12"
                            md="3"
                            lg="3"
                            xl="3"
                            style="font-size: 16px;"
                        > <!--  Cliente  -->
                            <v-icon left> mdi-briefcase-account-outline </v-icon> Cliente: <b class="font-weight-regular"> {{ dataSuppD.short_name }} </b>
                        </v-col>
                    </v-row>
                    <v-row class="pa-0 ma-0" >
                        <v-col 
                            class="pa-0 pt-4 ma-0" 
                            xs="12"
                            sm="12"
                            md="3"
                            lg="3"
                            xl="3"
                            style="font-size: 16px;"
                        > 
                            <v-icon left>mdi-chart-timeline-variant</v-icon>Estatus: &nbsp;
                            <v-chip
                                close-icon="mdi-close-outline"
                                :color = "dataSuppD.color"
                                outlined
                            >
                                {{ dataSuppD.name }}
                            </v-chip>
                        </v-col>
                        <v-col
                            class="pa-0 pt-4 ma-0" 
                            xs="12"
                            sm="12"
                            md="3"
                            lg="3"
                            xl="3"
                            style="font-size: 16px;"
                        > 
                            <v-icon left>mdi-calendar-month-outline</v-icon>Liberada: <b class="font-weight-regular"> {{ dataSuppD.created_at }} </b>
                        </v-col> 
                        <v-col
                            class="pa-0 pt-4 ma-0" 
                            xs="12"
                            sm="12"
                            md="3"
                            lg="3"
                            xl="3"
                            style="font-size: 16px;"
                        > 
                            <v-icon left>mdi-account-circle-outline</v-icon>Usuario: <b class="font-weight-regular"> {{ dataSuppD.username }} </b>
                        </v-col> 
                        <v-col
                            xs="12"
                            sm="12"
                            md="1"
                            lg="1"
                            xl="1" 
                        >
                            <v-btn 
                                small 
                                depressed 
                                :elevation="2"
                                @click="viewAllSupply()"
                                block
                            >
                                <v-icon
                                left
                                dark
                                color="blue-grey darken-4"
                                >
                                mdi-arrow-left-bold-circle-outline
                                </v-icon>
                                Atrás
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-subtitle>
            <v-divider class="divider-w mt-1 mb-1"></v-divider>
            <v-card-text  class="pa-2 ma-0">
                <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" >
                    <v-row class="pa-0 ma-0" >
                        <v-col 
                            class="pa-0 pt-4 ma-0" 
                            xs="12"
                            sm="12"
                            md="4"
                            lg="4"
                            xl="4"
                            style="font-size: 16px;"
                        >
                            <v-icon left>mdi-dolly</v-icon> Tipo entrega: <b class="info-free"> {{ dataSuppD.delivery_type }} </b>
                        </v-col>
                        <v-col 
                            class="pa-0 pt-4 ma-0" 
                            xs="12"
                            sm="12"
                            md="4"
                            lg="4"
                            xl="4"
                            style="font-size: 16px;"
                        >
                            <v-icon left>mdi-card-bulleted-outline</v-icon> Tipo embarque: <b class="info-free"> {{ dataSuppD.boarding_type }} </b>
                        </v-col>
                        <v-col 
                            class="pa-0 pt-4 ma-0" 
                            xs="12"
                            sm="12"
                            md="4"
                            lg="4"
                            xl="4"
                            style="font-size: 16px;"
                        >
                            <v-icon left>mdi-truck-fast-outline</v-icon> Fletera: <b class="info-free"> {{ dataSuppD.companie }} </b>
                        </v-col>
                    </v-row>
                    <v-row class="pa-0 ma-0 mb-1">
                        <v-col
                            class="pa-0 pt-4 ma-0" 
                            xs="12"
                            sm="12"
                            md="6"
                            lg="6"
                            xl="6"
                            style="font-size: 16px;"
                            v-if = destiny
                        > 
                            <v-icon left>mdi-map-marker-radius-outline</v-icon>Destino: <b class="info-free"> {{ destiny }} </b>
                        </v-col>
                        <v-col 
                            class="pa-0 pt-4 ma-0" 
                            xs="12"
                            sm="12"
                            md="6"
                            lg="6"
                            xl="6"
                            style="font-size: 16px;"
                        >
                            <v-icon left>mdi-comment-processing-outline</v-icon> Comentario: <b class="info-free"> {{ dataSuppD.coment }} </b>
                        </v-col> 
                    </v-row>
                    <v-row class="pa-0 ma-0 mb-1">
                        <v-col
                            class="pa-0 pt-4 ma-0" 
                            xs="12"
                            sm="12"
                            md="6"
                            lg="6"
                            xl="6"
                            style="font-size: 16px;"
                            v-if = contact
                        > 
                            <v-icon left>mdi-account-circle</v-icon>Quien recibe: <b class="info-free"> {{ dataSuppD.contact }} </b>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
        <v-card
            class="mx-auto rounded-0 border-0 mt-2 mb-1"
            max-width="99%"
            :elevation="0"
        >
            <v-tabs
                color="shades_five"
                centered
                height="40px"
            >
            <!-- @click="tabFree = 'tab1'" -->
            <!-- disabled="true" -->
                <v-tab
                    @click="gridSuppS(1)"
                >
                    Surtido
                    <v-icon right>
                        mdi-dolly
                    </v-icon>
                </v-tab>
                <v-tab
                    @click="gridSuppS(2)"                
                >
                    Valida
                    <v-icon right>
                        mdi-checkbox-multiple-marked-outline
                    </v-icon>
                </v-tab>
                <v-tab
                    @click="gridSuppS(3)"
                >
                    Empaque
                    <v-icon right>
                        mdi-package-variant
                    </v-icon>
                </v-tab>
                <v-tab
                    @click="gridSuppS(4)"
                >
                    Valida
                    <v-icon right>
                        mdi-checkbox-multiple-marked-outline
                    </v-icon>
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabFree">
                <v-tab-item
                    value="tab1"
                >
                    <v-card
                        class="mx-auto rounded-0 border-0 "
                        max-width="99%"
                        :elevation="0"
                    >
                        <v-card-subtitle  class="pa-2 ma-0 ">
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppT.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorT"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconT }}
                                            </v-icon>
                                            {{ dataCat.catT }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers"
                                    :items="dataSuppT"
                                    :page.sync="pageT"
                                    :items-per-page="itemsPerPageT"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountT = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            color="#EAA20A"
                                                            @click="scanModal(item.dord_id,item.num)" 
                                                        >
                                                            <v-icon>mdi-barcode-scan</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    Escanear
                                                </v-tooltip>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pageT" 
                                        :length="pageCountT" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppT2.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorT"
                                            text-color="blue-grey darken-4"
                                            label
                                            right
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconT }}
                                            </v-icon>
                                            {{ dataCat.catT }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        style="font-size: 16px;"
                                    > 
                                        <v-chip
                                            class="ma-2"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 90%;"
                                        >
                                            <v-icon left>
                                                mdi-scissors-cutting
                                            </v-icon>
                                            Recortes
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers"
                                    :items="dataSuppT2"
                                    :page.sync="pageT2"
                                    :items-per-page="itemsPerPageT2"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountT2 = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            color="#EAA20A"
                                                            @click="scanModal(item.dord_id,item.num)" 
                                                        >
                                                            <v-icon>mdi-barcode-scan</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    Escanear
                                                </v-tooltip>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pageT2" 
                                        :length="pageCountT2" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppC.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorC"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconC }}
                                            </v-icon>
                                            {{ dataCat.catC }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers2"
                                    :items="dataSuppC"
                                    :page.sync="pageC"
                                    :items-per-page="itemsPerPageC"
                                    :sort-desc="false"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountC = $event"
                                    :loading="loadingTable"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.metraje`]="{ item }">
                                        
                                    </template>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            color="#EAA20A"
                                                            @click="scanModal(item.dord_id,item.num)" 
                                                        >
                                                            <v-icon>mdi-barcode-scan</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    Escanear
                                                </v-tooltip>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pageC" 
                                        :length="pageCountC" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppP.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorP"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconP }}
                                            </v-icon>
                                            {{dataCat.catP }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers2"
                                    :items="dataSuppP"
                                    :page.sync="pageP"
                                    :items-per-page="itemsPerPageP"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountP = $event"
                                    :loading="loadingTable"
                                    loading-text="Cargando Articulos ..."
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            color="#EAA20A"
                                                            @click="scanModal(item.dord_id,item.num)" 
                                                        >
                                                            <v-icon>mdi-barcode-scan</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    Escanear
                                                </v-tooltip>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pageP" 
                                        :length="pageCountP" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppM.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorP"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconP }}
                                            </v-icon>
                                            {{ dataCat.catP }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers2"
                                    :items="dataSuppM"
                                    :page.sync="pageM"
                                    :items-per-page="itemsPerPageM"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountM = $event"
                                    :loading="loadingTable"
                                    loading-text="Cargando Articulos ..."
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            color="#EAA20A"
                                                            @click="scanModal(item.dord_id,item.num)" 
                                                        >
                                                            <v-icon>mdi-barcode-scan</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    Escanear
                                                </v-tooltip>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pageM" 
                                        :length="pageCountM" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppTol.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorM"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconM }}
                                            </v-icon>
                                            {{ dataCat.catM }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers2"
                                    :items="dataSuppTol"
                                    :page.sync="pageTol"
                                    :items-per-page="itemsPerPageTol"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountTol = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            color="#EAA20A"
                                                            @click="scanModal(item.dord_id,item.num)" 
                                                        >
                                                            <v-icon>mdi-barcode-scan</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    Escanear
                                                </v-tooltip>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pageTol" 
                                        :length="pageCountTol" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                        </v-card-subtitle>
                    </v-card>
                </v-tab-item>
                <v-tab-item
                    value="tab2"
                >
                    <v-card
                        class="mx-auto rounded-0 border-0 "
                        max-width="99%"
                        :elevation="0"
                    >
                        <v-card-subtitle  class="pa-2 ma-0 ">
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppT.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorT"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconT }}
                                            </v-icon>
                                            {{ dataCat.catT }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-checkbox-multiple-blank-outline
                                        </v-icon>
                                        Validado: 
                                        <v-chip
                                            close-icon="mdi-close-outline"
                                            color = "#008000"
                                            outlined
                                            v-if="statusValT == 0"
                                        >
                                            Completado
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="1"
                                        lg="1"
                                        xl="1"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#007DD6"
                                                    @click="valModal(dataSuppD.id,dataCat.catIdT,0)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </template>
                                            Validar
                                        </v-tooltip>
                                    </v-col>
                                    <v-col 
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#9DBD32"
                                                    @click="txtGenerate(dataCat.catIdT,0)" 
                                                    style="width: 60%;"
                                                    v-if="statusValT == 0"
                                                >
                                                <v-icon left>mdi-file-download-outline</v-icon>Remisión
                                                </v-btn>
                                            </template>
                                            Descargar
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppT"
                                    :page.sync="pagePT"
                                    :items-per-page="itemsPerPagePT"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPT = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.check`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.check == 1"
                                            >
                                                <v-icon color="#008000">mdi-checkbox-marked-circle-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePT" 
                                        :length="pageCountPT" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppT2.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorT"
                                            text-color="blue-grey darken-4"
                                            label
                                            right
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconT }}
                                            </v-icon>
                                            {{ dataCat.catT }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        style="font-size: 16px;"
                                    > 
                                        <v-chip
                                            class="ma-2"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 90%;"
                                        >
                                            <v-icon left>
                                                mdi-scissors-cutting
                                            </v-icon>
                                            Recortes
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-checkbox-multiple-blank-outline
                                        </v-icon>
                                        Validado: 
                                        <v-chip
                                            close-icon="mdi-close-outline"
                                            color = "#008000"
                                            outlined
                                            v-if="statusValT2 == 0"
                                        >
                                            Completado
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="1"
                                        lg="1"
                                        xl="1"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#007DD6"
                                                    @click="valModal(dataSuppD.id,dataCat.catIdT,1)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </template>
                                            Validar
                                        </v-tooltip>
                                    </v-col>
                                    <v-col 
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#9DBD32"
                                                    @click="txtGenerate(dataCat.catIdT,1)" 
                                                    style="width: 60%;"
                                                    v-if="statusValT2 == 0"
                                                >
                                                <v-icon left>mdi-file-download-outline</v-icon>Remisión
                                                </v-btn>
                                            </template>
                                            Descargar
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppT2"
                                    :page.sync="pagePT2"
                                    :items-per-page="itemsPerPagePT2"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPT2 = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.check`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.check == 1"
                                            >
                                                <v-icon color="#008000">mdi-checkbox-marked-circle-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePT2" 
                                        :length="pageCountPT2" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppC.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorC"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconC }}
                                            </v-icon>
                                            {{ dataCat.catC }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-checkbox-multiple-blank-outline
                                        </v-icon>
                                        Validado: 
                                        <v-chip
                                            close-icon="mdi-close-outline"
                                            color = "#008000"
                                            outlined
                                            v-if="statusValC == 0"
                                        >
                                            Completado
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="1"
                                        lg="1"
                                        xl="1"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#007DD6"
                                                    @click="valModal(dataSuppD.id,dataCat.catIdC,0)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </template>
                                            Validar
                                        </v-tooltip>
                                    </v-col>
                                    <v-col 
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#9DBD32"
                                                    @click="txtGenerate(dataCat.catIdC,0)" 
                                                    style="width: 60%;"
                                                    v-if="statusValC == 0"
                                                >
                                                <v-icon left>mdi-file-download-outline</v-icon>Remisión
                                                </v-btn>
                                            </template>
                                            Descargar
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppC"
                                    :page.sync="pagePC"
                                    :items-per-page="itemsPerPagePC"
                                    :sort-desc="false"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPC = $event"
                                    :loading="loadingTable"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.metraje`]="{ item }">
                                        
                                    </template>
                                    <template #[`item.check`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.check == 1"
                                            >
                                                <v-icon color="#008000">mdi-checkbox-marked-circle-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePC" 
                                        :length="pageCountPC" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppP.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorP"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconP }}
                                            </v-icon>
                                            {{ dataCat.catP }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-checkbox-multiple-blank-outline
                                        </v-icon>
                                        Validado: 
                                        <v-chip
                                            close-icon="mdi-close-outline"
                                            color = "#008000"
                                            outlined
                                            v-if="statusValP == 0"
                                        >
                                            Completado
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="1"
                                        lg="1"
                                        xl="1"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#007DD6"
                                                    @click="valModal(dataSuppD.id,dataCat.catIdP,0)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </template>
                                            Validar
                                        </v-tooltip>
                                    </v-col>
                                    <v-col 
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#9DBD32"
                                                    @click="txtGenerate(dataCat.catIdP,0)" 
                                                    style="width: 60%;"
                                                    v-if="statusValP == 0"
                                                >
                                                <v-icon left>mdi-file-download-outline</v-icon>Remisión
                                                </v-btn>
                                            </template>
                                            Descargar
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppP"
                                    :page.sync="pagePP"
                                    :items-per-page="itemsPerPagePP"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPP = $event"
                                    :loading="loadingTable"
                                    loading-text="Cargando Articulos ..."
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.check`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.check == 1"
                                            >
                                                <v-icon color="#008000">mdi-checkbox-marked-circle-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePP" 
                                        :length="pageCountPP" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppM.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorP"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconP }}
                                            </v-icon>
                                            {{ dataCat.catP }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-checkbox-multiple-blank-outline
                                        </v-icon>
                                        Validado: 
                                        <v-chip
                                            close-icon="mdi-close-outline"
                                            color = "#008000"
                                            outlined
                                            v-if="statusValM == 0"
                                        >
                                            Completado
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="1"
                                        lg="1"
                                        xl="1"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#007DD6"
                                                    @click="valModal(dataSuppD.id,dataCat.catIdP,0)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </template>
                                            Validar
                                        </v-tooltip>
                                    </v-col>
                                    <v-col 
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#9DBD32"
                                                    @click="txtGenerate(dataCat.catIdP,0)" 
                                                    style="width: 60%;"
                                                    v-if="statusValM == 0"
                                                >
                                                <v-icon left>mdi-file-download-outline</v-icon>Remisión
                                                </v-btn>
                                            </template>
                                            Descargar
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppM"
                                    :page.sync="pagePM"
                                    :items-per-page="itemsPerPagePM"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPM = $event"
                                    :loading="loadingTable"
                                    loading-text="Cargando Articulos ..."
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.check`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.check == 1"
                                            >
                                                <v-icon color="#008000">mdi-checkbox-marked-circle-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePM" 
                                        :length="pageCountPM" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppTol.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorM"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconM }}
                                            </v-icon>
                                            {{ dataCat.catM }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-checkbox-multiple-blank-outline
                                        </v-icon>
                                        Validado: 
                                        <v-chip
                                            close-icon="mdi-close-outline"
                                            color = "#008000"
                                            outlined
                                            v-if="statusValTol == 0"
                                        >
                                            Completado
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="1"
                                        lg="1"
                                        xl="1"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#007DD6"
                                                    @click="valModal(dataSuppD.id,dataCat.catIdM,0)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </template>
                                            Validar
                                        </v-tooltip>
                                    </v-col>
                                    <v-col 
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        class="pa-0 pt-4 ma-2"
                                    >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                                    color="#9DBD32"
                                                    @click="txtGenerate(dataCat.catIdM,0)" 
                                                    style="width: 60%;"
                                                    v-if="statusValTol == 0"
                                                >
                                                <v-icon left>mdi-file-download-outline</v-icon>Remisión
                                                </v-btn>
                                            </template>
                                            Descargar
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppTol"
                                    :page.sync="pagePTol"
                                    :items-per-page="itemsPerPagePTol"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPTol = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.check`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.check == 1"
                                            >
                                                <v-icon color="#008000">mdi-checkbox-marked-circle-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePTol" 
                                        :length="pageCountPTol" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                        </v-card-subtitle>
                    </v-card>
                </v-tab-item>
                <v-tab-item
                    value="tab3"
                >
                    <v-card
                        class="mx-auto rounded-0 border-0 "
                        max-width="99%"
                        :elevation="0"
                    >
                        <v-card-subtitle  class="pa-2 ma-0 ">
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorT"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconT }}
                                            </v-icon>
                                            {{ dataCat.catT }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                        <!-- <v-chip
                                            close-icon="mdi-close-outline"
                                            color = "#008000"
                                            outlined
                                        >
                                            Completado
                                        </v-chip> -->
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[0],0)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppT"
                                    :page.sync="pagePT"
                                    :items-per-page="itemsPerPagePT"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPT = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePT" 
                                        :length="pageCountPT" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorT"
                                            text-color="blue-grey darken-4"
                                            label
                                            right
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconT }}
                                            </v-icon>
                                            {{ dataCat.catT }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        style="font-size: 16px;"
                                    > 
                                        <v-chip
                                            class="ma-2"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 90%;"
                                        >
                                            <v-icon left>
                                                mdi-scissors-cutting
                                            </v-icon>
                                            Recortes
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                    </v-col>
                                    <v-col 
                                        md="4"
                                        lg="4"
                                        xl="4"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[0],1)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppT2"
                                    :page.sync="pagePT2"
                                    :items-per-page="itemsPerPagePT2"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPT2 = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePT2" 
                                        :length="pageCountPT2" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorC"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconC }}
                                            </v-icon>
                                            {{ dataCat.catC }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[1],0)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppC"
                                    :page.sync="pagePC"
                                    :items-per-page="itemsPerPagePC"
                                    :sort-desc="false"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPC = $event"
                                    :loading="loadingTable"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.metraje`]="{ item }">
                                        
                                    </template>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePC" 
                                        :length="pageCountPC" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorP"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconP }}
                                            </v-icon>
                                            {{ dataCat.catP }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[2],0)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppP"
                                    :page.sync="pagePP"
                                    :items-per-page="itemsPerPagePP"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPP = $event"
                                    :loading="loadingTable"
                                    loading-text="Cargando Articulos ..."
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePP" 
                                        :length="pageCountPP" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorP"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconP }}
                                            </v-icon>
                                            {{ dataCat.catP }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[3],0)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppM"
                                    :page.sync="pagePM"
                                    :items-per-page="itemsPerPagePM"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPM = $event"
                                    :loading="loadingTable"
                                    loading-text="Cargando Articulos ..."
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePM" 
                                        :length="pageCountPM" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorM"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconM }}
                                            </v-icon>
                                            {{ dataCat.catM }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[4],0)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppTol"
                                    :page.sync="pagePTol"
                                    :items-per-page="itemsPerPagePTol"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPTol = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePTol" 
                                        :length="pageCountPTol" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                        </v-card-subtitle>
                    </v-card>
                </v-tab-item>
                <v-tab-item
                    value="tab4"
                >
                    <v-card
                        class="mx-auto rounded-0 border-0 "
                        max-width="99%"
                        :elevation="0"
                    >
                        <v-card-subtitle  class="pa-2 ma-0 ">
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppT.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorT"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconT }}
                                            </v-icon>
                                            {{ dataCat.catT }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                        <!-- <v-chip
                                            close-icon="mdi-close-outline"
                                            color = "#008000"
                                            outlined
                                        >
                                            Completado
                                        </v-chip> -->
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[0],0)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppT"
                                    :page.sync="pagePT"
                                    :items-per-page="itemsPerPagePT"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPT = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePT" 
                                        :length="pageCountPT" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppT2.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorT"
                                            text-color="blue-grey darken-4"
                                            label
                                            right
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconT }}
                                            </v-icon>
                                            {{ dataCat.catT }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        style="font-size: 16px;"
                                    > 
                                        <v-chip
                                            class="ma-2"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 90%;"
                                        >
                                            <v-icon left>
                                                mdi-scissors-cutting
                                            </v-icon>
                                            Recortes
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                    </v-col>
                                    <v-col 
                                        md="4"
                                        lg="4"
                                        xl="4"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[0],1)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppT2"
                                    :page.sync="pagePT2"
                                    :items-per-page="itemsPerPagePT2"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPT2 = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePT2" 
                                        :length="pageCountPT2" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppC.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorC"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconC }}
                                            </v-icon>
                                            {{ dataCat.catC }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[1],0)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppC"
                                    :page.sync="pagePC"
                                    :items-per-page="itemsPerPagePC"
                                    :sort-desc="false"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPC = $event"
                                    :loading="loadingTable"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.metraje`]="{ item }">
                                        
                                    </template>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePC" 
                                        :length="pageCountPC" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppP.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorP"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconP }}
                                            </v-icon>
                                            {{ dataCat.catP }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[2],0)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppP"
                                    :page.sync="pagePP"
                                    :items-per-page="itemsPerPagePP"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPP = $event"
                                    :loading="loadingTable"
                                    loading-text="Cargando Articulos ..."
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePP" 
                                        :length="pageCountPP" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppM.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorP"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconP }}
                                            </v-icon>
                                            {{ dataCat.catP }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="2"
                                        lg="2"
                                        xl="2"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[3],0)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppM"
                                    :page.sync="pagePM"
                                    :items-per-page="itemsPerPagePM"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPM = $event"
                                    :loading="loadingTable"
                                    loading-text="Cargando Articulos ..."
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePM" 
                                        :length="pageCountPM" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="dataSuppTol.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="dataCat.colorM"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ dataCat.iconM }}
                                            </v-icon>
                                            {{ dataCat.catM }}
                                        </v-chip>
                                    </v-col>
                                    <v-col 
                                        md="3"
                                        lg="3"
                                        xl="3"
                                        class="pa-0 pt-4 ma-2" 
                                    >
                                        <v-icon left>
                                            mdi-package-variant
                                        </v-icon>
                                        Empacado: 
                                    </v-col>
                                    <v-col 
                                        md="5"
                                        lg="5"
                                        xl="5"
                                        class="pa-0 pt-4 ma-0" 
                                        align="right"
                                    >
                                        <v-btn
                                            icon
                                            color="#A3C334"
                                            @click="packModal(dataSuppD.id,dataCat[4],0)" 
                                        >
                                            <v-icon >mdi-package-variant</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headersP"
                                    :items="dataSuppTol"
                                    :page.sync="pagePTol"
                                    :items-per-page="itemsPerPagePTol"
                                    hide-default-footer
                                    class="elevation-0 overflow-y-auto"
                                    @page-count="pageCountPTol = $event"
                                    :loading="loadingTable"
                                    :sort-desc="false"
                                >
                                    <v-progress-linear 
                                        v-show="loadingTable" 
                                        slot="progress" 
                                        color="red darken-4" 
                                        indeterminate>
                                    </v-progress-linear>
                                    <template #[`item.surt`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                                v-if="item.surt == 2"
                                            >
                                                <v-icon color="#008000">mdi-archive-arrow-up-outline</v-icon>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template #[`item.dord_id`]="{ item }">
                                        <v-row>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#EAA20A"
                                                    @click="scanModal(item.dord_id,item.num)" 
                                                >
                                                    <v-icon>mdi-barcode-scan</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col 
                                                md="2"
                                                lg="2"
                                                xl="2"
                                                class="pa-0 ma-0"
                                            >
                                                <v-btn
                                                    icon
                                                    color="#007DD6"
                                                >
                                                    <v-icon>mdi-clipboard-text-search-outline</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-data-table>
                                <div class="text-center pt-2">
                                    <v-pagination 
                                        v-model="pagePTol" 
                                        :length="pageCountPTol" 
                                        total-visible="5"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                        </v-card-subtitle>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { validationMixin } from 'vuelidate'
    import { required, requiredIf, maxLength, minLength, email, maxValue, minValue } from 'vuelidate/lib/validators'
    import SAQuestions from '../../services/SweetAlertQuestion'
    import SAToasts from '../../services/SweetAlertToast'
    import { mapActions, mapState, mapGetters } from 'vuex'
    import store from '../../store/store'
    import socketClientEmit from '../../shared/socketEmit'
    
    export default {
        data () {
            return {
                tabFree: 'tab1',
                gridT: [],
                gridT2: [],
                gridC: [],
                gridP: [],
                gridM: [],
                gridTol: [],
                catT:[],
                catC:[],
                catP:[],
                catM:[],
                catTol:[],
                freeId: Number.parseInt(this.$route.params.freeId),
                noPed :'',
                nameAgent :'',
                nameClient:'',
                userName:'',
                colorStat :'',
                status:'',
                destiny :'',
                date:'',
                deliveryt :'',
                board :'',
                deliserv:'',
                coment:'',
                contact:'',
                loading: false,
                loadingTable: true,
                isPartner: false,
                // data Table
                pageT: 1,
                pageCountT: 0,
                itemsPerPageT: 5,
                pageT2: 1,
                pageCountT2: 0,
                itemsPerPageT2: 5,
                pageC: 1,
                pageCountC: 0,
                itemsPerPageC: 5,
                pageP: 1,
                pageCountP: 0,
                itemsPerPageP: 5,
                pageM: 1,
                pageCountM: 0,
                itemsPerPageM: 5,
                pageTol: 1,
                pageCountTol: 0,
                itemsPerPageTol: 5,
                // data table package
                pagePT: 1,
                pageCountPT: 0,
                itemsPerPagePT: 5,
                pagePT2: 1,
                pageCountPT2: 0,
                itemsPerPagePT2: 5,
                pagePC: 1,
                pageCountPC: 0,
                itemsPerPagePC: 5,
                pagePP: 1,
                pageCountPP: 0,
                itemsPerPagePP: 5,
                pagePM: 1,
                pageCountPM: 0,
                itemsPerPagePM: 5,
                pagePTol: 1,
                pageCountPTol: 0,
                itemsPerPagePTol: 5,
                selected:[],
                headers: [
                    { text: '#', width:'5%', value: 'num' },
                    { text: 'Clave Sai', width:'15%', value: 'sai_id' },
                    { text: 'Articulo', width:'30%', value: 'article' },
                    { text: 'Cantidad', width:'5%', value: 'quantity' },
                    { text: 'Unidad', width:'5%', value: 'unit' },
                    { text: 'Metraje', width:'5%', value: 'pzas' },
                    { text: 'Surtido', width:'15%', value: 'surt' },
                    { text: 'Acciones',width:'15%', value: 'dord_id' },
                ],
                headers2: [
                    { text: '#', width:'5%', value: 'num' },
                    { text: 'Clave Sai', width:'15%', value: 'sai_id' },
                    { text: 'Articulo', width:'30%', value: 'article' },
                    { text: 'Cantidad', width:'5%', value: 'quantity' },
                    { text: 'Unidad', width:'5%', value: 'unit' },
                    { text: 'Contenido', width:'5%', value: 'pzas' },
                    { text: 'Surtido', width:'15%', value: 'surt' },
                    { text: 'Acciones', width:'15%',value: 'dord_id' },
                ],
                headersP: [
                    { text: '#', width:'5%', value: 'num' },
                    { text: 'Lote', width:'15%', value: 'lot' },
                    { text: 'Articulo', width:'15%', value: 'article' },
                    { text: 'Cantidad', width:'5%', value: 'quantity' },
                    { text: 'Validado', width:'5%', value: 'check' },
                ]
            }
        },
        mixins: [validationMixin],
        validations: {
        },
        computed: {
            ...mapGetters({ 
                getUserApi: 'auth/getUserApi',
                dataSuppD: 'defree/getDataSuppD',
                dataCat: 'defree/getDataCat',
                dataSuppT: 'defree/getDataSuppT',
                dataSuppT2: 'defree/getDataSuppT2',
                dataSuppC: 'defree/getDataSuppC',
                dataSuppP: 'defree/getDataSuppP',
                dataSuppM: 'defree/getDataSuppM',
                dataSuppTol: 'defree/getDataSuppTol',
                statusValT: 'defree/getStatusValT',
                statusValT2: 'defree/getStatusValT2',
                statusValC: 'defree/getStatusValC',
                statusValP: 'defree/getStatusValP',
                statusValM: 'defree/getStatusValM',
                statusValTol: 'defree/getStatusValTol',
                // dataPackT: 'defree/getDataPackT',
                // dataPackT2: 'defree/getDataPackT2',
                // dataPackC: 'defree/getDataPackC',
                // dataPackP: 'defree/getDataPackP',
                // dataPackM: 'defree/getDataPackM',
                // dataPackTol: 'defree/getDataPackTol'
            }),        
        },
        methods: {
            ...mapActions(['login']),

            onScroll (e) {
                this.scrollSync.top = e.target.scrollTop
                this.scrollSync.left = e.target.scrollLeft
            },
            async getFreeD() { // obtenemos las partidas del pedido
                var payload = {
                    token: this.getUserApi.token,
                    freeId: this.freeId,
                    user_id: this.getUserApi.uid,
                }
                const res = await this.$store.dispatch('defree/getFreeD',payload);
                if(res.success) {
                    this.destiny = res.destiny
                    this.loadingTable = false
                }
            },
            formatDate(date){
                let dateComp = date.substring(0,10) + ' ' + date.substring(11,19);
                return dateComp
            },

            async scanModal(dordId,part){
                let payload = {
                    token: this.getUserApi.token,
                    user: this.getUserApi.uid,
                    dordId: dordId,
                    part: part,
                    name_modal:  'supplyFree', // modal 
                    state_modal: true,
                }
                // await socketClientEmit.supplyScanEmit(payload)
                await this.$store.dispatch('defree/getSupplyModal',payload)
                let payload2 = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    dordId: dordId,
                }
                await this.$store.dispatch('defree/gridsSupplyModal',payload2)
                await this.$store.dispatch('modals/IdentifyModal',payload);
                // if(res.success){

                // }
            },
            
            async packModal(freeId,arrCat,rec){
                let payload = {
                    token: this.getUserApi.token,
                    user: this.getUserApi.uid,
                    freeId: freeId,
                    arrCat: arrCat,
                    rec: rec
                }
                await this.$store.dispatch('defree/gridsPackModal',payload)
                let payloadM = {
                    name_modal:  'supplyPack', // modal 
                    state_modal: true,
                }
                await this.$store.dispatch('modals/IdentifyModal',payloadM);
            },

            viewAllSupply() {
                store.dispatch('modals/loaderfull',true)
                this.$router.push('/almacen/surtir')
            },

            async txtGenerate(catId,rec){
                var payload = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    freeId: this.dataSuppD.id,
                    no_ped: this.dataSuppD.no_ped,
                    catId: catId,
                    rec: rec
                }
                const res = await this.$store.dispatch('defree/remGenerate',payload);
                if(res.success){
                    Swal.fire({
                        icon: 'success',
                        title: '¡Generado!',
                        text: 'Se ha generado el archivo txt de la Remisión.',
                    })
                } else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'Ocurrió un error al intentar generar el archivo txt de la Remisión',
                    })
                }
            },

            async gridSuppS(tab){
                var payload = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    freeId: this.dataSuppD.id,
                    tab: tab
                }
                await this.$store.dispatch('defree/getGridsG',payload)
                switch(tab){
                    case 1:
                        this.tabFree = 'tab1'
                        break;
                    case 2:
                        this.tabFree = 'tab2'
                        break;
                    case 3:
                        this.tabFree = 'tab3'
                        break;
                    case 4:
                        this.tabFree = 'tab4'
                        break;
                }

            },

            async valModal(freeId,catId,rec){
                let payload = {
                    token: this.getUserApi.token,
                    user: this.getUserApi.uid,
                    freeId: freeId,
                    catId: catId,
                    rec: rec,
                    validate: 1
                }
                await this.$store.dispatch('defree/getValModal',payload)
                
                let payload2 = {
                    token: this.getUserApi.token,
                    user: this.getUserApi.uid,
                    name_modal:  'supplyVal', // modal 
                    state_modal: true,
                }
                await this.$store.dispatch('modals/IdentifyModal',payload2);
            },

            
        },
        mounted(){
            this.getFreeD();
            setTimeout(() => { this.$store.dispatch('modals/loaderfull',false) }, 2000); // desactivamos el overlay cargando
        },
    }

</script>
<style scoped>
    .cotizacion-shades {
        margin-top: 15px;
    }
    .divider-w{
        border-width: 2px !important;
    }
    .info-free{
        font-weight: 590;
    }
</style>
