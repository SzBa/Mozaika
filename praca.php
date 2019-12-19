<?php
    //zapisanie do pliku
    $f = fopen("semafor","w");
	flock($f,LOCK_EX);

    $suroweDane = file_get_contents("php://input");
    $daneJSON = json_decode($suroweDane,true);

    //zwraca wartosc calkowita 
    $polecenie = intval($daneJSON['polecenie']);

    if(isset($daneJSON['polecenie']))
    {
        $polecenie = intval($daneJSON['polecenie']);
        switch($polecenie)
        {
            case 1: 

                $user_agent = $_SERVER['HTTP_USER_AGENT'];

                if (strpos($user_agent, 'Android')){
                    echo 'androidStyle.css';
                }
                else if (strpos($user_agent, 'Windows')){
                    echo 'windowsStyle.css';
                }
                else if(strpos($user_agent, 'Mac')){
                    echo 'iOSstyle.css';
                }
                 else{
                    echo 'default.css';
                } 
            break;

            case 2: 

                $plik = fopen("dane", "r") or die("Pliku nie da się odczytać");
                $odczytPlik = fread($plik, filesize("dane"));
                fclose($plik);
                echo $odczytPlik; 
            break;

            case 3: 
                file_put_contents("dane",$suroweDane);
            break;
            default: 
                $wynik = array('status' => false, 'kod' => 3, 'wartosc' => 'Złe polecenie');
        }
    }

    flock($f, LOCK_UN); 
    fclose($f);
?>