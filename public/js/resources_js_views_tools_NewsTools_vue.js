(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_tools_NewsTools_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tools/NewsToolsComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tools/NewsToolsComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _utils_firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/firebase */ "./resources/js/utils/firebase.js");
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuelidate */ "./node_modules/vuelidate/lib/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var _services_SweetAlertToast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/SweetAlertToast */ "./resources/js/services/SweetAlertToast.js");
/* harmony import */ var _services_SweetAlertQuestion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/SweetAlertQuestion */ "./resources/js/services/SweetAlertQuestion.js");
/* harmony import */ var _shared_socketEmit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/socketEmit */ "./resources/js/shared/socketEmit.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







var refFB = _utils_firebase__WEBPACK_IMPORTED_MODULE_1__.storage.ref();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      id_update: 0,
      is_edit: false,
      itemsPrincipal: [{
        id: 0,
        name: 'No'
      }, {
        id: 1,
        name: 'Si'
      }],
      imgSaveNws: '',
      imgSaveCrs: '',
      headers: [{
        text: 'ID',
        align: 'start',
        value: 'id'
      }, {
        text: 'Carrousel',
        value: 'img_news_crs'
      }, {
        text: 'Entrada',
        value: 'img_news'
      }, {
        text: 'Titulo',
        value: 'title'
      }, {
        text: 'Principal',
        value: 'is_principal'
      }, {
        text: 'Fecha de creacion',
        value: 'created_at'
      }, {
        text: 'Acciones',
        sortable: false,
        value: 'options'
      }],
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
      RDescription: true
    };
  },
  mixins: [vuelidate__WEBPACK_IMPORTED_MODULE_5__.validationMixin],
  validations: {
    titleFmod: {
      required: (0,vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__.requiredIf)(function () {
        return this.RTitle;
      })
    },
    principalFmod: {
      required: (0,vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__.requiredIf)(function () {
        return this.RPrincipal;
      })
    },
    descFmod: {
      required: (0,vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__.requiredIf)(function () {
        return this.RDescription;
      })
    }
  },
  methods: {
    getDataRowsNews: function getDataRowsNews() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var payload, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.skeletorTable = true;
                payload = {
                  user_id: _this.getUserApi.uid,
                  token: _this.getUserApi.token
                };
                _context.next = 4;
                return _this.$store.dispatch('news/DataRowsNews', payload);

              case 4:
                data = _context.sent;

                if (data.success) {
                  _this.skeletorTable = false;
                } else {}

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    saveNews: function saveNews() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var imgNewsName, imgCrsName, _payload, data, _payload2, refNews, img_news_ext, metadata1, refCrs, img_carousel_ext, metadata2, payloadImg, iconToast, msjToast, positionToast, timerToast, SAToastsVar, _SAToastsVar;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.$v.$touch();

                if (_this2.$v.$invalid) {
                  _context2.next = 44;
                  break;
                }

                _this2.skeletorTable = true;
                imgNewsName = '';
                imgCrsName = '';

                if (_this2.imgNewsFmod != '') {
                  imgNewsName = _this2.imgNewsFmod[0].name;
                }

                if (_this2.imgCrsFmod != '') {
                  imgCrsName = _this2.imgCrsFmod[0].name;
                }

                _payload = {
                  token: _this2.getUserApi.token,
                  title: _this2.titleFmod,
                  is_principal: _this2.principalFmod,
                  description: _this2.descFmod,
                  img_news: imgNewsName,
                  img_news_crs: imgCrsName
                };
                console.log('maga-->a');
                _context2.next = 11;
                return _shared_socketEmit__WEBPACK_IMPORTED_MODULE_4__.default.createNewsEmit(_payload);

              case 11:
                data = _context2.sent;

                if (!data.success) {
                  _context2.next = 38;
                  break;
                }

                // creamos la notificacion
                _payload2 = {
                  user_id: _this2.getUserApi.uid,
                  token: _this2.getUserApi.token,
                  title: data.dNew.title,
                  // titulo de la notificacion
                  description: data.dNew.description.substr(0, 100) + ' ...',
                  // minimo 100 caracteres para que no se sature la notificacion
                  route: '/noticias/' + data.dNew.id,
                  // rota la cual abrira la notificacion, si no contiene ruta dejarlo en blanco 
                  is_partner: 0,
                  // registro 0 para mostrar notificacion en general - 1 para mostrar solo a partners de Shades
                  icon: 'mdi-newspaper',
                  // icono que llevara la notificacion
                  module: 'news',
                  relation_id: data.dNew.id,
                  //
                  department_id: 0 // deparamento para el que va dirigido este ticket - 0 es para todos 

                };
                _context2.next = 16;
                return _shared_socketEmit__WEBPACK_IMPORTED_MODULE_4__.default.createNotificationEmit(_payload2);

              case 16:
                // subimos las imagenes a firebase
                if (_this2.imgNewsFmod != '') {
                  refNews = refFB.child('news/' + data.dNew.img_news);
                  img_news_ext = data.dNew.img_news.split('.').pop();
                  metadata1 = {
                    contentType: 'image/' + img_news_ext
                  };
                  refNews.put(_this2.imgNewsFmod[0], metadata1).then(function (e) {
                    return console.log(e);
                  });
                }

                if (_this2.imgCrsFmod != '') {
                  refCrs = refFB.child('news/' + data.dNew.img_news_crs);
                  img_carousel_ext = data.dNew.img_news_crs.split('.').pop();
                  metadata2 = {
                    contentType: 'image/' + img_carousel_ext
                  };
                  refCrs.put(_this2.imgCrsFmod[0], metadata2).then(function (e) {
                    return console.log(e);
                  });
                }

                payloadImg = {
                  img_news: data.dNew.img_news,
                  img_news_crs: data.dNew.img_news_crs,
                  id: data.dNew.id
                };
                _context2.next = 21;
                return _shared_socketEmit__WEBPACK_IMPORTED_MODULE_4__.default.imgsNewsEmit(payloadImg);

              case 21:
                iconToast = 'success';
                msjToast = 'Noticia creada con éxito! ';
                positionToast = 'top';
                timerToast = 4000;
                SAToastsVar = new _services_SweetAlertToast__WEBPACK_IMPORTED_MODULE_2__.default(iconToast, msjToast, positionToast, timerToast);
                SAToastsVar.getToast();
                _this2.loading = false;
                _this2.openNews = false;
                _this2.titleFmod = '';
                _this2.principalFmod = '';
                _this2.descFmod = '';
                _this2.imgNewsFmod = [];
                _this2.imgCrsFmod = [];

                _this2.$v.$reset();

                _this2.skeletorTable = false;
                _context2.next = 44;
                break;

              case 38:
                iconToast = 'warning';
                msjToast = '¡No se pudo crear tu noticia, favor de contacta al area de sistemas! ';
                positionToast = 'top';
                timerToast = 4000;
                _SAToastsVar = new _services_SweetAlertToast__WEBPACK_IMPORTED_MODULE_2__.default(iconToast, msjToast, positionToast, timerToast);

                _SAToastsVar.getToast();

              case 44:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    editNews: function editNews(id) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var _yield$axios$get, data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return axios.get("/news/show/".concat(id), {
                  headers: {
                    Authorization: "Bearer " + _this3.getUserApi.token
                  }
                });

              case 2:
                _yield$axios$get = _context3.sent;
                data = _yield$axios$get.data;

                if (data.success) {
                  _this3.titleFmod = data.dNew.title;
                  _this3.principalFmod = data.dNew.is_principal;
                  _this3.descFmod = data.dNew.description;
                  _this3.id_update = data.dNew.id;

                  if (data.dNew.img_news != null) {
                    _this3.imgSaveNws = 'Img Guardada ' + data.dNew.img_news;
                  }

                  if (data.dNew.img_news_crs != null) {
                    _this3.imgSaveCrs = 'Img Guardada ' + data.dNew.img_news_crs;
                  }
                }

                _this3.is_edit = true;
                _this3.openNews = true;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    saveEditNews: function saveEditNews(id) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var imgNewsName, imgCrsName, _payload3, data, _payload4, refNews, img_news_ext, metadata1, refCrs, img_carousel_ext, metadata2, payloadImg, iconToast, msjToast, positionToast, timerToast, SAToastsVar, _SAToastsVar2;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this4.$v.$touch();

                if (_this4.$v.$invalid) {
                  _context4.next = 43;
                  break;
                }

                _this4.skeletorTable = true;
                imgNewsName = '';
                imgCrsName = '';

                if (_this4.imgNewsFmod != '') {
                  imgNewsName = _this4.imgNewsFmod[0].name;
                }

                if (_this4.imgCrsFmod != '') {
                  imgCrsName = _this4.imgCrsFmod[0].name;
                }

                _payload3 = {
                  token: _this4.getUserApi.token,
                  id: _this4.id_update,
                  title: _this4.titleFmod,
                  is_principal: _this4.principalFmod,
                  description: _this4.descFmod,
                  img_news: imgNewsName,
                  img_news_crs: imgCrsName
                };
                _context4.next = 10;
                return _shared_socketEmit__WEBPACK_IMPORTED_MODULE_4__.default.updateNewsEmit(_payload3);

              case 10:
                data = _context4.sent;

                if (!data.success) {
                  _context4.next = 37;
                  break;
                }

                // editamos la notificacion
                _payload4 = {
                  user_id: _this4.getUserApi.uid,
                  token: _this4.getUserApi.token,
                  title: data.dNew.title,
                  // titulo de la notificacion
                  description: data.dNew.description.substr(0, 100) + ' ...',
                  // minimo 100 caracteres para que no se sature la notificacion
                  module: 'news',
                  relation_id: data.dNew.id
                };
                _context4.next = 15;
                return _shared_socketEmit__WEBPACK_IMPORTED_MODULE_4__.default.updateNotificationEmit(_payload4);

              case 15:
                // subimos las imagenes a firebase
                if (_this4.imgNewsFmod != '') {
                  refNews = refFB.child('news/' + data.dNew.img_news);
                  img_news_ext = data.dNew.img_news.split('.').pop();
                  metadata1 = {
                    contentType: 'image/' + img_news_ext
                  };
                  refNews.put(_this4.imgNewsFmod[0], metadata1).then(function (e) {
                    return console.log(e);
                  });
                }

                if (_this4.imgCrsFmod != '') {
                  refCrs = refFB.child('news/' + data.dNew.img_news_crs);
                  img_carousel_ext = data.dNew.img_news_crs.split('.').pop();
                  metadata2 = {
                    contentType: 'image/' + img_carousel_ext
                  };
                  refCrs.put(_this4.imgCrsFmod[0], metadata2).then(function (e) {
                    return console.log(e);
                  });
                }

                payloadImg = {
                  img_news: data.dNew.img_news,
                  img_news_crs: data.dNew.img_news_crs,
                  id: data.dNew.id
                };
                _context4.next = 20;
                return _shared_socketEmit__WEBPACK_IMPORTED_MODULE_4__.default.imgsNewsEmit(payloadImg);

              case 20:
                iconToast = 'success';
                msjToast = 'Noticia editada con éxito! ';
                positionToast = 'top';
                timerToast = 4000;
                SAToastsVar = new _services_SweetAlertToast__WEBPACK_IMPORTED_MODULE_2__.default(iconToast, msjToast, positionToast, timerToast);
                SAToastsVar.getToast();
                _this4.loading = false;
                _this4.openNews = false;
                _this4.titleFmod = '';
                _this4.principalFmod = '';
                _this4.descFmod = '';
                _this4.imgNewsFmod = [];
                _this4.imgCrsFmod = [];

                _this4.$v.$reset();

                _this4.skeletorTable = false;
                _context4.next = 43;
                break;

              case 37:
                iconToast = 'warning';
                msjToast = '¡No se pudo editar tu noticia, favor de contacta al area de sistemas! ';
                positionToast = 'top';
                timerToast = 4000;
                _SAToastsVar2 = new _services_SweetAlertToast__WEBPACK_IMPORTED_MODULE_2__.default(iconToast, msjToast, positionToast, timerToast);

                _SAToastsVar2.getToast();

              case 43:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    cancelNews: function cancelNews() {
      this.titleFmod = '';
      this.principalFmod = '';
      this.descFmod = '';
      this.id_update = 0;
    },
    deleteNews: function deleteNews(id, itemTitle) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var iconQuestion, titleQuestion, textQuestion, confirmBtnQuestion, cancelBtnQuestion, SAQQuestionVar, resQuestion, _payload5, data, _payload6, refDel, refDelCrs, iconToast, msjToast, positionToast, timerToast, SAToastsVar, _SAToastsVar3;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                iconQuestion = '';
                titleQuestion = 'Noticia: ' + itemTitle;
                textQuestion = 'Se elimiar la Noticia seleccionada, ¿ Estas seguro de esto... ?';
                confirmBtnQuestion = 'Eliminar Noticia';
                cancelBtnQuestion = '<template><b-icon icon="arrow-up"></b-icon></template> Cancelar';
                SAQQuestionVar = new _services_SweetAlertQuestion__WEBPACK_IMPORTED_MODULE_3__.default(iconQuestion, titleQuestion, textQuestion, confirmBtnQuestion, cancelBtnQuestion);
                _context5.next = 8;
                return SAQQuestionVar.getQuestionRoute();

              case 8:
                resQuestion = _context5.sent;

                if (!resQuestion) {
                  _context5.next = 36;
                  break;
                }

                _this5.skeletorTable = true;
                _payload5 = {
                  token: _this5.getUserApi.token,
                  id: id
                };
                _context5.next = 14;
                return _shared_socketEmit__WEBPACK_IMPORTED_MODULE_4__.default.deleteNewsEmit(_payload5);

              case 14:
                data = _context5.sent;

                if (!data.success) {
                  _context5.next = 30;
                  break;
                }

                // eliminamos la notificacion relacionada
                _payload6 = {
                  user_id: _this5.getUserApi.uid,
                  token: _this5.getUserApi.token,
                  module: 'news',
                  relation_id: data.dNew.id
                };
                _context5.next = 19;
                return _shared_socketEmit__WEBPACK_IMPORTED_MODULE_4__.default.deleteNotificationEmit(_payload6);

              case 19:
                // eliminamos las imagenes de firebase
                if (data.dNew.img_news != null) {
                  refDel = refFB.child('news/' + data.dNew.img_news);
                  refDel["delete"]().then(function (e) {
                    return console.log(e);
                  });
                }

                if (data.dNew.img_news_crs != null) {
                  refDelCrs = refFB.child('news/' + data.dNew.img_news_crs);
                  refDelCrs["delete"]().then(function (e) {
                    return console.log(e);
                  });
                }

                iconToast = 'success';
                msjToast = '¡Noticia eliminada correctamente!';
                positionToast = 'top';
                timerToast = 4000;
                SAToastsVar = new _services_SweetAlertToast__WEBPACK_IMPORTED_MODULE_2__.default(iconToast, msjToast, positionToast, timerToast);
                SAToastsVar.getToast();
                _this5.skeletorTable = false;
                _context5.next = 36;
                break;

              case 30:
                iconToast = 'warning';
                msjToast = '¡error, favor de contacta al area de sistemas! ';
                positionToast = 'top';
                timerToast = 4000;
                _SAToastsVar3 = new _services_SweetAlertToast__WEBPACK_IMPORTED_MODULE_2__.default(iconToast, msjToast, positionToast, timerToast);

                _SAToastsVar3.getToast();

              case 36:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    socketEmmitNotification: function socketEmmitNotification() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this6.$store.dispatch({
                  type: 'socketIO/socket_refresh',
                  payload: payload
                });

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    }
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_7__.mapGetters)({
    getUserApi: 'auth/getUserApi',
    news: 'news/getNews'
  })), {}, {
    titleErrors: function titleErrors() {
      var errors = [];
      if (!this.$v.titleFmod.$dirty) return errors;
      !this.$v.titleFmod.required && errors.push('Necesitas un titulo para tu noticia.');
      return errors;
    },
    principalErrors: function principalErrors() {
      var errors = [];
      if (!this.$v.principalFmod.$dirty) return errors;
      !this.$v.principalFmod.required && errors.push('Necesitas indicar su importancia.');
      return errors;
    },
    descriptionErrors: function descriptionErrors() {
      var errors = [];
      if (!this.$v.descFmod.$dirty) return errors;
      !this.$v.descFmod.required && errors.push('Necesitas indicarle una descripción.');
      return errors;
    }
  }),
  created: function created() {
    this.getDataRowsNews();
    this.$store.dispatch('modals/loaderfull', false); // desactivamos el overlay cargando
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/tools/NewsTools.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/tools/NewsTools.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_ModalLoginComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ModalLoginComponent */ "./resources/js/components/ModalLoginComponent.vue");
/* harmony import */ var _components_tools_NewsToolsComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/tools/NewsToolsComponent */ "./resources/js/components/tools/NewsToolsComponent.vue");
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Cotizaciones",
  components: {
    ModalLoginComponent: _components_ModalLoginComponent__WEBPACK_IMPORTED_MODULE_0__.default,
    NewsToolsComponent: _components_tools_NewsToolsComponent__WEBPACK_IMPORTED_MODULE_1__.default
  }
});

/***/ }),

/***/ "./resources/js/components/tools/NewsToolsComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/tools/NewsToolsComponent.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NewsToolsComponent_vue_vue_type_template_id_52836a98___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewsToolsComponent.vue?vue&type=template&id=52836a98& */ "./resources/js/components/tools/NewsToolsComponent.vue?vue&type=template&id=52836a98&");
/* harmony import */ var _NewsToolsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewsToolsComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/tools/NewsToolsComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _NewsToolsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _NewsToolsComponent_vue_vue_type_template_id_52836a98___WEBPACK_IMPORTED_MODULE_0__.render,
  _NewsToolsComponent_vue_vue_type_template_id_52836a98___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/tools/NewsToolsComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/tools/NewsTools.vue":
/*!************************************************!*\
  !*** ./resources/js/views/tools/NewsTools.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NewsTools_vue_vue_type_template_id_a4588676___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewsTools.vue?vue&type=template&id=a4588676& */ "./resources/js/views/tools/NewsTools.vue?vue&type=template&id=a4588676&");
/* harmony import */ var _NewsTools_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewsTools.vue?vue&type=script&lang=js& */ "./resources/js/views/tools/NewsTools.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _NewsTools_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _NewsTools_vue_vue_type_template_id_a4588676___WEBPACK_IMPORTED_MODULE_0__.render,
  _NewsTools_vue_vue_type_template_id_a4588676___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/tools/NewsTools.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/tools/NewsToolsComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/tools/NewsToolsComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsToolsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewsToolsComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tools/NewsToolsComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsToolsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/views/tools/NewsTools.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/tools/NewsTools.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsTools_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewsTools.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/tools/NewsTools.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsTools_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/tools/NewsToolsComponent.vue?vue&type=template&id=52836a98&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/tools/NewsToolsComponent.vue?vue&type=template&id=52836a98& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsToolsComponent_vue_vue_type_template_id_52836a98___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsToolsComponent_vue_vue_type_template_id_52836a98___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsToolsComponent_vue_vue_type_template_id_52836a98___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewsToolsComponent.vue?vue&type=template&id=52836a98& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tools/NewsToolsComponent.vue?vue&type=template&id=52836a98&");


/***/ }),

/***/ "./resources/js/views/tools/NewsTools.vue?vue&type=template&id=a4588676&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/tools/NewsTools.vue?vue&type=template&id=a4588676& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsTools_vue_vue_type_template_id_a4588676___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsTools_vue_vue_type_template_id_a4588676___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsTools_vue_vue_type_template_id_a4588676___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewsTools.vue?vue&type=template&id=a4588676& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/tools/NewsTools.vue?vue&type=template&id=a4588676&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tools/NewsToolsComponent.vue?vue&type=template&id=52836a98&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tools/NewsToolsComponent.vue?vue&type=template&id=52836a98& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-card",
        {
          staticClass: "mx-auto mt-10 rounded-0 border-0 cotizacion-shades",
          attrs: { "max-width": "99%", elevation: 0 }
        },
        [
          _c("v-progress-linear", {
            attrs: {
              active: _vm.loading,
              indeterminate: _vm.loading,
              absolute: "",
              top: "",
              color: "red darken-4"
            }
          }),
          _vm._v(" "),
          _c(
            "v-card-text",
            [
              _c(
                "div",
                { staticClass: "text-h5 text--primary" },
                [
                  _c(
                    "v-icon",
                    {
                      staticClass: "pr-2 pb-1",
                      attrs: { color: "red darken-1" }
                    },
                    [_vm._v("\n           mdi-newspaper\n         ")]
                  ),
                  _vm._v("\n         Noticias\n       ")
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-tooltip",
                {
                  attrs: { bottom: "" },
                  scopedSlots: _vm._u([
                    {
                      key: "activator",
                      fn: function(ref) {
                        var on = ref.on
                        var attrs = ref.attrs
                        return [
                          _c(
                            "v-btn",
                            _vm._g(
                              _vm._b(
                                {
                                  staticStyle: { top: "15px" },
                                  attrs: {
                                    color: "red darken-4",
                                    dark: "",
                                    absolute: "",
                                    top: "",
                                    right: "",
                                    small: "",
                                    fab: "",
                                    elevation: "3"
                                  },
                                  on: {
                                    click: function($event) {
                                      ;(_vm.openNews = true),
                                        (_vm.is_edit = false),
                                        (_vm.imgSaveNws = ""),
                                        (_vm.imgSaveCrs = "")
                                    }
                                  }
                                },
                                "v-btn",
                                attrs,
                                false
                              ),
                              on
                            ),
                            [_c("v-icon", [_vm._v("mdi-newspaper-plus")])],
                            1
                          )
                        ]
                      }
                    }
                  ])
                },
                [_vm._v(" "), _c("span", [_vm._v("Nueva Noticia ")])]
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.skeletorTable
            ? _c(
                "div",
                [
                  _c("v-skeleton-loader", {
                    staticClass: "mx-auto",
                    attrs: { type: "table-thead, table-tbody" }
                  })
                ],
                1
              )
            : _c(
                "div",
                [
                  _c("v-data-table", {
                    staticClass: "elevation-0 overflow-y-auto",
                    attrs: {
                      "v-model": _vm.news,
                      headers: _vm.headers,
                      items: _vm.news,
                      page: _vm.page,
                      "items-per-page": _vm.itemsPerPage,
                      "sort-by": "id",
                      "sort-desc": true,
                      search: _vm.search,
                      "hide-default-footer": "",
                      "scroll.sync": "scrollSync"
                    },
                    on: {
                      "update:page": function($event) {
                        _vm.page = $event
                      },
                      "page-count": function($event) {
                        _vm.pageCount = $event
                      }
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "item",
                          fn: function(ref) {
                            var item = ref.item
                            return [
                              _c("tr", [
                                _c("td", [_vm._v(_vm._s(item.id))]),
                                _vm._v(" "),
                                _c(
                                  "td",
                                  [
                                    _c("v-img", {
                                      attrs: {
                                        src: item.img_news_crs,
                                        "max-width": "100px"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "td",
                                  [
                                    _c("v-img", {
                                      attrs: {
                                        src: item.img_news,
                                        "max-width": "100px"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("td", [_vm._v(_vm._s(item.title))]),
                                _vm._v(" "),
                                _c("td", [_vm._v(_vm._s(item.is_principal))]),
                                _vm._v(" "),
                                _c("td", [_vm._v(_vm._s(item.created_at))]),
                                _vm._v(" "),
                                _c(
                                  "td",
                                  [
                                    _c(
                                      "v-tooltip",
                                      {
                                        attrs: { bottom: "" },
                                        scopedSlots: _vm._u(
                                          [
                                            {
                                              key: "activator",
                                              fn: function(ref) {
                                                var on = ref.on
                                                var attrs = ref.attrs
                                                return [
                                                  _c(
                                                    "v-btn",
                                                    _vm._g(
                                                      _vm._b(
                                                        {
                                                          attrs: {
                                                            color:
                                                              "blue-grey darken-3",
                                                            to: item.edit,
                                                            fab: "",
                                                            dark: "",
                                                            elevation: "3",
                                                            "max-width": "25px",
                                                            "max-height": "25px"
                                                          },
                                                          on: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.editNews(
                                                                item.id
                                                              )
                                                            }
                                                          }
                                                        },
                                                        "v-btn",
                                                        attrs,
                                                        false
                                                      ),
                                                      on
                                                    ),
                                                    [
                                                      _c(
                                                        "v-icon",
                                                        {
                                                          attrs: {
                                                            size: "15px"
                                                          }
                                                        },
                                                        [
                                                          _vm._v(
                                                            "mdi-newspaper-variant-outline"
                                                          )
                                                        ]
                                                      )
                                                    ],
                                                    1
                                                  )
                                                ]
                                              }
                                            }
                                          ],
                                          null,
                                          true
                                        )
                                      },
                                      [
                                        _vm._v(" "),
                                        _c("span", [_vm._v("Editar Noticia ")])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-tooltip",
                                      {
                                        attrs: { bottom: "" },
                                        scopedSlots: _vm._u(
                                          [
                                            {
                                              key: "activator",
                                              fn: function(ref) {
                                                var on = ref.on
                                                var attrs = ref.attrs
                                                return [
                                                  _c(
                                                    "v-btn",
                                                    _vm._g(
                                                      _vm._b(
                                                        {
                                                          attrs: {
                                                            color:
                                                              "blue-grey darken-3",
                                                            fab: "",
                                                            dark: "",
                                                            elevation: "3",
                                                            "max-width": "25px",
                                                            "max-height": "25px"
                                                          },
                                                          on: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.deleteNews(
                                                                item.id,
                                                                item.title
                                                              )
                                                            }
                                                          }
                                                        },
                                                        "v-btn",
                                                        attrs,
                                                        false
                                                      ),
                                                      on
                                                    ),
                                                    [
                                                      _c(
                                                        "v-icon",
                                                        {
                                                          attrs: {
                                                            color: "red",
                                                            size: "15px"
                                                          }
                                                        },
                                                        [
                                                          _vm._v(
                                                            "mdi-trash-can-outline"
                                                          )
                                                        ]
                                                      )
                                                    ],
                                                    1
                                                  )
                                                ]
                                              }
                                            }
                                          ],
                                          null,
                                          true
                                        )
                                      },
                                      [
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v("Eliminar Noticia ")
                                        ])
                                      ]
                                    )
                                  ],
                                  1
                                )
                              ])
                            ]
                          }
                        }
                      ],
                      null,
                      true
                    )
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "text-center pt-2" },
                    [
                      _c("v-pagination", {
                        attrs: {
                          length: _vm.pageCount,
                          "total-visible": "7",
                          circle: "",
                          color: "blue-grey darken-3"
                        },
                        model: {
                          value: _vm.page,
                          callback: function($$v) {
                            _vm.page = $$v
                          },
                          expression: "page"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-row",
        { attrs: { justify: "center" } },
        [
          _c(
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "600px" },
              model: {
                value: _vm.openNews,
                callback: function($$v) {
                  _vm.openNews = $$v
                },
                expression: "openNews"
              }
            },
            [
              _c(
                "v-card",
                [
                  _vm.is_edit
                    ? _c(
                        "v-card-title",
                        [
                          _c(
                            "v-icon",
                            { attrs: { color: "red darken-1", left: "" } },
                            [_vm._v("mdi-newspaper-plus")]
                          ),
                          _vm._v(" "),
                          _c("span", { staticClass: "text-h5" }, [
                            _vm._v("Guardar Edición Noticia")
                          ])
                        ],
                        1
                      )
                    : _c(
                        "v-card-title",
                        [
                          _c(
                            "v-icon",
                            { attrs: { color: "red darken-1", left: "" } },
                            [_vm._v("mdi-newspaper-plus")]
                          ),
                          _vm._v(" "),
                          _c("span", { staticClass: "text-h5" }, [
                            _vm._v("Guardar Nueva Noticia")
                          ])
                        ],
                        1
                      ),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "12", sm: "6", md: "6" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Titulo *",
                                      "error-messages": _vm.titleErrors
                                    },
                                    on: {
                                      input: function($event) {
                                        return _vm.$v.titleFmod.$touch()
                                      }
                                    },
                                    model: {
                                      value: _vm.titleFmod,
                                      callback: function($$v) {
                                        _vm.titleFmod = $$v
                                      },
                                      expression: "titleFmod"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "12", sm: "6", md: "6" } },
                                [
                                  _c("v-select", {
                                    attrs: {
                                      items: _vm.itemsPrincipal,
                                      "item-text": "name",
                                      "item-value": "id",
                                      label: "Es principal *",
                                      "error-messages": _vm.principalErrors
                                    },
                                    on: {
                                      input: function($event) {
                                        return _vm.$v.principalFmod.$touch()
                                      }
                                    },
                                    model: {
                                      value: _vm.principalFmod,
                                      callback: function($$v) {
                                        _vm.principalFmod = $$v
                                      },
                                      expression: "principalFmod"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "12", sm: "6", md: "6" } },
                                [
                                  _c("v-file-input", {
                                    attrs: {
                                      chips: "",
                                      multiple: "",
                                      label: "Imagen Carrusel",
                                      hint: _vm.imgSaveNws
                                    },
                                    model: {
                                      value: _vm.imgNewsFmod,
                                      callback: function($$v) {
                                        _vm.imgNewsFmod = $$v
                                      },
                                      expression: "imgNewsFmod"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "12", sm: "6", md: "6" } },
                                [
                                  _c("v-file-input", {
                                    attrs: {
                                      chips: "",
                                      multiple: "",
                                      label: "Imagen Noticia",
                                      hint: _vm.imgSaveCrs
                                    },
                                    model: {
                                      value: _vm.imgCrsFmod,
                                      callback: function($$v) {
                                        _vm.imgCrsFmod = $$v
                                      },
                                      expression: "imgCrsFmod"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "12" } },
                                [
                                  _c("v-textarea", {
                                    attrs: {
                                      name: "input-7-1",
                                      label: "Descripción de la noticia",
                                      "error-messages": _vm.descriptionErrors
                                    },
                                    on: {
                                      input: function($event) {
                                        return _vm.$v.descFmod.$touch()
                                      }
                                    },
                                    model: {
                                      value: _vm.descFmod,
                                      callback: function($$v) {
                                        _vm.descFmod = $$v
                                      },
                                      expression: "descFmod"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "blue darken-1", text: "" },
                          on: {
                            click: function($event) {
                              ;(_vm.openNews = false), _vm.cancelNews()
                            }
                          }
                        },
                        [
                          _c("v-icon", { attrs: { left: "" } }, [
                            _vm._v("mdi-close-box-outline")
                          ]),
                          _vm._v("\n             Cerrar\n           ")
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm.is_edit
                        ? _c(
                            "div",
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { color: "blue darken-1", text: "" },
                                  on: {
                                    click: function($event) {
                                      ;[
                                        (_vm.loading = true),
                                        _vm.saveEditNews()
                                      ]
                                    }
                                  }
                                },
                                [
                                  _c("v-icon", { attrs: { left: "" } }, [
                                    _vm._v("mdi-content-save-outline")
                                  ]),
                                  _vm._v(
                                    "\n               Guardar Edición\n             "
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _c(
                            "div",
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { color: "blue darken-1", text: "" },
                                  on: {
                                    click: function($event) {
                                      ;[(_vm.loading = true), _vm.saveNews()]
                                    }
                                  }
                                },
                                [
                                  _c("v-icon", { attrs: { left: "" } }, [
                                    _vm._v("mdi-content-save-outline")
                                  ]),
                                  _vm._v(
                                    "\n               Guardar\n             "
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/tools/NewsTools.vue?vue&type=template&id=a4588676&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/tools/NewsTools.vue?vue&type=template&id=a4588676& ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [_c("ModalLoginComponent"), _vm._v(" "), _c("NewsToolsComponent")],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);