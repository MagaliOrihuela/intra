<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use GuzzleHttp\Client;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $baseUrlAPI = env('MIX_API_ENDPOINT');
        $this->app->singleton(Client::class, function($app) use ($baseUrlAPI) {
            return new Client(['base_uri' => $baseUrlAPI]);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
