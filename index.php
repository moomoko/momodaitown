<?php
session_start(); // セッション開始

try {
    $pdo = new PDO('mysql:host=localhost;dbname=momodaitown;charset=utf8', 'root', '');
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
  <?php
  // PHP変数や条件分岐が必要な場合、ここで処理できます。
  ?>

  <!-- トップ画面 -->
  <div class="container" id="top-screen">
    <img src="./img/townlogo.png" alt="ももだいタウン" class="title-image">
    <button class="start-button">はじめから</button>
    <button class="continue-button">つづきから</button>
    <img src="./img/タウントップ1.gif" alt="走るキャラクター1" class="runner" id="runner1">
    <img src="./img/タウントップ2.gif" alt="走るキャラクター2" class="runner" id="runner2">
  </div>

  <!-- 窓口画面 -->
  <div id="intro-screen" class="hidden">
    <img src="./img/タウンイントロ.png" alt="窓口" class="full-screen-image">
    <div class="text-box">
      <div id="speaker-name" class="speaker-name">もも</div>
      <p id="typing-text"></p>
      <button id="next-button" class="next-arrow hidden">▼</button>
    </div>
  </div>

  <!-- 名前入力画面 -->
  <div id="name-input-screen" class="hidden">
    <img src="./img/タウンイントロ.png" alt="窓口" class="full-screen-image">
    <div class="text-box">
      <div id="speaker-name" class="speaker-name">もも</div>
      <p id="typing-text-name"></p>
      <input type="text" id="name-input" placeholder="ひらがなで入力してね" maxlength="10">
      <button id="name-submit" class="bottom-right-button">OK</button>
    </div>
  </div>

  <!-- 誕生日入力画面 -->
  <div id="birthday-input-screen" class="hidden">
    <img src="./img/タウンイントロ.png" alt="窓口" class="full-screen-image">
    <div class="text-box">
      <div id="speaker-name" class="speaker-name">だい</div>
      <p id="typing-text-birthday"></p>
      <input type="date" id="birthday-input">
      <button id="birthday-submit" class="bottom-right-button">OK</button>
    </div>
  </div>

  <div id="town-screen" class="hidden">
    <div class="image-container">
      <img src="./img/タウン全体.jpg" alt="タウン全体" class="full-screen-image">
      <div id="hiroba-area" class="clickable-area"></div>
    </div>
  </div>

  <!-- やさしさ広場画面 -->
  <div id="hiroba-screen" class="hidden">
    <img src="./img/やさしさ広場.jpg" alt="やさしさひろば" class="full-screen-image">
    <div id="board-area" class="clickable-area"></div>
    <button id="post-button" class="post-button hidden">投稿</button>
    <button id="back-to-town" class="bottom-left-button">戻る</button>

    <!-- 投稿した文章を表示する枠 -->
    <div id="post-display" class="text-box hidden">
      <p id="post-content"></p>
    </div>
  </div>


  <!-- 掲示板画面 -->
  <div id="board-screen" class="hidden">
    <img src="./img/タウン掲示板.jpg" alt="掲示板" class="full-screen-image">
    <button id="back-to-hiroba" class="bottom-left-button">戻る</button>
  </div>

  <!-- 投稿フォーム画面 -->
  <div id="post-form" class="hidden">
  <div class="form-container">
    <form action="save_post.php" method="POST">
      <textarea name="content" id="post-text" placeholder="ここに投稿内容を書いてください"></textarea>
      <button type="submit" class="submit-button">送信</button>
      <button type="button" id="cancel-post" class="cancel-button">キャンセル</button>
    </form>
  </div>
</div>


  <script src="js/script.js"></script>
</body>
</html>
