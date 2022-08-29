<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="overflow-y: auto;">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        <link rel="shortcut icon" href="/images/shades.ico" />
        <title> Shades de México</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&display=swap" rel="stylesheet">
        <!-- Styles -->
         <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

         <style>
            #app {
               font-family: 'Roboto', sans-serif;
            }
            html, body {
               font-family: 'Roboto', sans-serif;
            }

         </style>
    </head>
    <body>
        <div id="app">
            <App/>
        </div>
    </body>
    <script src="{{ asset('js/app.js') }}"></script>
</html>