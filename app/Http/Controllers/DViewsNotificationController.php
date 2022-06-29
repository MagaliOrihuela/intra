<?php

namespace App\Http\Controllers;
use App\Models\DViewsNotification;
use App\Models\EViewsNotification;
use App\Models\ESocketConnections;
use App\Models\CClients;

use Illuminate\Http\Request;

class DViewsNotificationController extends Controller
{
    public function index($id, DViewsNotification $DViewsNotification)
    {
        $DViewsNotifications = $DViewsNotification::select('e_views_notifications.id','e_views_notifications.title','e_views_notifications.description','e_views_notifications.relation_id','e_views_notifications.is_partner','e_views_notifications.module','e_views_notifications.route','e_views_notifications.created_at','e_views_notifications.icon')
                                ->join('e_views_notifications', 'e_views_notifications.id', '=', 'd_views_notifications.views_notifications_id')
                                ->where('d_views_notifications.user_id','=',$id)
                                ->where('d_views_notifications.is_view','=','1')
                                ->get();
        return response()->json([
            'DViewsNotifications' => $DViewsNotifications,
            'success'=>true
            ], 200);
    }

    public function update(Request $request)
    {
        try {
            
            $editNot = DViewsNotification::where('views_notifications_id', '=', $request->id)
            ->where('user_id', '=', $request->user_id)
            ->first();

            $editNot->is_view = 0;
            $editNot->save();


            $EViewsNotification = EViewsNotification::select('e_views_notifications.id','e_views_notifications.title','e_views_notifications.description','e_views_notifications.relation_id','e_views_notifications.is_partner','e_views_notifications.module','e_views_notifications.route','e_views_notifications.created_at','e_views_notifications.icon')
                                ->join('d_views_notifications', 'e_views_notifications.id', '=', 'd_views_notifications.views_notifications_id')
                                ->where('d_views_notifications.user_id','=',$request->user_id)
                                ->where('d_views_notifications.is_view','=','1')
                                ->get();

            return response()->json([ 
                'success' => true,
                'EViewsNotification' => $EViewsNotification,
            ], 200); 

            

         } catch (\Exception $e) {
            return response()->json([ 'success' => false ], 405); 
        }   
    }

    public function store(Request $request) // creamos la nueva noticia
    {
        try {
            // Guardamos la notificacion 
           
            $eViewNot = new EViewsNotification;

            $eViewNot->title = $request->title;
            $eViewNot->description        = $request->description;
            $eViewNot->route        = $request->route;
            $eViewNot->is_partner        = $request->is_partner;
            $eViewNot->icon        = $request->icon;
            $eViewNot->module        = $request->module;
            $eViewNot->relation_id        = $request->relation_id;
            $eViewNot->save();

            // identificamos si la notificacion es solo para partners o publico en general

            $CClients = CClients::select('user_id')
                                    ->where('is_partner','>=',$request->is_partner)
                                    ->get();

            foreach ($CClients as $client) {
                $data_instert[] = [
                    'user_id' => $client->user_id,
                    'views_notifications_id' => $eViewNot->id
                ];
            }

            DViewsNotification::insert($data_instert);

            $EViewsNotification = EViewsNotification::select('id','title','description','relation_id','is_partner','module','route','created_at','icon')
            ->where('id','=',$eViewNot->id)
            ->get();

            return response()->json([ 
                'success' => true,
                'EViewsNotification' => $EViewsNotification,
            ], 200); 

        } catch (\Exception $e) {
            
            return response()->json([ 'success' => false ], 405); 
        }

   }

   public function updateData(Request $request)
   {
       
       try {

            $notiUpdate = EViewsNotification::where('module', '=', $request->module)
            ->where('relation_id', '=', $request->relation_id)
            ->first();
            $notiUpdate->title       = $request->title;
            $notiUpdate->description = $request->description;
            $notiUpdate->save();

            if($notiUpdate->id != '') {
                $EViewsNotification = EViewsNotification::select('id','title','description','relation_id','is_partner','module','route','created_at','icon')
                ->where('id','=',$notiUpdate->id)
                ->get();
            }
            
           return response()->json([ 
               'success' => true,
               'EViewsNotification' => $EViewsNotification,
           ], 200); 

       } catch (\Exception $e) {
           return response()->json([ 'success' => false ], 405); 
       }

   }

    public function destroy($module,$relation_id,$user_id)
    {

        try {
            $notiDel = EViewsNotification::where('module', '=', $module)
                                        ->where('relation_id', '=', $relation_id)
                                        ->first();

            $EViewsNotification = EViewsNotification::select('id','title','description','relation_id','is_partner','module','route','created_at','icon')
            ->where('id', '=', $notiDel->id)
            ->get();

            $notiDel->delete();

            return response()->json([ 
                'success' => true,
                'EViewsNotification' => $EViewsNotification,
            ], 200); 

        } catch (\Throwable $th) {
           
            return response()->json([ 
                'success' => false,
            ], 405); 

        }
        
   
    }
}
