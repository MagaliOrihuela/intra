<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../vendor/phpmailer/phpmailer/src/Exception.php';
require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';
// //Load Composer's autoloader
require '../vendor/autoload.php';

class Email extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        // $pdf = $request->pdf;        
        
        try {
            $mail = new PHPMailer(true);
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.office365.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'magica_baby@hotmail.com';                     //SMTP username
            $mail->Password   = 'pw1275PW1275';                               //SMTP password
            $mail->SMTPSecure = 'tls';                                  //Enable implicit TLS encryption  PHPMailer::ENCRYPTION_SMTPS
            $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('magica_baby@hotmail.com', 'Shades Cotizador');
            $mail->addAddress('magali.orihuelacastro@gmail.com', 'Shades Cotizador');     //Add a recipient
            // $mail->addAddress('magali.orihuela@shadesdemexico.com', 'Pruba Mailer');                //Name is optional
            // $mail->addReplyTo('info@example.com', 'Information');
            // $mail->addCC('cc@example.com');
            // $mail->addBCC('bcc@example.com');

            //Attachments
            // $originalbase = $base;
            $base = explode('data:application/pdf;filename=generated.pdf;base64,', $request->pdf);
            $base2 = base64_decode($base[1]);
            $mail->addStringAttachment($base2,"cotizacion.pdf");
            // $mail->addAttachment($pdf);         //Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Cotizacion';
            $mail->Body    = 'Se envia la cotizacion realizada';
            // $mail->AltBody = 'demás...';
            $mail->send();

            $msg = 'Enviado!';
        } catch (Exception $e) {
            $msg = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }

        return response()->json([
            'success'    => 'pruba',
            'msg' => $msg,
            // 'PDF' => $pdf
         ], 200);
    }

}

?>