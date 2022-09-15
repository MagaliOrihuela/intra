<?php

namespace App\Http\Controllers;

use App\Models\CCategory;
use App\Models\DOrders;
use App\Models\DOrdLots;
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
        $sqlDFree = DB::select("SELECT d.id as dord_id,d.quantity,d.status_id,u.id as unit_id,u.unit,a.sai_id,a.article,cacu.pzas,c.*
                                    from e_free_ords f
                                    inner join d_orders d on d.free_id = f.id
                                    inner join c_articles a on a.id = d.article_id
                                    inner join c_articles_c_unit cacu on cacu.article_id = a.id
                                    inner join c_units u on u.id = cacu.unit_id
                                    inner join c_categories c on c.id = a.category_id
                                        where f.id = $request->freeId and cacu.unit_id = d.unit_id
                                            Order by id ");     
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
                "unit" => $grid->unit,
                "article" => $grid->article,
                "pzas" => $grid->pzas,
                "surt" => $grid->status_id
            );
            switch($grid->id){
                case 1:
                    if($grid->unit_id == 3){
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
            'data' => $dord
        ], 200);
    }

    public function supplyModal(Request $request){
        $sqlOrd = DB::select("SELECT d.*,a.sai_id,a.article,a.category_id,u.unit,cacu.pzas,cat.color,cat.icon,cat.category
                                from d_orders d 
                                inner join c_articles a on a.id = d.article_id
                                inner join c_articles_c_unit cacu on cacu.article_id = a.id
                                inner join c_units u on u.id = cacu.unit_id
                                inner join c_categories cat on cat.id = a.category_id
                                        where d.id = $request->dordId and cacu.unit_id = d.unit_id
                                                Order by id");
        $dataOrd = collect($sqlOrd);
        $dord = $dataOrd[0];
        $detModal = array(
            "id" => $dord->id,
            "status" => $dord->status_id,
            "quantity" => $dord->quantity,
            "fol_prod" => $dord->fol_prod,
            "sai_id" => $dord->sai_id,
            "article" => $dord->article,
            "pzas" => $dord->pzas,
            "catId" => $dord->category_id,
            "category" => $dord->category,
            "icon" => $dord->icon,
            "color" => $dord->color,
            "unit" => $dord->unit,
            "unit_id" => $dord->unit_id
        );
        
        if($dord->category_id == 1 && $dord->unit_id == 3){
            $sqlCount = DB::select("SELECT count(*) as n from d_ord_lots where dord_id = $dord->id");
            $count = collect($sqlCount);
            $foul = $dord->quantity - $count[0]->n;
        } else{
            $sqlQty = DB::select("SELECT sum(quantity) as n from d_ord_lots where dord_id = $dord->id");
            $qty = collect($sqlQty);
            $foul = ($dord->quantity * $dord->pzas) - $qty[0]->n;
        }
        
        return response()->json([
            'success' =>  true,
            'detModal' => $detModal,
            'foul' => $foul
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

