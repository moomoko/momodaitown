<?php
session_start();

try {
    $pdo = new PDO('mysql:host=localhost;dbname=momodaitown;charset=utf8', 'root', '');
} catch (PDOException $e) {
    echo 'データベース接続失敗: ' . $e->getMessage();
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // POSTデータ確認
    var_dump($_POST);

    $content = $_POST['content'] ?? '';

    if (!empty($content)) {
        // データベースに挿入
        $stmt = $pdo->prepare("INSERT INTO posts (content) VALUES (:content)");
        $stmt->bindParam(':content', $content, PDO::PARAM_STR);

        if ($stmt->execute()) {
            echo "データが保存されました。";
        } else {
            $errorInfo = $stmt->errorInfo();
            echo "データ保存エラー: " . $errorInfo[2];
        }
    } else {
        echo "投稿内容が空です。";
    }
} else {
    echo "不正なアクセス";
}
?>






