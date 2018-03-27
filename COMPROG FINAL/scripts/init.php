<?php
	error_reporting(E_ERROR | E_PARSE);
	mysql_connect("localhost", "root", "root") or die(mysql_error());
	mysql_select_db("rembakeshop") or die(mysql_error());
	define("PayPal_CLIENT_ID", "AQsRMF-Dh5oAWdmgPy_tGc6F-mHQYCVSV-2ZVCNmWcIhkznA2LPzdbLZGD0xI1rUrBC1VEdTqroEjwpg");
	define("PayPal_SECRET", "EL6voTA6WXk4MkhbdgClFTDhMLUMvrwn1PQiN8iN0epEhKTTr3z8zAkMyOZ3DwcE6gjuYMf44hFVfujk");
	define("PayPal_Base", "https://api.paypal.com/v1/");
	session_start();
?>