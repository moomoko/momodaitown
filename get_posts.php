<?php
try {
    // $pdo = new PDO('mysql:host=localhost;dbname=momodaitownn;charset=utf8', 'root', '');
    $pdo = new PDO('mysql:host=mysql3101.db.sakura.ne.jp;dbname=momodai_sotusei;charset=utf8', 'momodai', 'nambamomoko0118');
    $stmt = $pdo->prepare("
        SELECT posts.id, posts.content, posts.created_at, users.name AS user_name 
        FROM posts 
        JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
    ");
    $stmt->execute();

    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['status' => 'success', 'posts' => $posts], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'データベースエラー: ' . $e->getMessage()]);
    exit();
}
