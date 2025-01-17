<?php
session_start(); // セッション開始

// try {
//     $pdo = new PDO('mysql:host=localhost;dbname=momodaitownn;charset=utf8', 'root', '');
// } catch (PDOException $e) {
//     echo 'データベース接続失敗: ' . $e->getMessage();
//     exit();
// }

try {
    $pdo = new PDO('mysql:host=mysql3101.db.sakura.ne.jp;dbname=momodai_sotusei;charset=utf8', 'momodai', 'nambamomoko0118');
} catch (PDOException $e) {
    echo 'データベース接続失敗: ' . $e->getMessage();
    exit();
}

?>


<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
    <title>ももだいタウン</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- トップ画面 -->
    <div class="container" id="top-screen">
        <img src="./img/townlogo.png" alt="ももだいタウン" class="title-image">
<!-- スタートボタンやその他の一般的なボタン -->
        <button class="default-button start-button">はじめから</button>
        <button class="default-button continue-button">つづきから</button>
        <img src="./img/towntop1.gif" alt="走るキャラクター1" class="runner" id="runner1">
        <img src="./img/towntop2.gif" alt="走るキャラクター2" class="runner" id="runner2">
    </div>

    <!-- 音楽の再生ボタン -->
<button id="play-btn" class="play-button">▶</button>

<!-- BGMを設定 -->
<audio id="bgm" preload="auto" loop>
    <source src="./img/bo-tto hidamari.mp3" type="audio/mp3"> <!-- 音楽ファイルを指定 -->
    お使いのブラウザはaudioタグをサポートしていません。
</audio>


    <!-- 窓口画面 -->
    <div id="intro-screen" class="hidden">
        <img src="./img/townintro.png" alt="窓口" class="full-screen-image">
        <div class="text-box">
            <div id="speaker-name" class="speaker-name">もも</div>
            <p id="typing-text"></p>
            <button id="next-button" class="next-arrow hidden">▼</button>
        </div>
    </div>

    <!-- 名前入力画面 -->
    <div id="name-input-screen" class="hidden">
        <img src="./img/townintro.png" alt="窓口" class="full-screen-image">
        <div class="text-box">
            <div id="speaker-name" class="speaker-name">もも</div>
            <p id="typing-text-name"></p>
            <input type="text" id="name-input" placeholder="ひらがなで入力してね" maxlength="10">
            <button id="name-submit" class="bottom-right-button">OK</button>
        </div>
    </div>

    <!-- 誕生日入力画面 -->
    <div id="birthday-input-screen" class="hidden">
        <img src="./img/townintro.png" alt="窓口" class="full-screen-image">
        <div class="text-box">
            <div id="speaker-name" class="speaker-name">だい</div>
            <p id="typing-text-birthday"></p>
            <input type="date" id="birthday-input">
            <button id="birthday-submit" class="bottom-right-button">OK</button>
        </div>
    </div>

        <!-- メールアドレス入力画面 -->
    <div id="email-input-screen" class="hidden">
        <img src="./img/townintro.png" alt="窓口" class="full-screen-image">
        <div class="text-box">
            <div id="speaker-name" class="speaker-name">だい</div>
            <p id="typing-text-email"></p>
            <input type="email" id="email-input" placeholder="メールアドレスを入力してね">
            <button id="email-submit" class="bottom-right-button">OK</button>
        </div>
    </div>


    <div id="login-screen" class="hidden">
        <h2>ログイン</h2>
        <form id="login-form">
            <input type="text" id="login-name" placeholder="名前" required>
            <input type="email" id="login-email" placeholder="メールアドレス" required>
            <button type="submit" class="login-button">ログイン</button>
        </form>
    </div>




    <!-- タウン画面 -->
    <div id="town-screen" class="hidden">
    <div class="image-container">
        <img src="./img/townwhole.jpg" alt="タウン全体" class="full-screen-image">
        <div id="hiroba-area" class="clickable-area"></div> 
        <div id="home-area" class="clickable-area"></div> <!-- ほめ屋さんのクリック範囲 -->

        <div id="points-display" style="display: block; position: absolute; top: 10px; right: 10px;">ポイント: 0</div>
    </div>
    </div>

    <!-- ほめ屋さん画面 -->
    <div id="home-screen" class="hidden">
        <img src="./img/townhomeya.jpg" alt="ほめ屋さん" class="full-screen-image">
        <div class="text-box">
            <div id="speaker-name" class="speaker-name">もも</div>
            <p id="typing-text-home"></p>
            <button id="next-button-home" class="next-arrow hidden">▼</button>
        </div>
        <button id="back-to-town-from-home" class="bottom-left-button">戻る</button>
    </div>


    <!-- やさしさ広場画面 -->
    <div id="hiroba-screen" class="hidden">
        <img src="/momodaitown/img/townhiroba.jpg" alt="やさしさひろば" class="full-screen-image">
        <div id="board-area" class="clickable-area"></div>
        <button id="post-button" class="post-button">投稿</button>
        <button id="back-to-town" class="bottom-left-button">戻る</button>

        <!-- 投稿した文章を表示する枠 -->
        <div id="post-display" class="text-box hidden">
            <p id="post-content"></p>
        </div>

        <div id="post-container" style="position: relative; width: 100%; height: 100%;"></div>
    </div>

    <!-- 掲示板画面 -->
    <div id="board-screen" class="hidden">
        <img src="./img/townboard.jpg" alt="掲示板" class="full-screen-image">
        <button id="back-to-hiroba" class="bottom-left-button">戻る</button>
    </div>

        <!-- 見るボタン -->
    <button id="view-ranking" class="view-ranking-button">タップ！</button>
    <div id="ranking-screen" class="hidden">
        <div class="ranking-container">
            <h2>ランキング</h2>
            <ul id="ranking-list"></ul>
            <button id="close-ranking" class="close-ranking-button">×</button>
        </div>
    </div>


    <!-- 投稿フォーム画面 -->
    <div id="post-form" class="hidden">
        <div class="form-container">
            <textarea id="post-text" placeholder="ここに投稿内容を書いてください"></textarea>
            <button id="submit-post" class="submit-button">送信</button>
            <button id="cancel-post" class="cancel-button">キャンセル</button>
        </div>
    </div>
    

    <script src="js/script.js"></script>
</body>
</html>


