<?php
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
// use App\Http\Controllers\Controller;
use Codedge\Fpdf\Fpdf\Fpdf;
use Codedge\Fpdf\Fpdf\FpdfBarcode;
use Illuminate\Support\Facades\DB;
 
class PdfController extends Controller
{
    public function index(Request $request) 
    {
        $del = "";
        $sqlClient = DB::select("SELECT o.id,o.no_ped,c.short_name
                                    from e_orders o 
                                    inner join c_clients c on c.id = o.client_id
                                        where o.id = $request->orderId");
        $client = collect($sqlClient);
        $sqlDeli = DB::select("SELECT f.*,dt.id as delId,dt.delivery_type,ds.companie,b.boarding_type
                                    from e_free_ords f
                                    inner join c_delivery_types dt on dt.id = f.delivery_id
                                    inner join c_delivery_service_companies ds on ds.id = f.deli_serv_id
                                    inner join c_boarding_types b on b.id = f.board_id
                                        where f.id = $request->freeId");
        $delivery = collect($sqlDeli);
        if($delivery[0]->delId <> 3){
            $del = $delivery[0]->contact.' calle '.$delivery[0]->street.' '.$delivery[0]->extNum.' '.$delivery[0]->intNum.', '.$delivery[0]->suburb.', '.$delivery[0]->cp.', '.$delivery[0]->city.
                    ', '.$delivery[0]->state;
        }
        if($request->rec == 1){
            $sqlPart = "$request->catId and dor.unit_id = 2";
        } else if($request->rec == 0 && $request->catId == 1){
            $sqlPart = "$request->catId and dor.unit_id = 3";
        } else{
            $sqlPart = $request->catId;
        }
        $sqlPack = DB::select("SELECT dol.lot,dol.quantity,dol.standar,(dol.quantity/dol.standar) as tot,dol.package,a.article,u.id,u.unit,cu.short_name,p.packfol
                                    from d_ord_lots dol
                                    inner join d_orders dor on dor.id = dol.dord_id
                                    inner join c_articles a on a.id = dor.article_id
                                    inner join c_units u on u.id = dor.unit_id
                                    inner join c_clients cu on cu.user_id = dol.user
                                    inner join d_packfols p on p.id = dol.packfol_id
                                        where dor.order_id = $request->orderId and a.category_id = $sqlPart
                                            Order by dol.package,u.id");
        $packages = collect($sqlPack);
        $incY = 30;
		$rowH = 5;
		$max = 10;
        $tmpPack = 0;
        $fpdf = new FpdfBarcode("L",'mm',[103,153]);
        $i = 1;
        foreach($packages as $pack){
            if($tmpPack <> $pack->package){
                $fpdf->AddPage();
                $fpdf->SetFont('arial','',10);
                $fpdf->Text(2,8,"Fecha: ");
                $fpdf->SetFont('arial','',12);
                $fpdf->Text(13,8,date('d-m-Y'));
                $fpdf->SetFont('arial','',10);
                $fpdf->Text(47,8,"Pedido: ");
                $fpdf->SetFont('arial','B',15);
                $fpdf->Text(60,8,$client[0]->no_ped);
                $fpdf->SetFont('arial','',10);
                $fpdf->Text(2,13,"Surtidor: ");
                $fpdf->SetFont('arial','',10);
                $fpdf->Text(16,13,$pack->short_name);
                $fpdf->SetFont('arial','',10);
                $fpdf->Text(47,13,"Cliente: ");
                $fpdf->SetFont('arial','',12);
                $fpdf->Text(60,13,$client[0]->short_name);
                $fpdf->SetFont('arial','',10);
                $fpdf->Text(2,18,"Tipo entrega: ");
                $fpdf->SetFont('arial','B',10);
                $fpdf->Text(23,18,$delivery[0]->delivery_type);
                $fpdf->SetFont('arial','',10);
                $fpdf->Text(2,23,"Entregar a: ");
                $fpdf->Text(21,23,$del);
                $fpdf->SetXY(30,50);
                $fpdf->Image("images/logop.jpg",120,3,27,15);
                $fpdf->SetFont('arial','',12);
                $fpdf->SetFillColor(200,200,200);
                $fpdf->SetXY(2,25);
                $fpdf->Cell(30,5,'Cantidad',0,0,'C',1);
                $fpdf->SetXY(27,25);
                $fpdf->Cell(90,5,'Descripcion',0,0,'C',1);
                $fpdf->SetFillColor(0,0,0);
                // código de barras vertical
                $fpdf->code128(122, 30,$pack->packfol, 50, 15, true);
                $fpdf->SetFont('arial','',8);
                $fpdf->RotatedText(141,63,$pack->packfol,90);
                $tmpPack = $pack->package;
                $i = 1;
                $incY = 30;
            }
            if($i == $max){
                $fpdf->AddPage();
                $fpdf->SetFont('arial','',12);
                $fpdf->SetFillColor(200,200,200);
                $fpdf->SetXY(2,25);
                $fpdf->Cell(30,5,'Cantidad',0,0,'C',1);
                $fpdf->SetXY(27,25);
                $fpdf->Cell(90,5,'Descripcion',0,0,'C',1);
                $i = 1;
            }
            $fpdf->SetFont('Arial','',8);
            $fpdf->SetXY(2,$incY);
            $fpdf->Cell(25,5,$pack->tot." ".$pack->unit,1,0,'L');
            $fpdf->SetXY(27,$incY);
            $fpdf->Cell(90,5,$pack->article,1,0,'L');
            $incY += $rowH;
            $i++;
        }
        $fpdf->Output();
        exit;
    }
}