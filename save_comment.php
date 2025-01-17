<?php
session_start();
header('Content-Type: application/json');

try {
    // $pdo = new PDO('mysql:host=localhost;dbname=momodaitownn;charset=utf8', 'root', '');
    $pdo = new PDO('mysql:host=mysql3101.db.sakura.ne.jp;dbname=momodai_sotusei;charset=utf8', 'momodai', 'nambamomoko0118');
    $postId = $_POST['post_id'] ?? null;
    $comment = $_POST['comment'] ?? null;
    $userName = $_POST['user_name'] ?? null; // user_name を取得

    if (!$postId || !$comment || !$userName) {
        echo json_encode(['status' => 'error', 'message' => '必要な情報が不足しています']);
        exit();
    }

    $stmt = $pdo->prepare("INSERT INTO comments (post_id, comment, user_name) VALUES (:post_id, :comment, :user_name)");
    $stmt->execute([':post_id' => $postId, ':comment' => $comment, ':user_name' => $userName]);

    echo json_encode(['status' => 'success', 'message' => 'コメントを保存しました']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'データベースエラー: ' . $e->getMessage()]);
}






