<?php

namespace App\Http\Controllers;

use App\Models\CCategory;
use App\Models\DOrders;
use App\Models\DOrdLots;
use App\Models\CAllows;
use App\Models\CArticles;
use App\Models\DPackfols;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Codedge\Fpdf\Fpdf\Fpdf;

class EFreeDController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function supplyD(Request $request)
    {
        $sqlEFree = DB::select("SELECT f.*,d.order_id,o.no_ped,o.agent_id,c.short_name,c2.short_name as username,a.agent,de.delivery_type,ds.companie,b.boarding_type,s.name,s.color
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
        $arrScan = $this->gridsScan($request->freeId,$request->user_id);      // llama la función que genera las grids
        $sqlCat = CCategory::where('id','<>',6)
                            ->where('id','<>',0)
                                ->get();
        $arrCat = [];
        foreach($sqlCat as $cat){
            switch($cat->id){
                case 1:
                    $catIdT = $cat->id;$catT = $cat->category;$colorT = $cat->color;$iconT = $cat->icon;
                    break;
                case 2:
                    $catIdC = $cat->id;$catC = $cat->category;$colorC = $cat->color;$iconC = $cat->icon;
                    break;
                case 3:
                    $catIdP = $cat->id;$catP = $cat->category;$colorP = $cat->color;$iconP = $cat->icon;
                    break;
                case 4:
                    $catIdM = $cat->id;$catM = $cat->category;$colorM = $cat->color;$iconM = $cat->icon;
                    break;
                case 5:
                    $catIdTol = $cat->id;$catTol = $cat->category;$colorTol = $cat->color;$iconTol = $cat->icon;
                    break;
            }
        }
        $arrCat = array(
            "catIdT" => $catIdT,
            "catT" => $catT,
            "colorT" => $colorT,
            "iconT" => $iconT,
            "catIdC" => $catIdC,
            "catC" => $catC,
            "colorC" => $colorC,
            "iconC" => $iconC,
            "catIdP" => $catIdP,
            "catP" => $catP,
            "colorP" => $colorP,
            "iconP" => $iconP,
            "catIdM" => $catIdM,
            "catM" => $catM,
            "colorM" => $colorM,
            "iconM" => $iconM,
            "catIdTol" => $catIdTol,
            "catTol" => $catTol,
            "colorTol" => $colorTol,
            "iconTol" => $iconTol,
        );

        return response()->json([
            'success' =>  true,
            'dataF' => $eFree[0],
            'destiny' => $destiny,
            'tab' => 1,
            'arrCat' => $arrCat,
            'gridT' => $arrScan['gridT'],
            'gridT2' => $arrScan['gridT2'],
            'gridC' => $arrScan['gridC'],
            'gridP' => $arrScan['gridP'],
            'gridM' => $arrScan['gridM'],
            'gridTol' => $arrScan['gridTol'],
            'statusT' => $arrScan['statusT'],
            'statusT2' => $arrScan['statusT2'],
            'statusC' => $arrScan['statusC'],
            'statusP' => $arrScan['statusP'],
            'statusM' => $arrScan['statusM'],
            'statusTol' => $arrScan['statusTol'],
        ], 200);
    }

    public function gridsScan($freeId,$userId){     //  Genera las grids de escaneo
        $sqlDFree = DB::select("SELECT d.id as dord_id,d.quantity,d.status_id,u.id as unit_id,u.unit,a.sai_id,a.article,cacu.pzas,a.category_id
                                    from d_orders d 
                                    inner join c_articles a on a.id = d.article_id
                                    inner join c_articles_c_unit cacu on cacu.article_id = a.id
                                    inner join c_units u on u.id = cacu.unit_id
                                            where d.free_id = $freeId and cacu.unit_id = d.unit_id
                                                    Order by category_id,unit_id ");     
        $arrdFree = collect($sqlDFree);
        $sqlAllow = CAllows::where('user_id',$userId)
                            ->get();
        $allow = $sqlAllow[0];
        $gridT = [];
        $gridT2 = [];
        $gridC = [];
        $gridP = [];
        $gridM = [];
        $gridTol = [];
        $statusT = false;
        $statusT2 = false;
        $statusC = false;
        $statusP = false;
        $statusM = false;
        $statusTol = false;
        $cat = 0;
        $unit = 0;
        foreach($arrdFree as $grid){
            $suppFlg = false;
            if($cat <> $grid->category_id){
                $x = 1;
                $cat = $grid->category_id;
                $unit = $grid->unit_id;
                $sqlPart = $grid->category_id == 1 ? " 1 and dor.unit_id = $unit" : $cat;
                $sqlDOrd = DB::select("SELECT count(*) as supp
                                        from d_orders dor
                                        inner join c_articles a on a.id = dor.article_id
                                            where dor.free_id = $freeId and a.category_id = $sqlPart and status_id = 3
                                                Order by a.category_id,dor.unit_id");
                $eDord = collect($sqlDOrd);
                $arrDOrd = $eDord[0];
                $suppFlg = true;
            } else if($unit <> $grid->unit_id and $cat == 1){
                $unit = $grid->unit_id;
                $x = 1;
                $sqlDOrd = DB::select("SELECT count(*) as supp
                                        from d_orders dor
                                        inner join c_articles a on a.id = dor.article_id
                                            where dor.free_id = $freeId and a.category_id = 1 and dor.unit_id = $unit and status_id = 3
                                                Order by a.category_id,dor.unit_id");
                $eDord = collect($sqlDOrd);
                $arrDOrd = $eDord[0];
                $suppFlg = true;
            }
            if($suppFlg){
                switch($cat){
                    case 1:
                        if($unit == 2){
                            $statusT2 = $arrDOrd->supp > 0 ? true : false;
                        } else{
                            $statusT = $arrDOrd->supp > 0 ? true : false;
                        }
                        break;
                    case 2: $statusC = $arrDOrd->supp > 0 ? true : false;
                        break;
                    case 3: $statusP = $arrDOrd->supp > 0 ? true : false;
                        break;
                    case 4: $statusM = $arrDOrd->supp > 0 ? true : false;
                        break;
                    case 5: $statusTol = $arrDOrd->supp > 0 ? true : false;
                        break;
                }
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
            switch($grid->category_id){
                case 1:
                    if($grid->unit_id == 3 && $allow->rollos > 0){
                        array_push($gridT,$tmp);
                    } else if($grid->unit_id == 2 && $allow->recortes > 0){
                        array_push($gridT2,$tmp);
                    }
                    break;
                case 2:
                    if($allow->componentes > 0) 
                        array_push($gridC,$tmp);
                    break;
                case 3: 
                    if($allow->perfiles > 0) 
                        array_push($gridP,$tmp);
                    break;
                case 4: 
                    if($allow->motores > 0) 
                        array_push($gridM,$tmp);
                    break;
                case 5: 
                    if($allow->toldos > 0) 
                        array_push($gridTol,$tmp);
                    break;
            }
        }
        $arrG = array(
            'gridT' => $gridT,
            'gridT2' => $gridT2,
            'gridC' => $gridC,
            'gridP' => $gridP,
            'gridM' => $gridM,
            'gridTol' => $gridTol,
            'statusT' => $statusT,
            'statusT2' => $statusT2,
            'statusC' => $statusC,
            'statusP' => $statusP,
            'statusM' => $statusM,
            'statusTol' => $statusTol,
        );
        return $arrG;
    }
    public function gridsPackage($freeId){     // Genera las grids de empaque
        $gridT = [];
        $gridT2 = [];
        $gridC = [];
        $gridP = [];
        $gridM = [];
        $gridTol = [];
        $statusT = false;
        $statusT2 = false;
        $statusC = false;
        $statusP = false;
        $statusM = false;
        $statusTol = false;
        $existT = false;
        $existT2 = false;
        $existC = false;
        $existP = false;
        $existM = false;
        $existTol = false;
        $arrCat = DB::select("SELECT a.category_id
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                        where dor.free_id = $freeId and dol.status_val1 >= 2
                                            Group by 1");
        foreach($arrCat as $cat){
            if($cat->category_id <> 1){
                $statusCat = DB::select("SELECT count(*) as packNull
                                            from d_orders dor
                                            inner join d_ord_lots dol on dol.dord_id = dor.id
                                            inner join c_articles a on a.id = dor.article_id
                                                where dor.free_id = $freeId and dol.status_val1 >= 2 
                                                    and a.category_id = $cat->category_id and dol.package is null");
                $status = collect($statusCat);
            }             
            switch($cat->category_id){
                case 1:
                    $catego1 = DB::select("SELECT dor.unit_id,count(dor.unit_id) as tot
                                            from d_orders dor
                                            inner join d_ord_lots dol on dol.dord_id = dor.id
                                            inner join c_articles a on a.id = dor.article_id
                                                where dor.free_id = $freeId and dol.status_val1 >= 2 and a.category_id = $cat->category_id
                                                    Group by 1");
                    foreach($catego1 as $cat1){
                        $statusCat = DB::select("SELECT count(*) as packNull
                                                    from d_orders dor
                                                    inner join d_ord_lots dol on dol.dord_id = dor.id
                                                    inner join c_articles a on a.id = dor.article_id
                                                        where dor.free_id = $freeId and dol.status_val1 >= 2 
                                                            and a.category_id = $cat->category_id and dor.unit_id = $cat1->unit_id 
                                                            and dol.package is null");
                        $status = collect($statusCat);
                        if($cat1->unit_id == 2){
                            $existT2 = true;
                            $statusT2 = $status[0]->packNull > 0 ? false : true;
                        } else{
                            $existT = true;
                            $statusT = $status[0]->packNull > 0 ? false : true;
                        }
                    }
                    break;
                case 2:
                    $statusC = $status[0]->packNull > 0 ? false : true;
                    $existC = true;
                    break;
                case 3:
                    $statusP = $status[0]->packNull > 0 ? false : true;
                    $existP = true;
                    break;
                case 4:
                    $statusM = $status[0]->packNull > 0 ? false : true;
                    $existM = true;
                    break;
                case 5:
                    $statusTol = $status[0]->packNull > 0 ? false : true;
                    $existTol = true;
                    break;

            }
            $sqlDLC = DB::select("SELECT dor.id as dord,dor.unit_id,u.unit,dol.*,(dol.quantity/dol.standar) as cont,a.article,a.category_id
                                    from d_orders dor
                                    inner join d_ord_lots dol on dol.dord_id = dor.id
                                    inner join c_articles a on a.id = dor.article_id
                                    inner join c_units u on u.id = dor.unit_id
                                        where dor.free_id = $freeId and dol.package is not null 
                                            and a.category_id = $cat->category_id
                                                Order by dol.package asc");     
            $sqldordL = collect($sqlDLC);
            foreach($sqldordL as $dordL){
                $tmp = array(
                    "id" => $dordL->id,
                    "location" => $dordL->location,
                    "quantity" => $dordL->quantity,
                    "standar" => $dordL->standar == 1 ? $dordL->quantity : $dordL->standar,
                    "cont" => $dordL->cont,
                    "lot" => $dordL->lot,
                    "article" => $dordL->article,
                    "unit" => $dordL->unit,
                    "num" => $dordL->package
                );
                switch($dordL->category_id){
                    case 1:
                        if($dordL->unit_id == 3){
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
        }
        $arrG = array(
            'gridT' => $gridT,
            'gridT2' => $gridT2,
            'gridC' => $gridC,
            'gridP' => $gridP,
            'gridM' => $gridM,
            'gridTol' => $gridTol,
            'statusT' => $statusT,
            'statusT2' => $statusT2,
            'statusC' => $statusC,
            'statusP' => $statusP,
            'statusM' => $statusM,
            'statusTol' => $statusTol,
            'existT' => $existT,
            'existT2' => $existT2,
            'existC' => $existC,
            'existP' => $existP,
            'existM' => $existM,
            'existTol' => $existTol,
        );
        return $arrG;
    }
    public function gridsValS($freeId,$userId){     // Genera las grids de validaScaner
        $gridT = [];
        $gridT2 = [];
        $gridC = [];
        $gridP = [];
        $gridM = [];
        $gridTol = [];
        $statusT = false;
        $statusT2 = false;
        $statusC = false;
        $statusP = false;
        $statusM = false;
        $statusTol = false;
        $cat = 0;
        $unit = 0;
        $sqlDLC = DB::select("SELECT dor.id as dord,dor.unit_id,u.unit,dol.*,(dol.quantity/dol.standar) as cont,a.article,a.category_id
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                inner join c_units u on u.id = dor.unit_id
                                    where dor.free_id = $freeId and dor.status_id >= 3
                                        Order by category_id,unit_id,dor.id,dol.id");     
        $sqldordL = collect($sqlDLC);
        $sqlAllow = CAllows::where('user_id',$userId)
                                ->get();
        $allow = $sqlAllow[0];
        $statusV = false;
        foreach($sqldordL as $dordL){
            if(($dordL->category_id == 1 && $dordL->unit_id == 3 && $allow->rollos == 0) ||
                ($dordL->category_id == 1 && $dordL->unit_id == 2 && $allow->recortes == 0) ||
                ($dordL->category_id == 2 && $allow->componentes == 0)||($dordL->category_id == 3 && $allow->perfiles == 0) ||
                ($dordL->category_id == 4 && $allow->motores == 0)||($dordL->category_id == 5 && $allow->toldos == 0)){
                continue;
            }
            $suppFlg = false;
            if($cat <> $dordL->category_id){
                $x = 1;
                $cat = $dordL->category_id;
                $unit = $dordL->unit_id;
                $sqlPart = $cat == 1 ? " 1 and dor.unit_id = $unit" : $cat;
                $sqlVal = DB::select("SELECT count(*) wait 
                                        from d_orders dor
                                        inner join d_ord_lots dol on dol.dord_id = dor.id
                                        inner join c_articles a on a.id = dor.article_id
                                                where dor.free_id = $freeId
                                                        and a.category_id = $sqlPart and dol.status_val1 = 0");     
                $val = collect($sqlVal);
                $statusV = $val[0]->wait > 0 ? false : true;
                $suppFlg = true;
            } else if($dordL->category_id == 1 and $unit <> $dordL->unit_id){
                $unit = $dordL->unit_id;
                $x = 1;
                $sqlWait = DB::select("SELECT count(*) wait 
                                        from d_orders dor
                                        inner join d_ord_lots dol on dol.dord_id = dor.id
                                        inner join c_articles a on a.id = dor.article_id
                                            where dor.free_id = $freeId
                                                and a.category_id = $dordL->category_id and dor.unit_id = $unit and dol.status_val1 = 0"); 
                $wait = collect($sqlWait);
                $statusV = $wait[0]->wait > 0 ? false : true;
                $suppFlg = true;
            }
            if($suppFlg){
                switch($cat){
                    case 1: 
                        if($unit == 2){
                            $statusT2 = $statusV;
                        } else{
                            $statusT = $statusV;
                        }
                        break;   
                    case 2: $statusC = $statusV;
                        break;
                    case 3: $statusP = $statusV;
                        break;
                    case 4: $statusM = $statusV;
                        break;
                    case 5: $statusTol = $statusV;
                        break;
                } 
            }
            $tmp = array(
                "num" => $x++,
                "id" => $dordL->id,
                "lot" => $dordL->lot,
                "article" => $dordL->article,
                "unit" => $dordL->unit,
                "quantity" => $dordL->quantity,
                "standar" => $dordL->standar == 1 ? $dordL->quantity : $dordL->standar,
                "cont" => $dordL->cont,
                "check" => $dordL->status_val1
            );
            switch($dordL->category_id){
                case 1:
                    if($dordL->unit_id == 3 ){
                        array_push($gridT,$tmp);
                    } else if($dordL->unit_id == 2){
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

        $arrG = array(
            'statusT' => $statusT,
            'statusT2' => $statusT2,
            'statusC' => $statusC,
            'statusP' => $statusP,
            'statusM' => $statusM,
            'statusTol' => $statusTol,
            'gridT' => $gridT,
            'gridT2' => $gridT2,
            'gridC' => $gridC,
            'gridP' => $gridP,
            'gridM' => $gridM,
            'gridTol' => $gridTol,
        );

        return $arrG;
    }
    public function gridsValP($freeId){     // Genera las grids de val2
        $gridT = [];
        $gridT2 = [];
        $gridC = [];
        $gridP = [];
        $gridM = [];
        $gridTol = [];
        $statusT = false;
        $statusT2 = false;
        $statusC = false;
        $statusP = false;
        $statusM = false;
        $statusTol = false;
        $existT = false;
        $existT2 = false;
        $existC = false;
        $existP = false;
        $existM = false;
        $existTol = false;
        $arrCat = DB::select("SELECT a.category_id,
                                sum(case when dol.package is null then 1 else 0 end) as pack,
                                sum(case when dol.status_val1 < 4 then 1 else 0 end) as stat_val
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                    where dor.free_id = $freeId and dol.status_val1 >= 3
                                        Group by 1");
        foreach($arrCat as $cat){
            if($cat->pack > 0 && $cat->category_id <> 1){
                continue;
            } else if($cat->category_id == 1){
                $category1 = DB::select("SELECT dor.unit_id,
                                            sum(case when dol.package is null then 1 else 0 end) as pack
                                                from d_orders dor
                                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                                inner join c_articles a on a.id = dor.article_id
                                                    where dor.free_id = $freeId and dol.status_val1 >= 3 and a.category_id = $cat->category_id
                                                        Group by 1");
                foreach($category1 as $cat1){
                    if($cat1->unit_id == 2 && $cat1->pack == 0){
                        $existT2 = true;
                        // $statusT2 = $cat->stat_val == 0 ? true : false;
                    } else if($cat1->unit_id == 3 && $cat1->pack == 0){
                        $existT = true;
                        // $statusT = $cat->stat_val == 0 ? true : false;
                    }
                }
                if($existT2 == false && $existT == false){
                    continue;
                }
            } else{
                switch($cat->category_id){
                    case 2:
                        $statusC = $cat->stat_val == 0 ? true : false;
                        break;
                    case 3:
                        $statusP = $cat->stat_val == 0 ? true : false;
                        break;
                    case 4:
                        $statusM = $cat->stat_val == 0 ? true : false;
                        break;
                    case 5:
                        $statusTol = $cat->stat_val == 0 ? true : false;
                        break;

                }
            }


            $sqlDLC = DB::select("SELECT dor.id as dord,dor.unit_id,u.unit,dol.*,(dol.quantity/dol.standar) as cont,a.article,a.category_id
                                    from d_orders dor
                                    inner join d_ord_lots dol on dol.dord_id = dor.id
                                    inner join c_articles a on a.id = dor.article_id
                                    inner join c_units u on u.id = dor.unit_id
                                        where dor.free_id = $freeId and dol.package is not null 
                                            and a.category_id = $cat->category_id
                                                Order by dol.package asc ");     
            $sqldordL = collect($sqlDLC);
            foreach($sqldordL as $dordL){
                $tmp = array(
                    "id" => $dordL->id,
                    "location" => $dordL->location,
                    "quantity" => $dordL->quantity,
                    "standar" => $dordL->standar == 1 ? $dordL->quantity : $dordL->standar,
                    "unit" => $dordL->unit,
                    "cont" => $dordL->cont,
                    "lot" => $dordL->lot,
                    "article" => $dordL->article,
                    "num" => $dordL->package,
                    "check" => $dordL->status_val1
                );
                switch($dordL->category_id){
                    case 1:
                        if($dordL->unit_id == 3){
                            array_push($gridT,$tmp);
                        } else{
                            array_push($gridT2,$tmp);
                        }
                        break;
                    case 2: 
                        array_push($gridC,$tmp);
                        $existC = true;
                        break;
                    case 3: 
                        array_push($gridP,$tmp);
                        $existP = true;
                        break;
                    case 4: 
                        array_push($gridM,$tmp);
                        $existM = true;
                        break;
                    case 5: 
                        array_push($gridTol,$tmp);
                        $existTol = true;
                        break;
                }
            }
        }
        $arrG = array(
            'arrCat' => $arrCat,
            'gridT' => $gridT,
            'gridT2' => $gridT2,
            'gridC' => $gridC,
            'gridP' => $gridP,
            'gridM' => $gridM,
            'gridTol' => $gridTol,
            'statusT' => $statusT,
            'statusT2' => $statusT2,
            'statusC' => $statusC,
            'statusP' => $statusP,
            'statusM' => $statusM,
            'statusTol' => $statusTol,
            'existT' => $existT,
            'existT2' => $existT2,
            'existC' => $existC,
            'existP' => $existP,
            'existM' => $existM,
            'existTol' => $existTol,
        );

        return $arrG;
    }

    public function supplyGrids(Request $request){
        $arrG = [];
        $statusT = false;
        $statusT2 = false;
        $statusC = false;
        $statusP = false;
        $statusM = false;
        $statusTol = false;
        $packT = false;
        $packT2 = false;
        $packC = false;
        $packP = false;
        $packM = false;
        $packTol = false;
        switch($request->tab){
            case 1:
                $arrG = $this->gridsScan($request->freeId,$request->user_id); 
                break;
            case 2:
                $arrG = $this->gridsValS($request->freeId,$request->user_id); 
                break;
            case 3:
                $arrG = $this->gridsPackage($request->freeId); 
                $packT = $arrG['existT'];
                $packT2 = $arrG['existT2'];
                $packC = $arrG['existC'];
                $packP = $arrG['existP'];
                $packM = $arrG['existM'];
                $packTol = $arrG['existTol'];
                break;
            case 4:
                $arrG = $this->gridsValP($request->freeId); 
                $packT = $arrG['existT'];
                $packT2 = $arrG['existT2'];
                $packC = $arrG['existC'];
                $packP = $arrG['existP'];
                $packM = $arrG['existM'];
                $packTol = $arrG['existTol'];
                break;
        }
        $statusT = $arrG['statusT'];
        $statusT2 =  $arrG['statusT2'];
        $statusC =  $arrG['statusC'];
        $statusP =  $arrG['statusP'];
        $statusM =  $arrG['statusM'];
        $statusTol =  $arrG['statusTol'];

        return response()->json([
            'success' =>  true,
            'tab' =>  $request->tab,
            'gridT' => $arrG['gridT'],
            'gridT2' => $arrG['gridT2'],
            'gridC' => $arrG['gridC'],
            'gridP' => $arrG['gridP'],
            'gridM' => $arrG['gridM'],
            'gridTol' => $arrG['gridTol'],
            'statusT' => $statusT,
            'statusT2' => $statusT2,
            'statusC' => $statusC,
            'statusP' => $statusP,
            'statusM' => $statusM,
            'statusTol' => $statusTol,
            'packT' => $packT,
            'packT2' => $packT2,
            'packC' => $packC,
            'packP' => $packP,
            'packM' => $packM,
            'packTol' => $packTol,
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
            $foulPack = $foul;
        } else{
            $sqlQty = DB::select("SELECT sum(quantity) as n from d_ord_lots where dord_id = $dord->id");
            $qty = collect($sqlQty);
            $foulPack = $dord->quantity - ($qty[0]->n / $dord->pzas);
            $foul = ($dord->quantity * $dord->pzas) - $qty[0]->n;
        }
        
        return response()->json([
            'success' =>  true,
            'detModal' => $detModal,
            'foulPack' => ceil($foulPack),
            'foul' => $foul
        ], 200);
    }

    public function packModal(Request $request){
        $arrCat = CCategory::find($request->catId);
        if($request->rec == 1){
            $sqlPart = ' 1 and dor.unit_id = 2';
        } else if($arrCat->id == 1){
            $sqlPart = ' 1 and dor.unit_id = 3';
        } else{
            $sqlPart = $arrCat->id;
        }
        $dataCat = array(
            "id" => $arrCat->id,
            "icon" => $arrCat->icon,
            "color" => $arrCat->color,
            "category" => $arrCat->category,
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
                "num" => $x,
            );
            array_push($arrScan,$tmp); 
        }
        $sqlOrdP = DB::select("SELECT dor.id as dord,dol.*,(dol.quantity/dol.standar) as cont,u.unit,a.article,a.category_id
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                inner join c_units u on u.id = dor.unit_id
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
                "standar" => $ordLotP->standar == 1 ? $ordLotP->quantity : $ordLotP->standar,
                "cont" => $ordLotP->cont,
                "unit" => $ordLotP->unit,
                "lot" => $ordLotP->lot,
                "num" => $ordLotP->package,
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
            $let = 'R';
        } else if($request->catId == 1){
            $sqlPart = ' 1 and dor.unit_id = 3';
            $let = 'T';
        } else{
            $sqlPart = $request->catId;
            switch($request->catId){
                case 2:$let = 'C';
                    break;
                case 3:$let = 'P';
                    break;
                case 4:$let = 'M';
                    break;
                case 5:$let = 'Tol';
                    break;
            }
        }
        $sqlQty = DB::select("SELECT ifnull(max(dol.package),0) as qty
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                    where dor.free_id = $request->freeId and dol.package is not null and a.category_id = $sqlPart ");
        $qtySql = collect($sqlQty);
        $qty = $qtySql[0]->qty;
        $arrPack = [];
        $sqlPed = DB::select("SELECT no_ped
                                from e_orders o
                                inner join d_orders dor on dor.order_id = o.id
                                    where dor.free_id = $request->freeId
                                        Group by 1 ");
        $ped = collect($sqlPed);
        $noPed = $ped[0]->no_ped;
        $begin = true;
        foreach($request->arrPack as $pack){
            if(($request->catId == 1 && $request->rec <> 1) || $request->allF == 1 || $begin){
                $qty++;
                $dpackf = new DPackfols;
                $dpackf->user = $request->user_id;
                $dpackf->save();
                $packfol = trim($noPed.$dpackf->id.$let);
                $dPackFol = DPackfols::find($dpackf->id);
                $dPackFol->packfol = $packfol;
                $dPackFol->save();
                $begin = false;
            }
            $dordL = DOrdLots::find($pack['id']);
            $dordL->package = $qty;
            $dordL->packfol_id = $dpackf->id;
            $dordL->save();
            $cArt = DOrders::with('article')
                            ->with('unit')
                                ->where('id',$dordL->dord_id)
                                    ->get();
            $tmp = array(
                "id" => $dordL->id,
                "location" => $dordL->location,
                "quantity" => $dordL->quantity,
                "standar" => $dordL->standar == 1 ? $dordL->quantity : $dordL->standar,
                "cont" => ($dordL->quantity/$dordL->standar),
                "lot" => $dordL->lot,
                "article" => $cArt[0]->article->article,
                "unit" => $cArt[0]->unit->unit,
                "num" => $dordL->package
            );
            array_push($arrPack,$tmp);
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
        if($x == 0){
            DB::update("UPDATE d_ord_lots set status_val1 = 3 
                            where id in (Select id from (Select dol.id 
                                                            from d_ord_lots dol
                                                            inner join d_orders dor on dor.id = dol.dord_id
                                                            inner join c_articles a on a.id = dor.article_id
                                                                where dor.free_id = $request->freeId and a.category_id = $sqlPart) as dols
                                        )");
        }
        $status = empty($arrScan) ? true : false;
        return response()->json([
            'success' =>  true,
            'freeId' => $request->freeId,
            'arrPack' => $arrPack,
            'arrScan' => $arrScan,
            'catId' => $request->catId,
            'rec' => $request->rec,
            'status' => $status,
            'phase' => 3
        ], 200);
    }

    public function delPackage(Request $request){
        $dordL = DOrdLots::find($request->doLId);
        $dordL->package = null;
        $dordL->packfol_id = null;
        $dordL->save();
        $arr = array(
            "id" => $dordL->id,
            "location" => $dordL->location,
            "quantity" => $dordL->quantity,
            "lot" => $dordL->lot,
            "package" => $dordL->package,
            "num" => 0
        );
        $dorFree = DOrders::with('article:id,category_id')
                            ->where('id',$dordL->dord_id)
                                ->get();
        
        return response()->json([
            'success' =>  true,
            'catId' => $dorFree[0]->article->category_id,
            'freeId' => $dorFree[0]->free_id,
            'rec' =>  $request->rec,
            'arrPack' =>  $arr,
            'status' =>  false,
            'phase' => 3
        ], 200);
    }

    public function remGenerate(Request $request){
        if($request->rec == 1){
            $sqlPart = ' 1 and dor.unit_id = 2';
            $pref = '_R';
        } else if($request->catId == 1){
            $sqlPart = ' 1 and dor.unit_id = 3';
            $pref = '_T';
        } else{
            $sqlPart = $request->catId;
            switch($sqlPart){
                case 2: $pref = '_C';
                    break;
                case 3: $pref = '_P';
                    break;
                case 4: $pref = '_M';
                    break;
                case 5: $pref = '_Tol';
                    break;
            }
        }
        $sqlClient = DB::select("SELECT c.client_id
                                    from e_orders ord
                                    inner join c_clients c on c.id = ord.client_id
                                        where ord.no_ped = $request->no_ped");
        $client = collect($sqlClient);
        $clientId = $client[0]->client_id;
        $sqlOrd = DB::select("SELECT dor.unit_id,dol.lot,dol.quantity,dol.standar,a.sai_id,a.category_id
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                    where dor.free_id = $request->freeId and dor.status_id = 3 and a.category_id = $sqlPart");
        $dataOrd = collect($sqlOrd);
        //  Genera el txt para subir a Sai
        $archive = fopen('tmpRemission.txt','w');
        foreach($dataOrd as $row){
            $sai = strgLen($row->sai_id,40);
            $unit = strgLen(unit($row->unit_id),7);
            $ceros = '0.00000000  0.00000000';
            $lot = strgLen($row->lot,30);
            $mon = '1                  ';
            // $qtyDot = qtyDot($row->quantity);
            $round = round(($row->quantity / $row->standar),8);
            $qtyDot = qtyDot(strval($round));
            $qty = strgLen($qtyDot,20);
            $price = '0.00000000                                                                                                                                                                                    ';
            fwrite($archive,$sai);
            fwrite($archive,$unit);
            fwrite($archive,$ceros);
            fwrite($archive,$lot);
            fwrite($archive,$mon);
            fwrite($archive,$qty);
            fwrite($archive,$price);
            fwrite($archive,"\n");
        }
        fclose($archive);
        //  Copia y elimina el archivo temporal, lo deposita en la carpeta de Sai
        $newFile = $clientId.'_'.$request->no_ped.$pref;
        $file = "C:/laragon/www/intra/public/tmpRemission.txt";
        $newfile = "C:/VSAI/archivos/$newFile.txt";
        $copy = false;
        if (copy($file, $newfile)) {
            $copy = true;
        } 
        return response()->json([
            'success' =>  true,
            'copy' => $copy
        ], 200);
    }
    public function valGridSupply(Request $request){
        if($request->rec == 1){
            $sqlPart = ' 1 and dor.unit_id = 2';
        } else if($request->catId == 1){
            $sqlPart = ' 1 and dor.unit_id = 3';
        } else{
            $sqlPart = $request->catId;
        }
        $sqlOrd = DB::select("SELECT dor.id as dord,dol.*,(dol.quantity/dol.standar) as cont,u.unit,a.article,a.category_id
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                inner join c_units u on u.id = dor.unit_id
                                    where dor.free_id = $request->freeId and a.category_id = $sqlPart
                                        Order by dor.unit_id,dor.id,dol.id");
        $dataOrd = collect($sqlOrd);
        $x = 0;
        $y = 0;
        $arrScan = [];
        foreach($dataOrd as $ordLot){
            $x++;
            if($ordLot->status_val1 == 0){
                $y++;
            }
            $tmp = array(
                "id" => $ordLot->id,
                "article" => $ordLot->article,
                "quantity" => $ordLot->quantity,
                "standar" => $ordLot->standar == 1 ? $ordLot->quantity : $ordLot->standar,
                "cont" => $ordLot->cont,
                "unit" => $ordLot->unit,
                "lot" => $ordLot->lot,
                "status_val1" => $ordLot->status_val1,
                "num" => $x
            );
            array_push($arrScan,$tmp); 
        }
        $arrCat = CCategory::find($request->catId);
        $dataModal = array(
            "id" => $arrCat->id,
            "category" => $arrCat->category,
            "icon" => $arrCat->icon,
            "color" => $arrCat->color,
            "rec" => $request->rec,
            "wait" => $y
        );

        return response()->json([
            'success' =>  true,
            'arrVal' =>  $arrScan,
            "freeId" => $request->freeId,
            "dataModal" => $dataModal,
            "validate" => 1
        ], 200);
    }
    public function val2GridSupply(Request $request){
        if($request->rec == 1){
            $sqlPart = ' 1 and dor.unit_id = 2';
        } else if($request->catId == 1){
            $sqlPart = ' 1 and dor.unit_id = 3';
        } else{
            $sqlPart = $request->catId;
        }
        $sqlOrd = DB::select("SELECT dor.id as dord,dol.*,(dol.quantity/dol.standar) as cont,u.unit,a.article,a.category_id
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                inner join c_units u on u.id = dor.unit_id
                                    where dor.free_id = $request->freeId and a.category_id = $sqlPart
                                        Order by dol.package");
        $dataOrd = collect($sqlOrd);
        $x = 0;
        $y = 0;
        $arrScan = [];
        foreach($dataOrd as $ordLot){
            $x++;
            if($ordLot->status_val1 <= 3){
                $y++;
            }
            $tmp = array(
                "id" => $ordLot->id,
                "article" => $ordLot->article,
                "quantity" => $ordLot->quantity,
                "standar" => $ordLot->standar == 1 ? $ordLot->quantity : $ordLot->standar,
                "cont" => $ordLot->cont,
                "unit" => $ordLot->unit,
                "lot" => $ordLot->lot,
                "status_val1" => $ordLot->status_val1,
                "num" => $ordLot->package
            );
            array_push($arrScan,$tmp); 
        }
        $arrCat = CCategory::find($request->catId);
        $dataModal = array(
            "id" => $arrCat->id,
            "category" => $arrCat->category,
            "icon" => $arrCat->icon,
            "color" => $arrCat->color,
            "rec" => $request->rec,
            "wait" => $y
        );
        return response()->json([
            'success' =>  true,
            'arrVal' =>  $arrScan,
            "freeId" => $request->freeId,
            "dataModal" => $dataModal,
            "validate" => 2,
        ], 200);
    }
    public function valSupp(Request $request){
        if($request->rec == 1){
            $sqlPart = ' 1 and dor.unit_id = 2';
        } else if($request->catId == 1){
            $sqlPart = ' 1 and dor.unit_id = 3';
        } else{
            $sqlPart = $request->catId;
        }
        $sqlOrd = DB::select("SELECT dor.id as dord,dor.unit_id,dol.*,a.article,a.category_id
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                    where dor.free_id = $request->freeId and dol.lot = '$request->lot' 
                                        and a.category_id = $sqlPart and dol.status_val1 = 0");
        $dataOrd = collect($sqlOrd);
        $comment = '';
        $dordLot = 0;
        $wait = 0;
        $unitId = 0;
        $status = false;
        if(!empty($dataOrd[0])){
            $dordL = DOrdLots::find($dataOrd[0]->id);
            $dordL->status_val1 = 1;
            $dordL->save();
            $unitId = $dataOrd[0]->unit_id;
            $error = 1;
            $dordLot = $dordL->id;
            $sqlOrd = DB::select("SELECT count(*) wait
                                    from d_orders dor
                                    inner join d_ord_lots dol on dol.dord_id = dor.id
                                    inner join c_articles a on a.id = dor.article_id
                                        where dor.free_id = $request->freeId 
                                            and a.category_id = $sqlPart and dol.status_val1 = 0");
            $dataOrds = collect($sqlOrd);
            if($dataOrds[0]->wait == 0){
                $status = true;
                DB::update("UPDATE d_ord_lots set status_val1 = 2 
                                where id in (Select id from (Select dol.id
                                                from d_orders dor
                                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                                inner join c_articles a on a.id = dor.article_id
                                                        where dor.free_id = $request->freeId 
                                                                and a.category_id = $sqlPart and dol.status_val1 = 1
                                                ) as dols
                            )");
            }
            $wait = $dataOrds[0]->wait;
        } else{
            $error = 2;
            $comment = 'No pertenece a este surtido.';
        }
        return response()->json([
            'success' =>  true,
            'freeId' =>  $request->freeId,
            'catId' =>  $request->catId,
            'unitId' => $unitId,
            'rec' =>  $request->rec,
            'phase' =>  2,
            'dordLot' => $dordLot,
            'wait' => $wait,
            'status' => $status,
            'error' =>  $error,
            "comment" => $comment
        ], 200);
    }
    public function val2Supp(Request $request){
        if($request->rec == 1){
            $sqlPart = ' 1 and dor.unit_id = 2';
        } else if($request->catId == 1){
            $sqlPart = ' 1 and dor.unit_id = 3';
        } else{
            $sqlPart = $request->catId;
        }
        $sqlOrd = DB::select("SELECT dor.id as dord,dor.unit_id,dol.*,a.article,a.category_id,p.id as packfolId
                                from d_orders dor
                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                inner join c_articles a on a.id = dor.article_id
                                inner join d_packfols p on p.id = dol.packfol_id
                                    where dor.free_id = $request->freeId and p.packfol = '$request->lot' 
                                        and a.category_id = $sqlPart and dol.status_val1 = 3");
        $dataOrd = collect($sqlOrd);
        $comment = '';
        $wait = 0;
        $status = false;
        $package = 0;
        if(!empty($dataOrd[0])){
            DB::update("UPDATE d_ord_lots set status_val1 = 4 where packfol_id = '".$dataOrd[0]->packfolId."'");
            $error = 1;
            $sqlOrd = DB::select("SELECT count(*) wait
                                    from d_orders dor
                                    inner join d_ord_lots dol on dol.dord_id = dor.id
                                    inner join c_articles a on a.id = dor.article_id
                                        where dor.free_id = $request->freeId 
                                            and a.category_id = $sqlPart and dol.status_val1 = 3");
            $dataOrds = collect($sqlOrd);
            if($dataOrds[0]->wait == 0){
                $status = true;
                DB::update("UPDATE d_ord_lots set status_val1 = 5 
                                where id in (Select id from (Select dol.id
                                                from d_orders dor
                                                inner join d_ord_lots dol on dol.dord_id = dor.id
                                                inner join c_articles a on a.id = dor.article_id
                                                        where dor.free_id = $request->freeId 
                                                                and a.category_id = $sqlPart and dol.status_val1 = 4
                                                ) as dols
                            )");
            }
            $wait = $dataOrds[0]->wait;
            $package = $dataOrd[0]->package;
        } else{
            $error = 2;
            $comment = 'No pertenece a este surtido.';
        }
        return response()->json([
            'success' =>  true,
            'freeId' =>  $request->freeId,
            'catId' =>  $request->catId,
            'rec' =>  $request->rec,
            'phase' =>  4,
            'package' => $package,
            'wait' => $wait,
            'status' => $status,
            'error' =>  $error,
            "comment" => $comment
        ], 200);
    }

    // public function index(Request $request) 
    // {
    //     $this->fpdf = new Fpdf;
    //     $this->fpdf->SetFont('Arial', 'B', 15);
    //     $this->fpdf->AddPage("L", ['100', '100']);
    //     $this->fpdf->Text(10, 10, "Hello World!");       

    //     $this->fpdf->Output();

    //     exit;
    //     // return response()->json([
    //     //     'success' =>  true,
    //     //     'prubas' => "Aló esta es una pruba",
    //     // ], 200);
    // }

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
function strgLen($var,$len){
    $strgW = '                                        ';
    $intVar = $len - strlen($var);
    $strg = trim($var).substr($strgW,1,$intVar);

    return $strg;
}
function qtyDot($var){
    $ceros = '00000000';
    if(strpos($var,".") !== false){
        $x = 0;
        $flag = false;
        for($i = 0; $i < strlen($var); $i++){
            $flag ? $x++ : 0;
            if($var[$i] == '.'){
                $flag = true;
            }
        }
        $var .= substr($ceros,0,8 - $x);
    } else{
        $var .= '.'.$ceros;
    }

    return $var;
}

function unit($unitId){
    switch($unitId){
        case 1:
            $unit = 'PIEZA';
            break;
        case 2:
            $unit = 'METRO';
            break;
        case 3:
            $unit = 'ROLLO';
            break;
        case 6:
            $unit = 'CAJA';
            break;
        case 7:
            $unit = 'PAQ';
            break;
    }
    return $unit;
}

    

// call procedures
// $eFree = DB::select('call ps_pruba()');
// $prub = collect($eFree);

