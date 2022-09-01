<?php

namespace App\Http\Controllers;

use App\Models\CAgents;
use App\Models\CCategory;
use App\Models\CClients;
use App\Models\CStatusOrds;
use App\Models\DOrders;
use App\Models\EFreeOrds;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EFreeDController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function supplyD(Request $request)
    {
        $sqlEFree = DB::select("SELECT f.*,o.no_ped,o.agent_id,c.short_name,c2.short_name as username,a.agent,de.delivery_type,ds.companie,b.boarding_type,s.name,s.color
                                    from e_free_ords f
                                    inner join d_orders d on d.free_id = f.id
                                    inner join e_orders o on o.id = d.order_id
                                    inner join c_clients c on c.id = o.client_id
                                    inner join c_clients c2 on c2.user_id = f.user_id
                                    inner join c_agents a on a.id = o.agent_id
                                    inner join c_delivery_types	de on de.id = f.delivery_id
                                    inner join c_delivery_service_companies ds on ds.id = f.deli_serv_id
                                    inner join c_boarding_types b on b.id = f.board_id
                                    inner join c_status_ords s on s.id = f.status_id
                                        where f.id = $request->freeId
                                            group by f.id,d.order_id,username");

        $eFree = collect($sqlEFree);
        $arrFree = $eFree[0];
        $int = $arrFree->intNum <> null ? ', int: '.$arrFree->intNum : '';
        $destiny = 'calle '.$arrFree->street.' '.$arrFree->extNum.$int.', '.$arrFree->suburb.', '.$arrFree->cp.', '.$arrFree->city.
                    ', '.$arrFree->state;
        $sqlDFree = DB::select("SELECT d.id as dord_id,d.quantity,u.id as unitId,u.unit,a.sai_id,a.article,a.packing2,c.*
                                    from e_free_ords f
                                    inner join d_orders d on d.free_id = f.id
                                    inner join c_units u on u.id = d.unit_id
                                    inner join c_articles a on a.id = d.article_id
                                    inner join c_categories c on c.id = a.category_id
                                            where f.id = $request->freeId
                                                    Order by id");     
        $arrdFree = collect($sqlDFree);
        $arrCat = CCategory::where('id','<>',6)
                            ->where('id','<>',0)
                                ->get();
        //Armar la grid para la agrupación de groups
        $gridT = [];
        $gridT2 = [];
        $gridC = [];
        $gridP = [];
        $gridM = [];
        $gridTol = [];
        $x = 1;
        $cat = 0;
        foreach($arrdFree as $grid){
            if($cat <> $grid->id){
                $x = 1;
                $cat = $grid->id;
            }
            $tmp = array(
                "num" => $x++,
                "dord_id" => $grid->dord_id,
                "sai_id" => $grid->sai_id,
                "quantity" => $grid->quantity,
                "unitId" => $grid->unitId,
                "unit" => $grid->unit,
                "article" => $grid->article,
                "packing2" => $grid->unitId <> 2 ? $grid->packing2 : '',
                "lots" => 1,
                "location" => '',
                "qty" => ''
            );
            switch($grid->id){
                case 1:
                    if($grid->unitId == 3){
                        array_push($gridT,$tmp);
                    } else{
                        array_push($gridT2,$tmp);
                    }
                    break;
                case 2: array_push($gridC,$tmp);
                    break;
                case 3: array_push($gridP,$tmp);
                    break;
                case 4: array_push($gridM,$tmp);
                    break;
                case 5: array_push($gridTol,$tmp);
                    break;
            }
        }
        
        return response()->json([
            'success' =>  true,
            'dataF' => $eFree[0],
            'destiny' => $destiny,
            'arrCat' => $arrCat,
            'gridT' => $gridT,
            'gridT2' => $gridT2,
            'gridC' => $gridC,
            'gridP' => $gridP,
            'gridM' => $gridM,
            'gridTol' => $gridTol,
        ], 200);
    }

    public function supplyScan(Request $request){
        $dord = DOrders::where('id',$request->dordId)
                        ->get();


        return response()->json([
            'success' =>  true,
            'saludo' => 'olo',
            'data' => $dord
        ], 200);
    }

    public function supplyModal(Request $request){
        $dataOrd = DOrders::with('article')
                        ->with('article.category:id,category,icon,color')
                        ->with('unit')
                            ->where('id',$request->dordId)
                                ->get();
        $dord = $dataOrd[0];
        $article = $dord->article;
        $cat = $dord->article->category;
        $unit = $dord->unit;
        $detModal = array(
            "id" => $dord->id,
            "status" => $dord->status_id,
            "quantity" => $dord->quantity,
            "fol_prod" => $dord->fol_prod,
            "sai_id" => $article->sai_id,
            "article" => $article->article,
            "packing2" => $article->packing2,
            "catId" => $cat->id,
            "category" => $cat->category,
            "icon" => $cat->icon,
            "color" => $cat->color,
            "unitId" => $unit->id,
            "unit" => $unit->unit
        );

        return response()->json([
            'success' =>  true,
            'detModal' => $detModal,
            // 'data' => $arr
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
}

// call procedures
// $eFree = DB::select('call ps_pruba()');
// $prub = collect($eFree);

