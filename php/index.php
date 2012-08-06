<?php

function nodify( $msg ) {
  $bt = debug_backtrace();
	$ch = curl_init();
		
	curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1');

	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_PORT, 1338);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
	curl_setopt($ch, CURLOPT_POST, true);

	$query = array(
		'type' => 'nodify',
		'msg' => $msg,
		'file' => $bt[0]['file'],
    'line' => $bt[0]['line'],
	);

	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($query));

	curl_exec($ch);
	curl_close($ch);
}

nodify( 'dqdq');
nodify( 'a second message');