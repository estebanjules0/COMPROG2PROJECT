<?php 
	include 'init.php';

	$data = json_decode(file_get_contents("php://input"));
	$paymentID = mysql_real_escape_string($data->paymentId);
	$accessToken = mysql_real_escape_string($data->token);
	$payerId = mysql_real_escape_string($data->payerId);

	$ch = curl_init();
    $clientId = PayPal_CLIENT_ID;
    $secret = PayPal_SECRET;
    echo $secret;
    curl_setopt($ch, CURLOPT_URL, PayPal_Base.'oauth2/token');
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, $clientId . ":" . $secret);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
    $result = curl_exec($ch);
    $accessToken = null;
    echo $result;
    if (empty($result)){
        return false;
    }

    else {
        $json = json_decode($result);
        $accessToken = $json->access_token;
        $curl = curl_init(PayPal_Base.'payments/payment/' . $paymentID);
        curl_setopt($curl, CURLOPT_POST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer ' . $accessToken,
        'Accept: application/json',
        'Content-Type: application/xml'
        ));
        $response = curl_exec($curl);
        $result = json_decode($response);


        $stateValue = $result->state;
        $subtotal = $result->transactions[0]->amount->details->subtotal;
        $recipient_name = $result->transactions[0]->item_list->shipping_address->recipient_name;
        curl_close($ch);
        curl_close($curl);
       
        echo $stateValue;

        // $data = ['state'=>$stateValue, 'total'=>$subtotal];
       	// echo json_encode($data);


        // $product = $this->getProduct($pid);

        // if($state == 'approved' && $currency == $product->currency && $product->price ==  $subtotal){
        //     $this->updateOrder($pid, $payerID, $paymentID, $paymentToken);
        //     return true;
  
        // }
	}
?>