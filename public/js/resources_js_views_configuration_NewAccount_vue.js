"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_configuration_NewAccount_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuelidate */ "./node_modules/vuelidate/lib/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var _services_SweetAlertQuestion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/SweetAlertQuestion */ "./resources/js/services/SweetAlertQuestion.js");
/* harmony import */ var _services_SweetAlertToast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/SweetAlertToast */ "./resources/js/services/SweetAlertToast.js");
/* harmony import */ var _services_importCotizacion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/importCotizacion */ "./resources/js/services/importCotizacion.js");
/* harmony import */ var vue_product_zoomer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-product-zoomer */ "./node_modules/vue-product-zoomer/dist/assets/js/app.bundle.js");
/* harmony import */ var vue_product_zoomer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_product_zoomer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/store */ "./resources/js/store/store.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    var _ref;
    return _ref = {
      userIdNew: 0,
      userCreated: false,
      userPremisions: false,
      userGeneralData: false,
      show1: false,
      show2: false,
      valid: true,
      steepAcount: 1,
      userName: '',
      iNewPass: '',
      iNewPassRe: '',
      colorStep1: 'blue-grey darken-1',
      colorStep2: 'blue-grey darken-1',
      colorStep3: 'blue-grey darken-1',
      userNameRules: [function (v) {
        return !!v || 'el nombre de usuario es requerido';
      }],
      passRules: [function (v) {
        return !!v || 'Contraseña requerida';
      }, function (v) {
        return v && v.length >= 8 || 'Es necesario mínimo 8 caracteres';
      }],
      passReRules: {
        required: function required(value) {
          return !!value || 'Contraseña requerida';
        },
        min: function min(v) {
          return v.length >= 8 || 'Es necesario mínimo 8 caracteres';
        }
      },
      sa1: 1,
      sa2: 0,
      sa3: 0,
      completeSteep1: false,
      completeSteep2: false,
      completeSteep3: false,
      ModulesItems: [],
      SubModulesItems: [],
      ModulesData: [],
      SubModulesData: [],
      staticSubModulesData: [],
      // stepp 3

      agentClient: '',
      agents: [],
      isPartnerClient: 0,
      isPartner: [{
        id: 0,
        identify: 'No'
      }, {
        id: 1,
        identify: 'Si'
      }],
      isFacturaClient: 0,
      isFactura: [{
        id: 0,
        identifyFact: 'No'
      }, {
        id: 1,
        identifyFact: 'Si'
      }],
      shortName: '',
      fullName: ''
    }, _defineProperty(_ref, "agentClient", ''), _defineProperty(_ref, "clientEMail", ''), _defineProperty(_ref, "isPartnerSelect", ''), _defineProperty(_ref, "clientId", ''), _defineProperty(_ref, "clientPhone", ''), _defineProperty(_ref, "isfacturaSelect", ''), _defineProperty(_ref, "companyName", ''), _defineProperty(_ref, "clientDiscount", ''), _defineProperty(_ref, "RshortName", true), _defineProperty(_ref, "RagentClient", true), _defineProperty(_ref, "RclientEMail", true), _defineProperty(_ref, "RclientId", true), _defineProperty(_ref, "RclientDiscount", true), _defineProperty(_ref, "RisPartner", true), _defineProperty(_ref, "RisFactura", true), _ref;
  },
  mixins: [vuelidate__WEBPACK_IMPORTED_MODULE_5__.validationMixin],
  validations: {
    shortName: {
      required: (0,vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__.requiredIf)(function () {
        return this.RshortName;
      })
    },
    agentClient: {
      required: (0,vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__.requiredIf)(function () {
        return this.RagentClient;
      })
    },
    clientEMail: {
      required: (0,vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__.requiredIf)(function () {
        return this.RclientEMail;
      })
    },
    clientId: {
      required: (0,vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__.requiredIf)(function () {
        return this.RclientId;
      })
    },
    clientDiscount: {
      required: (0,vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__.requiredIf)(function () {
        return this.RclientDiscount;
      })
    },
    isPartnerSelect: {
      required: (0,vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__.requiredIf)(function () {
        return this.RisPartner;
      })
    },
    isfacturaSelect: {
      required: (0,vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_6__.requiredIf)(function () {
        return this.RisFactura;
      })
    }
  },
  methods: {
    saveCredentials: function saveCredentials() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var payload, _yield$axios$post, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.$refs.form.validate()) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                if (_this.$refs.formPass.validate()) {
                  _context.next = 4;
                  break;
                }
                return _context.abrupt("return");
              case 4:
                if (_this.$refs.formPassRe.validate()) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return");
              case 6:
                if (!(_this.iNewPass != _this.iNewPassRe)) {
                  _context.next = 8;
                  break;
                }
                return _context.abrupt("return");
              case 8:
                _this.$refs.form.resetValidation();
                _this.$refs.formPass.resetValidation();
                _this.$refs.formPassRe.resetValidation();
                payload = {
                  token: _this.getUserApi.token,
                  user_name: _this.userName,
                  password_user: _this.iNewPass
                };
                _context.next = 14;
                return axios.post('/accounts/saveNewCredentials', payload, {
                  headers: {
                    Authorization: "Bearer " + payload.token
                  }
                });
              case 14:
                _yield$axios$post = _context.sent;
                data = _yield$axios$post.data;
                if (data.success) {
                  _this.completeSteep1 = true;
                  _this.sa2 = 2;
                  _this.steepAcount = 2;
                  _this.userCreated = true;
                  _this.colorStep1 = 'light-green accent-2';
                  _this.userIdNew = data.user_id;
                } else {}
              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    savePermissions: function savePermissions() {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var payload, _yield$axios$post2, data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                payload = {
                  token: _this2.getUserApi.token,
                  user_id: _this2.userIdNew,
                  modules: _this2.ModulesData,
                  submodules: _this2.SubModulesData
                };
                _context2.next = 3;
                return axios.post('/accounts/savePermissions', payload, {
                  headers: {
                    Authorization: "Bearer " + payload.token
                  }
                });
              case 3:
                _yield$axios$post2 = _context2.sent;
                data = _yield$axios$post2.data;
                if (data.success) {
                  _this2.userPremisions = true;
                  _this2.completeSteep2 = true;
                  _this2.colorStep2 = 'light-green accent-2';
                  _this2.steepAcount = 3;
                  _this2.sa3 = 3;
                } else {}
              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    saveDataGeneral: function saveDataGeneral() {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var payload, _yield$axios$post3, data, iconToast, msjToast, positionToast, timerToast, SAToastsVar;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.$v.$touch();
                if (_this3.$v.$invalid) {
                  _context3.next = 8;
                  break;
                }
                payload = {
                  token: _this3.getUserApi.token,
                  user_id: _this3.userIdNew,
                  short_name: _this3.shortName,
                  full_name: _this3.fullName,
                  agent_client: _this3.agentClient,
                  clien_email: _this3.clientEMail,
                  is_Partner: _this3.isPartnerSelect,
                  client_id: _this3.clientId,
                  client_phone: _this3.clientPhone,
                  is_factura: _this3.isfacturaSelect,
                  company_name: _this3.companyName,
                  client_discount: _this3.clientDiscount
                };
                _context3.next = 5;
                return axios.post('/accounts/saveNewDataGeneral', payload, {
                  headers: {
                    Authorization: "Bearer " + payload.token
                  }
                });
              case 5:
                _yield$axios$post3 = _context3.sent;
                data = _yield$axios$post3.data;
                if (data.success) {
                  _this3.userGeneralData = true;
                  _this3.completeSteep3 = true;
                  _this3.colorStep3 = 'light-green accent-2';
                  _this3.activteUser();
                  _this3.$v.$reset();
                } else {
                  iconToast = 'warning';
                  msjToast = 'No se pudo gardar el registro, favor de contactar a el área de sistemas.';
                  positionToast = 'bottom-end';
                  timerToast = 4000;
                  SAToastsVar = new _services_SweetAlertToast__WEBPACK_IMPORTED_MODULE_1__["default"](iconToast, msjToast, positionToast, timerToast);
                  SAToastsVar.getToast();
                }
              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    activteUser: function activteUser() {
      var _this4 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var payload, _yield$axios$post4, data, iconToast, msjToast, positionToast, timerToast, SAToastsVar;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                payload = {
                  token: _this4.getUserApi.token,
                  user_id: _this4.userIdNew,
                  is_active: 1
                };
                _context4.next = 3;
                return axios.post('/accounts/activeordeactiveClient', payload, {
                  headers: {
                    Authorization: "Bearer " + payload.token
                  }
                });
              case 3:
                _yield$axios$post4 = _context4.sent;
                data = _yield$axios$post4.data;
                if (data.success) {
                  iconToast = 'success';
                  msjToast = 'Usuario creado y activado con éxito.';
                  positionToast = 'bottom-end';
                  timerToast = 4000;
                  SAToastsVar = new _services_SweetAlertToast__WEBPACK_IMPORTED_MODULE_1__["default"](iconToast, msjToast, positionToast, timerToast);
                  SAToastsVar.getToast();
                }
              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    showDataNewAccount: function showDataNewAccount() {
      var _this5 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var payload, _yield$axios$post5, data;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this5.$store.dispatch('modals/loaderfull', true); // activamos el overlay cargando
                payload = {
                  token: _this5.getUserApi.token,
                  user_id: _this5.ClientFound
                };
                _context5.next = 4;
                return axios.post('/accounts/searchDataNewAccount', payload, {
                  headers: {
                    Authorization: "Bearer " + payload.token
                  }
                });
              case 4:
                _yield$axios$post5 = _context5.sent;
                data = _yield$axios$post5.data;
                if (data.success) {
                  _this5.agents = data.agents;
                  _this5.UserData = data.user;
                  _this5.ModulesItems = data.modules;
                  _this5.staticSubModulesData = data.submodules;
                  _this5.$store.dispatch('modals/loaderfull', false); // desactivamos el overlay cargando
                }
              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    dataSubmoduleChange: function dataSubmoduleChange() {
      var _this6 = this;
      this.SubModulesItems = [];
      this.staticSubModulesData.forEach(function (item) {
        var found = _this6.ModulesData.find(function (sub) {
          return sub === item.module_id;
        });
        if (typeof found != "undefined") {
          _this6.SubModulesItems.push(item);
        }
      });
    }
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_7__.mapGetters)({
    getUserApi: 'auth/getUserApi'
  })), {}, {
    passwordConfirmationRule: function passwordConfirmationRule() {
      var _this7 = this;
      return function () {
        return _this7.iNewPass === _this7.iNewPassRe || 'Las contraseñas no coinciden.';
      };
    },
    shortNameErrors: function shortNameErrors() {
      var errors = [];
      if (!this.$v.shortName.$dirty) return errors;
      !this.$v.shortName.required && errors.push('Es necesario su nombre corto.');
      return errors;
    },
    agentClientErrors: function agentClientErrors() {
      var errors = [];
      if (!this.$v.agentClient.$dirty) return errors;
      !this.$v.agentClient.required && errors.push('Es necesario un id de cliente.');
      return errors;
    },
    clientEMailErrors: function clientEMailErrors() {
      var errors = [];
      if (!this.$v.clientEMail.$dirty) return errors;
      !this.$v.clientEMail.required && errors.push('Es necesario una cuenta de correo.');
      return errors;
    },
    clientIdErrors: function clientIdErrors() {
      var errors = [];
      if (!this.$v.clientId.$dirty) return errors;
      !this.$v.clientId.required && errors.push('Es necesario asignarle un id de cliente.');
      return errors;
    },
    clientDiscountErrors: function clientDiscountErrors() {
      var errors = [];
      if (!this.$v.clientDiscount.$dirty) return errors;
      !this.$v.clientDiscount.required && errors.push('Es necesario asignarle un descuento.');
      return errors;
    },
    isPartnerSelectErrors: function isPartnerSelectErrors() {
      var errors = [];
      if (!this.$v.isPartnerSelect.$dirty) return errors;
      !this.$v.isPartnerSelect.required && errors.push('Es necesario definir esta parte.');
      return errors;
    },
    isfacturaSelectErrors: function isfacturaSelectErrors() {
      var errors = [];
      if (!this.$v.isfacturaSelect.$dirty) return errors;
      !this.$v.isfacturaSelect.required && errors.push('Es necesario definir esta parte.');
      return errors;
    }
  }),
  created: function created() {
    this.showDataNewAccount();
    this.$store.dispatch('modals/loaderfull', false); // desactivamos el overlay cargando
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/configuration/NewAccount.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/configuration/NewAccount.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_configuration_NewAccountComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/configuration/NewAccountComponent.vue */ "./resources/js/components/configuration/NewAccountComponent.vue");
/* harmony import */ var _components_cotizaciones_EditCotFormComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/cotizaciones/EditCotFormComponent */ "./resources/js/components/cotizaciones/EditCotFormComponent.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Accounts",
  components: {
    NewAccountComponent: _components_configuration_NewAccountComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    EditCotFormComponent: _components_cotizaciones_EditCotFormComponent__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=template&id=d79af7c8&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=template&id=d79af7c8&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("v-card", {
    staticClass: "mx-auto rounded-0 border-0 card-general",
    attrs: {
      "max-width": "99%",
      elevation: 0
    }
  }, [_c("v-container", {
    staticStyle: {
      "max-width": "100%"
    },
    attrs: {
      fluid: ""
    }
  }, [_c("v-row", [_c("v-col", {
    staticClass: "new-header",
    attrs: {
      xs: "12",
      sm: "12",
      md: "4",
      lg: "4",
      xl: "4"
    }
  }, [_c("v-icon", {
    attrs: {
      left: "",
      size: "28px"
    }
  }, [_vm._v(" mdi-account-plus-outline ")]), _vm._v(" "), _c("div", {
    staticClass: "h4 mb-0 color-header"
  }, [_vm._v(" Cuenta nueva ")])], 1), _vm._v(" "), _c("v-col", {
    staticClass: "new-header",
    attrs: {
      xs: "12",
      sm: "12",
      md: "6",
      lg: "6",
      xl: "6"
    }
  }), _vm._v(" "), _c("v-col", {
    staticClass: "new-header",
    attrs: {
      xs: "12",
      sm: "12",
      md: "2",
      lg: "2",
      xl: "2"
    }
  }, [_c("v-btn", {
    attrs: {
      depressed: "",
      block: ""
    },
    on: {
      click: function click($event) {
        return _vm.$router.push("/configuracion/cuentas");
      }
    }
  }, [_c("v-icon", {
    attrs: {
      left: ""
    }
  }, [_vm._v(" mdi-clipboard-arrow-left-outline ")]), _vm._v("\n                         Regresar\n                     ")], 1)], 1)], 1), _vm._v(" "), _c("v-row", [_c("v-col", {
    attrs: {
      cols: "12"
    }
  }, [_c("v-stepper", {
    attrs: {
      vertical: "",
      elevation: 0
    },
    model: {
      value: _vm.steepAcount,
      callback: function callback($$v) {
        _vm.steepAcount = $$v;
      },
      expression: "steepAcount"
    }
  }, [_c("v-stepper-step", {
    staticStyle: {
      cursor: "pointer"
    },
    attrs: {
      complete: _vm.completeSteep1,
      step: "1",
      color: _vm.colorStep1
    },
    on: {
      click: function click($event) {
        _vm.steepAcount = _vm.sa1;
      }
    }
  }, [_vm._v("\n                             Credenciales de acceso\n                             "), _c("small", [_vm._v("Estas credenciales permiten tener acceso al sistema.")])]), _vm._v(" "), _c("v-stepper-content", {
    attrs: {
      step: "1"
    }
  }, [_c("v-container", [_c("v-row", [_c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "4",
      lg: "4",
      xl: "4"
    }
  }, [_c("v-form", {
    ref: "form",
    attrs: {
      "lazy-validation": ""
    },
    model: {
      value: _vm.valid,
      callback: function callback($$v) {
        _vm.valid = $$v;
      },
      expression: "valid"
    }
  }, [_c("v-text-field", {
    attrs: {
      outlined: "",
      dense: "",
      label: "Nombre de usuario",
      rules: _vm.userNameRules,
      required: "",
      disabled: _vm.userCreated
    },
    model: {
      value: _vm.userName,
      callback: function callback($$v) {
        _vm.userName = $$v;
      },
      expression: "userName"
    }
  })], 1)], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "4",
      lg: "4",
      xl: "4"
    }
  }, [_c("v-form", {
    ref: "formPass",
    attrs: {
      "lazy-validation": ""
    },
    model: {
      value: _vm.valid,
      callback: function callback($$v) {
        _vm.valid = $$v;
      },
      expression: "valid"
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Nueva Contraseña*",
      "append-icon": _vm.show1 ? "mdi-eye" : "mdi-eye-off",
      type: _vm.show1 ? "text" : "password",
      counter: "",
      dense: "",
      autocomplete: "nope",
      rules: _vm.passRules,
      outlined: "",
      disabled: _vm.userCreated
    },
    on: {
      "click:append": function clickAppend($event) {
        _vm.show1 = !_vm.show1;
      }
    },
    model: {
      value: _vm.iNewPass,
      callback: function callback($$v) {
        _vm.iNewPass = $$v;
      },
      expression: "iNewPass"
    }
  })], 1)], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "4",
      lg: "4",
      xl: "4"
    }
  }, [_c("v-form", {
    ref: "formPassRe",
    attrs: {
      "lazy-validation": ""
    },
    model: {
      value: _vm.valid,
      callback: function callback($$v) {
        _vm.valid = $$v;
      },
      expression: "valid"
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Repite la nueva contraseña*",
      "append-icon": _vm.show2 ? "mdi-eye" : "mdi-eye-off",
      type: _vm.show2 ? "text" : "password",
      counter: "",
      dense: "",
      autocomplete: "nope",
      rules: [_vm.passReRules.required, _vm.passReRules.min, _vm.passwordConfirmationRule],
      outlined: "",
      disabled: _vm.userCreated
    },
    on: {
      "click:append": function clickAppend($event) {
        _vm.show2 = !_vm.show2;
      }
    },
    model: {
      value: _vm.iNewPassRe,
      callback: function callback($$v) {
        _vm.iNewPassRe = $$v;
      },
      expression: "iNewPassRe"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c("v-row", [_c("v-col", {
    attrs: {
      cols: "12"
    }
  }, [_c("v-btn", {
    attrs: {
      disabled: _vm.userCreated
    },
    on: {
      click: function click($event) {
        return _vm.saveCredentials();
      }
    }
  }, [_c("v-icon", {
    attrs: {
      left: ""
    }
  }, [_vm._v("mdi-content-save-outline")]), _vm._v("\n                                             Crear Usuario\n                                         ")], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("v-stepper-step", {
    staticStyle: {
      cursor: "pointer"
    },
    attrs: {
      complete: _vm.completeSteep2,
      step: "2",
      color: _vm.colorStep2
    },
    on: {
      click: function click($event) {
        _vm.steepAcount = _vm.sa2;
      }
    }
  }, [_vm._v("\n                             Permisos\n                             "), _c("small", [_vm._v("Aqui se encuentran los modulos y submodulos que se asiganar para otorgar el permiso.")])]), _vm._v(" "), _c("v-stepper-content", {
    attrs: {
      step: "2"
    }
  }, [_c("v-container", [_c("v-row", [_c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "6",
      lg: "6",
      xl: "6"
    }
  }, [_c("v-autocomplete", {
    attrs: {
      items: _vm.ModulesItems,
      chips: "",
      color: "blue-grey lighten-2",
      label: "Modulos",
      "item-text": "module",
      "item-value": "id",
      multiple: "",
      outlined: "",
      disabled: _vm.userPremisions
    },
    on: {
      change: function change($event) {
        return _vm.dataSubmoduleChange();
      }
    },
    scopedSlots: _vm._u([{
      key: "selection",
      fn: function fn(data) {
        return [_c("v-chip", _vm._b({
          attrs: {
            "input-value": data.selected
          },
          on: {
            click: data.select
          }
        }, "v-chip", data.attrs, false), [_c("v-avatar", {
          attrs: {
            left: ""
          }
        }, [_c("v-icon", [_vm._v(" " + _vm._s(data.item.icon))])], 1), _vm._v("\n                                                     " + _vm._s(data.item.module) + "\n                                                 ")], 1)];
      }
    }, {
      key: "item",
      fn: function fn(data) {
        return [_typeof(data.item) !== "object" ? [_c("v-list-item-content", {
          domProps: {
            textContent: _vm._s(data.item)
          }
        })] : [_c("v-icon", {
          staticClass: "pr-2"
        }, [_vm._v("\n                                                         " + _vm._s(data.item.icon) + "\n                                                     ")]), _vm._v(" "), _c("v-list-item-content", [_c("v-list-item-title", {
          domProps: {
            innerHTML: _vm._s(data.item.module)
          }
        })], 1)]];
      }
    }]),
    model: {
      value: _vm.ModulesData,
      callback: function callback($$v) {
        _vm.ModulesData = $$v;
      },
      expression: "ModulesData"
    }
  })], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "6",
      lg: "6",
      xl: "6"
    }
  }, [_c("v-autocomplete", {
    attrs: {
      items: _vm.SubModulesItems,
      outlined: "",
      chips: "",
      color: "blue-grey lighten-2",
      label: "Sub Modulos",
      "item-text": "sub_module",
      "item-value": "id",
      multiple: "",
      disabled: _vm.userPremisions
    },
    scopedSlots: _vm._u([{
      key: "selection",
      fn: function fn(data) {
        return [_c("v-chip", _vm._b({
          attrs: {
            "input-value": data.selected
          },
          on: {
            click: data.select
          }
        }, "v-chip", data.attrs, false), [_c("v-avatar", {
          attrs: {
            left: ""
          }
        }, [_c("v-icon", [_vm._v(" " + _vm._s(data.item.icon))])], 1), _vm._v("\n                                                     " + _vm._s(data.item.sub_module) + "\n                                                 ")], 1)];
      }
    }, {
      key: "item",
      fn: function fn(data) {
        return [_typeof(data.item) !== "object" ? [_c("v-list-item-content", {
          domProps: {
            textContent: _vm._s(data.item)
          }
        })] : [_c("v-icon", {
          staticClass: "pr-2"
        }, [_vm._v("\n                                                         " + _vm._s(data.item.icon) + "\n                                                     ")]), _vm._v(" "), _c("v-list-item-content", [_c("v-list-item-title", {
          domProps: {
            innerHTML: _vm._s(data.item.sub_module)
          }
        })], 1)]];
      }
    }]),
    model: {
      value: _vm.SubModulesData,
      callback: function callback($$v) {
        _vm.SubModulesData = $$v;
      },
      expression: "SubModulesData"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c("v-btn", {
    attrs: {
      disabled: _vm.userPremisions
    },
    on: {
      click: function click($event) {
        return _vm.savePermissions();
      }
    }
  }, [_c("v-icon", {
    attrs: {
      left: ""
    }
  }, [_vm._v("mdi-content-save-outline")]), _vm._v("\n                                 Guardar Permisos\n                             ")], 1)], 1), _vm._v(" "), _c("v-stepper-step", {
    staticStyle: {
      cursor: "pointer"
    },
    attrs: {
      complete: _vm.completeSteep3,
      step: "3",
      color: _vm.colorStep3
    },
    on: {
      click: function click($event) {
        _vm.steepAcount = _vm.sa3;
      }
    }
  }, [_vm._v("\n                             Datos generales\n                             "), _c("small", [_vm._v("Datos generales del cliente para uso del sistema")])]), _vm._v(" "), _c("v-stepper-content", {
    attrs: {
      step: "3"
    }
  }, [_c("v-container", [_c("v-row", [_c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "4",
      lg: "4",
      xl: "4"
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Numero de cliente",
      hint: "ID sistema de facturación",
      "persistent-hint": "",
      outlined: "",
      dense: "",
      "error-messages": _vm.clientIdErrors,
      disabled: _vm.userGeneralData
    },
    on: {
      input: function input($event) {
        return _vm.$v.clientId.$touch();
      }
    },
    model: {
      value: _vm.clientId,
      callback: function callback($$v) {
        _vm.clientId = $$v;
      },
      expression: "clientId"
    }
  })], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "8",
      lg: "8",
      xl: "8"
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Compañía",
      hint: "Compañía o empresa del cliente",
      "persistent-hint": "",
      outlined: "",
      dense: "",
      disabled: _vm.userGeneralData
    },
    model: {
      value: _vm.companyName,
      callback: function callback($$v) {
        _vm.companyName = $$v;
      },
      expression: "companyName"
    }
  })], 1)], 1), _vm._v(" "), _c("v-row", [_c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "4",
      lg: "4",
      xl: "4"
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Nombre Corto",
      hint: "Nombre Primer Apellidos",
      "persistent-hint": "",
      outlined: "",
      dense: "",
      "error-messages": _vm.shortNameErrors,
      disabled: _vm.userGeneralData
    },
    on: {
      input: function input($event) {
        return _vm.$v.shortName.$touch();
      }
    },
    model: {
      value: _vm.shortName,
      callback: function callback($$v) {
        _vm.shortName = $$v;
      },
      expression: "shortName"
    }
  })], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "8",
      lg: "8",
      xl: "8"
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Nombre Completo",
      hint: "Nombre y Apellidos",
      "persistent-hint": "",
      outlined: "",
      dense: "",
      disabled: _vm.userGeneralData
    },
    model: {
      value: _vm.fullName,
      callback: function callback($$v) {
        _vm.fullName = $$v;
      },
      expression: "fullName"
    }
  })], 1)], 1), _vm._v(" "), _c("v-row", [_c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "4",
      lg: "4",
      xl: "4"
    }
  }, [_c("v-autocomplete", {
    attrs: {
      items: _vm.agents,
      "item-text": "name_agent",
      "item-value": "id",
      outlined: "",
      label: "Agentes",
      hint: "Nombre del agente asignado",
      dense: "",
      "error-messages": _vm.agentClientErrors,
      disabled: _vm.userGeneralData
    },
    on: {
      input: function input($event) {
        return _vm.$v.agentClient.$touch();
      }
    },
    model: {
      value: _vm.agentClient,
      callback: function callback($$v) {
        _vm.agentClient = $$v;
      },
      expression: "agentClient"
    }
  })], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "5",
      lg: "5",
      xl: "5"
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Correo Electrónico",
      hint: "Correo electrónico para envíos de sistema",
      "persistent-hint": "",
      outlined: "",
      dense: "",
      "error-messages": _vm.clientEMailErrors,
      disabled: _vm.userGeneralData
    },
    on: {
      input: function input($event) {
        return _vm.$v.clientEMail.$touch();
      }
    },
    model: {
      value: _vm.clientEMail,
      callback: function callback($$v) {
        _vm.clientEMail = $$v;
      },
      expression: "clientEMail"
    }
  })], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "3",
      lg: "3",
      xl: "3"
    }
  }, [_c("v-select", {
    attrs: {
      items: _vm.isPartner,
      "item-text": "identify",
      "item-value": "id",
      label: "Es Partner",
      hint: "¿Forma parte de Shades?",
      outlined: "",
      dense: "",
      "error-messages": _vm.isPartnerSelectErrors,
      disabled: _vm.userGeneralData
    },
    on: {
      input: function input($event) {
        return _vm.$v.isPartnerSelect.$touch();
      }
    },
    model: {
      value: _vm.isPartnerSelect,
      callback: function callback($$v) {
        _vm.isPartnerSelect = $$v;
      },
      expression: "isPartnerSelect"
    }
  })], 1)], 1), _vm._v(" "), _c("v-row", [_c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "4",
      lg: "4",
      xl: "4"
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Descuento",
      hint: "Descuento otorgado para el cliente",
      "persistent-hint": "",
      outlined: "",
      dense: "",
      "error-messages": _vm.clientDiscountErrors,
      disabled: _vm.userGeneralData
    },
    on: {
      input: function input($event) {
        return _vm.$v.clientDiscount.$touch();
      }
    },
    model: {
      value: _vm.clientDiscount,
      callback: function callback($$v) {
        _vm.clientDiscount = $$v;
      },
      expression: "clientDiscount"
    }
  })], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "5",
      lg: "5",
      xl: "5"
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Telefono",
      hint: "Teléfono para contacto",
      "persistent-hint": "",
      outlined: "",
      dense: "",
      disabled: _vm.userGeneralData
    },
    model: {
      value: _vm.clientPhone,
      callback: function callback($$v) {
        _vm.clientPhone = $$v;
      },
      expression: "clientPhone"
    }
  })], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      xs: "12",
      sm: "12",
      md: "3",
      lg: "3",
      xl: "3"
    }
  }, [_c("v-select", {
    attrs: {
      items: _vm.isFactura,
      "item-text": "identifyFact",
      "item-value": "id",
      label: "Facturar",
      hint: "Saber si el cliente puede elegir entre facturar o no",
      outlined: "",
      dense: "",
      "error-messages": _vm.isfacturaSelectErrors,
      disabled: _vm.userGeneralData
    },
    on: {
      input: function input($event) {
        return _vm.$v.isfacturaSelect.$touch();
      }
    },
    model: {
      value: _vm.isfacturaSelect,
      callback: function callback($$v) {
        _vm.isfacturaSelect = $$v;
      },
      expression: "isfacturaSelect"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c("v-btn", {
    attrs: {
      disabled: _vm.userGeneralData
    },
    on: {
      click: function click($event) {
        return _vm.saveDataGeneral();
      }
    }
  }, [_c("v-icon", {
    attrs: {
      left: ""
    }
  }, [_vm._v("mdi-content-save-outline")]), _vm._v("\n                                 Guardar datos y activar usuario\n                             ")], 1)], 1)], 1)], 1)], 1)], 1)], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/configuration/NewAccount.vue?vue&type=template&id=0c57f645&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/configuration/NewAccount.vue?vue&type=template&id=0c57f645& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("NewAccountComponent"), _vm._v(" "), _c("EditCotFormComponent")], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.search-header[data-v-d79af7c8]   {\n    font-size: 18px;\n    font-weight: 500;\n}\n.card-general[data-v-d79af7c8] {\n    margin-top: 15px;\n}\n.new-header[data-v-d79af7c8] {\n    display: flex;\n}\n.color-header[data-v-d79af7c8] {\n    padding-top: 5px;\n    color: grey;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccountComponent_vue_vue_type_style_index_0_id_d79af7c8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccountComponent_vue_vue_type_style_index_0_id_d79af7c8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccountComponent_vue_vue_type_style_index_0_id_d79af7c8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/configuration/NewAccountComponent.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/components/configuration/NewAccountComponent.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NewAccountComponent_vue_vue_type_template_id_d79af7c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewAccountComponent.vue?vue&type=template&id=d79af7c8&scoped=true& */ "./resources/js/components/configuration/NewAccountComponent.vue?vue&type=template&id=d79af7c8&scoped=true&");
/* harmony import */ var _NewAccountComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewAccountComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/configuration/NewAccountComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _NewAccountComponent_vue_vue_type_style_index_0_id_d79af7c8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css& */ "./resources/js/components/configuration/NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NewAccountComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewAccountComponent_vue_vue_type_template_id_d79af7c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _NewAccountComponent_vue_vue_type_template_id_d79af7c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "d79af7c8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/configuration/NewAccountComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/configuration/NewAccount.vue":
/*!*********************************************************!*\
  !*** ./resources/js/views/configuration/NewAccount.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NewAccount_vue_vue_type_template_id_0c57f645___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewAccount.vue?vue&type=template&id=0c57f645& */ "./resources/js/views/configuration/NewAccount.vue?vue&type=template&id=0c57f645&");
/* harmony import */ var _NewAccount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewAccount.vue?vue&type=script&lang=js& */ "./resources/js/views/configuration/NewAccount.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewAccount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewAccount_vue_vue_type_template_id_0c57f645___WEBPACK_IMPORTED_MODULE_0__.render,
  _NewAccount_vue_vue_type_template_id_0c57f645___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/configuration/NewAccount.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/configuration/NewAccountComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/configuration/NewAccountComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccountComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewAccountComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccountComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/configuration/NewAccount.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/configuration/NewAccount.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewAccount.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/configuration/NewAccount.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/configuration/NewAccountComponent.vue?vue&type=template&id=d79af7c8&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/components/configuration/NewAccountComponent.vue?vue&type=template&id=d79af7c8&scoped=true& ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccountComponent_vue_vue_type_template_id_d79af7c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccountComponent_vue_vue_type_template_id_d79af7c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccountComponent_vue_vue_type_template_id_d79af7c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewAccountComponent.vue?vue&type=template&id=d79af7c8&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=template&id=d79af7c8&scoped=true&");


/***/ }),

/***/ "./resources/js/views/configuration/NewAccount.vue?vue&type=template&id=0c57f645&":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/configuration/NewAccount.vue?vue&type=template&id=0c57f645& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccount_vue_vue_type_template_id_0c57f645___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccount_vue_vue_type_template_id_0c57f645___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccount_vue_vue_type_template_id_0c57f645___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewAccount.vue?vue&type=template&id=0c57f645& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/configuration/NewAccount.vue?vue&type=template&id=0c57f645&");


/***/ }),

/***/ "./resources/js/components/configuration/NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css&":
/*!********************************************************************************************************************************!*\
  !*** ./resources/js/components/configuration/NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css& ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAccountComponent_vue_vue_type_style_index_0_id_d79af7c8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/configuration/NewAccountComponent.vue?vue&type=style&index=0&id=d79af7c8&scoped=true&lang=css&");


/***/ })

}]);