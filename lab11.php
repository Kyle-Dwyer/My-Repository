<?php
if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    upload();
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>上传结果</title>
    </head>
    <body>
    <button id="return">确定</button>
    </body>
    <script>
        document.getElementById("return").onclick = function () {
            window.location.href = "lab11.html";
        }
    </script>
    </html>
    <?php
} else if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    if (isset($_GET["value"])) {
        showlyric();
    } else {
        showsongs();
    }
} else {
    exit("<strong>非法访问</strong>");
}

function showsongs()
{
    $files = array();
    if ($handle = opendir('./upload')) {
        while (($file = readdir($handle)) !== false) {
            if ($file != ".." && $file != ".") {
                if (@end(explode(".", $file)) !== 'lrc') {
                    $files[] = $file;
                }
            }
        }
        closedir($handle);
        echo json_encode($files);
    }
}

function showlyric()
{
    $lyric=$_GET["value"];
    $path = 'upload/'.$lyric.'.lrc';
    $myfile = fopen($path , "r");
    $mylyric=fread($myfile,filesize($path));
    fclose($myfile);
    echo($mylyric);
}

function upload()
{
    //读取数据
    $files = $_FILES["file_upload"];
    $lyric = $_POST['edit_lyric'];
    $title = $_POST['title'];
    $artist = $_POST['artist'];
    //保存音乐文件
    $fileName = $files['name'];
    $fileTemp = $files['tmp_name'];
    $newloc = "./upload/" . $fileName;
    if ('file error=' . $files['error'] === 1) {
        echo "<p>你上传的文件过大</p>";
        return;
    }
    $result = move_uploaded_file($fileTemp, $newloc);
    if ($result) {
        echo "<p>SUCCEED in uploading music file!</p>";
    } else {
        echo "<p>ERROR in moving the music file!</p>";
    }
    //上传歌词
    $txt = "[title:$title]\n[artist:$artist]\n" . $lyric;
    $path = "./upload/" . substr($fileName, 0, strlen($fileName) - 4) . ".lrc";
    $myfile = fopen($path, "w");//编码转换
    if (fwrite($myfile, $txt)) {
        echo "<p>SUCCEED in uploading lyric file!</p>";
    } else {
        echo "<p>ERROR in moving the lyric file!</p>";
    }
    fclose($myfile);
}

?>

