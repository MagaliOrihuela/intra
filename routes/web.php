<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\verifyController;
use App\Http\Controllers\ECotizacionesController;
use App\Http\Controllers\DCotizacionesController;
use App\Http\Controllers\ESocketConnectionsController;
use App\Http\Controllers\CClientController;
use App\Http\Controllers\DNewController;
use App\Http\Controllers\CUserController;
use App\Http\Controllers\DViewsNotificationController;
use App\Http\Controllers\APIController;
use App\Http\Controllers\EInvoiceController;
use App\Http\Controllers\Email;
use App\Http\Controllers\EOrdersController;
use App\Http\Controllers\DOrdersController;

Route::get('csrf', function () {
   return csrf_token();
});

// @ Auth

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'auth'], function () {
   Route::post('/refresh', [LoginController::class, 'refreshToken'])->name('auth.refreshToken');
   Route::get('/logout/{userID}', [LoginController::class, 'logout'])->name('auth.logout');
   Route::post('/validate_password', [LoginController::class, 'validatePassword'])->name('auth.validatePassword');
   Route::post('/renew_password', [LoginController::class, 'renewPassword'])->name('auth.renewPassword');
   Route::post('/save_img_profile', [LoginController::class, 'saveImgProfile'])->name('auth.saveImgProfile');
});

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'verify'], function () {
   Route::post('/token', [verifyController::class, 'verifyToken'])->name('verify.verifyToken');
   Route::post('/verifyClientCotizacion', [verifyController::class, 'verifyClientCotizacion'])->name('verify.verifyClientCotizacion');
});

Route::group(['middleware' => [], 'prefix' => 'articles'], function () {
   Route::post('/a', [ECotizacionesController::class, 'articlesvlook'])->name('articles.articlesvlook');
});

Route::group(['middleware' => [], 'prefix' => 'auth'], function () {
   Route::post('/login', [LoginController::class, 'startSesion'])->name('login.startSesion');
});

// @ Cotizaciones

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'cotizaciones'], function () {
   Route::get('/delete/{id}', [ECotizacionesController::class, 'destroy'])->name('ecotizaciones.destroy');
   Route::post('/v', [ECotizacionesController::class, 'index'])->name('ecotizaciones.index');
   Route::post('/v/canceled', [ECotizacionesController::class, 'canceled'])->name('ecotizaciones.canceled');
   Route::post('/create', [ECotizacionesController::class, 'store'])->name('ecotizaciones.store');
   Route::post('/recover', [ECotizacionesController::class, 'recover'])->name('ecotizaciones.recover');
   Route::get('/confignewcot/{is_partner}/{client_id}', [ECotizacionesController::class, 'configNewCot'])->name('ecotizaciones.configNewCot');
   Route::post('/canceledCot',[ECotizacionesController::class,'canceledCot']);
   Route::get('/clients', [CClientController::class, 'index'])->name('cclients.index');
   Route::get('/{cotizacion_id}/{client_id}', [DCotizacionesController::class, 'show'])->name('dcotizaciones.index');
   Route::post('/dataCotizacion', [ECotizacionesController::class, 'dataCotizacion']);
   Route::post('/updateDetails', [ECotizacionesController::class, 'updateDetails']);
   Route::post('/proccessOrder', [ECotizacionesController::class, 'proccessOrder']);
});

// DCotizaciones
Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'cotizacion'], function () {
   Route::post('/partidas', [DCotizacionesController::class, 'index'])->name('dcotizaciones.index');
   Route::post('/create', [DCotizacionesController::class, 'store'])->name('dcotizaciones.store');
   Route::post('/elements', [DCotizacionesController::class, 'elements'])->name('dcotizaciones.elements');
   //Route::post('/getpricetotal', [DCotizacionesController::class, 'pricetotal']);
   Route::post('/deletePart', [DCotizacionesController::class, 'deletePCot']);
   Route::post('/updatedCot', [DCotizacionesController::class, 'updateDCot']);
   Route::post('/pruba', [Email::class, 'index']);
});

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'socket'], function () {
   Route::get('/', [ESocketConnectionsController::class, 'index'])->name('esocketconnections.index');
   Route::get('/insert/{user_id}/{is_partner}/{socket_id}', [ESocketConnectionsController::class, 'store'])->name('esocketconnections.store');
   Route::get('/delete/{socket_id}', [ESocketConnectionsController::class, 'destroy'])->name('esocketconnections.destroy');
   Route::get('/update/{socket_id_new}/{socket_id_old}/{user_id}', [ESocketConnectionsController::class, 'update'])->name('esocketconnections.update');
});

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'news'], function () {
   Route::post('/create', [DNewController::class, 'store'])->name('dnews.store');
   Route::get('/delete/{id}', [DNewController::class, 'destroy'])->name('dnews.destroy');
   Route::get('/show/{id}', [DNewController::class, 'showUpdate'])->name('dnews.showUpdate');
   Route::post('/update', [DNewController::class, 'update'])->name('dnews.update');
   Route::get('/getRowsNews/{user_id}', [DNewController::class, 'index'])->name('dnews.index');
   Route::get('/getNewsData/{id}', [DNewController::class, 'newsData'])->name('dnews.newsData');
   Route::post('/topfive', [DNewController::class, 'accesstopfive'])->name('dnews.accesstopfive');
});


Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'notifications'], function () {
   Route::get('/get_rows_notifications/{user_id}', [DViewsNotificationController::class, 'index'])->name('DViewsNotificationController.index');
   Route::post('/invalid_notifications', [DViewsNotificationController::class, 'update'])->name('DViewsNotificationController.update');
   Route::post('/create', [DViewsNotificationController::class, 'store'])->name('DViewsNotificationController.store');
   Route::get('/delete/{module}/{relation_id}/{user_id}', [DViewsNotificationController::class, 'destroy'])->name('DViewsNotificationController.destroy');
   Route::post('/update', [DViewsNotificationController::class, 'updateData'])->name('DViewsNotificationController.updateData');
});

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'accounts'], function () {
   Route::post('/clients', [CClientController::class, 'fullClient'])->name('cclients.fullClient');
   Route::post('/v', [CClientController::class, 'vClient'])->name('cclients.vClient');
   Route::post('/savePermissions', [CClientController::class, 'savePermissions'])->name('cclients.savePermissions');
   Route::post('/saveDataGeneral', [CClientController::class, 'saveDataGeneral'])->name('cclients.saveDataGeneral');
   Route::post('/saveCredentials', [CClientController::class, 'saveCredentials'])->name('cclients.saveCredentials');
   Route::post('/activeordeactiveClient', [CClientController::class, 'activeordeactiveClient'])->name('cclients.activeordeactiveClient');
   Route::post('/saveNewCredentials', [CUserController::class, 'saveNewCredentials'])->name('cusers.saveNewCredentials');
   Route::post('/saveNewDataGeneral', [CUserController::class, 'saveNewDataGeneral'])->name('cusers.saveNewDataGeneral');
   Route::post('/searchDataNewAccount', [CUserController::class, 'searchDataNewAccount'])->name('cusers.searchDataNewAccount');
});

Route::group(['prefix' => 'API'], function () {
   Route::post('/createToken', [APIController::class, 'createToken']);
   Route::post('/invoices/getAll', [APIController::class, 'invoicesGetAll']);
   Route::post('/invoices/release', [APIController::class, 'releaseInvoice']);
   Route::post('/orders/getOrders', [APIController::class, 'ordersAll']);
   Route::post('/orders/getOrdersS', [APIController::class, 'ordersAllS']);
   Route::post('/orders/getOrdersC', [APIController::class, 'ordersAllC']);
   Route::post('/orders/getPartOrder', [APIController::class, 'orderParts']);
   Route::post('/orders/freeOrder', [APIController::class, 'freeOrder']);
});

// EOrders
Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'orders'], function () {
   Route::post('/freeOrders', [EOrdersController::class, 'freeOrders']);
});

// DOrders
Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'order'], function () {
   Route::post('/deliBoard', [DOrdersController::class, 'index']);
   Route::post('/cateFree', [DOrdersController::class, 'cateFree']);
   Route::post('/address', [DOrdersController::class, 'address']);
   Route::post('/freeOrder', [DOrdersController::class, 'freeOrder']);
});

Route::group(['prefix' => 'invoice'], function () {
   Route::post('/get_config', [EInvoiceController::class, 'getConfigInvoice']);
});

Route::get('/{any}', function () {
   return view('app');
} )->where('any','.*');
