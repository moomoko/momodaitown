<?php
session_start();

try {
    // $pdo = new PDO('mysql:host=localhost;dbname=momodaitownn;charset=utf8', 'root', '');
    $pdo = new PDO('mysql:host=mysql3101.db.sakura.ne.jp;dbname=momodai_sotusei;charset=utf8', 'momodai', 'nambamomoko0118');
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'データベース接続失敗: ' . $e->getMessage()]);
    exit();
}

$stmt = $pdo->query("SELECT * FROM users LIMIT 1");
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode(['status' => 'success', 'user' => $user]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'ユーザー情報が見つかりません']);
}
