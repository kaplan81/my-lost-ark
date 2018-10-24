<?php

/* 
Plugin Name: Pedefer
Description: Handles resgistration form and sending of confirmation with PDF with QR code.
Version: 1.0 
Author: Andres Gesteira
*/

require_once('fpdf.php');

define('PEDEFERSURL', WP_PLUGIN_URL . '/' . dirname( plugin_basename( __FILE__ ) ) );
define('PEDEFERPATH', WP_PLUGIN_DIR . '/' . dirname( plugin_basename( __FILE__ ) ) );

function pedefer_enqueuescripts() {
	wp_enqueue_script('pedefer', PEDEFERSURL . '/js/pedefer.js', array('jquery'));
	wp_localize_script( 'pedefer', 'pedeferajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
}
add_action('wp_enqueue_scripts', 'pedefer_enqueuescripts');

function pedefer_mail() {
	$results = '';

	$unique_id = 'telefonica_invitacion_' . $_POST['uniqueID'];
	$qr_url = $_POST['qrURL'];
	$qr_url_optin =  $qr_url . urlencode('&asistencia=1');
	$qr_url_optout = $qr_url . urlencode('&asistencia=0');
	$chart_url_optin = 'https://chart.googleapis.com/chart?chs=220x220&cht=qr&chl=' . $qr_url_optin . '&choe=UTF-8';
	$chart_url_optout = 'https://chart.googleapis.com/chart?chs=220x220&cht=qr&chl=' . $qr_url_optout . '&choe=UTF-8';
	$asistencia = $_POST['asistencia'];
	$first_name = sanitize_text_field($_POST['regFirstName']);
	$last_name = sanitize_text_field($_POST['regLastName']);
	$company = sanitize_text_field($_POST['regCompany']);
	$position = sanitize_text_field($_POST['regPosition']);
	$phone = sanitize_text_field($_POST['regPhone']);
	$to = sanitize_email( $_POST['regEmail'] );
	$whoami = $_POST['regWhoAmI'];
	$bus = $_POST['regBus'];
	$block1 = $_POST['regRoomsBlock1'];
	if( $block1 == 0 ) $block1 = '';
	elseif ( $block1 == 1 ) $block1 = 'Sala 1: Altitude';
	elseif ( $block1 == 2 ) $block1 = 'Sala 2: Genesys';
	elseif ( $block1 == 3 ) $block1 = 'Sala 3: Eng House';
	$block2 = $_POST['regRoomsBlock2'];
	if( $block2 == 0 ) $block2 = '';
	elseif ( $block2 == 1 ) $block2 = 'Sala 1: Alcatel';
	elseif ( $block2 == 2 ) $block2 = 'Sala 2: Oracle';
	elseif ( $block2 == 3 ) $block2 = 'Sala 3: Inin';
	$block3 = $_POST['regRoomsBlock3'];
	if( $block3 == 0 ) $block3 = '';
	elseif ( $block3 == 1 ) $block3 = 'Sala 1: Alcatel';
	elseif ( $block3 == 2 ) $block3 = 'Sala 2: Genesys';
	elseif ( $block3 == 3 ) $block3 = 'Sala 3: Eng House';
	$block4 = $_POST['regRoomsBlock4'];
	if( $block4 == 0 ) $block4 = '';
	elseif ( $block4 == 1 ) $block4 = 'Sala 1: Altitude';
	elseif ( $block4 == 2 ) $block4 = 'Sala 2: Oracle';
	elseif ( $block4 == 3 ) $block4 = 'Sala 3: Inin';
	$dataprotection = $_POST['regDataProtection'];

	$subject = 'Confirmación de registro';

	// If message came from form --- $message = esc_textarea( $_POST["message"] );
	$message = 'Le confirmamos que se ha registrado correctamente en el evento';
	
	// Get the blog administrator's email address
	// $to = get_option( 'admin_email' );
	
	$headers = 'From: Telefónica Contact Center <telefonica@telefonica.com>' . "\r\n";

	$pdf = new FPDF();
	$pdf->AddPage();
	$pdf->AcceptPageBreak();
	$pdf->AddFont('TelefonicaText','','telefonicatext-regular-webfont.php');
	$pdf->SetFont('TelefonicaText','',11.62);
	$pdf->Image( PEDEFERSURL . '/fpdf_img/invitation_bg.png', 0, 0, 210, '', 'PNG' );
	if($whoami == 'employee') $pdf->Image( PEDEFERSURL . '/fpdf_img/qr_bg.png', 11.6, 8.6, 88, '', 'PNG' );
	$pdf->Image($chart_url_optin . '&choe=UTF-8', 26, 22.5, '', '','PNG');
	$pdf->Text(118.4, 31, utf8_decode($block1));
	$pdf->Text(118.4, 47.6, utf8_decode($block2));
	$pdf->Text(161, 31, utf8_decode($block3));
	$pdf->Text(161, 47.6, utf8_decode($block4));
	$pdf->Text(22.5, 111.3, utf8_decode ($company));
	$pdf->Text(22.5, 136.3, utf8_decode($first_name . ' ' . $last_name));
	$document = $pdf->Output( WP_CONTENT_DIR . '/uploads/registros/' . $unique_id . '.pdf', 'F' );
	$attachments = array( WP_CONTENT_DIR . '/uploads/registros/' . $unique_id . '.pdf' );

	if ( wp_mail( $to, $subject, $message, $headers, $attachments ) ) {
	    die('SU REGISTRO SE HA COMPLETADO CON ÉXITO');
	} else {
		die('HA OCURRIDO UN ERROR CON EL ENVÍO DE SU REGISTRO');
	}
}

add_action( 'wp_ajax_nopriv_pedefer_mail', 'pedefer_mail' );
add_action( 'wp_ajax_pedefer_mail', 'pedefer_mail' );

