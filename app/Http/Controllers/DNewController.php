<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DNew;
use App\Models\ESocketConnections;
use App\Models\EViewsNotification;

class DNewController extends Controller
{

    public function index($user_id, DNew $DNew)
    {
        $dNews = $DNew::select('id','img_news_crs','img_news','title','is_principal','created_at')->get();
        // mostramos todos los registros de noticias
        return response()->json([ 
            'success' => true,
            'dnews' => $dNews,
        ], 200);
    }

    public function create() { // creamos la nueva noticia
        
    }

    public function store(Request $request) // creamos la nueva noticia
   {

      try {

        if($request->is_principal == 1) { 
            $newPrin = DNew::where('is_principal', '=', 1)->first();
            if($newPrin != null){
                $newPrin->is_principal = 0;
                $newPrin->save();
            }
        }
        // buscamos si ya tenemos una imagen principal y si tenemos una la aliminamos y ponemos la nueva
         
        $dNews = new DNew;
        $dNews->title        = $request->title;
        $dNews->description    = $request->description;
        $dNews->is_principal = $request->is_principal;
        $dNews->save();

        // creamos el nombre de las imagenes y actualizamos
        $imgCrs = $imgNews = $imgCrsExt = $imgNewsExt = $ext1 = $ext2 = '';
        if( $request->img_news != '' ) { 
            $ext1 = pathinfo($request->img_news, PATHINFO_EXTENSION);
            $imgCrs = 'img_carousel'.$dNews->id;
            $imgCrsExt = $ext1; 

        }
        if( $request->img_news_crs != '' ) { 
            $ext2 = pathinfo($request->img_news_crs, PATHINFO_EXTENSION);
            $imgNews = 'img_news'.$dNews->id;
            $imgNewsExt = $ext2; 
        }
            
        if($request->img_news != '' or $request->img_news_crs != '' ) {

            $imgId = DNew::find($dNews->id);
            if($request->img_news != '' ) { $imgId->img_news     = $imgCrs.'.'.$ext1; }
            if($request->img_news_crs != '' ) { $imgId->img_news_crs = $imgNews.'.'.$ext2; }
            $imgId->save();
        }

        
        $dNew = json_decode( DNew::select('id','title','description','img_news','img_news_crs','is_principal','created_at')
        ->where('id','=',$dNews->id)
        ->get(), true );

        return response()->json([ 
            'success' => true,
            'dNew' => $dNew[0],
        ], 200); 

      } catch (\Exception $e) {
         
         dd($e);
         return response()->json([ 'success' => false ], 405); 
      }
   }

    public function showUpdate($id,DNew $DNew)
    {
        $dNew = json_decode(  $DNew::select('id','img_news_crs','img_news','title','description','is_principal','created_at')
                        ->where('id','=',$id)
                        ->get() , true );
 
        // mostramos todos los registros de noticias
        return response()->json([ 
            'success' => true,
            'dNew' => $dNew[0],
        ], 200); 
   }

    public function update(Request $request)
    {
        
        try {

            if($request->is_principal == 1) { 
                $newPrin = DNew::where('is_principal', '=', 1)->first();
                if($newPrin != null){
                    $newPrin->is_principal = 0;
                    $newPrin->save();
                }
            }


            $dNew = DNew::find($request->id);

            // creamos el nombre de las imagenes y actualizamos
            $imgCrs = $imgNews = $imgCrsExt = $imgNewsExt = '';

            if( $request->img_news != '' ) { 
                $ext1 = pathinfo($request->img_news, PATHINFO_EXTENSION);
                $imgCrs = 'img_carousel'.$request->id.'.'.$ext1;
                $imgCrsExt = $ext1; 
                $dNew->img_news_crs = $imgCrs;
            } 

            if( $request->img_news_crs != '' ) { 
                $ext2 = pathinfo($request->img_news_crs, PATHINFO_EXTENSION);
                $imgNews = 'img_news'.$request->id;
                $imgNewsExt = $ext2; 
                $dNew->img_news = $imgNews;
            } 
                

            $dNew->title        = $request->title;
            $dNew->description  = $request->description;
            $dNew->is_principal = $request->is_principal;
            $dNew->save();

            $dNewUp = json_decode( DNew::select('id','title','description','img_news','img_news_crs','is_principal','created_at')
            ->where('id','=',$request->id)
            ->get() , true );

            return response()->json([ 
                'success' => true,
                'dNew' => $dNewUp[0],
            ], 200); 

        } catch (\Exception $e) {
            return response()->json([ 'success' => false ], 405); 
        }

    }

    public function destroy(DNew $DNew, $id)
    {

        try {
           
            $imgNews = DNew::select('img_news')->where('id',$id)->get();
            $imgNewsCrs = DNew::select('img_news_crs')->where('id',$id)->get();

            $newsDel = $DNew::find($id);
            
            $dNew = json_decode( DNew::select('id','title','description','img_news','img_news_crs','is_principal','created_at')
            ->where('id','=',$id)
            ->get(), true );

            $newsDel->delete();

            return response()->json([ 
                'success' => true,
                'dNew' => $dNew[0],
            ], 200); 

        } catch (\Throwable $th) {
           
            return response()->json([ 
                'success' => false,
            ], 405); 

        }
        
   
    }

    public function newsData(DNew $DNew, $id)
    {

        try {
           
            $dNew = json_decode( DNew::select('id','title','description','img_news','img_news_crs','is_principal','created_at')
            ->where('id','=',$id)
            ->get(), true );

            $notInvalid = json_decode( EViewsNotification::where('module', '=', 'news')
            ->where('relation_id', '=', $id)
            ->first(), true );

            // dd($notInvalid );
            if($dNew != '') {
                return response()->json([ 
                    'success' => true,
                    'dNew' => $dNew[0],
                    'idNotificationInv' => $notInvalid['id'],
                ], 200); 
            }

        } catch (\Throwable $th) {
           
            return response()->json([ 
                'success' => false,
            ], 200); 

        }
        
   
    }

    public function accesstopfive(Request $request)
    {
        
        try {

            $dNewTop = json_decode( DNew::select('id','title','description','img_news','img_news_crs','is_principal','created_at')
            ->orderBy('is_principal', 'desc')
            ->orderBy('created_at', 'asc')
            ->limit(4)
            ->get() , true );

            foreach($dNewTop as $key => $value) {
                $dNewTop[$key] += ['route' => ''];
            }

            return response()->json([ 
                'success' => true,
                'dNew' => $dNewTop,
            ], 200); 

        } catch (\Exception $e) {
            return response()->json([ 'success' => false ], 405); 
        }

    }
}
