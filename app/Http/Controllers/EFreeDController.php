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
                                            Order by dord_id,unit_id ");     
        $arrdFree = collect($sqlDFree);
        $arrCat = CCategory::where('id','<>',6)
                            ->where('id','<>',0)
                                ->get();
        //  Genera las grids de escaneo
        $gridT = [];
        $gridT2 = [];
        $gridC = [];
        $gridP = [];
        $gridM = [];
        $gridTol = [];
        $cat = 0;
        $unit = 0;
        $arrCGrids = [];
        foreach($arrdFree as $grid){
            if($cat <> $grid->id){
                $x = 1;
                $cat = $grid->id;
                $unit = $grid->unit_id;
            } else if($unit <> $grid->unit_id and $grid->id == 1){
                $unit = $grid->unit_id;
                $x = 1;
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
        // Genera las grids de empaque
        $gridPT = [];
        $gridPT2 = [];
        $gridPC = [];
        $gridPP = [];
        $gridPM = [];
        $gridPTol = [];
        foreach($arrCat as $cat){
            $sqlDLC = DB::select("SELECT dor.id as dord,dor.unit_id,dol.*,a.article,a.category_id
                                    from d_orders dor
                                    inner join d_ord_lots dol on dol.dord_id = dor.id
                                    inner join c_articles a on a.id = dor.article_id
                                        where dor.free_id = $request->freeId and dol.package is not null 
                                            and a.category_id = $cat->id
                                                Order by dol.package asc ");     
            $sqldordL = collect($sqlDLC);
            foreach($sqldordL as $dordL){
                $tmp = array(
                    "id" => $dordL->id,
                    "location" => $dordL->location,
                    "quantity" => $dordL->quantity,
                    "lot" => $dordL->lot,
                    "package" => $dordL->package
                );
                switch($dordL->category_id){
                    case 1:
                        if($dordL->unit_id == 3){
                            array_push($gridPT,$tmp);
                        } else{
                            array_push($gridPT2,$tmp);
                        }
                        break;
                    case 2: array_push($gridPC,$tmp);
                        break;
                    case 3: array_push($gridPP,$tmp);
                        break;
                    case 4: array_push($gridPM,$tmp);
                        break;
                    case 5: array_push($gridPTol,$tmp);
                        break;
                }
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
            'gridPT' => $gridPT,
            'gridPT2' => $gridPT2,
            'gridPC' => $gridPC,
            'gridPP' => $gridPP,
            'gridPM' => $gridPM,
            'gridPTol' => $gridPTol,
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

    public function packModal(Request $request){
        $arrCat = $request->arrCat;
        if($request->rec == 1){
            $sqlPart = ' 1 and dor.unit_id = 2';
        } else if($arrCat['id'] == 1){
            $sqlPart = ' 1 and dor.unit_id = 3';
        } else{
            $sqlPart = $arrCat['id'];
        }
        $dataCat = array(
            "id" => $arrCat['id'],
            "icon" => $arrCat['icon'],
            "color" => $arrCat['color'],
            "category" => $arrCat['category'],
            "rec" => $request->rec,
        );
        $sqlOrd = DB::select("SELECT dor.id as dord,dol.*,a.article,a.category_id
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                    where dor.free_id = $request->freeId and dol.package is null and a.category_id = $sqlPart");
        $dataOrd = collect($sqlOrd);
        $x = 0;
        $arrScan = [];
        foreach($dataOrd as $ordLot){
            $x++;
            $tmp = array(
                "id" => $ordLot->id,
                "location" => $ordLot->location,
                "quantity" => $ordLot->quantity,
                "lot" => $ordLot->lot,
                "package" => $ordLot->package,
                "num" => $x
            );
            array_push($arrScan,$tmp); 
        }
        $sqlOrdP = DB::select("SELECT dor.id as dord,dol.*,a.article,a.category_id
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                    where dor.free_id = $request->freeId and dol.package is not null and a.category_id = $sqlPart
                                        Order by dol.package asc ");
        $dataOrdP = collect($sqlOrdP);
        $x = 0;
        $arrPack = [];
        foreach($dataOrdP as $ordLotP){
            $tmp = array(
                "id" => $ordLotP->id,
                "location" => $ordLotP->location,
                "quantity" => $ordLotP->quantity,
                "lot" => $ordLotP->lot,
                "package" => $ordLotP->package,
            );
            array_push($arrPack,$tmp); 
        }
        
        return response()->json([
            'success' =>  true,
            'gridScan' => $arrScan,
            'dataCat' => $dataCat,
            'gridPack' => $arrPack,
            'scanPack' => 2,
        ], 200);
    }
    public function package(Request $request){
        if($request->rec == 1){
            $sqlPart = ' 1 and dor.unit_id = 2';
        } else if($request->catId == 1){
            $sqlPart = ' 1 and dor.unit_id = 3';
        } else{
            $sqlPart = $request->catId;
        }
        $sqlQty = DB::select("SELECT max(dol.package) as qty
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                    where dor.free_id = $request->freeId and dol.package is not null and a.category_id = $sqlPart ");
        $qtySql = collect($sqlQty);
        $qty = $qtySql[0]->qty + 1;
        $arrPack = [];
        foreach($request->arrPack as $pack){
            $dordL = DOrdLots::find($pack['id']);
            $dordL->package = $qty;
            $dordL->save();
            $tmp = array(
                "id" => $dordL->id,
                "location" => $dordL->location,
                "quantity" => $dordL->quantity,
                "lot" => $dordL->lot,
                "package" => $dordL->package
            );
            array_push($arrPack,$tmp);
            if($request->catId == 1){
                $qty++;
            }
        }
        $sqlOrd = DB::select("SELECT dor.id as dord,dol.*,a.article,a.category_id
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                    where dor.free_id = $request->freeId and dol.package is null and a.category_id = $sqlPart");
        $dataOrd = collect($sqlOrd);
        $x = 0;
        $arrScan = [];
        foreach($dataOrd as $ordLot){
            $x++;
            $tmp = array(
                "id" => $ordLot->id,
                "location" => $ordLot->location,
                "quantity" => $ordLot->quantity,
                "lot" => $ordLot->lot,
                "package" => $ordLot->package,
                "num" => $x
            );
            array_push($arrScan,$tmp); 
        }

        
        return response()->json([
            'success' =>  true,
            'freeId' => $request->freeId,
            'arrPack' => $arrPack,
            'arrScan' => $arrScan,
            'catId' => $request->catId,
            'rec' => $request->rec
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

