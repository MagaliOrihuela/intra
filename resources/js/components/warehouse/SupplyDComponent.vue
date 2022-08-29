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
                            <v-icon color="red darken-1">mdi-clipboard-check-multiple-outline</v-icon> &nbsp;&nbsp;Liberación: <b class="font-weight-regular">{{ freeId }}</b>
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
                            <v-icon left>mdi-clipboard-text-outline</v-icon> &nbsp;&nbsp;Pedido: <b class="font-weight-regular">{{ noPed }}</b>
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
                            <v-icon left>mdi-account-tie</v-icon> Agente: <b class="font-weight-regular"> {{ nameAgent }} </b>
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
                            <v-icon left> mdi-briefcase-account-outline </v-icon> Cliente: <b class="font-weight-regular"> {{ nameClient }} </b>
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
                                :color = "colorStat"
                                outlined
                            >
                                {{ status }}
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
                            <v-icon left>mdi-calendar-month-outline</v-icon>Liberada: <b class="font-weight-regular"> {{ formatDate(date) }} </b>
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
                            <v-icon left>mdi-account-circle-outline</v-icon>Usuario: <b class="font-weight-regular"> {{userName}} </b>
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
                            <v-icon left>mdi-dolly</v-icon> Tipo entrega: <b class="info-free"> {{ deliveryt }} </b>
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
                            <v-icon left>mdi-card-bulleted-outline</v-icon> Tipo embarque: <b class="info-free"> {{ board }} </b>
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
                            <v-icon left>mdi-truck-fast-outline</v-icon> Fletera: <b class="info-free"> {{ deliserv }} </b>
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
                            <v-icon left>mdi-comment-processing-outline</v-icon> Comentario: <b class="info-free"> {{ coment }} </b>
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
                            <v-icon left>mdi-account-circle</v-icon>Quien recibe: <b class="info-free"> {{ contact }} </b>
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
                <v-tab
                    @click="tabFree = 'tab1'"
                >
                    Escaneo
                    <v-icon right>
                        mdi-barcode-scan
                    </v-icon>
                </v-tab>
                <v-tab
                    @click="tabFree = 'tab2'"
                >
                    Empaque
                    <v-icon right>
                        mdi-package-variant
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
                                v-if="gridT.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="4"
                                        lg="4"
                                        xl="4"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="catT.color"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 35%;"
                                        >
                                            <v-icon left>
                                                {{ catT.icon }}
                                            </v-icon>
                                            {{ catT.category }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers"
                                    :items="gridT"
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
                                    <!-- <template #[`item.lot`]="{ item }">
                                        <input type="text" :id="item.dord_id" class="form-control" v-on:keyup.enter="scanModal(item.dord_id)"/>
                                    </template> -->
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
                                                    @click="scanModal(item.dord_id)" 
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
                                        v-model="pageT" 
                                        :length="pageCountT" 
                                        total-visible="7"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="gridT2.length > 0"
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
                                            :color="catT.color"
                                            text-color="blue-grey darken-4"
                                            label
                                            right
                                            style="width: 60%;"
                                        >
                                            <v-icon left>
                                                {{ catT.icon }}
                                            </v-icon>
                                            {{ catT.category }}
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
                                        <v-chip
                                            class="ma-2"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 60%;"
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
                                    :items="gridT2"
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
                                    <!-- <template #[`item.lot`]="{ item }">
                                        <input type="text" :id="item.dord_id" class="form-control" v-on:keyup.enter="scanModal(item.dord_id)"/>
                                    </template> -->
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
                                                    @click="scanModal(item.dord_id)" 
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
                                        v-model="pageT2" 
                                        :length="pageCountT2" 
                                        total-visible="7"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="gridC.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="4"
                                        lg="4"
                                        xl="4"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="catC.color"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 35%;"
                                        >
                                            <v-icon left>
                                                {{ catC.icon }}
                                            </v-icon>
                                            {{ catC.category }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers2"
                                    :items="gridC"
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
                                    <!-- <template #[`item.lot`]="{ item }">
                                        <input type="text" :id="item.dord_id" class="form-control" v-on:keyup.enter="scanModal(item.dord_id)"/>
                                    </template> -->
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
                                                    @click="scanModal(item.dord_id)" 
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
                                        v-model="pageC" 
                                        :length="pageCountC" 
                                        total-visible="7"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="gridP.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="4"
                                        lg="4"
                                        xl="4"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="catP.color"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 35%;"
                                        >
                                            <v-icon left>
                                                {{ catP.icon }}
                                            </v-icon>
                                            {{ catP.category }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="gridP"
                                    :headers="headers2"
                                    :items="gridP"
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
                                    <!-- <template #[`item.lot`]="{ item }">
                                        <input type="text" :id="item.dord_id" class="form-control" v-on:keyup.enter="scanModal(item.dord_id)"/>
                                    </template> -->
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
                                                    @click="scanModal(item.dord_id)" 
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
                                        v-model="pageP" 
                                        :length="pageCountP" 
                                        total-visible="7"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="gridM.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="4"
                                        lg="4"
                                        xl="4"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="catM.color"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 35%;"
                                        >
                                            <v-icon left>
                                                {{ catM.icon }}
                                            </v-icon>
                                            {{ catM.category }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="gridM"
                                    :headers="headers2"
                                    :items="gridM"
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
                                    <!-- <template #[`item.lot`]="{ item }">
                                        <input type="text" :id="item.dord_id" class="form-control" v-on:keyup.enter="scanModal(item.dord_id)"/>
                                    </template> -->
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
                                                    @click="scanModal(item.dord_id)" 
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
                                        v-model="pageM" 
                                        :length="pageCountM" 
                                        total-visible="7"
                                        circle 
                                        color="blue-grey darken-3" 
                                    ></v-pagination>
                                </div>
                            </v-container>
                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" 
                                v-if="gridTol.length > 0"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col 
                                        class="pa-0 pt-4 ma-0" 
                                        xs="12"
                                        sm="12"
                                        md="4"
                                        lg="4"
                                        xl="4"
                                        style="font-size: 16px;"
                                    > 
                                        <v-icon left>mdi-animation-outline</v-icon>Grupo: &nbsp;
                                        <v-chip
                                            class="ma-2"
                                            :color="catTol.color"
                                            text-color="blue-grey darken-4"
                                            label
                                            style="width: 35%;"
                                        >
                                            <v-icon left>
                                                {{ catTol.icon }}
                                            </v-icon>
                                            {{ catTol.category }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-data-table
                                    v-model="gridTol"
                                    :headers="headers2"
                                    :items="gridTol"
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
                                    <!-- <template #[`item.lot`]="{ item }">
                                        <input type="text" :id="item.dord_id" class="form-control" v-on:keyup.enter="scanModal(item.dord_id)"/>
                                    </template> -->
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
                                                    @click="scanModal(item.dord_id)" 
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
                                        v-model="pageTol" 
                                        :length="pageCountTol" 
                                        total-visible="7"
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
                    Aquí va el módulo de empaque, ¡muy pronto! :)
                    <!-- <SupplyChk /> -->
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
                selected:[],
                headers: [
                    { text: '#', width:'5%', value: 'num' },
                    { text: 'Clave Sai', width:'15%', value: 'sai_id' },
                    { text: 'Articulo', width:'30%', value: 'article' },
                    { text: 'Cantidad', width:'5%', value: 'quantity' },
                    { text: 'Unidad', width:'5%', value: 'unit' },
                    { text: 'Metraje', width:'5%', value: 'packing2' },
                    { text: 'Estatus', width:'15%', value: 'status' },
                    { text: 'Acciones',width:'15%', value: 'dord_id' },
                ],
                headers2: [
                    { text: '#', width:'5%', value: 'num' },
                    { text: 'Clave Sai', width:'15%', value: 'sai_id' },
                    { text: 'Articulo', width:'30%', value: 'article' },
                    { text: 'Cantidad', width:'5%', value: 'quantity' },
                    { text: 'Unidad', width:'5%', value: 'unit' },
                    { text: 'Contenido', width:'5%', value: 'packing2' },
                    { text: 'Estatus', width:'15%', value: 'status' },
                    { text: 'Acciones', width:'15%',value: 'dord_id' },
                ],
                pruba: [],
                prub: ''
            }
        },
        mixins: [validationMixin],
        validations: {
        },
        computed: {
            ...mapGetters({ 
                getUserApi: 'auth/getUserApi',
                dataSuppD: 'defree/getDataSuppD'
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
                    this.arrCat = res.arrCat
                    this.gridT = res.gridT
                    this.gridT2 = res.gridT2
                    this.gridC = res.gridC
                    this.gridP = res.gridP
                    this.gridM = res.gridM
                    this.gridTol = res.gridTol
                    this.catT = res.arrCat[0]
                    this.catC = res.arrCat[1]
                    this.catP = res.arrCat[2]
                    this.catM = res.arrCat[3]
                    this.catTol = res.arrCat[4]
                    var arrFree = res.dataF[0]
                    this.nameAgent = arrFree.agent
                    this.userName = arrFree.username
                    this.nameClient = arrFree.short_name
                    this.noPed = arrFree.no_ped
                    this.status = arrFree.name
                    this.colorStat = arrFree.color
                    this.destiny = res.destiny
                    this.date = arrFree.created_at
                    this.deliveryt = arrFree.delivery_type
                    this.board = arrFree.boarding_type
                    this.deliserv = arrFree.companie
                    this.coment = arrFree.coment
                    this.contact = arrFree.contact

                    this.loadingTable = false
                }
            },
            formatDate(date){
                let dateComp = date.substring(0,10) + ' ' + date.substring(11,19);
                return dateComp
            },

            async scanModal(dordId){
                let payload = {
                    token: this.getUserApi.token,
                    dordId: dordId,
                    name_modal:  'supplyFree', // modal 
                    state_modal: true,
                }
                // await socketClientEmit.supplyScanEmit(payload)
                await this.$store.dispatch('modals/IdentifyModal',payload);
                // if(res.success){

                // }
            },
            viewAllSupply() {
                store.dispatch('modals/loaderfull',true)
                this.$router.push('/almacen/surtir')
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
