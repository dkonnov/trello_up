<?php
if (session_id() == '') {session_start();}
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 0);
ini_set('display_startup_errors', 1);

header('Access-Control-Allow-Origin: *');

$action = $_SERVER['PATH_INFO'];

/*$dbservername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbport = "3306";
$dbname = "my-entry";*/


$dbservername = "localhost";
$dbusername = "root";
$dbpassword = "123";
$dbport = "7188";
$dbname = "instagram_smm"; 

/*$dbservername = "localhost";
$dbusername = "cm94574_smarttoy";
$dbpassword = "ch3m1c@l";
$dbport = "3306";
$dbname = "cm94574_smarttoy";*/



// connetcion to DB
$link = new mysqli($dbservername, $dbusername, $dbpassword, $dbname, $dbport);
$link->set_charset("utf8");


// if connection errod
if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
} 
// change user name
if ($action == '/changeLoginNameFormSave'){
    $result  = $link->query("UPDATE my_entry_users set name = '$_GET[name]' WHERE email = '$_SESSION[user]'");
    echo "save - $linkButtonAction";
}
// get User Name
if ($action == '/getUserName'){
    $result  = $link->query("SELECT name from my_entry_users WHERE email = '$_SESSION[user]'");
    $row = $result->fetch_assoc();
    echo "$row[name]";  
}
// get Random background
if ($action == '/getRandomBackground'){
    $dir = opendir('img/backgrounds');
    $count = 0;
    while($file = readdir($dir)){
      if($file == '.' || $file == '..' || is_dir('path/to/dir' . $file)){
        continue;
      } else {
        $count++;
      }
    }
    $image_num =  rand(1, $count);
    $dir2 = opendir('img/backgrounds');
    $count = 0;
    while($file = readdir($dir2)){
      if($file == '.' || $file == '..' || is_dir('path/to/dir' . $file)){
      } else {
        if ($count + 1 == $image_num) {echo $file;}
        $count++;
      }
    }
}
// get info for user info form
if ($action == '/showUserInfo'){
    $result  = $link->query("SELECT userInfoName, userInfoSpecialization, userInfoAbout from my_entry_users WHERE email = '$_SESSION[user]'");
    $row = $result->fetch_assoc();
    echo "{\"userInfoName\": \"$row[userInfoName]\", \"userInfoSpecialization\": \"$row[userInfoSpecialization]\", \"userInfoAbout\": \"$row[userInfoAbout]\"}";
}
// save info for user info form
if ($action == '/showUserInfoSave'){
    $result  = $link->query("update my_entry_users set userInfoName = '$_GET[userInfoName]', userInfoSpecialization = '$_GET[userInfoSpecialization]', userInfoAbout = '$_GET[userInfoAbout]' WHERE email = '$_SESSION[user]'");    
}
// link button form SAVE
if ($action == '/showlinkButtonSave'){
    $result  = $link->query("UPDATE my_entry_users set userLinkButtonAction = '$_GET[linkButtonAction]', userLinkButtonName = '$_GET[linkButtonName]' WHERE email = '$_SESSION[user]'");
    echo "save - $_GET[linkButtonAction], $_GET[linkButtonName]";
}
// link button form
if ($action == '/showlinkButton'){
    $result  = $link->query("SELECT userLinkButtonAction, userLinkButtonName from my_entry_users WHERE email = '$_SESSION[user]'");
    $row = $result->fetch_assoc();
    echo "{\"userLinkButtonAction\": \"$row[userLinkButtonAction]\",\"userLinkButtonName\": \"$row[userLinkButtonName]\"}";
}
// get info for user info form
if ($action == '/showUserInfoSocialForm'){
    $result  = $link->query("SELECT userInfoInstagram, userInfoWhatsApp, userInfoWhatsAppText, userInfoFacebook, userInfoVK, userInfoPhone, userInfoEMail from my_entry_users WHERE email = '$_SESSION[user]'");
    $row = $result->fetch_assoc();
    echo "{\"userInfoInstagram\": \"$row[userInfoInstagram]\", \"userInfoWhatsApp\": \"$row[userInfoWhatsApp]\", \"userInfoWhatsAppText\": \"$row[userInfoWhatsAppText]\", \"userInfoFacebook\": \"$row[userInfoFacebook]\", \"userInfoVK\": \"$row[userInfoVK]\", \"userInfoPhone\": \"$row[userInfoPhone]\", \"userInfoEMail\": \"$row[userInfoEMail]\"}";
}
// save info for main card
if ($action == '/showUserInfoSocialSave'){
    $result  = $link->query("update my_entry_users set userInfoPhone = '$_GET[userInfoPhone]', userInfoEMail = '$_GET[userInfoEMail]', userInfoInstagram = '$_GET[userInfoInstagram]', userInfoWhatsApp = '$_GET[userInfoWhatsApp]', userInfoWhatsAppText = '$_GET[userInfoWhatsAppTex]', userInfoFacebook = '$_GET[userInfoFacebook]', userInfoVK = '$_GET[userInfoVK]' WHERE email = '$_SESSION[user]'");    
}
// get info for integration
if ($action == '/integrationFormShow'){
    $result  = $link->query("SELECT integrationPixel from my_entry_users WHERE email = '$_SESSION[user]'");
    $row = $result->fetch_assoc();
    echo "{\"integrationPixel\": \"$row[integrationPixel]\"}";
}
// save info for integration
if ($action == '/integrationFormSave'){
    $result  = $link->query("update my_entry_users set integrationPixel = '$_GET[integrationPixel]' WHERE email = '$_SESSION[user]'");    
}
// get Src for Avatar form
if ($action == '/showUserAvatarGetSrc'){
    $result  = $link->query("SELECT avatar from my_entry_users WHERE email = '$_SESSION[user]'");
    $row = $result->fetch_assoc();
    echo "{\"avatar\": \"$row[avatar]\"}";
}
// get Src for Avatar form
if ($action == '/deleteAvatar'){
    $result  = $link->query("UPDATE my_entry_users set avatar = null WHERE email = '$_SESSION[user]'");
    echo "deleted";
}
//
function resize_image($file, $x) {
    list($width, $height) = getimagesize($file);
    echo "$width, $height--";
    $r = $width / $height;
    if ($width > $height){
        $new_w = $x*$r;
        $shift = ($new_w-$x)/2*(-1);
    } 
    if ($width == $height){
    }
    if ($width < $height){
    }
    $src = imagecreatefromjpeg("$file");
    $dst = imagecreatetruecolor($x, $x);
    imagecopyresampled($dst, $src, $shift, 0, 0, 0, $x-$shift, $x, $width, $height);
    echo "$shift, 0, 0, 0, $x-$shift, $x, $width, $height";
    imagejpeg($dst,$file,75);
    imagedestroy($dst);
    imagedestroy($src);
}

// download Avatar
if ($action == '/addAvatar'){
    // get current user
    $result  = $link->query("SELECT id, name from my_entry_users WHERE email = '$_SESSION[user]'");
    $row = $result->fetch_assoc();
    // upload avatar
    $avatarfilename = $row[id] . '_' . $row[name] . '_' . time() .'.jpg';
    $uploadfile = 'img/avatars/' . $avatarfilename;
    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile)){
        // save name file in db
        resize_image("$uploadfile",300);
        $result  = $link->query("UPDATE my_entry_users set avatar = '$avatarfilename' WHERE email = '$_SESSION[user]'");
        echo "true";
    }
}
// total Tabs background
if ($action == '/totalTabs'){
    $count = 0;
    $dir = opendir('img/backgrounds');
    while($file = readdir($dir)){
        if($file != '.' && $file != '..'){$count++;}
    }
    $pages = (int) ($count / 6) + 1;
    echo $pages;
}
if ($action == '/getBackgrounds'){
    $count = 0;
    $dir = opendir('img/backgrounds');
    while($file = readdir($dir)){
        if($file != '.' && $file != '..'){
            $count++;
            $img[$count] = $file;
        }
    }
    $p = $_GET[page]-1;
    echo "[{\"img\":\"" . $img[$p*6+1] . "\"},{\"img\":\"" . $img[$p*6+2] . "\"},{\"img\":\"" . $img[$p*6+3] . "\"},{\"img\":\"" . $img[$p*6+4] . "\"},{\"img\":\"" . $img[$p*6+5] . "\"},{\"img\":\"" . $img[$p*6+6] . "\"}]";
}
// get BGs

// get info for main card
if ($action == '/loadMainCard'){
    $result  = $link->query("SELECT id, background, avatar, userInfoName, userInfoSpecialization, userInfoAbout, userLinkButtonAction, userInfoEMail, userLinkButtonName, userInfoPhone, userInfoWhatsApp, userInfoWhatsAppText from my_entry_users WHERE name = '$_GET[userNameID]'");
    $row = $result->fetch_assoc();
 
        if ($row[userLinkButtonAction] == 'notShow'){$userLinkButtonHref = "";}
        if ($row[userLinkButtonAction] == 'wa'){
            $row[userInfoWhatsAppText] = urlencode($row[userInfoWhatsAppText]);
            $userLinkButtonHref = "https://wa.me/$row[userInfoWhatsApp]?text=$row[userInfoWhatsAppText]";
        }
        if ($row[userLinkButtonAction] == 'tel'){$userLinkButtonHref = "tel:$row[userInfoPhone]";}
        if ($row[userLinkButtonAction] == 'email'){$userLinkButtonHref = "mailto:$row[userInfoEMail]";}
        echo "{\"background\": \"$row[background]\", \"avatar\": \"$row[avatar]\", \"userInfoName\": \"$row[userInfoName]\", \"userInfoSpecialization\": \"$row[userInfoSpecialization]\", \"userInfoAbout\": \"$row[userInfoAbout]\", \"userLinkButtonAction\": \"$row[userLinkButtonAction]\", \"userLinkButtonName\": \"$row[userLinkButtonName]\",\"userLinkButtonHref\": \"$userLinkButtonHref\"}";
   
}
if ($action == '/loadUserSocButtons'){
    $result  = $link->query("SELECT userInfoInstagram, userInfoWhatsApp, userInfoWhatsAppText, userInfoFacebook, userInfoVK, userInfoEMail, userInfoPhone from my_entry_users WHERE name = '$_GET[userNameID]'");
    $row = $result->fetch_assoc();
    echo "[";
    if ($row[userInfoInstagram]){
        $nEl++;
        echo "{\"href\":\"https://www.instagram.com/$row[userInfoInstagram]\", \"icon\":\"fab fab fa-instagram\", \"delay\":\"$nEl"."s\"}";
    }
    if ($row[userInfoFacebook]){
        if ($nEl > 0) {echo ",";} $nEl++;
        echo "{\"href\":\"https://www.facebook.com/$row[userInfoFacebook]\", \"icon\":\"fab fa-facebook-square\", \"delay\":\"$nEl"."s\"}";
    }
    if ($row[userInfoWhatsApp]){
        if ($nEl > 0) {echo ",";} $nEl++;
        $row[userInfoWhatsAppText] = urlencode($row[userInfoWhatsAppText]);
        echo "{\"href\":\" https://wa.me/$row[userInfoWhatsApp]?text=$row[userInfoWhatsAppText]\", \"icon\":\"fab fa-whatsapp\", \"delay\":\"$nEl"."s\"}";
    }
    if ($row[userInfoVK]){
        if ($nEl > 0) {echo ",";} $nEl++;
        echo "{\"href\":\"https://vk.com/$row[userInfoVK]\", \"icon\":\"fab fa-vk\", \"delay\":\"$nEl"."s\"}";
    }
    if ($row[userInfoEMail]){
        if ($nEl > 0) {echo ",";} $nEl++;
        echo "{\"href\":\"mailto:$row[userInfoEMail]\", \"icon\":\"fas fa-envelope\", \"delay\":\"$nEl"."s\"}";
    }
    if ($row[userInfoPhone]){
        if ($nEl > 0) {echo ",";} $nEl++;
        echo "{\"href\":\"tel:$row[userInfoPhone]\", \"icon\":\"fas fa-phone-square\", \"delay\":\"$nEl"."s\"}";
    }
    
    echo "]";
}
// УСЛУГИ
if ($action == '/loadServices'){
    echo "[";
    $nEl = 0;
    # get user id
    $result  = $link->query("SELECT id from my_entry_users WHERE name = '$_GET[userNameID]'");
    $row = $result->fetch_assoc();
    #
    $result  = $link->query("SELECT id, name, description, price from my_entry_services WHERE user = '$row[id]' and deleted is null");
    while ($row = $result->fetch_assoc()) {
        if ($nEl > 0) {echo ",";} $nEl++;
        $delay = $nEl + 2;
        echo "{\"id\":\"$row[id]\",\"name\":\"$row[name]\", \"description\":\"$row[description]\", \"price\":\" - $row[price] р.\", \"delay\":\"$delay"."s\", \"heading\":\"heading$nEl\", \"collapse\":\"collapse$nEl\", \"href\":\"#collapse$nEl\"}";
    }
    echo "]";
}
if ($action == '/addServiceFormSave'){
    if ($_GET[id_service]){
        $result  = $link->query("update my_entry_services set name = '$_GET[name]', description = '$_GET[description]', price = '$_GET[price]' where user = '$_SESSION[id]' and id = '$_GET[id_service]'");
    } else {
        $result  = $link->query("insert into my_entry_services (user, name, description, price) values ('$_SESSION[id]', '$_GET[name]', '$_GET[description]', '$_GET[price]')");
    }
    echo "$_GET[id_service]";
}
if ($action == '/deleteService'){
    $result  = $link->query("update my_entry_services set deleted = 1 where id = $_GET[id_service] and user = $_SESSION[id]");
    echo "ok";
}
if  ($action == '/getService'){
    $result  = $link->query("SELECT name, description, price from my_entry_services WHERE user = $_SESSION[id] and id = $_GET[id_service]");
    $row = $result->fetch_assoc();
    echo "{\"name\":\"$row[name]\", \"description\":\"$row[description]\", \"price\":\"$row[price]\"}";
}
// chengeBackground
if ($action == '/changeBackground'){
    $result  = $link->query("update my_entry_users set background = '$_GET[img]' WHERE email = '$_SESSION[user]'");
    echo  $_GET[img];
}
// set background
if ($action == '/getBackground'){
    $result  = $link->query("SELECT background from my_entry_users WHERE email = '$_SESSION[user]'");
    $row = $result->fetch_assoc();
    echo $row[background];
}

// user logout
if ($action == '/logout'){
    session_unset();
    session_destroy();
    echo "logout";
}
// user authorization
if ($action == '/authorization'){
    $result  = $link->query("SELECT id FROM my_entry_users WHERE email = '$_GET[email]' and password = '$_GET[password]' and confirmed = 1");
    $row = $result->fetch_assoc();
    if (isset($row[id])) {
        // start session
        $_SESSION["user"] = "$_GET[email]";
        $_SESSION["id"] = "$row[id]";
        $_SESSION["password"] = "$_GET[password]";
        echo "true";
    } else {
        $result  = $link->query("SELECT id FROM my_entry_users WHERE email = '$_GET[email]' and password = '$_GET[password]'");
        $row = $result->fetch_assoc();
        if (isset($row[id])) {echo "notconfirmed";} 
        else {
            $result  = $link->query("SELECT id FROM my_entry_users WHERE email = '$_GET[email]'");
            $row = $result->fetch_assoc();
            if (isset($row[id])) {echo "restore";} else {
                echo "false";
            }
        }
    }
} 
if ($action == '/authorizationOnStart'){
    $result  = $link->query("SELECT id FROM my_entry_users WHERE email = '$_SESSION[user]' and password = '$_SESSION[password]' and confirmed = 1");
    $row = $result->fetch_assoc();
    if (isset($row[id])) {
        echo $row[id];
    }
}
// check email in current users
if ($action == '/emailRegistrationCheck'){
    $result  = $link->query("SELECT id FROM my_entry_users WHERE email = '$_GET[email]'");
    $row = $result->fetch_assoc();
    if (isset($row[id])) {echo "true";} else {echo "false";}
}

// check name in current usert
if ($action == '/nameRegistrationCheck'){
    $result  = $link->query("SELECT id FROM my_entry_users WHERE name = '$_GET[name]'");
    $row = $result->fetch_assoc();
    if (isset($row[id])) {echo "true";} else {echo "false";}
}

// user registration
if ($action == '/registration'){
    $result  = $link->query("insert into my_entry_users (name, email, password, background, userInfoName, userInfoSpecialization, userInfoAbout, userInfoEMail, userLinkButtonAction, userLinkButtonName) values ('$_GET[name]', '$_GET[email]', '$_GET[password]', 'ethan-dow-1509463-unsplash.jpg', 'Ваше Имя', 'Ваша профессия / специализация', 'Коротко о Вас', '$_GET[email]', 'email', 'Связаться')");
    $file = fopen("templates/mail.html", "r");
    while (!feof($file)) {
        $str = fgets($file);
        if (strpos($str, "confirmed=")){
            $lines .= "\"http://my-entry.ru/confirmed=$_GET[email]\"";
        } else {
            $lines .= $str;
        }
    }
    fclose($file);
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: My-Entry <info@my-entry.ru>\r\n"; 

    mail($email, 'My-Entry - подтверждение регистрации', $lines, $headers);
}
if ($action == '/registration2'){
    $result  = $link->query("SELECT id, confirmed FROM my_entry_users WHERE email = '$_GET[confirmed]'");
    $row = $result->fetch_assoc();
    if (!$row[confirmed] && $row[id]){
        $result  = $link->query("update my_entry_users set confirmed = 1 WHERE email = '$_GET[confirmed]'");
        echo "confirmed";
    }
}

// send new password to user
if ($action == '/sendPassword'){
    $file = fopen("templates/mail.html", "r");
    while (!feof($file)) {
        $lines .= fgets($file);
    }
    fclose($file);
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: My-Entry <info@my-entry.ru>\r\n"; 
    mail('konnov_di@r28.rosreestr.ru', 'My-Entry - новый пароль', $lines, $headers);
}


?>